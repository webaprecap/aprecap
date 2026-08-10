// Capa Firebase — se activa cuando las variables están definidas.
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function firebaseEnabled() {
  return Boolean(config.apiKey && config.appId && config.projectId);
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined" || !firebaseEnabled()) return null;
  if (!app) {
    try {
      app = getApps().length ? getApps()[0] : initializeApp(config);
    } catch {
      return null;
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!getFirebaseApp()) return null;
  if (!auth) auth = getAuth(getFirebaseApp()!);
  return auth;
}

export function getFirestoreDb(): Firestore | null {
  if (!getFirebaseApp()) return null;
  if (!db) db = getFirestore(getFirebaseApp()!);
  return db;
}

export async function signInWithGoogle() {
  const a = getFirebaseAuth();
  if (!a) throw new Error("Firebase no configurado");
  const provider = new GoogleAuthProvider();
  return signInWithPopup(a, provider);
}

export async function signOutUser() {
  const a = getFirebaseAuth();
  if (a) await signOut(a);
}
