"use client";

import { FIRMA_LORENA_BASE64, FIRMA_ERCIO_BASE64 } from "@/lib/firmasBase64";
import QRCodeAprecap from "./QRCodeAprecap";
import { formatRut } from "@/lib/rut";

export const CURSOS_CERTIFICADO = [
  {
    slug: "guardia-de-seguridad",
    nombre: "CURSO DE FORMACIÓN DE GUARDIA DE SEGURIDAD SPD",
    horas: "90",
  },
  {
    slug: "operador-cctv-y-alarmas",
    nombre: "CURSO DE OPERADOR DE CCTV Y ALARMAS",
    horas: "40",
  },
  {
    slug: "supervisor-de-seguridad",
    nombre: "CURSO DE SUPERVISOR DE SEGURIDAD PRIVADA",
    horas: "140",
  },
  {
    slug: "baston-y-esposas",
    nombre: "CURSO DE BASTÓN Y ESPOSAS",
    horas: "10",
  },
];

function fechaHoyLarga(): string {
  const f = new Date();
  const dia = f.getDate();
  const mes = f.toLocaleDateString("es-CL", { month: "long" });
  const anio = f.getFullYear();
  return `${dia} de ${mes} de ${anio}`;
}

interface DiplomaCertificadoProps {
  nombre: string;
  rut: string;
  curso: { nombre: string; horas: string; slug?: string };
  fechaPersonalizada?: string;
}

export default function DiplomaCertificado({
  nombre,
  rut,
  curso,
  fechaPersonalizada,
}: DiplomaCertificadoProps) {
  const rutFormateado = rut && rut !== "—" ? formatRut(rut) : rut || "—";
  const fechaTexto = fechaPersonalizada || fechaHoyLarga();

  return (
    <div
      id="diploma-impresion"
      className="certificado-aprecap mx-auto max-w-4xl rounded-sm bg-white p-2 shadow-2xl print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none"
    >
      <div className="relative border-4 border-double border-apre-blue p-6 md:p-10 text-center bg-gradient-to-b from-white via-white to-slate-50/40">
        {/* Cabecera y Logos */}
        <div>
          <img
            src="/logo/logo.png"
            alt="APRECAP OTEC"
            className="mx-auto h-20 w-20 object-contain"
          />
          <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-apre-blue">
            Organismo Técnico de Capacitación Acreditado por ICONTEC NCH 2728:2015
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">
            Autorizada por SENCE · Servicio Nacional de Capacitación y Empleo · Ministerio
            del Trabajo y Previsión Social
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">
            Autorizado por la Subsecretaría de Prevención del Delito (SPD) · Fiscalizado por Carabineros de Chile · DIRECTEMAR
          </p>
          <p className="mt-2 text-sm font-black text-apre-blue uppercase tracking-wide">
            Aprecap Spa · Centro de Capacitación y Desarrollo Humano
          </p>
          <p className="mt-1 text-[11px] italic text-gray-500 font-serif">
            Otorga el presente
          </p>

          {/* Título Principal */}
          <h2 className="mt-3 font-serif text-4xl font-black uppercase tracking-[0.25em] text-apre-red md:text-5xl drop-shadow-xs">
            Certificado
          </h2>

          <p className="mt-6 text-xs uppercase tracking-widest text-gray-500 font-semibold">
            A
          </p>
          <p className="mx-auto mt-1 max-w-2xl font-serif text-2xl font-black uppercase text-gray-900 md:text-3xl tracking-wide">
            {nombre || "—"}
          </p>
          <p className="mt-1.5 text-sm font-semibold text-gray-700">
            RUT: <span className="font-mono font-bold text-gray-900">{rutFormateado}</span>
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-700">
            Por su participación y aprobación en el curso de:
          </p>
          <p className="mx-auto mt-2 max-w-2xl font-serif text-lg font-black uppercase text-apre-blue md:text-xl">
            “{curso.nombre}”
          </p>

          {/* Duración centrada en mayúsculas estilo diseño oficial */}
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-gray-700">
            DURACIÓN: {curso.horas} HORAS
          </p>
        </div>

        {/* Sección de Firmas y Sello QR Central */}
        <div className="mt-8 grid grid-cols-3 items-end gap-4 border-t border-gray-100 pt-4">
          {/* Firma 1: Lorena Ortiz Rojas (Directora Académica) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 flex items-end justify-center">
              <img
                src={FIRMA_LORENA_BASE64}
                alt="Firma Lorena Ortiz Rojas"
                className="max-h-16 w-auto object-contain pointer-events-none select-none"
              />
            </div>
            <div className="w-full max-w-[200px] border-t-2 border-gray-400 pt-2" />
            <p className="text-xs font-bold text-gray-900">Lorena Ortiz Rojas</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              DIRECTORA ACADÉMICA
            </p>
          </div>

          {/* Centro: QR Oficial APRECAP a www.aprecap.cl (sin contorno rojo) */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-white p-1">
              <QRCodeAprecap url="https://www.aprecap.cl" size={56} />
              <span className="mt-1 text-[8px] font-black uppercase tracking-wider text-apre-blue">
                APRECAP
              </span>
            </div>
          </div>

          {/* Firma 2: Ercio Saavedra Aravena (Director · Gerente) */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 flex items-end justify-center">
              <img
                src={FIRMA_ERCIO_BASE64}
                alt="Firma Ercio Saavedra Aravena"
                className="max-h-16 w-auto object-contain pointer-events-none select-none"
              />
            </div>
            <div className="w-full max-w-[200px] border-t-2 border-gray-400 pt-2" />
            <p className="text-xs font-bold text-gray-900">Ercio Saavedra Aravena</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              DIRECTOR · GERENTE
            </p>
          </div>
        </div>

        {/* Pie de Página: Fecha y Enlace Oficial */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold text-gray-600">
            Santiago, {fechaTexto}
          </p>
          <p className="mt-1 text-xs font-black text-apre-blue tracking-wide">
            www.aprecap.cl
          </p>
        </div>

        {/* Doble línea azul marino inferior idéntica al diseño de muestra */}
        <div className="mt-5 border-b-4 border-double border-apre-blue w-full" />
      </div>
    </div>
  );
}
