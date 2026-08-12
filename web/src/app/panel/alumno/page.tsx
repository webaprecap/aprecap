"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { cursosMoodle } from "@/data/moodle";
import { cursosLP } from "@/data/cursos";
import { CONTACTO } from "@/data/site";
import ConsentModal from "@/components/ConsentModal";
import PrivacidadPanel from "@/components/PrivacidadPanel";

interface Enroll {
  id: string;
  uid: string;
  courseSlug?: string;
  moodleCourseId?: number;
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

  const cursosDeAlumno = enrolls.map((e) => e.courseSlug);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) return;
    const q = query(collection(db, "clases"), where("estado", "==", "activa"));
    const unsub = onSnapshot(q, (snap) => {
      const activas = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Clase))
        .filter((c) => !c.cursoSlug || cursosDeAlumno.includes(c.cursoSlug));
      setClases(activas);
      const nuevas = activas.filter((c) => !avisados.current.has(c.id));
      if (nuevas.length > 0) {
        for (const c of nuevas) avisados.current.add(c.id);
        setAviso(nuevas[0]);
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrolls.length > 0, cursosDeAlumno.join(",")]);

  const solicitarAccesoCurso = async (fieldKey: string, nombreCurso: string) => {
    if (!user) return;
    setSolicitandoCurso(fieldKey);
    try {
      const db = getFirestoreDb();
      if (db) {
        const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, {
          [fieldKey]: "pendiente"
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
              onClick={() => signOut()}
              className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
            >
              Cerrar sesión
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
                  <a
                    href={clases[0].joinUrl || "https://aprecap.cl/campus"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-xl bg-whatsapp py-2.5 text-center text-xs font-bold text-white transition hover:brightness-105 shadow-sm"
                  >
                    🚀 Unirse a la Clase en Vivo
                  </a>
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

          {/* SECCIÓN DE CURSOS INDIVIDUALES (ESTILO SARMAT: OS10 DESBLOQUEADO, OTROS BLOQUEADOS CON SOLICITUD) */}
          <div>
            <h2 className="text-xl font-extrabold text-apre-blue mb-4">
              📚 Catálogo de Cursos y Accesos Acreditados
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* CURSO 1: GUARDIA OS-10 (DESBLOQUEADO PARA TODOS) */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-6 shadow-md relative flex flex-col justify-between">
                <span className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                  DESBLOQUEADO ✓
                </span>
                <div>
                  <div className="text-3xl mb-2">🛡️</div>
                  <h3 className="font-extrabold text-apre-blue text-lg">Curso Guardia de Seguridad (OS-10)</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Formación y Reacreditación oficial de 90h/36h normada por Carabineros de Chile. 8 Módulos de estudio.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/materiales/guardia-de-seguridad"
                    className="block w-full rounded-xl bg-emerald-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-emerald-600 shadow-sm"
                  >
                    ENTRAR AL CURSO OS-10
                  </Link>
                </div>
              </div>

              {/* CURSO 2: OPERADOR CCTV Y ALARMAS */}
              <div className="rounded-2xl border border-cyan-500/40 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl mb-2">📹</div>
                    <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">DESBLOQUEADO ✓</span>
                  </div>
                  <h3 className="font-extrabold text-apre-blue text-lg">Curso Operador CCTV y Alarmas</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Capacitación en monitoreo de videovigilancia IP, cámaras PTZ y sensores de intrusión (3 Módulos).
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/materiales/operador-cctv-y-alarmas"
                    className="block w-full rounded-xl bg-cyan-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-cyan-600 shadow-sm"
                  >
                    ENTRAR AL CURSO CCTV
                  </Link>
                </div>
              </div>

              {/* CURSO 3: SUPERVISOR DE SEGURIDAD */}
              <div className="rounded-2xl border border-cyan-500/40 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl mb-2">⭐</div>
                    <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">DESBLOQUEADO ✓</span>
                  </div>
                  <h3 className="font-extrabold text-apre-blue text-lg">Curso Supervisor de Seguridad</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Liderazgo operativo, supervisión de guardias, estudios de seguridad y gestión de crisis (5 Módulos).
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/materiales/supervisor-de-seguridad"
                    className="block w-full rounded-xl bg-cyan-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-cyan-600 shadow-sm"
                  >
                    ENTRAR AL CURSO SUPERVISOR
                  </Link>
                </div>
              </div>

              {/* CURSO 4: JEFE DE SEGURIDAD PRIVADA */}
              <div className="rounded-2xl border border-cyan-500/40 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl mb-2">👔</div>
                    <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">DESBLOQUEADO ✓</span>
                  </div>
                  <h3 className="font-extrabold text-apre-blue text-lg">Curso Jefe de Seguridad Privada</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Dirección estratégica de sistemas de seguridad, ciberseguridad y planificación (8 Módulos).
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/materiales/jefe-de-seguridad-privada"
                    className="block w-full rounded-xl bg-cyan-500 py-3 text-center text-xs font-extrabold text-white transition hover:bg-cyan-600 shadow-sm"
                  >
                    ENTRAR AL CURSO JEFE
                  </Link>
                </div>
              </div>
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
              <a
                href={aviso.joinUrl || "https://aprecap.cl/campus"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAviso(null)}
                className="rounded-xl bg-whatsapp px-4 py-3 text-center text-sm font-bold text-white hover:brightness-95 shadow-md"
              >
                🚀 Unirme a la clase ahora
              </a>
              <button
                onClick={() => setAviso(null)}
                className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
