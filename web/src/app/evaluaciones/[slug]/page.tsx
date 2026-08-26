"use client";

import { Suspense, use, useEffect, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { canAccessCourse, getCourseStatus, isMaterialHabilitado } from "@/lib/courseAccess";
import { doc } from "firebase/firestore";
import { getExamUnlockStatus } from "@/lib/courseTiming";
import FinalExam from "@/components/cursos/FinalExam";
import FinalExamVF from "@/components/cursos/FinalExamVF";
import {
  CCTV_QUESTION_BANK,
  EXAMEN_FINAL_PREGUNTAS_CCTV,
  EXAMEN_FINAL_UMBRAL_CCTV,
} from "@/lib/questionBanks/cctv";
import {
  BASTON_QUESTION_BANK,
  EXAMEN_FINAL_PREGUNTAS_BASTON,
  EXAMEN_FINAL_UMBRAL_BASTON,
} from "@/lib/questionBanks/baston";
import {
  SUPERVISOR_QUESTION_BANK,
  EXAMEN_FINAL_PREGUNTAS_SUPERVISOR,
  EXAMEN_FINAL_UMBRAL_SUPERVISOR,
} from "@/lib/questionBanks/supervisor";
import {
  getExamenFinalPreguntas,
  EXAMEN_UMBRAL_APROBACION,
} from "@/lib/questionBanks/os10";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ExamenFinalPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ExamenFinalInner params={params} />
    </Suspense>
  );
}

function ExamenFinalInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, userData, loading } = useAuth();
  const [enrollments, setEnrollments] = useState<{ courseSlug?: string; fecha?: unknown }[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user) return;
    const q = query(collection(db, "enrollments"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrollments(
        snap.docs.map((d) => ({
          courseSlug: d.data().courseSlug,
          fecha: d.data().fecha,
        }))
      );
      setLoadingEnrollments(false);
    });
    return unsub;
  }, [user]);

  if (
    ![
      "operador-cctv-y-alarmas",
      "supervisor-de-seguridad",
      "baston-y-esposas",
      "guardia-de-seguridad",
    ].includes(slug)
  ) {
    redirect(`/cuestionarios/${slug}`);
  }

  const [globalOS10Habilitado, setGlobalOS10Habilitado] = useState(false);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) return;
    const unsub = onSnapshot(doc(db, "configuracion", "os10_materiales"), (snap) => {
      if (snap.exists()) {
        setGlobalOS10Habilitado(snap.data().habilitado === true);
      }
    });
    return unsub;
  }, []);

  const isAdmin = Boolean(
    userData?.rol === "admin" ||
    userData?.rol === "superadmin" ||
    userData?.rol === "profesor"
  );

  const matriculaActual = enrollments.find((e) => e.courseSlug === slug);
  const rawFechaMatricula = matriculaActual?.fecha || userData?.fechaRegistro;
  const examUnlock = getExamUnlockStatus(slug, rawFechaMatricula, isAdmin);
  const hasAccess = canAccessCourse(userData, slug, enrollments);

  // Prevenir redirección prematura si las matrículas aún están cargando
  if (loading || loadingEnrollments) {
    return <div className="min-h-screen flex items-center justify-center p-8 text-white">Verificando accesos...</div>;
  }

  if (!hasAccess && !isAdmin) {
    redirect(`/materiales/${slug}`);
  }

  // Verificación de Fase Presencial para Guardia OS-10
  const materialHabilitado = isMaterialHabilitado(userData, slug, globalOS10Habilitado);
  if (!loading && !isAdmin && !materialHabilitado) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-16 flex items-center justify-center">
        <div className="w-full rounded-3xl border border-amber-500/30 bg-slate-950 p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner">
            🔒
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              <span>🏫</span> Fase Presencial en Sede
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Examen Bloqueado (Fase Presencial)
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              El examen final del curso Guardia de Seguridad OS-10 se habilitará una vez concluidas las clases presenciales por disposición de la administración y tus instructores.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/panel/alumno"
              className="inline-block rounded-xl bg-cyan-400 px-6 py-3 text-xs md:text-sm font-black text-slate-950 transition hover:bg-cyan-300 shadow-lg"
            >
              ← Volver a mi Panel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Si el examen final aún no se desbloquea por tiempo para el alumno
  if (!loading && !examUnlock.isUnlocked) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-16 flex items-center justify-center">
        <div className="w-full rounded-2xl border border-amber-500/30 bg-slate-950 p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner">
            ⏳
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              🔒 Examen Final Programado · Día {examUnlock.diaRequerido}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Examen No Disponible Todavía
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              {examUnlock.mensajeBloqueo}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 max-w-md mx-auto text-left text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Tu día actual:</span>
              <span className="text-white font-bold">Día {examUnlock.diaActual} de {examUnlock.totalDiasCurso}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Habilitación en aprox:</span>
              <span className="text-cyan-400 font-bold">~{examUnlock.horasRestantes} horas</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/materiales/${slug}`}
              className="inline-block rounded-xl bg-cyan-400 px-6 py-3 text-xs md:text-sm font-black text-slate-950 transition hover:bg-cyan-300 shadow-lg"
            >
              ← Volver al Aula Virtual a repasar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "operador-cctv-y-alarmas") {
    return (
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
        <FinalExam
          cursoSlug={slug}
          cursoTitulo="Curso de Operador de CCTV y Alarmas"
          volverHref={`/materiales/${slug}`}
          banco={CCTV_QUESTION_BANK}
          totalPreguntas={EXAMEN_FINAL_PREGUNTAS_CCTV}
          umbral={EXAMEN_FINAL_UMBRAL_CCTV}
          tag="Examen Final CCTV"
        />
      </div>
    );
  }

  if (slug === "baston-y-esposas") {
    return (
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
        <FinalExam
          cursoSlug={slug}
          cursoTitulo="Curso de Bastón y Esposas"
          volverHref={`/materiales/${slug}`}
          banco={BASTON_QUESTION_BANK}
          totalPreguntas={EXAMEN_FINAL_PREGUNTAS_BASTON}
          umbral={EXAMEN_FINAL_UMBRAL_BASTON}
          tag="Examen Final Bastón y Esposas"
        />
      </div>
    );
  }

  if (slug === "supervisor-de-seguridad") {
    return (
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
        <FinalExam
          cursoSlug={slug}
          cursoTitulo="Curso de Supervisor de Seguridad Privada"
          volverHref={`/materiales/${slug}`}
          banco={SUPERVISOR_QUESTION_BANK}
          totalPreguntas={EXAMEN_FINAL_PREGUNTAS_SUPERVISOR}
          umbral={EXAMEN_FINAL_UMBRAL_SUPERVISOR}
          tag="Examen Final Supervisor de Seguridad"
        />
      </div>
    );
  }

  if (slug === "guardia-de-seguridad") {
    return (
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
        <FinalExamVF
          cursoSlug={slug}
          cursoTitulo="Curso de Guardia de Seguridad (OS-10)"
          volverHref={`/materiales/${slug}`}
          preguntas={getExamenFinalPreguntas()}
          umbral={EXAMEN_UMBRAL_APROBACION}
          tag="Examen Final OS-10"
        />
      </div>
    );
  }

  return notFound();
}