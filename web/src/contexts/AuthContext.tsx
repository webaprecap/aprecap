"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  multiFactor,
  type User,
  type MultiFactorResolver,
} from "firebase/auth";
import { getMultiFactorResolver } from "@/lib/mfa";
import {
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getFirebaseAuth,
  getFirestoreDb,
  firebaseEnabled,
} from "@/lib/firebase";
import { roleForEmail, type UserRole } from "@/lib/roles";

export interface UserData {
  uid: string;
  email: string;
  nombre: string;
  rol: UserRole;
  activo: boolean;
  fechaRegistro?: Date;
  telefono?: string;
  ley21719Aceptada?: boolean;
  fechaConsentimiento?: Date;
  versionConsentimiento?: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  requiresMfaEnrollment: boolean;
  mfaResolver: MultiFactorResolver | null;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  acceptConsent: (version: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userData: null,
  loading: true,
  error: null,
  requiresMfaEnrollment: false,
  mfaResolver: null,
  signInGoogle: async () => {},
  signOut: async () => {},
  acceptConsent: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(() => !firebaseEnabled());
  const [error, setError] = useState<string | null>(null);
  const [requiresMfaEnrollment, setRequiresMfaEnrollment] = useState(false);
  const [mfaResolver, setMfaResolver] = useState<MultiFactorResolver | null>(null);

  const db = getFirestoreDb();

  const findUserByEmail = useCallback(
    async (email: string): Promise<UserData | null> => {
      if (!db) return null;
      const q = query(collection(db, "usuarios"), where("email", "==", email));
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const d = snap.docs[0].data() as UserData;
      return { ...d, uid: d.uid || snap.docs[0].id };
    },
    [db]
  );

  const loadUser = useCallback(
    async (u: User) => {
      setUser(u);
      if (!db) return;
      const email = u.email?.toLowerCase() ?? "";

      let found = await findUserByEmail(email);

      if (found && found.activo === false) {
        setError("Tu cuenta está desactivada. Contacta al administrador.");
        await firebaseSignOut(getFirebaseAuth()!);
        setUser(null);
        setUserData(null);
        return;
      }

      if (!found) {
        // Auto-registro por email especial (admin/superadmin) o rechazo
        const rol = roleForEmail(email);
        if (rol) {
          const uid = u.uid;
          await setDoc(doc(db, "usuarios", uid), {
            uid,
            email,
            nombre: u.displayName || email.split("@")[0],
            rol,
            activo: true,
            fechaRegistro: serverTimestamp(),
          });
          found = {
            uid,
            email,
            nombre: u.displayName || email.split("@")[0],
            rol,
            activo: true,
          };
        } else {
          await firebaseSignOut(getFirebaseAuth()!);
          setError("No tienes acceso al sistema. Solicita tu acceso.");
          setUser(null);
          setUserData(null);
          return;
        }
      } else if (found.uid !== u.uid) {
        // Migración de documento temporal (creado por admin) al UID real
        const tempDoc = doc(db, "usuarios", found.uid!);
        await setDoc(doc(db, "usuarios", u.uid), { ...found, uid: u.uid });
        await deleteDoc(tempDoc).catch(() => {});
        found = { ...found, uid: u.uid };
      }

      setUserData(found);
      setError(null);
    },
    [db, findUserByEmail]
  );

  useEffect(() => {
    if (!firebaseEnabled()) return;
    const auth = getFirebaseAuth();
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        loadUser(u).finally(() => setLoading(false));
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });
    return unsub;
  }, [loadUser]);

  const signInGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    setError(null);
    setMfaResolver(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      if (multiFactor(result.user).enrolledFactors.length === 0) {
        const d = await findUserByEmail(result.user.email?.toLowerCase() ?? "");
        if (d && (d.rol === "admin" || d.rol === "superadmin")) {
          setRequiresMfaEnrollment(true);
        }
      }
    } catch (e) {
      if ((e as { code?: string })?.code === "auth/multi-factor-auth-required") {
        setMfaResolver(getMultiFactorResolver(auth, e as never));
        setError("Se requiere verificación de segundo factor.");
      } else {
        setError("No se pudo iniciar sesión.");
      }
    }
  }, [findUserByEmail]);

  const signOut = useCallback(async () => {
    await firebaseSignOut(getFirebaseAuth()!);
    setUser(null);
    setUserData(null);
    setRequiresMfaEnrollment(false);
    setMfaResolver(null);
  }, []);

  const acceptConsent = useCallback(
    async (version: string) => {
      if (!db || !user || !userData) return;
      await updateDoc(doc(db, "usuarios", user.uid), {
        ley21719Aceptada: true,
        fechaConsentimiento: serverTimestamp(),
        versionConsentimiento: version,
      });
      setUserData((prev) =>
        prev ? { ...prev, ley21719Aceptada: true, versionConsentimiento: version } : prev
      );
      // Registro inmutable del consentimiento (Ley 21.719)
      await setDoc(doc(collection(db, "consents"), `${user.uid}_${Date.now()}`), {
        uid: user.uid,
        email: user.email,
        tipo: "ley21719",
        version,
        aceptado: true,
        fecha: serverTimestamp(),
        userAgent: navigator.userAgent,
      });
    },
    [db, user, userData]
  );

  const value = useMemo(
    () => ({
      user,
      userData,
      loading,
      error,
      requiresMfaEnrollment,
      mfaResolver,
      signInGoogle,
      signOut,
      acceptConsent,
    }),
    [user, userData, loading, error, requiresMfaEnrollment, mfaResolver, signInGoogle, signOut, acceptConsent]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
