import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Boton, WhatsAppButton } from "@/components/Buttons";
import ComparativoVigilanteGuardia from "@/components/cursos/ComparativoVigilanteGuardia";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";
import { CURSOS_OTEC_LABORALES, getCursoOTECLaboralBySlug } from "@/data/cursos-otec-laborales";
import { CURSOS_LABORALES } from "@/data/cursos-home";
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
  if (!found) {
    const otecLaboral = getCursoOTECLaboralBySlug(slug);
    if (otecLaboral) {
      return {
        title: `${otecLaboral.titulo} — OTEC APRECAP`,
        description: otecLaboral.resumen,
      };
    }
    return { title: "Curso no encontrado — OTEC APRECAP" };
  }
  return {
    title: `${found.curso.title} — OTEC APRECAP`,
    description: found.curso.description,
  };
}

export function generateStaticParams() {
  return [
    ...cursosLP.map((c) => ({ slug: c.slug })),
    ...cursosOtec.map((c) => ({ slug: c.slug })),
    ...CURSOS_OTEC_LABORALES.map((c) => ({ slug: c.slug })),
  ];
}

export default async function CursoDetalle({ params }: Props) {
  const { slug } = await params;

  // Si es un curso OTEC laboral (Nochero, Electricidad, Sustancias, etc.), renderizar la ficha informativa oficial con botones de inscripción
  const otecLaboral = getCursoOTECLaboralBySlug(slug);
  const isSecurityCourse = ["guardia-de-seguridad", "supervisor-de-seguridad", "operador-cctv-y-alarmas", "baston-y-esposas"].includes(slug);
  
  if (otecLaboral && !isSecurityCourse) {
    const cursoHome = CURSOS_LABORALES.find((c) => c.slug === otecLaboral.slug);
    const imagenPortada = cursoHome?.image || `/images/cursos/${otecLaboral.slug}.jpg`;

    return (
      <>
        <section className="bg-apre-blue text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                <span>{otecLaboral.icono}</span>
                <span>{otecLaboral.categoria}</span>
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">{otecLaboral.titulo}</h1>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold">
                  ⏱ {otecLaboral.horas}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold">
                  📍 {otecLaboral.modalidad}
                </span>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-4 py-1.5 text-xs sm:text-sm font-semibold">
                  💰 Financiado por SENCE para empresas
                </span>
              </div>

              {/* Botones de acción principales */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Boton href={`/solicitar-acceso?curso=${otecLaboral.slug}`} variant="red">
                  📝 Solicitar Matrícula / Inscribirme
                </Boton>
                <WhatsAppButton texto={`Hola, quiero solicitar información e inscribirme al curso ${otecLaboral.titulo}`} />
                <Link
                  href={`/cursos-otec/${otecLaboral.slug}`}
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-white/20 flex items-center gap-1.5 shadow-md"
                >
                  <span>🎓</span>
                  <span>Ingresar al Aula Virtual</span>
                </Link>
              </div>
            </div>

            {imagenPortada && (
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src={imagenPortada}
                  alt={otecLaboral.titulo}
                  className="w-full object-cover aspect-video"
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-14 border-b border-gray-100">
          <div className="mx-auto max-w-4xl px-4 space-y-10">
            <div>
              <h2 className="text-2xl font-extrabold text-apre-blue">
                Sobre este curso
              </h2>
              <p className="mt-4 leading-relaxed text-gray-700 text-base">
                {otecLaboral.resumen}
              </p>
            </div>

            {/* Módulos y Manuales de Estudio */}
            {otecLaboral.documentos && otecLaboral.documentos.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-apre-blue mb-4">
                  Programa de Estudio y Manuales Oficiales
                </h2>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {otecLaboral.documentos.map((doc, idx) => (
                    <div
                      key={doc.id || idx}
                      className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 hover:bg-white hover:border-apre-blue/30 transition shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                          {doc.esPrograma ? "📋" : "📄"}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm text-apre-blue">
                            {doc.nombre}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evaluaciones y Clases */}
            <div className="rounded-3xl bg-linear-to-r from-slate-900 to-apre-blue p-6 sm:p-8 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    <span>⚡</span> Campus Virtual Integrado
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mt-2">
                    Clases interactivas y evaluaciones digitales
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                    Incluye visor de diapositivas y manuales A4 página por página, videos explicativos en terreno y cuestionarios de aprobación para validar tus conocimientos.
                  </p>
                </div>
                <div className="shrink-0">
                  <Boton href={`/solicitar-acceso?curso=${otecLaboral.slug}`} variant="red">
                    Solicitar Matrícula Ahora
                  </Boton>
                </div>
              </div>
            </div>

            {/* Cierre con botones */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <Boton href={`/solicitar-acceso?curso=${otecLaboral.slug}`} variant="red">
                  Inscribirme a este curso
                </Boton>
                <WhatsAppButton texto={`Hola, quiero solicitar información e inscribirme al curso ${otecLaboral.titulo}`} />
              </div>
              <Link
                href="/cursos"
                className="text-xs font-bold text-gray-500 hover:text-apre-blue transition"
              >
                ← Volver a todos los cursos
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const found = findCurso(slug);
  if (!found) {
    notFound();
  }

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
                  <span className="rounded-full bg-apre-red px-4 py-1.5 text-sm font-bold shadow-xs">
                    Acreditado SPD
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
              <Boton href={`/solicitar-acceso?curso=${c.slug}`} variant="red">
                Inscribirme online
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
              <span className="rounded-full bg-apre-red px-4 py-1.5 text-sm font-bold shadow-xs">
                Acreditado SPD
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Boton href={`/solicitar-acceso?curso=${c.slug}`} variant="red">
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

          {c.curriculum.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-extrabold text-apre-blue">
                Contenido del curso
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Esto es lo que verás en cada módulo. El material de estudio y las
                evaluaciones se entregan dentro del Campus Virtual, disponible al
                matricularte.
              </p>
              <div className="mt-6 space-y-4">
                {(() => {
                  const grupos = new Map<string, typeof c.curriculum>();
                  for (const item of c.curriculum) {
                    const key = item.seccion || "General";
                    grupos.set(key, [...(grupos.get(key) ?? []), item]);
                  }
                  return [...grupos.entries()].map(([seccion, items]) => (
                    <div
                      key={seccion}
                      className="rounded-2xl border border-gray-200 bg-white p-5"
                    >
                      <h3 className="font-extrabold text-apre-blue">{seccion}</h3>
                      <ul className="mt-3 divide-y divide-gray-100">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                            <span className="flex items-center gap-2 text-gray-800">
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                                  item.tipo === "evaluacion" ? "bg-apre-pink" : "bg-apre-blue"
                                }`}
                              >
                                {item.tipo === "evaluacion" ? "📝" : "📘"}
                              </span>
                              {item.titulo}
                            </span>
                            <span className="shrink-0 text-xs font-bold text-gray-400">
                              {item.minutos ? `⏱ ${item.minutos} min` : ""}
                              {item.preguntas ? ` · ${item.preguntas} preguntas` : ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ));
                })()}
              </div>
            </>
          )}

          {(c.slug === "guardia-de-seguridad" || c.slug === "supervisor-de-seguridad") && (
            <ComparativoVigilanteGuardia />
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
            <Boton href={`/solicitar-acceso?curso=${c.slug}`} variant="red">
              Inscribirme a este curso
            </Boton>
            <WhatsAppButton texto={`Hola, quiero inscribirme al curso ${c.title}`} />
          </div>
        </div>
      </section>
    </>
  );
}
