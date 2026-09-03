"use client";

import { useState } from "react";
import Link from "next/link";
import ResultadoExamen from "@/components/cursos/ResultadoExamen";

interface CursoPreview {
  slug: string;
  titulo: string;
  emoji: string;
  totalPreguntas: number;
  score: number;
  pct: number;
  umbral: number;
  volverHref: string;
}

const CURSOS_PREVIEW: CursoPreview[] = [
  {
    slug: "guardia-de-seguridad",
    titulo: "Curso de Guardia de Seguridad (SPD)",
    emoji: "🛡️",
    totalPreguntas: 140,
    score: 128,
    pct: 91,
    umbral: 80,
    volverHref: "/evaluaciones/guardia-de-seguridad",
  },
  {
    slug: "supervisor-de-seguridad",
    titulo: "Curso de Supervisor de Seguridad Privada",
    emoji: "⭐",
    totalPreguntas: 60,
    score: 54,
    pct: 90,
    umbral: 80,
    volverHref: "/evaluaciones/supervisor-de-seguridad",
  },
  {
    slug: "operador-cctv-y-alarmas",
    titulo: "Curso de Operador de CCTV y Alarmas",
    emoji: "📹",
    totalPreguntas: 60,
    score: 52,
    pct: 87,
    umbral: 80,
    volverHref: "/evaluaciones/operador-cctv-y-alarmas",
  },
  {
    slug: "baston-y-esposas",
    titulo: "Curso de Bastón y Esposas",
    emoji: "🦯",
    totalPreguntas: 20,
    score: 18,
    pct: 90,
    umbral: 80,
    volverHref: "/evaluaciones/baston-y-esposas",
  },
];

export default function PruebaFelicitacionesPage() {
  const [sel, setSel] = useState<CursoPreview | null>(null);

  return (
    <section className="min-h-[80vh] bg-slate-950 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-apre-red/40 bg-apre-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-apre-red">
            🧪 Vista previa interna
          </span>
          <h1 className="mt-4 text-3xl font-black text-white">
            Pantalla de Felicitaciones · Examen Final Aprobado
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Selecciona un curso para ver cómo se ve la pantalla que se muestra al aprobar el
            Examen Final, igual que en la plataforma de los alumnos. No afecta ningún resultado
            real.
          </p>
        </div>

        {!sel ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CURSOS_PREVIEW.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSel(c)}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="text-3xl">{c.emoji}</div>
                <h2 className="mt-3 text-sm font-extrabold leading-snug text-white group-hover:text-cyan-300">
                  {c.titulo}
                </h2>
                <p className="mt-2 text-xs font-bold text-slate-500">
                  {c.totalPreguntas} preguntas · umbral {c.umbral}%
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-400">
                  Ver pantalla de aprobado
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSel(null)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-slate-800"
              >
                ← Volver a los cursos
              </button>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {sel.emoji} {sel.titulo}
              </span>
            </div>
            <ResultadoExamen
              aprobado
              percentage={sel.pct}
              score={sel.score}
              totalPreguntas={sel.totalPreguntas}
              cursoTitulo={sel.titulo}
              cursoSlug={sel.slug}
              umbral={sel.umbral}
              volverHref={sel.volverHref}
            />
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-xs font-bold text-slate-500 transition hover:text-slate-300"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
