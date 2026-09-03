"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { formatRut, validateRut } from "@/lib/rut";
import {
  CURSOS_LISTA,
  CURSOS_SEGURIDAD,
  CURSOS_OTEC,
  getCourseFieldKey,
} from "@/lib/courseAccess";

const SOLICITUD_VERSION = "v1.2-MultiCurso-SalaEspera";

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
    mensaje: "",
  });

  const [cursosSeleccionados, setCursosSeleccionados] = useState<string[]>(() => {
    if (cursoParam && CURSOS_LISTA.some((c) => c.slug === cursoParam)) {
      return [cursoParam];
    }
    return ["guardia-de-seguridad"];
  });

  const [consentimientoDatos, setConsentimientoDatos] = useState(false);
  const [consentimientoPromo, setConsentimientoPromo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [categoriaTab, setCategoriaTab] = useState<"todos" | "seguridad" | "otec">("todos");

  // Preseleccionar curso de la URL si se entrega
  useEffect(() => {
    if (cursoParam && CURSOS_LISTA.some((c) => c.slug === cursoParam)) {
      setCursosSeleccionados((prev) =>
        prev.includes(cursoParam) ? prev : [...prev, cursoParam]
      );
    }
  }, [cursoParam]);

  // Si ya hay usuario autenticado, redirigir admin o profesor, o autocompletar si es alumno
  useEffect(() => {
    if (!loading && userData) {
      if (userData.rol === "admin" || userData.rol === "superadmin") {
        router.push("/panel/admin");
      } else if (userData.rol === "profesor") {
        router.push("/panel/profesor");
      } else if (userData.rol === "alumno") {
        const partes = (userData.nombre || "").trim().split(" ");
        const uAny = userData as any;
        setForm((prev) => ({
          ...prev,
          nombres: prev.nombres || partes[0] || "",
          apellidoPaterno: prev.apellidoPaterno || partes[1] || "",
          apellidoMaterno: prev.apellidoMaterno || partes.slice(2).join(" ") || "",
          rut: prev.rut || (typeof uAny.rut === "string" ? uAny.rut : "") || "",
          telefono: prev.telefono || (typeof uAny.telefono === "string" ? uAny.telefono : "") || "",
        }));
      }
    }
  }, [userData, loading, router]);

  // Redirección automática a la sala de espera al enviar con éxito
  useEffect(() => {
    if (ok) {
      const timer = setTimeout(() => {
        router.push("/panel/alumno");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [ok, router]);

  const toggleCurso = (slug: string) => {
    setErr("");
    setCursosSeleccionados((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const seleccionarTodosSeguridad = () => {
    const slugsSeg = CURSOS_SEGURIDAD.map((c) => c.slug);
    setCursosSeleccionados((prev) => Array.from(new Set([...prev, ...slugsSeg])));
  };

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

    if (!form.nombres.trim() || form.nombres.trim().length < 2) {
      setErr("El campo 'Nombres' es obligatorio (mínimo 2 caracteres).");
      return;
    }
    if (!form.apellidoPaterno.trim() || form.apellidoPaterno.trim().length < 2) {
      setErr("El campo 'Apellido Paterno' es obligatorio (mínimo 2 caracteres).");
      return;
    }
    if (!form.apellidoMaterno.trim() || form.apellidoMaterno.trim().length < 2) {
      setErr("El campo 'Apellido Materno' es obligatorio (mínimo 2 caracteres).");
      return;
    }
    if (!form.rut.trim()) {
      setErr("El 'RUT Oficial' es obligatorio.");
      return;
    }
    if (!validateRut(form.rut)) {
      setErr("El RUT ingresado no es válido. Verifica el número y dígito verificador (ej: 12.345.678-9).");
      return;
    }
    const telLimpio = form.telefono.replace(/\D/g, "");
    if (!form.telefono.trim() || telLimpio.length < 8) {
      setErr("El 'Teléfono / WhatsApp' es obligatorio (mínimo 8 dígitos numéricos).");
      return;
    }

    // Validación OBLIGATORIA de selección de cursos (mínimo 1)
    if (cursosSeleccionados.length === 0) {
      setErr("Debes seleccionar al menos un curso obligatorio para realizar tu matrícula.");
      return;
    }

    if (!consentimientoDatos) {
      setErr("Debes aceptar el consentimiento de datos personales (Ley 19.628 y Ley 21.719) para la acreditación oficial ante Carabineros OS-10 y SENCE.");
      return;
    }

    const db = getFirestoreDb();
    if (!db) return;

    setEnviando(true);
    try {
      const uid = user.uid;
      const nombreCompleto = [
        form.nombres.trim(),
        form.apellidoPaterno.trim(),
        form.apellidoMaterno.trim(),
      ]
        .filter(Boolean)
        .join(" ")
        .trim();

      // 1. Guardar o actualizar datos de usuario en usuarios/{uid} para habilitar su acceso al panel
      const updateUserData: Record<string, any> = {
        uid,
        email: user.email,
        nombre: nombreCompleto,
        nombres: form.nombres.trim(),
        apellidoPaterno: form.apellidoPaterno.trim(),
        apellidoMaterno: form.apellidoMaterno.trim(),
        rut: form.rut.trim(),
        telefono: form.telefono.trim(),
        rol: form.tipoSolicitud || "alumno",
        activo: true,
        cursoDeseado: cursosSeleccionados[0],
        cursosDeseados: cursosSeleccionados,
        fechaRegistro: serverTimestamp(),
      };

      // Marcamos cada curso seleccionado en estado 'pendiente' (sala de espera)
      for (const slug of cursosSeleccionados) {
        const fieldKey = getCourseFieldKey(slug);
        updateUserData[fieldKey] = "pendiente";
      }

      await setDoc(doc(db, "usuarios", uid), updateUserData, { merge: true });

      // 2. Registrar en la colección 'solicitudes' para cada curso seleccionado
      for (const slug of cursosSeleccionados) {
        const q = query(
          collection(db, "solicitudes"),
          where("email", "==", user.email),
          where("cursoDeseado", "==", slug),
          where("estado", "==", "pendiente")
        );
        const dup = await getDocs(q);
        if (dup.empty) {
          await addDoc(collection(db, "solicitudes"), {
            uid,
            email: user.email,
            nombres: form.nombres.trim(),
            apellidoPaterno: form.apellidoPaterno.trim(),
            apellidoMaterno: form.apellidoMaterno.trim(),
            rut: form.rut.trim(),
            telefono: form.telefono.trim(),
            tipoSolicitud: form.tipoSolicitud,
            cursoDeseado: slug,
            cursosDeseados: cursosSeleccionados,
            mensaje: form.mensaje.trim(),
            estado: "pendiente",
            fechaSolicitud: serverTimestamp(),
            consentimientoDatos: {
              aceptado: consentimientoDatos,
              fecha: new Date().toISOString(),
              version: SOLICITUD_VERSION,
              userAgent: navigator.userAgent,
              finalidad:
                "Certificación académica oficial y acreditación ante Carabineros OS-10, SPD y SENCE",
            },
            consentimientoPromo: {
              aceptado: consentimientoPromo,
              fecha: new Date().toISOString(),
              version: "v1.0",
            },
          });
        }
      }

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
            Formulario de Matrícula y Acceso a Cursos
          </h1>
          <p className="mt-1 text-sm text-gray-600 max-w-2xl">
            Selecciona el curso o cursos que deseas cursar y completa tus datos oficiales para ingresar de inmediato a la <strong>sala de espera</strong> de tu aula virtual.
          </p>
        </div>

        {/* Grid de 2 Columnas: Video Tutorial + Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Video Tutorial en Marco APRECAP + Ayuda Gmail */}
          <div className="lg:col-span-5 space-y-6">
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
                Este video te guía paso a paso en el proceso de autenticación con Google y cómo solicitar tu matrícula en los cursos de seguridad privada y capacitación laboral.
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
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-apre-blue">
                Inscripción Oficial de Cursos
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Elige uno o más cursos y completa tus datos oficiales para ser acreditado.
              </p>

              {ok ? (
                <div className="mt-6 rounded-3xl bg-linear-to-b from-emerald-50 via-white to-emerald-50/50 border-2 border-emerald-400 p-8 text-emerald-950 text-center shadow-lg space-y-4">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-emerald-500 text-white text-3xl shadow-md animate-bounce">
                    🎉
                  </div>
                  <h3 className="font-black text-2xl text-apre-blue">
                    ¡Matrícula Registrada con Éxito!
                  </h3>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1.5 text-xs font-black uppercase tracking-wider">
                    <span>⏳</span> Asignado a la Sala de Espera Oficial
                  </div>
                  <p className="text-xs text-gray-700 max-w-lg mx-auto leading-relaxed">
                    Hemos registrado tu solicitud para <strong>{cursosSeleccionados.length} {cursosSeleccionados.length === 1 ? "curso" : "cursos"}</strong>. Tu cuenta ha quedado habilitada y te estamos dirigiendo directamente a la <strong>Sala de Espera</strong> de tus cursos en tu Aula Virtual.
                  </p>

                  <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-2xs max-w-md mx-auto text-left space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                      Cursos en Sala de Espera (Revisión Admin):
                    </p>
                    {cursosSeleccionados.map((slug) => {
                      const c = CURSOS_LISTA.find((x) => x.slug === slug);
                      return (
                        <div
                          key={slug}
                          className="flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                        >
                          <span className="flex items-center gap-2">
                            <span>{c?.icono || "📚"}</span>
                            <span>{c?.nombre || slug}</span>
                          </span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                            En Espera
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => router.push("/panel/alumno")}
                      className="inline-flex items-center gap-2 rounded-2xl bg-apre-blue hover:bg-apre-blue-light px-8 py-3.5 text-sm font-black text-white transition shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>🚀</span>
                      <span>Entrar a mi Sala de Espera / Aula Virtual</span>
                    </button>
                    <p className="text-[11px] text-gray-400 mt-2">
                      Redirigiendo automáticamente en unos segundos…
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
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
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-apre-blue px-5 py-3 font-bold text-white transition hover:bg-apre-blue-light shadow-sm cursor-pointer"
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
                        className="text-xs font-bold text-apre-red hover:underline ml-2 cursor-pointer"
                      >
                        Cambiar
                      </button>
                    </div>
                  )}

                  {user && (
                    <>
                      {/* SELECCIÓN OBLIGATORIA DE CURSOS (MÍNIMO 1) */}
                      <div className="rounded-2xl border-2 border-apre-blue/30 bg-blue-50/40 p-4 sm:p-5 space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200/60 pb-2.5">
                          <div>
                            <label className="text-xs font-black uppercase tracking-wider text-apre-blue flex items-center gap-1.5">
                              <span>📚</span> ¿Qué cursos deseas cursar? *
                            </label>
                            <p className="text-[11px] text-gray-600 mt-0.5">
                              Debes seleccionar <strong>uno o más cursos (mínimo 1)</strong> para matricularte.
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider border ${
                              cursosSeleccionados.length > 0
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : "bg-red-100 text-red-800 border-red-300 animate-pulse"
                            }`}
                          >
                            {cursosSeleccionados.length === 0
                              ? "⚠️ 0 cursos (Elige mínimo 1)"
                              : `✓ ${cursosSeleccionados.length} ${
                                  cursosSeleccionados.length === 1
                                    ? "curso elegido"
                                    : "cursos elegidos"
                                }`}
                          </span>
                        </div>

                        {/* Filtro rápido de categorías */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setCategoriaTab("todos")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                              categoriaTab === "todos"
                                ? "bg-apre-blue text-white shadow-xs"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            Todos ({CURSOS_LISTA.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setCategoriaTab("seguridad")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                              categoriaTab === "seguridad"
                                ? "bg-apre-blue text-white shadow-xs"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            🛡️ Seguridad Privada ({CURSOS_SEGURIDAD.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setCategoriaTab("otec")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                              categoriaTab === "otec"
                                ? "bg-apre-blue text-white shadow-xs"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            💼 Cursos OTEC ({CURSOS_OTEC.length})
                          </button>
                        </div>

                        {/* 1. SECCIÓN: SEGURIDAD PRIVADA */}
                        {(categoriaTab === "todos" || categoriaTab === "seguridad") && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                                🛡️ Cursos de Seguridad Privada (OS-10 / SPD / Acreditados)
                              </p>
                              <button
                                type="button"
                                onClick={seleccionarTodosSeguridad}
                                className="text-[11px] font-bold text-apre-blue hover:underline cursor-pointer"
                              >
                                Seleccionar todos seguridad
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {CURSOS_SEGURIDAD.map((c) => {
                                const selected = cursosSeleccionados.includes(c.slug);
                                return (
                                  <button
                                    key={c.slug}
                                    type="button"
                                    onClick={() => toggleCurso(c.slug)}
                                    className={`flex items-center justify-between gap-2.5 rounded-2xl p-3 text-left transition border cursor-pointer ${
                                      selected
                                        ? "border-apre-blue bg-white shadow-sm ring-2 ring-apre-blue/30"
                                        : "border-gray-200 bg-white/80 hover:border-gray-300 hover:bg-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                                        {c.icono}
                                      </span>
                                      <div className="min-w-0">
                                        <p className="text-xs font-extrabold text-apre-blue truncate leading-tight">
                                          {c.nombre}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-semibold">
                                          {c.horas} Horas Acreditadas
                                        </p>
                                      </div>
                                    </div>
                                    <span
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-xs font-black transition ${
                                        selected
                                          ? "bg-apre-blue text-white"
                                          : "border border-gray-300 bg-gray-50 text-transparent"
                                      }`}
                                    >
                                      ✓
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 2. SECCIÓN: CURSOS OTEC LABORAL */}
                        {(categoriaTab === "todos" || categoriaTab === "otec") && (
                          <div className="space-y-2 pt-1">
                            <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                              💼 Cursos de Capacitación Laboral OTEC
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {CURSOS_OTEC.map((c) => {
                                const selected = cursosSeleccionados.includes(c.slug);
                                return (
                                  <button
                                    key={c.slug}
                                    type="button"
                                    onClick={() => toggleCurso(c.slug)}
                                    className={`flex items-center justify-between gap-2.5 rounded-2xl p-3 text-left transition border cursor-pointer ${
                                      selected
                                        ? "border-apre-blue bg-white shadow-sm ring-2 ring-apre-blue/30"
                                        : "border-gray-200 bg-white/80 hover:border-gray-300 hover:bg-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                                        {c.icono}
                                      </span>
                                      <div className="min-w-0">
                                        <p className="text-xs font-extrabold text-apre-blue truncate leading-tight">
                                          {c.nombre}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-semibold">
                                          {c.horas} Horas
                                        </p>
                                      </div>
                                    </div>
                                    <span
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-xs font-black transition ${
                                        selected
                                          ? "bg-apre-blue text-white"
                                          : "border border-gray-300 bg-gray-50 text-transparent"
                                      }`}
                                    >
                                      ✓
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {cursosSeleccionados.length === 0 && (
                          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-bold text-red-700 text-center">
                            ⚠️ Por favor selecciona al menos un curso de la lista para continuar.
                          </div>
                        )}
                      </div>

                      {/* DATOS PERSONALES OBLIGATORIOS */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                          Nombres <span className="text-red-500">* (Obligatorio)</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.nombres}
                          onChange={set("nombres")}
                          placeholder="Ej: Juan Carlos"
                          className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                            Apellido Paterno <span className="text-red-500">* (Obligatorio)</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.apellidoPaterno}
                            onChange={set("apellidoPaterno")}
                            placeholder="Ej: González"
                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                            Apellido Materno <span className="text-red-500">* (Obligatorio)</span>
                          </label>
                          <input
                            type="text"
                            required
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
                            RUT Oficial <span className="text-red-500">* (Obligatorio)</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.rut}
                            onChange={handleRutChange}
                            placeholder="12.345.678-9"
                            maxLength={12}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
                            Teléfono / WhatsApp <span className="text-red-500">* (Obligatorio)</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={form.telefono}
                            onChange={set("telefono")}
                            placeholder="+56 9 1234 5678"
                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-apre-blue focus:outline-none font-bold"
                          />
                        </div>
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
                          Mensaje adicional o faena (opcional)
                        </label>
                        <textarea
                          value={form.mensaje}
                          onChange={set("mensaje")}
                          placeholder="Indica información adicional, faena minera, empresa o turno de seguridad..."
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
                        disabled={enviando || cursosSeleccionados.length === 0}
                        className="w-full rounded-xl bg-apre-red py-3.5 text-sm font-extrabold text-white transition hover:bg-apre-red-dark shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>🚀</span>
                        <span>
                          {enviando
                            ? "Registrando matrícula…"
                            : `Enviar Solicitud e Ingresar a Sala de Espera (${cursosSeleccionados.length} ${
                                cursosSeleccionados.length === 1 ? "curso" : "cursos"
                              })`}
                        </span>
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
