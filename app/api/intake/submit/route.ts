import { NextResponse } from "next/server";
import { isLikelyValidEmail } from "@/lib/emailValidation";
import { formatUsPhoneStored, normalizeUsPhone10Digits } from "@/lib/phoneUs";
import { isValidUsPostalCode } from "@/lib/postalCodeUs";
import { prisma } from "@/lib/prisma";
import { petitionerIsPlanMember } from "@/lib/intakeMember";

export const runtime = "nodejs"; // ensure Node runtime for Prisma

function parseIsoDateOnly(value: unknown): Date | null {
  const s = String(value || "").trim();
  // Intake date inputs are yyyy-mm-dd; reject partial/invalid strings.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function POST(req: Request) {
  try {
    const { intake, chosenTemplates } = await req.json();

    const p = intake.petitioner;
    const r = intake.respondent;
    const pEmail = String(p.email || "").trim();
    const rEmail = String(r.email || "").trim();
    const pPhone = normalizeUsPhone10Digits(String(p.phone || ""));
    const rPhone = normalizeUsPhone10Digits(String(r.phone || ""));
    if (!isLikelyValidEmail(pEmail) || !isLikelyValidEmail(rEmail)) {
      return NextResponse.json(
        { error: "Please enter valid party email addresses." },
        { status: 400 },
      );
    }
    if (!pPhone || !rPhone) {
      return NextResponse.json(
        { error: "Party phone numbers must be valid 10-digit numbers." },
        { status: 400 },
      );
    }
    const pc = (x: any) => ({
      city: String(x.city || "").trim(),
      state: String(x.state || "").trim().toUpperCase().slice(0, 2),
      postal: String(x.postalCode || "").trim(),
    });
    const petM = pc(p);
    const respM = pc(r);
    if (
      !petM.city ||
      !petM.state ||
      !isValidUsPostalCode(petM.postal) ||
      !respM.city ||
      !respM.state ||
      !isValidUsPostalCode(respM.postal)
    ) {
      return NextResponse.json(
        { error: "Each party needs a valid city, state, and ZIP code." },
        { status: 400 },
      );
    }
    const caseNumber = String(intake?.caseInfo?.caseNumber || "").trim();
    if (!caseNumber) {
      return NextResponse.json(
        { error: "Case number is required before generating drafts." },
        { status: 400 },
      );
    }
    const dom = parseIsoDateOnly(intake?.caseInfo?.dom);
    const dos = parseIsoDateOnly(intake?.caseInfo?.dos);
    const dojRaw = String(intake?.caseInfo?.doj || "").trim();
    const doj = dojRaw ? parseIsoDateOnly(dojRaw) : null;
    if (!dom || !dos || (dojRaw && !doj)) {
      return NextResponse.json(
        {
          error:
            "Please enter valid case dates (Date of marriage and Date of separation; Date of judgment if provided).",
        },
        { status: 400 },
      );
    }

    const beneficiaryCreates = (intake.altpayeeBeneficiaries || [])
      .filter((b: any) => (b.fullName || "").trim())
      .map((b: any, idx: number) => ({
        sortOrder: idx,
        fullName: (b.fullName || "").trim(),
        relationship: (b.relationship || "").trim() || null,
        address1: (b.address1 || "").trim() || null,
        address2: (b.address2 || "").trim() || null,
      }));

    const matter = await prisma.$transaction(async (tx) => {
      const petitioner = await tx.party.create({
        data: {
          role: "PETITIONER",
          firstName: p.firstName,
          lastName: p.lastName,
          fkaLastName: p.fkaLastName || null,
          selfRepresented: Boolean(p.selfRepresented),
          email: pEmail,
          phone: formatUsPhoneStored(pPhone),
          address1: p.address1,
          address2: p.address2 || null,
          city: petM.city,
          state: petM.state,
          postalCode: petM.postal,
          spouseType: p.spouseType,
        },
      });

      const respondent = await tx.party.create({
        data: {
          role: "RESPONDENT",
          firstName: r.firstName,
          lastName: r.lastName,
          fkaLastName: r.fkaLastName || null,
          selfRepresented: Boolean(r.selfRepresented),
          email: rEmail,
          phone: formatUsPhoneStored(rPhone),
          address1: r.address1,
          address2: r.address2 || null,
          city: respM.city,
          state: respM.state,
          postalCode: respM.postal,
          spouseType: r.spouseType,
        },
      });

      const mat = await tx.matter.create({
        data: {
          caseNumber,
          county: intake.caseInfo.county,
          otherCounty: intake.caseInfo.otherCounty || null,
          dom,
          dos,
          doj,
          concurrentWithJudgment: Boolean(intake.caseInfo.concurrentWithJudgment),

          petitionerId: petitioner.id,
          respondentId: respondent.id,

          petitionerIsMember: petitionerIsPlanMember(
            intake.petitioner,
            intake.respondent,
          ),

          attorneys: {
            create: [
              intake.attorneys?.petitioner?.name && !p.selfRepresented
                ? {
                    side: "PETITIONER",
                    name: intake.attorneys.petitioner.name,
                    barNumber: intake.attorneys.petitioner.bar,
                    email: intake.attorneys.petitioner.email,
                    phone: intake.attorneys.petitioner.phone,
                    address1: intake.attorneys.petitioner.address1,
                    address2: intake.attorneys.petitioner.address2,
                  }
                : undefined,
              intake.attorneys?.respondent?.name && !r.selfRepresented
                ? {
                    side: "RESPONDENT",
                    name: intake.attorneys.respondent.name,
                    barNumber: intake.attorneys.respondent.bar,
                    email: intake.attorneys.respondent.email,
                    phone: intake.attorneys.respondent.phone,
                    address1: intake.attorneys.respondent.address1,
                    address2: intake.attorneys.respondent.address2,
                  }
                : undefined,
            ].filter(Boolean) as any[],
          },

          plans: {
            create: (intake.planAnswers || []).map((a: any) => {
              const calpersModelSaved =
                a.plan === "calpers"
                  ? a.isInPayStatus
                    ? "C"
                    : a.calpersOrderModel ?? "A"
                  : null;
              const isCalpersC =
                a.plan === "calpers" &&
                (a.isInPayStatus || calpersModelSaved === "C");
              return {
                planKey: a.plan,
                isInPayStatus: Boolean(a.isInPayStatus),
                usesTimeRule: a.usesTimeRule ?? null,
                laceraOption4: a.laceraOption4 ?? null,
                calpersOrderModel: calpersModelSaved,
                calpersOption3W:
                  isCalpersC &&
                  (a.calpersModelCForm ?? "standard") === "standard"
                    ? Boolean(a.calpersOption3W)
                    : null,
                calpersModelCForm: isCalpersC
                  ? a.calpersModelCForm ?? "standard"
                  : null,
                chosenTemplates: JSON.stringify(chosenTemplates),
              };
            }),
          },

          altPayeeBeneficiaries:
            beneficiaryCreates.length > 0
              ? { create: beneficiaryCreates }
              : undefined,
        },
      });

      return mat;
    });

    return NextResponse.json({ ok: true, matterId: matter.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Intake submit failed" },
      { status: 500 }
    );
  }
}
