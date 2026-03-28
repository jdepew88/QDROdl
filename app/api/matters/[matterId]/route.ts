import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName, verifySession } from "@/lib/auth";
import { enc } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function getSession(req: NextRequest) {
  const token = req.cookies.get(getAuthCookieName())?.value || null;
  return verifySession(token);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  if (!getSession(req)) return unauthorized();
  const { matterId } = params;
  try {
    const m = await prisma.matter.findUnique({
      where: { id: matterId },
      include: {
        petitioner: true,
        respondent: true,
        attorneys: true,
        altPayeeBeneficiaries: { orderBy: { sortOrder: "asc" } },
        plans: true,
      },
    });
    if (!m) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ matter: m });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Failed to load matter" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  if (!getSession(req)) return unauthorized();
  const { matterId } = params;
  try {
    await prisma.$transaction(async (tx) => {
      const m = await tx.matter.findUnique({ where: { id: matterId } });
      if (!m) throw new Error("NOT_FOUND");
      await tx.altPayeeBeneficiary.deleteMany({ where: { matterId } });
      await tx.planSelection.deleteMany({ where: { matterId } });
      await tx.attorneyInfo.deleteMany({ where: { matterId } });
      await tx.matter.delete({ where: { id: matterId } });
      await tx.party.delete({ where: { id: m.petitionerId } });
      await tx.party.delete({ where: { id: m.respondentId } });
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Delete failed" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  if (!getSession(req)) return unauthorized();
  const { matterId } = params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const m = await prisma.matter.findUnique({ where: { id: matterId } });
    if (!m) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      const mdata: Record<string, unknown> = {};
      if (body.caseNumber != null) mdata.caseNumber = String(body.caseNumber);
      if (body.county != null) mdata.county = String(body.county);
      if (body.otherCounty !== undefined) {
        mdata.otherCounty = body.otherCounty || null;
      }
      if (body.dom) mdata.dom = new Date(body.dom);
      if (body.dos) mdata.dos = new Date(body.dos);
      if (body.doj !== undefined) {
        mdata.doj = body.doj ? new Date(body.doj) : null;
      }
      if (body.concurrentWithJudgment !== undefined) {
        mdata.concurrentWithJudgment = Boolean(body.concurrentWithJudgment);
      }
      if (body.petitionerIsMember !== undefined) {
        mdata.petitionerIsMember = Boolean(body.petitionerIsMember);
      }
      if (Object.keys(mdata).length > 0) {
        await tx.matter.update({ where: { id: matterId }, data: mdata as any });
      }

      const pu = body.petitioner;
      if (pu && typeof pu === "object") {
        await tx.party.update({
          where: { id: m.petitionerId },
          data: {
            ...(pu.firstName != null && { firstName: pu.firstName }),
            ...(pu.lastName != null && { lastName: pu.lastName }),
            ...(pu.fkaLastName !== undefined && {
              fkaLastName: pu.fkaLastName || null,
            }),
            ...(pu.selfRepresented !== undefined && {
              selfRepresented: Boolean(pu.selfRepresented),
            }),
            ...(pu.email != null && { email: pu.email }),
            ...(pu.phone !== undefined && { phone: pu.phone || null }),
            ...(pu.address1 != null && { address1: pu.address1 }),
            ...(pu.address2 !== undefined && { address2: pu.address2 || null }),
            ...(pu.spouseType !== undefined && { spouseType: pu.spouseType || null }),
            ...(pu.ssn && { ssnEnc: enc(pu.ssn) }),
            ...(pu.dob && { dobEnc: enc(pu.dob) }),
          },
        });
      }

      const ru = body.respondent;
      if (ru && typeof ru === "object") {
        await tx.party.update({
          where: { id: m.respondentId },
          data: {
            ...(ru.firstName != null && { firstName: ru.firstName }),
            ...(ru.lastName != null && { lastName: ru.lastName }),
            ...(ru.fkaLastName !== undefined && {
              fkaLastName: ru.fkaLastName || null,
            }),
            ...(ru.selfRepresented !== undefined && {
              selfRepresented: Boolean(ru.selfRepresented),
            }),
            ...(ru.email != null && { email: ru.email }),
            ...(ru.phone !== undefined && { phone: ru.phone || null }),
            ...(ru.address1 != null && { address1: ru.address1 }),
            ...(ru.address2 !== undefined && { address2: ru.address2 || null }),
            ...(ru.spouseType !== undefined && { spouseType: ru.spouseType || null }),
            ...(ru.ssn && { ssnEnc: enc(ru.ssn) }),
            ...(ru.dob && { dobEnc: enc(ru.dob) }),
          },
        });
      }

      if (body.attorneys && typeof body.attorneys === "object") {
        await tx.attorneyInfo.deleteMany({ where: { matterId } });
        const [pParty, rParty] = await Promise.all([
          tx.party.findUnique({ where: { id: m.petitionerId } }),
          tx.party.findUnique({ where: { id: m.respondentId } }),
        ]);
        const creates: any[] = [];
        const pet = body.attorneys.petitioner;
        if (pet?.name?.trim() && !pParty?.selfRepresented) {
          creates.push({
            matterId,
            side: "PETITIONER",
            name: pet.name,
            barNumber: pet.bar || null,
            email: pet.email || null,
            phone: pet.phone || null,
            address1: pet.address1 || null,
            address2: pet.address2 || null,
          });
        }
        const respAt = body.attorneys.respondent;
        if (respAt?.name?.trim() && !rParty?.selfRepresented) {
          creates.push({
            matterId,
            side: "RESPONDENT",
            name: respAt.name,
            barNumber: respAt.bar || null,
            email: respAt.email || null,
            phone: respAt.phone || null,
            address1: respAt.address1 || null,
            address2: respAt.address2 || null,
          });
        }
        if (creates.length) {
          await tx.attorneyInfo.createMany({ data: creates });
        }
      }

      if (Array.isArray(body.altpayeeBeneficiaries)) {
        await tx.altPayeeBeneficiary.deleteMany({ where: { matterId } });
        const rows = body.altpayeeBeneficiaries
          .filter((b: any) => (b.fullName || "").trim())
          .map((b: any, idx: number) => ({
            matterId,
            sortOrder: idx,
            fullName: (b.fullName || "").trim(),
            relationship: (b.relationship || "").trim() || null,
            address1: (b.address1 || "").trim() || null,
            address2: (b.address2 || "").trim() || null,
          }));
        if (rows.length) {
          await tx.altPayeeBeneficiary.createMany({ data: rows });
        }
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Update failed" },
      { status: 500 },
    );
  }
}
