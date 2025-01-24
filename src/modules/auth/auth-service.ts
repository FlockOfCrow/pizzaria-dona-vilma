"use server";

import { compare, hash } from "bcrypt";

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

export async function generateToken(password: string) {
  const token = await cryptoPassword(Date.now().toString());
  return token;
}
