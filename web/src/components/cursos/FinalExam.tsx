'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import {
  EXAMEN_UMBRAL_APROBACION,
  calcularPorcentaje,
  getExamenFinalPreguntas,
  type PreguntaExamenFinal,
} from '@/lib/questionBanks/os10'
import styles from './FinalExam.module.css'

interface FinalExamProps {
  cursoSlug?: string
  cursoTitulo?: string
  volverHref?: string
  modoDemo?: boolean
}

interface PreguntaOrdenada extends PreguntaExamenFinal {
  ordenVF: boolean[]
}

const PREGUNTAS_POR_PAGINA = 10

const emptySubscribe = () => () => {}
let preguntasCache: PreguntaOrdenada[] | null = null

function getClientSnapshot(): PreguntaOrdenada[] {
  if (!preguntasCache) {
    preguntasCache = getExamenFinalPreguntas().map((p) => ({
      ...p,
      ordenVF: Math.random() < 0.5 ? [true, false] : [false, true],
    }))
  }
  return preguntasCache
}

function getServerSnapshot(): PreguntaOrdenada[] | null {
  return null
}

interface ModuleFeedback {
  titulo: string
  falladas: number
  total: number
}

function getFailedModules(
  preguntas: PreguntaOrdenada[],
  respuestas: Record<string, boolean>
): ModuleFeedback[] {
  const mapa: Record<string, { falladas: number; total: number }> = {}
  for (const p of preguntas) {
    if (!mapa[p.tituloModulo]) mapa[p.tituloModulo] = { falladas: 0, total: 0 }
    mapa[p.tituloModulo].total++
    if (respuestas[p.id] !== p.respuestaCorrecta) mapa[p.tituloModulo].falladas++
  }
  return Object.entries(mapa)
    .filter(([, v]) => v.falladas > 0)
    .map(([titulo, v]) => ({ titulo, falladas: v.falladas, total: v.total }))
    .sort((a, b) => b.falladas - a.falladas)
}

