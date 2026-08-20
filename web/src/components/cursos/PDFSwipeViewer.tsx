'use client'

import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import styles from './PDFSwipeViewer.module.css'
import { useAuth } from '@/contexts/AuthContext'
import defaultLogoConfig from './logoConfig.json'

// Configurar el worker de PDF.js localmente (evita latencia y bloqueos de CDN unpkg en móviles)
if (typeof window !== 'undefined' && pdfjs) {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
}

interface PDFSwipeViewerProps {
  url: string
  onFinishReading: () => void
}

// Los PDFs alojados en Sanity se sirven vía proxy local para evitar CORS
function resolverUrlPdf(url: string): string {
  if (!url) return ''
  if (url.startsWith('https://cdn.sanity.io/files/')) {
    return `/api/pdf?url=${encodeURIComponent(url)}`
  }
  return url
}

export default function PDFSwipeViewer({ url, onFinishReading }: PDFSwipeViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [direction, setDirection] = useState(0) // 1 = right, -1 = left
  const [hasFinishedOnce, setHasFinishedOnce] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentScale, setCurrentScale] = useState<number>(1)
  const [pageWidth, setPageWidth] = useState<number>(360)
  
  const containerRef = useRef<HTMLDivElement>(null)

  // -- Configuración de Logo Drag & Drop --
  const { userData } = useAuth();
  const isDevOrSuperAdmin = process.env.NODE_ENV === 'development' || userData?.rol === 'superadmin';
  const [logoConfig, setLogoConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('sarmat_logo_config_dev');
      if (local) {
        try {
          return JSON.parse(local);
        } catch {
          return defaultLogoConfig;
        }
      }
    }
    return defaultLogoConfig;
  });

  const copyConfigToClipboardOrSave = async () => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const res = await fetch('/api/dev/update-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logoConfig)
        });
        if (res.ok) {
          alert('Entorno Local: ¡El archivo logoConfig.json ha sido modificado en vivo! ✅ El código fuente ya incluye tus cambios permanentemente.');
        } else {
          alert('Error escribiendo en disco local.');
        }
      } catch(e) {
        console.error(e);
      }
    } else {
      const codeString = `x: ${Math.round(logoConfig.x)}, y: ${Math.round(logoConfig.y)}, w: ${logoConfig.w}, h: ${logoConfig.h}`;
      navigator.clipboard.writeText(codeString);
      alert(`Producción: ¡Datos guardados en LocalStorage! 📋\n\n${codeString}\n\n(Toma captura de este cuadro o manda los números al desarrollador).`);
    }
  };

  const resetLogoConfig = () => {
    localStorage.removeItem('sarmat_logo_config_dev');
    setLogoConfig(defaultLogoConfig);
  };

  const adjustSize = (axis: 'w' | 'h', delta: number) => {
    setLogoConfig(prev => {
      const nw = { ...prev, [axis]: Math.max(10, prev[axis] + delta) };
      localStorage.setItem('sarmat_logo_config_dev', JSON.stringify(nw));
      return nw;
    });
  };

  const updateDimensions = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      if (window.innerWidth <= 768) {
        // En móviles y tablets ajustamos al ancho exacto disponible para evitar desbordes
        setPageWidth(Math.max(280, Math.min(containerWidth - 16, window.innerWidth - 32)));
      } else if (document.fullscreenElement || isFullscreen) {
        setPageWidth(Math.min(containerWidth - 40, 1000));
      } else {
        setPageWidth(Math.min(containerWidth - 32, 850));
      }
    } else {
      if (window.innerWidth <= 768) {
        setPageWidth(Math.max(280, window.innerWidth - 32));
      } else {
        setPageWidth(850);
      }
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const handleFullscreenChange = () => {
      const isDocFull = !!(document.fullscreenElement || (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement);
      setIsFullscreen(isDocFull);
      setTimeout(updateDimensions, 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement && !isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen().catch(() => {});
        }
        setIsFullscreen(true);
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error attempting to toggle fullscreen', err);
      setIsFullscreen(prev => !prev);
    }
    setTimeout(updateDimensions, 100);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    updateDimensions();
  }

  const changePage = (offset: number) => {
    setDirection(offset > 0 ? 1 : -1);

    const nextPage = Math.max(1, Math.min(pageNumber + offset, numPages || 1));
    setPageNumber(nextPage);

    if (nextPage === numPages && !hasFinishedOnce) {
      setHasFinishedOnce(true);
      onFinishReading();
    }
  };

  // Gestos táctiles para móviles (Solo cambia de página si no está con zoom ampliado)
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentScale <= 1.05) changePage(1);
    },
    onSwipedRight: () => {
      if (currentScale <= 1.05) changePage(-1);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: false,
    trackMouse: false
  });

  // Variantes de animación para framer-motion
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  if (!url) {
    return (
      <div className={styles.pdfViewerContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', background: '#111827', color: 'white' }}>
        <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.2rem' }}>⚠️ Documento PDF no configurado</p>
        <button 
          onClick={onFinishReading}
          style={{ padding: '0.75rem 1.5rem', background: '#00f0ff', color: 'black', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
        >
          Saltar documento (Modo Desarrollo) →
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.pdfViewerContainer} ${isFullscreen ? styles.fullscreenMode : ''}`} 
      ref={containerRef}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>📄</div>
          <h3>
            Material de Estudio
            <span className="hidden sm:block">Desliza o usa los botones para navegar</span>
            <span className="sm:hidden">Pinch con 2 dedos para zoom</span>
          </h3>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.counter}>
            {pageNumber} / {numPages || '--'}
          </p>
          <button 
            className={styles.fullscreenBtn} 
            onClick={toggleFullscreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
            type="button"
          >
            {isFullscreen ? '↙️' : '↗️'}
          </button>
        </div>
      </div>

      <div className={styles.documentWrapper} {...handlers}>
        
        {/* Logo overlay drag & drop */}
        {isFullscreen && (
          <>
            <motion.div 
              drag={isDevOrSuperAdmin}
              dragMomentum={false}
              animate={{ x: logoConfig.x, y: logoConfig.y }}
              onDragEnd={(e, info) => {
                setLogoConfig(prev => {
                  const nw = {
                    ...prev,
                    x: prev.x + info.offset.x,
                    y: prev.y + info.offset.y
                  };
                  localStorage.setItem('sarmat_logo_config_dev', JSON.stringify(nw));
                  return nw;
                });
              }}
              style={{ 
                position: 'absolute', 
                bottom: '15px', 
                right: '15px', 
                zIndex: 50, 
                background: 'white', 
                padding: '5px 8px', 
                borderRadius: '6px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                pointerEvents: isDevOrSuperAdmin ? 'auto' : 'none',
                cursor: isDevOrSuperAdmin ? 'grab' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <img src="/logo/logo.png" alt="APRECAP Capacitaciones" style={{ width: `${logoConfig.w}px`, height: `${logoConfig.h}px`, pointerEvents: 'none', display: 'block' }} />
            </motion.div>

            {/* Panel de Configuración (SuperAdmin y Local Dev) */}
            {isDevOrSuperAdmin && (
              <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', gap: '15px', background: 'rgba(0,0,0,0.85)', padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(0,240,255,0.4)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: 'max-content' }}>
                <span style={{color: '#00f0ff', fontSize: '0.85rem', fontWeight: 'bold'}}>⚙️ Config LOGO:</span>
                
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#ffcc00', fontSize: '0.8rem', marginRight: '10px' }}>
                  <span>X: {Math.round(logoConfig.x)}</span>
                  <span>Y: {Math.round(logoConfig.y)}</span>
                </div>

                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <span style={{ color: '#aaa', fontSize: '0.8rem' }}>Ancho:</span>
                  <button onClick={() => adjustSize('w', -5)} style={{ background: '#374151', color: 'white', width: '24px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>-</button>
                  <span style={{ color: 'white', fontSize: '0.8rem', width: '30px', textAlign: 'center' }}>{logoConfig.w}</span>
                  <button onClick={() => adjustSize('w', 5)} style={{ background: '#374151', color: 'white', width: '24px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>+</button>
                </div>

                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <span style={{ color: '#aaa', fontSize: '0.8rem' }}>Alto:</span>
                  <button onClick={() => adjustSize('h', -5)} style={{ background: '#374151', color: 'white', width: '24px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>-</button>
                  <span style={{ color: 'white', fontSize: '0.8rem', width: '30px', textAlign: 'center' }}>{logoConfig.h}</span>
                  <button onClick={() => adjustSize('h', 5)} style={{ background: '#374151', color: 'white', width: '24px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>+</button>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
                    <button onClick={copyConfigToClipboardOrSave} style={{ background: '#0ea5e9', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>{process.env.NODE_ENV === 'development' ? 'Guardar Código' : 'Copiar 📋'}</button>
                    <button onClick={resetLogoConfig} style={{ background: '#ef4444', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Reset</button>
                </div>
              </div>
            )}
          </>
        )}

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
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={pageNumber}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.2 },
                  opacity: { duration: 0.15 }
                }}
                className={styles.pageMotion}
              >
                {numPages > 0 && (
                  <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    centerOnInit
                    wheel={{ disabled: false }}
                    doubleClick={{ disabled: false, mode: "toggle" }}
                    pinch={{ disabled: false, step: 5 }}
                    panning={{ disabled: false }}
                    onTransform={(ref) => {
                      if (ref?.state?.scale) {
                        setCurrentScale(ref.state.scale);
                      }
                    }}
                  >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <div className={styles.transformInner}>
                        <TransformComponent wrapperClass={styles.transformWrapper} contentClass={styles.transformContent}>
                          <Page 
                            pageNumber={pageNumber} 
                            width={pageWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className={styles.pdfPage}
                          />
                        </TransformComponent>

                        {/* Botones de Zoom flotantes SOLO para PC / Desktop (Ocultos en celulares y tablets) */}
                        <div className={styles.desktopZoomControls}>
                          <button
                            onClick={() => zoomIn()}
                            className={styles.zoomBtn}
                            title="Acercar (Zoom +)"
                            type="button"
                          >
                            +
                          </button>
                          <button
                            onClick={() => zoomOut()}
                            className={styles.zoomBtn}
                            title="Alejar (Zoom -)"
                            type="button"
                          >
                            -
                          </button>
                          <button
                            onClick={() => resetTransform()}
                            className={styles.zoomBtn}
                            title="Restablecer tamaño"
                            type="button"
                          >
                            ↺
                          </button>
                        </div>
                      </div>
                    )}
                  </TransformWrapper>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Document>
      </div>

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
                style={{ width: `${(pageNumber / numPages) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        <button 
          disabled={pageNumber >= numPages} 
          onClick={() => changePage(1)}
          className={`${styles.controlBtn} ${pageNumber === numPages ? styles.hidden : ''}`}
          type="button"
        >
          Siguiente &#8594;
        </button>
      </div>
    </div>
  )
}
