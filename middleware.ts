import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth(async (req) => {
  const session = await auth();
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = req.nextUrl.pathname === "/admin/login";
  const isLogoutRoute = req.nextUrl.pathname === "/admin/logout";

  if (isAdminRoute && !isLoginRoute && !isLogoutRoute && !session) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
