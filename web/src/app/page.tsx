import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import { CursoCard } from "@/components/CursoCard";
import Markdown from "@/components/Markdown";
import { paginas } from "@/data/pages";
import { cursosLP } from "@/data/cursos";
import { cursosMoodle } from "@/data/moodle";

export const metadata: Metadata = {
  title: "OTEC APRECAP — Capacitación, Asesorías y Seguridad Privada",
};

export default function Home() {
  const inicio = paginas.find((p) => p.slug === "inicio");

  return (
    <>
      <section className="bg-gradient-to-br from-apre-blue via-apre-blue to-apre-blue-light text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
              Capacitación · Asesoría · Seguridad
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Autorizados por la{" "}
              <span className="text-apre-red">
                Subsecretaría de Prevención del Delito
              </span>{" "}
              y la Prefectura de Seguridad Privada{" "}
              <span className="text-apre-red">OS-10</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Equipo de profesionales confiables y acreditados para brindar en
              todo el territorio nacional capacitación y servicios confiables,
              empeñados en la búsqueda de soluciones reales y oportunas a
              nuestros clientes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Boton href="/cursos" variant="red">
                Ver cursos
              </Boton>
              <WhatsAppButton />
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/logo/logo.png"
              alt="Logo APRECAP"
              className="mx-auto w-72 rounded-3xl bg-white p-6 shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
            <img
              src="/logos/logo-spd-oficial.png"
              alt="Subsecretaría de Prevención del Delito"
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="font-extrabold text-apre-blue">
                Autorizados por la Subsecretaría de Prevención del Delito
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Conforme a la Ley N° 21.659, que moderniza la seguridad
                privada en Chile.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
            <img
              src="/logos/os10-logo.webp"
              alt="Prefectura de Seguridad Privada OS-10 Carabineros de Chile"
              className="h-16 w-auto object-contain"
            />
            <div>
              <p className="font-extrabold text-apre-blue">
                Acreditados por Carabineros de Chile OS-10
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Prefectura de Seguridad Privada.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-4xl font-extrabold text-apre-red">SENCE</p>
            <div>
              <p className="font-extrabold text-apre-blue">
                Organismo Técnico de Capacitación
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Certificado bajo NCH-2728:2015, dependiente del Ministerio del
                Trabajo y Previsión Social.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold text-apre-blue">
            Cursos de Seguridad Privada
          </h2>
          <p className="mt-2 text-gray-600">
            Formación presencial y en línea, financiada por SENCE para empresas.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cursosLP.map((c) => (
              <CursoCard
                key={c.slug}
                slug={c.slug}
                title={c.title}
                image={c.image}
                duracion={c.duration}
                modalidad="Online"
                acreditado
                href={`/cursos/${c.slug}`}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Boton href="/cursos" variant="outline">
              Ver todos los cursos
            </Boton>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-apre-blue">
              Autorizados bajo la nueva Ley de Seguridad Privada
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              La <strong>Ley N° 21.659</strong> (vigente desde noviembre de
              2025) moderniza la seguridad privada en Chile. Ahora la{" "}
              <strong>Subsecretaría de Prevención del Delito (SPD)</strong> es
              la autoridad encargada de regular, fiscalizar y certificar a
              todos los actores del sector.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  t: "Certificación vigente",
                  d: "Somos un OTEC autorizado conforme a la Ley 21.659 y su reglamento (D.S. N° 209).",
                },
                {
                  t: "Registro Nacional",
                  d: "Nuestros alumnos egresan aptos para integrar el Registro Nacional de Seguridad Privada de la SPD.",
                },
                {
                  t: "Respaldo del Gobierno",
                  d: "La formación y certificación tienen validez legal en todo el territorio nacional.",
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
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-apre-blue p-6 text-white">
              <img
                src="/logos/logo-spd-oficial.png"
                alt="Subsecretaría de Prevención del Delito"
                className="h-14 w-auto rounded-lg bg-white object-contain p-1"
              />
              <div>
                <p className="font-extrabold">Subsecretaría de Prevención del Delito</p>
                <p className="text-sm text-white/70">Ley N° 21.659 · D.S. N° 209</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-apre-blue p-6 text-white">
              <img
                src="/logos/os10-logo.webp"
                alt="Prefectura de Seguridad Privada OS-10"
                className="h-14 w-auto rounded-lg bg-white object-contain p-1"
              />
              <div>
                <p className="font-extrabold">Carabineros de Chile · OS-10</p>
                <p className="text-sm text-white/70">Prefectura de Seguridad Privada</p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <p className="font-extrabold text-apre-blue">SENCE</p>
              <p className="mt-1 text-sm text-gray-600">
                Organismo Técnico de Capacitación y Empleo certificado bajo
                NCH-2728:2015, dependiente del Ministerio del Trabajo y
                Previsión Social.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-apre-blue">
              Cursos Asincrónicos en el Campus Virtual
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Ingresa a nuestro Campus Virtual (Moodle) y estudia a tu ritmo:
              videos, manuales en PDF y evaluaciones en línea.{" "}
              {cursosMoodle.length} cursos disponibles.
            </p>
            <div className="mt-6">
              <Boton href="/campus" variant="primary">
                Entrar al Campus
              </Boton>
            </div>
          </div>
          <ul className="space-y-3">
            {cursosMoodle.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <a
                  href={`/cursos-asincronicos/${c.slug}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-apre-blue"
                >
                  <span className="font-semibold text-apre-blue">{c.title}</span>
                  <svg className="h-4 w-4 text-apre-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {inicio && inicio.body && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <Markdown className="prose max-w-none">{inicio.body}</Markdown>
          </div>
        </section>
      )}

      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-3xl font-extrabold">¿Listo para capacitarte?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Contáctanos y te asesoramos sobre el curso ideal para ti o tu
            empresa.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Boton href="/contacto" variant="red">
              Contáctanos
            </Boton>
            <WhatsAppButton texto="Hola, quiero inscribirme a un curso" />
          </div>
        </div>
      </section>
    </>
  );
}
