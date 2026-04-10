/**
 * Data object passed to docx-templates (`cmdDelimiter` `{{` `}}`). Each field replaces client-specific
 * text in a Word template—sample orders used as models must have those facts removed and swapped
 * for these paths (examples: `{{party.petitioner.full_name}}`, `{{caseInfo.number}}`, `{{court.county}}`,
 * `{{dates.dom}}`, `{{dates.dos}}`, `{{dates.doj}}`, `{{judgment.filed_text}}` (judgment date, concurrent-filing
 * paragraph when no date + concurrent checkbox, else `not yet filed`), `{{member.display_name}}`, `{{altpayee.display_name}}`,
 * `{{participant.pronouns.subject}}` / `object` / `possessive` / `reflexive`, `{{participant.Subject}}`,
 * `{{signature.petitioner.caption_block}}`, `{{signature.respondent.caption_block}}`,
 * `{{signature.petitioner.signatory_line}}`, `{{nonmember_beneficiary.b1.name}}` … `b4`,
 * `{{calpers.order_model}}`, `{{calpers.option_3w}}`, `{{calpers.model_c_form}}`).
 *
 * CalPERS Model A (line-based pleading block example, page 1 top-left):
 *   {{party.petitioner.full_name}}
 *   Petitioner, In Pro Per
 *   {{member.address_line1}}
 *   {{member.address_line2}}
 *   {{party.petitioner.phone}}
 *
 * Core placeholders (also use in body): `{{caseInfo.number}}` (not `case.*`—`case` is a JS keyword in docx-templates), `{{court.county}}`,
 * `{{dates.dom}}`, `{{dates.dos}}`, `{{dates.doj}}`, `{{party.petitioner.full_name}}`,
 * `{{party.respondent.full_name}}`, `{{member.display_name}}`, `{{altpayee.display_name}}`,
 * `{{member.address_line1}}`, `{{member.address_line2}}`, `{{altpayee.address_line1}}`,
 * `{{altpayee.address_line2}}`, `{{party.petitioner.phone}}`, `{{party.respondent.phone}}`.
 */
import { prisma } from "@/lib/prisma";
import { dec } from "@/lib/crypto";
import { pronounsForSpouseType } from "@/lib/pronouns";
import {
  attorneyCaptionBlock,
  proPerCaptionBlock,
} from "@/lib/signatureCaption";
import { mergeNonmemberBeneficiaryRows } from "@/lib/nonmemberBeneficiariesMerge";
import {
  partyMergeAddressLine1,
  partyMergeAddressLine2,
} from "@/lib/partyAddressLines";

function fmtDate(d: any) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US");
}

function safeDec(b64?: string | null) {
  try {
    return b64 ? dec(b64) : "";
  } catch {
    return "";
  }
}

/** Shown in DOCX when no judgment date is on file but the order is filed with the judgment. */
const JUDGMENT_PENDING_CONCURRENT_TEXT =
  "Judgment of Dissolution of Marriage has not yet been entered in this matter, and this Order will be filed concurrently with the Parties' Judgment of Dissolution of Marriage.";

function displayName(p: {
  firstName: string;
  lastName: string;
  fkaLastName?: string | null;
}) {
  const base = `${p.firstName} ${p.lastName}`.trim();
  return p.fkaLastName
    ? `${base} (fka ${p.fkaLastName})`
    : base;
}

