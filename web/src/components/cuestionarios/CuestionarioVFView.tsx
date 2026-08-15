"use client";

import { useMemo, useState } from "react";
import type { PreguntaCuestionario } from "@/data/cuestionarios";

type Respuesta =
  | { tipo: "vf"; valor: boolean }
  | { tipo: "alternativa"; valor: string };

function esCorrecta(p: PreguntaCuestionario, r: Respuesta | undefined): boolean {
  if (!r) return false;
  if (p.tipo === "vf" && r.tipo === "vf") return r.valor === p.respuesta;
  if (p.tipo === "alternativa" && r.tipo === "alternativa")
    return r.valor === p.respuestaCorrecta;
  return false;
}

const ES_DEV = process.env.NODE_ENV === "development";

export default function CuestionarioVFView({
  titulo,
  preguntas,
}: {
  titulo: string;
  preguntas: PreguntaCuestionario[];
}) {
  const [respuestas, setRespuestas] = useState<Record<string, Respuesta>>({});
  const [mostrarTodas, setMostrarTodas] = useState(false);

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
  const todoRespondido = respondidas === total;

  const seleccionar = (p: PreguntaCuestionario, r: Respuesta) => {
    if (respuestas[p.id]) return;
    setRespuestas((prev) => ({ ...prev, [p.id]: r }));
  };

  const reiniciar = () => {
    setRespuestas({});
    setMostrarTodas(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const letraOpcion = (idx: number): string => String.fromCharCode(97 + idx);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-cyan-400">
              {titulo}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {total} preguntas · Corrección inmediata: al responder verás si
              acertaste y cuál era la respuesta correcta.
            </p>
          </div>
          <div className="w-full max-w-[220px]">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
              <span>
                Aciertos: {correctas}/{total}
              </span>
              <span className="text-cyan-400">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-apre-red transition-all"
                style={{ width: `${(respondidas / Math.max(1, total)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {ES_DEV && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-3">
            <button
              onClick={() => setMostrarTodas((v) => !v)}
              className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-1.5 text-[11px] font-bold text-yellow-300 transition hover:bg-yellow-500/20"
            >
              🛠 {mostrarTodas ? "Ocultar respuestas" : "Mostrar todas las respuestas (DEV)"}
            </button>
          </div>
        )}
      </div>

      {todoRespondido && (
        <div className="rounded-2xl border border-apre-red/40 bg-slate-950 p-6 text-center space-y-4">
          <div className="text-4xl">{pct >= 60 ? "🎉" : "📚"}</div>
          <h3 className="text-xl font-black text-white">Resultado del cuestionario</h3>
          <p className="text-sm text-slate-300">
            Respondiste correctamente <strong className="text-cyan-400">{correctas}</strong> de{" "}
            <strong className="text-cyan-400">{total}</strong> preguntas ({pct}%). Revisa abajo la
            corrección de cada pregunta.
          </p>
          <button
            onClick={reiniciar}
            className="rounded-xl bg-apre-red px-6 py-3 text-sm font-black text-white transition hover:bg-apre-red-dark"
          >
            ↻ Reintentar cuestionario
          </button>
        </div>
      )}

      <div className="space-y-3">
        {preguntas.map((p, idx) => {
          const r = respuestas[p.id];
          const respondida = Boolean(r);
          const ok = respondida && esCorrecta(p, r);
          const revelar = mostrarTodas && !respondida;

          return (
            <div
              key={p.id}
              className={`rounded-2xl border bg-slate-950/80 p-5 ${
                respondida
                  ? ok
                    ? "border-emerald-500/50"
                    : "border-apre-red/50"
                  : "border-slate-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 shrink-0 rounded-lg px-2.5 py-1 font-mono text-xs font-black border ${
                    respondida
                      ? ok
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-apre-red/15 text-apre-red border-apre-red/30"
                      : "bg-apre-red/15 text-apre-red border-apre-red/30"
                  }`}
                >
                  {idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-100 leading-relaxed">{p.texto}</p>
              </div>

              {p.tipo === "vf" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => seleccionar(p, { tipo: "vf", valor: true })}
                    disabled={respondida}
                    className={`rounded-xl px-5 py-2 text-xs font-black transition border ${
                      r && r.tipo === "vf" && r.valor
                        ? ok
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-apre-red text-white border-apre-red"
                        : p.respuesta === true && (revelar || respondida)
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                          : respondida
                            ? "bg-slate-900/50 text-slate-600 border-slate-800"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    ✓ VERDADERO
                  </button>
                  <button
                    onClick={() => seleccionar(p, { tipo: "vf", valor: false })}
                    disabled={respondida}
                    className={`rounded-xl px-5 py-2 text-xs font-black transition border ${
                      r && r.tipo === "vf" && !r.valor
                        ? ok
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-apre-red text-white border-apre-red"
                        : p.respuesta === false && (revelar || respondida)
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                          : respondida
                            ? "bg-slate-900/50 text-slate-600 border-slate-800"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    ✗ FALSO
                  </button>
                </div>
              )}

              {p.tipo === "alternativa" && (
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {p.opciones?.map((op, opIdx) => {
                    const marcada = r?.tipo === "alternativa" && r.valor === op;
                    const esLaCorrecta = op === p.respuestaCorrecta;
                    return (
                      <button
                        key={op}
                        onClick={() => seleccionar(p, { tipo: "alternativa", valor: op })}
                        disabled={respondida}
                        className={`rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition border ${
                          esLaCorrecta && (respondida || revelar)
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                            : marcada
                              ? ok
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                                : "bg-apre-red/20 text-apre-red border-apre-red"
                              : respondida
                                ? "bg-slate-900/50 text-slate-600 border-slate-800"
                                : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                        }`}
                      >
                        <span className="mr-2 font-black text-slate-500">
                          {letraOpcion(opIdx)}){" "}
                        </span>
                        {op}
                      </button>
                    );
                  })}
                </div>
              )}

              {respondida && (
                <div className="mt-4 space-y-2">
                  <p
                    className={`text-xs font-black ${
                      ok ? "text-emerald-400" : "text-apre-red"
                    }`}
                  >
                    {ok ? "✔ ¡Correcto!" : "✘ Incorrecto."}
                    {!ok && (
                      <span className="text-slate-300 font-semibold">
                        {" "}
                        La respuesta correcta era:{" "}
                        {p.tipo === "vf"
                          ? p.respuesta
                            ? "Verdadero"
                            : "Falso"
                          : `${p.respuestaCorrecta}`}
                      </span>
                    )}
                  </p>
                  {p.explicacion && (
                    <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-3">
                      <p className="text-xs leading-relaxed text-slate-300">
                        <strong className="text-cyan-400">Por qué: </strong>
                        {p.explicacion}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {revelar && p.tipo === "alternativa" && (
                <p className="mt-3 text-xs font-bold text-emerald-400">
                  Respuesta correcta: {p.respuestaCorrecta}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
