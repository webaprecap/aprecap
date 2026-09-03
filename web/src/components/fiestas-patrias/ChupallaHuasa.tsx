"use client";

import React from "react";

export default function ChupallaHuasa({
  className = "",
  size = 30,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 4 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sombrero de Huaso"
    >
      <defs>
        {/* Degradado para la copa del sombrero huaso tradicional */}
        <linearGradient id="chupallaBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#333333" />
          <stop offset="60%" stopColor="#1f1f1f" />
          <stop offset="100%" stopColor="#0f0f0f" />
        </linearGradient>
        {/* Cinta tricolor chilena (Azul, Blanco, Rojo) */}
        <linearGradient id="chupallaCintaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0039A6" />
          <stop offset="35%" stopColor="#0039A6" />
          <stop offset="36%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FFFFFF" />
          <stop offset="66%" stopColor="#D52B1E" />
          <stop offset="100%" stopColor="#D52B1E" />
        </linearGradient>
      </defs>

      {/* Sombra base bajo el ala */}
      <ellipse cx="24" cy="24" rx="21" ry="3.5" fill="rgba(0,0,0,0.35)" />

      {/* Ala del sombrero huaso */}
      <path
        d="M2 21 C2 19, 10 17, 24 17 C38 17, 46 19, 46 21 C46 23.5, 38 25, 24 25 C10 25, 2 23.5, 2 21 Z"
        fill="url(#chupallaBodyGrad)"
        stroke="#444444"
        strokeWidth="0.8"
      />

      {/* Copa recta del sombrero */}
      <path
        d="M12.5 19 L14 7 C14.2 5.8, 15 5.2, 16.5 5.2 L31.5 5.2 C33 5.2, 33.8 5.8, 34 7 L35.5 19 Z"
        fill="url(#chupallaBodyGrad)"
      />

      {/* Tapa superior de la copa */}
      <ellipse cx="24" cy="5.8" rx="8.8" ry="2" fill="#3a3a3a" />

      {/* Cinta tricolor chilena */}
      <path
        d="M13 16.8 L13.3 13.8 C13.5 13.3, 14.5 13, 16 13 L32 13 C33.5 13, 34.5 13.3, 34.7 13.8 L35 16.8 Z"
        fill="url(#chupallaCintaGrad)"
      />

      {/* Estrella solitaria blanca al centro */}
      <circle cx="24" cy="14.8" r="1.3" fill="#D52B1E" />
      <path
        d="M24 13.8 L24.3 14.6 H25.1 L24.5 15 L24.7 15.8 L24 15.3 L23.3 15.8 L23.5 15 L22.9 14.6 H23.7 Z"
        fill="#ffffff"
      />
    </svg>
  );
}
