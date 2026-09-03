"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/data/site";
import { useAuth } from "@/contexts/AuthContext";
import { useFiestasPatrias } from "@/lib/fiestasPatrias";
import GuirnaldaDieciochera from "./fiestas-patrias/GuirnaldaDieciochera";
import { Logo } from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { userData, loading, signOut } = useAuth();
  const { isActive: isModo18, isClient } = useFiestasPatrias();
  const router = useRouter();
  const sesionActiva = !loading && !!userData;

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.getElementById("site-header");
      if (headerEl) {
        const height = Math.round(headerEl.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--header-total-height", `${height}px`);
      }
    };

    updateHeaderHeight();

    const headerEl = document.getElementById("site-header");
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && headerEl) {
      ro = new ResizeObserver(updateHeaderHeight);
      ro.observe(headerEl);
    }

    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [isModo18, isClient, open]);

  const loginBtn = (
    <>
      {sesionActiva ? (
        <div className="flex items-center gap-2">
          <Link
            href="/panel"
            className="flex items-center gap-1.5 rounded-lg bg-apre-blue px-3.5 py-2 text-sm font-bold text-white transition hover:bg-apre-blue-light shadow-sm whitespace-nowrap"
          >
            <span>👤</span>
            <span>Mi Panel</span>
            {userData.nombre?.split(" ")[0] && (
              <span className="opacity-85 font-normal">· {userData.nombre.split(" ")[0]}</span>
            )}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            title="Cerrar sesión"
            className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 hover:border-red-300"
          >
            <span>🚪</span>
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded-lg border-2 border-apre-blue px-4 py-2 text-sm font-bold text-apre-blue transition hover:bg-apre-blue hover:text-white"
        >
          Ingresar
        </Link>
      )}
    </>
  );

  return (
    <header id="site-header" className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur print:hidden">
      {/* Barra de Anuncio Superior */}
      <div
        className="text-white py-2 px-4 text-xs font-bold shadow-md"
        style={{
          background:
            isClient && isModo18
              ? "linear-gradient(90deg, #002b66 0%, #004b99 30%, #d52b1e 70%, #990000 100%)"
              : "linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #0e2a47 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center sm:justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-white animate-ping shrink-0" />
            <span className="rounded-md bg-black/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white border border-white/30 flex items-center gap-1 shrink-0">
              <span>{isClient && isModo18 ? "ESPECIAL FIESTAS PATRIAS" : "PRÓXIMO INICIO"}</span>
            </span>
            <span className="text-white font-medium">
              {isClient && isModo18 ? (
                <>
                  ¡Matrículas de Septiembre con <strong className="underline decoration-white decoration-2 font-black">Beneficio Dieciochero</strong>!
                </>
              ) : (
                <>
                  ¡Nuevo Curso Comienza el <strong className="underline decoration-white decoration-2 font-black">15 de Septiembre del 2026</strong>!
                </>
              )}
            </span>
            <span className="hidden md:inline text-white/90 font-normal">
              · Cupos Limitados (SPD, CCTV, Supervisor y Jefe de Seguridad)
            </span>
          </div>
          <Link
            href="/solicitar-acceso"
            className="inline-flex items-center gap-1 rounded-full bg-white text-apre-red px-3.5 py-1 text-[11px] font-black hover:bg-red-50 hover:text-red-700 transition shadow-sm"
          >
            <span>Inscribirme Ahora</span>
            <span>➔</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-apre-blue transition hover:text-apre-red"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/solicitar-acceso"
            className="rounded-lg bg-apre-red px-4 py-2 text-sm font-bold text-white transition hover:bg-apre-red-dark"
          >
            Inscribirme
          </Link>
          {loginBtn}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-apre-blue lg:hidden"
          aria-label="Abrir menú"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-200 bg-white px-4 pb-4 lg:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-gray-100 py-3 text-sm font-semibold text-apre-blue"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 grid gap-2">
            <Link
              href="/solicitar-acceso"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-apre-red px-4 py-2 text-center text-sm font-bold text-white"
            >
              Inscribirme
            </Link>
            {sesionActiva ? (
              <>
                <Link
                  href="/panel"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-apre-blue px-4 py-2.5 text-center text-sm font-bold text-white"
                >
                  <span>👤</span> Mi Panel {userData.nombre?.split(" ")[0] ? `(${userData.nombre.split(" ")[0]})` : ""}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-center text-sm font-bold text-red-600 hover:bg-red-100 hover:border-red-300"
                >
                  <span>🚪</span> Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg border-2 border-apre-blue px-4 py-2 text-center text-sm font-bold text-apre-blue"
              >
                Ingresar
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Guirnalda Dieciochera de Fiestas Patrias colgada bajo la barra */}
      <GuirnaldaDieciochera />
    </header>
  );
}
