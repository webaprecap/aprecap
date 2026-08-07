// Inicialización de Firebase Admin SDK (server-side) — env-gated.
import { getApps, initializeApp, type App } from "firebase-admin/app";

export function firebaseAdminEnabled() {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT);
}

let app: App | null = null;

export function getFirebaseAdminApp(): App {
  if (app) return app;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT no configurada");
  app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: JSON.parse(raw),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
  return app;
}
