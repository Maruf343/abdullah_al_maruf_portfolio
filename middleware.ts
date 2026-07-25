import { NextResponse } from "next/server";
import { auth } from "./auth";

const PUBLIC_PATHS = new Set(["/login", "/register", "/forgot-password", "/reset-password", "/admin/login"]);

export default auth(async (req) => {
  const session = await auth();
  const pathname = req.nextUrl.pathname;
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminLoginRoute = pathname === "/admin/login";
  const isClientRoute = pathname === "/client" || pathname.startsWith("/client/") || pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isPublicPath = PUBLIC_PATHS.has(pathname);

  if (isAdminLoginRoute) {
    if (session?.user?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    if (isAdminRoute || isClientRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isPublicPath) {
      return NextResponse.next();
    }

    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/client/dashboard", req.url));
    }

    return NextResponse.next();
  }

  if (isClientRoute) {
    if (session.user.role !== "client") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
      return NextResponse.redirect(new URL("/client/dashboard", req.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/login") {
    if (session.user.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (session.user.role === "client") {
      return NextResponse.redirect(new URL("/client/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*", "/client", "/client/:path*", "/dashboard", "/dashboard/:path*", "/login", "/register", "/forgot-password", "/reset-password"],
};
