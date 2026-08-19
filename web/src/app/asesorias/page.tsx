import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import Markdown from "@/components/Markdown";
import { paginas } from "@/data/pages";
import { CONTACTO } from "@/data/site";

export const metadata: Metadata = {
  title: "Asesorías en Seguridad Privada — OTEC APRECAP",
  description:
    "Guardias uniformados acreditados por OS-10 y asesoría de seguridad para empresas y personas naturales.",
};

const servicios = [
  {
    title: "Informes y diagnósticos",
    desc: "Informes, medidas y diagnósticos de seguridad a medida.",
  },
  {
    title: "Directivas de Funcionamiento",
    desc: "Trámites y documentación para la Directiva de Funcionamiento.",
  },
  {
    title: "Estudios de seguridad",
    desc: "Evaluación y estudio de seguridad para tu organización.",
  },
  {
    title: "Acreditaciones",
    desc: "Acreditación de Supervisores de Seguridad.",
  },
  {
    title: "Credenciales de Guardias",
    desc: "Credenciales de guardias para empresas y eventos masivos.",
  },
  {
    title: "Autorización de empresas",
    desc: "Iniciación, renovación y ampliación de autorizaciones.",
  },
  {
    title: "Jornada excepcional 12 horas",
    desc: "Gestión de autorización de jornada excepcional de turno 12 horas (D.T.).",
  },
];

export default function AsesoriasPage() {
  const pagina = paginas.find((p) => p.slug === "guardias-y-asesorias");

  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            APRECAP
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">
            Asesorías en Seguridad Privada
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
            Brindamos asesoría de seguridad a empresas y personas naturales.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppButton texto="Hola, quiero asesoría en seguridad privada" />
            <Boton href={`mailto:${CONTACTO.email}`} variant="red">
              Escríbenos
            </Boton>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold text-apre-blue">
            ¿Qué podemos hacer por ti?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicios.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-apre-red"
              >
                <h3 className="font-extrabold text-apre-blue">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pagina && pagina.body && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <Markdown className="prose max-w-none">{pagina.body}</Markdown>
          </div>
        </section>
      )}
    </>
  );
}
