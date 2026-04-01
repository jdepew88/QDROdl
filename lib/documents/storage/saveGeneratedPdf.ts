import fs from "fs";
import path from "path";

const PUBLIC_SEGMENT = "public";
const GENERATED_ROOT = "generated-docs";

export type SavedGeneratedPdf = {
  /** Relative to process.cwd(), suitable for DB / logs */
  filePath: string;
  /** Browser URL under /public */
  fileUrl: string;
  filename: string;
};

/**
 * Persist PDF under `public/generated-docs/[matterId]/`.
 * Later: swap this helper for S3-compatible upload; keep the same return shape
 * and store object key in `filePath` / signed URL in `fileUrl`.
 */
export async function saveGeneratedPdf(opts: {
  matterId: string;
  pdfBuffer: Buffer;
  /** e.g. preapproval-letter */
  stem: string;
  version: number;
}): Promise<SavedGeneratedPdf> {
  const { matterId, pdfBuffer, stem, version } = opts;
  const pdfHeader = pdfBuffer.subarray(0, 5).toString("utf8");
  if (pdfBuffer.length < 1024 || pdfHeader !== "%PDF-") {
    throw new Error("Generated file is not a valid PDF buffer.");
  }
  const safeMatter = path.basename(matterId).replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeMatter) {
    throw new Error("Invalid matter id for storage path.");
  }

  const ts = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\.\d{3}Z$/, "");
  const filename = `${stem}-v${version}-${ts}.pdf`;

  const dir = path.join(
    process.cwd(),
    PUBLIC_SEGMENT,
    GENERATED_ROOT,
    safeMatter,
  );
  await fs.promises.mkdir(dir, { recursive: true });

  const absFile = path.join(dir, filename);
  await fs.promises.writeFile(absFile, pdfBuffer);

  const filePath = path.join(
    PUBLIC_SEGMENT,
    GENERATED_ROOT,
    safeMatter,
    filename,
  );
  const fileUrl = `/${GENERATED_ROOT}/${safeMatter}/${filename}`;

  return { filePath, fileUrl, filename };
}
