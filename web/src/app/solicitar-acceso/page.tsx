"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { formatRut, validateRut } from "@/lib/rut";
import { CURSOS_LISTA } from "@/lib/courseAccess";

const SOLICITUD_VERSION = "v1.1-Ley21719-RUT";

export default function SolicitarAccesoPage() {
  return (
    <Suspense fallback={null}>
      <SolicitarAccesoInner />
    </Suspense>
  );
}

function SolicitarAccesoInner() {
  const { user, userData, loading, signInGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cursoParam = searchParams.get("curso");

  const [form, setForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    rut: "",
    telefono: "",
    tipoSolicitud: "alumno",
    cursoDeseado: cursoParam && CURSOS_LISTA.some((c) => c.slug === cursoParam) ? cursoParam : "guardia-de-seguridad",
    mensaje: "",
  });
  const [consentimientoDatos, setConsentimientoDatos] = useState(false);
  const [consentimientoPromo, setConsentimientoPromo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (cursoParam && CURSOS_LISTA.some((c) => c.slug === cursoParam)) {
      setForm((prev) => ({ ...prev, cursoDeseado: cursoParam }));
    }
  }, [cursoParam]);

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
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Encabezado superior */}
        <div className="mb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-apre-blue">
            <span>🛡️</span> OTEC APRECAP · Campus Virtual
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-apre-blue">
            Registro y Solicitud de Acceso
          </h1>
          <p className="mt-1 text-sm text-gray-600 max-w-2xl">
            Sigue el video tutorial o completa tus datos oficiales para solicitar tu matrícula y acceso al aula virtual.
          </p>
        </div>

        {/* Grid de 2 Columnas: Video Tutorial + Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Video Tutorial en Marco APRECAP + Ayuda Gmail */}
          <div className="lg:col-span-6 space-y-6">
            {/* Marco de Video Estilo APRECAP */}
            <div className="overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 text-sm">
                    ▶
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                      Tutorial Oficial
                    </p>
                    <h3 className="text-sm font-extrabold text-white leading-tight">
                      Cómo crearte una cuenta en APRECAP
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-black text-slate-300 border border-slate-700">
                  HD
                </span>
              </div>

              {/* Contenedor responsivo 16:9 del reproductor */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/iTX3rxiEnBo?rel=0"
                  title="Video Tutorial: Cómo crear tu cuenta en APRECAP"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                Este video te guía paso a paso en el proceso de autenticación con Google y cómo solicitar tu matrícula en los cursos de seguridad privada.
              </p>
            </div>

            {/* Tarjeta de Creación de Cuenta Gmail en Español */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-200">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-apre-blue leading-tight">
                    ¿No tienes un correo de Google (Gmail)?
                  </h4>
                  <p className="text-xs text-gray-500">
                    El aula virtual requiere una cuenta Gmail para proteger tu acceso.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Si aún no tienes correo Gmail o deseas crear uno nuevo para tus estudios, puedes registrarlo de forma gratuita en solo 2 minutos:
              </p>

              <a
                href="https://accounts.google.com/signup?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 py-2.5 px-4 text-xs font-bold text-apre-blue transition shadow-xs"
              >
                <span>✉️</span>
                <span>Crear nueva cuenta Gmail en Español</span>
                <span className="text-gray-400 text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario Oficial de Solicitud */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-apre-blue">
                Formulario de Matrícula
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Ingresa tus datos personales fidedignos para habilitar tu certificado.
              </p>

              {ok ? (
                <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-900 text-center space-y-3">
                  <div className="text-4xl">🎉</div>
                  <p className="font-black text-lg">¡Solicitud enviada con éxito!</p>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Un administrador de APRECAP revisará tus antecedentes y habilitará tu cuenta y curso solicitado a la brevedad.
                  </p>
                  <Link
                    href="/"
                    className="inline-block rounded-xl bg-apre-blue px-6 py-2.5 text-xs font-bold text-white transition hover:bg-apre-blue/90"
                  >
                    Volver al inicio
                  </Link>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {err && (
                    <p className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-bold text-red-700">
                      ⚠️ {err}
                    </p>
                  )}

                  {!user ? (
                    <div className="space-y-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                        Paso 1: Identifícate con tu cuenta Google
                      </p>
                      <button
                        onClick={async () => {
                          const u = await signInGoogle();
                          if (!u) setErr("No se pudo iniciar sesión con Google.");
                        }}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-apre-blue px-5 py-3 font-bold text-white transition hover:bg-apre-blue-light shadow-sm"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Identificarme con Google</span>
                      </button>
                      <p className="text-[11px] text-gray-500">
                        Tu correo de Google será tu identificador seguro en la plataforma.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-center justify-between">
                      <span>
                        ✅ Correo verificado: <strong>{user.email}</strong>
                      </span>
                      <button
                        onClick={async () => {
                          const auth = getFirebaseAuth();
                          if (auth) await import("firebase/auth").then(({ signOut }) => signOut(auth));
                        }}
                        className="text-xs font-bold text-apre-red hover:underline ml-2"
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
                            RUT Oficial *
                          </label>
                          <input
                            type="text"
                            value={form.rut}
                            onChange={handleRutChange}
                            placeholder="12.345.678-9"
                            maxLength={12}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
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
                          Curso Deseado *
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
                          placeholder="Indica información adicional, empresa o faena de seguridad..."
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
                        className="w-full rounded-xl bg-apre-red py-3 text-sm font-extrabold text-white transition hover:bg-apre-red-dark shadow-sm disabled:opacity-50 cursor-pointer"
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
        </div>
      </div>
    </section>
  );
}