export async function buildViewModel(matterId: string) {
  const m = await prisma.matter.findUnique({
    where: { id: matterId },
    include: {
      petitioner: true,
      respondent: true,
      plans: true,
      attorneys: true,
      altPayeeBeneficiaries: { orderBy: { sortOrder: "asc" } },
    },
  });
  if (!m) throw new Error("Matter not found");

  const memberSide = m.petitionerIsMember ? "PETITIONER" : "RESPONDENT";
  const member = memberSide === "PETITIONER" ? m.petitioner : m.respondent;
  const nonMember = memberSide === "PETITIONER" ? m.respondent : m.petitioner;

  const petAtt = m.attorneys.find((a) => a.side === "PETITIONER");
  const respAtt = m.attorneys.find((a) => a.side === "RESPONDENT");

  const petName = displayName(m.petitioner);
  const respName = displayName(m.respondent);

  const petCaption = petAtt?.name?.trim()
    ? attorneyCaptionBlock({
        name: petAtt.name,
        address1: petAtt.address1,
        address2: petAtt.address2,
        phone: petAtt.phone,
        forLabel: "Attorney for Petitioner",
      })
    : proPerCaptionBlock({
        fullName: petName,
        role: "Petitioner",
        address1: partyMergeAddressLine1(m.petitioner),
        address2: partyMergeAddressLine2(m.petitioner),
        phone: m.petitioner.phone,
      });

  const respCaption = respAtt?.name?.trim()
    ? attorneyCaptionBlock({
        name: respAtt.name,
        address1: respAtt.address1,
        address2: respAtt.address2,
        phone: respAtt.phone,
        forLabel: "Attorney for Respondent",
      })
    : proPerCaptionBlock({
        fullName: respName,
        role: "Respondent",
        address1: partyMergeAddressLine1(m.respondent),
        address2: partyMergeAddressLine2(m.respondent),
        phone: m.respondent.phone,
      });

  const petProPer =
    Boolean(m.petitioner.selfRepresented) || !petAtt?.name?.trim();
  const respProPer =
    Boolean(m.respondent.selfRepresented) || !respAtt?.name?.trim();

  const participantPronouns = pronounsForSpouseType(member.spouseType);

  const beneMerge = mergeNonmemberBeneficiaryRows(m.altPayeeBeneficiaries);
  const calpersSel = m.plans.find((p) => p.planKey === "calpers");

  const judgmentFiledText = m.doj
    ? fmtDate(m.doj)
    : m.concurrentWithJudgment
      ? JUDGMENT_PENDING_CONCURRENT_TEXT
      : "not yet filed";

  return {
    court: {
      county:
        m.county === "Other" ? m.otherCounty || "California" : m.county,
    },
    caseInfo: { number: m.caseNumber },
    dates: { dom: fmtDate(m.dom), dos: fmtDate(m.dos), doj: fmtDate(m.doj) },
    judgment: { filed_text: judgmentFiledText },
    joinder: { filed_text: "" },
    party: {
      petitioner: {
        full_name: petName,
        first: m.petitioner.firstName,
        last: m.petitioner.lastName,
        fka_last: m.petitioner.fkaLastName || "",
        phone: m.petitioner.phone || "",
      },
      respondent: {
        full_name: respName,
        first: m.respondent.firstName,
        last: m.respondent.lastName,
        fka_last: m.respondent.fkaLastName || "",
        phone: m.respondent.phone || "",
      },
    },
    member: {
      side: memberSide,
      name_line: `${member.firstName} ${member.lastName}`,
      display_name: displayName(member),
      address_line1: partyMergeAddressLine1(member),
      address_line2: partyMergeAddressLine2(member),
      phone: member.phone || "",
      dob: safeDec(member.dobEnc),
      ssn_full: safeDec(member.ssnEnc),
    },
    nonmember: {
      side: memberSide === "PETITIONER" ? "RESPONDENT" : "PETITIONER",
      display_name: displayName(nonMember),
    },
    participant: {
      pronouns: participantPronouns,
      /** Title-case subject for sentence starts if needed in templates */
      Subject: participantPronouns.subject.replace(/^\w/, (c) =>
        c.toUpperCase(),
      ),
    },
    altpayee: {
      name_line: `${nonMember.firstName} ${nonMember.lastName}`,
      display_name: displayName(nonMember),
      address_line1: partyMergeAddressLine1(nonMember),
      address_line2: partyMergeAddressLine2(nonMember),
      phone: nonMember.phone || "",
      dob: safeDec(nonMember.dobEnc),
      ssn_full: safeDec(nonMember.ssnEnc),
    },
    /** Non-member spouse’s designated beneficiaries (e.g. CalPERS Model B). */
    nonmember_beneficiary_rows: beneMerge.nonmember_beneficiary_rows,
    nonmember_beneficiary: beneMerge.nonmember_beneficiary,
    /** CalPERS-specific flags from plan selection (for conditionals inside a single DOCX). */
    calpers: {
      order_model: calpersSel?.calpersOrderModel ?? "",
      option_3w: Boolean(calpersSel?.calpersOption3W),
      model_c_form: calpersSel?.calpersModelCForm ?? "",
    },
    division: { percentage_text: "Fifty Percent (50%)" },
    attorney: {
      petitioner: {
        name: petAtt?.name || "",
        is_pro_per: petProPer,
      },
      respondent: {
        name: respAtt?.name || "",
        is_pro_per: respProPer,
      },
    },
    signature: {
      petitioner: {
        caption_block: petCaption,
        /** Line printed at the signature for Petitioner */
        signatory_line: petProPer
          ? "Petitioner, In Pro Per"
          : petName.toUpperCase(),
      },
      respondent: {
        caption_block: respCaption,
        signatory_line: respProPer
          ? "Respondent, In Pro Per"
          : respName.toUpperCase(),
      },
    },
    preparer: { name: "Your Company", title: "QDRO Preparer" },
  };
}
