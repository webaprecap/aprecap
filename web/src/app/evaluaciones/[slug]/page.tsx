"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FinalExam from "@/components/cursos/FinalExam";
import { useModoDemo } from "@/lib/useModoDemo";
import { materialesEstudio } from "@/data/materiales-estudio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CURSOS_CON_EXAMEN = new Set(["guardia-de-seguridad"]);

export default function ExamenFinalPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ExamenFinalInner params={params} />
    </Suspense>
  );
}

function ExamenFinalInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const modoDemo = useModoDemo();

  if (!CURSOS_CON_EXAMEN.has(slug)) {
    notFound();
  }

  const curso = materialesEstudio.find((c) => c.slug === slug);

  if (!curso) {
    notFound();
  }

  return (
    <>
      <section className="bg-apre-blue text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>🎓</span> Aula Virtual APRECAP{modoDemo ? " · 🧪 DEMO" : ""}
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">
              Examen Final · {curso.title}
            </h1>
            <p className="mt-1 text-xs text-white/80">
              {curso.categoria} · 90 preguntas de Verdadero/Falso seleccionadas
              aleatoriamente · {80}% mínimo de aprobación
            </p>
          </div>
          <Link
            href={`/materiales/${curso.slug}${modoDemo ? "?demo=1" : ""}`}
            className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
          >
            ← Volver al Curso
          </Link>
        </div>
      </section>

      <section className="bg-slate-900 py-8 min-h-[75vh]">
        <div className="mx-auto max-w-7xl px-4">
          <FinalExam
            cursoSlug={curso.slug}
            cursoTitulo={curso.title}
            volverHref={`/materiales/${curso.slug}${modoDemo ? "?demo=1" : ""}`}
            modoDemo={modoDemo}
          />
        </div>
      </section>
    </>
  );
}
