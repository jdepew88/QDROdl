import { NextRequest, NextResponse } from "next/server";
import { requireSuperAdminRequest } from "@/lib/dashboardAccess";
import { prisma } from "@/lib/prisma";
import { sendStaffNotificationEmail, getAppUrl } from "@/lib/mailer";
import fs from "fs/promises";
import path from "path";
import { DOCUMENTS_DIR } from "@/lib/renderTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const admin = await requireSuperAdminRequest(req);
  if (admin.ok === false) return admin.response;

  const body = await req.json().catch(() => null);
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();
  const includeDraftLinks = Boolean(body?.includeDraftLinks);
  const ccParties = Boolean(body?.ccParties);
  const ccAttorneys = Boolean(body?.ccAttorneys);
  const toPlanAdmin = Boolean(body?.toPlanAdmin);
  const planAdminEmailOverride =
    body?.planAdminEmail != null ? String(body.planAdminEmail).trim() : "";

  if (!subject || !message) {
    return NextResponse.json(
      { error: "subject and message are required" },
      { status: 400 },
    );
  }

  const m = await prisma.matter.findUnique({
    where: { id: params.matterId },
    include: { petitioner: true, respondent: true, attorneys: true },
  });
  if (!m) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }

  const to: string[] = [];
  const cc: string[] = [];

  if (toPlanAdmin) {
    const pe =
      planAdminEmailOverride ||
      (m.planAdminEmail && m.planAdminEmail.trim()) ||
      "";
    if (pe) to.push(pe);
  }

  if (ccParties) {
    cc.push(m.petitioner.email, m.respondent.email);
  }
  if (ccAttorneys) {
    for (const a of m.attorneys) {
      if (a.email?.trim()) cc.push(a.email.trim());
    }
  }

  if (to.length === 0 && cc.length === 0) {
    return NextResponse.json(
      {
        error:
          "Select at least one recipient: plan administrator (To), and/or CC parties or attorneys.",
      },
      { status: 400 },
    );
  }

  let extra = "";
  if (includeDraftLinks) {
    const base = getAppUrl();
    const dashUrl = `${base}/dash/matter/${m.id}`;
    const dir = path.join(DOCUMENTS_DIR, m.id);
    let names: string[] = [];
    try {
      names = await fs.readdir(dir);
    } catch {
      names = [];
    }
    const links = names
      .filter(
        (n) =>
          n.toLowerCase().endsWith(".docx") || n.toLowerCase().endsWith(".pdf"),
      )
      .slice(0, 40)
      .map((n) => `${base}/documents/${m.id}/${encodeURIComponent(n)}`);
    extra =
      `\n\n---\nClient portal (download drafts): ${dashUrl}\n` +
      (links.length
        ? `Saved draft files (direct links):\n${links.join("\n")}`
        : "No saved draft files were found on the server for this matter yet.");
  }

  const fullText = `${message}${extra}`;

  let primaryTo = [...to];
  let ccList = [...cc];
  if (primaryTo.length === 0) {
    primaryTo = [ccList[0]];
    ccList = ccList.slice(1);
  }

  const result = await sendStaffNotificationEmail({
    to: primaryTo,
    cc: ccList.length ? ccList : undefined,
    subject,
    text: fullText,
  });

  await prisma.communicationLog.create({
    data: {
      matterId: m.id,
      kind: "draft_resend",
      targetsJson: JSON.stringify({
        to: primaryTo,
        cc: ccList,
        ccParties,
        ccAttorneys,
        toPlanAdmin,
      }),
      subject,
      bodyPreview: fullText.slice(0, 2000),
    },
  });

  return NextResponse.json({
    ok: true,
    sent: result.sent,
    reason: result.reason,
    to: primaryTo,
    cc: ccList,
  });
}
