// Helpers de MFA (Ley 21.663) — segundo factor con teléfono + SMS.
// Implementados con la API estable de Firebase Auth v12 (multiFactor()/PhoneMultiFactorGenerator).
import {
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  getMultiFactorResolver,
  multiFactor,
  type Auth,
  type MultiFactorResolver,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

function getVerifier(auth: Auth): RecaptchaVerifier | null {
  if (typeof document === "undefined") return null;
  let el = document.getElementById("mfa-recaptcha") as HTMLElement | null;
  if (!el) {
    el = document.createElement("div");
    el.id = "mfa-recaptcha";
    el.style.display = "none";
    document.body.appendChild(el);
  }
  return new RecaptchaVerifier(auth, el, { size: "invisible" });
}

/** Inicia la inscripción de MFA por teléfono y envía el SMS de verificación. */
export async function startMfaEnrollment(phone: string): Promise<{ verificationId: string }> {
  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser) throw new Error("Sesión requerida");
  const session = await multiFactor(auth.currentUser).getSession();
  const provider = new PhoneAuthProvider(auth);
  const verificationId = await provider.verifyPhoneNumber(
    { phoneNumber: phone, session },
    getVerifier(auth) ?? undefined
  );
  return { verificationId };
}

/** Confirma el código SMS y completa la inscripción de MFA. */
export async function confirmMfaEnrollment(verificationId: string, code: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser) throw new Error("Sesión requerida");
  const cred = PhoneAuthProvider.credential(verificationId, code);
  const assertion = PhoneMultiFactorGenerator.assertion(cred);
  await multiFactor(auth.currentUser).enroll(assertion, "Teléfono");
}

/** Envía SMS para el desafío MFA durante el login (auth/multi-factor-auth-required). */
export async function startMfaChallenge(
  resolver: MultiFactorResolver,
  phoneIndex = 0
): Promise<{ resolver: MultiFactorResolver; verificationId: string }> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Sesión requerida");
  const provider = new PhoneAuthProvider(auth);
  const verificationId = await provider.verifyPhoneNumber(
    { multiFactorHint: resolver.hints[phoneIndex], session: resolver.session },
    getVerifier(auth) ?? undefined
  );
  return { resolver, verificationId };
}

/** Confirma el código SMS del desafío MFA. */
export async function confirmMfaChallenge(
  resolver: MultiFactorResolver,
  verificationId: string,
  code: string
): Promise<void> {
  const cred = PhoneAuthProvider.credential(verificationId, code);
  const assertion = PhoneMultiFactorGenerator.assertion(cred);
  await resolver.resolveSignIn(assertion);
}

export { getMultiFactorResolver };
