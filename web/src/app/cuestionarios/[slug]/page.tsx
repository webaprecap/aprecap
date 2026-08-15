"use client";

import { Suspense, use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CuestionarioVFView from "@/components/cuestionarios/CuestionarioVFView";
import { getCuestionarios } from "@/data/cuestionarios";
import type { PreguntaCuestionario } from "@/data/cuestionarios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CuestionariosPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <CuestionariosInner params={params} />
    </Suspense>
  );
}

function CuestionariosInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activoIdx, setActivoIdx] = useState(0);

  const cursoCuestionarios = getCuestionarios(slug);

  if (!cursoCuestionarios) {
    notFound();
  }

  const activo = cursoCuestionarios.cuestionarios[activoIdx] ?? cursoCuestionarios.cuestionarios[0];

  return (
    <>
      <section className="bg-apre-blue text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>📋</span> Cuestionarios Oficiales
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">
              Cuestionarios · {cursoCuestionarios.titulo}
            </h1>
            <p className="mt-1 text-xs text-white/80">
              Los cuestionarios oficiales que se rinden en el curso, digitalizados con las
              mismas preguntas y respuestas. Corrección inmediata: al responder verás si
              acertaste y cuál era la respuesta correcta.
            </p>
          </div>
          <Link
            href={`/materiales/${cursoCuestionarios.slug}`}
            className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            ← Volver al Curso
          </Link>
        </div>
      </section>

      <section className="bg-slate-900 py-8 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-3">
            {cursoCuestionarios.cuestionarios.map((c, idx) => {
              const isActive = idx === activoIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActivoIdx(idx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left rounded-2xl border p-4 transition ${
                    isActive
                      ? "border-cyan-500/50 bg-cyan-500/10"
                      : "border-slate-800 bg-slate-950 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`text-sm font-bold ${
                        isActive ? "text-cyan-300" : "text-slate-200"
                      }`}
                    >
                      {c.titulo}
                    </h3>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black border bg-apre-red/10 text-apre-red border-apre-red/30">
                      EVALUACIÓN
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">
                    {c.preguntas.length} preguntas · V/F y alternativas con corrección inmediata
                  </p>
                </button>
              );
            })}
          </aside>

          <main className="lg:col-span-8">
            <CuestionarioVFView
              titulo={activo.titulo}
              preguntas={activo.preguntas as PreguntaCuestionario[]}
            />
          </main>
        </div>
      </section>
    </>
  );
}
