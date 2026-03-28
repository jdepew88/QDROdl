import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import Archiver from "archiver";
import { DOCUMENTS_DIR } from "@/lib/renderTemplates";
import { getAuthCookieName, verifySession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET ?matterId= — stream a ZIP of all saved drafts for that matter (repeatable download).
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(getAuthCookieName())?.value || null;
  if (!verifySession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const matterId = req.nextUrl.searchParams.get("matterId");
  if (!matterId) {
    return NextResponse.json({ error: "Missing matterId" }, { status: 400 });
  }

  const dir = path.join(DOCUMENTS_DIR, matterId);
  let names: string[] = [];
  try {
    names = await fs.readdir(dir);
  } catch {
    return NextResponse.json(
      { error: "No saved drafts for this matter yet." },
      { status: 404 },
    );
  }

  const files = names.filter(
    (n) =>
      n.toLowerCase().endsWith(".docx") || n.toLowerCase().endsWith(".pdf"),
  );
  if (files.length === 0) {
    return NextResponse.json(
      { error: "No draft files found in this matter folder." },
      { status: 404 },
    );
  }

  const chunks: Buffer[] = [];
  const arch = Archiver("zip", { zlib: { level: 9 } });
  arch.on("data", (d) => chunks.push(d as Buffer));
  const done = new Promise<void>((res, rej) => {
    arch.on("warning", (e) => console.warn(e));
    arch.on("error", rej);
    arch.on("end", () => res());
  });

  for (const name of files) {
    const full = path.join(dir, name);
    const buf = await fs.readFile(full);
    arch.append(buf, { name });
  }
  arch.finalize();
  await done;

  const blob = Buffer.concat(chunks);
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="drafts_${matterId}.zip"`,
    },
  });
}
