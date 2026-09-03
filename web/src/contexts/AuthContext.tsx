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
  getDoc,
} from "firebase/firestore";
import {
  getFirebaseAuth,
  getFirestoreDb,
  firebaseEnabled,
} from "@/lib/firebase";
import { roleForEmail, type UserRole } from "@/lib/roles";

/** MFA exigido solo si se activa el flag (por defecto desactivado para pruebas). */
export function mfaRequired() {
  return process.env.NEXT_PUBLIC_MFA_REQUIRED === "true";
}

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
  signInGoogle: () => Promise<User | null>;
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
  signInGoogle: async () => null,
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
    async (email: string, targetUid?: string): Promise<UserData | null> => {
      if (!db) return null;
      const q = query(collection(db, "usuarios"), where("email", "==", email));
      const snap = await getDocs(q);
      if (snap.empty) return null;

      // Si hay más de un documento con este email (ej: uno temporal y uno con UID)
      if (snap.docs.length > 1) {
        if (targetUid) {
          const exactDoc = snap.docs.find((d) => d.id === targetUid || d.data().uid === targetUid);
          if (exactDoc) {
            const d = exactDoc.data() as UserData;
            return { ...d, uid: targetUid };
          }
        }
        // Priorizar el documento que ya tenga RUT completo registrado
        const docConRut = snap.docs.find((d) => Boolean(d.data().rut));
        if (docConRut) {
          const d = docConRut.data() as UserData;
          return { ...d, uid: d.uid || docConRut.id };
        }
      }

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

      // 1. Intentar cargar directamente por u.uid primero (garantiza persistencia del perfil oficial guardado)
      const userDocRef = doc(db, "usuarios", u.uid);
      const userDocSnap = await getDoc(userDocRef);
      let found: UserData | null = userDocSnap.exists()
        ? ({ ...userDocSnap.data(), uid: u.uid } as UserData)
        : null;

      // 2. Si no existe por u.uid directo, buscar por email para vincular fichas creadas por el admin o solicitudes previas
      if (!found) {
        const foundByEmail = await findUserByEmail(email, u.uid);
        if (foundByEmail) {
          found = { ...foundByEmail, uid: u.uid };
          // Guardar bajo u.uid oficial con merge para consolidar
          await setDoc(userDocRef, { ...foundByEmail, uid: u.uid }, { merge: true }).catch(() => {});
          if (foundByEmail.uid && foundByEmail.uid !== u.uid) {
            await deleteDoc(doc(db, "usuarios", foundByEmail.uid)).catch(() => {});
          }
        }
      } else {
        // Si ya existe por u.uid directo pero en Firestore todavía queda un doc temporal duplicado por email, limpiarlo
        const qDup = query(collection(db, "usuarios"), where("email", "==", email));
        getDocs(qDup).then((dupSnap) => {
          dupSnap.docs.forEach((d) => {
            if (d.id !== u.uid) {
              deleteDoc(doc(db, "usuarios", d.id)).catch(() => {});
            }
          });
        }).catch(() => {});
      }

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
          // Alumno nuevo (sin doc en `usuarios` todavía): se mantiene la
          // sesión con userData = null para poder completar /solicitar-acceso.
          setUserData(null);
          setError(null);
          return;
        }
      }

      // Si el email tiene un rol administrativo por configuración y su doc no lo tenía, actualizar
      const expectedRole = roleForEmail(email);
      if (expectedRole && found && found.rol !== expectedRole) {
        found = { ...found, rol: expectedRole, activo: true };
        await setDoc(doc(db, "usuarios", found.uid || u.uid), { rol: expectedRole, activo: true }, { merge: true }).catch(() => {});
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

  const signInGoogle = useCallback(async (): Promise<User | null> => {
    const auth = getFirebaseAuth();
    if (!auth) return null;
    setError(null);
    setMfaResolver(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      if (mfaRequired() && multiFactor(result.user).enrolledFactors.length === 0) {
        const d = await findUserByEmail(result.user.email?.toLowerCase() ?? "");
        if (d && (d.rol === "admin" || d.rol === "superadmin" || d.rol === "profesor")) {
          setRequiresMfaEnrollment(true);
        }
      }
      return result.user;
    } catch (e) {
      if ((e as { code?: string })?.code === "auth/multi-factor-auth-required") {
        setMfaResolver(getMultiFactorResolver(auth, e as never));
        setError("Se requiere verificación de segundo factor.");
      } else {
        setError("No se pudo iniciar sesión.");
      }
      return null;
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
