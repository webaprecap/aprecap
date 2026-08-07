import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Boton } from "@/components/Buttons";
import { cursosMoodle } from "@/data/moodle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = cursosMoodle.find((x) => x.slug === slug);
  if (!c) return { title: "Curso no encontrado — OTEC APRECAP" };
  return {
    title: `${c.title} — OTEC APRECAP`,
    description: `Curso asincrónico ${c.title} del Campus Virtual APRECAP.`,
  };
}

export function generateStaticParams() {
  return cursosMoodle.map((c) => ({ slug: c.slug }));
}

function youtubeId(url: string) {
  const m = url.match(/[?&]v=([\w-]{11})/);
  return m ? m[1] : "";
}

const tipoLabel: Record<string, { label: string; icon: string }> = {
  forum: { label: "Foro", icon: "💬" },
  resource: { label: "Manual (PDF)", icon: "📄" },
  url: { label: "Video", icon: "🎬" },
  quiz: { label: "Evaluación", icon: "📝" },
};

export default async function CursoAsincronicoDetalle({ params }: Props) {
  const { slug } = await params;
  const c = cursosMoodle.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Curso Asincrónico
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">{c.title}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
              🎬 {c.videos.length} videos
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
              📄 {c.files.length} manuales
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
              📝 {c.activities.filter((a) => a.type === "quiz").length} evaluaciones
            </span>
          </div>
          <div className="mt-8">
            <Boton href={c.url} variant="red">
              Entrar al curso en el Campus
            </Boton>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4">
          {c.videos.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {c.videos.map((v) => (
                <a
                  key={v}
                  href={`https://www.youtube.com/watch?v=${youtubeId(v)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition hover:shadow-lg"
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId(v)}/hqdefault.jpg`}
                    alt="Video del curso"
                    className="aspect-video w-full object-cover"
                  />
                  <span className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-apre-blue">
                    <svg className="h-5 w-5 text-apre-red" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                    Ver video en YouTube
                  </span>
                </a>
              ))}
            </div>
          )}

          {c.activities.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-extrabold text-apre-blue">
                Contenido del curso
              </h2>
              <ul className="mt-4 space-y-2">
                {c.activities.map((a, i) => {
                  const t = tipoLabel[a.type];
                  return (
                    <li key={i}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-apre-blue"
                      >
                        <span className="font-semibold text-apre-blue">
                          {t.icon} {a.name}
                        </span>
                        <span className="rounded-full bg-apre-blue px-3 py-1 text-xs font-bold text-white">
                          {t.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {c.files.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-extrabold text-apre-blue">
                Manuales y materiales (PDF)
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {c.files.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                  >
                    <span className="text-apre-red">📄</span>
                    <span className="text-sm font-semibold text-apre-blue">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-gray-500">
                Los archivos se descargan desde el Campus Virtual al inscribirte
                en el curso.
              </p>
            </>
          )}

          <div className="mt-12 rounded-2xl bg-apre-blue p-8 text-center text-white">
            <h2 className="text-2xl font-extrabold">
              ¿Listo para empezar este curso?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-white/80">
              Inscríbete y accede a todo el material, evaluaciones y
              certificación.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Boton href={c.url} variant="red">
                Entrar al Campus
              </Boton>
              <Boton href="/contacto" variant="red" className="!border-2 !border-white !bg-transparent hover:!bg-white hover:!text-apre-blue">
                Pedir información
              </Boton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
