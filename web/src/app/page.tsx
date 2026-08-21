import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import { CursoCard } from "@/components/CursoCard";
import { CURSOS_PRESENCIAL_ONLINE, CURSOS_ONLINE } from "@/data/cursos-home";
import GoogleMapLocation from "@/components/GoogleMapLocation";
import LogosCarrusel from "@/components/LogosCarrusel";
import NuestraEsenciaCards from "@/components/NuestraEsenciaCards";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "OTEC APRECAP — Capacitación, Asesorías y Seguridad Privada",
};

export default function Home() {
  return (
    <>
      {/* Hero Principal con animaciones */}
      <section className="relative overflow-hidden bg-gradient-to-br from-apre-blue via-apre-blue to-apre-blue-light text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <ScrollReveal animation="fade-right" duration={800}>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
                Capacitación · Asesoría · Seguridad
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
                Tu futuro en{" "}
                <span className="text-apre-red">Seguridad Privada</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Equipo de profesionales confiables certificados por SENCE, con
                programas autorizados por la Subsecretaría de Prevención del Delito
                (SPD como órgano rector bajo la Ley N° 21.659), y fiscalizados con
                examen final rendido ante la Prefectura de Seguridad Privada OS-10
                de Carabineros de Chile.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Boton href="/cursos" variant="red">
                  Ver cursos
                </Boton>
                <WhatsAppButton />
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden md:block">
            <ScrollReveal animation="fade-left" delay={200} duration={800}>
              <div className="mx-auto w-72 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 transition-transform duration-500 hover:scale-105">
                <img
                  src="/logo/logo.png"
                  alt="Logo APRECAP"
                  className="w-full h-auto object-contain"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Carrusel Infinito Continuo de Logos Autorizados */}
      <LogosCarrusel />

      {/* Cursos Presenciales */}
      <section className="bg-gray-50 py-16 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal animation="fade-up" duration={600}>
            <div>
              <h2 className="text-3xl font-extrabold text-apre-blue">
                Cursos Presenciales
              </h2>
              <p className="mt-2 text-gray-600">
                Clases 100% presenciales en sede con material y apoyo de estudio en
                nuestra plataforma en línea.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {CURSOS_PRESENCIAL_ONLINE.map((c, idx) => (
              <ScrollReveal
                key={c.slug}
                animation="fade-up"
                delay={idx * 150}
                duration={650}
              >
                <CursoCard
                  slug={c.slug}
                  title={c.title}
                  image={c.image}
                  duracion={c.duracion}
                  modalidad={c.modalidad}
                  acreditado={c.acreditado}
                  href={`/cursos/${c.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos Online */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal animation="fade-up" duration={600}>
            <div>
              <h2 className="text-3xl font-extrabold text-apre-blue">
                Cursos Online
              </h2>
              <p className="mt-2 text-gray-600">
                Cursos completos en línea con certificación, disponibles desde
                cualquier lugar.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {CURSOS_ONLINE.map((c, idx) => (
              <ScrollReveal
                key={c.slug}
                animation="fade-up"
                delay={idx * 150}
                duration={650}
              >
                <CursoCard
                  slug={c.slug}
                  title={c.title}
                  image={c.image}
                  duracion={c.duracion}
                  modalidad={c.modalidad}
                  acreditado={c.acreditado}
                  href={`/cursos/${c.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ScrollReveal animation="zoom-in" delay={250} duration={600}>
              <Boton href="/cursos" variant="outline">
                Ver todos los cursos
              </Boton>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sección Ley de Seguridad Privada */}
      <section className="bg-white py-16 border-t border-gray-100 overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <ScrollReveal animation="fade-right" duration={700}>
            <div>
              <h2 className="text-3xl font-extrabold text-apre-blue">
                Autorizados bajo la nueva Ley de Seguridad Privada
              </h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                La <strong>Ley N° 21.659</strong> (vigente desde noviembre de
                2025) moderniza la seguridad privada en Chile. La{" "}
                <strong>Subsecretaría de Prevención del Delito (SPD)</strong> es
                el órgano rector encargado de <strong>autorizar y regular</strong> a
                las empresas y entidades, mientras que{" "}
                <strong>Carabineros de Chile (Prefectura OS-10)</strong> es la
                autoridad encargada de <strong>fiscalizar en terreno y tomar el examen final</strong> a los guardias.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    t: "Órgano Rector (SPD)",
                    d: "Programas y cursos autorizados conforme a la Ley N° 21.659 y su reglamento (D.S. N° 209).",
                  },
                  {
                    t: "Fiscalización y Examen (OS-10)",
                    d: "Exámenes finales de acreditación y fiscalización operativa a cargo de Carabineros de Chile.",
                  },
                  {
                    t: "Registro Nacional",
                    d: "Nuestros alumnos egresan aptos para integrar el Registro Nacional de Seguridad Privada de la SPD.",
                  },
                ].map((s) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-extrabold text-apre-blue">{s.t}</p>
                      <p className="text-sm text-gray-600">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal animation="fade-left" delay={100} duration={650}>
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-apre-blue p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/logos/logo-spd-oficial.png"
                  alt="Subsecretaría de Prevención del Delito"
                  className="h-14 w-auto rounded-xl bg-white object-contain p-1.5"
                />
                <div>
                  <p className="font-extrabold">Subsecretaría de Prevención del Delito</p>
                  <p className="text-sm text-white/70">Órgano Rector · Ley N° 21.659 · D.S. N° 209</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200} duration={650}>
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-apre-blue p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/logos/os10-logo.webp"
                  alt="Prefectura de Seguridad Privada OS-10"
                  className="h-14 w-auto rounded-xl bg-white object-contain p-1.5"
                />
                <div>
                  <p className="font-extrabold">Carabineros de Chile · OS-10</p>
                  <p className="text-sm text-white/70">Autoridad Fiscalizadora · Examen Final Oficial</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={300} duration={650}>
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2 border border-gray-100">
                  <img
                    src="/logos/icontec-oficial.svg"
                    alt="ICONTEC"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="font-extrabold text-apre-blue">Certificados por ICONTEC</p>
                  <p className="text-xs text-gray-600">
                    Organismo certificador de la norma NCh 2728:2015.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={400} duration={650}>
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2 border border-gray-100">
                  <img
                    src="/logos/sence-logo.svg"
                    alt="SENCE"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="font-extrabold text-apre-blue">SENCE</p>
                  <p className="text-xs text-gray-600">
                    Organismo Técnico de Capacitación y Empleo (Min. del Trabajo).
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sección "Nuestra Esencia" en Cards Separadas con Stagger */}
      <NuestraEsenciaCards />

      {/* Mapa de Google Maps e Información de Sede Central */}
      <GoogleMapLocation />

      {/* CTA Final */}
      <section className="bg-apre-blue text-white overflow-hidden">
        <ScrollReveal animation="scale-up" duration={750}>
          <div className="mx-auto max-w-6xl px-4 py-16 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">¿Listo para capacitarte?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Contáctanos y te asesoramos sobre el curso ideal para ti o tu
              empresa.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Boton href="/contacto" variant="red">
                Contáctanos
              </Boton>
              <WhatsAppButton texto="Hola, quiero inscribirme a un curso" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

