import type { Metadata } from "next";
import Link from "next/link";
import { CURSOS_OTEC_LABORALES } from "@/data/cursos-otec-laborales";
import { CONTACTO } from "@/data/site";

export const metadata: Metadata = {
  title: "Cursos Laborales y Técnicos — OTEC APRECAP",
  description:
    "Catálogo de cursos técnicos, laborales y oficios con manuales oficiales en PDF, videos interactivos y certificación de OTEC APRECAP.",
};

export default function CursosOTECPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-apre-blue via-apre-blue to-apre-blue-light text-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-yellow-300 backdrop-blur-md mb-3">
            <span>🛠️</span> Formación Laboral y Oficios
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Cursos Técnicos y Laborales OTEC
          </h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-white/80">
            Programas formativos con material de estudio oficial en formato A4,
            clases en video interactivas y planes orientados a la inserción laboral y
            especialización en faenas industriales, corporativas y de servicios.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/cursos"
              className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition backdrop-blur-md"
            >
              ← Ver Cursos de Seguridad Privada SPD
            </Link>
            <a
              href={CONTACTO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-whatsapp hover:brightness-105 px-4 py-2.5 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md"
            >
              <span>💬</span>
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Grid de Cursos OTEC */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CURSOS_OTEC_LABORALES.map((c) => (
              <div
                key={c.slug}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-300 hover:shadow-md transition group overflow-hidden"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
                    <img
                      src={`/images/cursos/${c.slug}.jpg`}
                      alt={c.titulo}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 right-2 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 shadow-sm">
                      ⏱ {c.horas}
                    </span>
                    <span className="absolute bottom-2 left-2 rounded-lg bg-white/90 backdrop-blur-xs text-base px-2 py-0.5 shadow-xs">
                      {c.icono}
                    </span>
                  </div>

                  <span className="mt-4 inline-block text-[11px] font-extrabold uppercase tracking-wider text-apre-blue/80">
                    {c.categoria}
                  </span>

                  <h2 className="mt-1 text-lg font-black text-apre-blue group-hover:text-apre-red transition">
                    {c.titulo}
                  </h2>

                  <p className="mt-2.5 text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {c.resumen}
                  </p>

                  {/* Badges de Contenidos */}
                  <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                    {c.videos.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-red-50 text-apre-red border border-red-200 px-2 py-0.5 text-[10px] font-bold">
                        🎬 {c.videos.length} Videos
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 text-apre-blue border border-blue-200 px-2 py-0.5 text-[10px] font-bold">
                      📄 {c.documentos.length} Manuales A4
                    </span>
                    {c.evaluaciones.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                        📝 {c.evaluaciones.length} Evaluaciones
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href={`/cursos-otec/${c.slug}`}
                    className="block w-full rounded-xl bg-apre-blue group-hover:bg-apre-blue-light py-2.5 text-center text-xs font-black text-white transition shadow-xs"
                  >
                    Entrar al Espacio del Curso ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
