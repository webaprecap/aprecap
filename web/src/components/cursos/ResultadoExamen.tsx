"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import styles from "./FinalExam.module.css";
import { CONTACTO } from "@/data/site";

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
  useEffect(() => {
    if (aprobado) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#0b1d3a", "#be123c", "#10b981", "#fbbf24"],
        });
      } catch {
        // Fallback si canvas-confetti no está soportado
      }
    }
  }, [aprobado]);

  const whatsappLogroUrl = `${CONTACTO.whatsappLink}?text=${encodeURIComponent(
    `Hola OTEC APRECAP, aprobé exitosamente el Examen Final de "${cursoTitulo}" con un ${percentage}% de logro y deseo coordinar la entrega de mi Certificado/Diploma Oficial.`
  )}`;

  return (
    <div className={styles.examContainer}>
      <div className={`${styles.resultCard} ${aprobado ? styles.resultSuccess : styles.resultFail}`}>
        <div className="text-center">
          <span className="text-4xl">{aprobado ? "🎉" : "📚"}</span>
          <h2 className={styles.resultTitle}>
            {aprobado ? "¡Felicitaciones! Curso Aprobado" : "Evaluación No Superada"}
          </h2>
        </div>

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
          <div className="space-y-4">
            <p className={styles.feedbackText}>
              Has aprobado el Examen Final de <strong>{cursoTitulo}</strong> con un{" "}
              <strong>{percentage}%</strong> de logro (mínimo requerido: {umbral}%).
            </p>
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              ✅ Tu aprobación académica ha quedado registrada exitosamente en el sistema de OTEC APRECAP.
            </p>

            {modoDemo && (
              <p className={styles.feedbackHint}>
                🧪 Resultado generado en modo demostración para presentación a clientes.
              </p>
            )}

            {/* Cuadro de Instrucciones para la Entrega del Certificado */}
            <div className="rounded-2xl border-2 border-apre-blue/20 bg-slate-50 p-5 text-left space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h3 className="text-sm font-extrabold text-apre-blue uppercase tracking-wide">
                  Emisión y Retiro de tu Diploma Oficial
                </h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Los diplomas y certificados oficiales son emitidos por la administración de APRECAP con
                firmas acreditadas y código QR institucional. Para coordinar la emisión y entrega:
              </p>

              <div className="space-y-2 text-xs text-gray-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-apre-red">1.</span>
                  <div>
                    <strong>Notifica tu logro por WhatsApp:</strong> Envía un mensaje directo a nuestra
                    coordinación académica para preparar tu certificado.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-apre-red">2.</span>
                  <div>
                    <strong>Retiro en oficinas centrales:</strong> Puedes acudir presencialmente a{" "}
                    <strong>{CONTACTO.direccion}</strong> ({CONTACTO.metro}), en horario de {CONTACTO.horario}.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappLogroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-xs font-black text-white transition hover:brightness-105 shadow-sm"
                >
                  <span>💬</span>
                  <span>Avisar mi Aprobación por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
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
          {aprobado && (
            <Link href="/panel/alumno" className={styles.btnPrimary}>
              🛡️ Ir a mi Portal de Alumno
            </Link>
          )}
          {volverHref && (
            <Link href={volverHref} className={styles.btnSecondary}>
              🎓 Volver al Material del Curso
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
