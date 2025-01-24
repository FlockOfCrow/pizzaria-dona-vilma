import { compare, hash } from "bcrypt";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

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

export async function generateToken(payload = {}): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(SECRET_KEY);
  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
