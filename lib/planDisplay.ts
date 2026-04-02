import type { PlanKey } from "@/data/templates";
import { INTAKE_PLAN_OPTIONS } from "@/data/intakePlanOptions";

const EXTRA_LABELS: Record<string, string> = {
  federal: "Federal (TSP / FERS)",
};

export function planLabelForKey(planKey: string): string {
  const fromIntake = INTAKE_PLAN_OPTIONS.find((o) => o.key === (planKey as PlanKey));
  if (fromIntake) return fromIntake.label;
  return EXTRA_LABELS[planKey] || planKey.replace(/_/g, " ");
}
