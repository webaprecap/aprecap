// Verificación de credenciales de Firebase Service Account (server-side).
export function firebaseAdminEnabled() {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT);
}

