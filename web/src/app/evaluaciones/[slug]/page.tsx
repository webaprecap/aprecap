import { Suspense } from "react";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ExamenFinalPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <Redirigir params={params} />
    </Suspense>
  );
}

async function Redirigir({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/cuestionarios/${slug}`);
  return null;
}
