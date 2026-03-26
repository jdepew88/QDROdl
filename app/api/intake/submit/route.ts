import { NextResponse } from "next/server";
import { enc } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // ensure Node runtime for Prisma

export async function POST(req: Request) {
  try {
    const { intake, chosenTemplates } = await req.json();

    const p = intake.petitioner;
    const r = intake.respondent;

    const matter = await prisma.$transaction(async (tx) => {
      const petitioner = await tx.party.create({
        data: {
          role: "PETITIONER",
          firstName: p.firstName,
          lastName: p.lastName,
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

          petitionerIsMember: Boolean(intake.petitioner?.isMember ?? true),

          attorneys: {
            create: [
              intake.attorneys?.petitioner?.name
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
              intake.attorneys?.respondent?.name
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
            create: (intake.planAnswers || []).map((a: any) => ({
              planKey: a.plan,
              isInPayStatus: Boolean(a.isInPayStatus),
              usesTimeRule: a.usesTimeRule ?? null,
              laceraOption4: a.laceraOption4 ?? null,
              chosenTemplates: JSON.stringify(chosenTemplates),
            })),
          },
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
