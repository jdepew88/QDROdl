import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const MATTER_UPLOADS_ROOT = path.join(
  process.cwd(),
  "public",
  "matter-uploads",
);

function safeMatterId(matterId: string) {
  const s = path.basename(matterId).replace(/[^a-zA-Z0-9_-]/g, "");
  if (!s) throw new Error("Invalid matter id");
  return s;
}

function safeOriginalName(name: string) {
  const base = path.basename(name || "upload").replace(/[^a-zA-Z0-9._-]/g, "_");
  return base.slice(0, 180) || "upload.bin";
}

export async function saveMatterUploadFile(opts: {
  matterId: string;
  file: File;
}): Promise<{ filePath: string; fileUrl: string; storedName: string }> {
  const mid = safeMatterId(opts.matterId);
  const buf = Buffer.from(await opts.file.arrayBuffer());
  if (buf.length > 30 * 1024 * 1024) {
    throw new Error("File too large (max 30 MB).");
  }
  const orig = safeOriginalName(opts.file.name);
  const id = randomUUID();
  const storedName = `${id}_${orig}`;
  const dir = path.join(MATTER_UPLOADS_ROOT, mid);
  await fs.mkdir(dir, { recursive: true });
  const full = path.join(dir, storedName);
  await fs.writeFile(full, buf);
  const rel = path.join("matter-uploads", mid, storedName).replace(/\\/g, "/");
  return {
    filePath: `public/${rel}`,
    fileUrl: `/${rel}`,
    storedName,
  };
}
