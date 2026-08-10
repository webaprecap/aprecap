// Firebase Admin SDK (solo servidor) — usa FIREBASE_SERVICE_ACCOUNT (env) o web/service-account.json.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  getApps,
  initializeApp,
  cert,
  type ServiceAccount,
  type App,
} from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

let app: App | null = null;

function parseSa(raw: unknown): ServiceAccount | null {
  try {
    const obj = raw as Record<string, unknown>;
    if (!obj || typeof obj !== "object" || !obj.project_id) return null;
    return {
      projectId: String(obj.project_id),
      clientEmail: String(obj.client_email),
      privateKey: String(obj.private_key),
    } as ServiceAccount;
  } catch {
    return null;
  }
}

function serviceAccountCache(): ServiceAccount | null {
  const env = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (env) {
    const sa = parseSa(JSON.parse(env));
    if (sa) return sa;
  }
  const p = join(process.cwd(), "service-account.json");
  if (!existsSync(p)) return null;
  try {
    return parseSa(JSON.parse(readFileSync(p, "utf8")));
  } catch {
    return null;
  }
}

export function adminApp(): App | null {
  if (app) return app;
  const sa = serviceAccountCache();
  if (!sa) return null;
  app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(sa), projectId: sa.projectId });
  return app;
}

export function adminDb() {
  const a = adminApp();
  if (!a) return null;
  return getFirestore(a);
}

export { Timestamp };

export type PagoDoc = {
  buyOrder: string;
  token: string;
  cursoSlug: string;
  cursoNombre: string;
  email: string;
  uidUsuario?: string;
  nombreUsuario?: string;
  monto: number;
  estado: "creado" | "aprobado" | "rechazado" | "anulado" | "error";
  metodo?: string;
  cuotas?: number;
  montoCuota?: number;
  authorizationCode?: string;
  cardNumber?: string;
  buyOrderTbk?: string;
  fechaCreacion: Timestamp | Date;
  fechaPago?: Timestamp | Date;
  consentRef?: string;
  versionConsentimiento?: string;
};

export async function guardarPago(data: PagoDoc): Promise<string | null> {
  const db = adminDb();
  if (!db) return null;
  await db.collection("pagos").doc(data.buyOrder).set({
    ...data,
    fechaCreacion: Timestamp.fromDate(new Date(String(data.fechaCreacion))),
    fechaPago: data.fechaPago ? Timestamp.fromDate(new Date(String(data.fechaPago))) : null,
  });
  return data.buyOrder;
}

export async function actualizarPago(buyOrder: string, patch: Partial<PagoDoc>): Promise<boolean> {
  const db = adminDb();
  if (!db) return false;
  await db.collection("pagos").doc(buyOrder).update(patch);
  return true;
}

export async function obtenerPago(buyOrder: string): Promise<{ id: string; data: PagoDoc } | null> {
  const db = adminDb();
  if (!db) return null;
  const snap = await db.collection("pagos").doc(buyOrder).get();
  if (!snap.exists) return null;
  return { id: snap.id, data: snap.data() as PagoDoc };
}

export async function guardarConsentimiento(params: {
  uid: string;
  email: string;
  version: string;
  userAgent: string;
}): Promise<string | null> {
  const db = adminDb();
  if (!db) return null;
  const ref = db.collection("consents").doc(`${params.uid}_${Date.now()}`);
  await ref.set({
    uid: params.uid,
    email: params.email,
    tipo: "pago-ley21719",
    version: params.version,
    aceptado: true,
    fecha: Timestamp.now(),
    userAgent: params.userAgent,
  });
  return ref.id;
}