import Link from "next/link";
import { SITE_NAME } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <img
        src="/logo/logo-header.png"
        alt={SITE_NAME}
        className="h-12 w-auto"
      />
      <span
        className={`text-xl font-extrabold tracking-tight leading-tight ${
          light ? "text-white" : "text-apre-blue"
        }`}
      >
        OTEC APRECAP
        <span className="block text-xs font-medium uppercase tracking-widest text-apre-red">
          Capacitación · Seguridad Privada
        </span>
      </span>
    </Link>
  );
}