export default function FinalExam({ cursoSlug, cursoTitulo, volverHref, modoDemo = false }: FinalExamProps) {
  const preguntas = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )
  const [currentPage, setCurrentPage] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [passed, setPassed] = useState(false)
  const [failedModules, setFailedModules] = useState<ModuleFeedback[]>([])
  const [showMissingWarning, setShowMissingWarning] = useState(false)

  const totalPaginas = Math.ceil((preguntas?.length ?? 0) / PREGUNTAS_POR_PAGINA)
  const preguntasPagina = useMemo(() => {
    if (!preguntas) return []
    const inicio = currentPage * PREGUNTAS_POR_PAGINA
    return preguntas.slice(inicio, inicio + PREGUNTAS_POR_PAGINA)
  }, [preguntas, currentPage])

  const respondidas = Object.keys(respuestas).length
  const isAllAnswered = preguntas !== null && respondidas === preguntas.length

  const handleSelect = (id: string, val: boolean) => {
    if (submitted) return
    setRespuestas((prev) => ({ ...prev, [id]: val }))
  }

  const attemptSubmit = () => {
    if (isAllAnswered) {
      submitExam()
    } else {
      setShowMissingWarning(true)
    }
  }

  const submitExam = () => {
    if (!preguntas) return
    let correctCount = 0
    for (const p of preguntas) {
      if (respuestas[p.id] === p.respuestaCorrecta) correctCount++
    }
    const pct = calcularPorcentaje(correctCount, preguntas.length)
    const aprobado = modoDemo || pct >= EXAMEN_UMBRAL_APROBACION

    setScore(correctCount)
    setPercentage(pct)
    setPassed(aprobado)
    setFailedModules(getFailedModules(preguntas, respuestas))
    setSubmitted(true)

    try {
      localStorage.setItem(`aprecap_examen_${cursoSlug || 'curso'}_pct`, String(pct))
      localStorage.setItem(
        `aprecap_examen_${cursoSlug || 'curso'}_aprobado`,
        aprobado ? 'true' : 'false'
      )
    } catch {
      /* localStorage no disponible */
    }

    if (aprobado) {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#22c55e', '#ff1212', '#ffffff'],
      })
    }
  }

  const aprobarDemo = () => {
    if (!preguntas) return
    setScore(preguntas.length)
    setPercentage(100)
    setPassed(true)
    setFailedModules([])
    setSubmitted(true)
    try {
      localStorage.setItem(`aprecap_examen_${cursoSlug || 'curso'}_pct`, '100')
      localStorage.setItem(
        `aprecap_examen_${cursoSlug || 'curso'}_aprobado`,
        'true'
      )
    } catch {
      /* localStorage no disponible */
    }
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00e5ff', '#22c55e', '#ff1212', '#ffffff'],
    })
  }

  const handleRetry = () => {
    window.location.reload()
  }

  if (!preguntas) {
    return (
      <div className={styles.examContainer}>
        <p className={styles.feedbackText}>Cargando banco de preguntas...</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className={styles.examContainer}>
        <div className={`${styles.resultCard} ${passed ? styles.resultSuccess : styles.resultFail}`}>
          <h2 className={styles.resultTitle}>{passed ? '¡Felicitaciones!' : 'Lo sentimos'}</h2>

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
                Has aprobado el Examen Final de{' '}
                <strong>{cursoTitulo || 'Guardia de Seguridad OS-10'}</strong> con un{' '}
                <strong>{percentage}%</strong> de logro (mínimo {EXAMEN_UMBRAL_APROBACION}%).
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
              <div className={styles.resultActions}>
                {volverHref && (
                  <Link href={volverHref} className={styles.btnPrimary}>
                    🎓 Volver al Curso
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <p className={styles.feedbackText}>
                No has superado el examen. Tu porcentaje fue del{' '}
                <strong>{percentage}%</strong> y necesitas un {EXAMEN_UMBRAL_APROBACION}% para
                aprobar.
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
                          {m.falladas !== 1 ? 's' : ''} de este módulo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className={styles.feedbackHint}>
                Te recomendamos volver a los módulos indicados y repasar el material antes de
                intentarlo nuevamente.
              </p>

              <div className={styles.resultActions}>
                <button onClick={handleRetry} className={styles.btnPrimary}>
                  ↻ Reintentar Examen
                </button>
                {volverHref && (
                  <Link href={volverHref} className={styles.btnSecondary}>
                    📖 Volver al Curso
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.examContainer}>
      <div className={styles.header}>
        <div>
          <span className={styles.headerTag}>Examen Final OS-10 — Verdadero / Falso</span>
          <h3 className={styles.headerTitle}>
            {cursoTitulo || 'Evaluación de Certificación Final'}
          </h3>
        </div>
        <div className={styles.headerProgress}>
          <span className={styles.counter}>
            Respondidas: {respondidas} / {preguntas.length}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(respondidas / preguntas.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {modoDemo && (
        <div className={styles.demoBox}>
          <span className={styles.demoBadge}>🧪 MODO DEMO</span>
          <p className={styles.demoText}>
            Demostración para clientes: puedes responder el examen normalmente o aprobar de
            inmediato sin responder.
          </p>
          <button onClick={aprobarDemo} className={styles.demoPassBtn}>
            🏆 Aprobar sin responder (Demo)
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <div className={styles.questionsList}>
            {preguntasPagina.map((p, i) => {
              const num = currentPage * PREGUNTAS_POR_PAGINA + i + 1
              const userResp = respuestas[p.id]
              return (
                <div key={p.id} className={styles.questionCard}>
                  <div className={styles.questionHeader}>
                    <span className={styles.questionNumber}>{num}</span>
                    <div className={styles.questionBody}>
                      <p className={styles.questionText}>{p.afirmacion}</p>
                      <span className={styles.questionModule}>
                        {p.tituloModulo} · Módulo {p.modulo}
                      </span>
                    </div>
                  </div>
                  <div className={styles.vfButtons}>
                    {p.ordenVF.map((val, k) => (
                      <button
                        key={k}
                        disabled={submitted}
                        onClick={() => handleSelect(p.id, val)}
                        className={`${styles.vfBtn} ${
                          userResp === val
                            ? val
                              ? styles.vfVerdaderoSel
                              : styles.vfFalsoSel
                            : ''
                        }`}
                      >
                        {val ? '✓ VERDADERO' : '✗ FALSO'}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.footerControls}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className={styles.navBtn}
        >
          ← Anterior
        </button>

        <div className={styles.gridMap}>
          {Array.from({ length: totalPaginas }).map((_, i) => {
            const inicio = i * PREGUNTAS_POR_PAGINA
            const fin = Math.min(inicio + PREGUNTAS_POR_PAGINA, preguntas.length)
            const respondidasPagina = preguntas
              .slice(inicio, fin)
              .filter((p) => respuestas[p.id] !== undefined).length
            const completa = respondidasPagina === fin - inicio
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`${styles.dot} ${completa ? styles.dotAnswered : ''} ${
                  currentPage === i ? styles.dotActive : ''
                }`}
                aria-label={`Ir a página ${i + 1}`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        {currentPage < totalPaginas - 1 ? (
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPaginas - 1, p + 1))}
            className={`${styles.navBtn} ${styles.navBtnPrimary}`}
          >
            Siguiente →
          </button>
        ) : (
          <button onClick={attemptSubmit} className={styles.submitBtn}>
            {isAllAnswered ? 'ENTREGAR EXAMEN' : 'Faltan preguntas por responder'}
          </button>
        )}
      </div>

      {showMissingWarning && (
        <div className={styles.warningOverlay}>
          <div className={styles.warningModal}>
            <h3>Preguntas sin responder</h3>
            <p>
              Te quedan {preguntas.length - respondidas} preguntas por responder. Puedes
              navegar por las páginas del examen para revisarlas. ¿Deseas entregar igualmente?
            </p>
            <div className={styles.warningBtns}>
              <button
                onClick={() => setShowMissingWarning(false)}
                className={styles.warningBtnSecondary}
              >
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
  )
}
