"use client";

import { useState } from "react";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { bancoEvaluaciones } from "@/data/evaluaciones-banco";

export default function EvaluacionesPage() {
  const { user, userData } = useAuth();
  const [selectedEvalId, setSelectedEvalId] = useState(bancoEvaluaciones[0].id);
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [finalizado, setFinalizado] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [msgGuardado, setMsgGuardado] = useState("");

  const evalActual = bancoEvaluaciones.find((e) => e.id === selectedEvalId) || bancoEvaluaciones[0];

  const seleccionarOpcion = (preguntaId: number, opcionIndex: number) => {
    if (finalizado) return;
    setRespuestas((prev) => ({ ...prev, [preguntaId]: opcionIndex }));
  };

  const calcularResultado = () => {
    let correctas = 0;
    evalActual.preguntas.forEach((p) => {
      if (respuestas[p.id] === p.respuestaCorrecta) correctas++;
    });
    const total = evalActual.preguntas.length;
    const pct = total > 0 ? Math.round((correctas / total) * 100) : 0;
    const aprobado = pct >= evalActual.minimoAprobacionPct;
    return { correctas, total, pct, aprobado };
  };

  const finalizarEvaluacion = async () => {
    setFinalizado(true);
    const res = calcularResultado();

    const db = getFirestoreDb();
    if (db && user) {
      setGuardando(true);
      try {
        await addDoc(collection(db, "resultados_evaluaciones"), {
          userId: user.uid,
          nombreUsuario: userData?.nombre || user.displayName || "Alumno",
          userEmail: user.email || "",
          userRut: userData?.rut || "",
          evalId: evalActual.id,
          moduloNombre: evalActual.moduloNombre,
          courseSlug: evalActual.courseSlug,
          correctas: res.correctas,
          total: res.total,
          porcentaje: res.pct,
          aprobado: res.aprobado,
          esExamenFinal: false,
          tipo: "quiz_modulo",
          fecha: new Date(),
        });
        setMsgGuardado("¡Resultado guardado exitosamente en tu expediente oficial!");
      } catch (err) {
        console.error("Error guardando resultado:", err);
      } finally {
        setGuardando(false);
      }
    }
  };

  const reiniciar = () => {
    setRespuestas({});
    setFinalizado(false);
    setMsgGuardado("");
  };

  const res = finalizado ? calcularResultado() : null;

  return (
    <>
      <section className="bg-apre-blue text-white py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-apre-red">
              Campus Virtual · Evaluaciones
            </span>
            <h1 className="mt-1 text-3xl font-extrabold">Evaluaciones en Línea</h1>
            <p className="mt-2 text-sm text-white/80 max-w-xl">
              Rinde tus pruebas de módulo con corrección automática y guardado oficial en tu expediente de alumno.
            </p>
          </div>
          <Link
            href="/panel/alumno"
            className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            ← Volver a mi Panel
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12 min-h-[70vh]">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 text-xs text-blue-950 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="max-w-xl">
              <p className="font-bold flex items-center gap-1.5 text-apre-blue">
                <span>ℹ️</span> Evaluaciones Formativas de Módulos (Mini-Quizzes)
              </p>
              <p className="mt-1 text-slate-600 leading-relaxed">
                Estas pruebas cortas te permiten medir tu aprendizaje módulo a módulo. Para rendir tu <strong>Examen Final Oficial de Certificación</strong>, ingresa a tu curso matriculado desde el panel de alumno una vez concluido el periodo formativo.
              </p>
            </div>
            <Link
              href="/panel/alumno"
              className="rounded-xl bg-apre-blue text-white px-3.5 py-2 text-xs font-bold hover:bg-apre-blue-light transition"
            >
              Ir a Mis Cursos →
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="text-sm font-bold text-apre-blue">Selecciona el módulo a evaluar:</label>
            <select
              value={selectedEvalId}
              onChange={(e) => {
                setSelectedEvalId(e.target.value);
                reiniciar();
              }}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold"
            >
              {bancoEvaluaciones.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.moduloNombre} ({e.preguntas.length} preguntas)
                </option>
              ))}
            </select>
          </div>

          {finalizado && res && (
            <div
              className={`rounded-2xl p-6 text-center border-2 ${
                res.aprobado ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-red-50 border-red-500 text-red-950"
              }`}
            >
              <div className="text-4xl mb-2">{res.aprobado ? "🎉" : "⚠️"}</div>
              <h2 className="text-2xl font-extrabold">
                {res.aprobado ? "¡Evaluación Aprobada!" : "Evaluación Reprobada"}
              </h2>
              <p className="mt-2 text-base font-bold">
                Obtuviste {res.correctas} de {res.total} respuestas correctas ({res.pct}%).
              </p>
              <p className="mt-1 text-xs opacity-80">
                El exigido para aprobar es un {evalActual.minimoAprobacionPct}%.
              </p>

              {guardando && <p className="mt-3 text-xs font-bold text-apre-blue">Guardando en tu expediente...</p>}
              {msgGuardado && <p className="mt-3 text-xs font-bold text-emerald-700">{msgGuardado}</p>}

              <button
                onClick={reiniciar}
                className="mt-5 rounded-xl bg-apre-blue px-6 py-2.5 text-sm font-bold text-white transition hover:bg-apre-blue/90"
              >
                Rendir nuevamente
              </button>
            </div>
          )}

          <div className="space-y-6">
            {evalActual.preguntas.map((p, idx) => {
              const respondida = respuestas[p.id] !== undefined;
              const seleccion = respuestas[p.id];
              const esCorrecta = finalizado && seleccion === p.respuestaCorrecta;
              const esIncorrecta = finalizado && respondida && seleccion !== p.respuestaCorrecta;

              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                    finalizado
                      ? esCorrecta
                        ? "border-emerald-500 bg-emerald-50/30"
                        : esIncorrecta
                        ? "border-red-500 bg-red-50/30"
                        : "border-gray-200"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="text-base font-extrabold text-apre-blue">
                    Pregunta {idx + 1}: {p.pregunta}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {p.opciones.map((op, opIdx) => {
                      const seleccionada = respuestas[p.id] === opIdx;
                      let btnEstilo = "border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100";

                      if (finalizado) {
                        if (opIdx === p.respuestaCorrecta) {
                          btnEstilo = "border-emerald-500 bg-emerald-500 text-white font-bold";
                        } else if (seleccionada && opIdx !== p.respuestaCorrecta) {
                          btnEstilo = "border-red-500 bg-red-500 text-white font-bold";
                        }
                      } else if (seleccionada) {
                        btnEstilo = "border-apre-red bg-apre-red text-white font-bold";
                      }

                      return (
                        <button
                          key={opIdx}
                          onClick={() => seleccionarOpcion(p.id, opIdx)}
                          disabled={finalizado}
                          className={`w-full text-left rounded-xl border p-3.5 text-sm transition flex items-center justify-between ${btnEstilo}`}
                        >
                          <span>{op}</span>
                          {finalizado && opIdx === p.respuestaCorrecta && <span>✅ Correcta</span>}
                        </button>
                      );
                    })}
                  </div>

                  {finalizado && p.explicacion && (
                    <p className="mt-4 rounded-xl bg-blue-50 p-3 text-xs font-medium text-blue-900 border border-blue-200">
                      💡 <strong>Explicación:</strong> {p.explicacion}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {!finalizado && (
            <div className="pt-4">
              <button
                onClick={finalizarEvaluacion}
                disabled={Object.keys(respuestas).length < evalActual.preguntas.length}
                className="w-full rounded-2xl bg-apre-red py-4 text-base font-extrabold text-white transition hover:bg-apre-red-dark disabled:opacity-50 shadow-lg shadow-apre-red/20"
              >
                {Object.keys(respuestas).length < evalActual.preguntas.length
                  ? `Responde todas las preguntas (${Object.keys(respuestas).length}/${evalActual.preguntas.length})`
                  : "Enviar y Finalizar Evaluación"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

