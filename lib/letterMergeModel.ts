import { prisma } from "@/lib/prisma";
import { dec } from "@/lib/crypto";
import { buildViewModel } from "@/lib/viewModel";

function safeDec(b64?: string | null) {
  try {
    return b64 ? dec(b64) : "";
  } catch {
    return "";
  }
}

function partyLine(p: {
  firstName: string;
  lastName: string;
  fkaLastName?: string | null;
}) {
  const base = `${p.firstName} ${p.lastName}`.trim();
  return p.fkaLastName ? `${base} (fka ${p.fkaLastName})` : base;
}

/**
 * Merge model for correspondence templates (letters + non-filed attachment).
 * Use in Word as {{firm.name}}, {{attachment.petitioner_heading}}, etc.
 */
export async function buildLetterMergeModel(matterId: string) {
  const base = await buildViewModel(matterId);
  const m = await prisma.matter.findUnique({
    where: { id: matterId },
    include: { petitioner: true, respondent: true },
  });
  if (!m) throw new Error("Matter not found");

  const countyDisplay =
    m.county === "Other" ? m.otherCounty || "California" : m.county;
  const petName = partyLine(m.petitioner);
  const respName = partyLine(m.respondent);

  const petDob = safeDec(m.petitioner.dobEnc);
  const petSsn = safeDec(m.petitioner.ssnEnc);
  const respDob = safeDec(m.respondent.dobEnc);
  const respSsn = safeDec(m.respondent.ssnEnc);

  const dobSsn = (label: string, dob: string, ssn: string) => {
    const d = dob || "________________";
    const s = ssn || "________________";
    return `${label}\nDate of birth: ${d}\nSocial Security Number: ${s}`;
  };

  const identifiersBlock = [
    `Petitioner:\n${dobSsn(petName, petDob, petSsn)}`,
    "",
    `Respondent:\n${dobSsn(respName, respDob, respSsn)}`,
  ].join("\n");

  return {
    ...base,
    firm: {
      name: "QDROdl.app",
      website: "https://qdrodl.app",
      signer_name: "Joseph Depew",
      signer_title: "QDRO Support Specialist",
    },
    letter: {
      date_today: new Date().toLocaleDateString("en-US", {
        dateStyle: "long",
      }),
    },
    attachment: {
      case_caption_line: `In re the case of ${m.caseNumber}`,
      county_court_line: `${countyDisplay} County`,
      petitioner_heading: `Petitioner: ${petName}`,
      respondent_heading: `Respondent: ${respName}`,
      identifiers_intro:
        "The date of birth and Social Security number for each party are listed below.",
      petitioner_dob: petDob || "",
      petitioner_ssn: petSsn || "",
      respondent_dob: respDob || "",
      respondent_ssn: respSsn || "",
      petitioner_dob_line: `Petitioner date of birth: ${petDob || "_______________"}`,
      petitioner_ssn_line: `Petitioner Social Security Number: ${petSsn || "_______________"}`,
      respondent_dob_line: `Respondent date of birth: ${respDob || "_______________"}`,
      respondent_ssn_line: `Respondent Social Security Number: ${respSsn || "_______________"}`,
      identifiers_block: identifiersBlock,
    },
  };
}
