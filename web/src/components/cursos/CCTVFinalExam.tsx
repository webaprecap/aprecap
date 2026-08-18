"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";
import {
  selectBalancedQuestions,
  shuffleOptions,
  EXAMEN_FINAL_PREGUNTAS_CCTV,
  EXAMEN_FINAL_UMBRAL_CCTV,
  type ExamQuestion,
} from "@/lib/questionBanks/cctv";

interface CCTVFinalExamProps {
  cursoSlug?: string;
  cursoTitulo?: string;
  volverHref?: string;
  modoDemo?: boolean;
}

interface ModuleFeedback {
  titulo: string;
  falladas: number;
  total: number;
}

function getFailedModules(
  preguntas: ExamQuestion[],
  respuestas: Record<string, string>
): ModuleFeedback[] {
  const mapa: Record<string, { falladas: number; total: number }> = {};
  for (const p of preguntas) {
    if (!mapa[p.moduleTitle]) mapa[p.moduleTitle] = { falladas: 0, total: 0 };
    mapa[p.moduleTitle].total++;
    if (respuestas[p.id] !== p.correctAnswer) mapa[p.moduleTitle].falladas++;
  }
  return Object.entries(mapa)
    .filter(([, v]) => v.falladas > 0)
    .map(([titulo, v]) => ({ titulo, falladas: v.falladas, total: v.total }))
    .sort((a, b) => b.falladas - a.falladas);
}

