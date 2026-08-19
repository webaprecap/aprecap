"use client";

import Link from "next/link";
import styles from "./FinalExam.module.css";

export interface ModuloFeedback {
  titulo: string;
  falladas: number;
  total: number;
}

interface ResultadoExamenProps {
  aprobado: boolean;
  percentage: number;
  score: number;
  totalPreguntas: number;
  cursoTitulo: string;
  umbral: number;
  volverHref?: string;
  modoDemo?: boolean;
  failedModules?: ModuloFeedback[];
  onRetry?: () => void;
}

export default function ResultadoExamen({
  aprobado,
  percentage,
  score,
  totalPreguntas,
  cursoTitulo,
  umbral,
  volverHref,
  modoDemo = false,
  failedModules = [],
  onRetry,
}: ResultadoExamenProps) {
  return (
    <div className={styles.examContainer}>
      <div className={`${styles.resultCard} ${aprobado ? styles.resultSuccess : styles.resultFail}`}>
        <h2 className={styles.resultTitle}>{aprobado ? "¡Felicitaciones!" : "Lo sentimos"}</h2>

        <div className={styles.scoreCircle}>
          <svg viewBox="0 0 36 36" className={styles.circularChart}>
            <path
              className={styles.circleBg}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={aprobado ? styles.circleSuccess : styles.circleFail}
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className={styles.percentageText}>
              {percentage}%
            </text>
          </svg>
        </div>

        <p className={styles.scoreText}>
          Respuestas correctas: <strong>{score} de {totalPreguntas}</strong>
        </p>

        {aprobado ? (
          <>
            <p className={styles.feedbackText}>
              Has aprobado el Examen Final de <strong>{cursoTitulo}</strong> con un{" "}
              <strong>{percentage}%</strong> de logro (mínimo {umbral}%).
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
              <strong>{percentage}%</strong> y necesitas un {umbral}% para
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

            <p className={styles.feedbackHint}>
              Te recomendamos repasar los módulos indicados antes de intentar de nuevo.
            </p>
          </>
        )}

        <div className={styles.resultActions}>
          {!aprobado && onRetry && (
            <button onClick={onRetry} className={styles.btnPrimary}>
              ↻ Reintentar Examen
            </button>
          )}
          {volverHref && (
            <Link href={volverHref} className={styles.btnSecondary}>
              🎓 Volver al Curso
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
