"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cuestionariosGuardiaOS10 } from "@/data/cuestionarios-os10";
import CuestionarioVFView from "@/components/cuestionarios/CuestionarioVFView";
import type { Cuestionario } from "@/data/cuestionarios";

interface GuardiaEvaluacionesHubProps {
  volverHref: string;
  cursoSlug: string;
}

export default function GuardiaEvaluacionesHub({
  volverHref,
  cursoSlug,
}: GuardiaEvaluacionesHubProps) {
  const [evalSeleccionadaIdx, setEvalSeleccionadaIdx] = useState<number | null>(null);

  const iconos = [
    "📋", // 1. Cuestionario General 82
    "📝", // 2. Prueba General 150
    "🏥", // 3. Ley 16.744
    "🦺", // 4. Prevención de Riesgos
    "🔥", // 5. Control de Emergencias
    "🏢", // 6. Seguridad de Instalaciones
    "🚨", // 7. Sistemas de Alarmas
    "📡", // 8. Alarmas y Comunicación
  ];

  // Escuchar el botón atrás/adelante del navegador (popstate)
  useEffect(() => {
    const sincronizarEstadoConUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const pruebaParam = params.get("prueba");
      if (pruebaParam) {
        const idx = parseInt(pruebaParam, 10) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < cuestionariosGuardiaOS10.length) {
          setEvalSeleccionadaIdx(idx);
          return;
        }
      }
      setEvalSeleccionadaIdx(null);
    };

    // Revisar estado inicial al cargar
    sincronizarEstadoConUrl();

    window.addEventListener("popstate", sincronizarEstadoConUrl);
    return () => window.removeEventListener("popstate", sincronizarEstadoConUrl);
  }, []);

  const handleSeleccionarEval = (idx: number) => {
    setEvalSeleccionadaIdx(idx);
    const url = new URL(window.location.href);
    url.searchParams.set("prueba", String(idx + 1));
    window.history.pushState({ pruebaIdx: idx }, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVolverALista = () => {
    setEvalSeleccionadaIdx(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("prueba");
    window.history.pushState(null, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (evalSeleccionadaIdx !== null) {
    const evaluacionActual: Cuestionario = cuestionariosGuardiaOS10[evalSeleccionadaIdx];
    return (
      <div className="space-y-6">
        {/* Barra superior de navegación interna */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleVolverALista}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-black text-cyan-400 border border-slate-700 transition cursor-pointer shadow-xs"
            >
              <span>←</span>
              <span>Volver a la lista de pruebas</span>
            </button>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-bold">
              Evaluación {evalSeleccionadaIdx + 1} de {cuestionariosGuardiaOS10.length}
            </span>
          </div>

          <Link
            href={volverHref}
            className="rounded-xl bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-bold text-slate-300 transition"
          >
            Salir al Aula Virtual
          </Link>
        </div>

        {/* Componente interactivo del examen seleccionado con soporte de reinicio aleatorio y regreso */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 md:p-8 shadow-2xl">
          <CuestionarioVFView
            titulo={evaluacionActual.titulo}
            preguntas={evaluacionActual.preguntas}
            onVolver={handleVolverALista}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Encabezado del Centro de Evaluaciones */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 md:p-10 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-black text-cyan-400 uppercase tracking-wider">
              <span>🎓</span> Evaluaciones Oficiales de la Escuela APRECAP
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Módulos de Examen y Ensayos Oficiales (OS-10 / SPD)
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Rinde las pruebas y cuestionarios oficiales de capacitación de forma independiente por módulo temático. Cada evaluación cuenta con corrección instantánea y orden aleatorio en cada intento.
            </p>
          </div>

          <Link
            href={volverHref}
            className="rounded-2xl bg-cyan-400 hover:bg-cyan-300 px-5 py-3 text-xs font-black text-slate-950 transition shadow-lg shrink-0"
          >
            ← Volver al Aula de Estudio
          </Link>
        </div>
      </div>

      {/* Grid con las 8 Pruebas Oficiales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {cuestionariosGuardiaOS10.map((cuest, idx) => {
          const icono = iconos[idx] || "📝";
          return (
            <div
              key={cuest.id || idx}
              className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 md:p-6 transition hover:border-cyan-500/50 hover:bg-slate-900 flex flex-col justify-between gap-4 shadow-lg group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-xl border border-slate-700 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition">
                    {icono}
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-black text-cyan-300 border border-slate-700">
                    {cuest.preguntas.length} preguntas
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-cyan-400 transition leading-snug">
                  {cuest.titulo}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {cuest.descripcion}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  Prueba Oficial {idx + 1}
                </span>

                <button
                  onClick={() => handleSeleccionarEval(idx)}
                  className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-black text-slate-950 transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>✍️</span>
                  <span>Rendir Prueba</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
