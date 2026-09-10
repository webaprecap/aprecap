import type { NextRequest } from "next/server";
import { verifyUserToken, firestoreGetDoc } from "./firebase-rest";
import { ADMIN_EMAILS, SUPERADMIN_EMAIL } from "./roles";

export interface AuthSession {
  uid: string;
  email: string;
  rol: "admin" | "superadmin" | "profesor" | "alumno";
}

export interface AuthVerificationResult {
  autorizado: boolean;
  error?: string;
  status: number;
  session?: AuthSession;
}

/**
 * Verifica si la petición proviene de un usuario autenticado y con rol de
 * administrador (admin/superadmin) o docente (profesor).
 */
export async function verificarDocenteOAdmin(req: Request | NextRequest): Promise<AuthVerificationResult> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      autorizado: false,
      error: "No autorizado: cabecera Authorization requerida (Bearer token)",
      status: 401,
    };
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return {
      autorizado: false,
      error: "No autorizado: token vacío",
      status: 401,
    };
  }

  const verified = await verifyUserToken(token);
  if (!verified || !verified.uid) {
    return {
      autorizado: false,
      error: "Token de sesión inválido o expirado",
      status: 401,
    };
  }

  const email = (verified.email || "").toLowerCase().trim();

  // 1. Verificación inmediata de emails administrativos autorizados
  const isHardcodedAdmin =
    email === SUPERADMIN_EMAIL.toLowerCase() ||
    ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email);

  if (isHardcodedAdmin) {
    return {
      autorizado: true,
      status: 200,
      session: {
        uid: verified.uid,
        email,
        rol: email === SUPERADMIN_EMAIL.toLowerCase() ? "superadmin" : "admin",
      },
    };
  }

  // 2. Verificación en Firestore si el usuario posee rol 'profesor' o 'admin'
  try {
    const userDoc = await firestoreGetDoc("usuarios", verified.uid);
    if (userDoc && (userDoc.rol === "profesor" || userDoc.rol === "admin" || userDoc.rol === "superadmin")) {
      return {
        autorizado: true,
        status: 200,
        session: {
          uid: verified.uid,
          email: (userDoc.email || email).toLowerCase(),
          rol: userDoc.rol,
        },
      };
    }
  } catch (e) {
    console.error("[auth-server] Error al verificar rol en Firestore:", e);
  }

  return {
    autorizado: false,
    error: "Acceso denegado: se requieren permisos de docente o administrador",
    status: 403,
  };
}

/**
 * Verifica si la petición proviene estrictamente de un administrador (admin o superadmin).
 */
export async function verificarAdmin(req: Request | NextRequest): Promise<AuthVerificationResult> {
  const res = await verificarDocenteOAdmin(req);
  if (!res.autorizado) return res;

  if (res.session?.rol !== "admin" && res.session?.rol !== "superadmin") {
    return {
      autorizado: false,
      error: "Acceso denegado: se requieren permisos de administrador",
      status: 403,
    };
  }

  return res;
}
