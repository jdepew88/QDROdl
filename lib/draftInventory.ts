import path from "path";
import type { PlanSelection } from "@prisma/client";
import { pickTemplateForPlan, TEMPLATE_FILES, type PlanKey } from "@/data/templates";
import { LETTER_TEMPLATE_REGISTRY } from "@/data/letterTemplates";
import { planLabelForKey } from "@/lib/planDisplay";

export type DocFile = {
  name: string;
  url: string;
  updatedAt: string | null;
  size: number | null;
};

function templateStemsForPlanRow(
  row: PlanSelection,
  petitionerIsMember: boolean,
  petitionerSpouseType: string | null | undefined,
): string[] {
  const ids = pickTemplateForPlan({
    plan: row.planKey as PlanKey,
    isInPayStatus: row.isInPayStatus,
    usesTimeRule: row.usesTimeRule ?? undefined,
    laceraOption4: row.laceraOption4 ?? undefined,
    petitionerIsMember,
    petitionerSpouseType,
    calpersOrderModel: (row.calpersOrderModel as "A" | "B" | "C" | undefined) ?? undefined,
    calpersOption3W: row.calpersOption3W ?? undefined,
    calpersModelCForm: (row.calpersModelCForm as "standard" | "dro" | undefined) ?? undefined,
  });
  const stems = new Set<string>();
  for (const id of ids) {
    const file = TEMPLATE_FILES[id as keyof typeof TEMPLATE_FILES];
    if (file) stems.add(path.parse(file).name);
  }
  return [...stems];
}

const LETTER_STEMS = new Set(
  Object.values(LETTER_TEMPLATE_REGISTRY).map((e) => e.templateId),
);

function fileMatchesStem(fileName: string, stem: string) {
  if (fileName === `${stem}.docx` || fileName === `${stem}.pdf`) return true;
  if (fileName.startsWith(`${stem}_`)) return true;
  return false;
}

/** Group saved draft files under each plan row; letters and unmatched go to buckets. */
export function groupDraftFilesByPlan(
  files: DocFile[],
  planRows: PlanSelection[],
  petitionerIsMember: boolean,
  petitionerSpouseType?: string | null,
): {
  planGroups: {
    planSelectionId: string;
    planKey: string;
    label: string;
    joinderRequired: boolean;
    stems: string[];
    files: DocFile[];
  }[];
  letterFiles: DocFile[];
  otherFiles: DocFile[];
} {
  const used = new Set<string>();
  const letterFiles: DocFile[] = [];
  for (const f of files) {
    for (const stem of LETTER_STEMS) {
      if (fileMatchesStem(f.name, stem)) {
        letterFiles.push(f);
        used.add(f.name);
        break;
      }
    }
  }

  const planGroups = planRows.map((row) => ({
    planSelectionId: row.id,
    planKey: row.planKey,
    label: planLabelForKey(row.planKey),
    joinderRequired: row.joinderRequired,
    stems: templateStemsForPlanRow(row, petitionerIsMember, petitionerSpouseType),
    files: [] as DocFile[],
  }));

  for (const f of files) {
    if (used.has(f.name)) continue;
    let placed = false;
    for (const g of planGroups) {
      for (const stem of g.stems) {
        if (fileMatchesStem(f.name, stem)) {
          g.files.push(f);
          used.add(f.name);
          placed = true;
          break;
        }
      }
      if (placed) break;
    }
  }

  const otherFiles = files.filter((f) => !used.has(f.name));
  return { planGroups, letterFiles, otherFiles };
}
