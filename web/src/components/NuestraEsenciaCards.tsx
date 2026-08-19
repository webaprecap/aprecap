import React from "react";
import ScrollReveal from "./ScrollReveal";

interface EsenciaCard {
  titulo: string;
  tag: string;
  descripcion: string;
  gradiente: string;
  borde: string;
  tagBg: string;
  tagText: string;
}

const ESENCIA_ITEMS: EsenciaCard[] = [
  {
    titulo: "Misión",
    tag: "Compromiso Total",
    descripcion:
      "Formar profesionales de la seguridad privada con excelencia técnica y un profundo respeto por los derechos humanos, la dignidad de las personas y el Estado de Derecho, entregando herramientas, experiencia y valores.",
    gradiente: "from-blue-500/10 via-transparent to-transparent",
    borde: "border-blue-100 hover:border-blue-300",
    tagBg: "bg-blue-50",
    tagText: "text-blue-700",
  },
  {
    titulo: "Visión",
    tag: "Liderazgo Futuro",
    descripcion:
      "Llegar a ser líderes en la capacitación y asesoría de seguridad privada, reconocidos por formar profesionales íntegros que protegen a las personas, sus bienes e información con responsabilidad, respeto y compromiso social.",
    gradiente: "from-red-500/10 via-transparent to-transparent",
    borde: "border-red-100 hover:border-apre-red/30",
    tagBg: "bg-red-50",
    tagText: "text-apre-red",
  },
  {
    titulo: "Valores",
    tag: "Ética & Cultura",
    descripcion:
      "Nos guían la honestidad, la transparencia, la responsabilidad social y la inclusión. Promovemos el respeto por los derechos humanos y la dignidad de todas las personas, rechazando toda forma de discriminación y fomentando la mejora continua.",
    gradiente: "from-emerald-500/10 via-transparent to-transparent",
    borde: "border-emerald-100 hover:border-emerald-300",
    tagBg: "bg-emerald-50",
    tagText: "text-emerald-700",
  },
  {
    titulo: "Equipo",
    tag: "Talento Humano",
    descripcion:
      "Contamos con instructores y profesionales altamente capacitados y comprometidos, enfocados en brindar una experiencia de formación y servicio de la más alta calidad técnica y humana en todo Chile.",
    gradiente: "from-amber-500/10 via-transparent to-transparent",
    borde: "border-amber-100 hover:border-amber-300",
    tagBg: "bg-amber-50",
    tagText: "text-amber-800",
  },
];

export default function NuestraEsenciaCards() {
  return (
    <section className="bg-slate-50 py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-apre-red/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-apre-red">
              Identidad Corporativa
            </span>
            <h2 className="mt-3 text-3xl font-black text-apre-blue md:text-4xl">
              Nuestra Esencia
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Los pilares que fundamentan nuestra excelencia formativa y el compromiso con cada uno de nuestros egresados y empresas asociadas.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ESENCIA_ITEMS.map((item, idx) => (
            <ScrollReveal
              key={item.titulo}
              animation="fade-up"
              delay={idx * 120}
              duration={700}
              className="h-full"
            >
              <div
                className={`group relative flex h-full flex-col justify-between rounded-3xl border bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.borde}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-gray-200/80 transition duration-300 group-hover:scale-110">
                      <img
                        src="/logo/logo.png"
                        alt="APRECAP"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${item.tagBg} ${item.tagText}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-apre-blue">
                    {item.titulo}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-600">
                    {item.descripcion}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    OTEC APRECAP
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-apre-red group-hover:translate-x-1 transition duration-200">
                    →
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
