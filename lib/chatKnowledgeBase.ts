import { PLAN_ROUTE_ENTRIES } from "@/data/planRoutes";
import { PROCESS_OVERVIEW_STEPS } from "@/data/processOverview";

export const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "How long does the QDRO process take?",
    answer:
      "Typically 2-4 weeks from start to finish, depending on plan complexity and court requirements.",
  },
  {
    question: "Do I need a QDRO for all retirement accounts?",
    answer:
      "QDROs are required for employer-sponsored plans like 401(k)s and pensions. IRAs can be divided through the divorce decree.",
  },
  {
    question: "What is a joinder, and when is it required?",
    answer:
      "A joinder asks the court to join the retirement plan to the dissolution case. Some plan administrators require this before they review or implement a domestic relations order.",
  },
  {
    question: "Do you handle federal government retirement (FERS, CSRS, TSP)?",
    answer:
      "No. QDROdl focuses on California and related plans listed on the site. Federal systems follow different statutes and procedures.",
  },
  {
    question: "Is there a discount if I need more than one plan order?",
    answer:
      "Yes. First qualifying order is $595; additional orders in the same matter are $495 each.",
  },
];

export const EMPLOYER_PLAN_GUIDANCE: Array<{
  employerHint: string;
  likelyPlans: string[];
  notes: string;
}> = [
  {
    employerHint: "State of California agencies",
    likelyPlans: ["CalPERS", "Savings Plus 401(k)/457(b)"],
    notes:
      "Many state workers have CalPERS pensions and may also have Savings Plus deferred compensation accounts.",
  },
  {
    employerHint: "California public school districts / K-12 teachers",
    likelyPlans: ["CalSTRS", "403(b)"],
    notes:
      "Teachers are commonly in CalSTRS; some also contribute to district 403(b) or other supplemental plans.",
  },
  {
    employerHint: "Los Angeles County",
    likelyPlans: ["LACERA", "County of LA Deferred Compensation (457)"],
    notes:
      "County employees often have both pension and deferred compensation components.",
  },
  {
    employerHint: "City of Los Angeles civilian employees",
    likelyPlans: ["LACERS", "City of LA Deferred Compensation (457)"],
    notes: "City civilian staff often have pension + deferred compensation.",
  },
  {
    employerHint: "Los Angeles Fire / Police",
    likelyPlans: ["LAFPP (Fire and Police Pension)"],
    notes: "LAFPP commonly uses specialized pension order language.",
  },
  {
    employerHint: "Private sector employers",
    likelyPlans: ["401(k)", "Defined benefit pension", "ESOP/other DC plans"],
    notes:
      "Private plans usually need ERISA-style QDRO terms and plan-specific model language.",
  },
];

export function defaultKnowledgeSnippets(): Array<{ title: string; body: string }> {
  const snippets: Array<{ title: string; body: string }> = [];

  snippets.push({
    title: "Supported plan guides",
    body: PLAN_ROUTE_ENTRIES.map(
      (p) => `${p.navLabel}: ${p.description}`,
    ).join("\n"),
  });

  snippets.push({
    title: "Process timeline",
    body: PROCESS_OVERVIEW_STEPS.map(
      (s, i) => `${i + 1}. ${s.title} (${s.phase}, ${s.eta}) - ${s.detail}`,
    ).join("\n"),
  });

  snippets.push({
    title: "FAQ",
    body: FAQ_ITEMS.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n"),
  });

  snippets.push({
    title: "Employer to likely plan guidance",
    body: EMPLOYER_PLAN_GUIDANCE.map(
      (e) =>
        `${e.employerHint}: likely plans ${e.likelyPlans.join(", ")}. ${e.notes}`,
    ).join("\n"),
  });

  return snippets;
}

export function buildKnowledgeText(): string {
  return defaultKnowledgeSnippets()
    .map((s) => `## ${s.title}\n${s.body}`)
    .join("\n\n");
}

