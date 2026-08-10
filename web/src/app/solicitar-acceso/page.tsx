"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

const SOLICITUD_VERSION = "v1.0-Ley21719";

export default function SolicitarAccesoPage() {
  const { user, userData, loading, signInGoogle } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    tipoSolicitud: "alumno",
    mensaje: "",
  });
  const [consentimientoDatos, setConsentimientoDatos] = useState(false);
  const [consentimientoPromo, setConsentimientoPromo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loading && userData) {
      const target =
        userData.rol === "alumno"
          ? "/panel/alumno"
          : userData.rol === "profesor"
          ? "/panel/profesor"
          : "/panel/admin";
      router.push(target);
    }
  }, [userData, loading, router]);

  const handleSubmit = async () => {
    setErr("");
    if (!user) {
      await signInGoogle();
      return;
    }
    if (
      !form.nombres.trim() ||
      !form.apellidoPaterno.trim() ||
      !form.apellidoMaterno.trim() ||
      !form.telefono.trim()
    ) {
      setErr("Completa nombres, apellidos y teléfono.");
      return;
    }
    if (!consentimientoDatos) {
      setErr("Debes aceptar el consentimiento de datos personales (Ley 21.719).");
      return;
    }
    const db = getFirestoreDb();
    if (!db) return;

    setEnviando(true);
    try {
      // Bloquea solicitudes pendientes duplicadas por email (como SARMAT)
      const q = query(
        collection(db, "solicitudes"),
        where("email", "==", user.email),
        where("estado", "==", "pendiente")
      );
      const dup = await getDocs(q);
      if (!dup.empty) {
        setErr("Ya tienes una solicitud pendiente con este correo. Espera la respuesta del administrador.");
        return;
      }
      await addDoc(collection(db, "solicitudes"), {
        email: user.email,
        nombres: form.nombres.trim(),
        apellidoPaterno: form.apellidoPaterno.trim(),
        apellidoMaterno: form.apellidoMaterno.trim(),
        telefono: form.telefono.trim(),
        tipoSolicitud: form.tipoSolicitud,
        mensaje: form.mensaje.trim(),
        estado: "pendiente",
        fechaSolicitud: serverTimestamp(),
        consentimientoDatos: {
          aceptado: consentimientoDatos,
          fecha: new Date().toISOString(),
          version: SOLICITUD_VERSION,
          userAgent: navigator.userAgent,
        },
        consentimientoPromo: {
          aceptado: consentimientoPromo,
          fecha: new Date().toISOString(),
          version: "v1.0",
        },
      });
      setOk(true);
    } catch (e) {
      setErr(
        e instanceof Error && e.message.includes("pendiente")
          ? e.message
          : "No se pudo enviar la solicitud. Intenta de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  const set = (campo: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [campo]: e.target.value });

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-apre-blue">Solicitud de Acceso</h1>
          <p className="mt-2 text-gray-600">
            Completa el formulario para solicitar acceso al sistema de OTEC APRECAP.
          </p>

          {ok ? (
            <div className="mt-6 rounded-xl bg-green-50 p-5 text-green-800">
              <p className="font-bold">¡Solicitud enviada!</p>
              <p className="mt-1 text-sm">
                Un administrador revisará tu solicitud y te contactaremos cuando
                tu acceso esté aprobado.
              </p>
              <Link href="/" className="mt-4 inline-block font-bold text-apre-blue hover:underline">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {err && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{err}</p>}

              {!user ? (
                <div>
                  <p className="text-sm font-bold text-apre-blue">
                    Paso 1: Identifícate con tu cuenta de Google
                  </p>
                  <button
                    onClick={async () => {
                      const u = await signInGoogle();
                      if (!u) setErr("No se pudo iniciar sesión con Google.");
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-apre-blue px-5 py-3 font-bold text-white transition hover:bg-apre-blue-light"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Identificarme con Google
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Tu correo de Google será tu identificador en el sistema.
                  </p>
                </div>
              ) : (
                <p className="rounded-xl bg-gray-100 p-3 text-sm text-gray-700">
                  ✅ Correo verificado: <strong>{user.email}</strong>{" "}
                  <button
                    onClick={async () => {
                      const auth = getFirebaseAuth();
                      if (auth) await import("firebase/auth").then(({ signOut }) => signOut(auth));
                    }}
                    className="ml-2 text-xs font-bold text-apre-red hover:underline"
                  >
                    Cambiar
                  </button>
                </p>
              )}

              {user && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-apre-blue">Nombres *</label>
                    <input
                      type="text"
                      value={form.nombres}
                      onChange={set("nombres")}
                      placeholder="Ej: Juan Carlos"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold text-apre-blue">
                        Apellido Paterno *
                      </label>
                      <input
                        type="text"
                        value={form.apellidoPaterno}
                        onChange={set("apellidoPaterno")}
                        placeholder="Ej: González"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-apre-blue">
                        Apellido Materno *
                      </label>
                      <input
                        type="text"
                        value={form.apellidoMaterno}
                        onChange={set("apellidoMaterno")}
                        placeholder="Ej: Pérez"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-apre-blue">Teléfono *</label>
                    <input
                      type="tel"
                      value={form.telefono}
                      onChange={set("telefono")}
                      placeholder="Ej: +56 9 1234 5678"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-apre-blue">
                      Tipo de Solicitud *
                    </label>
                    <select
                      value={form.tipoSolicitud}
                      onChange={set("tipoSolicitud")}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                    >
                      <option value="alumno">Quiero ser Alumno</option>
                      <option value="profesor">Quiero ser Profesor</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-apre-blue">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      value={form.mensaje}
                      onChange={set("mensaje")}
                      placeholder="Información adicional que quieras agregar..."
                      rows={3}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                    />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={consentimientoDatos}
                      onChange={(e) => setConsentimientoDatos(e.target.checked)}
                      className="mt-1 h-4 w-4"
                    />
                    <span>
                      Autorizo de manera expresa, libre e informada el tratamiento de mis datos
                      personales (Nombre, RUT, Correo) de acuerdo con la{" "}
                      <Link href="/privacidad" className="font-bold text-apre-red hover:underline">
                        Política de Privacidad
                      </Link>
                      . Entiendo que puedo ejercer mis derechos ARCO en todo momento. *
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={consentimientoPromo}
                      onChange={(e) => setConsentimientoPromo(e.target.checked)}
                      className="mt-1 h-4 w-4"
                    />
                    <span>
                      Autorizo el envío de correos informativos o promocionales por parte de
                      APRECAP. (Opcional)
                    </span>
                  </label>

                  <button
                    onClick={handleSubmit}
                    disabled={enviando}
                    className="w-full rounded-xl bg-apre-red px-5 py-3 font-bold text-white transition hover:bg-apre-red-dark disabled:opacity-50"
                  >
                    {enviando ? "Enviando..." : "Enviar Solicitud"}
                  </button>
                </>
              )}
            </div>
          )}

          <p className="mt-6 text-center">
            <Link href="/login" className="text-sm text-gray-500 hover:underline">
              ← Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
