import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./modules/auth/auth-service";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session");
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    try {
      const session = await verifyToken(token?.value!);
      return NextResponse.redirect(
        new URL("/perfil", request.nextUrl).toString()
      );
    } catch (e) {
      return NextResponse.next();
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/perfil") ||
    request.nextUrl.pathname.startsWith("/painel")
  ) {
    try {
      const session = await verifyToken(token?.value!);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(
        new URL("/login", request.nextUrl).toString()
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/perfil/:path*",
    "/painel/:path*",
  ],
};
