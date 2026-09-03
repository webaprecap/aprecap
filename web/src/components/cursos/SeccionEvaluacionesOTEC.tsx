"use client";

import { useState } from "react";
import type { EvaluacionOTEC } from "@/data/cursos-otec-laborales";
import { getQuizOTEC } from "@/lib/questionBanks/otec";
import ModalQuizOTEC from "./ModalQuizOTEC";

interface Props {
  evaluaciones: EvaluacionOTEC[];
  cursoSlug: string;
  cursoTitulo: string;
}

export default function SeccionEvaluacionesOTEC({
  evaluaciones,
  cursoSlug,
  cursoTitulo,
}: Props) {
  const [activeEvaluacion, setActiveEvaluacion] = useState<EvaluacionOTEC | null>(null);

  if (!evaluaciones || evaluaciones.length === 0) return null;

  const currentQuiz = activeEvaluacion
    ? getQuizOTEC(cursoSlug, activeEvaluacion.id)
    : null;

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-apre-blue flex items-center gap-2">
            <span>📝</span> Evaluaciones y Cuestionarios del Programa ({evaluaciones.length})
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Haz clic en cualquier evaluación para abrir el cuestionario interactivo.
          </p>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
          Evaluación Continua Interactiva
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {evaluaciones.map((ev, idx) => (
          <button
            key={ev.id}
            onClick={() => setActiveEvaluacion(ev)}
            className="text-left rounded-2xl border border-gray-200 bg-slate-50/70 hover:bg-slate-100/90 hover:border-apre-blue/40 p-4 flex items-center gap-3 transition group cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <span className="h-9 w-9 rounded-xl bg-emerald-100 group-hover:bg-apre-blue group-hover:text-white text-emerald-800 flex items-center justify-center font-extrabold text-xs shrink-0 transition">
              {idx + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold text-gray-900 group-hover:text-apre-blue truncate transition">
                {ev.titulo}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">
                  {ev.tipo === "final" ? "Examen de Cierre" : "Control de Módulo"}
                </span>
                <span className="text-[10px] text-apre-blue font-bold opacity-0 group-hover:opacity-100 transition">
                  Iniciar Test →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeEvaluacion && (
        <ModalQuizOTEC
          cursoTitulo={cursoTitulo}
          evaluacionTitulo={activeEvaluacion.titulo}
          preguntas={
            currentQuiz?.preguntas || [
              {
                id: "demo-1",
                pregunta: `¿Has completado la lectura de los manuales y videos de ${activeEvaluacion.titulo}?`,
                opciones: [
                  "Sí, he revisado todo el material del módulo.",
                  "Aún me falta revisar algunos temas.",
                  "Estoy en proceso de estudio.",
                  "Consultaré con el docente."
                ],
                respuestaCorrecta: "Sí, he revisado todo el material del módulo.",
                explicacion: "Completar la revisión de los manuales y videos garantiza un óptimo rendimiento en la evaluación oficial."
              }
            ]
          }
          onClose={() => setActiveEvaluacion(null)}
        />
      )}
    </section>
  );
}
