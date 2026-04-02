import { NextRequest, NextResponse } from "next/server";
import { requireSuperAdminRequest } from "@/lib/dashboardAccess";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES = new Set(["order_prep", "mailing", "filing"]);

export async function POST(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const admin = await requireSuperAdminRequest(req);
  if (admin.ok === false) return admin.response;

  const body = await req.json().catch(() => null);
  const category = String(body?.category || "").trim();
  const amountCents = Number(body?.amountCents);
  const note = body?.note != null ? String(body.note).slice(0, 2000) : null;

  if (!CATEGORIES.has(category) || !Number.isFinite(amountCents) || amountCents <= 0) {
    return NextResponse.json(
      { error: "Invalid category or amountCents", valid: [...CATEGORIES] },
      { status: 400 },
    );
  }

  const matter = await prisma.matter.findUnique({ where: { id: params.matterId } });
  if (!matter) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }

  const row = await prisma.feeLedgerEntry.create({
    data: {
      matterId: params.matterId,
      category,
      amountCents: Math.round(amountCents),
      note,
    },
  });

  return NextResponse.json({ ok: true, entry: row });
}
