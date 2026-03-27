import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName, verifySession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const token = req.cookies.get(getAuthCookieName())?.value || null;
  const session = verifySession(token);
  return NextResponse.json({
    authenticated: Boolean(session),
    email: session?.email || null,
  });
}

