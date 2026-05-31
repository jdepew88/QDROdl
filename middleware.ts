import { NextRequest, NextResponse } from "next/server";
import {
  buildContentSecurityPolicy,
  staticSecurityHeaders,
} from "./lib/securityHeaders";

const AUTH_COOKIE = "qdrodl_session";

function createNonce() {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

function applyProductionSecurityHeaders(
  response: NextResponse,
  nonce: string,
) {
  if (process.env.NODE_ENV !== "production") return response;

  response.headers.set(
    "Content-Security-Policy",
    buildContentSecurityPolicy(nonce),
  );
  for (const { key, value } of staticSecurityHeaders) {
    response.headers.set(key, value);
  }
  return response;
}

function requiresAuth(pathname: string) {
  if (pathname === "/dash/process") return false;
  return pathname.startsWith("/dash/") || pathname.startsWith("/intake/");
}

export function middleware(req: NextRequest) {
  const nonce = createNonce();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  if (requiresAuth(req.nextUrl.pathname)) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set(
        "next",
        `${req.nextUrl.pathname}${req.nextUrl.search}`,
      );
      const redirect = NextResponse.redirect(url);
      return applyProductionSecurityHeaders(redirect, nonce);
    }
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  return applyProductionSecurityHeaders(response, nonce);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
