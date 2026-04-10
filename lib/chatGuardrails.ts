const DOMAIN_KEYWORDS = [
  "qdro",
  "dro",
  "joinder",
  "calpers",
  "calstrs",
  "lacera",
  "lacers",
  "retirement",
  "pension",
  "401k",
  "403b",
  "457",
  "plan",
  "alternate payee",
  "participant",
  "domestic relations order",
  "dissolution",
  "divorce",
  "court order",
  "case number",
  "filing",
  "service",
  "preapproval",
  "employer",
  "timeline",
  "process",
];

const BANNED_CATEGORIES = [
  "stock tips",
  "crypto",
  "sports betting",
  "medical diagnosis",
  "drug dosage",
  "politics",
  "dating advice",
  "homework",
  "gaming",
  "recipe",
  "travel itinerary",
];

export function isQuestionInScope(question: string): {
  inScope: boolean;
  reason: string;
} {
  const q = question.toLowerCase();
  for (const banned of BANNED_CATEGORIES) {
    if (q.includes(banned)) {
      return { inScope: false, reason: `Out of scope topic (${banned}).` };
    }
  }
  const matched = DOMAIN_KEYWORDS.some((k) => q.includes(k));
  if (!matched) {
    return {
      inScope: false,
      reason: "Question does not appear to be about QDRO / plan guidance.",
    };
  }
  return { inScope: true, reason: "Domain keyword match." };
}

export function policyBlockMessage(): string {
  return (
    "I can only answer QDROdl topics: retirement plan identification, QDRO/DRO process, joinders, filing timeline, and plan-specific guidance. " +
    "Please ask a QDRO or retirement-plan question (for example: employer + likely plan, or where your matter is in the process)."
  );
}

