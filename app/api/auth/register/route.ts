import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { hashVerificationToken, normalizeEmail } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import {
  formatUsPhoneStored,
  normalizeUsPhone10Digits,
} from "@/lib/phoneUs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = normalizeEmail(String(body?.email || ""));
    const password = String(body?.password || "");
    const firstName = String(body?.firstName || "").trim();
    const lastName = String(body?.lastName || "").trim();
    const phoneDigits = normalizeUsPhone10Digits(String(body?.phone || ""));

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required." },
        { status: 400 },
      );
    }
    if (!phoneDigits) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit U.S. phone number." },
        { status: 400 },
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const phone = formatUsPhoneStored(phoneDigits);
    const displayName = `${firstName} ${lastName}`.trim();
    const tokenPlain = randomBytes(32).toString("hex");
    const tokenHash = hashVerificationToken(tokenPlain);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          displayName,
          phone,
        },
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
        ? "Thanks for registering. Check your inbox to verify your email."
        : "Account created. SMTP not configured yet, so verification email was not sent.",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Registration failed." },
      { status: 500 },
    );
  }
}

