import { NextResponse } from "next/server";
import { enc } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { petitionerIsPlanMember } from "@/lib/intakeMember";

export const runtime = "nodejs"; // ensure Node runtime for Prisma

export async function POST(req: Request) {
  try {
    const { intake, chosenTemplates } = await req.json();

    const p = intake.petitioner;
    const r = intake.respondent;

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
          email: p.email,
          phone: p.phone,
          address1: p.address1,
          address2: p.address2,
          spouseType: p.spouseType,
          ssnEnc: p.ssn ? enc(p.ssn) : null,
          dobEnc: p.dob ? enc(p.dob) : null,
        },
      });

      const respondent = await tx.party.create({
        data: {
          role: "RESPONDENT",
          firstName: r.firstName,
          lastName: r.lastName,
          fkaLastName: r.fkaLastName || null,
          selfRepresented: Boolean(r.selfRepresented),
          email: r.email,
          phone: r.phone,
          address1: r.address1,
          address2: r.address2,
          spouseType: r.spouseType,
          ssnEnc: r.ssn ? enc(r.ssn) : null,
          dobEnc: r.dob ? enc(r.dob) : null,
        },
      });

      const mat = await tx.matter.create({
        data: {
          caseNumber: intake.caseInfo.caseNumber,
          county: intake.caseInfo.county,
          otherCounty: intake.caseInfo.otherCounty || null,
          dom: new Date(intake.caseInfo.dom),
          dos: new Date(intake.caseInfo.dos),
          doj: intake.caseInfo.doj ? new Date(intake.caseInfo.doj) : null,
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
