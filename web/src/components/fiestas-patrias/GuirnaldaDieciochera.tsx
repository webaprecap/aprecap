"use client";

import React, { useEffect, useState } from "react";
import { useFiestasPatrias } from "@/lib/fiestasPatrias";

interface FlagCoord {
  x: number;
  y: number;
  angle: number;
  delay: number;
}

// 4 banderas por módulo de 400px con curvatura natural
const flagsModulo: FlagCoord[] = [
  { x: 50, y: 15, angle: 7, delay: 0.1 },
  { x: 150, y: 34, angle: 2.5, delay: 0.4 },
  { x: 250, y: 34, angle: -2.5, delay: 0.2 },
  { x: 350, y: 15, angle: -7, delay: 0.55 },
];

export default function GuirnaldaDieciochera() {
  const { isActive, isClient } = useFiestasPatrias();
  const [numModules, setNumModules] = useState(4);

  useEffect(() => {
    const updateModules = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1200;
      setNumModules(Math.max(2, Math.ceil(width / 400) + 1));
    };

    updateModules();
    window.addEventListener("resize", updateModules);
    return () => window.removeEventListener("resize", updateModules);
  }, []);

  if (!isClient || !isActive) return null;

  const renderFlag = (flag: FlagCoord, idx: number, modIdx: number) => {
    const w = 24;
    const h = 34;

    return (
      <g
        key={`flag-${modIdx}-${idx}`}
        transform={`translate(${flag.x - w / 2}, ${flag.y}) rotate(${flag.angle}, ${w / 2}, 0)`}
      >
        <g
          style={{
            transformOrigin: `${w / 2}px 0px`,
            animation: `dieciochoSway 3.2s ease-in-out ${flag.delay}s infinite alternate`,
          }}
        >
          {/* Sombra sutil de la bandera */}
          <rect x="1" y="2" width={w} height={h} rx="1" fill="rgba(0,0,0,0.18)" filter="blur(1.5px)" />

          {/* Bandera Chilena oficial en vertical (Protocolo Oficial Decreto 1.534)
              Mitad Izquierda: Blanca, con cantón Azul y Estrella en la esquina superior izquierda.
              Mitad Derecha: Roja.
          */}
          <g clipPath={`url(#flag-clip-${modIdx}-${idx})`}>
            {/* 1. Base izquierda: Blanco puro */}
            <rect x="0" y="0" width={w / 2} height={h} fill="#FFFFFF" />

            {/* 2. Mitad derecha: Rojo Chileno oficial */}
            <rect x={w / 2} y="0" width={w / 2} height={h} fill="#D52B1E" />

            {/* 3. Cantón superior izquierdo: Azul Marino oficial */}
            <rect x="0" y="0" width={w / 2} height={16} fill="#0039A6" />

            {/* 4. Estrella solitaria blanca al centro del cantón superior izquierdo */}
            <path
              d={`M ${w * 0.25} 3.8 L ${w * 0.25 + 1.4} 6.8 H ${w * 0.25 + 4.4} L ${w * 0.25 + 2} 8.6 L ${w * 0.25 + 3} 11.4 L ${w * 0.25} 9.6 L ${w * 0.25 - 3} 11.4 L ${w * 0.25 - 2} 8.6 L ${w * 0.25 - 4.4} 6.8 H ${w * 0.25 - 1.4} Z`}
              fill="#FFFFFF"
            />

            {/* Dobladillo sobre la cuerda */}
            <rect x="0" y="0" width={w} height="2.5" fill="rgba(0,0,0,0.15)" />
            <line x1="0" y1="2.5" x2={w} y2="2.5" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
          </g>

          <clipPath id={`flag-clip-${modIdx}-${idx}`}>
            <rect x="0" y="0" width={w} height={h} rx="1" />
          </clipPath>
        </g>
      </g>
    );
  };

  return (
    <div
      className="w-full overflow-hidden pointer-events-none select-none relative z-40"
      style={{ height: "54px", marginTop: "-2px" }}
      aria-hidden="true"
    >
      <div className="flex w-max">
        {Array.from({ length: numModules }).map((_, modIdx) => (
          <svg
            key={`mod-${modIdx}`}
            viewBox="0 0 400 80"
            style={{ width: "400px", height: "54px", flexShrink: 0 }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`sogaGrad-${modIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#784818" />
                <stop offset="25%" stopColor="#b38243" />
                <stop offset="50%" stopColor="#e8bf7f" />
                <stop offset="75%" stopColor="#b38243" />
                <stop offset="100%" stopColor="#784818" />
              </linearGradient>
            </defs>

            {/* 1. BANDERITAS COLGANTES (Detrás de la cuerda) */}
            {flagsModulo.map((flag, idx) => renderFlag(flag, idx, modIdx))}

            {/* 2. CUERDA TRENZADA EN U (Por delante) */}
            {/* Sombra de la cuerda */}
            <path
              d="M 0 6 Q 200 46 400 6"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Base de soga */}
            <path
              d="M 0 5 Q 200 45 400 5"
              stroke={`url(#sogaGrad-${modIdx})`}
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Textura de torsión */}
            <path
              d="M 0 5 Q 200 45 400 5"
              stroke="#4a2a0c"
              strokeWidth="2"
              strokeDasharray="3 4"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />

            {/* Nudos decorativos en las uniones */}
            <circle cx="2" cy="5" r="3" fill="#784818" />
            <circle cx="398" cy="5" r="3" fill="#784818" />
          </svg>
        ))}
      </div>

      <style jsx global>{`
        @keyframes dieciochoSway {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(2.5deg);
          }
          100% {
            transform: rotate(-2.5deg);
          }
        }
      `}</style>
    </div>
  );
}
