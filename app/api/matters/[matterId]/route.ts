import { NextRequest, NextResponse } from "next/server";
import { isLikelyValidEmail } from "@/lib/emailValidation";
import { formatUsPhoneStored, normalizeUsPhone10Digits } from "@/lib/phoneUs";
import { isValidUsPostalCode } from "@/lib/postalCodeUs";
import { prisma } from "@/lib/prisma";
import { requireMatterAccess } from "@/lib/matterAccessHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STAFF_ONLY_PATCH_KEYS = new Set([
  "workflowStatus",
  "quotedOrderPrepCents",
  "quotedMailingCents",
  "quotedFilingCents",
  "amountDueCents",
  "petitionerPaidAt",
  "respondentPaidAt",
  "planAdminEmail",
  "notesInternal",
  "planJoinderUpdates",
]);

export async function GET(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const { matterId } = params;
  const gate = await requireMatterAccess(req, matterId);
  if (gate.ok === false) return gate.response;

  try {
    const m = await prisma.matter.findUnique({
      where: { id: matterId },
      include: {
        petitioner: true,
        respondent: true,
        attorneys: true,
        altPayeeBeneficiaries: { orderBy: { sortOrder: "asc" } },
        plans: true,
        uploads: { orderBy: { createdAt: "desc" } },
        generatedDocuments: { orderBy: { createdAt: "desc" } },
        ...(gate.isAdmin
          ? {
              feeLedgerEntries: { orderBy: { recordedAt: "desc" }, take: 100 },
              communicationLogs: { orderBy: { createdAt: "desc" }, take: 50 },
            }
          : {}),
      },
    });
    if (!m) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ matter: m, isSuperAdmin: gate.isAdmin });
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
  const { matterId } = params;
  const gate = await requireMatterAccess(req, matterId);
  if (gate.ok === false) return gate.response;
  if (!gate.isAdmin) {
    return NextResponse.json(
      { error: "Only staff can delete matters." },
      { status: 403 },
    );
  }
  try {
    await prisma.$transaction(async (tx) => {
      const m = await tx.matter.findUnique({ where: { id: matterId } });
      if (!m) throw new Error("NOT_FOUND");
      await tx.feeLedgerEntry.deleteMany({ where: { matterId } });
      await tx.matterUpload.deleteMany({ where: { matterId } });
      await tx.communicationLog.deleteMany({ where: { matterId } });
      await tx.generatedDocument.deleteMany({ where: { matterId } });
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
  const { matterId } = params;
  const gate = await requireMatterAccess(req, matterId);
  if (gate.ok === false) return gate.response;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!gate.isAdmin) {
    for (const k of Object.keys(body)) {
      if (STAFF_ONLY_PATCH_KEYS.has(k)) {
        return NextResponse.json(
          { error: "You cannot update staff-only fields on this matter." },
          { status: 403 },
        );
      }
    }
  }

  try {
    const m = await prisma.matter.findUnique({ where: { id: matterId } });
    if (!m) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      const mdata: Record<string, unknown> = {};
      if (gate.isAdmin) {
        if (body.workflowStatus != null)
          mdata.workflowStatus = String(body.workflowStatus);
        if (body.quotedOrderPrepCents != null)
          mdata.quotedOrderPrepCents = Number(body.quotedOrderPrepCents);
        if (body.quotedMailingCents != null)
          mdata.quotedMailingCents = Number(body.quotedMailingCents);
        if (body.quotedFilingCents != null)
          mdata.quotedFilingCents = Number(body.quotedFilingCents);
        if (body.amountDueCents != null)
          mdata.amountDueCents = Number(body.amountDueCents);
        if (body.petitionerPaidAt !== undefined) {
          mdata.petitionerPaidAt = body.petitionerPaidAt
            ? new Date(body.petitionerPaidAt)
            : null;
        }
        if (body.respondentPaidAt !== undefined) {
          mdata.respondentPaidAt = body.respondentPaidAt
            ? new Date(body.respondentPaidAt)
            : null;
        }
        if (body.planAdminEmail !== undefined)
          mdata.planAdminEmail = body.planAdminEmail || null;
        if (body.notesInternal !== undefined)
          mdata.notesInternal = body.notesInternal || null;
      }

      // Party-editable payment responsibility "bones":
      // allow parties to set split + their share amounts (cents).
      if (body.splitBill !== undefined) {
        mdata.splitBill = Boolean(body.splitBill);
      }
      const nextSplitBill =
        body.splitBill !== undefined ? Boolean(body.splitBill) : m.splitBill;

      const nextPetShare =
        body.petitionerShareCents !== undefined
          ? body.petitionerShareCents == null
            ? null
            : Number(body.petitionerShareCents)
          : m.petitionerShareCents;

      const nextRespShare =
        body.respondentShareCents !== undefined
          ? body.respondentShareCents == null
            ? null
            : Number(body.respondentShareCents)
          : m.respondentShareCents;

      if (body.petitionerShareCents !== undefined) {
        mdata.petitionerShareCents = nextPetShare;
      }
      if (body.respondentShareCents !== undefined) {
        mdata.respondentShareCents = nextRespShare;
      }

      // Derive total due when both shares are available.
      if (
        nextSplitBill &&
        nextPetShare != null &&
        nextRespShare != null &&
        Number.isFinite(nextPetShare) &&
        Number.isFinite(nextRespShare)
      ) {
        mdata.amountDueCents = nextPetShare + nextRespShare;
      }

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
        const pEmail = pu.email != null ? String(pu.email).trim() : null;
        const pPhoneDigits =
          pu.phone !== undefined
            ? normalizeUsPhone10Digits(String(pu.phone || ""))
            : null;
        if (pEmail != null && !isLikelyValidEmail(pEmail)) {
          throw new Error("Petitioner email appears invalid.");
        }
        if (pu.phone !== undefined && !pPhoneDigits) {
          throw new Error("Petitioner phone must be a valid 10-digit number.");
        }
        const petMailingTouched =
          pu.address1 !== undefined ||
          pu.address2 !== undefined ||
          pu.city !== undefined ||
          pu.state !== undefined ||
          pu.postalCode !== undefined;
        const petCity = String(pu.city ?? "").trim();
        const petState = String(pu.state ?? "")
          .trim()
          .toUpperCase()
          .slice(0, 2);
        const petZip = String(pu.postalCode ?? "").trim();
        if (
          petMailingTouched &&
          (!petCity || petState.length !== 2 || !isValidUsPostalCode(petZip))
        ) {
          throw new Error(
            "Petitioner needs city, a 2-letter state, and a valid ZIP code.",
          );
        }
        await tx.party.update({
          where: { id: m.petitionerId },
          data: {
            ...(pu.fkaLastName !== undefined && {
              fkaLastName: pu.fkaLastName || null,
            }),
            ...(pu.selfRepresented !== undefined && {
              selfRepresented: Boolean(pu.selfRepresented),
            }),
            ...(pEmail != null && { email: pEmail }),
            ...(pu.phone !== undefined && {
              phone: pPhoneDigits ? formatUsPhoneStored(pPhoneDigits) : null,
            }),
            ...(pu.address1 != null && { address1: pu.address1 }),
            ...(pu.address2 !== undefined && { address2: pu.address2 || null }),
            ...(pu.city !== undefined && { city: petCity || null }),
            ...(pu.state !== undefined && { state: petState || null }),
            ...(pu.postalCode !== undefined && { postalCode: petZip || null }),
            ...(pu.spouseType !== undefined && { spouseType: pu.spouseType || null }),
          },
        });
      }

      const ru = body.respondent;
      if (ru && typeof ru === "object") {
        const rEmail = ru.email != null ? String(ru.email).trim() : null;
        const rPhoneDigits =
          ru.phone !== undefined
            ? normalizeUsPhone10Digits(String(ru.phone || ""))
            : null;
        if (rEmail != null && !isLikelyValidEmail(rEmail)) {
          throw new Error("Respondent email appears invalid.");
        }
        if (ru.phone !== undefined && !rPhoneDigits) {
          throw new Error("Respondent phone must be a valid 10-digit number.");
        }
        const respMailingTouched =
          ru.address1 !== undefined ||
          ru.address2 !== undefined ||
          ru.city !== undefined ||
          ru.state !== undefined ||
          ru.postalCode !== undefined;
        const respCity = String(ru.city ?? "").trim();
        const respState = String(ru.state ?? "")
          .trim()
          .toUpperCase()
          .slice(0, 2);
        const respZip = String(ru.postalCode ?? "").trim();
        if (
          respMailingTouched &&
          (!respCity ||
            respState.length !== 2 ||
            !isValidUsPostalCode(respZip))
        ) {
          throw new Error(
            "Respondent needs city, a 2-letter state, and a valid ZIP code.",
          );
        }
        await tx.party.update({
          where: { id: m.respondentId },
          data: {
            ...(ru.fkaLastName !== undefined && {
              fkaLastName: ru.fkaLastName || null,
            }),
            ...(ru.selfRepresented !== undefined && {
              selfRepresented: Boolean(ru.selfRepresented),
            }),
            ...(rEmail != null && { email: rEmail }),
            ...(ru.phone !== undefined && {
              phone: rPhoneDigits ? formatUsPhoneStored(rPhoneDigits) : null,
            }),
            ...(ru.address1 != null && { address1: ru.address1 }),
            ...(ru.address2 !== undefined && { address2: ru.address2 || null }),
            ...(ru.city !== undefined && { city: respCity || null }),
            ...(ru.state !== undefined && { state: respState || null }),
            ...(ru.postalCode !== undefined && { postalCode: respZip || null }),
            ...(ru.spouseType !== undefined && { spouseType: ru.spouseType || null }),
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

      if (gate.isAdmin && Array.isArray(body.planJoinderUpdates)) {
        for (const row of body.planJoinderUpdates as {
          id?: string;
          joinderRequired?: boolean;
        }[]) {
          if (!row?.id || typeof row.id !== "string") continue;
          await tx.planSelection.updateMany({
            where: { id: row.id, matterId },
            data: { joinderRequired: Boolean(row.joinderRequired) },
          });
        }
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    const msg = e.message || "Update failed";
    if (
      /invalid|must be|appears/i.test(msg)
    ) {
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    return NextResponse.json(
      { error: msg },
      { status: 500 },
    );
  }
}
