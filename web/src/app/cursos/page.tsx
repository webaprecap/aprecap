import type { Metadata } from "next";
import { CursoCard } from "@/components/CursoCard";
import { CURSOS_PRESENCIAL_ONLINE, CURSOS_ONLINE, CURSOS_LABORALES } from "@/data/cursos-home";

export const metadata: Metadata = {
  title: "Cursos y Capacitación — OTEC APRECAP",
  description:
    "Cursos de seguridad privada autorizados por la Subsecretaría de Prevención del Delito (SPD) y certificados por SENCE: Guardia de Seguridad, Supervisor, Jefe de Seguridad, CCTV y cursos laborales.",
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
            cuentan con la autorización de la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> como
            órgano rector bajo la <strong>Ley N° 21.659</strong>, con fiscalización operativa y examen final rendido ante Carabineros
            de Chile.
          </p>

          {/* Banner de Próximo Inicio */}
          <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase text-yellow-300 tracking-wider">
                ⚡ Convocatoria Abierta
              </span>
              <p className="text-base sm:text-lg font-black text-white mt-0.5">
                Próximo Inicio de Cursos: 15 de Septiembre de 2026
              </p>
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

      {/* 1. Cursos Presenciales */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/10 px-3.5 py-1 text-xs font-black text-apre-red uppercase tracking-wider mb-2">
            <span>🏫</span> Formación Presencial en Sede
          </div>
          <h2 className="text-2xl font-extrabold text-apre-blue">
            Cursos Presenciales (con apoyo en línea)
          </h2>
          <p className="mt-2 text-gray-600">
            Clases 100% presenciales en sede con talleres prácticos, docentes expertos y acceso a material de estudio digital.
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
                href={c.href || `/cursos/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Cursos en Línea y Asincrónicos */}
      <section className="bg-slate-50 py-16 border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-3.5 py-1 text-xs font-black text-apre-blue uppercase tracking-wider mb-2">
            <span>🌐</span> Modalidad Online Asincrónica
          </div>
          <h2 className="text-2xl font-extrabold text-apre-blue">
            Cursos en Línea y Asincrónicos
          </h2>
          <p className="mt-2 text-gray-600">
            Programas flexibles con aula virtual 24/7, videos explicativos y evaluaciones interactivas acreditadas por la Subsecretaría de Prevención del Delito (SPD).
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
                href={c.href || `/cursos/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cursos OTEC */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-black text-emerald-700 uppercase tracking-wider mb-2">
            <span>🛠️</span> Formación Laboral y Oficios
          </div>
          <h2 className="text-2xl font-extrabold text-apre-blue">
            Cursos OTEC
          </h2>
          <p className="mt-2 text-gray-600">
            Cursos prácticos orientados al desarrollo de habilidades laborales inmediatas y oficios especializados con manuales oficiales A4 y videos interactivos.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CURSOS_LABORALES.map((c) => (
              <CursoCard
                key={c.slug}
                slug={c.slug}
                title={c.title}
                image={c.image}
                duracion={c.duracion}
                modalidad={c.modalidad}
                acreditado={c.acreditado}
                href={c.href || `/cursos/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
