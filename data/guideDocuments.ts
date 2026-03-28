/**
 * Placeholder client guides — add PDFs (or DOCX) under public/documents/guides/
 * using these filenames when ready.
 */
export type GuideDoc = {
  id: string;
  title: string;
  description: string;
  /** File to place at public/documents/guides/<filename> */
  placeholderFilename: string;
};

export const GUIDE_DOCUMENTS: GuideDoc[] = [
  {
    id: "pre-approval-submission",
    title: "Submitting the court order for preliminary plan review",
    description:
      "How to send the draft or filed order to the plan for pre-approval before final steps.",
    placeholderFilename: "guide-submit-order-preapproval-review.pdf",
  },
  {
    id: "collect-signatures",
    title: "Collecting signatures on the judgment and order",
    description:
      "Checklist for party and attorney signatures required before filing.",
    placeholderFilename: "guide-collect-signatures-judgment-order.pdf",
  },
  {
    id: "filing-efiling",
    title: "Filing or e-filing the judgment and QDRO/DRO",
    description:
      "County filing desk vs. e-filing portals and certified copies.",
    placeholderFilename: "guide-file-efile-judgment-qdro.pdf",
  },
  {
    id: "serve-plan-admin",
    title: "Serving the plan administrator with the court-filed order",
    description:
      "Certified copies, proof of service, and plan-specific instructions.",
    placeholderFilename: "guide-serve-plan-administrator-filed-order.pdf",
  },
];

export function guidePublicPath(filename: string) {
  return `/documents/guides/${filename}`;
}
