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
import styles from "./FinalExam.module.css";

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

const LETRAS = ["A", "B", "C", "D"];
const PREGUNTAS_POR_PAGINA = 10;

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
  const [modoRevision, setModoRevision] = useState(false);
  const [revisionPage, setRevisionPage] = useState(0);
  const [explicacionesAbiertas, setExplicacionesAbiertas] = useState<Record<string, boolean>>({});

  const respondidas = Object.keys(respuestas).length;
  const allAnswered = respondidas === preguntas.length;

  const totalPaginasRevision = Math.ceil(preguntas.length / PREGUNTAS_POR_PAGINA);
  const preguntasRevision = useMemo(() => {
    const inicio = revisionPage * PREGUNTAS_POR_PAGINA;
    return preguntas.slice(inicio, inicio + PREGUNTAS_POR_PAGINA);
  }, [preguntas, revisionPage]);

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

  const toggleExplicacion = (id: string) => {
    setExplicacionesAbiertas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (submitted && !modoRevision) {
    return (
      <div className={styles.examContainer}>
        <div className={`${styles.resultCard} ${passed ? styles.resultSuccess : styles.resultFail}`}>
          <h2 className={styles.resultTitle}>{passed ? "¡Felicitaciones!" : "Lo sentimos"}</h2>

          <div className={styles.scoreCircle}>
            <svg viewBox="0 0 36 36" className={styles.circularChart}>
              <path
                className={styles.circleBg}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={passed ? styles.circleSuccess : styles.circleFail}
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className={styles.percentageText}>
                {percentage}%
              </text>
            </svg>
          </div>

          <p className={styles.scoreText}>
            Respuestas correctas: <strong>{score} de {preguntas.length}</strong>
          </p>

          {passed ? (
            <>
              <p className={styles.feedbackText}>
                Has aprobado el Examen Final de <strong>{cursoTitulo}</strong> con un{" "}
                <strong>{percentage}%</strong> de logro (mínimo {EXAMEN_FINAL_UMBRAL_CCTV}%).
              </p>
              {modoDemo && (
                <p className={styles.feedbackHint}>
                  🧪 Resultado generado en modo demostración para presentación a clientes.
                </p>
              )}
              <p className={styles.feedbackHint}>
                Te recomendamos guardar una captura de pantalla de este resultado como respaldo
                de tu avance en el curso.
              </p>
            </>
          ) : (
            <>
              <p className={styles.feedbackText}>
                No has superado el examen. Tu porcentaje fue del{" "}
                <strong>{percentage}%</strong> y necesitas un {EXAMEN_FINAL_UMBRAL_CCTV}% para
                aprobar. Puedes intentarlo nuevamente las veces que necesites.
              </p>

              {failedModules.length > 0 && (
                <div className={styles.moduleFeedbackList}>
                  {failedModules.map((m, i) => (
                    <div key={i} className={styles.moduleFeedbackItem}>
                      <span className={styles.moduleFeedbackIcon}>📚</span>
                      <div>
                        <strong>{m.titulo}</strong>
                        <span>
                          Fallaste {m.falladas} de {m.total} pregunta
                          {m.falladas !== 1 ? "s" : ""} de este módulo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className={styles.resultActions}>
            <button onClick={() => setModoRevision(true)} className={styles.btnSecondary}>
              🔍 Revisar mis respuestas y fundamentos
            </button>
            {volverHref && (
              <Link href={volverHref} className={styles.btnPrimary}>
                🎓 Volver al Curso
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (submitted && modoRevision) {
    return (
      <div className={styles.examContainer}>
        <div className={styles.header}>
          <div>
            <span className={styles.headerTag}>Revisión del Examen Final</span>
            <h3 className={styles.headerTitle}>{cursoTitulo}</h3>
          </div>
          <div className={styles.headerProgress}>
            <span className={styles.counter}>
              Página {revisionPage + 1} de {totalPaginasRevision} · {score}/{preguntas.length} correctas
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(respondidas / preguntas.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.questionsList}>
          {preguntasRevision.map((p, idx) => {
            const numeroGlobal = revisionPage * PREGUNTAS_POR_PAGINA + idx;
            const userResp = respuestas[p.id];
            const isCorrect = userResp === p.correctAnswer;
            const isIncorrect = userResp !== undefined && !isCorrect;
            const mostrarExplicacion = explicacionesAbiertas[p.id] || isIncorrect;

            return (
              <div
                key={p.id}
                className={`${styles.questionCard} ${
                  isCorrect ? styles.cardCorrect : isIncorrect ? styles.cardWrong : ""
                }`}
              >
                <div className={styles.questionHeader}>
                  <div className={styles.questionNumber}>{numeroGlobal + 1}</div>
                  <div className={styles.questionBody}>
                    <p className={styles.questionText}>{p.question}</p>
                    <span className={styles.questionModule}>{p.moduleTitle}</span>
                  </div>
                  <button onClick={() => toggleExplicacion(p.id)} className={styles.infoBtn}>
                    ℹ️ Fundamento
                  </button>
                </div>

                <div className={styles.optionsGrid}>
                  {p.options.map((opcion, i) => {
                    const isSelected = userResp === opcion;
                    const isAnswer = opcion === p.correctAnswer;

                    let btnClass = styles.optionBtn;
                    if (isAnswer) btnClass += ` ${styles.optionCorrect}`;
                    else if (isSelected) btnClass += ` ${styles.optionWrong}`;

                    return (
                      <div key={i} className={btnClass}>
                        <span className={styles.optionLetter}>{LETRAS[i]}</span>
                        <span className={styles.optionText}>{opcion}</span>
                      </div>
                    );
                  })}
                </div>

                {mostrarExplicacion && (
                  <div className={styles.explainBox}>
                    <div className={styles.explainAnswer}>
                      ✅ Respuesta Correcta: <strong>{p.correctAnswer}</strong>
                    </div>
                    <div className={styles.explainText}>
                      <strong>Fundamento:</strong> {p.explicacion}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.footerControls}>
          <button
            onClick={() => setRevisionPage((pg) => Math.max(0, pg - 1))}
            disabled={revisionPage === 0}
            className={styles.navBtn}
          >
            ← Página anterior
          </button>
          <div className={styles.gridMap}>
            {Array.from({ length: totalPaginasRevision }, (_, i) => (
              <button
                key={i}
                onClick={() => setRevisionPage(i)}
                className={`${styles.dot} ${i === revisionPage ? styles.dotActive : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setRevisionPage((pg) => Math.min(totalPaginasRevision - 1, pg + 1))}
            disabled={revisionPage === totalPaginasRevision - 1}
            className={styles.navBtn}
          >
            Página siguiente →
          </button>
        </div>

        <div className={styles.resultActions}>
          <button onClick={() => setModoRevision(false)} className={styles.btnSecondary}>
            ← Volver al resultado
          </button>
          {!passed && (
            <button onClick={handleRetry} className={styles.btnPrimary}>
              ↻ Reintentar Examen
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentQ = preguntas[currentIdx];
  const isLastQuestion = currentIdx === preguntas.length - 1;

  return (
    <div className={styles.examContainer}>
      <div className={styles.header}>
        <div>
          <span className={styles.headerTag}>Examen Final CCTV</span>
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