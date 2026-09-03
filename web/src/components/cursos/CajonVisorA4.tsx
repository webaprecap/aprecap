import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSwipeable } from "react-swipeable";
import type { DocumentoPDFOTEC } from "@/data/cursos-otec-laborales";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configuración local del worker de PDF.js
if (typeof window !== "undefined" && pdfjs) {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

interface CajonVisorA4Props {
  documentos: DocumentoPDFOTEC[];
  cursoTitulo: string;
}

export default function CajonVisorA4({
  documentos,
  cursoTitulo,
}: CajonVisorA4Props) {
  const [docActivoIndex, setDocActivoIndex] = useState(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1 = 100% / Ajuste natural
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>(650);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerAreaRef = useRef<HTMLDivElement>(null);

  const docActivo = documentos[docActivoIndex] || documentos[0];

  // Al cambiar de manual, reiniciar a página 1 y zoom por defecto
  const handleSelectDoc = (index: number) => {
    setDocActivoIndex(index);
    setPageNumber(1);
    setZoomLevel(1);
  };

  // Cálculo automático del ancho de la hoja A4 para que calce completa en cualquier resolución
  const updatePageWidth = useCallback(() => {
    if (!viewerAreaRef.current) return;
    const containerWidth = viewerAreaRef.current.clientWidth;
    const containerHeight = isFullscreen
      ? window.innerHeight - 110
      : Math.min(window.innerHeight * 0.75, 820);

    // Relación de aspecto A4: 1 : 1.414 (ancho / alto)
    // Para que la hoja calce completa en alto y ancho:
    const maxHeightWidth = containerHeight / 1.414;
    const availableWidth = Math.min(containerWidth - 32, maxHeightWidth);

    const baseWidth = Math.max(280, Math.min(availableWidth, 750));
    setPageWidth(baseWidth);
  }, [isFullscreen]);

  useEffect(() => {
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, [updatePageWidth]);

  // Manejo de pantalla completa
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Cerrar fullscreen con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === "ArrowRight") {
        setPageNumber((p) => Math.min(p + 1, numPages || 1));
      } else if (e.key === "ArrowLeft") {
        setPageNumber((p) => Math.max(p - 1, 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, numPages]);

  const onDocumentLoadSuccess = ({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    setPageNumber(1);
  };

  const changePage = (delta: number) => {
    setPageNumber((prev) => Math.max(1, Math.min(prev + delta, numPages || 1)));
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.7, Math.min(prev + delta, 2.0)));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => changePage(1),
    onSwipedRight: () => changePage(-1),
    swipeDuration: 500,
    preventScrollOnSwipe: false,
    trackMouse: false,
  });

  const setViewerAreaRef = useCallback(
    (el: HTMLDivElement | null) => {
      swipeHandlers.ref(el);
      (viewerAreaRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [swipeHandlers]
  );

  const resetZoom = () => {
    setZoomLevel(1);
  };

  if (!documentos || documentos.length === 0) {
    return null;
  }

  const effectiveWidth = Math.round(pageWidth * zoomLevel);

  return (
    <div className="space-y-6">
      {/* Selector de Manuales / Documentos con Nombres Reales */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-apre-blue flex items-center gap-2">
            <span>📄</span> Manuales y Documentos de Estudio ({documentos.length})
          </h3>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            Visor Digital A4
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {documentos.map((doc, idx) => {
            const isSelected = idx === docActivoIndex;
            return (
              <button
                key={doc.id}
                onClick={() => handleSelectDoc(idx)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition text-xs relative ${
                  isSelected
                    ? "border-apre-blue bg-apre-blue/5 shadow-xs ring-1 ring-apre-blue/20"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      doc.esPrograma
                        ? "bg-amber-100 text-amber-800"
                        : isSelected
                        ? "bg-apre-blue text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {doc.esPrograma ? "⭐ Programa" : `Doc ${idx + 1}`}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>

                <p
                  className={`mt-2 font-bold leading-snug line-clamp-2 ${
                    isSelected ? "text-apre-blue font-extrabold" : "text-gray-800"
                  }`}
                >
                  {doc.nombre}
                </p>

                {doc.descripcion && (
                  <p className="mt-1 text-[11px] text-gray-500 line-clamp-1">
                    {doc.descripcion}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenedor del Visor A4 Puro (Sin barras del navegador) */}
      <div
        ref={containerRef}
        className={`rounded-2xl border border-gray-200 bg-slate-900 overflow-hidden shadow-xl transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 z-50 flex flex-col bg-slate-950 p-2 sm:p-4 shadow-2xl"
            : "relative"
        }`}
      >
        {/* Barra superior de herramientas limpia */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-850 border-b border-slate-700/80 px-4 py-3 text-white">
          <div className="min-w-0 flex-1 flex items-center gap-2">
            <span className="text-base">📄</span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block truncate">
                {docActivo.esPrograma ? "Programa Oficial" : `Manual ${docActivoIndex + 1} de ${documentos.length}`}
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                {docActivo.nombre}
              </p>
            </div>
          </div>

          {/* Controles de Zoom, Paginación y Ampliar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Paginación */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
                className="h-7 w-7 rounded flex items-center justify-center text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-30 transition"
                title="Página anterior"
              >
                ◀
              </button>
              <span className="px-2 text-xs font-mono font-bold text-slate-200 min-w-[60px] text-center">
                {pageNumber} / {numPages || 1}
              </span>
              <button
                onClick={() => changePage(1)}
                disabled={pageNumber >= (numPages || 1)}
                className="h-7 w-7 rounded flex items-center justify-center text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-30 transition"
                title="Página siguiente"
              >
                ▶
              </button>
            </div>

            {/* Controles de Zoom */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => handleZoom(-0.15)}
                className="h-7 w-7 rounded flex items-center justify-center text-xs font-black text-slate-200 hover:bg-slate-700 transition"
                title="Reducir zoom (-)"
              >
                −
              </button>
              <button
                onClick={resetZoom}
                className="px-2 text-[11px] font-mono font-bold text-slate-300 hover:text-white transition"
                title="Restablecer zoom al tamaño óptimo"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={() => handleZoom(0.15)}
                className="h-7 w-7 rounded flex items-center justify-center text-xs font-black text-slate-200 hover:bg-slate-700 transition"
                title="Aumentar zoom (+)"
              >
                +
              </button>
            </div>

            {/* Botón Ampliar / Cerrar Pantalla Completa */}
            <button
              onClick={toggleFullscreen}
              className="rounded-lg bg-apre-blue hover:bg-apre-blue-light px-3 py-1.5 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-xs"
              title={isFullscreen ? "Cerrar pantalla completa (Esc)" : "Ampliar hoja completa"}
            >
              <span>{isFullscreen ? "✕" : "⛶"}</span>
              <span>{isFullscreen ? "Cerrar" : "Ampliar"}</span>
            </button>
          </div>
        </div>

        {/* Zona del Canvas / Hoja A4 renderizada directamente sin bordes grises */}
        <div
          ref={setViewerAreaRef}
          className={`w-full bg-slate-950 flex items-center justify-center overflow-auto p-3 sm:p-6 ${
            isFullscreen
              ? "flex-1 h-full min-h-0"
              : "min-h-[500px] max-h-[820px]"
          }`}
        >
          <Document
            file={docActivo.archivo}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-apre-blue border-t-transparent" />
                <span className="text-xs font-bold">Cargando documento...</span>
              </div>
            }
            error={
              <div className="text-center p-8 text-red-400 text-xs">
                Error al renderizar el documento.
              </div>
            }
          >
            {/* Hoja A4 con contorno limpio y sombra suave */}
            <div className="shadow-2xl rounded-sm border border-slate-200/40 bg-white overflow-hidden transition-all duration-200">
              <Page
                pageNumber={pageNumber}
                width={effectiveWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="block"
              />
            </div>
          </Document>
        </div>

        {/* Barra inferior de estado */}
        <div className="bg-slate-850 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/60">
          <span className="flex items-center gap-1.5">
            <span>💡</span>
            <span>Usa las flechas ◀ ▶ o el teclado para pasar de página. El documento se adapta a tu resolución.</span>
          </span>
          <span className="font-mono text-slate-300 text-xs shrink-0">
            Página {pageNumber} de {numPages || 1}
          </span>
        </div>
      </div>
    </div>
  );
}
