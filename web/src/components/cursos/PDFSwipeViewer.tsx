'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import styles from './PDFSwipeViewer.module.css'
import { useAuth } from '@/contexts/AuthContext'
import defaultLogoConfig from './logoConfig.json'

// Configurar el worker de PDF.js localmente
if (typeof window !== 'undefined' && pdfjs) {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
}

interface LogoConfig {
  x: number
  y: number
  w: number
  h: number
}

interface PDFSwipeViewerProps {
  url: string
  onFinishReading: () => void
  isAdmin?: boolean
}

// Los PDFs alojados en Sanity se sirven vía proxy local para evitar CORS
function resolverUrlPdf(url: string): string {
  if (!url) return ''
  if (url.startsWith('https://cdn.sanity.io/files/')) {
    return `/api/pdf?url=${encodeURIComponent(url)}`
  }
  return url
}

export default function PDFSwipeViewer({ url, onFinishReading, isAdmin = false }: PDFSwipeViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [direction, setDirection] = useState(0)
  const [hasFinishedOnce, setHasFinishedOnce] = useState(isAdmin)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pageAspectRatio, setPageAspectRatio] = useState<number>(1.414) // default A4 (alto / ancho)
  const [isA4Format, setIsA4Format] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [pageWidth, setPageWidth] = useState<number>(700)

  const containerRef = useRef<HTMLDivElement>(null)
  const documentWrapperRef = useRef<HTMLDivElement>(null)

  // -- Configuración de Logo Drag & Drop --
  const { userData } = useAuth()
  const isDevOrSuperAdmin = process.env.NODE_ENV === 'development' || userData?.rol === 'superadmin'
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('sarmat_logo_config_dev')
      if (local) {
        try {
          return JSON.parse(local) as LogoConfig
        } catch {
          return defaultLogoConfig as LogoConfig
        }
      }
    }
    return defaultLogoConfig as LogoConfig
  })

  // Cálculo adaptable del tamaño de página según resolución y proporción (A4 vs Presentación)
  const updatePageDimensions = useCallback(() => {
    if (!documentWrapperRef.current) return
    const containerW = documentWrapperRef.current.clientWidth || window.innerWidth
    const availableHeight = isFullscreen
      ? window.innerHeight - 150
      : Math.min(window.innerHeight * 0.72, 780)

    let optimalWidth: number
    if (isA4Format) {
      // Formato A4 Vertical: la altura disponible determina el ancho para que la hoja calce completa
      const widthFromHeight = availableHeight / pageAspectRatio
      optimalWidth = Math.min(containerW - 32, widthFromHeight)
    } else {
      // Formato Presentación / Horizontal (16:9 / 4:3)
      const widthFromHeight = availableHeight * (1 / pageAspectRatio)
      optimalWidth = Math.min(containerW - 32, widthFromHeight, 1050)
    }

    setPageWidth(Math.max(260, Math.round(optimalWidth)))
  }, [isFullscreen, isA4Format, pageAspectRatio])

  useEffect(() => {
    updatePageDimensions()
    window.addEventListener('resize', updatePageDimensions)
    return () => window.removeEventListener('resize', updatePageDimensions)
  }, [updatePageDimensions])

  // Al cargar una página, detectar automáticamente si es A4 Vertical o Presentación Horizontal
  const onPageLoadSuccess = (page: { originalWidth: number; originalHeight: number }) => {
    if (page.originalWidth && page.originalHeight) {
      const ratio = page.originalHeight / page.originalWidth
      setPageAspectRatio(ratio)
      setIsA4Format(ratio > 1.1) // ratio > 1.1 es vertical / A4, <= 1.1 es apaisado / presentación
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Error toggling fullscreen', err)
      setIsFullscreen((prev) => !prev)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      updatePageDimensions()
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [updatePageDimensions])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const changePage = (offset: number) => {
    setDirection(offset > 0 ? 1 : -1)
    const nextPage = Math.max(1, Math.min(pageNumber + offset, numPages || 1))
    setPageNumber(nextPage)

    if (nextPage === numPages && !hasFinishedOnce) {
      setHasFinishedOnce(true)
      onFinishReading()
    }
  }

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.7, Math.min(prev + delta, 2.0)))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  // Gestos swipe para celulares y tablets
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => changePage(1),
    onSwipedRight: () => changePage(-1),
    swipeDuration: 500,
    preventScrollOnSwipe: false,
    trackMouse: false,
  })

  const setWrapperRef = useCallback(
    (el: HTMLDivElement | null) => {
      swipeHandlers.ref(el)
      ;(documentWrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    },
    [swipeHandlers]
  )

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 600 : -600,
      opacity: 0,
    }),
  }

  if (!url) {
    return (
      <div className={styles.pdfViewerContainer} style={{ padding: '4rem', background: '#080d14', color: 'white', textAlign: 'center' }}>
        <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.2rem' }}>⚠️ Documento PDF no configurado</p>
        <button 
          onClick={onFinishReading}
          style={{ padding: '0.75rem 1.5rem', background: '#00f0ff', color: 'black', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
        >
          Saltar documento →
        </button>
      </div>
    )
  }

  const effectiveWidth = Math.round(pageWidth * zoomLevel)

  return (
    <div 
      className={`${styles.pdfViewerContainer} ${isFullscreen ? styles.fullscreenMode : ''}`} 
      ref={containerRef}
    >
      {/* Cabecera del Visor */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>📄</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>
              Material de Estudio Oficial
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600 }}>
              {isA4Format ? '📄 Formato Hoja A4 Vertical' : '🖥️ Formato Presentación Panorámica'} · Adaptativo
            </span>
          </div>
        </div>

        {/* Controles de Zoom, Paginador y Pantalla Completa */}
        <div className={styles.headerRight}>
          {/* Controles de Zoom */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', padding: '2px' }}>
            <button
              onClick={() => handleZoom(-0.15)}
              style={{ background: 'transparent', color: '#d1d5db', border: 'none', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              title="Reducir zoom (-)"
            >
              −
            </button>
            <button
              onClick={resetZoom}
              style={{ background: 'transparent', color: '#f3f4f6', border: 'none', padding: '0 6px', fontSize: '0.75rem', fontFamily: 'monospace', cursor: 'pointer' }}
              title="Restablecer zoom óptimo"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => handleZoom(0.15)}
              style={{ background: 'transparent', color: '#d1d5db', border: 'none', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              title="Aumentar zoom (+)"
            >
              +
            </button>
          </div>

          <p className={styles.counter}>
            {pageNumber} / {numPages || '--'}
          </p>

          <button 
            className={styles.fullscreenBtn} 
            onClick={toggleFullscreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
          >
            {isFullscreen ? '↙️' : '↗️'}
          </button>
        </div>
      </div>

      {/* Área del Documento */}
      <div 
        ref={setWrapperRef} 
        className={styles.documentWrapper} 
      >
        <Document
          file={resolverUrlPdf(url)}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Cargando documento APRECAP...</p>
            </div>
          }
          error={<p className={styles.error}>Error al cargar el PDF.</p>}
        >
          <div className={styles.pageContainer}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={pageNumber}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={styles.pageMotion}
              >
                {numPages > 0 && (
                  <div 
                    style={{ 
                      boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)',
                      borderRadius: isA4Format ? '3px' : '8px',
                      overflow: 'hidden',
                      background: 'white',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Page 
                      pageNumber={pageNumber} 
                      width={effectiveWidth}
                      onLoadSuccess={onPageLoadSuccess}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className={styles.pdfPage}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Document>
      </div>

      {/* Controles de Navegación */}
      <div className={styles.controls}>
        <button 
          disabled={pageNumber <= 1} 
          onClick={() => changePage(-1)}
          className={styles.controlBtn}
          type="button"
        >
          &#8592; Anterior
        </button>

        <div className={styles.progressDots}>
          {hasFinishedOnce ? (
            <span className={styles.finishedBadge}>✓ Lectura Completada</span>
          ) : (
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${(pageNumber / (numPages || 1)) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        <button 
          disabled={pageNumber >= (numPages || 1)} 
          onClick={() => changePage(1)}
          className={`${styles.controlBtn} ${pageNumber === numPages ? styles.hidden : ''}`}
          type="button"
        >
          Siguiente &#8594;
        </button>

        {isAdmin && (
          <button
            onClick={() => {
              setHasFinishedOnce(true)
              onFinishReading()
            }}
            className={styles.controlBtn}
            style={{ background: '#00e5ff', color: '#000', fontWeight: 'bold' }}
            type="button"
            title="Avanzar directamente al siguiente paso (Modo Administrador)"
          >
            ⚡ Avanzar (Admin) →
          </button>
        )}
      </div>
    </div>
  )
}
