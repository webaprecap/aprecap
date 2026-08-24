"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { canAccessCourse } from "@/lib/courseAccess";
import { getMeetingIdAndPwd, getZoomWebClientUrl } from "@/lib/zoomWeb";
import { formatRangoHorario, getClaseLiveStatus } from "@/lib/claseHorario";

interface ClaseData {
  id: string;
  nombre?: string;
  descripcion?: string;
  cursoSlug?: string;
  joinUrl?: string;
  estado?: string;
  creadoPor?: string;
  tipoHorario?: string;
  fechaInicioProgramada?: string | null;
  fechaFinProgramada?: string | null;
}

export default function AulaEnVivoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 p-8 text-center text-white">Cargando Aula Virtual…</div>}>
      <AulaEnVivoInner />
    </Suspense>
  );
}

function AulaEnVivoInner() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const claseId = searchParams.get("id");

  const [clase, setClase] = useState<ClaseData | null>(null);
  const [loadingClase, setLoadingClase] = useState(true);
  const [enrolls, setEnrolls] = useState<{ courseSlug?: string }[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Escuchar la clase en tiempo real desde Firestore
  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) return;

    if (claseId) {
      const unsub = onSnapshot(doc(db, "clases", claseId), (snap) => {
        if (snap.exists()) {
          setClase({ id: snap.id, ...snap.data() } as ClaseData);
        } else {
          setClase(null);
        }
        setLoadingClase(false);
      });
      return unsub;
    } else {
      // Si no hay id en URL, buscar la primera clase activa
      const q = query(collection(db, "clases"), where("estado", "==", "activa"));
      const unsub = onSnapshot(q, (snap) => {
        if (!snap.empty) {
          const first = snap.docs[0];
          setClase({ id: first.id, ...first.data() } as ClaseData);
        } else {
          setClase(null);
        }
        setLoadingClase(false);
      });
      return unsub;
    }
  }, [claseId]);

  // Cargar enrollments del alumno
  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user) return;
    const q = query(collection(db, "enrollments"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrolls(snap.docs.map((d) => ({ courseSlug: d.data().courseSlug })));
    });
    return unsub;
  }, [user]);

  // Nombre de usuario para el cliente web
  const nombreUsuario = useMemo(() => {
    return userData?.nombre || user?.displayName || (userData?.rol === "profesor" ? "Docente APRECAP" : "Alumno APRECAP");
  }, [userData, user]);

  // URL Web Client optimizada (Zoom Web Client directo con nombre y pass)
  const webClientUrl = useMemo(() => {
    if (!clase?.joinUrl) return "";
    return getZoomWebClientUrl(clase.joinUrl, nombreUsuario);
  }, [clase?.joinUrl, nombreUsuario]);

  const meetingInfo = useMemo(() => {
    return getMeetingIdAndPwd(clase?.joinUrl);
  }, [clase?.joinUrl]);

  // Manejar pantalla completa del reproductor
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const volverPanelHref =
    userData?.rol === "admin" || userData?.rol === "superadmin"
      ? "/panel/admin"
      : userData?.rol === "profesor"
      ? "/panel/profesor"
      : "/panel/alumno";

  if (loading || loadingClase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent mb-4" />
          <p className="font-bold text-sm text-cyan-300">Conectando con el Aula Virtual APRECAP…</p>
        </div>
      </div>
    );
  }

  // Verificación de permisos del curso y modalidad online para alumnos
  const esAdminOProfesor =
    userData?.rol === "admin" ||
    userData?.rol === "superadmin" ||
    userData?.rol === "profesor";

  const tieneModalidadOnline = Boolean(
    userData?.accesoOnline === true ||
    userData?.accesoClasesVivo === true ||
    (userData as any)?.modalidadOnline === true
  );

  const hasCourseAccess = !clase?.cursoSlug || canAccessCourse(userData, clase.cursoSlug, enrolls);
  const hasAccess = esAdminOProfesor || (hasCourseAccess && tieneModalidadOnline);

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-xl font-black text-red-400">Clase Restringida</h1>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            {!hasCourseAccess
              ? "Esta clase en vivo está reservada exclusivamente para estudiantes matriculados en el curso asignado."
              : "Esta clase en vivo está reservada para estudiantes matriculados en modalidad Online autorizados por la administración."}
          </p>
          <Link
            href="/panel/alumno"
            className="mt-6 inline-block w-full rounded-xl bg-white/10 py-3 text-xs font-black text-white hover:bg-white/20"
          >
            ← Volver a mi Panel
          </Link>
        </div>
      </div>
    );
  }

  const liveStatus = clase ? getClaseLiveStatus(clase) : "finalizada";

  if (!clase || liveStatus === "finalizada") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl space-y-4">
          <div className="text-4xl">⏹️</div>
          <h1 className="text-xl font-black text-white">Sala de Clases Cerrada</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            No hay una transmisión en vivo activa en esta sala en este momento. La clase ha finalizado o la sala fue cerrada por el docente.
          </p>
          <Link
            href={volverPanelHref}
            className="inline-block w-full rounded-xl bg-cyan-500 py-3 text-xs font-black text-slate-950 hover:bg-cyan-400 shadow-lg"
          >
            ← Volver a mi Portal
          </Link>
        </div>
      </div>
    );
  }

  if (!esAdminOProfesor && liveStatus === "programada") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-blue-500/30 bg-slate-900 p-8 text-center shadow-2xl space-y-4">
          <div className="text-4xl">⏰</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 text-xs font-black uppercase tracking-wider">
            <span>🗓️</span> Clase Programada
          </div>
          <h1 className="text-xl font-extrabold text-white">{clase.nombre}</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Horario programado: <strong>{formatRangoHorario(clase.fechaInicioProgramada, clase.fechaFinProgramada)}</strong>
          </p>
          <p className="text-[11px] text-slate-400 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            La sala virtual se abrirá automáticamente en este horario. Por favor regresa a la hora programada para unirte a la transmisión.
          </p>
          <Link
            href={volverPanelHref}
            className="inline-block w-full rounded-xl bg-cyan-500 py-3 text-xs font-black text-slate-950 hover:bg-cyan-400 shadow-lg"
          >
            ← Volver a mi Portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      {/* Barra Superior Institucional APRECAP */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href={volverPanelHref} className="flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-black text-base group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
                🛡️
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-cyan-400 leading-none">
                  OTEC APRECAP
                </p>
                <p className="text-sm font-extrabold text-white leading-tight">
                  Aula Virtual en Vivo
                </p>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/30 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              SALA EN VIVO
            </span>
          </div>

          {/* Datos de la clase activa */}
          <div className="hidden md:block text-center">
            <p className="text-xs font-bold text-white max-w-md truncate">
              {clase.nombre}
            </p>
            <p className="text-[10px] text-slate-400">
              Conectado como: <strong>{nombreUsuario}</strong>
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-2">
            {clase.joinUrl && (
              <a
                href={clase.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir en la aplicación de Zoom si la tienes instalada"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
              >
                <span>📱</span>
                <span>Abrir en App Zoom</span>
              </a>
            )}

            <button
              onClick={toggleFullscreen}
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
              title="Pantalla Completa"
            >
              {isFullscreen ? "🗗" : "⛶"}
            </button>

            <Link
              href={volverPanelHref}
              className="rounded-xl bg-red-600/90 hover:bg-red-600 px-3.5 py-2 text-xs font-black text-white transition shadow-sm"
            >
              Salir de la clase
            </Link>
          </div>
        </div>
      </header>

      {/* Contenedor Principal del Aula Virtual */}
      <main className="flex-1 p-3 md:p-6 flex flex-col max-w-7xl mx-auto w-full">
        {/* Marco de Transmisión Web con Zoom Web Client */}
        <div
          ref={playerContainerRef}
          className="relative flex-1 min-h-[75vh] w-full rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col"
        >
          {webClientUrl ? (
            <iframe
              src={webClientUrl}
              allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write; clipboard-read"
              className="w-full h-full min-h-[75vh] flex-1 border-0 rounded-3xl bg-slate-950"
              title="Aula Virtual APRECAP - Zoom Web"
            />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-center">
              <div className="max-w-md space-y-3">
                <span className="text-4xl">⏳</span>
                <h2 className="text-lg font-extrabold text-white">Sala Abierta</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  El administrador ha iniciado la sesión pero aún no ha configurado el enlace de la reunión.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Barra de Ayuda y Accesos Directos Institucionales */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>🛡️</span>
            <span>
              <strong>Aula Virtual APRECAP Web:</strong> Transmisión segura con credenciales institucionales.
              {meetingInfo?.meetingId && (
                <span className="ml-2 font-mono text-[11px] text-cyan-400">
                  ID: {meetingInfo.meetingId}
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {webClientUrl && (
              <a
                href={webClientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>🌐</span>
                <span>Abrir Web en pestaña nueva</span>
              </a>
            )}
            {clase.joinUrl && (
              <a
                href={clase.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>📱</span>
                <span>Abrir con App Zoom</span>
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
