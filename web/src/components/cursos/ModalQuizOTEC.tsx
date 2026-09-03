"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import type { PreguntaAlternativa } from "@/lib/questionBanks/types";

interface ModalQuizOTECProps {
  cursoTitulo: string;
  evaluacionTitulo: string;
  preguntas: PreguntaAlternativa[];
  onClose: () => void;
}

export default function ModalQuizOTEC({
  cursoTitulo,
  evaluacionTitulo,
  preguntas,
  onClose,
}: ModalQuizOTECProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!preguntas || preguntas.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center space-y-4">
          <p className="text-sm font-bold text-gray-700">
            Este cuestionario está en preparación para el inicio de clases.
          </p>
          <button
            onClick={onClose}
            className="rounded-xl bg-apre-blue text-white px-5 py-2 text-xs font-bold"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  const currentQ = preguntas[currentIdx];
  const isCorrect = selectedOption === currentQ.respuestaCorrecta;
  const isLastQuestion = currentIdx === preguntas.length - 1;

  const handleSelectOption = (op: string) => {
    if (showFeedback) return;
    setSelectedOption(op);
    setShowFeedback(true);
    if (op === currentQ.respuestaCorrecta) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsFinished(true);
      const finalScore = isCorrect ? score : score;
      const pct = (finalScore / preguntas.length) * 100;
      if (pct >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setSelectedOption(null);
      setShowFeedback(false);
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  const percentage = Math.round((score / preguntas.length) * 100);
  const approved = percentage >= 80;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
        {/* Cabecera del Cuestionario */}
        <div className="bg-gradient-to-r from-apre-blue to-apre-blue-light text-white p-5 flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-3">
            <span className="text-[10px] font-bold text-yellow-300 uppercase tracking-widest block">
              {cursoTitulo}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold truncate mt-0.5">
              {evaluacionTitulo}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition shrink-0"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo del Cuestionario */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Progreso */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>
                    Pregunta {currentIdx + 1} de {preguntas.length}
                  </span>
                  <span className="text-apre-blue">
                    Aprobación requerida: 80%
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-apre-blue transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentIdx + 1) / preguntas.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Pregunta */}
              <p className="text-sm sm:text-base font-bold text-gray-900 leading-relaxed">
                {currentQ.pregunta}
              </p>

              {/* Opciones */}
              <div className="space-y-2.5">
                {currentQ.opciones.map((op, i) => {
                  let btnStyle =
                    "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800";

                  if (showFeedback) {
                    if (op === currentQ.respuestaCorrecta) {
                      btnStyle =
                        "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/40";
                    } else if (op === selectedOption) {
                      btnStyle =
                        "border-red-500 bg-red-50 text-red-950 ring-2 ring-red-400/40";
                    } else {
                      btnStyle = "border-gray-200 bg-gray-50/50 opacity-40 text-gray-500";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={showFeedback}
                      onClick={() => handleSelectOption(op)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition text-xs sm:text-sm flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="h-6 w-6 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 leading-snug">{op}</span>
                    </button>
                  );
                })}
              </div>

              {/* Retroalimentación técnica inmediata */}
              {showFeedback && (
                <div
                  className={`p-4 rounded-2xl text-xs space-y-1.5 animate-in fade-in duration-200 ${
                    isCorrect
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                      : "bg-red-50 border border-red-200 text-red-900"
                  }`}
                >
                  <p className="font-extrabold flex items-center gap-1.5">
                    <span>{isCorrect ? "✅ ¡Respuesta Correcta!" : "❌ Respuesta Incorrecta"}</span>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {currentQ.explicacion}
                  </p>
                </div>
              )}

              {/* Botón Siguiente */}
              {showFeedback && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="rounded-xl bg-apre-blue hover:bg-apre-blue-light text-white px-6 py-2.5 text-xs font-bold transition shadow-md flex items-center gap-2"
                  >
                    <span>{isLastQuestion ? "Ver Resultado Final" : "Siguiente Pregunta"}</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Pantalla de Resultados */
            <div className="text-center py-4 space-y-5">
              <div className="text-5xl">{approved ? "🎉" : "📚"}</div>

              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-gray-900">
                  {approved ? "¡Felicitaciones! Has Aprobado" : "Debes Repasar el Módulo"}
                </h4>
                <p className="text-xs text-gray-500">
                  {approved
                    ? "Dominas los conceptos clave de este módulo formativo."
                    : "Te recomendamos volver a revisar los manuales PDF y videos antes de reintentar."}
                </p>
              </div>

              <div className="inline-flex items-center gap-6 bg-slate-50 border border-gray-200 rounded-2xl px-6 py-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Puntaje
                  </span>
                  <span className="text-xl font-extrabold text-gray-900">
                    {score} / {preguntas.length}
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Porcentaje
                  </span>
                  <span
                    className={`text-xl font-extrabold ${
                      approved ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {percentage}%
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleRetry}
                  className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 text-xs font-bold transition"
                >
                  🔄 Reintentar Cuestionario
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-apre-blue hover:bg-apre-blue-light text-white px-6 py-2.5 text-xs font-bold transition shadow-md"
                >
                  ✓ Finalizar y Volver al Curso
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
