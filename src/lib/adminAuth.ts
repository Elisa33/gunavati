import { createHash, timingSafeEqual } from "crypto";

// Token de sesión derivado de ADMIN_PASSWORD: no se puede falsificar sin conocer la contraseña.
export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(`gunavati-admin:${pw}`).digest("hex");
}

export function isValidAdminCookie(value?: string): boolean {
  const expected = adminToken();
  if (!expected || !value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