export default function CCTVFinalExam({
  cursoSlug = "operador-cctv-y-alarmas",
  cursoTitulo = "Curso de Operador de CCTV y Alarmas",
  volverHref,
  modoDemo = false,
}: CCTVFinalExamProps) {
  const [preguntas] = useState<ExamQuestion[]>(() =>
    selectBalancedQuestions(EXAMEN_FINAL_PREGUNTAS_CCTV).map(shuffleOptions)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [passed, setPassed] = useState(false);
  const [failedModules, setFailedModules] = useState<ModuleFeedback[]>([]);
  const [showMissingWarning, setShowMissingWarning] = useState(false);

  const letras = ["A", "B", "C", "D"];
  const respondidas = Object.keys(respuestas).length;
  const allAnswered = respondidas === preguntas.length;

  const preguntasPorModulo = useMemo(() => {
    const mapa: Record<string, number> = {};
    for (const p of preguntas) mapa[p.moduleTitle] = (mapa[p.moduleTitle] || 0) + 1;
    return mapa;
  }, [preguntas]);

  const handleSelect = (id: string, option: string) => {
    if (submitted) return;
    setRespuestas((prev) => ({ ...prev, [id]: option }));
    setShowMissingWarning(false);
  };

  const attemptSubmit = () => {
    if (allAnswered) submitExam();
    else setShowMissingWarning(true);
  };

  const submitExam = () => {
    let correctCount = 0;
    for (const p of preguntas) {
      if (respuestas[p.id] === p.correctAnswer) correctCount++;
    }
    const pct = Math.round((correctCount / preguntas.length) * 100);
    const aprobado = modoDemo || pct >= EXAMEN_FINAL_UMBRAL_CCTV;

    setScore(correctCount);
    setPercentage(pct);
    setPassed(aprobado);
    setFailedModules(getFailedModules(preguntas, respuestas));
    setSubmitted(true);

    try {
      localStorage.setItem(`aprecap_examen_${cursoSlug}_pct`, String(pct));
      localStorage.setItem(`aprecap_examen_${cursoSlug}_aprobado`, aprobado ? "true" : "false");
    } catch {
      /* localStorage no disponible */
    }

    if (aprobado) {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#00e5ff", "#22c55e", "#ff1212", "#ffffff"],
      });
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <div
          className={`rounded-2xl border p-8 text-center space-y-4 ${
            passed
              ? "border-emerald-500/40 bg-emerald-950/20"
              : "border-red-500/40 bg-red-950/20"
          }`}
        >
          <div className="text-5xl">{passed ? "🎉" : "😔"}</div>
          <h2 className="text-2xl font-black text-white">
            {passed ? "¡Felicitaciones!" : "Lo sentimos"}
          </h2>

          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 border-slate-700">
            <div className="text-center">
              <div className={`text-4xl font-black ${passed ? "text-emerald-400" : "text-red-400"}`}>
                {percentage}%
              </div>
              <div className="text-xs font-bold text-slate-400">logro</div>
            </div>
          </div>

          <p className="text-sm text-slate-300">
            Respuestas correctas: <strong className="text-white">{score} de {preguntas.length}</strong>
          </p>

          {passed ? (
            <>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Has aprobado el Examen Final de{" "}
                <strong className="text-white">{cursoTitulo}</strong> con un{" "}
                <strong className="text-emerald-400">{percentage}%</strong> de logro
                (mínimo {EXAMEN_FINAL_UMBRAL_CCTV}%).
              </p>
              {modoDemo && (
                <p className="text-xs font-bold text-amber-400">
                  🧪 Resultado generado en modo demostración.
                </p>
              )}
              <p className="text-xs text-slate-400">
                Te recomendamos guardar una captura de pantalla de este resultado como respaldo
                de tu avance en el curso.
              </p>
              {volverHref && (
                <Link
                  href={volverHref}
                  className="inline-block rounded-xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
                >
                  🎓 Volver al Curso
                </Link>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                No has superado el examen. Tu porcentaje fue del{" "}
                <strong className="text-red-400">{percentage}%</strong> y necesitas un{" "}
                {EXAMEN_FINAL_UMBRAL_CCTV}% para aprobar. Puedes intentarlo nuevamente las veces
                que necesites.
              </p>

              {failedModules.length > 0 && (
                <div className="space-y-2 max-w-md mx-auto">
                  <p className="text-xs font-bold text-slate-400">Módulos a repasar:</p>
                  {failedModules.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-900 p-3 text-left"
                    >
                      <span>📚</span>
                      <div className="text-xs">
                        <strong className="text-white">{m.titulo}</strong>
                        <span className="block text-slate-400">
                          Fallaste {m.falladas} de {m.total} pregunta{m.falladas !== 1 ? "s" : ""} de
                          este módulo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRetry}
                  className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  ↻ Reintentar Examen
                </button>
                {volverHref && (
                  <Link
                    href={volverHref}
                    className="rounded-xl bg-slate-700 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-600"
                  >
                    📖 Volver al Curso
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentQ = preguntas[currentIdx];
  const isLastQuestion = currentIdx === preguntas.length - 1;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-apre-red">
            Examen Final CCTV
          </span>
          <h3 className="mt-1 text-lg font-black text-white">{cursoTitulo}</h3>
        </div>
        <div className="w-40">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Respondidas</span>
            <span className="text-cyan-400">
              {respondidas}/{preguntas.length}
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-apre-red transition-all"
              style={{ width: `${(respondidas / preguntas.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-apre-red text-sm font-black text-white">
              {currentIdx + 1}
            </span>
            <div>
              <p className="text-sm font-bold leading-relaxed text-white">{currentQ.question}</p>
              <span className="mt-1 inline-block text-xs font-bold text-cyan-400">
                {currentQ.moduleTitle}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {currentQ.options.map((option, i) => {
              const seleccionada = respuestas[currentQ.id] === option;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(currentQ.id, option)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition ${
                    seleccionada
                      ? "border-cyan-400 bg-cyan-950/40 text-white"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                      seleccionada ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {letras[i]}
                  </span>
                  <span className="font-semibold">{option}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
        <button
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-black text-white transition hover:bg-slate-700 disabled:opacity-40"
        >
          ← Anterior
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {preguntas.map((q, i) => {
            const respondida = !!respuestas[q.id];
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                aria-label={`Ir a pregunta ${i + 1}`}
                className={`h-3.5 w-3.5 rounded-full transition ${
                  currentIdx === i
                    ? "bg-apre-red ring-2 ring-apre-red/40"
                    : respondida
                      ? "bg-emerald-400"
                      : "bg-slate-700"
                }`}
              />
            );
          })}
        </div>

        {!isLastQuestion ? (
          <button
            onClick={() => setCurrentIdx((i) => Math.min(preguntas.length - 1, i + 1))}
            className="rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-black text-slate-950 transition hover:bg-cyan-300"
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={attemptSubmit}
            className={`rounded-xl px-5 py-2.5 text-xs font-black transition ${
              allAnswered
                ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                : "bg-red-500 text-white hover:bg-red-400"
            }`}
          >
            {allAnswered ? "ENTREGAR EXAMEN" : `Faltan ${preguntas.length - respondidas} por responder`}
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center text-xs text-slate-400">
        <span className="font-bold text-slate-300">
          Aprobación: {EXAMEN_FINAL_UMBRAL_CCTV}% · {EXAMEN_FINAL_PREGUNTAS_CCTV} preguntas
        </span>
        <span className="mx-2 text-slate-600">·</span>
        <span>
          {Object.entries(preguntasPorModulo)
            .map(([t, n]) => `${n} de ${t.replace("Módulo ", "M").replace(" — ", " ").replace(" de Operación de CCTV y Alarmas", "").replace(" de Seguridad Privada", "").replace(" de Operación de CCTV y Alarmas", "").replace(" — Fundamentos Legales de Operación de CCTV y Alarmas", "")}`)
            .join(" · ")}
        </span>
      </div>

      {showMissingWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center">
            <h3 className="text-lg font-black text-white">Preguntas sin responder</h3>
            <p className="mt-2 text-sm text-slate-300">
              Te quedan {preguntas.length - respondidas} preguntas por responder. Puedes navegar
              por los puntos para revisarlas. ¿Deseas entregar igualmente?
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => setShowMissingWarning(false)}
                className="rounded-xl bg-slate-700 px-5 py-2.5 text-xs font-black text-white transition hover:bg-slate-600"
              >
                Regresar a revisar
              </button>
              <button
                onClick={submitExam}
                className="rounded-xl bg-apre-red px-5 py-2.5 text-xs font-black text-white transition hover:bg-red-600"
              >
                Entregar de todos modos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}