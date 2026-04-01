import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName, verifySession } from "@/lib/auth";
import { GENERATED_DOCUMENT_TYPES } from "@/lib/documents/types";
import {
  getCalpersPlanSelection,
  assertCalpersModelAEligible,
  mapMatterToPreapprovalLetter,
  matterReturnAddressLines,
} from "@/lib/documents/mappers/mapMatterToPreapprovalLetter";
import { renderHtmlToPdfBuffer } from "@/lib/documents/renderers/renderPdf";
import { saveGeneratedPdf } from "@/lib/documents/storage/saveGeneratedPdf";
import { buildPreapprovalLetterHtml } from "@/lib/documents/templates/preapproval-letter";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const DOC_TITLE = "CalPERS Preliminary Review Letter (Model A)";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function validateMatterBasics(m: {
  caseNumber: string;
  petitioner: { firstName: string; lastName: string };
  respondent: { firstName: string; lastName: string };
}): string | null {
  if (!m.caseNumber?.trim()) return "Case number is required.";
  const pf = `${m.petitioner.firstName} ${m.petitioner.lastName}`.trim();
  const rf = `${m.respondent.firstName} ${m.respondent.lastName}`.trim();
  if (!pf) return "Petitioner name is required.";
  if (!rf) return "Respondent name is required.";
  return null;
}

/**
 * POST /api/documents/preapproval-letter/generate
 * Body: { matterId?: string, caseId?: string } — both refer to `Matter.id` (domain "case").
 */
export async function POST(req: NextRequest) {
  const token = req.cookies.get(getAuthCookieName())?.value || null;
  if (!verifySession(token)) return unauthorized();

  let body: { matterId?: unknown; caseId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const matterIdRaw =
    typeof body.matterId === "string"
      ? body.matterId
      : typeof body.caseId === "string"
        ? body.caseId
        : null;

  if (!matterIdRaw?.trim()) {
    return NextResponse.json(
      { error: "Missing matterId (or caseId) for the matter to generate against." },
      { status: 400 },
    );
  }

  const matterId = matterIdRaw.trim();

  const m = await prisma.matter.findUnique({
    where: { id: matterId },
    include: {
      petitioner: true,
      respondent: true,
      plans: true,
      attorneys: true,
    },
  });

  if (!m) {
    return NextResponse.json({ error: "Matter not found." }, { status: 404 });
  }

  const basicErr = validateMatterBasics(m);
  if (basicErr) {
    return NextResponse.json({ error: basicErr }, { status: 400 });
  }

  let calpersPlan;
  try {
    calpersPlan = getCalpersPlanSelection(m);
    assertCalpersModelAEligible(calpersPlan);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Plan validation failed.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  let letterData;
  try {
    letterData = mapMatterToPreapprovalLetter(m);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to map matter data.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const html = buildPreapprovalLetterHtml(letterData);

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await renderHtmlToPdfBuffer(html);
  } catch (e) {
    console.error("[preapproval-letter] PDF render failed", e);
    return NextResponse.json(
      { error: "PDF generation failed. Check server logs." },
      { status: 500 },
    );
  }

  const type = GENERATED_DOCUMENT_TYPES.PREAPPROVAL_LETTER_CALPERS_MODEL_A;

  const prev = await prisma.generatedDocument.aggregate({
    where: { matterId, type },
    _max: { version: true },
  });
  const version = (prev._max.version ?? 0) + 1;

  let saved;
  try {
    saved = await saveGeneratedPdf({
      matterId,
      pdfBuffer,
      stem: "preapproval-letter",
      version,
    });
  } catch (e) {
    console.error("[preapproval-letter] save failed", e);
    return NextResponse.json(
      { error: "Failed to save PDF to disk." },
      { status: 500 },
    );
  }

  const doc = await prisma.generatedDocument.create({
    data: {
      matterId,
      type,
      title: DOC_TITLE,
      filePath: saved.filePath,
      fileUrl: saved.fileUrl,
      version,
      metadataJson: {
        generator: "preapproval-letter-v1",
        planKey: calpersPlan.planKey,
        calpersOrderModel: calpersPlan.calpersOrderModel,
        returnAddressLines: matterReturnAddressLines(m),
      },
    },
  });

  return NextResponse.json({
    success: true,
    document: {
      id: doc.id,
      title: doc.title,
      type: doc.type,
      fileUrl: doc.fileUrl,
      createdAt: doc.createdAt.toISOString(),
      version: doc.version,
    },
  });
}
