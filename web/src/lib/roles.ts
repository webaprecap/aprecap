export type UserRole = "superadmin" | "admin" | "profesor" | "alumno";

export const ADMIN_EMAILS = [
  "web.aprecap@gmail.com",
  "conysaavedra.o@gmail.com",
  "erciosaavedra@gmail.com",
];

// Compatibilidad hacia atrás
export const ADMIN_EMAIL = ADMIN_EMAILS[0];

export const SUPERADMIN_EMAIL =
  process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL || "contacto.digitalup@gmail.com";

export function roleForEmail(email: string): UserRole | null {
  const cleanEmail = email.toLowerCase().trim();
  if (cleanEmail === SUPERADMIN_EMAIL.toLowerCase()) return "superadmin";
  if (ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(cleanEmail)) return "admin";
  return null;
}

export function canManageUsers(rol?: UserRole | null) {
  return rol === "admin" || rol === "superadmin";
}

