"use client";

import { Suspense, use, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { canAccessCourse, getCourseFieldKey, getCourseStatus } from "@/lib/courseAccess";
import CursoAccessGate from "@/components/CursoAccessGate";
import PPTSlideViewer from "@/components/PPTSlideViewer";
import VideoTracker from "@/components/cursos/VideoTracker";
import MiniQuiz from "@/components/cursos/MiniQuiz";
import { getBancoModulo } from "@/lib/questionBanks/os10";
import { getMiniQuizBancoCctv } from "@/lib/questionBanks/cctv";
import { getMiniQuizBancoBaston } from "@/lib/questionBanks/baston";
import { getMiniQuizBancoSupervisor } from "@/lib/questionBanks/supervisor";
import { materialesEstudio } from "@/data/materiales-estudio";

const PDFSwipeViewer = dynamic(() => import("@/components/cursos/PDFSwipeViewer"), {
  ssr: false,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

type PasoModulo = "video" | "pdf" | "quiz" | "completed";

const PASO_INICIAL: PasoModulo = "video";
const EMPTY_PROGRESS: number[] = [];

function leerProgresoLocal(slug: string): number[] {
  try {
    const raw = localStorage.getItem(`aprecap_progreso_${slug}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function guardarProgresoLocal(slug: string, modulos: number[]) {
  try {
    localStorage.setItem(`aprecap_progreso_${slug}`, JSON.stringify(modulos));
  } catch {
    /* localStorage no disponible */
  }
}

let progressCache: { key: string; value: number[] } | null = null;
const progressListeners = new Set<() => void>();
const emitProgress = () => progressListeners.forEach((l) => l());
const subscribeProgress = (cb: () => void) => {
  progressListeners.add(cb);
  return () => progressListeners.delete(cb);
};
const getProgressSnapshot = (key: string) => () => {
  if (!progressCache || progressCache.key !== key) {
    progressCache = { key, value: leerProgresoLocal(key) };
  }
  return progressCache.value;
};

function useStoredProgress(key: string) {
  const snapshot = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot(key),
    () => EMPTY_PROGRESS
  );
  const setProgress = (value: number[]) => {
    progressCache = { key, value };
    guardarProgresoLocal(key, value);
    emitProgress();
  };
  return [snapshot, setProgress] as const;
}

export default function CursoMaterialesPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <CursoMaterialesInner params={params} />
    </Suspense>
  );
}

function CursoMaterialesInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, userData, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<{ courseSlug?: string }[]>([]);
  const [solicitando, setSolicitando] = useState(false);

  const cursoActual = materialesEstudio.find((c) => c.slug === slug);

  const [expandedModuloIdx, setExpandedModuloIdx] = useState<number>(0);
  const [selectedSubModuloIdx, setSelectedSubModuloIdx] = useState<number>(0);
  const [paso, setPaso] = useState<PasoModulo>(PASO_INICIAL);
  const [completados, setCompletados] = useStoredProgress(slug);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user) return;
    const q = query(collection(db, "enrollments"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrollments(snap.docs.map((d) => ({ courseSlug: d.data().courseSlug })));
    });
    return unsub;
  }, [user]);

  const tieneQuiz =
    cursoActual?.banco === "os10" ||
    cursoActual?.banco === "cctv" ||
    cursoActual?.banco === "baston" ||
    cursoActual?.banco === "supervisor";

  const cambiarModulo = (idx: number) => {
    setExpandedModuloIdx(idx);
    setSelectedSubModuloIdx(0);
    setPaso(PASO_INICIAL);
  };

  const handleRequestAccess = async () => {
    if (!user) return;
    setSolicitando(true);
    try {
      const db = getFirestoreDb();
      if (db) {
        const fieldKey = getCourseFieldKey(slug);
        await updateDoc(doc(db, "usuarios", user.uid), {
          [fieldKey]: "pendiente",
        });
      }
    } catch (err) {
      console.error("Error solicitando acceso:", err);
    } finally {
      setSolicitando(false);
    }
  };

  if (!cursoActual) {
    notFound();
  }

  // Verificación de acceso
  const status = getCourseStatus(userData, slug, enrollments);
  const hasAccess = canAccessCourse(userData, slug, enrollments);

  if (!authLoading && !hasAccess) {
    return (
      <CursoAccessGate
        cursoTitulo={cursoActual.title}
        cursoSlug={slug}
        status={status}
        isNotLoggedIn={!user}
        solicitando={solicitando}
        onRequestAccess={handleRequestAccess}
      />
    );
  }

  const isAdmin = Boolean(
    userData?.rol === "admin" ||
    userData?.rol === "superadmin" ||
    userData?.rol === "profesor"
  );

  const moduloActual = cursoActual.modulos[expandedModuloIdx] || cursoActual.modulos[0];
  const hasSubModulos = Boolean(moduloActual.subModulos && moduloActual.subModulos.length > 0);

  const subModuloActual = hasSubModulos
    ? moduloActual.subModulos![selectedSubModuloIdx] || moduloActual.subModulos![0]
    : null;

  const slidesActuales = (subModuloActual ? subModuloActual.slides : moduloActual.slides) || [];
  const pdfDownloadUrl = subModuloActual?.pdfUrl || moduloActual.pdfUrl || cursoActual.pdfUrl;
  const videoUrlActivo = subModuloActual?.videoUrl || moduloActual.videoUrl;
  const pdfUrlActivo = subModuloActual?.pdfUrl || moduloActual.pdfUrl || cursoActual.pdfUrl;
  const tituloActivo = subModuloActual
    ? `${subModuloActual.codigo} ${subModuloActual.nombre}`
    : moduloActual.nombre;

  const bancoQuiz =
    cursoActual?.banco === "cctv"
      ? { alternativas: getMiniQuizBancoCctv(expandedModuloIdx) }
      : cursoActual?.banco === "baston"
        ? { alternativas: getMiniQuizBancoBaston(expandedModuloIdx) }
        : cursoActual?.banco === "supervisor"
          ? { alternativas: getMiniQuizBancoSupervisor(expandedModuloIdx) }
          : tieneQuiz
            ? getBancoModulo(expandedModuloIdx)
            : null;
  const esUltimoModulo = expandedModuloIdx >= cursoActual.modulos.length - 1;
  const modulosEvaluables = cursoActual.modulos.filter((m) => m.videoUrl);

  const manejarQuizAprobado = () => {
    const nuevos = completados.includes(expandedModuloIdx)
      ? completados
      : [...completados, expandedModuloIdx];
    setCompletados(nuevos);
    guardarProgresoLocal(slug, nuevos);
    setPaso("completed");
  };

  const volverHref =
    userData?.rol === "admin" || userData?.rol === "superadmin"
      ? "/panel/admin"
      : userData?.rol === "profesor"
        ? "/panel/profesor"
        : "/panel/alumno";

  const volverTexto =
    userData?.rol === "admin" || userData?.rol === "superadmin"
      ? "← Volver al Panel Admin"
      : userData?.rol === "profesor"
        ? "← Volver al Panel Profesor"
        : "← Volver a mi Panel";

  return (
    <>
      {/* Banner Especial de Modo Administrador / Auditoría */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-amber-500/20 border-b border-amber-400/40 px-4 py-2.5 text-center text-xs font-bold text-amber-200 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 font-black text-[10px] uppercase tracking-wider shadow-sm">
              👑 VISTA PREVIA ADMINISTRADOR
            </span>
            <span className="text-slate-200">
              Contenido <strong>100% desbloqueado</strong>. Puedes saltar libremente entre videos, diapositivas, manuales PDF y cuestionarios.
            </span>
          </div>
          <Link
            href={volverHref}
            className="rounded-lg bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-[11px] font-bold border border-white/20 transition"
          >
            {volverTexto}
          </Link>
        </div>
      )}

      {/* Header Banner */}
      <section className="bg-apre-blue text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>🛡️</span> Aula Virtual APRECAP
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">{cursoActual.title}</h1>
            <p className="mt-1 text-xs text-white/80">
              {cursoActual.categoria} · {cursoActual.modulos.length} Módulos desglosados en sub-unidades temáticas
            </p>
          </div>
          <Link
            href={volverHref}
            className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            {volverTexto}
          </Link>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section className="bg-slate-900 py-8 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12">
          {/* Sidebar Menu: Acordeón de Módulos y Sub-Módulos */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  MÓDULOS DE ESTUDIO
                </h2>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                  {cursoActual.modulos.length} Módulos
                </span>
              </div>

              <div className="space-y-3">
                {cursoActual.modulos.map((m, mIdx) => {
                  const isExpanded = mIdx === expandedModuloIdx;
                  const modSubModulos = m.subModulos || [];
                  const isCompletado = completados.includes(mIdx);

                  return (
                    <div key={mIdx} className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
                      {/* Modulo Parent Header */}
                      <button
                        onClick={() => {
                          cambiarModulo(mIdx);
                        }}
                        className={`w-full text-left p-3.5 text-xs font-bold transition flex items-center justify-between ${
                          isExpanded
                            ? "bg-cyan-500/20 text-cyan-300 border-b border-cyan-500/30"
                            : "text-slate-300 hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 pr-2">
                          <span className={`font-black text-xs ${isExpanded ? "text-cyan-400" : "text-slate-500"}`}>
                            {isCompletado ? "✓" : `#${mIdx + 1}`}
                          </span>
                          <span className="line-clamp-2">{m.nombre}</span>
                        </div>
                        <span className="text-xs text-slate-400">{isExpanded ? "▼" : "▶"}</span>
                      </button>

                      {/* Sub-modulos Children List */}
                      {isExpanded && modSubModulos.length > 0 && (
                        <div className="bg-slate-950/80 p-2 space-y-1 divide-y divide-slate-900">
                          {modSubModulos.map((sub, sIdx) => {
                            const isSubActive = sIdx === selectedSubModuloIdx;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setSelectedSubModuloIdx(sIdx);
                                  setPaso(PASO_INICIAL);
                                }}
                                className={`w-full text-left rounded-lg px-3 py-2 text-xs transition flex items-start gap-2 ${
                                  isSubActive
                                    ? "bg-apre-red text-white font-bold shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                                }`}
                              >
                                <span className={`font-mono text-[11px] shrink-0 font-bold ${isSubActive ? "text-white" : "text-cyan-400"}`}>
                                  {sub.codigo}
                                </span>
                                <span className="line-clamp-2 leading-tight">{sub.nombre}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {tieneQuiz && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Progreso del curso</span>
                    <span className="text-cyan-400">
                      {completados.length}/{modulosEvaluables.length}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-apre-red transition-all"
                      style={{ width: `${(completados.length / Math.max(1, modulosEvaluables.length)) * 100}%` }}
                    />
                  </div>
                  {cursoActual.banco === "cctv" ||
                  cursoActual.banco === "baston" ||
                  cursoActual.banco === "supervisor" ||
                  cursoActual.banco === "os10" ? (
                    <>
                      <Link
                        href={`/evaluaciones/${cursoActual.slug}`}
                        className="mt-3 block w-full rounded-xl py-2.5 text-center text-xs font-bold transition border bg-apre-red text-white border-apre-red shadow-md hover:bg-apre-red-dark"
                      >
                        {cursoActual.banco === "supervisor"
                          ? "📝 Examen Final Supervisor de Seguridad"
                          : cursoActual.banco === "os10"
                            ? "📝 Examen Final OS-10"
                            : cursoActual.banco === "baston"
                              ? "📝 Examen Final Bastón y Esposas"
                              : "📝 Examen Final CCTV"}
                      </Link>
                      {cursoActual.banco === "os10" && (
                        <Link
                          href={`/cuestionarios/${cursoActual.slug}`}
                          className="mt-2 block w-full rounded-xl py-2.5 text-center text-xs font-bold transition border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                        >
                          📋 Cuestionarios Oficiales
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/cuestionarios/${cursoActual.slug}`}
                      className="mt-3 block w-full rounded-xl py-2.5 text-center text-xs font-bold transition border bg-apre-red text-white border-apre-red shadow-md hover:bg-apre-red-dark"
                    >
                      📋 Cuestionarios Oficiales
                    </Link>
                  )}
                </div>
              )}
            </div>

            {pdfDownloadUrl && (
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center">
                <p className="text-xs font-extrabold text-cyan-400">Manual Oficial en PDF</p>
                <p className="mt-1 text-xs text-slate-400">Descarga la guía teórica para estudio offline.</p>
                <a
                  href={pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 shadow-md"
                >
                  📥 Descargar PDF Oficial
                </a>
              </div>
            )}
          </aside>

          {/* Main Viewer Area */}
          <main className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">
                  Unidad Activa: <strong className="text-cyan-400">{tituloActivo}</strong>
                </span>
                {isAdmin && (
                  <span className="rounded-full bg-amber-400/10 text-amber-300 text-[10px] font-black px-2 py-0.5 border border-amber-400/30">
                    DESBLOQUEADO
                  </span>
                )}
              </div>

              {/* Barra de Saltos Rápidos para Administradores */}
              {isAdmin ? (
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700">
                  <span className="text-[10px] font-bold text-amber-300 uppercase px-1">Ver Paso:</span>
                  {videoUrlActivo && (
                    <button
                      type="button"
                      onClick={() => setPaso("video")}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded transition ${
                        paso === "video" ? "bg-cyan-400 text-slate-950 font-black shadow" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      🎥 Video
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setPaso("pdf")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded transition ${
                      paso === "pdf" ? "bg-cyan-400 text-slate-950 font-black shadow" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    📄 PDF / Manual
                  </button>
                  {tieneQuiz && bancoQuiz && (
                    <button
                      type="button"
                      onClick={() => setPaso("quiz")}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded transition ${
                        paso === "quiz" ? "bg-cyan-400 text-slate-950 font-black shadow" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      📝 MiniQuiz
                    </button>
                  )}
                  {tieneQuiz && (
                    <button
                      type="button"
                      onClick={() => manejarQuizAprobado()}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded transition ${
                        paso === "completed" ? "bg-emerald-400 text-slate-950 font-black shadow" : "text-emerald-400 hover:bg-slate-800"
                      }`}
                    >
                      ✓ Aprobado
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-400">
                  {tieneQuiz && bancoQuiz
                    ? paso === "video"
                      ? "Paso 1: Video · Paso 2: Lectura PDF · Paso 3: MiniQuiz"
                      : paso === "pdf"
                        ? "Video ✓ · Paso 2: Lectura PDF · Paso 3: MiniQuiz"
                        : paso === "quiz"
                          ? "Video ✓ · PDF ✓ · Paso 3: MiniQuiz"
                          : "Módulo completado ✓"
                    : videoUrlActivo
                      ? "Video + Lectura PDF"
                      : `${slidesActuales.length} Diapositivas disponibles`}
                </span>
              )}
            </div>

            {paso === "completed" && tieneQuiz ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <h3 className="text-xl font-black text-white">
                  ¡Módulo {expandedModuloIdx + 1} Completado!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Excelente trabajo. Has terminado todo el contenido y aprobado la evaluación de
                  {` ${moduloActual.nombre}`}.
                </p>
                {!esUltimoModulo ? (
                  <button
                    onClick={() => {
                      cambiarModulo(expandedModuloIdx + 1);
                    }}
                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                  >
                    Continuar al Módulo {expandedModuloIdx + 2} →
                  </button>
                ) : cursoActual.banco === "cctv" ||
                  cursoActual.banco === "baston" ||
                  cursoActual.banco === "supervisor" ||
                  cursoActual.banco === "os10" ? (
                  <Link
                    href={`/evaluaciones/${cursoActual.slug}`}
                    className="inline-block rounded-xl bg-apre-red px-6 py-3 text-sm font-black text-white transition hover:bg-apre-red-dark"
                  >
                    {cursoActual.banco === "supervisor"
                      ? "📝 Rendir Examen Final Supervisor de Seguridad"
                      : cursoActual.banco === "os10"
                        ? "📝 Rendir Examen Final OS-10"
                        : cursoActual.banco === "baston"
                          ? "📝 Rendir Examen Final Bastón y Esposas"
                          : "📝 Rendir Examen Final CCTV"}
                  </Link>
                ) : (
                  <Link
                    href={`/cuestionarios/${cursoActual.slug}`}
                    className="inline-block rounded-xl bg-apre-red px-6 py-3 text-sm font-black text-white transition hover:bg-apre-red-dark"
                  >
                    📋 Ir a los Cuestionarios Oficiales
                  </Link>
                )}
              </div>
            ) : videoUrlActivo ? (
              <div className="space-y-4">
                {paso === "video" ? (
                  <VideoTracker
                    url={videoUrlActivo}
                    title={tituloActivo}
                    isAdmin={isAdmin}
                    onUnlockNext={() => setPaso("pdf")}
                  />
                ) : paso === "pdf" ? (
                  <PDFSwipeViewer
                    url={pdfUrlActivo || ""}
                    isAdmin={isAdmin}
                    onFinishReading={() => setPaso(tieneQuiz ? "quiz" : "completed")}
                  />
                ) : paso === "quiz" && bancoQuiz ? (
                  <MiniQuiz
                    banco={bancoQuiz.alternativas}
                    tituloModulo={moduloActual.nombre}
                    onPass={manejarQuizAprobado}
                  />
                ) : (
                  <PDFSwipeViewer
                    url={pdfUrlActivo || ""}
                    isAdmin={isAdmin}
                    onFinishReading={() => setPaso("completed")}
                  />
                )}
              </div>
            ) : (
              <PPTSlideViewer
                slides={slidesActuales}
                pdfDownloadUrl={pdfDownloadUrl}
              />
            )}
          </main>
        </div>
      </section>
    </>
  );
}
