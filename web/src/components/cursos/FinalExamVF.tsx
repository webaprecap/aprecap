"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ResultadoExamen from "./ResultadoExamen";
import type { PreguntaExamenFinal } from "@/lib/questionBanks/os10";
import { shuffleArray } from "@/lib/questionBanks/types";
import styles from "./FinalExam.module.css";

interface FinalExamVFProps {
  cursoSlug: string;
  cursoTitulo: string;
  volverHref?: string;
  modoDemo?: boolean;
  preguntas: PreguntaExamenFinal[];
  umbral: number;
  tag: string;
}

interface ModuleFeedback {
  titulo: string;
  falladas: number;
  total: number;
}

function getFailedModules(
  preguntas: PreguntaExamenFinal[],
  respuestas: Record<string, boolean>
): ModuleFeedback[] {
  const mapa: Record<string, { falladas: number; total: number }> = {};
  for (const p of preguntas) {
    const mod = p.tituloModulo || `Módulo ${p.modulo}`;
    if (!mapa[mod]) mapa[mod] = { falladas: 0, total: 0 };
    mapa[mod].total++;
    if (respuestas[p.id] !== p.respuestaCorrecta) mapa[mod].falladas++;
  }
  return Object.entries(mapa)
    .filter(([, v]) => v.falladas > 0)
    .map(([titulo, v]) => ({ titulo, falladas: v.falladas, total: v.total }))
    .sort((a, b) => b.falladas - a.falladas);
}

export default function FinalExamVF({
  cursoSlug,
  cursoTitulo,
  volverHref,
  modoDemo = false,
  preguntas: preguntasIniciales,
  umbral,
  tag,
}: FinalExamVFProps) {
  const [preguntas] = useState<PreguntaExamenFinal[]>(() => shuffleArray(preguntasIniciales));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [passed, setPassed] = useState(false);
  const [failedModules, setFailedModules] = useState<ModuleFeedback[]>([]);
  const [showMissingWarning, setShowMissingWarning] = useState(false);

  const respondidas = Object.keys(respuestas).length;
  const allAnswered = respondidas === preguntas.length;

  const handleSelect = (id: string, valor: boolean) => {
    if (submitted) return;
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
    setShowMissingWarning(false);
  };

  const attemptSubmit = () => {
    if (allAnswered) submitExam();
    else setShowMissingWarning(true);
  };

  const submitExam = () => {
    let correctCount = 0;
    for (const p of preguntas) {
      if (respuestas[p.id] === p.respuestaCorrecta) correctCount++;
    }
    const pct = Math.round((correctCount / preguntas.length) * 100);
    const aprobado = modoDemo || pct >= umbral;

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
      <ResultadoExamen
        aprobado={passed}
        percentage={percentage}
        score={score}
        totalPreguntas={preguntas.length}
        cursoTitulo={cursoTitulo}
        umbral={umbral}
        volverHref={volverHref}
        modoDemo={modoDemo}
        failedModules={failedModules}
        onRetry={handleRetry}
      />
    );
  }

  const currentQ = preguntas[currentIdx];
  const isLastQuestion = currentIdx === preguntas.length - 1;
  const respuestaActual = respuestas[currentQ.id];

  return (
    <div className={styles.examContainer}>
      <div className={styles.header}>
        <div>
          <span className={styles.headerTag}>{tag}</span>
          <h3 className={styles.headerTitle}>{cursoTitulo}</h3>
        </div>
        <div className={styles.headerProgress}>
          <span className={styles.counter}>
            Respondidas {respondidas} de {preguntas.length} · Pregunta {currentIdx + 1}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
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
          className={styles.questionCard}
        >
          <div className={styles.questionHeader}>
            <div className={styles.questionNumber}>{currentIdx + 1}</div>
            <div className={styles.questionBody}>
              <p className={styles.questionText}>{currentQ.afirmacion}</p>
              <span className={styles.questionModule}>
                {currentQ.tituloModulo || `Módulo ${currentQ.modulo}`}
              </span>
            </div>
          </div>

          <div className={styles.optionsGrid}>
            <button
              disabled={submitted}
              onClick={() => handleSelect(currentQ.id, true)}
              className={`${styles.optionBtn} ${respuestaActual === true ? styles.optionSelected : ""}`}
            >
              <span className={styles.optionLetter}>V</span>
              <span className={styles.optionText}>VERDADERO</span>
            </button>
            <button
              disabled={submitted}
              onClick={() => handleSelect(currentQ.id, false)}
              className={`${styles.optionBtn} ${respuestaActual === false ? styles.optionSelected : ""}`}
            >
              <span className={styles.optionLetter}>F</span>
              <span className={styles.optionText}>FALSO</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.footerControls}>
        <button
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          className={styles.navBtn}
        >
          ← Anterior
        </button>
        <div className={styles.gridMap}>
          {preguntas.map((p, i) => {
            const respondida = !!respuestas[p.id];
            let dotClass = styles.dot;
            if (respondida) dotClass += ` ${styles.dotAnswered}`;
            if (currentIdx === i) dotClass += ` ${styles.dotActive}`;
            return (
              <button key={p.id} onClick={() => setCurrentIdx(i)} className={dotClass}>
                {i + 1}
              </button>
            );
          })}
        </div>
        {!isLastQuestion ? (
          <button
            onClick={() => setCurrentIdx((i) => Math.min(preguntas.length - 1, i + 1))}
            className={styles.navBtnPrimary}
          >
            Siguiente →
          </button>
        ) : (
          <button onClick={attemptSubmit} className={styles.submitBtn}>
            {allAnswered ? "ENTREGAR EXAMEN" : `Faltan ${preguntas.length - respondidas} por responder`}
          </button>
        )}
      </div>

      {showMissingWarning && (
        <div className={styles.warningOverlay}>
          <div className={styles.warningModal}>
            <h3>Preguntas sin responder</h3>
            <p>
              Te quedan {preguntas.length - respondidas} preguntas por responder. Puedes navegar
              por los números para revisarlas. ¿Deseas entregar igualmente?
            </p>
            <div className={styles.warningBtns}>
              <button onClick={() => setShowMissingWarning(false)} className={styles.warningBtnSecondary}>
                Regresar a revisar
              </button>
              <button onClick={submitExam} className={styles.warningBtnPrimary}>
                Entregar de todos modos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}