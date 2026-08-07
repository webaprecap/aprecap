import Link from "next/link";
import { CONTACTO, NAV_LINKS, SITE_NAME } from "@/data/site";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-apre-blue text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Organismo Técnico de Capacitación acreditado por SENCE y la
            Prefectura de Seguridad Privada OS-10.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Enlaces
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-apre-red">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{CONTACTO.direccion}</li>
            <li>{CONTACTO.metro}</li>
            <li>{CONTACTO.horario}</li>
            <li>
              <a href={`tel:${CONTACTO.telefono.replace(/\s/g, "")}`} className="hover:text-white">
                {CONTACTO.telefono}
              </a>
              {" · "}
              <a href={`tel:${CONTACTO.telefono2.replace(/\s/g, "")}`} className="hover:text-white">
                {CONTACTO.telefono2}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACTO.email}`} className="hover:text-white">
                {CONTACTO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados ·{" "}
        <Link href="/privacidad" className="hover:text-white">
          Política de Privacidad
        </Link>{" "}
        ·{" "}
        <Link href="/terminos" className="hover:text-white">
          Términos y Condiciones
        </Link>
      </div>
    </footer>
  );
}
