"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { canAccessCourse, getCourseFieldKey, getCourseStatus } from "@/lib/courseAccess";
import type { CursoOTECLaboral } from "@/data/cursos-otec-laborales";
import { CONTACTO } from "@/data/site";
import CursoAccessGate from "@/components/CursoAccessGate";
import SelectorVideosOTEC from "@/components/cursos/SelectorVideosOTEC";
import CajonVisorA4Client from "@/components/cursos/CajonVisorA4Client";
import SeccionEvaluacionesOTEC from "@/components/cursos/SeccionEvaluacionesOTEC";

interface Props {
  curso: CursoOTECLaboral;
}

export default function CursoOTECLaboralClient({ curso }: Props) {
  const { user, userData, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<{ courseSlug?: string }[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [solicitando, setSolicitando] = useState(false);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user) {
      setLoadingEnrollments(false);
      return;
    }
    const q = query(collection(db, "enrollments"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrollments(snap.docs.map((d) => ({ courseSlug: d.data().courseSlug })));
      setLoadingEnrollments(false);
    });
    return unsub;
  }, [user]);

  const hasAccess = canAccessCourse(userData, curso.slug, enrollments);
  const status = getCourseStatus(userData, curso.slug, enrollments);

  const handleRequestAccess = async () => {
    if (!user || !userData) return;
    setSolicitando(true);
    try {
      const db = getFirestoreDb();
      if (db) {
        const fieldKey = getCourseFieldKey(curso.slug);
        // Actualizar en el documento del usuario
        await updateDoc(doc(db, "usuarios", user.uid), {
          [fieldKey]: "pendiente",
        });

        // Crear solicitud en la colección 'solicitudes'
        await addDoc(collection(db, "solicitudes"), {
          email: user.email,
          uid: user.uid,
          nombres: userData.nombre || user.displayName || "Estudiante",
          rut: userData.rut || "",
          telefono: userData.telefono || "",
          tipoSolicitud: "alumno",
          cursoDeseado: curso.slug,
          estado: "pendiente",
          fechaSolicitud: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error al solicitar acceso al curso OTEC:", err);
      alert("Ocurrió un error al enviar tu solicitud. Intenta nuevamente.");
    } finally {
      setSolicitando(false);
    }
  };

  if (authLoading || (user && loadingEnrollments)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          <p className="text-xs font-bold text-slate-400">Verificando matrícula y permisos…</p>
        </div>
      </div>
    );
  }

  // Si el usuario no tiene acceso autorizado, mostrar la compuerta de bloqueo
  if (!hasAccess) {
    return (
      <div className="bg-slate-950 min-h-screen">
        {/* Cabecera contextual */}
        <div className="border-b border-white/10 bg-slate-900/60 py-4 px-4 text-center">
          <Link
            href="/cursos-otec"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
          >
            <span>←</span>
            <span>Volver al Catálogo de Cursos OTEC</span>
          </Link>
        </div>

        <CursoAccessGate
          cursoTitulo={curso.titulo}
          cursoSlug={curso.slug}
          status={status}
          isNotLoggedIn={!user}
          solicitando={solicitando}
          onRequestAccess={handleRequestAccess}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero del Curso Desbloqueado */}
      <section className="bg-gradient-to-br from-apre-blue via-apre-blue to-apre-blue-light text-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/panel/alumno"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition"
            >
              <span>←</span>
              <span>Volver a mi Panel de Alumno</span>
            </Link>

            <span className="rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-extrabold text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
              <span>✓</span>
              <span>Matrícula Oficial APRECAP Activa</span>
            </span>
          </div>

          <div className="mt-6 flex items-start gap-4">
            <span className="text-4xl sm:text-5xl">{curso.icono}</span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-apre-red">
                {curso.categoria}
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                {curso.titulo}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-xs sm:text-sm leading-relaxed text-white/85">
            {curso.resumen}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-white/10 px-3.5 py-1.5 text-xs font-bold border border-white/15">
              ⏱ Duración: {curso.horas}
            </span>
            <span className="rounded-xl bg-white/10 px-3.5 py-1.5 text-xs font-bold border border-white/15">
              📍 {curso.modalidad}
            </span>
            <a
              href={`${CONTACTO.whatsappLink}?text=Hola,%20tengo%20una%20consulta%20sobre%20el%20curso%20${encodeURIComponent(
                curso.titulo
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-whatsapp hover:brightness-105 px-4 py-1.5 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md ml-auto"
            >
              <span>💬</span>
              <span>Soporte Académico</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contenido Principal del Aula */}
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* Objetivo del Curso */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-black uppercase tracking-wider text-apre-blue flex items-center gap-2">
            <span>🎯</span> Objetivo del Programa
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
            {curso.objetivo}
          </p>
        </section>

        {/* 1. Selector de Videos de YouTube (si el curso cuenta con videos) */}
        {curso.videos.length > 0 && (
          <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
            <SelectorVideosOTEC
              videos={curso.videos}
              cursoTitulo={curso.titulo}
            />
          </section>
        )}

        {/* 2. Selector de Documentos y Manuales PDF (Formato Cajón A4) */}
        {curso.documentos.length > 0 && (
          <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
            <CajonVisorA4Client
              documentos={curso.documentos}
              cursoTitulo={curso.titulo}
            />
          </section>
        )}

        {/* 3. Módulos de Evaluación Interactivos */}
        <SeccionEvaluacionesOTEC
          evaluaciones={curso.evaluaciones}
          cursoSlug={curso.slug}
          cursoTitulo={curso.titulo}
        />

        {/* Banner de Contacto y Asistencia */}
        <section className="rounded-3xl bg-gradient-to-r from-apre-blue via-apre-blue to-apre-blue-light p-8 text-white text-center shadow-lg space-y-4">
          <h2 className="text-xl sm:text-2xl font-black">
            ¿Tienes dudas académicas sobre {curso.titulo}?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
            Nuestros profesores y coordinadores OTEC están disponibles para orientarte en tus materias y preparación de evaluaciones.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${CONTACTO.whatsappLink}?text=Hola,%20necesito%20asistencia%20con%20el%20curso%20${encodeURIComponent(
                curso.titulo
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-whatsapp hover:brightness-105 px-6 py-3 text-xs font-extrabold text-white transition shadow-md"
            >
              Contactar por WhatsApp
            </a>
            <Link
              href="/panel/alumno"
              className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 text-xs font-bold text-white transition"
            >
              Ir a mi Panel de Cursos
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
