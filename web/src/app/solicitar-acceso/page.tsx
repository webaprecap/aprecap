"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { formatRut, validateRut } from "@/lib/rut";
import { CURSOS_LISTA } from "@/lib/courseAccess";

const SOLICITUD_VERSION = "v1.1-Ley21719-RUT";

export default function SolicitarAccesoPage() {
  const { user, userData, loading, signInGoogle } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    rut: "",
    telefono: "",
    tipoSolicitud: "alumno",
    cursoDeseado: "guardia-de-seguridad",
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

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setForm((prev) => ({ ...prev, rut: formatted }));
  };

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
      !form.rut.trim() ||
      !form.telefono.trim()
    ) {
      setErr("Completa nombres, apellidos, RUT y teléfono.");
      return;
    }

    if (!validateRut(form.rut)) {
      setErr("El RUT ingresado no es válido. Verifica el número y dígito verificador.");
      return;
    }

    if (!consentimientoDatos) {
      setErr("Debes aceptar el consentimiento de datos personales (Ley 19.628 y Ley 21.719).");
      return;
    }
    const db = getFirestoreDb();
    if (!db) return;

    setEnviando(true);
    try {
      // Bloquea solicitudes pendientes duplicadas por email
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
        rut: form.rut.trim(),
        telefono: form.telefono.trim(),
        tipoSolicitud: form.tipoSolicitud,
        cursoDeseado: form.cursoDeseado,
        mensaje: form.mensaje.trim(),
        estado: "pendiente",
        fechaSolicitud: serverTimestamp(),
        consentimientoDatos: {
          aceptado: consentimientoDatos,
          fecha: new Date().toISOString(),
          version: SOLICITUD_VERSION,
          userAgent: navigator.userAgent,
          finalidad: "Certificación académica oficial y acreditación ante Carabineros OS-10, SPD y SENCE",
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
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-blue">
            <span>🛡️</span> Matrícula y Aula Virtual
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-apre-blue">Solicitud de Acceso</h1>
          <p className="mt-2 text-sm text-gray-600">
            Completa tus datos oficiales para solicitar tu matrícula y acceso al aula virtual de OTEC APRECAP.
          </p>

          {ok ? (
            <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-900 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-black text-lg">¡Solicitud enviada con éxito!</p>
              <p className="mt-2 text-xs text-emerald-800 leading-relaxed">
                Un administrador de APRECAP revisará tus antecedentes y habilitará tu cuenta y curso solicitado a la brevedad.
              </p>
              <Link
                href="/"
                className="mt-5 inline-block rounded-xl bg-apre-blue px-6 py-2.5 text-xs font-bold text-white transition hover:bg-apre-blue/90"
              >
                Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {err && (
                <p className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700">
                  ⚠️ {err}
                </p>
              )}

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
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-apre-blue px-5 py-3 font-bold text-white transition hover:bg-apre-blue-light shadow-sm"
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
                <div className="rounded-xl bg-gray-100 p-3 text-xs text-gray-700 flex items-center justify-between">
                  <span>
                    ✅ Correo verificado: <strong>{user.email}</strong>
                  </span>
                  <button
                    onClick={async () => {
                      const auth = getFirebaseAuth();
                      if (auth) await import("firebase/auth").then(({ signOut }) => signOut(auth));
                    }}
                    className="text-xs font-bold text-apre-red hover:underline"
                  >
                    Cambiar
                  </button>
                </div>
              )}

              {user && (
                <>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                      Nombres *
                    </label>
                    <input
                      type="text"
                      value={form.nombres}
                      onChange={set("nombres")}
                      placeholder="Ej: Juan Carlos"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                        Apellido Paterno *
                      </label>
                      <input
                        type="text"
                        value={form.apellidoPaterno}
                        onChange={set("apellidoPaterno")}
                        placeholder="Ej: González"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                        Apellido Materno *
                      </label>
                      <input
                        type="text"
                        value={form.apellidoMaterno}
                        onChange={set("apellidoMaterno")}
                        placeholder="Ej: Pérez"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                        RUT (requerido para certificado) *
                      </label>
                      <input
                        type="text"
                        value={form.rut}
                        onChange={handleRutChange}
                        placeholder="12.345.678-9"
                        maxLength={12}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-apre-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={set("telefono")}
                        placeholder="+56 9 1234 5678"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                      ¿Qué curso deseas realizar? *
                    </label>
                    <select
                      value={form.cursoDeseado}
                      onChange={set("cursoDeseado")}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                    >
                      {CURSOS_LISTA.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.icono} {c.nombre} ({c.horas} hrs)
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Al aprobarte, este curso quedará habilitado en tu aula virtual.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                      Tipo de Perfil *
                    </label>
                    <select
                      value={form.tipoSolicitud}
                      onChange={set("tipoSolicitud")}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                    >
                      <option value="alumno">Estudiante / Alumno</option>
                      <option value="profesor">Docente / Profesor</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                      Mensaje adicional (opcional)
                    </label>
                    <textarea
                      value={form.mensaje}
                      onChange={set("mensaje")}
                      placeholder="Indica información adicional, empresa o detalles de tu postulación..."
                      rows={2}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
                    <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentimientoDatos}
                        onChange={(e) => setConsentimientoDatos(e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-apre-blue"
                      />
                      <span>
                        Autorizo de manera expresa e informada el tratamiento de mis datos personales
                        (Nombre completo, <strong>RUT</strong>, Correo y Teléfono) con fines de matrícula,
                        emisión de diplomas y acreditación oficial conforme a la{" "}
                        <Link href="/privacidad" className="font-bold text-apre-red hover:underline">
                          Política de Privacidad
                        </Link>{" "}
                        y las Leyes N° 19.628 y N° 21.719. *
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentimientoPromo}
                        onChange={(e) => setConsentimientoPromo(e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-apre-blue"
                      />
                      <span>
                        Autorizo el envío de notificaciones sobre clases en vivo y cursos de seguridad privada de APRECAP. (Opcional)
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={enviando}
                    className="w-full rounded-xl bg-apre-red py-3 text-sm font-extrabold text-white transition hover:bg-apre-red-dark shadow-sm disabled:opacity-50"
                  >
                    {enviando ? "Enviando solicitud…" : "🚀 Enviar Solicitud de Acceso"}
                  </button>
                </>
              )}
            </div>
          )}

          <p className="mt-6 text-center">
            <Link href="/login" className="text-xs font-bold text-gray-500 hover:underline">
              ← Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
