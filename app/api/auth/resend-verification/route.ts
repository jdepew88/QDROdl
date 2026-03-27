import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashVerificationToken, normalizeEmail } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = normalizeEmail(String(body?.email || ""));
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "No account found for this email." },
        { status: 404 },
      );
    }
    if (user.emailVerifiedAt) {
      return NextResponse.json(
        { error: "Email is already verified. Please sign in." },
        { status: 400 },
      );
    }

    const tokenPlain = randomBytes(32).toString("hex");
    const tokenHash = hashVerificationToken(tokenPlain);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.$transaction(async (tx) => {
      await tx.emailVerificationToken.updateMany({
        where: { userId: user.id, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      await tx.emailVerificationToken.create({
        data: { userId: user.id, tokenHash, expiresAt },
      });
    });

    const emailResult = await sendVerificationEmail({ to: email, token: tokenPlain });
    return NextResponse.json({
      ok: true,
      emailSent: emailResult.sent,
      message: emailResult.sent
        ? "Verification email sent. Please check your inbox."
        : "SMTP not configured yet. Verification email was not sent.",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Could not resend verification email." },
      { status: 500 },
    );
  }
}

