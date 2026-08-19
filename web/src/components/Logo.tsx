import Link from "next/link";
import { SITE_NAME } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5 transition group-hover:scale-105">
        <img
          src="/logo/logo-header.png"
          alt={SITE_NAME}
          className="h-full w-full object-contain"
        />
      </div>
      <span
        className={`text-xl font-extrabold tracking-tight leading-tight ${
          light ? "text-white" : "text-apre-blue"
        }`}
      >
        OTEC APRECAP
        <span className="block text-xs font-medium uppercase tracking-widest text-apre-red">
          Capacitaciones y Asesorías
        </span>
      </span>
    </Link>
  );
}
