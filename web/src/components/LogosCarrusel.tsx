"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

interface LogoItem {
  nombre: string;
  subtitulo: string;
  src: string;
  alt: string;
}

const LOGOS_AUTORIZADOS: LogoItem[] = [
  {
    nombre: "SENCE",
    subtitulo: "Organismo Técnico Acreditado",
    src: "/logos/sence-logo.svg",
    alt: "SENCE - Servicio Nacional de Capacitación y Empleo",
  },
  {
    nombre: "Carabineros de Chile OS-10",
    subtitulo: "Prefectura de Seguridad Privada",
    src: "/logos/os10-logo.webp",
    alt: "Carabineros de Chile - Prefectura Seguridad Privada OS-10",
  },
  {
    nombre: "ICONTEC Internacional",
    subtitulo: "Norma Chilena NCh 2728:2015",
    src: "/logos/icontec-oficial.svg",
    alt: "ICONTEC - Certificación de Calidad NCh 2728",
  },
  {
    nombre: "Prevención del Delito",
    subtitulo: "Ley N° 21.659 · Seguridad Privada",
    src: "/logos/logo-spd-oficial.png",
    alt: "Subsecretaría de Prevención del Delito - Gobierno de Chile",
  },
  {
    nombre: "OTEC APRECAP",
    subtitulo: "Capacitaciones y Asesorías",
    src: "/logo/logo.png",
    alt: "OTEC APRECAP Capacitaciones y Asesorías",
  },
];

export default function LogosCarrusel() {
  // Duplicamos la lista para crear un bucle visualmente infinito y continuo
  const listaDuplicada = [...LOGOS_AUTORIZADOS, ...LOGOS_AUTORIZADOS, ...LOGOS_AUTORIZADOS];

  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-gradient-to-b from-white via-gray-50/50 to-white py-12">
      <ScrollReveal animation="fade-up" duration={600}>
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-apre-blue">
            <span>🛡️</span> Instituciones y Acreditaciones
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-apre-blue md:text-3xl">
            Autorizados y Certificados Oficialmente
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-gray-600 md:text-sm">
            Cumplimos con las máximas exigencias normativas del Ministerio del Trabajo, Carabineros de Chile y la Subsecretaría de Prevención del Delito.
          </p>
        </div>
      </ScrollReveal>

      {/* Contenedor del Carrusel Infinito */}
      <div className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 py-2 hover:[animation-play-state:paused]">
          {listaDuplicada.map((item, idx) => (
            <div
              key={`${item.nombre}-${idx}`}
              className="flex h-32 w-64 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200/90 bg-white px-5 py-4 shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-full items-center justify-center">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-12 w-auto max-w-[160px] object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-extrabold text-apre-blue leading-tight">
                  {item.nombre}
                </p>
                <p className="text-[10px] font-semibold text-gray-500 leading-tight mt-0.5">
                  {item.subtitulo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
