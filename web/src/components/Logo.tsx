"use client";

import Link from "next/link";
import { SITE_NAME } from "@/data/site";
import { useFiestasPatrias } from "@/lib/fiestasPatrias";
import ChupallaHuasa from "./fiestas-patrias/ChupallaHuasa";

export function Logo({ light = false }: { light?: boolean }) {
  const { isActive, isClient } = useFiestasPatrias();

  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5 transition group-hover:scale-105">
        {isClient && isActive && (
          <div
            className="pointer-events-none drop-shadow-md transition-transform group-hover:rotate-0"
            style={{
              position: "absolute",
              top: "-13px",
              left: "-5px",
              transform: "rotate(-12deg)",
              zIndex: 30,
            }}
            title="¡Viva Chile!"
          >
            <ChupallaHuasa size={28} />
          </div>
        )}
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
