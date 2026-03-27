import type { PlanKey } from "@/data/templates";

export const INTAKE_PLAN_OPTIONS: { key: PlanKey; label: string }[] = [
  { key: "calpers", label: "CalPERS" },
  { key: "calstrs", label: "CalSTRS" },
  { key: "lacera", label: "LACERA" },
  { key: "la_457", label: "County of LA Deferred Comp (457)" },
  { key: "mpi_pension", label: "Motion Picture Industry Pension (DB)" },
  { key: "mpi_iap", label: "Motion Picture Industry IAP (DC)" },
  { key: "federal", label: "Federal (FERS / CSRS / TSP)" },
  { key: "generic_dc", label: "Generic defined contribution (401k/403b/etc.)" },
];

