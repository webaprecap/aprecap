"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFiestasPatrias } from "@/lib/fiestasPatrias";
import { VolantinSvg } from "@/components/fiestas-patrias/VolantinBadge";

export default function AdminFiestasPatriasTab() {
  const { userData } = useAuth();
  const { isActive, isClient, loading, configData, setMode } = useFiestasPatrias();
  const [updating, setUpdating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggle = async (newState: boolean) => {
    setUpdating(true);
    setFeedback(null);
    try {
      await setMode(newState, userData?.email || "admin@aprecap.cl");
      setFeedback(
        newState
          ? "¡Modo Fiestas Patrias ACTIVADO exitosamente para toda la web!"
          : "Modo Fiestas Patrias desactivado. La web volvió a su diseño estándar."
      );
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      console.error("Error al actualizar Modo Fiestas Patrias:", err);
      setFeedback("❌ Error al guardar en base de datos.");
    } finally {
      setUpdating(false);
    }
  };

  const formattedDate = configData?.updatedAt?.toDate
    ? configData.updatedAt.toDate().toLocaleString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Tarjeta Principal de Control */}
      <div
        className={`rounded-3xl p-6 md:p-8 border shadow-xl transition-all duration-300 ${
          isActive
            ? "border-[#d52b1e] text-white"
            : "bg-white border-gray-200 text-gray-800"
        }`}
        style={
          isActive
            ? {
                background: "linear-gradient(135deg, #07192f 0%, #003366 35%, #991b1b 75%, #701010 100%)",
              }
            : undefined
        }
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner ${
                isActive
                  ? "bg-white/10 border-white/20"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <VolantinSvg size={38} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className={`text-2xl font-black tracking-tight ${
                    isActive ? "text-white" : "text-apre-blue"
                  }`}
                >
                  Modo Fiestas Patrias (Dieciochero)
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isActive
                      ? "bg-red-600 text-white shadow-md animate-pulse border border-white/40"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {loading
                    ? "Cargando..."
                    : isActive
                    ? "● ACTIVO EN TODA LA PLATAFORMA"
                    : "○ DESACTIVADO (MODO NORMAL)"}
                </span>
              </div>
              <p
                className={`text-sm mt-1.5 ${
                  isActive ? "text-slate-200" : "text-gray-600"
                }`}
              >
                Controla en tiempo real si el diseño criollo dieciochero se muestra a todos los visitantes y alumnos de OTEC APRECAP.
              </p>
            </div>
          </div>

          {/* Botón Switch Principal */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              type="button"
              onClick={() => handleToggle(!isActive)}
              disabled={updating || loading}
              className={`w-full md:w-auto px-7 py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-3 shadow-xl transform active:scale-95 disabled:opacity-50 cursor-pointer ${
                isActive
                  ? "bg-gray-900 text-gray-200 hover:bg-black hover:text-white border border-gray-700"
                  : "bg-gradient-to-r from-red-600 via-[#d52b1e] to-[#0039A6] text-white hover:brightness-110 shadow-red-600/40"
              }`}
            >
              {updating ? (
                <>
                  <span className="animate-spin text-lg">⏳</span>
                  <span>Guardando en Firestore...</span>
                </>
              ) : isActive ? (
                <>
                  <span>❌</span>
                  <span>Desactivar Modo Dieciochero</span>
                </>
              ) : (
                <>
                  <span>⭐</span>
                  <span>¡Activar Modo Fiestas Patrias!</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mensaje de feedback */}
        {feedback && (
          <div className="mt-5 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-sm font-bold flex items-center gap-2">
            <span>✨</span>
            <span>{feedback}</span>
          </div>
        )}

        {/* Metadatos */}
        <div
          className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
            isActive ? "border-white/15 text-slate-300" : "border-gray-200 text-gray-500"
          }`}
        >
          <div>
            {formattedDate ? (
              <span>
                Última actualización: <strong>{formattedDate}</strong> por{" "}
                <strong className="underline">{configData?.updatedBy || "Administrador"}</strong>
              </span>
            ) : (
              <span>Estado inicial sin cambios previos</span>
            )}
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-black underline flex items-center gap-1 hover:opacity-80 ${
              isActive ? "text-white" : "text-apre-blue"
            }`}
          >
            <span>Ver sitio web en vivo</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Guía Visual de Elementos Dieciocheros */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
        <h4 className="text-lg font-black text-apre-blue flex items-center gap-2">
          <span>🎨 Elementos patrios que se activan en la plataforma:</span>
        </h4>

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-apre-blue font-bold text-sm">
              <span className="text-xl">🎏</span>
              <h5>Guirnalda Dieciochera</h5>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Banderitas chilenas nítidas en soga rústica bajo el menú superior, con proporciones perfectas y animación de brisa sin estirarse en pantallas anchas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-apre-blue font-bold text-sm">
              <VolantinSvg size={22} />
              <h5>Volantín Tricolor</h5>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Insignia patria &quot;¡Especial 18!&quot; en la esquina de cada tarjeta de curso en el Home y en el catálogo OTEC.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-apre-blue font-bold text-sm">
              <span className="text-xl">🎪</span>
              <h5>Banner de Convocatoria 18</h5>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Banner con fondo tricolor profundo, botones dorados de alto contraste y llamado festivo a las matrículas de septiembre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
