import type { PreapprovalLetterData } from "@/lib/documents/types";

/**
 * Editable body copy for the CalPERS preliminary-review letter.
 * Add paragraphs here; keep tone neutral and professional.
 */
function buildBodyParagraphs(data: PreapprovalLetterData): string[] {
  const { memberName, nonMemberName, planName, modelLabel } = data;
  return [
    `${data.qdroCompanyName} prepared a draft Domestic Relations Order (DRO) for preliminary review on behalf of the parties in the above-captioned matter. The draft implements a division of ${planName} benefits under a ${modelLabel}.`,
    `The member is identified as ${memberName}. The alternate payee / non-member spouse is identified as ${nonMemberName}. Additional identifying information appears in the non-filed attachment transmitted with this letter (or as otherwise submitted in your intake channels).`,
    `Please review the enclosed draft for administrative acceptability under your current procedures. If revisions are required, please specify the changes or provide reference to the applicable rule, form, or guideline so that we may prepare an amended draft promptly.`,
    `This letter is provided for administrative coordination only and is not intended as legal advice to CalPERS. The court retains jurisdiction over the parties; the database remains the parties' dissolution file and plan records.`,
  ];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Full HTML document for Puppeteer PDF. Print-oriented CSS; black/charcoal + restrained green.
 */
export function buildPreapprovalLetterHtml(data: PreapprovalLetterData): string {
  const bodyParas = buildBodyParagraphs(data);
  const senderBlock = data.mailingAddressLines.map((l) => escapeHtml(l)).join("<br/>");
  const recipientBlock = data.planRecipientLines.map((l) => escapeHtml(l)).join("<br/>");
  const ccBlock =
    data.ccLines && data.ccLines.length
      ? `<div class="cc"><strong>c:</strong> ${data.ccLines.map(escapeHtml).join("<br/>")}</div>`
      : "";

  const parasHtml = bodyParas
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n");

  const supportLine = data.supportEmail
    ? `<p class="muted">Questions: <a href="mailto:${escapeHtml(data.supportEmail)}">${escapeHtml(data.supportEmail)}</a></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Preliminary review — ${escapeHtml(data.caseNumber)}</title>
  <style>
    @page { size: letter; margin: 0; }
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #171717;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .page {
      max-width: 7in;
      margin: 0 auto;
      padding: 0.5in 0 0.25in 0;
    }
    .brand-bar {
      height: 4px;
      background: linear-gradient(90deg, #14532d 0%, #22c55e 45%, #14532d 100%);
      margin-bottom: 1.25rem;
      border-radius: 2px;
    }
    .sender { font-size: 10pt; color: #404040; margin-bottom: 1.75rem; }
    .date { margin-bottom: 1.25rem; }
    .recipient { margin-bottom: 1.25rem; }
    .re {
      font-weight: 600;
      margin: 1rem 0 0.75rem;
      color: #0f172a;
    }
    .subject {
      font-weight: 600;
      margin: 0.5rem 0 1rem;
      color: #14532d;
    }
    .parties {
      margin-bottom: 1rem;
      padding: 0.65rem 0.85rem;
      background: #fafafa;
      border-left: 3px solid #166534;
      font-size: 10.5pt;
    }
    p { margin: 0 0 0.85rem; text-align: justify; }
    .signature { margin-top: 1.75rem; }
    .sig-name { font-weight: 600; margin-top: 2rem; color: #0f172a; }
    .sig-title { font-size: 10pt; color: #525252; }
    .cc { margin-top: 1.5rem; font-size: 10pt; color: #404040; }
    .muted { font-size: 10pt; color: #737373; margin-top: 0.5rem; }
    a { color: #166534; }
  </style>
</head>
<body>
  <div class="page">
    <div class="brand-bar" aria-hidden="true"></div>
    <div class="sender">${senderBlock}<br/><span class="muted">${escapeHtml(data.qdroTagline)}</span></div>
    <div class="date">${escapeHtml(data.generatedDate)}</div>
    <div class="recipient">${recipientBlock}</div>
    <div class="re">RE:&nbsp;&nbsp;${escapeHtml(data.caseCaption)}<br/>
      Case No.&nbsp;${escapeHtml(data.caseNumber)} — ${escapeHtml(data.courtName)}</div>
    <div class="subject">Request for preliminary review — ${escapeHtml(data.planName)} — ${escapeHtml(data.modelLabel)}</div>
    <div class="parties">
      <strong>Member:</strong> ${escapeHtml(data.memberName)}${data.memberAttorneyName ? `<br/><span class="muted">Counsel: ${escapeHtml(data.memberAttorneyName)}</span>` : ""}<br/><br/>
      <strong>Non-member / alternate payee:</strong> ${escapeHtml(data.nonMemberName)}${data.nonMemberAttorneyName ? `<br/><span class="muted">Counsel: ${escapeHtml(data.nonMemberAttorneyName)}</span>` : ""}
    </div>
    <p>To Whom It May Concern:</p>
    ${parasHtml}
    <div class="signature">
      <p>Sincerely,</p>
      <div class="sig-name">${escapeHtml(data.qdroCompanyName)}</div>
      <div class="sig-title">QDRO preparation services</div>
    </div>
    ${supportLine}
    ${ccBlock}
  </div>
</body>
</html>`;
}
