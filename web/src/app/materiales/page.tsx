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
      <section className="bg-apre-blue text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>📖</span> Materiales del Curso
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">{cursoActual.title}</h1>
            <p className="mt-1 text-xs text-white/80">
              {cursoActual.categoria} · {cursoActual.modulos.length} Módulos interactivos en diapositivas (PPT)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedCursoSlug}
              onChange={(e) => {
                setSelectedCursoSlug(e.target.value);
                setSelectedModuloIdx(0);
              }}
              className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 outline-none focus:border-cyan-500"
            >
              {materialesEstudio.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>

            <Link
              href="/panel/alumno"
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
            >
              ← Volver a mi Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section className="bg-slate-900 py-8 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12">
          {/* Sidebar Menu: Módulos del Curso Únicamente */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  MÓDULOS DE ESTUDIO
                </h2>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                  {cursoActual.modulos.length} Módulos
                </span>
              </div>

              <div className="space-y-2">
                {cursoActual.modulos.map((m, idx) => {
                  const isActive = idx === selectedModuloIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedModuloIdx(idx)}
                      className={`w-full text-left rounded-xl p-3 text-xs font-semibold transition flex items-center justify-between ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                          : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 border border-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 pr-2">
                        <span className={`font-black text-xs ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
                          #{idx + 1}
                        </span>
                        <span className="line-clamp-2">{m.nombre}</span>
                      </div>
                      <span className="text-xs text-slate-500">{isActive ? "▶" : "→"}</span>
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
                  className="mt-3 block w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 shadow-md"
                >
                  📥 Descargar PDF del Módulo
                </a>
              </div>
            )}
          </aside>

          {/* Main Viewer Area */}
          <main className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                Módulo Activo: <strong className="text-cyan-400">{moduloActual.nombre}</strong>
              </span>
              <span className="text-xs font-bold text-slate-400">
                {moduloActual.slides.length} Diapositivas
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
