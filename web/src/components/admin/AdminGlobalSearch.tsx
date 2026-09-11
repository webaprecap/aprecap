"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CURSOS_LISTA, getCourseFieldKey } from "@/lib/courseAccess";
import { getDiaActualCurso, COURSE_TIMING_CONFIG } from "@/lib/courseTiming";
import { formatRut } from "@/lib/rut";

export interface StudentCourseStatus {
  slug: string;
  nombre: string;
  icono: string;
  estado: "aprobado" | "cursando" | "pendiente" | "sin_acceso";
  diaActual?: number;
  totalDias?: number;
  porcentaje?: number;
  fechaMatricula?: any;
}

export interface StudentProfileData {
  uid: string;
  nombre: string;
  email: string;
  rut?: string;
  telefono?: string;
  activo?: boolean;
  fechaRegistro?: any;
  cursos: StudentCourseStatus[];
  totalCursosActivos: number;
  tieneAprobados: boolean;
  rawUser: any;
}

interface AdminGlobalSearchProps {
  usuarios: any[];
  enrollments: any[];
  solicitudes: any[];
  evaluaciones?: any[];
  onSelectStudent: (student: StudentProfileData) => void;
}

/**
 * Normaliza cadenas de texto eliminando tildes, diacríticos y espacios extras
 * para que búsquedas como "matias" encuentren "Matias", "Matías", "MÁtias", etc.
 */
export function normalizeSearch(str?: string | null): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Normaliza un RUT quitando puntos, guion y espacios
 */
export function cleanRut(rut?: string | null): string {
  if (!rut) return "";
  return rut.replace(/[^0-9kK]/g, "").toLowerCase();
}

