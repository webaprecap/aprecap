'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { PreguntaAlternativa } from '@/lib/questionBanks/types'
import {
  MINIQUIZ_UMBRAL_APROBACION,
  calcularPorcentaje,
} from '@/lib/questionBanks/os10'
import { seleccionarAlternativas } from '@/lib/questionBanks/types'
import styles from './MiniQuiz.module.css'

interface MiniQuizProps {
  banco: PreguntaAlternativa[]
  tituloModulo?: string
  onPass: () => void
  onFail?: (porcentaje: number) => void
  modoDemo?: boolean
}

const CANTIDAD_PREGUNTAS = 5
const LETRAS = ['A', 'B', 'C', 'D']

let preguntasCache: { bancoId: string; value: PreguntaAlternativa[] } | null = null
const preguntasListeners = new Set<() => void>()

function getBancoId(banco: PreguntaAlternativa[]): string {
  return banco.map((p) => p.id).join('|')
}

function generarPreguntas(banco: PreguntaAlternativa[]): PreguntaAlternativa[] {
  const bancoId = getBancoId(banco)
  if (!preguntasCache || preguntasCache.bancoId !== bancoId) {
    preguntasCache = { bancoId, value: seleccionarAlternativas(banco, CANTIDAD_PREGUNTAS) }
  }
  return preguntasCache.value
}

function getClientSnapshot(banco: PreguntaAlternativa[]) {
  return () => generarPreguntas(banco)
}

function getServerSnapshot() {
  return null
}

function subscribe(cb: () => void) {
  preguntasListeners.add(cb)
  return () => preguntasListeners.delete(cb)
}

function emitRegenerate() {
  preguntasListeners.forEach((l) => l())
}

export default function MiniQuiz({ banco, tituloModulo, onPass, onFail, modoDemo = false }: MiniQuizProps) {
  const preguntasSnapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot(banco),
    getServerSnapshot
  )
  const [respuestas, setRespuestas] = useState<Record<number, string>>({})
  const [mostrarExplicacion, setMostrarExplicacion] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [passed, setPassed] = useState(false)

  const preguntas = preguntasSnapshot ?? []

  const handleSelect = (idx: number, opcion: string) => {
    if (submitted) return
    setRespuestas((prev) => ({ ...prev, [idx]: opcion }))
  }

  const toggleInfo = (idx: number) => {
    setMostrarExplicacion((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    preguntas.forEach((p, idx) => {
      if (respuestas[idx] === p.respuestaCorrecta) correctCount++
    })

    const pct = calcularPorcentaje(correctCount, preguntas.length)
    const isApproved = pct >= MINIQUIZ_UMBRAL_APROBACION

    setScore(correctCount)
    setPercentage(pct)
    setPassed(isApproved)
    setSubmitted(true)

    if (isApproved) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00e5ff', '#22c55e', '#ff1212'],
      })
    } else {
      onFail?.(pct)
    }
  }

  const handleRetry = () => {
    preguntasCache = { bancoId: getBancoId(banco), value: seleccionarAlternativas(banco, CANTIDAD_PREGUNTAS) }
    emitRegenerate()
    setRespuestas({})
    setMostrarExplicacion({})
    setSubmitted(false)
    setScore(0)
    setPercentage(0)
    setPassed(false)
  }

  const isAllAnswered = Object.keys(respuestas).length === preguntas.length

  if (preguntas.length === 0) return null

  return (
    <div className={styles.quizContainer}>
      <div className={styles.banner}>
        <div>
          <span className={styles.bannerTag}>
            Evaluación del Módulo
          </span>
          <h3 className={styles.bannerTitle}>
            {tituloModulo ? `MiniQuiz: ${tituloModulo}` : 'MiniQuiz del Módulo'}
          </h3>
        </div>
        <div className={styles.progressBox}>
          <span className={styles.progressLabel}>Respondidas</span>
          <span className={styles.progressValue}>
            {Object.keys(respuestas).length} / {preguntas.length}
          </span>
        </div>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${styles.resultCard} ${passed ? styles.resultPass : styles.resultFail}`}
        >
          <h4 className={styles.resultTitle}>
            {passed ? '¡Quiz Aprobado!' : 'Quiz No Aprobado'}
          </h4>
          <div className={styles.resultScore}>
            {score} / {preguntas.length}{' '}
            <span className={styles.resultPct}>({percentage}%)</span>
          </div>
          <p className={styles.resultHint}>
            {passed
              ? 'Dominas este módulo. Puedes avanzar al siguiente.'
              : `Necesitas al menos un ${MINIQUIZ_UMBRAL_APROBACION}% para aprobar. Repasa el material y vuelve a intentarlo.`}
          </p>
          <div className={styles.resultActions}>
            {passed ? (
              <button onClick={onPass} className={styles.btnPass}>
                Avanzar al Siguiente Módulo →
              </button>
            ) : (
              <button onClick={handleRetry} className={styles.btnRetry}>
                ↻ Reintentar Quiz
              </button>
            )}
          </div>
        </motion.div>
      )}

      <div className={styles.questionsList}>
        {preguntas.map((p, idx) => {
          const userResp = respuestas[idx]
          const isCorrect = submitted && userResp === p.respuestaCorrecta
          const isIncorrect = submitted && userResp !== undefined && userResp !== p.respuestaCorrecta

          return (
            <div
              key={p.id}
              className={`${styles.questionCard} ${
                submitted ? (isCorrect ? styles.cardCorrect : styles.cardWrong) : ''
              }`}
            >
              <div className={styles.questionHeader}>
                <div className={styles.questionNumber}>{idx + 1}</div>
                <p className={styles.questionText}>{p.pregunta}</p>
                {submitted && (
                  <button onClick={() => toggleInfo(idx)} className={styles.infoBtn}>
                    ℹ️ Explicación
                  </button>
                )}
              </div>

              <div className={styles.optionsGrid}>
                {p.opciones.map((opcion, i) => {
                  const isSelected = userResp === opcion
                  const isAnswer = submitted && opcion === p.respuestaCorrecta

                  let btnClass = styles.optionBtn
                  if (isSelected) btnClass += ` ${styles.optionSelected}`
                  if (isAnswer) btnClass += ` ${styles.optionCorrect}`
                  if (submitted && isSelected && !isAnswer) btnClass += ` ${styles.optionWrong}`

                  return (
                    <button
                      key={i}
                      disabled={submitted}
                      onClick={() => handleSelect(idx, opcion)}
                      className={btnClass}
                    >
                      <span className={styles.optionLetter}>{LETRAS[i]}</span>
                      <span className={styles.optionText}>{opcion}</span>
                    </button>
                  )
                })}
              </div>

              {(mostrarExplicacion[idx] || isIncorrect) && (
                <div className={styles.explainBox}>
                  <div className={styles.explainAnswer}>
                    ✅ Respuesta Correcta: <strong>{p.respuestaCorrecta}</strong>
                  </div>
                  <div className={styles.explainText}>
                    <strong>Fundamento:</strong> {p.explicacion}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!submitted && (
        <div className={styles.footer}>
          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className={`${styles.btnSubmit} ${isAllAnswered ? styles.btnSubmitActive : ''}`}
          >
            {isAllAnswered
              ? `Finalizar Quiz (${preguntas.length} respuestas)`
              : 'Faltan preguntas por responder'}
          </button>
        </div>
      )}
    </div>
  )
}
