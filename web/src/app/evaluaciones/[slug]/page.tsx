import { Suspense } from "react";
import { redirect } from "next/navigation";
import CCTVFinalExam from "@/components/cursos/CCTVFinalExam";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ExamenFinalPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <Contenido params={params} />
    </Suspense>
  );
}

async function Contenido({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "operador-cctv-y-alarmas") {
    return (
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
        <CCTVFinalExam
          cursoSlug={slug}
          cursoTitulo="Curso de Operador de CCTV y Alarmas"
          volverHref={`/materiales/${slug}`}
        />
      </div>
    );
  }

  redirect(`/cuestionarios/${slug}`);
  return null;
}