import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePrimarySuperAdminRequest } from "@/lib/dashboardAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const gate = await requirePrimarySuperAdminRequest(req);
  if (gate.ok === false) return gate.response;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const updates: Record<string, unknown> = {};
  if (body.questionSample !== undefined) {
    updates.questionSample = String(body.questionSample || "").trim();
  }
  if (body.answerText !== undefined) {
    updates.answerText = String(body.answerText || "").trim();
  }
  if (body.tagsCsv !== undefined) {
    const t = String(body.tagsCsv || "").trim();
    updates.tagsCsv = t || null;
  }
  if (body.isActive !== undefined) {
    updates.isActive = Boolean(body.isActive);
  }
  if (!Object.keys(updates).length) {
    return NextResponse.json({ error: "No updates provided." }, { status: 400 });
  }

  const row = await prisma.chatKnowledgeEntry.update({
    where: { id: params.id },
    data: updates,
  });
  return NextResponse.json({ ok: true, row });
}

