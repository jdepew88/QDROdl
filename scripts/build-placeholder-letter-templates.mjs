/**
 * Generates minimal DOCX letter templates under templates/letters/
 * so the dashboard letter API works before final Word files are added.
 * Run: node scripts/build-placeholder-letter-templates.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import JSZip from "jszip";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "templates", "letters");

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function p(text) {
  return `<w:p><w:r><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

function documentXml(paragraphs) {
  const body = paragraphs.map(p).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
${body}
<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
</w:body>
</w:document>`;
}

async function writeDocx(filename, paragraphs) {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`,
  );

  zip.folder("_rels").file(
    ".rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
  );

  zip.folder("word").folder("_rels").file(
    "document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`,
  );

  zip.folder("word").file("document.xml", documentXml(paragraphs));

  const buf = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  const outPath = path.join(OUT_DIR, filename);
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
  await fs.promises.writeFile(outPath, buf);
  console.log("Wrote", path.relative(ROOT, outPath));
}

const review = [
  "[PLACEHOLDER — replace with final plan-admin pre-filing review letter]",
  "",
  "{{firm.name}}  |  {{firm.website}}",
  "{{letter.date_today}}",
  "",
  "Re: Case No. {{case.number}} — {{court.county}} — preliminary review of draft DRO/QDRO",
  "",
  "Petitioner: {{party.petitioner.full_name}}",
  "Respondent: {{party.respondent.full_name}}",
  "",
  "Plan member (for reference): {{member.display_name}}",
  "",
  "[Body: request preliminary review before court filing. Replace this paragraph.]",
  "",
  "Sincerely,",
  "",
  "{{firm.signer_name}}",
  "{{firm.signer_title}}",
];

const closeout = [
  "[PLACEHOLDER — replace with final close-out / service on plan administrator letter]",
  "",
  "{{firm.name}}  |  {{firm.website}}",
  "{{letter.date_today}}",
  "",
  "Re: Case No. {{case.number}} — service of court-filed order on plan administrator",
  "",
  "Petitioner: {{party.petitioner.full_name}}",
  "Respondent: {{party.respondent.full_name}}",
  "",
  "[Body: explain service steps and enclosed certified copies. Replace this paragraph.]",
  "",
  "Sincerely,",
  "",
  "{{firm.signer_name}}",
  "{{firm.signer_title}}",
];

const attachment = [
  "[PLACEHOLDER — non-filed identifier attachment; replace with final layout]",
  "",
  "{{attachment.case_caption_line}}",
  "{{attachment.county_court_line}}",
  "",
  "{{attachment.petitioner_heading}}",
  "{{attachment.respondent_heading}}",
  "",
  "{{attachment.identifiers_intro}}",
  "",
  "{{attachment.identifiers_block}}",
];

async function main() {
  await writeDocx("plan-admin-preapproval.docx", review);
  await writeDocx("closeout-plan-admin-service.docx", closeout);
  await writeDocx("nonfiled-dro-attachment.docx", attachment);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
