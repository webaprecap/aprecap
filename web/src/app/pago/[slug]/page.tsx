import type { Metadata } from "next";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";
import PagarCursoClient from "@/components/pago/PagarCursoClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    ...cursosLP.map((c) => ({ slug: c.slug })),
    ...cursosOtec.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const todos = [...cursosLP, ...cursosOtec];
  const curso = todos.find((c) => c.slug === slug);
  const titulo = curso ? curso.title : "Pago Online";
  return {
    title: `Pago Online: ${titulo} — OTEC APRECAP`,
    description: `Pago de matrícula y cuotas oficiales para ${titulo} con Webpay Plus.`,
  };
}

export default async function PagarCursoPage({ params }: PageProps) {
  const { slug } = await params;
  return <PagarCursoClient slug={slug} />;
}