"use client";

import dynamic from "next/dynamic";
import type { DocumentoPDFOTEC } from "@/data/cursos-otec-laborales";

const CajonVisorA4 = dynamic(() => import("./CajonVisorA4"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-3 bg-slate-900 rounded-2xl">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-apre-blue border-t-transparent" />
      <span className="text-xs font-bold text-slate-300">Cargando Visor A4...</span>
    </div>
  ),
});

interface Props {
  documentos: DocumentoPDFOTEC[];
  cursoTitulo: string;
}

export default function CajonVisorA4Client({ documentos, cursoTitulo }: Props) {
  return <CajonVisorA4 documentos={documentos} cursoTitulo={cursoTitulo} />;
}
