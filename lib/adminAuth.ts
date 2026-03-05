import crypto from "crypto";

const TOKEN_LABEL = "trinitas-admin-token";

export function getAdminToken(): string | null {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return null;

  return crypto.createHmac("sha256", adminPassword).update(TOKEN_LABEL).digest("hex");
}

export function isValidAdminToken(token: string | null): boolean {
  if (!token) return false;
  const expected = getAdminToken();
  if (!expected) return false;
  return token === expected;
}

