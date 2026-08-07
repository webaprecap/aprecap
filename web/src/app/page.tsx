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
              Acreditados por <span className="text-apre-red">SENCE</span> y la
              Prefectura de Seguridad Privada{" "}
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
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-4 py-10 text-center">
          {[
            { n: "+200", l: "Cursos" },
            { n: "+400", l: "Asesorías" },
            { n: "+500", l: "Egresados" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-4xl font-extrabold text-apre-red">{s.n}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-apre-blue">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold text-apre-blue">
            Nuestros Cursos de Seguridad Privada
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
