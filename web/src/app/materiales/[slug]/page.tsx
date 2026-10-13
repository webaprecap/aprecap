import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { materialesEstudio } from "@/data/materiales-estudio";
import CursoMaterialesClient from "@/components/cursos/CursoMaterialesClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return materialesEstudio.map((curso) => ({
    slug: curso.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const curso = materialesEstudio.find((c) => c.slug === slug);
  if (!curso) {
    return { title: "Material de Estudio — OTEC APRECAP" };
  }
  return {
    title: `${curso.title} — Materiales y Aula Virtual OTEC APRECAP`,
    description: `Aula virtual y materiales oficiales de estudio para ${curso.title}.`,
  };
}

export default async function CursoMaterialesPage({ params }: PageProps) {
  const { slug } = await params;
  const curso = materialesEstudio.find((c) => c.slug === slug);

  if (!curso) {
    notFound();
  }

  return <CursoMaterialesClient slug={slug} />;
}
