export type ProcessStep = {
  icon: string;
  phase: string;
  eta: string;
  title: string;
  detail: string;
};

export const PROCESS_OVERVIEW_STEPS: ProcessStep[] = [
  {
    icon: "🧾",
    phase: "Intake",
    eta: "10-20 minutes",
    title: "Collect Info (& payment)",
    detail:
      "Complete intake details for both parties, case information, plan data, and submit payment to start drafting.",
  },
  {
    icon: "📄",
    phase: "Drafting",
    eta: "1-3 business days",
    title: "Prepare Draft Orders",
    detail:
      "We prepare draft QDRO and supporting forms based on your intake answers and selected plan rules.",
  },
  {
    icon: "✍️",
    phase: "Review",
    eta: "Varies by parties",
    title: "Collect Signatures",
    detail:
      "Review the drafts, confirm accuracy, and collect required signatures from the parties and counsel.",
  },
  {
    icon: "🏛️",
    phase: "Filing",
    eta: "Per court processing",
    title: "File draft orders with the court",
    detail:
      "Submit the signed draft package to the court for filing and obtain conformed, court-filed copies.",
  },
  {
    icon: "📬",
    phase: "Service",
    eta: "1-2 business days",
    title: "Serve Court-filed copy on the plan admin",
    detail:
      "Send the court-filed order package to the plan administrator so they can review and implement the order.",
  },
];
