"use client";

import React from "react";
import { useFiestasPatrias } from "@/lib/fiestasPatrias";

export default function HeroBackgroundFlag() {
  const { isActive, isClient } = useFiestasPatrias();

  if (!isClient || !isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Overlay azul APRECAP profundo para garantizar contraste y legibilidad impecable */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(14, 42, 71, 0.92) 0%, rgba(14, 42, 71, 0.7) 45%, rgba(0, 51, 102, 0.85) 100%)",
        }}
      />
      {/* Bandera flameando con la Cordillera de los Andes de fondo */}
      <img
        src="/images/bandera-chilena-cordillera.jpg"
        alt="Bandera Chilena flameando con la Cordillera de los Andes"
        className="h-full w-full object-cover object-center opacity-45 mix-blend-screen scale-105 transition-transform duration-1000"
      />
    </div>
  );
}
