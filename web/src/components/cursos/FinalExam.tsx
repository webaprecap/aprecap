"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import ResultadoExamen from "./ResultadoExamen";
import { barajarOpciones, seleccionarBalanceadas } from "@/lib/questionBanks/helpers";
import type { ExamQuestion } from "@/lib/questionBanks/types";
import styles from "./FinalExam.module.css";

interface FinalExamProps {
  cursoSlug: string;
  cursoTitulo: string;
  volverHref?: string;
  modoDemo?: boolean;
  banco: ExamQuestion[];
  totalPreguntas: number;
  umbral: number;
  tag: string;
}

interface ModuleFeedback {
  titulo: string;
  falladas: number;
  total: number;
}

const LETRAS = ["A", "B", "C", "D"];

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

export default function FinalExam({
  cursoSlug,
  cursoTitulo,
  volverHref,
  modoDemo = false,
  banco,
  totalPreguntas,
  umbral,
  tag,
}: FinalExamProps) {
  const { user, userData } = useAuth();
  const [preguntas] = useState<ExamQuestion[]>(() =>
    seleccionarBalanceadas(banco, totalPreguntas).map(barajarOpciones)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [passed, setPassed] = useState(false);
  const [failedModules, setFailedModules] = useState<ModuleFeedback[]>([]);
  const [showMissingWarning, setShowMissingWarning] = useState(false);

  const respondidas = Object.keys(respuestas).length;
  const allAnswered = respondidas === preguntas.length;

  const handleSelect = (id: string, option: string) => {
    if (submitted) return;
    setRespuestas((prev) => ({ ...prev, [id]: option }));
    setShowMissingWarning(false);
  };

  const attemptSubmit = () => {
    if (allAnswered) submitExam();
    else setShowMissingWarning(true);
  };

  const submitExam = async () => {
    let correctCount = 0;
    for (const p of preguntas) {
      if (respuestas[p.id] === p.correctAnswer) correctCount++;
    }
    const pct = Math.round((correctCount / preguntas.length) * 100);
    const aprobado = pct >= umbral;

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

    const db = getFirestoreDb();
    if (db && user) {
      try {
        await addDoc(collection(db, "resultados_evaluaciones"), {
          userId: user.uid,
          nombreUsuario: userData?.nombre || user.displayName || "Alumno",
          userEmail: user.email || "",
          userRut: userData?.rut || "",
          courseSlug: cursoSlug,
          moduloNombre: `Examen Final - ${cursoTitulo}`,
          correctas: correctCount,
          total: preguntas.length,
          porcentaje: pct,
          aprobado,
          esExamenFinal: true,
          tipo: "examen_final",
          fecha: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error guardando examen final en Firestore:", err);
      }
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
        cursoSlug={cursoSlug}
        umbral={umbral}
        volverHref={volverHref}
        failedModules={failedModules}
        onRetry={handleRetry}
      />
    );
  }

  const currentQ = preguntas[currentIdx];
  const isLastQuestion = currentIdx === preguntas.length - 1;

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
              <p className={styles.questionText}>{currentQ.question}</p>
              <span className={styles.questionModule}>{currentQ.moduleTitle}</span>
            </div>
          </div>

          <div className={styles.optionsGrid}>
            {currentQ.options.map((opcion, i) => {
              const isSelected = respuestas[currentQ.id] === opcion;
              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => handleSelect(currentQ.id, opcion)}
                  className={`${styles.optionBtn} ${isSelected ? styles.optionSelected : ""}`}
                >
                  <span className={styles.optionLetter}>{LETRAS[i]}</span>
                  <span className={styles.optionText}>{opcion}</span>
                </button>
              );
            })}
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
          {preguntas.map((q, i) => {
            const respondida = !!respuestas[q.id];
            let dotClass = styles.dot;
            if (respondida) dotClass += ` ${styles.dotAnswered}`;
            if (currentIdx === i) dotClass += ` ${styles.dotActive}`;
            return (
              <button key={q.id} onClick={() => setCurrentIdx(i)} className={dotClass}>
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