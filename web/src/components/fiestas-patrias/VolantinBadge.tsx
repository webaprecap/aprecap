"use client";

import React from "react";
import { useFiestasPatrias } from "@/lib/fiestasPatrias";

export function VolantinSvg({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Volantín Chileno"
    >
      <defs>
        <filter id="volantinShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Cuerpo del volantín (rombo girado 45 grados) */}
      <g filter="url(#volantinShadow)" transform="translate(16, 14) rotate(45) translate(-10, -10)">
        <rect x="0" y="0" width="20" height="20" rx="1" fill="#FFFFFF" />

        {/* Mitad inferior: Rojo */}
        <rect x="0" y="10" width="20" height="10" rx="1" fill="#D52B1E" />

        {/* Cuadrante superior izquierdo: Azul con estrella */}
        <rect x="0" y="0" width="10" height="10" rx="1" fill="#0039A6" />

        {/* Estrella blanca en el cantón azul */}
        <path
          d="M 5 2.2 L 5.8 4.2 H 8 L 6.2 5.5 L 6.9 7.5 L 5 6.2 L 3.1 7.5 L 3.8 5.5 L 2 4.2 H 4.2 Z"
          fill="#FFFFFF"
        />

        {/* Maderos o tirantes del volantín (cruz tradicional) */}
        <line x1="10" y1="0" x2="10" y2="20" stroke="#c28c46" strokeWidth="0.8" opacity="0.85" />
        <line x1="0" y1="10" x2="20" y2="10" stroke="#c28c46" strokeWidth="0.8" opacity="0.85" />
      </g>

      {/* Cola del volantín tricolor ondeando */}
      <path
        d="M 16 25 Q 14 28 17 30 Q 20 32 18 34"
        stroke="#D52B1E"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="27" r="1.2" fill="#0039A6" />
      <circle cx="18" cy="30" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export default function VolantinBadge({
  text = "¡Especial 18!",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const { isActive, isClient } = useFiestasPatrias();

  if (!isClient || !isActive) return null;

  return (
    <div
      className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg border border-white/40 backdrop-blur-md transition-transform hover:scale-105 ${className}`}
      style={{
        background: "linear-gradient(90deg, #D52B1E 0%, #b91c1c 45%, #0039A6 100%)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
      title="Convocatoria Fiestas Patrias 2026"
    >
      <VolantinSvg size={18} />
      <span className="tracking-wide uppercase text-[10px] font-black drop-shadow-xs">{text}</span>
    </div>
  );
}
