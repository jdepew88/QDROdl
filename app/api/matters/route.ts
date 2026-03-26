import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      matters: [],
      dbConfigured: false,
      message: "DATABASE_URL is not set. Configure .env.local to load matters.",
    });
  }

  try {
    const matters = await prisma.matter.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: {
        petitioner: true,
        respondent: true,
        plans: true,
      },
    });

    return NextResponse.json({
      dbConfigured: true,
      matters: matters.map((m) => ({
        id: m.id,
        caseNumber: m.caseNumber,
        county: m.county,
        createdAt: m.createdAt,
        petitionerName: `${m.petitioner.firstName} ${m.petitioner.lastName}`,
        respondentName: `${m.respondent.firstName} ${m.respondent.lastName}`,
        planKeys: m.plans.map((p) => p.planKey),
      })),
    });
  } catch (e: any) {
    console.error(e);
    const msg =
      typeof e?.message === "string"
        ? e.message
        : "Failed to load matters";
    return NextResponse.json(
      {
        matters: [],
        dbConfigured: false,
        error: msg,
      },
      { status: 200 },
    );
  }
}

