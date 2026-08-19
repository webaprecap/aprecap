"use client";

import Link from "next/link";
import { CourseAccessStatus } from "@/lib/courseAccess";

interface CursoAccessGateProps {
  cursoTitulo: string;
  cursoSlug: string;
  status: CourseAccessStatus;
  onRequestAccess?: () => void;
  solicitando?: boolean;
  isNotLoggedIn?: boolean;
}

export default function CursoAccessGate({
  cursoTitulo,
  status,
  onRequestAccess,
  solicitando = false,
  isNotLoggedIn = false,
}: CursoAccessGateProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-900 px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-slate-950 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl text-cyan-400 border border-cyan-500/20 mb-5">
          {isNotLoggedIn ? "🔐" : status === "pendiente" ? "⏳" : status === "rechazado" ? "🚫" : "🔒"}
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20 uppercase tracking-widest">
          Aula Restringida APRECAP
        </span>

        <h1 className="mt-3 text-2xl font-black text-white">
          {cursoTitulo}
        </h1>

        {isNotLoggedIn ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Para ingresar al material de estudio, clases en vivo y evaluaciones de este curso, debes iniciar sesión con tu cuenta de estudiante autorizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/login"
                className="flex-1 rounded-xl bg-cyan-500 py-3 text-xs font-black text-slate-950 transition hover:bg-cyan-400 shadow-lg"
              >
                🔑 Iniciar Sesión
              </Link>
              <Link
                href="/solicitar-acceso"
                className="flex-1 rounded-xl bg-white/10 py-3 text-xs font-black text-white transition hover:bg-white/20 border border-white/10"
              >
                📝 Solicitar Matrícula
              </Link>
            </div>
          </div>
        ) : status === "pendiente" ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-amber-200 text-xs leading-relaxed">
              ⏳ <strong>Solicitud en revisión:</strong> Ya hemos recibido tu petición de acceso para este curso. La administración de APRECAP habilitará tu ingreso a la brevedad.
            </div>
            <Link
              href="/panel/alumno"
              className="inline-block rounded-xl bg-white/10 px-6 py-3 text-xs font-black text-white transition hover:bg-white/20 border border-white/10"
            >
              ← Volver a mi Panel de Alumno
            </Link>
          </div>
        ) : status === "rechazado" ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-200 text-xs leading-relaxed">
              🚫 <strong>Acceso no autorizado:</strong> Tu solicitud para este curso no ha sido aprobada. Si consideras que es un error, contáctanos por WhatsApp.
            </div>
            <Link
              href="/panel/alumno"
              className="inline-block rounded-xl bg-white/10 px-6 py-3 text-xs font-black text-white transition hover:bg-white/20 border border-white/10"
            >
              ← Volver a mi Panel de Alumno
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Este curso requiere autorización administrativa previa. Puedes solicitar la habilitación de este curso directamente con un clic.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              {onRequestAccess && (
                <button
                  onClick={onRequestAccess}
                  disabled={solicitando}
                  className="w-full rounded-xl bg-cyan-500 py-3.5 text-xs font-black text-slate-950 transition hover:bg-cyan-400 shadow-lg disabled:opacity-50"
                >
                  {solicitando ? "Enviando solicitud…" : "🚀 Solicitar Acceso a este Curso"}
                </button>
              )}
              <Link
                href="/panel/alumno"
                className="w-full rounded-xl bg-white/10 py-3 text-xs font-bold text-white transition hover:bg-white/20 border border-white/10"
              >
                ← Volver a mi Panel de Alumno
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
