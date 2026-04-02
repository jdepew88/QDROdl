export const WORKFLOW_STATUSES = [
  "NEW_INTAKE",
  "OPEN",
  "BEYOND_EMAIL",
  "FILING",
  "AWAITING_FINAL_APPROVAL",
  "CLOSED",
] as const;

export type WorkflowStatus = (typeof WORKFLOW_STATUSES)[number];
