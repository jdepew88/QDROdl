/**
 * Data object passed to docx-templates (`cmdDelimiter` `{{` `}}`). Each field replaces client-specific
 * text in a Word template—sample orders used as models must have those facts removed and swapped
 * for these paths (examples: `{{caseInfo.number}}`, `{{court.county}}`,
 * `{{dates.dom}}`, `{{dates.dos}}`, `{{dates.doj}}` (formatted `Month DD, YYYY`, two-digit day, UTC calendar),
 * `{{judgment.filed_text}}`, `{{member.caption_full_name}}`, `{{member.address_full_name}}`, `{{member.signature_full_name}}`,
 * `{{participant.pronouns.subject}}` / `object` / `possessive` / `reflexive`, `{{participant.Subject}}`,
 * `{{signature.petitioner.caption_block}}`, `{{signature.petitioner.printed_name}}`, `{{signature.petitioner.signatory_line}}`,
 * `{{nonmember_beneficiary.b1.name}}` … `b4`, `{{calpers.order_model}}`, etc.).
 *
 * **FKA / former name (Party row):** `lastName` = current legal surname on the case caption (e.g. married **Doe**).
 * `fkaLastName` = surname being **restored** (e.g. **Smith**). Merge output:
 * - `caption_full_name` → `JANE DOE` (ALL CAPS)
 * - `address_full_name` → `JANE SMITH (fka Doe)` — caps on personal name; lowercase `fka`; title-case current surname in parens
 * - `signature_full_name` → `JANE SMITH` (ALL CAPS)
 * Same three fields on `party.petitioner` / `party.respondent`, `member`, `altpayee`, `nonmember`.
 * `party.*.full_name` and `member.name_line` alias **caption** for backward compatibility.
 * `member.display_name` / `altpayee.display_name` = **address** line (with FKA parenthetical when set).
 *
 * Pro per `caption_block` is built with: `Petitioner JANE DOE`, next line `JANE SMITH (fka Doe)`, then street/city/ZIP/phone.
 * Attorney caption blocks unchanged. Pronouns stay normal case. Model B beneficiary `name` fields stay ALL CAPS.
 *
 * Core: `{{caseInfo.number}}`, `{{court.county}}`, dates, phones, addresses, `{{calpers.order_model}}`, …
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
import { formatMergeDate } from "@/lib/mergeFormat";
import {
  partyAddressLineName,
  partyCaptionNameUpper,
  partySignatureNameUpper,
} from "@/lib/partyMergeNames";

function partyNameUpper(s: string) {
  return (s || "").toUpperCase();
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

  const petCaptionUpper = partyCaptionNameUpper(m.petitioner);
  const petAddressLine = partyAddressLineName(m.petitioner);
  const petSignatureUpper = partySignatureNameUpper(m.petitioner);
  const respCaptionUpper = partyCaptionNameUpper(m.respondent);
  const respAddressLine = partyAddressLineName(m.respondent);
  const respSignatureUpper = partySignatureNameUpper(m.respondent);

  const petCaption = petAtt?.name?.trim()
    ? attorneyCaptionBlock({
        name: petAtt.name,
        address1: petAtt.address1,
        address2: petAtt.address2,
        phone: petAtt.phone,
        forLabel: "Attorney for Petitioner",
      })
    : proPerCaptionBlock({
        captionNameUpper: petCaptionUpper,
        addressLineName: petAddressLine,
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
        captionNameUpper: respCaptionUpper,
        addressLineName: respAddressLine,
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
    ? formatMergeDate(m.doj)
    : m.concurrentWithJudgment
      ? JUDGMENT_PENDING_CONCURRENT_TEXT
      : "not yet filed";

  const beneRows = beneMerge.nonmember_beneficiary_rows.map((r) => ({
    ...r,
    name: partyNameUpper(r.name),
  }));
  const beneSlots = beneMerge.nonmember_beneficiary;
  const nonmemberBeneficiaryUpper = {
    b1: { ...beneSlots.b1, name: partyNameUpper(beneSlots.b1.name) },
    b2: { ...beneSlots.b2, name: partyNameUpper(beneSlots.b2.name) },
    b3: { ...beneSlots.b3, name: partyNameUpper(beneSlots.b3.name) },
    b4: { ...beneSlots.b4, name: partyNameUpper(beneSlots.b4.name) },
  };

  return {
    court: {
      county:
        m.county === "Other" ? m.otherCounty || "California" : m.county,
    },
    caseInfo: { number: m.caseNumber },
    dates: {
      dom: formatMergeDate(m.dom),
      dos: formatMergeDate(m.dos),
      doj: formatMergeDate(m.doj),
    },
    judgment: { filed_text: judgmentFiledText },
    joinder: { filed_text: "" },
    party: {
      petitioner: {
        /** Current legal caption name (ALL CAPS), e.g. `JANE DOE`. */
        caption_full_name: petCaptionUpper,
        /** Line above address, e.g. `JANE SMITH (fka Doe)` when FKA set. */
        address_full_name: petAddressLine,
        /** Signature / typed name (ALL CAPS), e.g. `JANE SMITH` when restoring surname. */
        signature_full_name: petSignatureUpper,
        /** @deprecated Prefer caption_full_name — same as caption_full_name. */
        full_name: petCaptionUpper,
        first: partyNameUpper(m.petitioner.firstName),
        last: partyNameUpper(m.petitioner.lastName),
        fka_last: partyNameUpper(m.petitioner.fkaLastName || ""),
        phone: m.petitioner.phone || "",
      },
      respondent: {
        caption_full_name: respCaptionUpper,
        address_full_name: respAddressLine,
        signature_full_name: respSignatureUpper,
        full_name: respCaptionUpper,
        first: partyNameUpper(m.respondent.firstName),
        last: partyNameUpper(m.respondent.lastName),
        fka_last: partyNameUpper(m.respondent.fkaLastName || ""),
        phone: m.respondent.phone || "",
      },
    },
    member: {
      side: memberSide,
      caption_full_name: partyCaptionNameUpper(member),
      address_full_name: partyAddressLineName(member),
      signature_full_name: partySignatureNameUpper(member),
      name_line: partyCaptionNameUpper(member),
      display_name: partyAddressLineName(member),
      address_line1: partyMergeAddressLine1(member),
      address_line2: partyMergeAddressLine2(member),
      phone: member.phone || "",
      dob: safeDec(member.dobEnc),
      ssn_full: safeDec(member.ssnEnc),
    },
    nonmember: {
      side: memberSide === "PETITIONER" ? "RESPONDENT" : "PETITIONER",
      caption_full_name: partyCaptionNameUpper(nonMember),
      address_full_name: partyAddressLineName(nonMember),
      signature_full_name: partySignatureNameUpper(nonMember),
      display_name: partyAddressLineName(nonMember),
    },
    participant: {
      pronouns: participantPronouns,
      /** Title-case subject for sentence starts if needed in templates */
      Subject: participantPronouns.subject.replace(/^\w/, (c) =>
        c.toUpperCase(),
      ),
    },
    altpayee: {
      caption_full_name: partyCaptionNameUpper(nonMember),
      address_full_name: partyAddressLineName(nonMember),
      signature_full_name: partySignatureNameUpper(nonMember),
      name_line: partyCaptionNameUpper(nonMember),
      display_name: partyAddressLineName(nonMember),
      address_line1: partyMergeAddressLine1(nonMember),
      address_line2: partyMergeAddressLine2(nonMember),
      phone: nonMember.phone || "",
      dob: safeDec(nonMember.dobEnc),
      ssn_full: safeDec(nonMember.ssnEnc),
    },
    /** Non-member spouse’s designated beneficiaries (e.g. CalPERS Model B). */
    nonmember_beneficiary_rows: beneRows,
    nonmember_beneficiary: nonmemberBeneficiaryUpper,
    /** CalPERS-specific flags from plan selection (for conditionals inside a single DOCX). */
    calpers: {
      order_model: calpersSel?.calpersOrderModel ?? "",
      option_3w: Boolean(calpersSel?.calpersOption3W),
      model_c_form: calpersSel?.calpersModelCForm ?? "",
    },
    division: { percentage_text: "Fifty Percent (50%)" },
    attorney: {
      petitioner: {
        name: partyNameUpper(petAtt?.name || ""),
        is_pro_per: petProPer,
      },
      respondent: {
        name: partyNameUpper(respAtt?.name || ""),
        is_pro_per: respProPer,
      },
    },
    signature: {
      petitioner: {
        caption_block: petCaption,
        /** Typed name under signature (ALL CAPS; restored surname when FKA set). */
        printed_name: petSignatureUpper,
        /** Line printed at the signature for Petitioner */
        signatory_line: petProPer
          ? "Petitioner, In Pro Per"
          : petSignatureUpper,
      },
      respondent: {
        caption_block: respCaption,
        printed_name: respSignatureUpper,
        signatory_line: respProPer
          ? "Respondent, In Pro Per"
          : respSignatureUpper,
      },
    },
    preparer: { name: "Your Company", title: "QDRO Preparer" },
  };
}
