/**
 * Canonical plan URLs: /plan/<slug>
 * Use for nav, metadata titles, and the all-plans index.
 */
export type PlanSlug =
  | "calpers"
  | "calstrs"
  | "lacera"
  | "la457"
  | "lacers"
  | "city_la_457"
  | "fire_police_pension"
  | "mp"
  | "generic_dc"
  | "generic_db"
  | "federal"
  | "joinders";

export type PlanRouteEntry = {
  slug: PlanSlug;
  /** Text shown in the site header Plans menu */
  navLabel: string;
  /** Short title for <title> (layout adds " | QDROdl") */
  documentTitle: string;
  /** Subtitle on /all_plans */
  description: string;
};

export const PLAN_ROUTE_ENTRIES: PlanRouteEntry[] = [
  {
    slug: "calpers",
    navLabel: "CalPERS",
    documentTitle: "CalPERS",
    description: "California Public Employees’ Retirement System",
  },
  {
    slug: "calstrs",
    navLabel: "CalSTRS",
    documentTitle: "CalSTRS",
    description: "California State Teachers’ Retirement System",
  },
  {
    slug: "lacera",
    navLabel: "LACERA",
    documentTitle: "LACERA",
    description: "Los Angeles County Employees Retirement Association",
  },
  {
    slug: "la457",
    navLabel: "Co LA Deferred Comp",
    documentTitle: "County of LA Deferred Compensation",
    description: "457(b) and related deferred compensation",
  },
  {
    slug: "lacers",
    navLabel: "LACERS",
    documentTitle: "Los Angeles City Employees' Retirement System",
    description: "City of Los Angeles civilian pension benefit divisions",
  },
  {
    slug: "city_la_457",
    navLabel: "City of LA Deferred Compensation",
    documentTitle: "City of Los Angeles Deferred Compensation",
    description: "City of Los Angeles deferred compensation plan divisions",
  },
  {
    slug: "fire_police_pension",
    navLabel: "LA Fire and Police Pension",
    documentTitle: "Los Angeles Fire and Police Pension",
    description: "LAFPP pension benefit division and survivor benefit orders",
  },
  {
    slug: "mp",
    navLabel: "Motion Picture Plan",
    documentTitle: "Motion Picture Industry plans",
    description: "MPI pension (DB) and IAP (DC) models",
  },
  {
    slug: "generic_dc",
    navLabel: "Generic Defined Contribution",
    documentTitle: "Generic defined contribution",
    description: "401(k), 403(b), and similar DC plans",
  },
  {
    slug: "generic_db",
    navLabel: "Generic Defined Benefit",
    documentTitle: "Generic defined benefit (pensions)",
    description:
      "Traditional pension-style plans that pay a monthly benefit from a formula",
  },
  {
    slug: "federal",
    navLabel: "Federal (FERS, CSRS, TSP)",
    documentTitle: "Federal retirement",
    description: "FERS, CSRS, and TSP-related divisions",
  },
  {
    slug: "joinders",
    navLabel: "Joinders",
    documentTitle: "Joinders",
    description: "When the plan must be joined to the dissolution case",
  },
];

export function planPath(slug: PlanSlug): string {
  return `/plan/${slug}`;
}

export function planEntryForSlug(slug: string): PlanRouteEntry | undefined {
  return PLAN_ROUTE_ENTRIES.find((e) => e.slug === slug);
}
