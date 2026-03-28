export type DashNavItem = {
  href: string;
  label: string;
  description?: string;
};

export const DASH_NAV_MAIN: DashNavItem[] = [
  { href: "/dash", label: "Overview", description: "Cases and new intake" },
  {
    href: "/dash/process",
    label: "How it works",
    description: "5-step process overview",
  },
  { href: "/dash/documents", label: "Documents", description: "Drafts, letters, guides" },
  { href: "/dash/payments", label: "Payments", description: "Invoices & receipts" },
  { href: "/dash/profile", label: "Profile", description: "Account information" },
];
