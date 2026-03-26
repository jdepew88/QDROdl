import { NextRequest, NextResponse } from "next/server";
import {
  getAuthCookieName,
  signSession,
  validateCredentials,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "");
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (!validateCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = signSession(email);
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set(getAuthCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Login failed." },
      { status: 500 },
    );
  }
}

