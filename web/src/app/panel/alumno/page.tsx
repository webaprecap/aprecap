"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { CONTACTO } from "@/data/site";
import ConsentModal from "@/components/ConsentModal";
import PrivacidadPanel from "@/components/PrivacidadPanel";
import { canAccessCourse, getCourseFieldKey, getCourseStatus, CURSOS_LISTA } from "@/lib/courseAccess";

interface Enroll {
  id: string;
  uid: string;
  courseSlug?: string;
  modulosCompletados?: string[];
  fecha?: unknown;
}

interface Clase {
  id: string;
  nombre?: string;
  descripcion?: string;
  cursoSlug?: string;
  joinUrl?: string;
  estado?: string;
  fechaInicio?: unknown;
}

interface HistorialNota {
  id: string;
  moduloNombre: string;
  porcentaje: number;
  correctas: number;
  total: number;
  aprobado: boolean;
  courseSlug?: string;
  fecha?: { toDate?: () => Date };
}

export default function PanelAlumno() {
  const { userData, loading, signOut, user } = useAuth();
  const router = useRouter();
  const [enrolls, setEnrolls] = useState<Enroll[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);
  const [historial, setHistorial] = useState<HistorialNota[]>([]);
  const [aviso, setAviso] = useState<Clase | null>(null);
  const [showModalSolicitud, setShowModalSolicitud] = useState(false);
  const [cursoSolicitadoNombre, setCursoSolicitadoNombre] = useState("");
  const [solicitandoCurso, setSolicitandoCurso] = useState<string | null>(null);

  const avisados = useRef<Set<string>>(new Set());

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (!loading && (!userData || userData.rol !== "alumno")) {
      router.push("/login");
    }
  }, [userData, loading, router]);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !userData) return;
    const q = query(collection(db, "enrollments"), where("uid", "==", userData.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Enroll)));
    });
    return unsub;
  }, [userData]);

  // Cargar Historial de Notas desde Firestore
  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user) return;
    const q = query(collection(db, "resultados_evaluaciones"), where("userId", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as HistorialNota));
      setHistorial(items);
    });
    return unsub;
  }, [user]);

  // Filtro estricto de clases en vivo: Solo se muestran si el alumno tiene acceso al curso de la clase
  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !userData) return;
    const q = query(collection(db, "clases"), where("estado", "==", "activa"));
    const unsub = onSnapshot(q, (snap) => {
      const activas = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Clase))
        .filter((c) => {
          if (!c.cursoSlug) return true;
          return canAccessCourse(userData, c.cursoSlug, enrolls);
        });
      setClases(activas);
      const nuevas = activas.filter((c) => !avisados.current.has(c.id));
      if (nuevas.length > 0) {
        for (const c of nuevas) avisados.current.add(c.id);
        setAviso(nuevas[0]);
      }
    });
    return unsub;
  }, [userData, enrolls]);

  const solicitarAccesoCurso = async (fieldKey: string, nombreCurso: string) => {
    if (!user) return;
    setSolicitandoCurso(fieldKey);
    try {
      const db = getFirestoreDb();
      if (db) {
        const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, {
          [fieldKey]: "pendiente",
        });
        setCursoSolicitadoNombre(nombreCurso);
        setShowModalSolicitud(true);
      }
    } catch (err) {
      console.error("Error solicitando acceso:", err);
      alert("Hubo un error enviando la solicitud. Intenta nuevamente.");
    } finally {
      setSolicitandoCurso(null);
    }
  };

  if (loading || !userData) return <p className="p-8 text-center text-gray-500">Cargando portal del alumno…</p>;

  const promedioGeneral =
    historial.length > 0
      ? Math.round(historial.reduce((acc, curr) => acc + curr.porcentaje, 0) / historial.length)
      : 0;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-apre-blue text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>🛡️</span> Portal del Estudiante APRECAP
            </div>
            <h1 className="mt-3 text-3xl font-extrabold">
              ¡Hola, {userData.nombre.split(" ")[0]}! 👋
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Bienvenido a tu aula virtual. Accede a tus clases en vivo, material PPT, evaluaciones y solicitudes de cursos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={CONTACTO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-whatsapp px-4 py-2.5 text-xs font-bold text-white transition hover:brightness-110 shadow-md"
            >
              💬 WhatsApp Soporte
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 shadow-xs"
            >
              <span>🚪</span>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          {/* Quick Action Feature Grid (Estilo SARMAT) */}
          <div>
            <h2 className="text-xl font-extrabold text-apre-blue mb-4">
              📌 Herramientas Principales
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Clases en Vivo */}
              <div
                className={`relative rounded-2xl border p-6 transition-all shadow-sm ${
                  clases.length > 0
                    ? "border-2 border-whatsapp bg-white"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {clases.length > 0 && (
                  <span className="absolute -top-3 right-4 animate-pulse rounded-full bg-whatsapp px-3 py-0.5 text-xs font-bold text-white shadow-md">
                    🔴 EN VIVO
                  </span>
                )}
                <div className="text-3xl mb-2">📹</div>
                <h3 className="font-extrabold text-apre-blue text-lg">Clases en Vivo (Zoom)</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {clases.length > 0
                    ? `${clases.length} clase disponible para unirte`
                    : "Reuniones virtuales y webinars en directo"}
                </p>
                {clases.length > 0 ? (
                  <Link
                    href={`/aula-en-vivo?id=${clases[0].id}`}
                    className="mt-4 block rounded-xl bg-whatsapp py-2.5 text-center text-xs font-black text-white transition hover:brightness-105 shadow-sm"
                  >
                    🚀 Entrar al Aula Virtual en Vivo
                  </Link>
                ) : (
                  <span className="mt-4 inline-block text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
                    Sin clases activas ahora
                  </span>
                )}
              </div>

              {/* Card 2: Materiales PPT */}
              <Link href="/materiales/guardia-de-seguridad" className="group">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all shadow-sm group-hover:border-apre-red group-hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">📊</div>
                    <span className="rounded-full bg-apre-red/10 px-2.5 py-0.5 text-xs font-bold text-apre-red">
                      PPT INTERACTIVO
                    </span>
                  </div>
                  <h3 className="mt-2 font-extrabold text-apre-blue text-lg group-hover:text-apre-red transition">
                    Materiales de Estudio
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Presentaciones en diapositivas con imágenes HD y manuales en PDF.
                  </p>
                  <span className="mt-4 inline-flex items-center text-xs font-bold text-apre-red group-hover:underline">
                    Ver presentaciones PPT →
                  </span>
                </div>
              </Link>

              {/* Card 3: Evaluaciones en Linea */}
              <Link href="/evaluaciones" className="group">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all shadow-sm group-hover:border-cyan-500 group-hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">📝</div>
                    <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-600 border border-cyan-200">
                      CUESTIONARIOS
                    </span>
                  </div>
                  <h3 className="mt-2 font-extrabold text-apre-blue text-lg group-hover:text-cyan-600 transition">
                    Evaluaciones en Línea
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Rinde tus pruebas de módulo con corrección inmediata.
                  </p>
                  <span className="mt-4 inline-flex items-center text-xs font-bold text-cyan-600 group-hover:underline">
                    Rendir examen ahora →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* SECCIÓN DE CURSOS INDIVIDUALES (ESTILO SARMAT: CADA CURSO CON SU ACCESO O SOLICITUD) */}
          <div>
            <h2 className="text-xl font-extrabold text-apre-blue mb-4">
              📚 Catálogo de Cursos y Accesos Acreditados
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {CURSOS_LISTA.map((c) => {
                const status = getCourseStatus(userData, c.slug, enrolls);
                const isDesbloqueado = status === "desbloqueado";
                const isPendiente = status === "pendiente";
                const isRechazado = status === "rechazado";

                return (
                  <div
                    key={c.slug}
                    className={`rounded-2xl bg-white p-6 shadow-sm relative flex flex-col justify-between transition-all ${
                      isDesbloqueado
                        ? "border-2 border-emerald-500 shadow-md"
                        : isPendiente
                        ? "border-2 border-amber-400/60 bg-amber-50/20"
                        : isRechazado
                        ? "border-2 border-red-300 bg-red-50/20"
                        : "border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute -top-3 right-4 rounded-full px-3 py-0.5 text-xs font-bold shadow-xs ${
                        isDesbloqueado
                          ? "bg-emerald-500 text-white"
                          : isPendiente
                          ? "bg-amber-500 text-white"
                          : isRechazado
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isDesbloqueado
                        ? "DESBLOQUEADO ✓"
                        : isPendiente
                        ? "EN REVISIÓN ⏳"
                        : isRechazado
                        ? "NO APROBADO ❌"
                        : "BLOQUEADO 🔒"}
                    </span>

                    <div>
                      <div className="text-3xl mb-2">{c.icono}</div>
                      <h3 className="font-extrabold text-apre-blue text-lg">{c.nombre}</h3>
                      <p className="mt-1 text-xs text-gray-600">
                        Duración: {c.horas} horas pedagógicas con certificación oficial.
                      </p>
                      {!isDesbloqueado && (
                        <p className="mt-2 text-xs font-semibold text-gray-500">
                          {isPendiente
                            ? "⏳ Solicitud enviada a la administración. En breve se habilitará tu ingreso."
                            : isRechazado
                            ? "🚫 Solicitud de curso no aprobada. Contáctanos si requieres ayuda."
                            : "🔒 Requiere autorización o matrícula previa para ingresar al aula."}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 space-y-2">
                      {isDesbloqueado ? (
                        <>
                          <Link
                            href={`/materiales/${c.slug}`}
                            className="block w-full rounded-xl bg-emerald-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-emerald-600 shadow-sm"
                          >
                            🚀 ENTRAR AL CURSO {c.shortName.toUpperCase()}
                          </Link>
                          {c.slug === "guardia-de-seguridad" && (
                            <Link
                              href="/cuestionarios/guardia-de-seguridad"
                              className="block w-full rounded-xl bg-apre-red py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-apre-red-dark shadow-sm"
                            >
                              📋 CUESTIONARIOS OFICIALES OS-10
                            </Link>
                          )}
                        </>
                      ) : isPendiente ? (
                        <button
                          disabled
                          className="w-full rounded-xl bg-amber-500/30 text-amber-900 py-3 text-center text-xs font-bold cursor-not-allowed"
                        >
                          ⏳ Solicitud en Revisión por Administración
                        </button>
                      ) : isRechazado ? (
                        <a
                          href={CONTACTO.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full rounded-xl bg-apre-blue py-3 text-center text-xs font-bold text-white transition hover:bg-apre-blue/90"
                        >
                          💬 Contactar Administración
                        </a>
                      ) : (
                        <button
                          onClick={() => solicitarAccesoCurso(c.fieldKey, c.nombre)}
                          disabled={solicitandoCurso === c.fieldKey}
                          className="w-full rounded-xl bg-apre-blue py-3 text-center text-xs font-extrabold text-white transition hover:bg-apre-blue/90 shadow-sm disabled:opacity-50"
                        >
                          {solicitandoCurso === c.fieldKey ? "Enviando…" : "🔒 Solicitar Acceso al Curso"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificados y Diplomas Oficiales */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-blue">
                  <span>📜</span> Certificación Oficial APRECAP
                </div>
                <h2 className="mt-2 text-xl font-extrabold text-apre-blue">
                  Emisión de Diplomas y Certificados
                </h2>
                <div className="mt-2 space-y-2 text-xs text-gray-600 leading-relaxed">
                  <p>
                    • <strong>Cursos Presenciales (Guardia OS-10 y Bastón y Esposas):</strong> Tu Certificado Oficial y Credencial son emitidos y entregados directamente por APRECAP de forma presencial una vez completadas tus horas de capacitación práctica y evaluaciones ante la autoridad fiscalizadora.
                  </p>
                  <p>
                    • <strong>Cursos Online (CCTV y Alarmas / Supervisor de Seguridad):</strong> Los diplomas con firmas acreditadas, RUT y código QR institucional se emiten tras aprobar la evaluación final en el aula virtual.
                  </p>
                </div>
                <p className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  📍 Para retirar tu certificado físico o coordinar tu entrega presencial, acércate a{" "}
                  <strong>{CONTACTO.direccion}</strong> ({CONTACTO.metro}) en horario de {CONTACTO.horario} o contáctanos por WhatsApp.
                </p>
              </div>
              <a
                href={`${CONTACTO.whatsappLink}?text=${encodeURIComponent(
                  "Hola APRECAP, quisiera consultar sobre la emisión y retiro de mi Certificado Oficial de curso."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-whatsapp px-5 py-3 text-xs font-extrabold text-white transition hover:brightness-105 shadow-sm inline-flex items-center gap-2"
              >
                <span>💬</span>
                <span>Consultar por mi Certificado</span>
              </a>
            </div>
          </div>

          {/* Historial de Notas & Calificaciones */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-apre-blue">🎓 Mis Calificaciones e Historial</h2>
                <p className="text-xs text-gray-500">Registro oficial de tus evaluaciones rendidas</p>
              </div>
              {historial.length > 0 && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-right">
                  <span className="text-xs text-emerald-700 font-semibold">Promedio General</span>
                  <p className="text-lg font-black text-emerald-700">{promedioGeneral}%</p>
                </div>
              )}
            </div>

            {historial.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center">
                <p className="text-xs text-gray-500">
                  Aún no has rendido ninguna evaluación. ¡Entra a la sección de Evaluaciones para comenzar!
                </p>
                <Link
                  href="/evaluaciones"
                  className="mt-3 inline-block rounded-xl bg-apre-blue px-4 py-2 text-xs font-bold text-white"
                >
                  Ir a Evaluaciones
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Módulo</th>
                      <th className="p-3">Puntaje</th>
                      <th className="p-3">Porcentaje</th>
                      <th className="p-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {historial.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50/80">
                        <td className="p-3 font-extrabold text-apre-blue">{h.moduloNombre}</td>
                        <td className="p-3">
                          {h.correctas} / {h.total} correctas
                        </td>
                        <td className="p-3 font-bold">{h.porcentaje}%</td>
                        <td className="p-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              h.aprobado
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {h.aprobado ? "APROBADO" : "REPROBADO"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Barra de sesión y salida del estudiante */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <p className="text-sm font-bold text-apre-blue">Sesión de Estudiante Activa</p>
              <p className="text-xs text-gray-500">{userData.nombre} ({userData.email})</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 hover:border-red-300 shadow-xs"
            >
              <span>🚪</span>
              <span>Cerrar sesión</span>
            </button>
          </div>

          {/* Privacidad & Cumplimiento Ley 21.719 */}
          <PrivacidadPanel />
        </div>
      </section>
      <ConsentModal />

      {/* MODAL DE CONFIRMACIÓN DE SOLICITUD DE CURSO (ESTILO SARMAT) */}
      {showModalSolicitud && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 p-6 text-center shadow-2xl border border-cyan-500/30 text-white">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-extrabold text-cyan-400">¡Solicitud Enviada!</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Hola <strong>{userData?.nombre.split(" ")[0]}</strong>, hemos recibido tu solicitud de permiso para acceder al <strong>{cursoSolicitadoNombre}</strong>.
              <br /><br />
              La administración de APRECAP revisará tu cuenta para habilitarte el curso a la brevedad.
            </p>
            <button
              onClick={() => {
                setShowModalSolicitud(false);
                window.location.reload();
              }}
              className="mt-6 w-full rounded-xl bg-cyan-500 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-cyan-400 shadow-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal Emergente Alerta de Clase en Vivo (Zoom) */}
      {aviso && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl border border-whatsapp/30">
            <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-whatsapp px-4 py-1.5 text-xs font-extrabold text-white">
              🔴 ¡Tu clase en vivo está disponible!
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-apre-blue">{aviso.nombre}</h3>
            {aviso.descripcion && <p className="mt-2 text-xs text-gray-600">{aviso.descripcion}</p>}
            <div className="mt-6 grid gap-2">
              <Link
                href={`/aula-en-vivo?id=${aviso.id}`}
                onClick={() => setAviso(null)}
                className="rounded-xl bg-whatsapp px-4 py-3 text-center text-sm font-black text-white hover:brightness-95 shadow-md"
              >
                🚀 Entrar al Aula Virtual en Vivo
              </Link>
              <button
                onClick={() => setAviso(null)}
                className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200"
              >
                Cerrar aviso
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
