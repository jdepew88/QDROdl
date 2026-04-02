import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveMatterUploadFile } from "@/lib/matterUploadStorage";
import { requireMatterAccess } from "@/lib/matterAccessHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES = new Set(["judgment", "other", "plan_statement"]);

export async function GET(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const gate = await requireMatterAccess(req, params.matterId);
  if (gate.ok === false) return gate.response;

  const rows = await prisma.matterUpload.findMany({
    where: { matterId: params.matterId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ uploads: rows });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const gate = await requireMatterAccess(req, params.matterId);
  if (gate.ok === false) return gate.response;

  const matterId = params.matterId;
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const category = String(form.get("category") || "").trim();
  if (!CATEGORIES.has(category)) {
    return NextResponse.json(
      { error: "Invalid category", valid: [...CATEGORIES] },
      { status: 400 },
    );
  }

  const planKeyRaw = form.get("planKey");
  const planKey =
    planKeyRaw && String(planKeyRaw).trim()
      ? String(planKeyRaw).trim()
      : null;

  const note = form.get("note");
  const noteStr =
    note && String(note).trim() ? String(note).trim().slice(0, 4000) : null;

  try {
    const saved = await saveMatterUploadFile({ matterId, file });
    const row = await prisma.matterUpload.create({
      data: {
        matterId,
        planKey,
        category,
        note: noteStr,
        fileName: file.name,
        filePath: saved.filePath,
        fileUrl: saved.fileUrl,
        uploadedByEmail: gate.email,
      },
    });
    return NextResponse.json({ ok: true, upload: row });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Upload failed" },
      { status: 400 },
    );
  }
}
