/**
 * Plan keys match intake (`app/intake/plans/page.tsx`) and Prisma `PlanSelection.planKey`.
 * Template paths are relative to `templates/` (DOCX with `{{placeholders}}` for docx-templates).
 *
 * ## Preparing DOCX from a finished order
 * Strip **all** party- and case-specific text from the sample (names, FKA, addresses, phones,
 * attorney blocks, beneficiary names, case number, county, DOM/DOS/judgment dates, example SSN/DOB).
 * Replace those spots with merge tags supplied by `buildViewModel` in `lib/viewModel.ts`.
 * Keep neutral legal language; only variable facts should be placeholders.
 *
 * CalPERS: Model A/B/C × member on Petitioner vs Respondent (6 base DOCX files).
 * Model C has **two template families**: **standard** (`mod-c-*.docx`, optionally **Option 3W**
 * → `mod-c-option-3w-*.docx`) and **DRO** (`mod-c-dro-*.docx` from orders such as “Mod C DRO”).
 * Model B (and similar) often includes slots for the **non-member spouse’s** designated beneficiaries;
 * merge data exposes `nonmember_beneficiaries` (four padded rows) for those lines.
 * Convert WordPerfect (.wpd) sources to .docx before placing them here.
 */
export type PlanKey =
  | "calpers"
  | "calstrs"
  | "lacera"
  | "la_457"
  | "mpi_pension"
  | "mpi_iap"
  | "federal"
  | "generic_dc";

export type County =
  | "Los Angeles"
  | "Orange"
  | "Ventura"
  | "San Bernardino"
  | "San Diego"
  | "Other";

export type CalpersOrderModel = "A" | "B" | "C";

/** Which Model C Word template to use (two DOCX pairs under `templates/calpers/`). */
export type CalpersModelCForm = "standard" | "dro";

/** Stable ids for Word templates; keys exist in `TEMPLATE_FILES` once DOCX files are added. */
export type TemplateId = string;

/**
 * Expected filenames under `templates/calpers/`.
 * Replace stubs after copying converted model orders from completed cases.
 */
export const TEMPLATE_FILES: Record<TemplateId, string> = {
  "calpers-modA-pet-mem": "calpers/mod-a-petitioner-member.docx",
  "calpers-modA-resp-mem": "calpers/mod-a-respondent-member.docx",
  "calpers-modB-pet-mem": "calpers/mod-b-petitioner-member.docx",
  "calpers-modB-resp-mem": "calpers/mod-b-respondent-member.docx",
  "calpers-modC-pet-mem": "calpers/mod-c-petitioner-member.docx",
  "calpers-modC-resp-mem": "calpers/mod-c-respondent-member.docx",
  "calpers-modC-opt3w-pet-mem":
    "calpers/mod-c-option-3w-petitioner-member.docx",
  "calpers-modC-opt3w-resp-mem":
    "calpers/mod-c-option-3w-respondent-member.docx",
  "calpers-modC-dro-pet-mem": "calpers/mod-c-dro-petitioner-member.docx",
  "calpers-modC-dro-resp-mem": "calpers/mod-c-dro-respondent-member.docx",
};

export interface PlanTemplateInput {
  plan: PlanKey;
  isInPayStatus?: boolean;
  usesTimeRule?: boolean;
  laceraOption4?: boolean;
  /** From intake: which party is the plan member. */
  petitionerIsMember: boolean;
  /** CalPERS model order (A/B/C); required when plan is calpers. */
  calpersOrderModel?: CalpersOrderModel;
  /** CalPERS Model C: optional Option 3W (standard form only; separate template when true). */
  calpersOption3W?: boolean;
  /** CalPERS Model C: standard vs DRO template pair. */
  calpersModelCForm?: CalpersModelCForm;
}

function calpersTemplateId(
  model: CalpersOrderModel,
  petitionerIsMember: boolean,
  option3W: boolean,
  modelCForm: CalpersModelCForm,
): TemplateId {
  const m = model.toUpperCase();

  if (model === "C") {
    if (modelCForm === "dro") {
      return petitionerIsMember
        ? "calpers-modC-dro-pet-mem"
        : "calpers-modC-dro-resp-mem";
    }
    if (option3W) {
      return petitionerIsMember
        ? "calpers-modC-opt3w-pet-mem"
        : "calpers-modC-opt3w-resp-mem";
    }
    return petitionerIsMember
      ? "calpers-modC-pet-mem"
      : "calpers-modC-resp-mem";
  }

  return petitionerIsMember
    ? `calpers-mod${m}-pet-mem`
    : `calpers-mod${m}-resp-mem`;
}

/**
 * Resolves which `.docx` files to merge for a plan + answers.
 */
export function pickTemplateForPlan(input: PlanTemplateInput): TemplateId[] {
  if (input.plan === "calpers") {
    const model = input.calpersOrderModel ?? "A";
    const modelCForm: CalpersModelCForm =
      model === "C" ? input.calpersModelCForm ?? "standard" : "standard";
    const option3W =
      model === "C" &&
      modelCForm === "standard" &&
      Boolean(input.calpersOption3W);
    return [
      calpersTemplateId(
        model,
        input.petitionerIsMember,
        option3W,
        modelCForm,
      ),
    ];
  }
  void input.isInPayStatus;
  void input.usesTimeRule;
  void input.laceraOption4;
  return [];
}
