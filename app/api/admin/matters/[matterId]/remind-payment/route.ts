import { NextRequest, NextResponse } from "next/server";
import { requireSuperAdminRequest } from "@/lib/dashboardAccess";
import { prisma } from "@/lib/prisma";
import { sendStaffNotificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const admin = await requireSuperAdminRequest(req);
  if (admin.ok === false) return admin.response;

  const body = await req.json().catch(() => null);
  const target = String(body?.target || "").trim() as
    | "petitioner"
    | "respondent"
    | "both";
  if (!["petitioner", "respondent", "both"].includes(target)) {
    return NextResponse.json(
      { error: "target must be petitioner, respondent, or both" },
      { status: 400 },
    );
  }

  const m = await prisma.matter.findUnique({
    where: { id: params.matterId },
    include: { petitioner: true, respondent: true },
  });
  if (!m) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }

  const to: string[] = [];
  if (target === "petitioner" || target === "both") {
    to.push(m.petitioner.email);
  }
  if (target === "respondent" || target === "both") {
    to.push(m.respondent.email);
  }

  const lines: string[] = [
    `This is a payment reminder regarding your QDROdl matter (case ${m.caseNumber}, ${m.county} County).`,
    "",
  ];
  if (m.splitBill) {
    lines.push("Your fee is split between the parties:");
    if (m.petitionerShareCents != null) {
      lines.push(
        `- Petitioner share: ${formatMoney(m.petitionerShareCents)}${m.petitionerPaidAt ? " (marked paid)" : " (due)"}`,
      );
    }
    if (m.respondentShareCents != null) {
      lines.push(
        `- Respondent share: ${formatMoney(m.respondentShareCents)}${m.respondentPaidAt ? " (marked paid)" : " (due)"}`,
      );
    }
  } else if (m.amountDueCents > 0) {
    lines.push(`Amount due: ${formatMoney(m.amountDueCents)}`);
  } else {
    lines.push(
      "Please contact QDROdl if you have questions about your invoice or payment status.",
    );
  }
  lines.push("", "— QDROdl support");

  const text = lines.join("\n");
  const result = await sendStaffNotificationEmail({
    to,
    subject: `QDROdl payment reminder — Case ${m.caseNumber}`,
    text,
  });

  await prisma.communicationLog.create({
    data: {
      matterId: m.id,
      kind: "payment_reminder",
      targetsJson: JSON.stringify({ emails: to, target }),
      subject: `QDROdl payment reminder — Case ${m.caseNumber}`,
      bodyPreview: text.slice(0, 2000),
    },
  });

  return NextResponse.json({
    ok: true,
    sent: result.sent,
    reason: result.reason,
    recipients: to,
  });
}
