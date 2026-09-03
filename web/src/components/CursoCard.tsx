import Link from "next/link";
import VolantinBadge from "./fiestas-patrias/VolantinBadge";

export function CursoCard({
  slug,
  title,
  image,
  duracion,
  modalidad,
  acreditado,
  href,
}: {
  slug: string;
  title: string;
  image: string;
  duracion: string;
  modalidad: string;
  acreditado: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg relative"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-apre-blue">
        {/* Detalle Dieciochero en la esquina */}
        <VolantinBadge />

        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-white/40">
            🎓
          </div>
        )}
        {acreditado && (
          <span className="absolute left-3 top-3 rounded-full bg-apre-red px-3 py-1 text-xs font-bold text-white shadow-xs">
            SPD
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold text-apre-blue">{title}</h3>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-apre-blue-light">
          {duracion} · {modalidad}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-apre-red transition group-hover:gap-2">
          Ver curso
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
