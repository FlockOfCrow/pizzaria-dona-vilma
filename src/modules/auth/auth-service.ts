import { compare, hash } from "bcrypt";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export async function cryptoPassword(password: string): Promise<string> {
  const hashPassword = await hash(password, 10);
  return hashPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
}

export async function createSessionToken(payload = {}): Promise<void> {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(process.env.SECRET_KEY as any);
  const { exp } = await openSessionToken(session);
  cookies().set("session", session, {
    expires: (exp as number) * 1000,
    path: "/",
    httpOnly: true,
  });
}

export async function openSessionToken(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function isSessionValid(): Promise<boolean> {
  const sessionCookie = cookies().get("session");
  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getTime();
    return (exp as number) * 1000 > currentDate;
  }
  return false;
}

export function destroySession(): void {
  cookies().delete("session");
}
