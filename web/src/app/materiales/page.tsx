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
  const [expandedModuloIdx, setExpandedModuloIdx] = useState<number>(0);
  const [selectedSubModuloIdx, setSelectedSubModuloIdx] = useState<number>(0);

  useEffect(() => {
    if (cursoParam && materialesEstudio.some((c) => c.slug === cursoParam)) {
      setSelectedCursoSlug(cursoParam);
      setExpandedModuloIdx(0);
      setSelectedSubModuloIdx(0);
    }
  }, [cursoParam]);

  const cursoActual = materialesEstudio.find((c) => c.slug === selectedCursoSlug) || materialesEstudio[0];
  const moduloActual = cursoActual.modulos[expandedModuloIdx] || cursoActual.modulos[0];
  const hasSubModulos = Boolean(moduloActual.subModulos && moduloActual.subModulos.length > 0);
  
  const subModuloActual = hasSubModulos
    ? moduloActual.subModulos![selectedSubModuloIdx] || moduloActual.subModulos![0]
    : null;

  const slidesActuales = subModuloActual ? subModuloActual.slides : (moduloActual.slides || []);
  const pdfDownloadUrl = subModuloActual?.pdfUrl || moduloActual.pdfUrl || cursoActual.pdfUrl;
  const tituloActivo = subModuloActual ? `${subModuloActual.codigo} ${subModuloActual.nombre}` : moduloActual.nombre;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-apre-blue text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>🛡️</span> Aula Virtual APRECAP
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">{cursoActual.title}</h1>
            <p className="mt-1 text-xs text-white/80">
              {cursoActual.categoria} · {cursoActual.modulos.length} Módulos desglosados en sub-unidades temáticas
            </p>
          </div>
          <Link
            href="/panel/alumno"
            className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            ← Volver a mi Panel
          </Link>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section className="bg-slate-900 py-8 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12">
          {/* Sidebar Menu: Acordeón de Módulos y Sub-Módulos */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  MÓDULOS DE ESTUDIO
                </h2>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                  {cursoActual.modulos.length} Módulos
                </span>
              </div>

              <div className="space-y-3">
                {cursoActual.modulos.map((m, mIdx) => {
                  const isExpanded = mIdx === expandedModuloIdx;
                  const modSubModulos = m.subModulos || [];

                  return (
                    <div key={mIdx} className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
                      {/* Modulo Parent Header */}
                      <button
                        onClick={() => {
                          setExpandedModuloIdx(mIdx);
                          setSelectedSubModuloIdx(0);
                        }}
                        className={`w-full text-left p-3.5 text-xs font-bold transition flex items-center justify-between ${
                          isExpanded
                            ? "bg-cyan-500/20 text-cyan-300 border-b border-cyan-500/30"
                            : "text-slate-300 hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 pr-2">
                          <span className={`font-black text-xs ${isExpanded ? "text-cyan-400" : "text-slate-500"}`}>
                            #{mIdx + 1}
                          </span>
                          <span className="line-clamp-2">{m.nombre}</span>
                        </div>
                        <span className="text-xs text-slate-400">{isExpanded ? "▼" : "▶"}</span>
                      </button>

                      {/* Sub-modulos Children List */}
                      {isExpanded && modSubModulos.length > 0 && (
                        <div className="bg-slate-950/80 p-2 space-y-1 divide-y divide-slate-900">
                          {modSubModulos.map((sub, sIdx) => {
                            const isSubActive = sIdx === selectedSubModuloIdx;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => setSelectedSubModuloIdx(sIdx)}
                                className={`w-full text-left rounded-lg px-3 py-2 text-xs transition flex items-start gap-2 ${
                                  isSubActive
                                    ? "bg-apre-red text-white font-bold shadow-sm"
                                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                                }`}
                              >
                                <span className={`font-mono text-[11px] shrink-0 font-bold ${isSubActive ? "text-white" : "text-cyan-400"}`}>
                                  {sub.codigo}
                                </span>
                                <span className="line-clamp-2 leading-tight">{sub.nombre}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {pdfDownloadUrl && (
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center">
                <p className="text-xs font-extrabold text-cyan-400">Manual Oficial en PDF</p>
                <p className="mt-1 text-xs text-slate-400">Descarga la guía teórica para estudio offline.</p>
                <a
                  href={pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 shadow-md"
                >
                  📥 Descargar PDF Oficial
                </a>
              </div>
            )}
          </aside>

          {/* Main Viewer Area */}
          <main className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                Unidad Activa: <strong className="text-cyan-400">{tituloActivo}</strong>
              </span>
              <span className="text-xs font-bold text-slate-400">
                {slidesActuales.length} Diapositivas disponibles
              </span>
            </div>

            <PPTSlideViewer
              slides={slidesActuales}
              pdfDownloadUrl={pdfDownloadUrl}
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
