"use client";

import { useState, useEffect, useRef } from "react";

export interface SlideData {
  id: string;
  courseSlug: string;
  moduleName: string;
  slideNumber: number;
  title: string;
  contentBullets: string[];
  imageUrl?: string;
  pdfUrl?: string;
}

interface PPTSlideViewerProps {
  slides: SlideData[];
  pdfDownloadUrl?: string;
}

export default function PPTSlideViewer({ slides, pdfDownloadUrl }: PPTSlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentIndex] || {
    id: "empty",
    courseSlug: "",
    moduleName: "Módulo de Estudio",
    slideNumber: 1,
    title: "Sin contenido disponible",
    contentBullets: ["No hay diapositivas registradas para este módulo."],
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, slides.length]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const pct = slides.length > 0 ? Math.round(((currentIndex + 1) / slides.length) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-slate-950 text-white shadow-2xl transition-all ${
        isFullscreen ? "fixed inset-0 z-[9999] rounded-none border-none p-4 overflow-y-auto" : "w-full"
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-6 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-apre-red/20 text-sm font-bold text-apre-red border border-apre-red/30">
            📖
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-white">
              {currentSlide.moduleName}
            </h3>
            <p className="text-xs text-slate-400">Presentación de Material de Estudio ({orientation === "vertical" ? "Formato Vertical A4" : "Formato Horizontal 16:9"})</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de Orientación */}
          <div className="flex items-center rounded-xl bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setOrientation("vertical")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                orientation === "vertical"
                  ? "bg-apre-red text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Formato Vertical (A lo largo)"
            >
              📄 Vertical (A lo largo)
            </button>
            <button
              onClick={() => setOrientation("horizontal")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                orientation === "horizontal"
                  ? "bg-apre-red text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Formato Horizontal (A lo ancho)"
            >
              🖥️ Horizontal (16:9)
            </button>
          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
            Página {currentIndex + 1} de {slides.length}
          </span>

          {pdfDownloadUrl && (
            <a
              href={pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-cyan-400 hover:bg-slate-700 transition border border-cyan-500/20"
            >
              📥 PDF
            </a>
          )}

          <button
            onClick={toggleFullscreen}
            className="rounded-xl bg-slate-800 p-2 text-xs text-slate-300 hover:bg-slate-700 transition"
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? "↙️ Normal" : "↗️ Full"}
          </button>
        </div>
      </div>

      {/* Main Slide / Document Stage */}
      <div className="relative flex flex-1 items-center justify-center p-4 md:p-8 min-h-[450px]">
        {orientation === "vertical" ? (
          /* VISTA VERTICAL (A LO LARGO / FORMATO A4 / DOCUMENTO) */
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="inline-block rounded-lg bg-apre-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-apre-red border border-apre-red/20">
                Página / Sección #{currentIndex + 1}
              </span>
              <span className="text-xs font-semibold text-slate-400">APRECAP OTEC</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
              {currentSlide.title}
            </h2>

            {currentSlide.imageUrl && (
              <div className="overflow-hidden rounded-xl border border-slate-800 max-h-72">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-3 pt-2">
              {currentSlide.contentBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400 mt-0.5">
                    ✓
                  </span>
                  <p className="text-sm md:text-base leading-relaxed text-slate-200">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* VISTA HORIZONTAL (A LO ANCHO / 16:9) */
          <div className="grid w-full max-w-5xl gap-8 md:grid-cols-12 items-center">
            <div className={`${currentSlide.imageUrl ? "md:col-span-7" : "md:col-span-12"} space-y-5`}>
              <div className="inline-block rounded-lg bg-apre-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-apre-red border border-apre-red/20">
                Concepto Clave #{currentIndex + 1}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                {currentSlide.title}
              </h2>
              <div className="space-y-3 pt-2">
                {currentSlide.contentBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-3.5 border border-slate-800/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400 mt-0.5">
                      ✓
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-slate-200">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {currentSlide.imageUrl && (
              <div className="md:col-span-5 flex justify-center">
                <div className="relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-900 shadow-2xl group w-full max-w-sm">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="h-56 md:h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-900/90 px-6 py-4">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800"
        >
          ← Anterior
        </button>

        {/* Progress Bar */}
        <div className="flex flex-1 max-w-xs items-center gap-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-apre-red transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-400 shrink-0">{pct}%</span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="flex items-center gap-2 rounded-xl bg-apre-red px-5 py-2 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-30"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
