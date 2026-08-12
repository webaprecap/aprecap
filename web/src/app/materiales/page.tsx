"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PPTSlideViewer from "@/components/PPTSlideViewer";
import { materialesEstudio } from "@/data/materiales-estudio";

function MaterialesContent() {
  const searchParams = useSearchParams();
  const cursoParam = searchParams.get("curso");

  const [selectedCursoSlug, setSelectedCursoSlug] = useState(materialesEstudio[0].slug);
  const [selectedModuloIdx, setSelectedModuloIdx] = useState(0);

  useEffect(() => {
    if (cursoParam && materialesEstudio.some((c) => c.slug === cursoParam)) {
      setSelectedCursoSlug(cursoParam);
      setSelectedModuloIdx(0);
    }
  }, [cursoParam]);

  const cursoActual = materialesEstudio.find((c) => c.slug === selectedCursoSlug) || materialesEstudio[0];
  const moduloActual = cursoActual.modulos[selectedModuloIdx] || cursoActual.modulos[0];

  return (
    <>
      {/* Header Banner */}
      <section className="bg-apre-blue text-white py-10">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-apre-red">
              Campus Virtual · Material Interactivo
            </span>
            <h1 className="mt-1 text-3xl font-extrabold">Materiales de Estudio en Diapositivas (PPT)</h1>
            <p className="mt-2 text-sm text-white/80 max-w-2xl">
              Navega por las presentaciones interactivas de tus cursos, revisa conceptos clave con apoyo visual HD y descarga los manuales en PDF.
            </p>
          </div>
          <Link
            href="/panel/alumno"
            className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            ← Volver a mi Panel
          </Link>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section className="bg-slate-900 py-10 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12">
          {/* Sidebar Menu: Cursos & Módulos */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                1. Selecciona tu Curso
              </h2>
              <div className="space-y-2">
                {materialesEstudio.map((c) => {
                  const isActive = c.slug === selectedCursoSlug;
                  return (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setSelectedCursoSlug(c.slug);
                        setSelectedModuloIdx(0);
                      }}
                      className={`w-full text-left rounded-xl p-3.5 text-xs font-bold transition flex items-center justify-between ${
                        isActive
                          ? "bg-apre-red text-white shadow-lg shadow-apre-red/20"
                          : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800/60"
                      }`}
                    >
                      <span>{c.title}</span>
                      <span className="text-xs">→</span>
                    </button>
                  );
                })}
              </div>

              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-6 mb-3">
                2. Módulos de Estudio
              </h2>
              <div className="space-y-2">
                {cursoActual.modulos.map((m, idx) => {
                  const isActive = idx === selectedModuloIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedModuloIdx(idx)}
                      className={`w-full text-left rounded-xl p-3 text-xs font-semibold transition ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                          : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 border border-slate-800/40"
                      }`}
                    >
                      <span className="font-bold text-slate-500 mr-2">#{idx + 1}</span>
                      {m.nombre}
                    </button>
                  );
                })}
              </div>
            </div>

            {(moduloActual.pdfUrl || cursoActual.pdfUrl) && (
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center">
                <p className="text-xs font-extrabold text-cyan-400">Manual Oficial del Módulo (PDF)</p>
                <p className="mt-1 text-xs text-slate-400">Descarga la guía teórica oficial para estudio offline.</p>
                <a
                  href={moduloActual.pdfUrl || cursoActual.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full rounded-xl bg-cyan-500 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
                >
                  Descargar PDF del Módulo
                </a>
              </div>
            )}
          </aside>

          {/* Main Viewer Area */}
          <main className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400">
                Curso: <strong className="text-white">{cursoActual.title}</strong>
              </span>
              <span className="text-xs font-bold text-cyan-400">
                {moduloActual.slides.length} Diapositivas disponibles
              </span>
            </div>

            <PPTSlideViewer
              slides={moduloActual.slides}
              pdfDownloadUrl={moduloActual.pdfUrl || cursoActual.pdfUrl}
            />
          </main>
        </div>
      </section>
    </>
  );
}

export default function MaterialesPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-slate-400">Cargando presentaciones...</p>}>
      <MaterialesContent />
    </Suspense>
  );
}
