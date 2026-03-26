/**
 * Plan keys match intake (`app/intake/plans/page.tsx`) and Prisma `PlanSelection.planKey`.
 * Template file names are relative to the `templates/` directory (added when document models ship).
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

/** Stable ids for Word templates; keys must exist in `TEMPLATE_FILES`. */
export type TemplateId = string;

export const TEMPLATE_FILES: Record<TemplateId, string> = {};

export interface PlanTemplateInput {
  plan: PlanKey;
  isInPayStatus?: boolean;
  usesTimeRule?: boolean;
  laceraOption4?: boolean;
}

/**
 * Resolves which `.docx` stubs apply for a plan + answers.
 * Returns ids that exist in `TEMPLATE_FILES` once template files are added under `templates/`.
 */
export function pickTemplateForPlan(input: PlanTemplateInput): TemplateId[] {
  void input;
  return [];
}
