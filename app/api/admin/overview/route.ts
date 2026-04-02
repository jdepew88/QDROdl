import { NextRequest, NextResponse } from "next/server";
import { requireSuperAdminRequest } from "@/lib/dashboardAccess";
import { prisma } from "@/lib/prisma";
import { planLabelForKey } from "@/lib/planDisplay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sumCategory(
  rows: { category: string; amountCents: number }[],
  cat: string,
) {
  return rows
    .filter((r) => r.category === cat)
    .reduce((a, r) => a + r.amountCents, 0);
}

export async function GET(req: NextRequest) {
  const admin = await requireSuperAdminRequest(req);
  if (admin.ok === false) return admin.response;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [
    matters,
    monthLedger,
    yearLedger,
    countsNewIntakeMonth,
    countOpen,
    countBeyond,
    countFiling,
    countAwaiting,
    countClosed,
    countNewIntakeStatus,
  ] = await Promise.all([
    prisma.matter.findMany({
      orderBy: { updatedAt: "desc" },
      take: 300,
      include: {
        petitioner: true,
        respondent: true,
        plans: true,
        attorneys: true,
      },
    }),
    prisma.feeLedgerEntry.findMany({
      where: { recordedAt: { gte: startOfMonth } },
    }),
    prisma.feeLedgerEntry.findMany({
      where: { recordedAt: { gte: startOfYear } },
    }),
    prisma.matter.count({
      where: {
        intakeCompletedAt: { gte: startOfMonth },
      },
    }),
    prisma.matter.count({
      where: {
        workflowStatus: {
          in: ["OPEN", "BEYOND_EMAIL", "FILING", "AWAITING_FINAL_APPROVAL"],
        },
      },
    }),
    prisma.matter.count({ where: { workflowStatus: "BEYOND_EMAIL" } }),
    prisma.matter.count({ where: { workflowStatus: "FILING" } }),
    prisma.matter.count({
      where: { workflowStatus: "AWAITING_FINAL_APPROVAL" },
    }),
    prisma.matter.count({ where: { workflowStatus: "CLOSED" } }),
    prisma.matter.count({ where: { workflowStatus: "NEW_INTAKE" } }),
  ]);

  const revenueMonth = {
    order_prep: sumCategory(monthLedger, "order_prep"),
    mailing: sumCategory(monthLedger, "mailing"),
    filing: sumCategory(monthLedger, "filing"),
    total: monthLedger.reduce((a, r) => a + r.amountCents, 0),
  };

  const revenueYear = {
    order_prep: sumCategory(yearLedger, "order_prep"),
    mailing: sumCategory(yearLedger, "mailing"),
    filing: sumCategory(yearLedger, "filing"),
    total: yearLedger.reduce((a, r) => a + r.amountCents, 0),
  };

  return NextResponse.json({
    metrics: {
      openCases: countOpen,
      newIntakesThisMonth: countsNewIntakeMonth,
      beyondEmail: countBeyond,
      filing: countFiling,
      awaitingFinalApproval: countAwaiting,
      closed: countClosed,
      newIntakeStatusCount: countNewIntakeStatus,
    },
    revenueMonth,
    revenueYear,
    matters: matters.map((m) => ({
      id: m.id,
      caseNumber: m.caseNumber,
      county: m.county,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
      intakeCompletedAt: m.intakeCompletedAt,
      workflowStatus: m.workflowStatus,
      quotedOrderPrepCents: m.quotedOrderPrepCents,
      quotedMailingCents: m.quotedMailingCents,
      quotedFilingCents: m.quotedFilingCents,
      amountDueCents: m.amountDueCents,
      splitBill: m.splitBill,
      petitionerShareCents: m.petitionerShareCents,
      respondentShareCents: m.respondentShareCents,
      petitionerPaidAt: m.petitionerPaidAt,
      respondentPaidAt: m.respondentPaidAt,
      planAdminEmail: m.planAdminEmail,
      notesInternal: m.notesInternal,
      petitioner: {
        firstName: m.petitioner.firstName,
        lastName: m.petitioner.lastName,
        email: m.petitioner.email,
      },
      respondent: {
        firstName: m.respondent.firstName,
        lastName: m.respondent.lastName,
        email: m.respondent.email,
      },
      attorneys: m.attorneys.map((a) => ({
        side: a.side,
        name: a.name,
        email: a.email,
      })),
      plans: m.plans.map((p) => ({
        id: p.id,
        planKey: p.planKey,
        label: planLabelForKey(p.planKey),
        joinderRequired: p.joinderRequired,
      })),
    })),
  });
}
