import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CuestionariosClient from "@/components/cuestionarios/CuestionariosClient";
import { cuestionariosPorCurso } from "@/data/cuestionarios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(cuestionariosPorCurso).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const curso = cuestionariosPorCurso[slug];
  if (!curso) return { title: "Cuestionarios Oficiales — OTEC APRECAP" };
  return {
    title: `Cuestionarios Oficiales: ${curso.titulo} — OTEC APRECAP`,
    description: `Banco oficial de cuestionarios interactivos con retroalimentación para ${curso.titulo}.`,
  };
}

export default async function CuestionariosPage({ params }: PageProps) {
  const { slug } = await params;

  if (!cuestionariosPorCurso[slug]) {
    notFound();
  }

  return <CuestionariosClient slug={slug} />;
}
