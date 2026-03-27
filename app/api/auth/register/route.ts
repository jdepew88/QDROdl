import { NextRequest, NextResponse } from "next/server";
import {
  getAccountCookieName,
  getAuthCookieName,
  signAccount,
  signSession,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

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

    const accountToken = signAccount(email, password);
    const sessionToken = signSession(email);
    const cookieBase = {
      httpOnly: true as const,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set(getAccountCookieName(), accountToken, cookieBase);
    res.cookies.set(getAuthCookieName(), sessionToken, cookieBase);
    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Registration failed." },
      { status: 500 },
    );
  }
}

