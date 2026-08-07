import type { Metadata } from "next";
import { Boton } from "@/components/Buttons";
import { cursosMoodle } from "@/data/moodle";

export const metadata: Metadata = {
  title: "Mi Campus — OTEC APRECAP",
  description:
    "Accede al Campus Virtual de OTEC APRECAP: tus cursos, evaluaciones y certificaciones en línea.",
};

export default function CampusPage() {
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Aula Virtual
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Mi Campus</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
            Nuestro Campus Virtual (Moodle) te permite estudiar a tu ritmo:
            accede a tus cursos, videos, manuales, evaluaciones y
            certificaciones desde cualquier lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Boton href="https://aprecap.cl/campus" variant="red">
              Entrar al Campus Virtual
            </Boton>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-apre-blue">
            ¿Cómo funciona?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Crea tu cuenta",
                d: "Ingresa con tu correo o tu cuenta de Google en el Campus Virtual.",
              },
              {
                n: "2",
                t: "Estudia a tu ritmo",
                d: "Accede a los videos, manuales y materiales de tu curso en línea.",
              },
              {
                n: "3",
                t: "Rinde tus evaluaciones",
                d: "Completa los cuestionarios y obtén tu certificación al aprobar.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-gray-200 bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-apre-red text-lg font-extrabold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 font-extrabold text-apre-blue">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-apre-blue">
            Cursos disponibles en el Campus
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {cursosMoodle.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/cursos-asincronicos/${c.slug}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-apre-blue"
                >
                  <span className="font-semibold text-apre-blue">{c.title}</span>
                  <span className="text-apre-red">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Boton href="https://aprecap.cl/campus" variant="primary">
              Ir a mi curso
            </Boton>
          </div>
        </div>
      </section>
    </>
  );
}
