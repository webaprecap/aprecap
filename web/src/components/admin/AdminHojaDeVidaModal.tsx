"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import { formatRut } from "@/lib/rut";
import type { StudentProfileData } from "./AdminGlobalSearch";

interface AdminHojaDeVidaModalProps {
  student: StudentProfileData | null;
  onClose: () => void;
  onIrAGestionCurso?: (slug: string) => void;
  onEmitirDiploma?: (datos: { uid: string; nombre: string; rut: string; cursoSlug: string }) => void;
}

export default function AdminHojaDeVidaModal({
  student,
  onClose,
  onIrAGestionCurso,
  onEmitirDiploma,
}: AdminHojaDeVidaModalProps) {
  const [evaluaciones, setEvaluaciones] = useState<any[]>([]);
  const [cargandoEvaluaciones, setCargandoEvaluaciones] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState<"resumen" | "cursos" | "evaluaciones">("resumen");

  // Escuchar tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Cargar historial de evaluaciones del alumno en tiempo real
  useEffect(() => {
    if (!student) return;
    setCargandoEvaluaciones(true);
    const db = getFirestoreDb();
    if (!db) {
      setCargandoEvaluaciones(false);
      return;
    }

    const q = query(
      collection(db, "resultados_evaluaciones"),
      where("userId", "==", student.uid)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Ordenar por fecha descendente
        data.sort((a: any, b: any) => {
          const tA = a.fecha?.toDate?.()?.getTime?.() || a.fecha?.seconds * 1000 || 0;
          const tB = b.fecha?.toDate?.()?.getTime?.() || b.fecha?.seconds * 1000 || 0;
          return tB - tA;
        });
        setEvaluaciones(data);
        setCargandoEvaluaciones(false);
      },
      (err) => {
        console.error("Error al cargar evaluaciones de alumno:", err);
        setCargandoEvaluaciones(false);
      }
    );

    return () => unsub();
  }, [student]);

  if (!student) return null;

  const initials = (student.nombre || "E")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const cleanPhone = (student.telefono || "").replace(/[^0-9]/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("56") ? cleanPhone : `56${cleanPhone}`}`
    : null;

  const formatearFecha = (rawFecha: any) => {
    if (!rawFecha) return "No registrada";
    try {
      const d = rawFecha.toDate?.() || (rawFecha.seconds ? new Date(rawFecha.seconds * 1000) : new Date(rawFecha));
      return isNaN(d.getTime())
        ? "Fecha inválida"
        : d.toLocaleDateString("es-CL", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return "No disponible";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 print:hidden">
      {/* Backdrop oscuro con Glassmorphism */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Ventana Modal */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Cabecera Estilizada */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 bg-gradient-to-r from-apre-blue to-[#003554] p-5 md:p-6 text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl font-black text-white shadow-md border border-white/20">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-white truncate">
                  {student.nombre}
                </h2>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-black text-emerald-300 border border-emerald-400/30">
                  {student.activo ? "Cuenta Activa" : "Inactiva"}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-white/80 font-medium">
                {student.rut && (
                  <span className="rounded-lg bg-white/15 px-2 py-0.5 font-mono font-bold text-white">
                    {formatRut(student.rut)}
                  </span>
                )}
                <span>📧 {student.email}</span>
                {student.telefono && <span>📱 {student.telefono}</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-black text-white shadow-sm hover:bg-emerald-600 transition"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition cursor-pointer text-lg font-bold"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación Interna */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6 shrink-0">
          <button
            type="button"
            onClick={() => setSeccionActiva("resumen")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition cursor-pointer ${
              seccionActiva === "resumen"
                ? "border-apre-blue text-apre-blue font-black"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <span>📋</span>
            <span>Resumen del Alumno</span>
          </button>
          <button
            type="button"
            onClick={() => setSeccionActiva("cursos")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition cursor-pointer ${
              seccionActiva === "cursos"
                ? "border-apre-blue text-apre-blue font-black"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <span>📚</span>
            <span>Cursos y Progreso ({student.cursos.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setSeccionActiva("evaluaciones")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition cursor-pointer ${
              seccionActiva === "evaluaciones"
                ? "border-apre-blue text-apre-blue font-black"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <span>📝</span>
            <span>Evaluaciones y Notas ({evaluaciones.length})</span>
          </button>
        </div>

        {/* Contenido con Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain">
          {/* SECCIÓN 1: RESUMEN */}
          {seccionActiva === "resumen" && (
            <div className="space-y-6">
              {/* Tarjetas de Indicadores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4 shadow-2xs">
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Cursos Matriculados</p>
                  <p className="mt-1 text-2xl font-black text-apre-blue">
                    {student.totalCursosActivos}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-emerald-50/60 p-4 shadow-2xs">
                  <p className="text-[11px] font-bold text-emerald-600 uppercase">Cursos Aprobados</p>
                  <p className="mt-1 text-2xl font-black text-emerald-700">
                    {student.cursos.filter((c) => c.estado === "aprobado").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-amber-50/60 p-4 shadow-2xs">
                  <p className="text-[11px] font-bold text-amber-600 uppercase">En Cursado Activo</p>
                  <p className="mt-1 text-2xl font-black text-amber-700">
                    {student.cursos.filter((c) => c.estado === "cursando").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-cyan-50/60 p-4 shadow-2xs">
                  <p className="text-[11px] font-bold text-cyan-600 uppercase">Pruebas Rendidas</p>
                  <p className="mt-1 text-2xl font-black text-cyan-700">
                    {evaluaciones.length}
                  </p>
                </div>
              </div>

              {/* Ficha de Información General */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                  <span>👤</span>
                  <span>Datos de la Ficha Personal</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">Nombre Completo</span>
                    <p className="mt-0.5 font-bold text-gray-900 text-sm">{student.nombre}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">RUT / Documento</span>
                    <p className="mt-0.5 font-bold text-gray-900 text-sm">
                      {student.rut ? formatRut(student.rut) : "Sin registrar"}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">Correo Electrónico</span>
                    <p className="mt-0.5 font-bold text-gray-900">{student.email}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">Teléfono de Contacto</span>
                    <p className="mt-0.5 font-bold text-gray-900">
                      {student.telefono || "No especificado"}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">Fecha de Registro</span>
                    <p className="mt-0.5 text-gray-700">{formatearFecha(student.fechaRegistro)}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 uppercase text-[10px]">UID del Sistema</span>
                    <p className="mt-0.5 font-mono text-[11px] text-gray-500 truncate">{student.uid}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: CURSOS Y MATRÍCULAS */}
          {seccionActiva === "cursos" && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <span>📚</span>
                <span>Cursos Registrados y Progreso Temporal</span>
              </h3>

              {student.cursos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                  <p className="text-3xl mb-1">📭</p>
                  <p className="font-bold text-xs">El alumno no tiene matrículas activas ni pendientes.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {student.cursos.map((c) => (
                    <div
                      key={c.slug}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs flex flex-col justify-between gap-3 hover:border-apre-blue/40 transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xl shrink-0">{c.icono}</span>
                            <h4 className="font-extrabold text-sm text-gray-900 truncate">
                              {c.nombre}
                            </h4>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                              c.estado === "aprobado"
                                ? "bg-emerald-100 text-emerald-800"
                                : c.estado === "cursando"
                                ? "bg-sky-100 text-sky-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {c.estado === "aprobado"
                              ? "🎓 Aprobado"
                              : c.estado === "cursando"
                              ? "🟡 Cursando"
                              : "⚪ Pendiente"}
                          </span>
                        </div>

                        {c.diaActual && c.totalDias && (
                          <div className="mt-3">
                            <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1">
                              <span>Progreso Temporal (Días Calendario)</span>
                              <span>
                                Día {c.diaActual} de {c.totalDias}
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full bg-apre-blue rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.min(100, (c.diaActual / c.totalDias) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                        {c.estado === "aprobado" && onEmitirDiploma ? (
                          <button
                            type="button"
                            onClick={() => {
                              onEmitirDiploma({
                                uid: student.uid,
                                nombre: student.nombre,
                                rut: student.rut || "",
                                cursoSlug: c.slug,
                              });
                              onClose();
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 font-bold text-white shadow-xs hover:bg-emerald-700 transition"
                          >
                            <span>📜</span>
                            <span>Emitir Diploma</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-gray-400">
                            {c.fechaMatricula ? `Matriculado: ${formatearFecha(c.fechaMatricula)}` : ""}
                          </span>
                        )}

                        {onIrAGestionCurso && (
                          <button
                            type="button"
                            onClick={() => {
                              onIrAGestionCurso(c.slug);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-apre-blue hover:underline cursor-pointer ml-auto"
                          >
                            <span>Gestionar en panel</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 3: EVALUACIONES Y NOTAS */}
          {seccionActiva === "evaluaciones" && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <span>📝</span>
                <span>Registro de Evaluaciones y Pruebas Rendidas</span>
              </h3>

              {cargandoEvaluaciones ? (
                <div className="p-8 text-center text-gray-400 text-xs font-medium">
                  Cargando resultados de evaluaciones…
                </div>
              ) : evaluaciones.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                  <p className="text-3xl mb-1">✍️</p>
                  <p className="font-bold text-xs">El alumno aún no ha rendido evaluaciones ni exámenes.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {evaluaciones.map((ev) => {
                    const pct = Math.round(Number(ev.porcentaje || 0));
                    const aprobado = ev.aprobado === true || pct >= 75;

                    return (
                      <div
                        key={ev.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs hover:border-gray-300 transition"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${
                                aprobado ? "bg-emerald-500" : "bg-red-500"
                              }`}
                            >
                              {aprobado ? "✓" : "✕"}
                            </span>
                            <p className="font-extrabold text-sm text-gray-900 truncate">
                              {ev.moduloNombre || `Evaluación ${ev.courseSlug || ""}`}
                            </p>
                            {ev.esExamenFinal && (
                              <span className="shrink-0 rounded bg-apre-red/10 px-2 py-0.5 text-[10px] font-black text-apre-red uppercase">
                                Examen Final
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[11px] text-gray-500">
                            Rendido: {formatearFecha(ev.fecha)} · Respuestas correctas:{" "}
                            <span className="font-bold text-gray-700">
                              {ev.correctas ?? "-"} / {ev.total ?? "-"}
                            </span>
                          </p>
                        </div>

                        {/* Porcentaje y Calificación */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span
                              className={`text-lg font-black ${
                                aprobado ? "text-emerald-600" : "text-red-600"
                              }`}
                            >
                              {pct}%
                            </span>
                            <span className="block text-[10px] font-bold uppercase text-gray-400">
                              {aprobado ? "Aprobado" : "Reprobado"}
                            </span>
                          </div>
                          <div
                            className={`h-10 w-2 rounded-full ${
                              aprobado ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer con Botón Cerrar */}
        <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50 px-6 py-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2 text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-50 transition cursor-pointer"
          >
            Cerrar Expediente
          </button>
        </div>
      </div>
    </div>
  );
}
