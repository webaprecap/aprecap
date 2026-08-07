"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";

export default function SolicitarAccesoPage() {
  const { user, userData, loading, signInGoogle } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    nombres: "",
    telefono: "",
    cursoDeseado: "",
    mensaje: "",
  });
  const [consentDatos, setConsentDatos] = useState(false);
  const [consentPromo, setConsentPromo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loading && userData) {
      router.push(userData.rol === "alumno" ? "/panel" : "/panel/admin");
    }
  }, [userData, loading, router]);

  const handleSubmit = async () => {
    setErr("");
    if (!user) {
      await signInGoogle();
      return;
    }
    if (!form.nombres.trim() || !form.telefono.trim()) {
      setErr("Completa nombres y teléfono.");
      return;
    }
    if (!consentDatos) {
      setErr("Debes aceptar el consentimiento de datos personales (Ley 21.719).");
      return;
    }
    const db = getFirestoreDb();
    if (!db) return;
    setEnviando(true);
    try {
      await addDoc(collection(db, "solicitudes"), {
        email: user.email,
        nombres: form.nombres.trim(),
        telefono: form.telefono.trim(),
        cursoDeseado: form.cursoDeseado.trim(),
        mensaje: form.mensaje.trim(),
        estado: "pendiente",
        fechaSolicitud: serverTimestamp(),
        consentimientoDatos: {
          aceptado: consentDatos,
          fecha: new Date().toISOString(),
          version: "v1.0-Ley21719",
          userAgent: navigator.userAgent,
        },
        consentimientoPromo: {
          aceptado: consentPromo,
          fecha: new Date().toISOString(),
          version: "v1.0",
        },
      });
      setOk(true);
    } catch {
      setErr("No se pudo enviar la solicitud. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-apre-blue">Solicitar acceso</h1>
          <p className="mt-2 text-gray-600">
            Completa tus datos y un administrador aprobará tu acceso al panel
            de alumno.
          </p>

          {ok ? (
            <div className="mt-6 rounded-xl bg-green-50 p-5 text-green-800">
              <p className="font-bold">¡Solicitud enviada!</p>
              <p className="mt-1 text-sm">
                Te contactaremos cuando tu acceso esté aprobado.
              </p>
              <Link href="/" className="mt-4 inline-block font-bold text-apre-blue hover:underline">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {!user && (
                <button
                  onClick={() => signInGoogle()}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-apre-blue px-5 py-3 font-bold text-white transition hover:bg-apre-blue-light"
                >
                  Identificarme con Google
                </button>
              )}
              {user && (
                <p className="rounded-xl bg-gray-100 p-3 text-sm text-gray-700">
                  Conectado como <strong>{user.email}</strong>
                </p>
              )}

              <input
                value={form.nombres}
                onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                placeholder="Nombres y apellidos *"
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              <input
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                placeholder="Teléfono (ej. +56 9 1234 5678) *"
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              <input
                value={form.cursoDeseado}
                onChange={(e) => setForm({ ...form, cursoDeseado: e.target.value })}
                placeholder="Curso de interés (opcional)"
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
              <textarea
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                placeholder="Mensaje (opcional)"
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />

              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consentDatos}
                  onChange={(e) => setConsentDatos(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  Acepto el tratamiento de mis datos personales conforme a la{" "}
                  <Link href="/privacidad" className="font-bold text-apre-red hover:underline">
                    Política de Privacidad
                  </Link>{" "}
                  (Ley 21.719). *
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consentPromo}
                  onChange={(e) => setConsentPromo(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>Acepto recibir comunicaciones comerciales y promociones.</span>
              </label>

              {err && <p className="text-sm text-red-600">{err}</p>}

              <button
                onClick={handleSubmit}
                disabled={enviando || !user}
                className="w-full rounded-xl bg-apre-red px-5 py-3 font-bold text-white transition hover:bg-apre-red-dark disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar solicitud"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
