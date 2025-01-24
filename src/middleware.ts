import { JWTPayload, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyToken } from "./modules/auth/auth-service";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session");
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    try {
      const session = await verifyToken(token?.value!);
      return NextResponse.redirect(new URL("/", request.nextUrl).toString());
    } catch (e) {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/register/:path*"],
};