export default function AdminGlobalSearch({
  usuarios,
  enrollments,
  solicitudes,
  evaluaciones = [],
  onSelectStudent,
}: AdminGlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Atajo global Ctrl+K o Cmd+K para enfocar el buscador
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Consolidar todos los estudiantes con sus cursos y estados
  const allStudents = useMemo<StudentProfileData[]>(() => {
    if (!usuarios || !Array.isArray(usuarios)) return [];

    return usuarios
      .filter((u) => u && (u.rol === "alumno" || !u.rol))
      .map((u) => {
        const uid = u.id || u.uid || "";
        const email = (u.email || "").toLowerCase().trim();
        const userEnrollments = enrollments.filter(
          (e) => (e.uid && e.uid === uid) || (e.email && e.email.toLowerCase() === email)
        );

        const userEvaluaciones = evaluaciones.filter(
          (ev) => (ev.userId && ev.userId === uid) || (ev.userEmail && ev.userEmail.toLowerCase() === email)
        );

        const userSolicitudes = solicitudes.filter(
          (s) => (s.email && s.email.toLowerCase() === email) || (s.userId && s.userId === uid)
        );

        const cursosEstudiante: StudentCourseStatus[] = [];

        CURSOS_LISTA.forEach((curso) => {
          const fieldKey = getCourseFieldKey(curso.slug);
          const enr = userEnrollments.find((e) => e.courseSlug === curso.slug);
          const directAccess = u[fieldKey] === "aceptado" || u[fieldKey] === true;
          const solPendiente = userSolicitudes.some(
            (s) =>
              s.estado === "pendiente" &&
              (s.cursoDeseado === curso.slug ||
                (Array.isArray(s.cursosDeseados) && s.cursosDeseados.includes(curso.slug)))
          );

          // Buscar si aprobó examen final
          const examenAprobado = userEvaluaciones.some(
            (ev) =>
              ev.courseSlug === curso.slug &&
              (ev.aprobado === true || (typeof ev.porcentaje === "number" && ev.porcentaje >= 75)) &&
              (ev.esExamenFinal === true || ev.tipo === "examen_final")
          );

          if (enr || directAccess || solPendiente || examenAprobado) {
            let estado: "aprobado" | "cursando" | "pendiente" | "sin_acceso" = "cursando";
            let diaActual: number | undefined = undefined;
            const timing = COURSE_TIMING_CONFIG[curso.slug];
            const totalDias = timing?.totalDias;

            if (examenAprobado || enr?.estado === "aprobado") {
              estado = "aprobado";
            } else if (solPendiente && !enr && !directAccess) {
              estado = "pendiente";
            } else {
              estado = "cursando";
              const fechaMatricula = enr?.fechaMatricula || u.fechaRegistro;
              if (timing && fechaMatricula) {
                diaActual = getDiaActualCurso(fechaMatricula);
              }
            }

            cursosEstudiante.push({
              slug: curso.slug,
              nombre: curso.shortName || curso.nombre,
              icono: curso.icono,
              estado,
              diaActual,
              totalDias,
              fechaMatricula: enr?.fechaMatricula,
            });
          }
        });

        const tieneAprobados = cursosEstudiante.some((c) => c.estado === "aprobado");
        const totalCursosActivos = cursosEstudiante.filter(
          (c) => c.estado === "cursando" || c.estado === "aprobado"
        ).length;

        return {
          uid,
          nombre: u.nombre || email.split("@")[0] || "Estudiante",
          email: u.email || "",
          rut: u.rut || "",
          telefono: u.telefono || "",
          activo: u.activo !== false,
          fechaRegistro: u.fechaRegistro,
          cursos: cursosEstudiante,
          totalCursosActivos,
          tieneAprobados,
          rawUser: u,
        };
      });
  }, [usuarios, enrollments, solicitudes, evaluaciones]);

  // Filtrar resultados según la consulta normalizada
  const filteredStudents = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return [];

    const qCleanRut = cleanRut(query);

    return allStudents.filter((student) => {
      const nameNorm = normalizeSearch(student.nombre);
      const emailNorm = normalizeSearch(student.email);
      const rutClean = cleanRut(student.rut);

      // Búsqueda por coincidencia en nombre normalizado (ej: "matias" hace match con "Mátias")
      if (nameNorm.includes(q)) return true;

      // Búsqueda por email
      if (emailNorm.includes(q)) return true;

      // Búsqueda por RUT (sin puntos ni guion)
      if (qCleanRut && rutClean.includes(qCleanRut)) return true;

      // Búsqueda por nombre de curso que esté realizando
      const matchCurso = student.cursos.some((c) =>
        normalizeSearch(c.nombre).includes(q)
      );
      if (matchCurso) return true;

      return false;
    }).slice(0, 15); // Máximo 15 resultados rápidos
  }, [allStudents, query]);

  // Manejo de teclado en la lista desplegable
  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredStudents.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredStudents.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredStudents.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredStudents[selectedIndex]) {
        onSelectStudent(filteredStudents[selectedIndex]);
        setIsOpen(false);
      }
    }
  };

  const handleSelect = (student: StudentProfileData) => {
    onSelectStudent(student);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      {/* Barra de entrada estilizada */}
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-gray-400 pointer-events-none text-base">
          🔍
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDownInput}
          placeholder="Buscar alumno por nombre (ej: Matías), RUT o correo..."
          className="w-full rounded-2xl border border-gray-300 bg-white/95 pl-10 pr-24 py-2.5 text-xs md:text-sm font-medium text-gray-900 placeholder:text-gray-400 shadow-xs backdrop-blur-xs transition focus:border-apre-blue focus:bg-white focus:outline-none focus:ring-3 focus:ring-apre-blue/15"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 shadow-2xs">
              <span>⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Menú Desplegable Flotante de Resultados */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[320px] md:min-w-[460px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-2 text-[11px] font-bold text-gray-500">
            <span>
              {filteredStudents.length > 0
                ? `${filteredStudents.length} alumno(s) encontrado(s)`
                : "Sin resultados"}
            </span>
            <span className="text-[10px] text-gray-400">
              Presiona Enter para ver Hoja de Vida
            </span>
          </div>

          <div className="max-h-[380px] overflow-y-auto overscroll-contain p-1.5 space-y-1">
            {filteredStudents.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-2xl mb-1">🧐</p>
                <p className="text-xs font-bold text-gray-700">
                  No se encontraron coincidencias para &quot;{query}&quot;
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  Verifica que el nombre o RUT esté bien escrito o busca por su correo electrónico.
                </p>
              </div>
            ) : (
              filteredStudents.map((student, idx) => {
                const isSelected = idx === selectedIndex;
                const initials = (student.nombre || "E")
                  .split(" ")
                  .map((p) => p[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <button
                    key={student.uid}
                    type="button"
                    onClick={() => handleSelect(student)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition cursor-pointer ${
                      isSelected
                        ? "bg-apre-blue/10 border-l-4 border-apre-blue shadow-xs"
                        : "border-l-4 border-transparent hover:bg-gray-50"
                    }`}
                  >
                    {/* Avatar con iniciales */}
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-apre-blue to-cyan-700 text-xs font-black text-white shadow-xs">
                      {initials}
                      {student.tieneAprobados && (
                        <span
                          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white ring-2 ring-white"
                          title="Tiene cursos aprobados"
                        >
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Información Central */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-xs md:text-sm font-extrabold text-gray-900">
                          {student.nombre}
                        </p>
                        {student.rut && (
                          <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-600">
                            {formatRut(student.rut)}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-gray-500">
                        {student.email} {student.telefono ? `· ${student.telefono}` : ""}
                      </p>

                      {/* Insignias de Cursos y Estado */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-1">
                        {student.cursos.length === 0 ? (
                          <span className="text-[10px] italic text-gray-400">
                            Sin cursos matriculados
                          </span>
                        ) : (
                          student.cursos.slice(0, 3).map((c) => (
                            <span
                              key={c.slug}
                              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow-2xs ${
                                c.estado === "aprobado"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : c.estado === "cursando"
                                  ? "bg-sky-50 text-sky-700 border border-sky-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              <span>{c.icono}</span>
                              <span className="truncate max-w-[120px]">{c.nombre}</span>
                              <span className="text-[9px]">
                                {c.estado === "aprobado"
                                  ? "🎓 Aprobado"
                                  : c.estado === "cursando" && c.diaActual
                                  ? `(Día ${c.diaActual}${c.totalDias ? `/${c.totalDias}` : ""})`
                                  : c.estado === "pendiente"
                                  ? "(Pendiente)"
                                  : ""}
                              </span>
                            </span>
                          ))
                        )}
                        {student.cursos.length > 3 && (
                          <span className="text-[10px] font-bold text-gray-400">
                            +{student.cursos.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Botón Acción Ver Hoja de Vida */}
                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1 rounded-xl bg-apre-blue px-2.5 py-1 text-[11px] font-black text-white shadow-2xs hover:bg-apre-blue-light transition">
                        <span>Ver Hoja</span>
                        <span>→</span>
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
