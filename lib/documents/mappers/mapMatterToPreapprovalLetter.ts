import type { AttorneyInfo, Matter, Party, PlanSelection } from "@prisma/client";
import { INTAKE_PLAN_OPTIONS } from "@/data/intakePlanOptions";
import type { PlanKey } from "@/data/templates";
import {
  DEFAULT_CALPERS_RECIPIENT_LINES,
  QDRODL_DEFAULT_COMPANY_NAME,
  QDRODL_DEFAULT_TAGLINE,
} from "@/lib/documents/constants";
import type { PreapprovalLetterData } from "@/lib/documents/types";
import { partyMergeAddressLine1, partyMergeAddressLine2 } from "@/lib/partyAddressLines";

type MatterWithRelations = Matter & {
  petitioner: Party;
  respondent: Party;
  plans: PlanSelection[];
  attorneys: AttorneyInfo[];
};

function planLabel(planKey: string): string {
  const row = INTAKE_PLAN_OPTIONS.find((o) => o.key === planKey);
  return row?.label ?? planKey;
}

function partyFullName(p: Party): string {
  return `${p.firstName} ${p.lastName}`.trim();
}

function attorneyNameForSide(
  attorneys: AttorneyInfo[],
  side: "PETITIONER" | "RESPONDENT",
): string | null {
  const row = attorneys.find((a) => a.side === side);
  const n = row?.name?.trim();
  return n || null;
}

function formatCourtName(county: string, otherCounty: string | null): string {
  const c =
    county === "Other" && (otherCounty || "").trim()
      ? (otherCounty as string).trim()
      : county;
  return `Superior Court of California, County of ${c}`;
}

function companyMailingLines(): string[] {
  const json = process.env.QDRODL_MAILING_ADDRESS_JSON;
  if (json) {
    try {
      const parsed = JSON.parse(json) as unknown;
      if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
        return parsed as string[];
      }
    } catch {
      /* fall through */
    }
  }
  const line1 = process.env.QDRODL_MAILING_LINE1;
  const line2 = process.env.QDRODL_MAILING_LINE2;
  const line3 = process.env.QDRODL_MAILING_LINE3;
  const lines = [line1, line2, line3].filter(
    (x): x is string => typeof x === "string" && x.trim().length > 0,
  );
  if (lines.length > 0) return lines;
  return [
    QDRODL_DEFAULT_COMPANY_NAME,
    "https://qdrodl.app",
  ];
}

function calpersRecipientLines(): string[] {
  const json = process.env.CALPERS_LETTER_RECIPIENT_JSON;
  if (json) {
    try {
      const parsed = JSON.parse(json) as unknown;
      if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
        return parsed as string[];
      }
    } catch {
      /* fall through */
    }
  }
  return [...DEFAULT_CALPERS_RECIPIENT_LINES];
}

/**
 * Pick the CalPERS plan row; throws if none.
 */
export function getCalpersPlanSelection(m: MatterWithRelations): PlanSelection {
  const row = m.plans.find((p) => p.planKey === "calpers");
  if (!row) {
    throw new Error("This matter has no CalPERS plan selection.");
  }
  return row;
}

/**
 * CalPERS Model A preapproval is only for active (non–in-pay) Model A orders.
 */
export function assertCalpersModelAEligible(plan: PlanSelection): void {
  if (plan.planKey !== "calpers") {
    throw new Error("Preapproval letter (this template) requires CalPERS.");
  }
  if (plan.isInPayStatus) {
    throw new Error(
      "Preapproval letter (Model A) applies to members not yet in pay status. This matter indicates pay status — use a Model C workflow instead.",
    );
  }
  const model = (plan.calpersOrderModel || "A").toUpperCase();
  if (model !== "A") {
    throw new Error(
      `Preapproval letter (Model A) requires CalPERS Model A. This matter is Model ${model}.`,
    );
  }
}

export function mapMatterToPreapprovalLetter(
  m: MatterWithRelations,
): PreapprovalLetterData {
  const plan = getCalpersPlanSelection(m);
  assertCalpersModelAEligible(plan);

  const pet = m.petitioner;
  const resp = m.respondent;
  const member = m.petitionerIsMember ? pet : resp;
  const nonMember = m.petitionerIsMember ? resp : pet;

  const memberAtty = m.petitionerIsMember
    ? attorneyNameForSide(m.attorneys, "PETITIONER")
    : attorneyNameForSide(m.attorneys, "RESPONDENT");
  const nonMemberAtty = m.petitionerIsMember
    ? attorneyNameForSide(m.attorneys, "RESPONDENT")
    : attorneyNameForSide(m.attorneys, "PETITIONER");

  const cc: string[] = [];
  if (memberAtty) cc.push(`Counsel for member: ${memberAtty}`);
  if (nonMemberAtty) cc.push(`Counsel for non-member: ${nonMemberAtty}`);

  const planName = planLabel(plan.planKey as PlanKey);
  const modelLabel =
    "CalPERS Domestic Relations Order — Model A (Separation of Account)";

  return {
    generatedDate: new Date().toLocaleDateString("en-US", {
      dateStyle: "long",
      timeZone: "America/Los_Angeles",
    }),
    courtName: formatCourtName(m.county, m.otherCounty),
    county:
      m.county === "Other" && (m.otherCounty || "").trim()
        ? (m.otherCounty as string).trim()
        : m.county,
    caseNumber: m.caseNumber.trim(),
    caseCaption: `In re the Marriage of ${partyFullName(pet)} and ${partyFullName(resp)}`,
    memberName: partyFullName(member),
    memberAttorneyName: memberAtty,
    nonMemberName: partyFullName(nonMember),
    nonMemberAttorneyName: nonMemberAtty,
    planName,
    modelLabel,
    qdroCompanyName: process.env.QDRODL_COMPANY_NAME?.trim() || QDRODL_DEFAULT_COMPANY_NAME,
    qdroTagline:
      process.env.QDRODL_TAGLINE?.trim() || QDRODL_DEFAULT_TAGLINE,
    mailingAddressLines: companyMailingLines(),
    supportEmail:
      process.env.QDRODL_SUPPORT_EMAIL?.trim() ||
      process.env.SUPPORT_EMAIL?.trim() ||
      null,
    planRecipientLines: calpersRecipientLines(),
    ccLines: cc.length ? cc : undefined,
  };
}

/**
 * Merge-based return address for metadata / future templates (not all used in preapproval body).
 */
export function matterReturnAddressLines(m: MatterWithRelations): string[] {
  const p = m.petitioner;
  const lines = [
    partyFullName(p),
    partyMergeAddressLine1(p),
    partyMergeAddressLine2(p),
  ].filter((x) => x.length > 0);
  return lines;
}
