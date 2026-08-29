"use client";

import { useEffect, useMemo, useState } from "react";
import type { PreguntaCuestionario } from "@/data/cuestionarios";

type Respuesta =
  | { tipo: "vf"; valor: boolean }
  | { tipo: "alternativa"; valor: string };

function cleanOptionText(text: string): string {
  if (!text) return "";
  return text.replace(/^[a-eA-E][\)\.\-]\s*/, "").trim();
}

function normalizeText(text?: string): string {
  if (!text) return "";
  return text.replace(/^[a-eA-E][\)\.\-]\s*/, "").trim().toLowerCase();
}

function esCorrecta(p: ProcessedPregunta, r: Respuesta | undefined): boolean {
  if (!r) return false;
  if (p.tipo === "vf" && r.tipo === "vf") return r.valor === p.respuesta;
  if (p.tipo === "alternativa" && r.tipo === "alternativa") {
    return normalizeText(r.valor) === normalizeText(p.respuestaCorrecta);
  }
  return false;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface ProcessedOption {
  original: string;
  textoLimpio: string;
}

interface ProcessedPregunta extends PreguntaCuestionario {
  opcionesProcesadas?: ProcessedOption[];
}

function processAndShuffle(preguntas: PreguntaCuestionario[]): ProcessedPregunta[] {
  // Baraja el orden de las preguntas
  const shuffledPreguntas = shuffleArray(preguntas);

  // Baraja el orden de las alternativas de cada pregunta
  return shuffledPreguntas.map((p) => {
    if (p.tipo === "alternativa" && p.opciones && p.opciones.length > 0) {
      const opcionesConFormato: ProcessedOption[] = p.opciones.map((op) => ({
        original: op,
        textoLimpio: cleanOptionText(op),
      }));
      return {
        ...p,
        opcionesProcesadas: shuffleArray(opcionesConFormato),
      };
    }
    return p;
  });
}

const ES_DEV = process.env.NODE_ENV === "development";

export default function CuestionarioVFView({
  titulo,
  preguntas: preguntasProps,
  onVolver,
}: {
  titulo: string;
  preguntas: PreguntaCuestionario[];
  onVolver?: () => void;
}) {
  const [preguntas, setPreguntas] = useState<ProcessedPregunta[]>([]);
  const [respuestas, setRespuestas] = useState<Record<string, Respuesta>>({});
  const [mostrarTodas, setMostrarTodas] = useState(false);

  useEffect(() => {
    setPreguntas(processAndShuffle(preguntasProps));
    setRespuestas({});
  }, [preguntasProps]);

  const respondidas = useMemo(
    () => preguntas.filter((p) => respuestas[p.id]).length,
    [preguntas, respuestas]
  );
  const correctas = useMemo(
    () => preguntas.filter((p) => esCorrecta(p, respuestas[p.id])).length,
    [preguntas, respuestas]
  );
  const total = preguntas.length;
  const pct = total > 0 ? Math.round((correctas / total) * 100) : 0;
  const todoRespondido = total > 0 && respondidas === total;
  const aprobado = pct >= 60;

  const seleccionar = (p: ProcessedPregunta, r: Respuesta) => {
    if (respuestas[p.id]) return;
    setRespuestas((prev) => ({ ...prev, [p.id]: r }));
  };

  const reiniciar = () => {
    setPreguntas(processAndShuffle(preguntasProps));
    setRespuestas({});
    setMostrarTodas(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const letraOpcion = (idx: number): string => String.fromCharCode(97 + idx);

  return (
    <div className="space-y-6">
      {/* Barra de control superior */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 md:p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-cyan-400">
                <span>🎲</span> Modo Aleatorio Activo
              </span>
              {onVolver && (
                <button
                  onClick={onVolver}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 transition cursor-pointer"
                >
                  <span>←</span>
                  <span>Lista de Pruebas</span>
                </button>
              )}
            </div>
            <h2 className="text-lg md:text-xl font-black text-white leading-tight">
              {titulo}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {total} preguntas · Las preguntas y alternativas se ordenan aleatoriamente en cada intento.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-56">
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Progreso: {respondidas}/{total}</span>
                <span className="text-cyan-400 font-extrabold">{pct}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-apre-red transition-all duration-300"
                  style={{ width: `${(respondidas / Math.max(1, total)) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={reiniciar}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-[11px] font-black text-cyan-300 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Reiniciar y barajar todo de nuevo"
            >
              <span>🔄</span>
              <span>Reiniciar Preguntas (Random)</span>
            </button>
          </div>
        </div>

        {ES_DEV && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-3">
            <button
              onClick={() => setMostrarTodas((v) => !v)}
              className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-[10px] font-bold text-yellow-300 transition hover:bg-yellow-500/20"
            >
              🛠 {mostrarTodas ? "Ocultar respuestas" : "Mostrar respuestas (DEV)"}
            </button>
          </div>
        )}
      </div>

      {/* Tarjeta de Resultados al terminar todo el cuestionario */}
      {todoRespondido && (
        <div className={`rounded-3xl border p-6 md:p-8 text-center space-y-5 shadow-2xl transition-all ${
          aprobado
            ? "border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950"
            : "border-apre-red/50 bg-gradient-to-b from-red-950/40 via-slate-950 to-slate-950"
        }`}>
          <div className="text-5xl">{aprobado ? "🏆" : "📖"}</div>

          <div className="space-y-1">
            <span className={`inline-block rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider ${
              aprobado
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-red-500/20 text-red-400 border border-red-500/40"
            }`}>
              {aprobado ? "¡Prueba Aprobada!" : "Requiere Reforzamiento"}
            </span>

            <h3 className="text-2xl md:text-3xl font-black text-white">
              Resultado Final: {pct}% de Acierto
            </h3>
          </div>

          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Respondiste correctamente <strong className="text-cyan-400 font-black">{correctas}</strong> de{" "}
            <strong className="text-cyan-400 font-black">{total}</strong> preguntas. Puedes revisar el detalle abajo o reiniciar para practicar con una nueva combinación aleatoria.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={reiniciar}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3.5 text-xs sm:text-sm font-black text-slate-950 transition shadow-xl cursor-pointer flex items-center gap-2 transform hover:scale-[1.02]"
            >
              <span>🔄</span>
              <span>Reintentar Prueba (Nuevo Orden Aleatorio)</span>
            </button>

            {onVolver && (
              <button
                onClick={onVolver}
                className="rounded-2xl bg-slate-800 hover:bg-slate-700 px-6 py-3.5 text-xs sm:text-sm font-bold text-white border border-slate-700 transition cursor-pointer flex items-center gap-2"
              >
                <span>📋</span>
                <span>Volver al Listado de Pruebas</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lista de preguntas */}
      <div className="space-y-4">
        {preguntas.map((p, idx) => {
          const r = respuestas[p.id];
          const respondida = Boolean(r);
          const ok = respondida && esCorrecta(p, r);
          const revelar = mostrarTodas && !respondida;

          return (
            <div
              key={p.id}
              className={`rounded-2xl border bg-slate-950/80 p-5 md:p-6 transition-all ${
                respondida
                  ? ok
                    ? "border-emerald-500/50 shadow-emerald-950/20 shadow-lg"
                    : "border-apre-red/50 shadow-red-950/20 shadow-lg"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 shrink-0 rounded-lg px-2.5 py-1 font-mono text-xs font-black border ${
                    respondida
                      ? ok
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-apre-red/15 text-apre-red border-apre-red/30"
                      : "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                  }`}
                >
                  {idx + 1}
                </span>
                <p className="text-sm md:text-base font-semibold text-slate-100 leading-relaxed">
                  {p.texto}
                </p>
              </div>

              {/* Botones de Verdadero / Falso */}
              {p.tipo === "vf" && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => seleccionar(p, { tipo: "vf", valor: true })}
                    disabled={respondida}
                    className={`rounded-xl px-5 py-2.5 text-xs font-black transition border ${
                      r && r.tipo === "vf" && r.valor
                        ? ok
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-apre-red text-white border-apre-red"
                        : p.respuesta === true && (revelar || respondida)
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                          : respondida
                            ? "bg-slate-900/50 text-slate-600 border-slate-800"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 cursor-pointer"
                    }`}
                  >
                    ✓ VERDADERO
                  </button>
                  <button
                    onClick={() => seleccionar(p, { tipo: "vf", valor: false })}
                    disabled={respondida}
                    className={`rounded-xl px-5 py-2.5 text-xs font-black transition border ${
                      r && r.tipo === "vf" && !r.valor
                        ? ok
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-apre-red text-white border-apre-red"
                        : p.respuesta === false && (revelar || respondida)
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                          : respondida
                            ? "bg-slate-900/50 text-slate-600 border-slate-800"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 cursor-pointer"
                    }`}
                  >
                    ✗ FALSO
                  </button>
                </div>
              )}

              {/* Botones de Alternativas */}
              {p.tipo === "alternativa" && (
                <div className="mt-4 grid gap-2.5 md:grid-cols-2">
                  {(p.opcionesProcesadas || []).map((op, opIdx) => {
                    const marcada =
                      r?.tipo === "alternativa" &&
                      normalizeText(r.valor) === normalizeText(op.original);
                    const esLaCorrecta =
                      normalizeText(op.original) ===
                      normalizeText(p.respuestaCorrecta);

                    return (
                      <button
                        key={`${op.original}-${opIdx}`}
                        onClick={() =>
                          seleccionar(p, { tipo: "alternativa", valor: op.original })
                        }
                        disabled={respondida}
                        className={`rounded-xl px-4 py-3 text-left text-xs font-semibold transition border leading-relaxed ${
                          esLaCorrecta && (respondida || revelar)
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold"
                            : marcada
                              ? ok
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold"
                                : "bg-apre-red/20 text-apre-red border-apre-red font-bold"
                              : respondida
                                ? "bg-slate-900/50 text-slate-600 border-slate-800"
                                : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:border-slate-600 cursor-pointer"
                        }`}
                      >
                        <span className="mr-2 font-black text-cyan-400">
                          {letraOpcion(opIdx)}){" "}
                        </span>
                        {op.textoLimpio}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Retroalimentación inmediata */}
              {respondida && (
                <div className="mt-4 space-y-2">
                  <p
                    className={`text-xs font-black flex items-center gap-1.5 ${
                      ok ? "text-emerald-400" : "text-apre-red"
                    }`}
                  >
                    <span>{ok ? "✔" : "✘"}</span>
                    <span>{ok ? "¡Respuesta Correcta!" : "Respuesta Incorrecta."}</span>
                    {!ok && (
                      <span className="text-slate-300 font-medium ml-1">
                        La respuesta correcta era:{" "}
                        <strong className="text-emerald-300">
                          {p.tipo === "vf"
                            ? p.respuesta
                              ? "Verdadero"
                              : "Falso"
                            : `${cleanOptionText(p.respuestaCorrecta || "")}`}
                        </strong>
                      </span>
                    )}
                  </p>
                  {p.explicacion && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs leading-relaxed text-slate-300">
                      <strong className="text-cyan-400">Fundamento Técnico: </strong>
                      {p.explicacion}
                    </div>
                  )}
                </div>
              )}

              {revelar && p.tipo === "alternativa" && (
                <p className="mt-3 text-xs font-bold text-emerald-400">
                  Respuesta correcta: {cleanOptionText(p.respuestaCorrecta || "")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Barra de pie de página con botones de acción */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onVolver && (
            <button
              onClick={onVolver}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              ← Volver al Listado de Pruebas
            </button>
          )}
          <button
            onClick={reiniciar}
            className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2.5 text-xs font-black text-slate-950 transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span>🔄</span>
            <span>Reiniciar Prueba (Random)</span>
          </button>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
        >
          ⬆ Ir al principio
        </button>
      </div>
    </div>
  );
}

