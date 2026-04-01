/**
 * Typed payloads for HTML → PDF lifecycle documents.
 * Extend with SignatureLetterData, FiledWithCourtNoticeData, etc.
 */
export type PreapprovalLetterData = {
  generatedDate: string;
  courtName: string;
  county: string;
  caseNumber: string;
  caseCaption: string;
  memberName: string;
  memberAttorneyName?: string | null;
  nonMemberName: string;
  nonMemberAttorneyName?: string | null;
  planName: string;
  modelLabel: string;
  qdroCompanyName: string;
  qdroTagline: string;
  mailingAddressLines: string[];
  supportEmail?: string | null;
  /** CalPERS (or plan) letterhead / mail-to block — editable in mapper defaults. */
  planRecipientLines: string[];
  /** Optional cc lines (e.g. counsel of record). */
  ccLines?: string[];
};

/** Stable `GeneratedDocument.type` values — add new lifecycle kinds here. */
export const GENERATED_DOCUMENT_TYPES = {
  PREAPPROVAL_LETTER_CALPERS_MODEL_A: "preapproval_letter_calpers_model_a",
} as const;

export type GeneratedDocumentType =
  (typeof GENERATED_DOCUMENT_TYPES)[keyof typeof GENERATED_DOCUMENT_TYPES];
