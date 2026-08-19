import { Suspense } from "react";
import { redirect } from "next/navigation";
import FinalExam from "@/components/cursos/FinalExam";
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
import FinalExamVF from "@/components/cursos/FinalExamVF";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ExamenFinalPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <Contenido params={params} />
    </Suspense>
  );
}

async function Contenido({ params }: PageProps) {
  const { slug } = await params;

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

  redirect(`/cuestionarios/${slug}`);
  return null;
}