import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExamenFinalClient from "@/components/cursos/ExamenFinalClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "guardia-de-seguridad" },
    { slug: "operador-cctv-y-alarmas" },
    { slug: "supervisor-de-seguridad" },
    { slug: "baston-y-esposas" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const titles: Record<string, string> = {
    "guardia-de-seguridad": "Examen Final Guardia de Seguridad (SPD)",
    "operador-cctv-y-alarmas": "Examen Final Operador de CCTV y Alarmas",
    "supervisor-de-seguridad": "Examen Final Supervisor de Seguridad",
    "baston-y-esposas": "Examen Final Bastón y Esposas",
  };
  const title = titles[slug] || "Examen Final";
  return {
    title: `${title} — OTEC APRECAP`,
    description: `Evaluación oficial y examen final para ${title} en OTEC APRECAP.`,
  };
}

export default async function ExamenFinalPage({ params }: PageProps) {
  const { slug } = await params;

  if (
    ![
      "operador-cctv-y-alarmas",
      "supervisor-de-seguridad",
      "baston-y-esposas",
      "guardia-de-seguridad",
    ].includes(slug)
  ) {
    notFound();
  }

  return <ExamenFinalClient slug={slug} />;
}