'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './VideoTracker.module.css'

interface VideoTrackerProps {
  url: string
  onUnlockNext: () => void
  title?: string
  minWatchSeconds?: number  // segundos mínimos antes de poder avanzar (default: 30)
  isAlreadyCompleted?: boolean // bypass de cuenta regresiva para repasos
  isAdmin?: boolean // bypass total para administradores y docentes
}

// Convierte cualquier URL de YouTube al ID del video
function getYouTubeId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/watch\?v=([^?&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
    /youtube\.com\/shorts\/([^?&\s]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function VideoTracker({ url, onUnlockNext, title, minWatchSeconds = 1, isAlreadyCompleted = false, isAdmin = false }: VideoTrackerProps) {
  const isBypassed = isAlreadyCompleted || isAdmin
  const [hasStarted, setHasStarted] = useState(isBypassed)
  const [unlocked, setUnlocked] = useState(false)
  const [secondsWatched, setSecondsWatched] = useState(isBypassed ? minWatchSeconds : 0)
  const intervalRef = useRef<any>(null)

  const videoId = getYouTubeId(url)

  // Cuando el usuario da play, iniciamos el contador
  const handlePlay = () => {
    setHasStarted(true)
    // Empezar a contar segundos de visionado
    intervalRef.current = setInterval(() => {
      setSecondsWatched(prev => {
        const next = prev + 1
        if (next >= minWatchSeconds && !unlocked) {
          // Desbloqueamos automáticamente al llegar al mínimo
          clearInterval(intervalRef.current)
        }
        return next
      })
    }, 1000)
  }

  // Limpiar el interval al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleContinue = () => {
    setUnlocked(true)
    if (intervalRef.current) clearInterval(intervalRef.current)
    onUnlockNext()
  }

  if (!videoId) {
    return (
      <div className={styles.videoContainer}>
        <div className={styles.errorState} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
          <p style={{ color: '#ef4444' }}>⚠️ URL de video no válida o pendiente</p>
          <code>{url || 'URL Vacía'}</code>
          <button 
            onClick={onUnlockNext}
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#00f0ff', color: 'black', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
          >
            Saltar video (Modo Desarrollo) →
          </button>
        </div>
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
  const progress = Math.min(100, (secondsWatched / minWatchSeconds) * 100)
  const isReady = secondsWatched >= minWatchSeconds
  const remaining = Math.max(0, minWatchSeconds - secondsWatched)

  return (
    <div className={styles.videoContainer}>

      {/* Player de YouTube — siempre visible en 16:9 */}
      <div className={styles.playerWrapper}>
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title || 'Video Curso APRECAP'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      {/* Portada Sarmat — flota encima hasta que el usuario hace click */}
      {!hasStarted && (
        <div
          className={styles.overlay}
          onClick={handlePlay}
          role="button"
          aria-label="Iniciar Clase"
        >
          <div className={styles.overlayContent}>
            <Image
              src="/logo/logo.png"
              alt="APRECAP Logo"
              width={160}
              height={160}
              className={styles.logo}
              priority
            />
            <h3>{title || 'Video de Entrenamiento'}</h3>
            <div className={styles.sarmatTag}>
              <span>◉</span> APRECAP Capacitaciones
            </div>
          </div>
        </div>
      )}

      {/* Barra de progreso y botón continuar */}
      <div className={styles.progressContainer}>

        {/* Banner de Advertencia - Oculto si ya se completó o si es Admin */}
        {hasStarted && !unlocked && !isAlreadyCompleted && !isAdmin && (
          <div className={styles.warningBanner}>
            <span className={styles.warningIcon}>⚠️</span>
            <div className={styles.warningText}>
              <strong>ATENCIÓN: REQUISITO OBLIGATORIO</strong>
              <p>Por normativa, es obligatorio visualizar la clase completa para que el sistema libere el acceso al material de estudio o a la evaluación (Mínimo {minWatchSeconds} segundos requeridos en plataforma).</p>
            </div>
          </div>
        )}

        {hasStarted && !unlocked && !isAlreadyCompleted && !isAdmin && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
            <div className={styles.unlockMarker} style={{ left: '100%' }} />
          </div>
        )}

        <div className={styles.progressFooter}>
          {!hasStarted && (
            <>
              <p className={styles.progressText}>
                Haz click en la portada para iniciar el video
              </p>
              {/* Botón de inicio especial para móviles fuera del área de video */}
              <button
                className={`${styles.playButton} ${styles.mobileOnly}`}
                onClick={handlePlay}
              >
                ▶ Iniciar Clase
              </button>
            </>
          )}

          {hasStarted && !isReady && !isAlreadyCompleted && !isAdmin && (
            <p className={styles.progressText}>
              ⏱ Podrás continuar en <strong style={{ color: '#00f0ff' }}>{remaining}s</strong>
            </p>
          )}

          {hasStarted && (isReady || isAlreadyCompleted || isAdmin) && !unlocked && (
            <button className={styles.continueBtn} onClick={handleContinue}>
              Continuar al siguiente paso {isAdmin ? '(Admin)' : isAlreadyCompleted ? '(Repaso)' : '→'}
            </button>
          )}

          {unlocked && (
            <p className={`${styles.progressText} ${styles.unlocked}`}>
              ✅ ¡Siguiente etapa desbloqueada!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
