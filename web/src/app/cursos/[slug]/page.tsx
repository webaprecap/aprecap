import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import Markdown from "@/components/Markdown";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";
import { CONTACTO } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

function findCurso(slug: string) {
  const lp = cursosLP.find((c) => c.slug === slug);
  if (lp) return { tipo: "lp" as const, curso: lp };
  const otec = cursosOtec.find((c) => c.slug === slug);
  if (otec) return { tipo: "otec" as const, curso: otec };
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = findCurso(slug);
  if (!found) return { title: "Curso no encontrado — OTEC APRECAP" };
  return {
    title: `${found.curso.title} — OTEC APRECAP`,
    description: found.curso.description,
  };
}

export function generateStaticParams() {
  return [
    ...cursosLP.map((c) => ({ slug: c.slug })),
    ...cursosOtec.map((c) => ({ slug: c.slug })),
  ];
}

export default async function CursoDetalle({ params }: Props) {
  const { slug } = await params;
  const found = findCurso(slug);
  if (!found) notFound();

  if (found.tipo === "otec") {
    const c = found.curso;
    return (
      <>
        <section className="bg-apre-blue text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
                Cursos y Capacitación
              </p>
              <h1 className="mt-3 text-4xl font-extrabold">{c.title}</h1>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                  ⏱ {c.duracion}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                  📍 {c.modalidad}
                </span>
                {c.acreditado && (
                  <span className="rounded-full bg-apre-red px-4 py-1.5 text-sm font-bold">
                    Acreditado OS-10
                  </span>
                )}
                {c.financiadoSence && (
                  <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                    💰 100% financiado por SENCE para empresas
                  </span>
                )}
              </div>
            </div>
            {c.image && (
              <img
                src={c.image}
                alt={c.title}
                className="rounded-2xl object-cover shadow-2xl"
              />
            )}
          </div>
        </section>
        <section className="bg-white py-14">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-extrabold text-apre-blue">
              Sobre este curso
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">{c.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Boton href={CONTACTO.whatsappLink} variant="whatsapp">
                Inscribirme por WhatsApp
              </Boton>
              <Boton href="/contacto" variant="red">
                Pedir información
              </Boton>
            </div>
          </div>
        </section>
      </>
    );
  }

  const c = found.curso;
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
              Curso en Línea
            </p>
            <h1 className="mt-3 text-4xl font-extrabold">{c.title}</h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                ⏱ {c.duration || "Flexible"}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                📝 {c.quizzes} cuestionarios
              </span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                👥 {c.students} estudiantes
              </span>
              <span className="rounded-full bg-apre-red px-4 py-1.5 text-sm font-bold">
                Acreditado OS-10
              </span>
            </div>
            {c.price && (
              <p className="mt-6 text-3xl font-extrabold text-apre-red">
                {c.price}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Boton href="/contacto" variant="red">
                Inscribirme
              </Boton>
              <WhatsAppButton texto={`Hola, quiero inscribirme al curso ${c.title}`} />
            </div>
          </div>
          {c.image && (
            <img
              src={c.image}
              alt={c.title}
              className="rounded-2xl object-cover shadow-2xl"
            />
          )}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4">
          {c.description && (
            <>
              <h2 className="text-2xl font-extrabold text-apre-blue">
                Descripción del curso
              </h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                {c.description}
              </p>
            </>
          )}

          {c.competencias.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Competencia a desarrollar
              </h2>
              <ul className="mt-4 space-y-2">
                {c.competencias.map((comp, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-apre-red">▸</span> {comp}
                  </li>
                ))}
              </ul>
            </>
          )}

          {c.requisitos.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Requisitos
              </h2>
              <ul className="mt-4 space-y-2">
                {c.requisitos.map((r, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-apre-red">▸</span> {r}
                  </li>
                ))}
              </ul>
            </>
          )}

          {c.caracteristicas.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Características
              </h2>
              <ul className="mt-4 space-y-2">
                {c.caracteristicas.map((r, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-apre-red">▸</span> {r}
                  </li>
                ))}
              </ul>
            </>
          )}

          {c.audiencia.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Audiencia objetivo
              </h2>
              <ul className="mt-4 space-y-2">
                {c.audiencia.map((r, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-apre-red">▸</span> {r}
                  </li>
                ))}
              </ul>
            </>
          )}

          {c.curriculum && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Contenido del curso
              </h2>
              <Markdown className="mt-4">{c.curriculum}</Markdown>
            </>
          )}

          {c.faq.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Preguntas frecuentes
              </h2>
              <div className="mt-4 space-y-4">
                {c.faq.map((f, i) => (
                  <details
                    key={i}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <summary className="cursor-pointer font-bold text-apre-blue">
                      {f.q}
                    </summary>
                    <div className="mt-2 whitespace-pre-line text-gray-700">
                      {f.a.replace(/^#### .+\n?/, "")}
                    </div>
                  </details>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            <Boton href="/contacto" variant="red">
              Inscribirme a este curso
            </Boton>
            <WhatsAppButton texto={`Hola, quiero inscribirme al curso ${c.title}`} />
          </div>
        </div>
      </section>
    </>
  );
}
