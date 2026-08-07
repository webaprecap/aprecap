import type { Metadata } from "next";
import Link from "next/link";
import { cursosMoodle } from "@/data/moodle";

export const metadata: Metadata = {
  title: "Cursos Asincrónicos — OTEC APRECAP",
  description:
    "Cursos asincrónicos del Campus Virtual APRECAP: estudia a tu ritmo con videos, manuales y evaluaciones en línea.",
};

function youtubeId(url: string) {
  const m = url.match(/[?&]v=([\w-]{11})/);
  return m ? m[1] : "";
}

export default function CursosAsincronicosPage() {
  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Campus Virtual
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Cursos Asincrónicos</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/80">
            Estudia a tu ritmo en nuestro Campus Virtual. Cada curso incluye
            videos, manuales en PDF y evaluaciones en línea.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cursosMoodle.map((c) => (
              <Link
                key={c.slug}
                href={`/cursos-asincronicos/${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video bg-apre-blue">
                  {c.videos.length > 0 ? (
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId(c.videos[0])}/hqdefault.jpg`}
                      alt={c.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl text-white/40">
                      📚
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold text-apre-blue">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-apre-blue-light">
                    {c.videos.length} videos · {c.files.length} manuales ·{" "}
                    {c.activities.filter((a) => a.type === "quiz").length}{" "}
                    evaluaciones
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-apre-red transition group-hover:gap-2">
                    Ver curso
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
