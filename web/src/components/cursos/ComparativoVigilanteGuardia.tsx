"use client";

import React from "react";

export default function ComparativoVigilanteGuardia() {
  const comparaciones = [
    {
      criterio: "Uso de Armas de Fuego",
      vigilante: {
        texto: "SÍ (Obligatorio portar arma corta durante el servicio).",
        tipo: "positivo",
        detalle: "Resguardadas en armerillo al término del turno con registro diario."
      },
      guardia: {
        texto: "NO (Prohibición absoluta, incluso en personal en retiro FF.AA.).",
        tipo: "negativo",
        detalle: "Solo portan elementos defensivos autorizados (bastón, esposas, etc.)."
      }
    },
    {
      criterio: "Requisito de Formación",
      vigilante: {
        texto: "Servicio Militar efectivo o ex funcionario FF.AA. / Carabineros.",
        tipo: "positivo",
        detalle: "Mínimo 21 años de edad y 8° básico cumplido."
      },
      guardia: {
        texto: "NO exige formación militar previa.",
        tipo: "positivo",
        detalle: "Mínimo 18 años de edad y educación media completada."
      }
    },
    {
      criterio: "Uniforme Oficial",
      vigilante: {
        texto: "Azul gris perla (color exclusivo e intransferible).",
        tipo: "neutro",
        detalle: "Con credencial oficial (amarilla, verde o azul)."
      },
      guardia: {
        texto: "Sin restricción de color azul corporativo.",
        tipo: "neutro",
        detalle: "Con credencial oficial blanca y logotipo de la empresa."
      }
    },
    {
      criterio: "Regulación y Autorización",
      vigilante: {
        texto: "Decreto del Ministerio del Interior y Defensa · Estudio de Seguridad.",
        tipo: "neutro",
        detalle: "Documento secreto de 1 a 4 años de vigencia."
      },
      guardia: {
        texto: "Directiva de Funcionamiento (Prefectura OS-10 / SPD).",
        tipo: "neutro",
        detalle: "Aprobada formalmente por cada instalación o faena."
      }
    },
    {
      criterio: "Entidades e Instalaciones Típicas",
      vigilante: {
        texto: "Bancos, empresas de transporte de valores y entidades estratégicas.",
        tipo: "neutro",
        detalle: "Instalaciones clasificadas de alto riesgo o obligadas por ley."
      },
      guardia: {
        texto: "Centros comerciales, condominios, empresas, eventos y oficinas.",
        tipo: "neutro",
        detalle: "Recintos privados y públicos con acceso delimitado."
      }
    }
  ];

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/95 shadow-2xl text-slate-100">
      {/* Cabecera del cuadro comparativo */}
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-center md:p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 text-xs font-black text-cyan-400 uppercase tracking-widest mb-2">
          <span>⚖️</span> Marco Legal Vigente · Ley N° 21.659 y D.S. N° 209
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white">
          Diferencias Clave: Vigilante Privado vs. Guardia de Seguridad
        </h3>
        <p className="mt-1 text-xs text-slate-400 max-w-2xl mx-auto">
          Cuadro técnico comparativo oficial de funciones, requisitos, armamento y normativas exigidas por la Subsecretaría de Prevención del Delito y Carabineros OS-10.
        </p>
      </div>

      {/* Tabla responsiva */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
        {/* Columna Vigilante Privado */}
        <div className="bg-slate-900/50">
          <div className="sticky top-0 bg-slate-800/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-700 text-center">
            <h4 className="text-base font-black text-cyan-300 flex items-center justify-center gap-2">
              <span>🛡️</span> Vigilante Privado (VV.PP.)
            </h4>
          </div>
          <div className="p-4 md:p-6 space-y-6">
            {comparaciones.map((c, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400 block">
                  {c.criterio}
                </span>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-bold text-slate-200 leading-snug">
                    {c.vigilante.tipo === "positivo" && <span className="text-emerald-400 font-extrabold mr-1.5">✅</span>}
                    {c.vigilante.tipo === "negativo" && <span className="text-red-400 font-extrabold mr-1.5">❌</span>}
                    {c.vigilante.texto}
                  </span>
                </div>
                {c.vigilante.detalle && (
                  <p className="text-[11px] text-slate-400 italic pl-5">
                    {c.vigilante.detalle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Columna Guardia de Seguridad */}
        <div className="bg-slate-900/50">
          <div className="sticky top-0 bg-slate-800/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-700 text-center">
            <h4 className="text-base font-black text-amber-300 flex items-center justify-center gap-2">
              <span>👮</span> Guardia de Seguridad (GG.SS.)
            </h4>
          </div>
          <div className="p-4 md:p-6 space-y-6">
            {comparaciones.map((c, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                  {c.criterio}
                </span>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-bold text-slate-200 leading-snug">
                    {c.guardia.tipo === "positivo" && <span className="text-emerald-400 font-extrabold mr-1.5">✅</span>}
                    {c.guardia.tipo === "negativo" && <span className="text-red-400 font-extrabold mr-1.5">❌</span>}
                    {c.guardia.texto}
                  </span>
                </div>
                {c.guardia.detalle && (
                  <p className="text-[11px] text-slate-400 italic pl-5">
                    {c.guardia.detalle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
