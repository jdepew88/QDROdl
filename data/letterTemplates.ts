/**
 * Word templates under templates/letters/ — merge with `buildLetterMergeModel` (lib/letterMergeModel.ts).
 * Remove any prior law-office letterhead; use QDROdl.app branding in template body / {{firm.*}} fields.
 */
export type LetterTemplateKey = keyof typeof LETTER_TEMPLATE_REGISTRY;

export const LETTER_TEMPLATE_REGISTRY = {
  planAdminPreapproval: {
    templateId: "letter-plan-admin-preapproval",
    relativePath: "letters/plan-admin-preapproval.docx",
    title: "Plan administrator letter (pre-filing review)",
    description:
      "Request preliminary review of the draft domestic relations order before court filing.",
  },
  closeoutService: {
    templateId: "letter-closeout-plan-admin-service",
    relativePath: "letters/closeout-plan-admin-service.docx",
    title: "Close-out letter (service on plan administrator)",
    description:
      "Explains service on the plan administrator after the court-filed order is available.",
  },
  nonFiledAttachment: {
    templateId: "letter-nonfiled-dro-attachment",
    relativePath: "letters/nonfiled-dro-attachment.docx",
    title: "Non-filed identifier attachment",
    description:
      "Caption, party names, and DOB/SSN block for attachment to the DRO/QDRO when the draft calls for it.",
  },
} as const;

/** For docx-templates / TEMPLATE_FILES-style lookups */
export const LETTER_TEMPLATE_FILES: Record<string, string> = Object.fromEntries(
  Object.values(LETTER_TEMPLATE_REGISTRY).map((e) => [
    e.templateId,
    e.relativePath,
  ]),
);
