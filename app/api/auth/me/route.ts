import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName, verifySession } from "@/lib/auth";
import { isSuperAdminEmail } from "@/lib/dashboardAccess";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const token = req.cookies.get(getAuthCookieName())?.value || null;
  const session = verifySession(token);
  if (!session) {
    return NextResponse.json({
      authenticated: false,
      email: null,
      firstName: null,
      lastName: null,
      phone: null,
      emailVerified: false,
      isSuperAdmin: false,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.email },
    select: {
      firstName: true,
      lastName: true,
      phone: true,
      emailVerifiedAt: true,
    },
  });

  const superAdmin = await isSuperAdminEmail(session.email);

  return NextResponse.json({
    authenticated: true,
    email: session.email,
    firstName: user?.firstName ?? null,
    lastName: user?.lastName ?? null,
    phone: user?.phone ?? null,
    emailVerified: Boolean(user?.emailVerifiedAt),
    isSuperAdmin: superAdmin,
  });
}

