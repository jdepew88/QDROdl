import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePrimarySuperAdminRequest } from "@/lib/dashboardAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const gate = await requirePrimarySuperAdminRequest(req);
  if (gate.ok === false) return gate.response;

  const body = await req.json().catch(() => null);
  const questionSample = String(body?.questionSample || "").trim();
  const answerText = String(body?.answerText || "").trim();
  const tagsCsv = String(body?.tagsCsv || "").trim();
  if (!questionSample || !answerText) {
    return NextResponse.json(
      { error: "questionSample and answerText are required." },
      { status: 400 },
    );
  }

  const row = await prisma.chatKnowledgeEntry.create({
    data: {
      questionSample,
      answerText,
      tagsCsv: tagsCsv || null,
      source: "superadmin",
      createdByEmail: gate.email,
      isActive: true,
    },
  });

  return NextResponse.json({ ok: true, id: row.id });
}

