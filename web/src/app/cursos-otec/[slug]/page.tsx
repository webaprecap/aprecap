import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CURSOS_OTEC_LABORALES,
  getCursoOTECLaboralBySlug,
} from "@/data/cursos-otec-laborales";
import CursoOTECLaboralClient from "@/components/cursos/CursoOTECLaboralClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const baseSlugs = CURSOS_OTEC_LABORALES.map((c) => ({
    slug: c.slug,
  }));
  const aliasSlugs = [
    { slug: "tecnicas-de-liderazgo-efectivo" },
    { slug: "tecnicas-de-autocuidado-y-manejo-de-estres" },
    { slug: "operador-de-calderas" },
    { slug: "nochero-portero-y-rondin" },
  ];
  return [...baseSlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const curso = getCursoOTECLaboralBySlug(slug);
  if (!curso) return { title: "Curso no encontrado — OTEC APRECAP" };

  return {
    title: `${curso.titulo} — OTEC APRECAP`,
    description: curso.resumen,
  };
}

export default async function CursoOTECLaboralPage({ params }: Props) {
  const { slug } = await params;
  const curso = getCursoOTECLaboralBySlug(slug);

  if (!curso) {
    notFound();
  }

  return <CursoOTECLaboralClient curso={curso} />;
}

