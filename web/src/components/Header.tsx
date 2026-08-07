"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/data/site";
import { Logo } from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
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
            href="/contacto"
            className="rounded-lg bg-apre-red px-4 py-2 text-sm font-bold text-white transition hover:bg-apre-red-dark"
          >
            Inscribirme
          </Link>
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
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-apre-red px-4 py-2 text-center text-sm font-bold text-white"
          >
            Inscribirme
          </Link>
        </nav>
      )}
    </header>
  );
}
