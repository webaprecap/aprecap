export type UserRole = "superadmin" | "admin" | "alumno";

export const ADMIN_EMAIL = "web.aprecap@gmail.com";
export const SUPERADMIN_EMAIL =
  process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL || "victechweb@gmail.com";

export function roleForEmail(email: string): UserRole | null {
  if (email === SUPERADMIN_EMAIL) return "superadmin";
  if (email === ADMIN_EMAIL) return "admin";
  return null;
}

export function canManageUsers(rol?: UserRole | null) {
  return rol === "admin" || rol === "superadmin";
}
