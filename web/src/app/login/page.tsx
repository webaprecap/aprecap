"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { userData, loading, error, signInGoogle, signOut, requiresMfaEnrollment, mfaResolver } =
    useAuth();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [mfaError, setMfaError] = useState("");
  const [busy, setBusy] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  useEffect(() => {
    if (!loading && userData) {
      const target =
        userData.rol === "admin" || userData.rol === "superadmin"
          ? "/panel/admin"
          : userData.rol === "profesor"
          ? "/panel/profesor"
          : "/panel";
      router.push(target);
    }
  }, [userData, loading, router]);

  const handleGoogle = async () => {
    try {
      await signInGoogle();
    } catch {
      // error ya seteado en contexto
    }
  };

  // Enroll MFA (admin sin segundo factor configurado)
  const sendEnrollCode = async () => {
    setBusy(true);
    setMfaError("");
    try {
      const { startMfaEnrollment } = await import("@/lib/mfa");
      const { verificationId } = await startMfaEnrollment(phone);
      localStorage.setItem("mfaEnrollVerificationId", verificationId);
      setSmsSent(true);
    } catch (e) {
      setMfaError(e instanceof Error ? e.message : "Error de MFA");
    } finally {
      setBusy(false);
    }
  };

  const confirmEnrollCode = async () => {
    setBusy(true);
    setMfaError("");
    try {
      const { confirmMfaEnrollment } = await import("@/lib/mfa");
      const ver = localStorage.getItem("mfaEnrollVerificationId");
      if (!ver) throw new Error("Reinicia el proceso de verificación.");
      await confirmMfaEnrollment(ver, code);
      localStorage.removeItem("mfaEnrollVerificationId");
      window.location.reload();
    } catch (e) {
      setMfaError(e instanceof Error ? e.message : "Código inválido");
    } finally {
      setBusy(false);
    }
  };

  // Challenge MFA (login con segundo factor ya configurado)
  const sendChallengeCode = async () => {
    if (!mfaResolver) return;
    setBusy(true);
    setMfaError("");
    try {
      const { startMfaChallenge } = await import("@/lib/mfa");
      const r = await startMfaChallenge(mfaResolver);
      sessionStorage.setItem("mfaChallengeVerificationId", r.verificationId);
      setSmsSent(true);
    } catch (e) {
      setMfaError(e instanceof Error ? e.message : "Error de MFA");
    } finally {
      setBusy(false);
    }
  };

  const confirmChallengeCode = async () => {
    if (!mfaResolver) return;
    setBusy(true);
    setMfaError("");
    try {
      const { confirmMfaChallenge } = await import("@/lib/mfa");
      const ver = sessionStorage.getItem("mfaChallengeVerificationId");
      if (!ver) throw new Error("Reinicia el proceso de verificación.");
      await confirmMfaChallenge(mfaResolver, ver, code);
      sessionStorage.removeItem("mfaChallengeVerificationId");
      window.location.reload();
    } catch (e) {
      setMfaError(e instanceof Error ? e.message : "Código inválido");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-apre-blue">Iniciar sesión</h1>
          <p className="mt-2 text-gray-600">
            Accede con tu cuenta de Google. ¿Aún no tienes acceso?{" "}
            <Link href="/solicitar-acceso" className="font-bold text-apre-red hover:underline">
              Solicita tu acceso
            </Link>
          </p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          {mfaResolver ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-600">
                Verificación en dos pasos: te enviaremos un código SMS a tu teléfono registrado.
              </p>
              {mfaError && <p className="text-sm text-red-600">{mfaError}</p>}
              {smsSent && (
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Código de 6 dígitos"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              )}
              <button
                onClick={smsSent ? confirmChallengeCode : sendChallengeCode}
                disabled={busy}
                className="w-full rounded-xl bg-apre-red px-5 py-3 font-bold text-white disabled:opacity-60"
              >
                {busy ? "Procesando…" : smsSent ? "Verificar código" : "Enviar código SMS"}
              </button>
            </div>
          ) : requiresMfaEnrollment ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-600">
                Los administradores deben configurar la verificación en dos pasos (MFA). Ingresa
                tu teléfono con formato +56.
              </p>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56 9 1234 5678"
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              {mfaError && <p className="text-sm text-red-600">{mfaError}</p>}
              <button
                onClick={smsSent ? confirmEnrollCode : sendEnrollCode}
                disabled={busy}
                className="w-full rounded-xl bg-apre-red px-5 py-3 font-bold text-white disabled:opacity-60"
              >
                {busy ? "Procesando…" : smsSent ? "Verificar código" : "Enviar código SMS"}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogle}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-apre-blue px-5 py-3 font-bold text-white transition hover:bg-apre-blue-light"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
              </button>
            </>
          )}

          <div className="mt-6 space-y-3 text-center">
            <button onClick={() => signOut()} className="text-sm text-gray-500 hover:underline">
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
