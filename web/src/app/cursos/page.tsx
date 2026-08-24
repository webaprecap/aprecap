import type { Metadata } from "next";
import { CursoCard } from "@/components/CursoCard";
import { CURSOS_PRESENCIAL_ONLINE, CURSOS_ONLINE } from "@/data/cursos-home";

export const metadata: Metadata = {
  title: "Cursos y Capacitación — OTEC APRECAP",
  description:
    "Cursos de seguridad privada acreditados por SENCE y OS-10: Guardia de Seguridad, Supervisor, CCTV y más.",
};

export default function CursosPage() {
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            OTEC APRECAP
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Cursos y Capacitación</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
            Acreditados por SENCE bajo NCh-2728:2015. Nuestros programas de capacitación
            cuentan con la autorización de la Subsecretaría de Prevención del Delito (SPD) como
            órgano rector, con fiscalización operativa y examen final rendido ante Carabineros
            de Chile (Prefectura de Seguridad Privada OS-10).
          </p>

          {/* Banner de Próximo Inicio */}
          <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-apre-red text-white text-2xl font-black shadow-md">
                🗓️
              </span>
              <div>
                <span className="text-[11px] font-black uppercase text-yellow-300 tracking-wider">
                  ⚡ Convocatoria Abierta
                </span>
                <p className="text-base sm:text-lg font-black text-white">
                  Próximo Inicio de Cursos: 15 de Septiembre de 2026
                </p>
              </div>
            </div>
            <a
              href="/solicitar-acceso"
              className="rounded-xl bg-apre-red hover:bg-apre-red-dark text-white px-5 py-2.5 text-xs font-black shadow-md transition"
            >
              Matricularme Ahora ➔
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-apre-blue">
            Cursos Presenciales
          </h2>
          <p className="mt-2 text-gray-600">
            Formación 100% presencial en sede con material y apoyo de estudio en
            nuestra plataforma en línea.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {CURSOS_PRESENCIAL_ONLINE.map((c) => (
              <CursoCard
                key={c.slug}
                slug={c.slug}
                title={c.title}
                image={c.image}
                duracion={c.duracion}
                modalidad={c.modalidad}
                acreditado={c.acreditado}
                href={`/cursos/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-apre-blue">
            Cursos Online
          </h2>
          <p className="mt-2 text-gray-600">
            Cursos completos en línea con certificación.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {CURSOS_ONLINE.map((c) => (
              <CursoCard
                key={c.slug}
                slug={c.slug}
                title={c.title}
                image={c.image}
                duracion={c.duracion}
                modalidad={c.modalidad}
                acreditado={c.acreditado}
                href={`/cursos/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
