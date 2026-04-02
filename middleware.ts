import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "qdrodl_session";

export function middleware(req: NextRequest) {
  // Keep process overview publicly accessible even under legacy /dash/process links.
  if (req.nextUrl.pathname === "/dash/process") {
    return NextResponse.next();
  }

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", `${req.nextUrl.pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dash/:path*", "/intake/:path*"],
};

