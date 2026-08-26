/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";
import ConsentModal from "@/components/ConsentModal";
import DiplomaCertificado, { CURSOS_CERTIFICADO } from "@/components/DiplomaCertificado";
import { CURSOS_LISTA, getCourseFieldKey } from "@/lib/courseAccess";
import { formatRut } from "@/lib/rut";
import { extractYouTubeVideoId, getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "@/lib/youtube";
import {
  COURSE_TIMING_CONFIG,
  getAlumnoSeguimientoTiming,
  getDiaActualCurso,
  normalizarFechaMatricula,
} from "@/lib/courseTiming";
import {
  formatDetalleHorario,
  formatRangoHorario,
  getClaseLiveStatus,
} from "@/lib/claseHorario";

type Tab =
  | "pendientes"
  | "historial"
  | "cohortes"
  | "seguimiento"
  | "aprobados"
  | "cursos-explorar"
  | "cursos-gestion"
  | "alumnos"
  | "profesores"
  | "clases"
  | "reuniones"
  | "zoom-grabaciones"
  | "clases-grabadas"
  | "diplomas"
  | "reportes"
  | "pagos"
  | "contacto"
  | "auditoria";

const NAV_GROUPS: { section: string; items: { id: Tab; label: string; emoji: string }[] }[] = [
  {
    section: "Solicitudes",
    items: [
      { id: "pendientes", label: "Pendientes por Curso", emoji: "📋" },
      { id: "historial", label: "Historial", emoji: "📁" },
    ],
  },
  {
    section: "Cursos y Convocatorias",
    items: [
      { id: "cohortes", label: "Grupos por Fecha (Convocatorias)", emoji: "🗓️" },
      { id: "seguimiento", label: "Seguimiento y Días", emoji: "⏱️" },
      { id: "aprobados", label: "Alumnos Aprobados", emoji: "🎓" },
      { id: "cursos-gestion", label: "Gestión y Matrículas", emoji: "📚" },
      { id: "diplomas", label: "Diplomas y Certificados", emoji: "📜" },
      { id: "cursos-explorar", label: "Ver Cursos Desbloqueados", emoji: "👁️" },
    ],
  },
  {
    section: "Usuarios",
    items: [
      { id: "alumnos", label: "Todos los Alumnos", emoji: "👨‍🎓" },
      { id: "profesores", label: "Profesores", emoji: "👔" },
    ],
  },
  {
    section: "Clases y Grabaciones",
    items: [
      { id: "clases", label: "Clases en Vivo (Admin)", emoji: "🔴" },
      { id: "reuniones", label: "Reuniones Zoom (API)", emoji: "🔁" },
      { id: "zoom-grabaciones", label: "Grabaciones Zoom (Nube)", emoji: "📥" },
      { id: "clases-grabadas", label: "Clases Grabadas (YouTube)", emoji: "📹" },
    ],
  },
  {
    section: "Reportes",
    items: [{ id: "reportes", label: "Notas y Evaluaciones", emoji: "📊" }],
  },
  {
    section: "Gestión",
    items: [
      { id: "contacto", label: "Contacto", emoji: "✉️" },
      { id: "auditoria", label: "Auditoría", emoji: "🛡️" },
    ],
  },
];


const CURSOS_PLATAFORMA = cursosOtec.filter((c) =>
  [
    "guardia-de-seguridad",
    "baston-y-esposas",
    "supervisor-de-seguridad",
    "operador-cctv-y-alarmas",
  ].includes(c.slug)
);

function cursoNombreDe(slug: string) {
  return (
    [...cursosLP, ...cursosOtec].find((c) => c.slug === slug)?.title ?? slug
  );
}

function useCount(coleccion: string, campo?: string, valor?: string) {
  const db = getFirestoreDb();
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!db) return;
    const q =
      campo && valor
        ? query(collection(db, coleccion), where(campo, "==", valor))
        : query(collection(db, coleccion));
    return onSnapshot(q, (snap) => setN(snap.size));
  }, [db, coleccion, campo, valor]);
  return n;
}

export default function PanelAdmin() {
  const { userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pendientes");
  const [diplomaPreselect, setDiplomaPreselect] = useState<{
    uid?: string;
    nombre?: string;
    rut?: string;
    cursoSlug?: string;
  } | null>(null);
  const [grabadaPreselect, setGrabadaPreselect] = useState<{
    titulo?: string;
    fecha?: string;
  } | null>(null);

  const pendientesCount = useCount("solicitudes", "estado", "pendiente");
  const alumnosCount = useCount("usuarios", "rol", "alumno");
  const profesoresCount = useCount("usuarios", "rol", "profesor");
  const clasesActivasCount = useCount("clases", "estado", "activa");
  const clasesGrabadasCount = useCount("clases_grabadas");

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (!loading && (!userData || (userData.rol !== "admin" && userData.rol !== "superadmin"))) {
      router.push("/login");
    }
  }, [userData, loading, router]);

  if (loading || !userData) return <p className="p-8 text-center text-gray-500">Cargando…</p>;

  const badgeDe = (id: Tab): number | null => {
    switch (id) {
      case "pendientes":
        return pendientesCount;
      case "alumnos":
        return alumnosCount;
      case "profesores":
        return profesoresCount;
      case "clases":
        return clasesActivasCount;
      case "clases-grabadas":
        return clasesGrabadasCount;
      default:
        return null;
    }
  };


  const tituloTab = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.id === tab);

  const irADiplomaAprobado = (datos: { uid: string; nombre: string; rut: string; cursoSlug: string }) => {
    setDiplomaPreselect(datos);
    setTab("diplomas");
  };

  return (
    <>
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar izquierda estilo sarmat */}
        <aside className="w-full shrink-0 border-b border-apre-blue-light bg-apre-blue lg:fixed lg:bottom-0 lg:left-0 lg:top-20 lg:z-40 lg:flex lg:w-[280px] lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r print:hidden">
          <div className="border-b border-white/10 p-4">
            <p className="text-sm font-black text-white">🛡️ Panel de Administración</p>
            <p className="text-xs text-white/60">OTEC APRECAP</p>
          </div>

          <nav className="flex-1 space-y-5 p-3">
            {NAV_GROUPS.map((g) => (
              <div key={g.section}>
                <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-widest text-white/40">
                  {g.section}
                </p>
                <div className="space-y-1">
                  {g.items.map((i) => {
                    const active = tab === i.id;
                    const badge = badgeDe(i.id);
                    return (
                      <button
                        key={i.id}
                        onClick={() => setTab(i.id)}
                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                          active
                            ? "border-l-4 border-[#c9a227] bg-white/10 text-white"
                            : "border-l-4 border-transparent text-white/75 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate">
                          {i.emoji} {i.label}
                        </span>
                        {badge !== null && (
                          <span className="shrink-0 rounded-full bg-[#c9a227] px-2 py-0.5 text-[10px] font-black text-apre-blue">
                            {badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">{userData.rol === "superadmin" ? "👑" : "🛡️"}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{userData.nombre}</p>
                <p className="truncate text-xs text-white/60">{userData.email}</p>
                <span className="mt-0.5 inline-block rounded bg-white/15 px-2 py-0.5 text-[10px] font-black uppercase text-amber-300">
                  {userData.rol === "superadmin" ? "Superadmin" : "Admin"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/90 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow"
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Contenido */}
        <main className="flex-1 lg:pl-[280px] print:pl-0 print:p-0 print:m-0">
          <div className="px-4 py-6 md:px-8 print:p-0 print:m-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 print:hidden">
              <div>
                <h1 className="text-2xl font-extrabold text-apre-blue">
                  {tituloTab?.emoji} {tituloTab?.label}
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  {userData.rol === "superadmin" ? "Superadministrador" : "Administrador"} · {userData.nombre} ({userData.email})
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-apre-blue/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-apre-blue border border-apre-blue/15">
                  <span>{userData.rol === "superadmin" ? "👑" : "🛡️"}</span>
                  <span>{userData.rol === "superadmin" ? "Superadmin" : "Admin"}</span>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 hover:border-red-300 shadow-xs"
                >
                  <span>🚪</span>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>

            {tab === "pendientes" && <PendientesTab />}
            {tab === "historial" && <HistorialTab />}
            {tab === "cohortes" && <CohortesTab />}
            {tab === "seguimiento" && <SeguimientoTab onEmitirDiploma={irADiplomaAprobado} />}
            {tab === "aprobados" && <AprobadosTab onEmitirDiploma={irADiplomaAprobado} />}
            {tab === "cursos-explorar" && <CursosExplorarTab onIrAGestion={() => setTab("cursos-gestion")} />}
            {tab === "cursos-gestion" && <CursosGestionTab onEmitirDiploma={irADiplomaAprobado} />}
            {tab === "alumnos" && <UsuariosTab filtroRol="alumno" />}
            {tab === "profesores" && <UsuariosTab filtroRol="profesor" />}
            {tab === "clases" && (
              <ClasesTab
                onPublicarGrabada={(datos) => {
                  setGrabadaPreselect(datos);
                  setTab("clases-grabadas");
                }}
              />
            )}
            {tab === "reuniones" && <ReunionesTab />}
            {tab === "zoom-grabaciones" && (
              <ZoomGrabacionesTab
                onPublicar={(datos) => {
                  setGrabadaPreselect(datos);
                  setTab("clases-grabadas");
                }}
              />
            )}
            {tab === "clases-grabadas" && <ClasesGrabadasTab preselect={grabadaPreselect} />}
            {tab === "diplomas" && <DiplomasTab preselect={diplomaPreselect} />}
            {tab === "reportes" && <ReportesTab />}
            {tab === "pagos" && <PagosTab />}
            {tab === "contacto" && <ContactoTab />}
            {tab === "auditoria" && <AuditoriaTab />}

          </div>
        </main>
      </div>
      <ConsentModal />
    </>
  );
}

/* ---------- Solicitudes Pendientes (Con pestañas por curso y asignación de cohortes) ---------- */
function PendientesTab() {
  const db = getFirestoreDb();
  const [items, setItems] = useState<any[]>([]);
  const [cohortes, setCohortes] = useState<any[]>([]);
  const [filtroCurso, setFiltroCurso] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [modalAprobar, setModalAprobar] = useState<any | null>(null);
  const [cohorteSel, setCohorteSel] = useState<string>("");

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(query(collection(db, "solicitudes"), where("estado", "==", "pendiente")), (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "cohortes"), (snap) =>
      setCohortes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  const aprobar = async (s: any, cohorteIdElegida?: string) => {
    if (!db) return;
    const uidTemp = s.email.replace(/[^a-z0-9@._-]/gi, "-").toLowerCase();
    const nombreCompleto = [s.nombres, s.apellidoPaterno, s.apellidoMaterno]
      .filter(Boolean)
      .join(" ")
      .trim();

    const cursoSlug = s.cursoDeseado || "guardia-de-seguridad";
    const fieldKey = getCourseFieldKey(cursoSlug);

    const targetCohorteId = cohorteIdElegida || cohorteSel;
    const cohorteObj = cohortes.find((c) => c.id === targetCohorteId);
    const cohorteNombre = cohorteObj?.nombre || null;
    const cohorteId = cohorteObj?.id || null;
    const materialHabilitado = Boolean(cohorteObj?.materialHabilitado);

    await setDoc(
      doc(db, "usuarios", uidTemp),
      {
        uid: uidTemp,
        email: s.email,
        nombre: nombreCompleto || s.nombres,
        rut: s.rut || "",
        rol: s.tipoSolicitud || "alumno",
        activo: true,
        telefono: s.telefono || "",
        solicitudId: s.id,
        cursoDeseado: cursoSlug,
        cohorteId,
        cohorteNombre,
        [fieldKey]: "aceptado",
        ...(cursoSlug === "guardia-de-seguridad"
          ? {
              habilitadoMaterialOS10: materialHabilitado,
              materialOS10Habilitado: materialHabilitado,
            }
          : {}),
        fechaRegistro: serverTimestamp(),
      },
      { merge: true }
    );

    if (s.tipoSolicitud === "alumno" || !s.tipoSolicitud) {
      await setDoc(
        doc(collection(db, "enrollments"), `${uidTemp}_${cursoSlug}`),
        {
          uid: uidTemp,
          courseSlug: cursoSlug,
          cohorteId,
          cohorteNombre,
          modulosCompletados: [],
          fecha: serverTimestamp(),
        },
        { merge: true }
      );
    }

    await updateDoc(doc(db, "solicitudes", s.id), {
      estado: "aprobada",
      cohorteId,
      cohorteNombre,
      fechaRevision: serverTimestamp(),
    });

    setModalAprobar(null);
    setCohorteSel("");
  };

  const rechazar = async (s: any) => {
    if (!db) return;
    if (!confirm(`¿Rechazar la solicitud de ${s.nombres || s.email}?`)) return;
    await updateDoc(doc(db, "solicitudes", s.id), {
      estado: "rechazada",
      fechaRevision: serverTimestamp(),
    });
  };

  const os10Count = items.filter((s) => (s.cursoDeseado || "guardia-de-seguridad") === "guardia-de-seguridad").length;
  const cctvCount = items.filter((s) => s.cursoDeseado === "operador-cctv-y-alarmas").length;
  const supCount = items.filter((s) => s.cursoDeseado === "supervisor-de-seguridad").length;
  const basCount = items.filter((s) => s.cursoDeseado === "baston-y-esposas").length;
  const profCount = items.filter((s) => s.tipoSolicitud === "profesor").length;
  const otrosCount = items.filter(
    (s) =>
      !["guardia-de-seguridad", "operador-cctv-y-alarmas", "supervisor-de-seguridad", "baston-y-esposas"].includes(
        s.cursoDeseado || "guardia-de-seguridad"
      ) && s.tipoSolicitud !== "profesor"
  ).length;

  const itemsFiltrados = items.filter((s) => {
    const curso = s.cursoDeseado || "guardia-de-seguridad";
    if (filtroCurso !== "todos") {
      if (filtroCurso === "profesor") {
        if (s.tipoSolicitud !== "profesor") return false;
      } else if (filtroCurso === "otros") {
        if (
          ["guardia-de-seguridad", "operador-cctv-y-alarmas", "supervisor-de-seguridad", "baston-y-esposas"].includes(
            curso
          ) ||
          s.tipoSolicitud === "profesor"
        )
          return false;
      } else {
        if (curso !== filtroCurso) return false;
      }
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase().trim();
      const nom = [s.nombres, s.apellidoPaterno, s.apellidoMaterno].filter(Boolean).join(" ").toLowerCase();
      const email = (s.email || "").toLowerCase();
      const rut = (s.rut || "").toLowerCase();
      if (!nom.includes(q) && !email.includes(q) && !rut.includes(q)) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Pestañas de Filtro por Curso */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFiltroCurso("todos")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroCurso === "todos" ? "bg-apre-blue text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>📋 Todas</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{items.length}</span>
          </button>
          <button
            onClick={() => setFiltroCurso("guardia-de-seguridad")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroCurso === "guardia-de-seguridad" ? "bg-apre-red text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🛡️ Guardia OS-10</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{os10Count}</span>
          </button>
          <button
            onClick={() => setFiltroCurso("operador-cctv-y-alarmas")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroCurso === "operador-cctv-y-alarmas" ? "bg-blue-600 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>📹 Operador CCTV</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{cctvCount}</span>
          </button>
          <button
            onClick={() => setFiltroCurso("supervisor-de-seguridad")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroCurso === "supervisor-de-seguridad" ? "bg-amber-600 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>⭐ Supervisor</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{supCount}</span>
          </button>
          <button
            onClick={() => setFiltroCurso("baston-y-esposas")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroCurso === "baston-y-esposas" ? "bg-indigo-600 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🥋 Bastón y Esposas</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{basCount}</span>
          </button>
          {profCount > 0 && (
            <button
              onClick={() => setFiltroCurso("profesor")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                filtroCurso === "profesor" ? "bg-apre-pink text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>👨‍🏫 Profesores</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{profCount}</span>
            </button>
          )}
          {otrosCount > 0 && (
            <button
              onClick={() => setFiltroCurso("otros")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                filtroCurso === "otros" ? "bg-slate-700 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>💼 Otros</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{otrosCount}</span>
            </button>
          )}
        </div>

        {/* Buscador */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar solicitante…"
            className="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs focus:border-apre-blue focus:outline-hidden"
          />
        </div>
      </div>

      {itemsFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-gray-500 text-xs">No hay solicitudes pendientes con el filtro seleccionado.</p>
        </div>
      ) : (
        itemsFiltrados.map((s) => {
          const curso = s.cursoDeseado || "guardia-de-seguridad";
          const cohortesDisponibles = cohortes.filter((c) => c.cursoSlug === curso);

          return (
            <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-extrabold text-apre-blue text-base">
                    {[s.nombres, s.apellidoPaterno, s.apellidoMaterno].filter(Boolean).join(" ")}
                  </p>
                  {s.rut && (
                    <p className="text-xs font-mono font-bold text-gray-700">
                      RUT: {formatRut(s.rut)}
                    </p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
                    s.tipoSolicitud === "profesor" ? "bg-apre-pink" : "bg-apre-blue"
                  }`}
                >
                  {s.tipoSolicitud === "profesor" ? "👨‍🏫 Profesor" : "👨‍🎓 Alumno"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {s.email} · {s.telefono || "Sin teléfono"}
              </p>
              {s.cursoDeseado && (
                <p className="mt-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 inline-block px-2.5 py-1 rounded-lg border border-emerald-200">
                  Curso solicitado: <strong>{cursoNombreDe(s.cursoDeseado)}</strong>
                </p>
              )}
              {s.mensaje && <p className="mt-2 text-xs text-gray-500 italic bg-gray-50 p-2.5 rounded-lg">{s.mensaje}</p>}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {cohortesDisponibles.length > 0 ? (
                  <button
                    onClick={() => {
                      setModalAprobar(s);
                      setCohorteSel(cohortesDisponibles[0].id);
                    }}
                    className="rounded-xl bg-whatsapp px-5 py-2.5 text-xs font-black text-white hover:brightness-105 shadow-sm flex items-center gap-1.5"
                  >
                    <span>✓</span>
                    <span>Aprobar y Asignar a Convocatoria ({cohortesDisponibles.length} disponibles)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => aprobar(s)}
                    className="rounded-xl bg-whatsapp px-5 py-2.5 text-xs font-black text-white hover:brightness-105 shadow-sm flex items-center gap-1.5"
                  >
                    <span>✓</span>
                    <span>Aprobar y Matricular</span>
                  </button>
                )}
                <button
                  onClick={() => rechazar(s)}
                  className="rounded-xl bg-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-300"
                >
                  ✕ Rechazar
                </button>
              </div>
            </div>
          );
        })
      )}

      {/* Modal de Selección de Cohorte al Aprobar */}
      {modalAprobar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-apre-blue">
                  Asignar a Convocatoria / Grupo
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Alumno: <strong>{[modalAprobar.nombres, modalAprobar.apellidoPaterno].filter(Boolean).join(" ")}</strong>
                </p>
              </div>
              <button
                onClick={() => setModalAprobar(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                Selecciona la Convocatoria por Fecha:
              </label>
              <select
                value={cohorteSel}
                onChange={(e) => setCohorteSel(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
              >
                <option value="">Sin grupo específico (Matrícula directa)</option>
                {cohortes
                  .filter((c) => c.cursoSlug === (modalAprobar.cursoDeseado || "guardia-de-seguridad"))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} (Inicio: {c.fechaInicio || "—"})
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => aprobar(modalAprobar, cohorteSel)}
                className="flex-1 rounded-xl bg-whatsapp py-2.5 text-xs font-black text-white hover:brightness-105 shadow-sm"
              >
                ✓ Confirmar y Matricular
              </button>
              <button
                onClick={() => setModalAprobar(null)}
                className="rounded-xl bg-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Grupos y Convocatorias por Fecha (Cohortes de Estudio) ---------- */
function CohortesTab() {
  const db = getFirestoreDb();
  const [cohortes, setCohortes] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalAlumnos, setModalAlumnos] = useState<any | null>(null);
  const [filtroCurso, setFiltroCurso] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [alumnoParaAgregar, setAlumnoParaAgregar] = useState<string>("");
  const [guardando, setGuardando] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    cursoSlug: "guardia-de-seguridad",
    fechaInicio: new Date().toISOString().split("T")[0],
    modalidad: "presencial",
    descripcion: "",
  });

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "cohortes"), (snap) =>
      setCohortes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(query(collection(db, "usuarios"), where("rol", "==", "alumno")), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  const crearCohorte = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !form.nombre.trim()) return;
    setGuardando(true);
    try {
      const cohorteId = `cohorte_${Date.now()}`;
      await setDoc(doc(db, "cohortes", cohorteId), {
        id: cohorteId,
        nombre: form.nombre.trim(),
        cursoSlug: form.cursoSlug,
        fechaInicio: form.fechaInicio,
        modalidad: form.modalidad,
        descripcion: form.descripcion.trim(),
        materialHabilitado: false,
        estado: "en_curso",
        creadoEn: serverTimestamp(),
      });
      setForm({
        nombre: "",
        cursoSlug: "guardia-de-seguridad",
        fechaInicio: new Date().toISOString().split("T")[0],
        modalidad: "presencial",
        descripcion: "",
      });
      setModalCrear(false);
    } catch (err: any) {
      console.error(err);
      alert("Error al crear la convocatoria: " + err.message);
    } finally {
      setGuardando(false);
    }
  };

  const toggleMaterialCohorte = async (cohorte: any) => {
    if (!db) return;
    const nuevoEstado = !cohorte.materialHabilitado;
    const msg = nuevoEstado
      ? `¿Habilitar el material de estudio y evaluaciones para todos los alumnos del grupo "${cohorte.nombre}"?\n(Los alumnos de otros grupos o nuevas convocatorias no se verán afectados y continuarán en fase presencial).`
      : `¿Bloquear el material de estudio para el grupo "${cohorte.nombre}" (modo fase presencial)?`;

    if (!confirm(msg)) return;

    await updateDoc(doc(db, "cohortes", cohorte.id), {
      materialHabilitado: nuevoEstado,
    });

    const alumnosGrupo = usuarios.filter((u) => u.cohorteId === cohorte.id);
    for (const u of alumnosGrupo) {
      await updateDoc(doc(db, "usuarios", u.id), {
        habilitadoMaterialOS10: nuevoEstado,
        materialOS10Habilitado: nuevoEstado,
      });
    }

    if (modalAlumnos && modalAlumnos.id === cohorte.id) {
      setModalAlumnos((prev: any) => (prev ? { ...prev, materialHabilitado: nuevoEstado } : null));
    }
  };

  const asignarAlumnoACohorte = async (uid: string, cohorte: any) => {
    if (!db || !uid) return;
    const u = usuarios.find((x) => x.id === uid);
    if (!u) return;

    await updateDoc(doc(db, "usuarios", uid), {
      cohorteId: cohorte.id,
      cohorteNombre: cohorte.nombre,
      ...(cohorte.cursoSlug === "guardia-de-seguridad"
        ? {
            habilitadoMaterialOS10: Boolean(cohorte.materialHabilitado),
            materialOS10Habilitado: Boolean(cohorte.materialHabilitado),
          }
        : {}),
    });

    const enrollId = `${uid}_${cohorte.cursoSlug}`;
    await setDoc(
      doc(db, "enrollments", enrollId),
      {
        uid,
        courseSlug: cohorte.cursoSlug,
        cohorteId: cohorte.id,
        cohorteNombre: cohorte.nombre,
        modulosCompletados: [],
        fecha: serverTimestamp(),
      },
      { merge: true }
    );

    setAlumnoParaAgregar("");
  };

  const desasignarAlumnoDeCohorte = async (uid: string, cohorte: any) => {
    if (!db) return;
    if (!confirm("¿Quitar al alumno de este grupo?")) return;
    await updateDoc(doc(db, "usuarios", uid), {
      cohorteId: null,
      cohorteNombre: null,
    });
    const enrollId = `${uid}_${cohorte.cursoSlug}`;
    await updateDoc(doc(db, "enrollments", enrollId), {
      cohorteId: null,
      cohorteNombre: null,
    });
  };

  const eliminarCohorte = async (cohorte: any) => {
    if (!db) return;
    if (!confirm(`¿Eliminar la convocatoria "${cohorte.nombre}"? Los alumnos no se borrarán pero quedarán sin grupo.`))
      return;
    await deleteDoc(doc(db, "cohortes", cohorte.id));
    if (modalAlumnos?.id === cohorte.id) setModalAlumnos(null);
  };

  const exportarAlumnosCohorte = (cohorte: any, alumnosLista: any[]) => {
    const filas = [
      ["N°", "Nombre Alumno", "RUT", "Email", "Teléfono", "Grupo / Convocatoria", "Curso", "Fecha Inicio", "Modalidad"],
      ...alumnosLista.map((u, i) => [
        String(i + 1),
        u.nombre || "—",
        u.rut ? formatRut(u.rut) : "—",
        u.email || "—",
        u.telefono || "—",
        cohorte.nombre,
        cursoNombreDe(cohorte.cursoSlug),
        cohorte.fechaInicio || "—",
        cohorte.modalidad === "online" ? "Online" : "Presencial",
      ]),
    ];

    const csv =
      "\uFEFF" +
      filas.map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nomina-${cohorte.nombre.toLowerCase().replace(/[^a-z0-9]/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cohortesFiltradas = cohortes.filter((c) => {
    if (filtroCurso !== "todos" && c.cursoSlug !== filtroCurso) return false;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase().trim();
      const nom = (c.nombre || "").toLowerCase();
      const desc = (c.descripcion || "").toLowerCase();
      if (!nom.includes(q) && !desc.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner Principal */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-300 border border-cyan-400/30">
              <span>🗓️</span> Gestión de Convocatorias y Grupos por Fecha
            </div>
            <h2 className="text-xl font-extrabold text-white mt-2">
              Grupos de Estudio y Convocatorias por Fecha
            </h2>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Crea grupos específicos (ej. <em>Curso 2 de Septiembre</em>, <em>Curso 15 de Septiembre</em>) y asigna a los alumnos.
              Cuando concluya la fase presencial de un grupo, habilita el material digital <strong>exclusivamente para los alumnos de esa fecha</strong> sin afectar a los nuevos matriculados.
            </p>
          </div>

          <button
            onClick={() => setModalCrear(true)}
            className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-5 py-3 text-xs shadow-md transition flex items-center gap-2"
          >
            <span>+</span>
            <span>Crear Nueva Convocatoria / Grupo</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFiltroCurso("todos")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              filtroCurso === "todos" ? "bg-apre-blue text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos ({cohortes.length})
          </button>
          {CURSOS_PLATAFORMA.map((c) => {
            const count = cohortes.filter((x) => x.cursoSlug === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setFiltroCurso(c.slug)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 ${
                  filtroCurso === c.slug ? "bg-apre-blue text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{c.title}</span>
                <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar grupo por nombre…"
            className="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs focus:border-apre-blue focus:outline-hidden"
          />
        </div>
      </div>

      {/* Grid de Grupos / Cohortes */}
      {cohortesFiltradas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="text-3xl mb-2">🗓️</div>
          <h3 className="text-sm font-bold text-apre-blue">No hay grupos o convocatorias registradas</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
            Haz clic en "Crear Nueva Convocatoria / Grupo" para registrar el grupo de fecha (ej. Curso 2 de Septiembre o 15 de Septiembre).
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cohortesFiltradas.map((c) => {
            const alumnosEnGrupo = usuarios.filter((u) => u.cohorteId === c.id);
            const isOS10 = c.cursoSlug === "guardia-de-seguridad";

            return (
              <div
                key={c.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-gray-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                      {cursoNombreDe(c.cursoSlug)}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        c.modalidad === "online"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {c.modalidad === "online" ? "🟢 Online" : "🏫 Presencial"}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-apre-blue mt-2.5">{c.nombre}</h3>

                  <div className="mt-2 space-y-1 text-xs text-gray-600">
                    <p className="flex items-center gap-1.5">
                      <span>📅</span>
                      <span>Fecha Inicio: <strong>{c.fechaInicio || "Por definir"}</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>👥</span>
                      <span>Alumnos en este grupo: <strong className="text-apre-blue">{alumnosEnGrupo.length}</strong></span>
                    </p>
                    {c.descripcion && <p className="text-[11px] text-gray-500 italic mt-1">{c.descripcion}</p>}
                  </div>

                  {/* Estado de Material OS-10 para esta cohorte */}
                  {isOS10 && (
                    <div className="mt-3 rounded-xl p-3 border text-xs bg-slate-50 border-slate-200">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-gray-700 text-[11px]">Material de Estudio:</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            c.materialHabilitado
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          {c.materialHabilitado ? "🟢 HABILITADO" : "🔒 BLOQUEADO"}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {c.materialHabilitado
                          ? "Los alumnos de esta fecha ya pueden ver manuales y rendir exámenes."
                          : "Fase presencial activa. Material digital en espera para este grupo."}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                  {/* Botón Switch de Material OS-10 para este grupo */}
                  {isOS10 && (
                    <button
                      onClick={() => toggleMaterialCohorte(c)}
                      className={`w-full rounded-xl py-2 px-3 text-xs font-black transition shadow-2xs flex items-center justify-center gap-1.5 ${
                        c.materialHabilitado
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <span>{c.materialHabilitado ? "🔒" : "📚"}</span>
                      <span>
                        {c.materialHabilitado
                          ? "Bloquear Material (Fase Presencial)"
                          : "Habilitar Material para este Grupo"}
                      </span>
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModalAlumnos(c)}
                      className="flex-1 rounded-xl bg-gray-100 hover:bg-gray-200 py-2 text-xs font-bold text-gray-800 transition flex items-center justify-center gap-1.5"
                    >
                      <span>👥</span>
                      <span>Gestionar Alumnos ({alumnosEnGrupo.length})</span>
                    </button>
                    <button
                      onClick={() => eliminarCohorte(c)}
                      className="rounded-xl bg-red-50 hover:bg-red-100 p-2 text-xs font-bold text-apre-red transition"
                      title="Eliminar grupo"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Crear Convocatoria / Grupo */}
      {modalCrear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-apre-blue">Crear Convocatoria / Grupo por Fecha</h3>
                <p className="text-xs text-gray-500">
                  Organiza a los alumnos según la fecha de inicio del curso (ej. 2 de Septiembre o 15 de Septiembre).
                </p>
              </div>
              <button
                onClick={() => setModalCrear(false)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={crearCohorte} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Nombre del Grupo / Convocatoria: *
                </label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="ej. Curso Guardia OS-10 - 2 de Septiembre 2026"
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Curso: *</label>
                  <select
                    value={form.cursoSlug}
                    onChange={(e) => setForm({ ...form, cursoSlug: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
                  >
                    {CURSOS_PLATAFORMA.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Fecha de Inicio: *</label>
                  <input
                    type="date"
                    required
                    value={form.fechaInicio}
                    onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Modalidad:</label>
                <select
                  value={form.modalidad}
                  onChange={(e) => setForm({ ...form, modalidad: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
                >
                  <option value="presencial">🏫 Presencial en Sede</option>
                  <option value="online">🟢 Online (Zoom Virtual)</option>
                  <option value="mixta">🔄 Mixta (Híbrida)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Observaciones / Sede (opcional):</label>
                <input
                  type="text"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="ej. Sede Santiago Centro, Horario Matutino"
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  disabled={guardando || !form.nombre.trim()}
                  className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-black text-white shadow-sm transition disabled:opacity-50"
                >
                  {guardando ? "Creando..." : "✓ Guardar y Crear Convocatoria"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalCrear(false)}
                  className="rounded-xl bg-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal / Drawer de Gestión de Alumnos por Cohorte */}
      {modalAlumnos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                  <span>🗓️</span> {cursoNombreDe(modalAlumnos.cursoSlug)}
                </div>
                <h3 className="text-lg font-black text-apre-blue mt-1">{modalAlumnos.nombre}</h3>
                <p className="text-xs text-gray-500">
                  Inicio: {modalAlumnos.fechaInicio || "—"} · Modalidad: {modalAlumnos.modalidad === "online" ? "Online" : "Presencial"}
                </p>
              </div>
              <button
                onClick={() => setModalAlumnos(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Acciones de la cohorte */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {modalAlumnos.cursoSlug === "guardia-de-seguridad" && (
                <button
                  onClick={() => toggleMaterialCohorte(modalAlumnos)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-black transition shadow-2xs flex items-center gap-1.5 ${
                    modalAlumnos.materialHabilitado
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <span>{modalAlumnos.materialHabilitado ? "🔒" : "📚"}</span>
                  <span>
                    {modalAlumnos.materialHabilitado
                      ? "Bloquear Material (Fase Presencial)"
                      : "Habilitar Material para este Grupo"}
                  </span>
                </button>
              )}

              <button
                onClick={() =>
                  exportarAlumnosCohorte(
                    modalAlumnos,
                    usuarios.filter((u) => u.cohorteId === modalAlumnos.id)
                  )
                }
                disabled={usuarios.filter((u) => u.cohorteId === modalAlumnos.id).length === 0}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 disabled:opacity-50"
              >
                <span>⬇</span>
                <span>Descargar Nómina (Excel)</span>
              </button>
            </div>

            {/* Asignar Alumno Existente a este grupo */}
            <div className="rounded-xl border border-gray-200 p-3 bg-white space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                + Agregar Alumno a este Grupo:
              </label>
              <div className="flex gap-2">
                <select
                  value={alumnoParaAgregar}
                  onChange={(e) => setAlumnoParaAgregar(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
                >
                  <option value="">Selecciona un alumno registrado…</option>
                  {usuarios
                    .filter((u) => u.cohorteId !== modalAlumnos.id)
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nombre} ({u.email}) {u.rut ? `· RUT: ${formatRut(u.rut)}` : ""} {u.cohorteNombre ? `[Actualmente en: ${u.cohorteNombre}]` : "[Sin grupo]"}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() => asignarAlumnoACohorte(alumnoParaAgregar, modalAlumnos)}
                  disabled={!alumnoParaAgregar}
                  className="rounded-xl bg-apre-blue hover:bg-apre-blue-dark px-4 py-2 text-xs font-bold text-white transition disabled:opacity-50"
                >
                  Asignar
                </button>
              </div>
            </div>

            {/* Lista de Alumnos del Grupo */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-gray-500 tracking-wider">
                Alumnos Inscritos en este Grupo ({usuarios.filter((u) => u.cohorteId === modalAlumnos.id).length})
              </h4>

              {usuarios.filter((u) => u.cohorteId === modalAlumnos.id).length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">
                  Aún no hay alumnos asignados a esta convocatoria. Puedes agregar alumnos arriba o seleccionarla al aprobar solicitudes.
                </p>
              ) : (
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                  {usuarios
                    .filter((u) => u.cohorteId === modalAlumnos.id)
                    .map((u) => (
                      <div key={u.id} className="p-3 bg-white flex items-center justify-between gap-3 hover:bg-slate-50">
                        <div>
                          <p className="text-xs font-extrabold text-apre-blue">{u.nombre}</p>
                          <p className="text-[11px] text-gray-500">
                            {u.email} · RUT: <strong>{u.rut ? formatRut(u.rut) : "Sin RUT"}</strong>
                          </p>
                        </div>
                        <button
                          onClick={() => desasignarAlumnoDeCohorte(u.id, modalAlumnos)}
                          className="rounded-lg bg-red-50 hover:bg-red-100 px-2.5 py-1 text-[11px] font-bold text-apre-red transition"
                        >
                          Quitar del Grupo
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Historial de Solicitudes ---------- */
function HistorialTab() {
  const db = getFirestoreDb();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "solicitudes"), where("estado", "!=", "pendiente"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  if (items.length === 0) return <p className="text-gray-500">Sin solicitudes revisadas.</p>;
  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-extrabold text-apre-blue">
                {[s.nombres, s.apellidoPaterno, s.apellidoMaterno].filter(Boolean).join(" ")}
              </p>
              {s.rut && <p className="text-xs font-mono text-gray-600">RUT: {formatRut(s.rut)}</p>}
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                s.estado === "aprobada" ? "bg-whatsapp" : "bg-apre-red"
              }`}
            >
              {s.estado === "aprobada" ? "✅ Aprobada" : "❌ Rechazada"}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {s.email} · {s.tipoSolicitud === "profesor" ? "Profesor" : "Alumno"}
          </p>
          {s.fechaRevision?.toDate && (
            <p className="mt-1 text-xs text-gray-400">
              Revisada: {s.fechaRevision.toDate().toLocaleString("es-CL")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Control de Habilitación de Cuestionarios OS-10 para Alumnos ---------- */
function ControlCuestionariosOS10Card() {
  const { user } = useAuth();
  const [habilitado, setHabilitado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) return;
    const unsub = onSnapshot(doc(db, "configuracion", "os10_cuestionarios"), (snap) => {
      if (snap.exists()) {
        setHabilitado(snap.data().habilitado === true);
      } else {
        setHabilitado(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const toggleHabilitacion = async () => {
    const db = getFirestoreDb();
    if (!db) return;
    setGuardando(true);
    setMsg(null);
    try {
      const nuevoEstado = !habilitado;
      await setDoc(
        doc(db, "configuracion", "os10_cuestionarios"),
        {
          habilitado: nuevoEstado,
          actualizadoPor: user?.email || "admin",
          actualizadoEn: serverTimestamp(),
        },
        { merge: true }
      );
      setMsg(
        nuevoEstado
          ? "✅ Cuestionarios OS-10 ACTIVADOS para todos los alumnos matriculados."
          : "🔒 Cuestionarios OS-10 BLOQUEADOS para alumnos (para asegurar asistencia presencial)."
      );
      setTimeout(() => setMsg(null), 5000);
    } catch (e: any) {
      console.error(e);
      alert("Error al actualizar estado: " + e.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all shadow-sm ${
        habilitado ? "border-emerald-300 bg-emerald-50/60" : "border-amber-300 bg-amber-50/50"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <h3 className="font-extrabold text-apre-blue text-base">
              Control de Pruebas y Cuestionarios OS-10 (Guardia de Seguridad)
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                loading
                  ? "bg-gray-100 text-gray-600"
                  : habilitado
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {loading ? "Cargando..." : habilitado ? "🟢 ACTIVADOS PARA ALUMNOS" : "🔴 BLOQUEADOS PARA ALUMNOS"}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
            {habilitado
              ? "Los alumnos matriculados en Guardia de Seguridad OS-10 tienen el botón rojo de Cuestionarios activo y pueden rendir las pruebas en plataforma."
              : "Los cuestionarios están BLOQUEADOS para los alumnos en su panel para asegurar la asistencia a las clases presenciales y evitar la simple memorización de alternativas."}
          </p>
          {msg && (
            <p className="mt-2 text-xs font-bold text-apre-blue bg-white/90 px-3 py-1 rounded-lg border inline-block shadow-xs">
              {msg}
            </p>
          )}
        </div>

        <button
          onClick={toggleHabilitacion}
          disabled={guardando || loading}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-extrabold shadow-sm transition active:scale-95 ${
            habilitado
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          } disabled:opacity-50 cursor-pointer`}
        >
          <span>
            {guardando
              ? "Guardando cambio..."
              : habilitado
              ? "🔒 Bloquear Cuestionarios a Alumnos"
              : "🔓 Desbloquear Cuestionarios a Alumnos"}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Explorar Cursos Desbloqueados (Vista Administrador) ---------- */
function CursosExplorarTab({ onIrAGestion }: { onIrAGestion: () => void }) {
  const cursosDetallados = [
    {
      slug: "guardia-de-seguridad",
      nombre: "Curso Guardia de Seguridad (OS-10)",
      shortName: "Guardia OS-10",
      horas: "90 hrs",
      icono: "🛡️",
      descripcion: "Formación integral para guardias de seguridad privada acreditados ante Carabineros de Chile (OS-10). Incluye 14 módulos teóricos, videos temáticos y cuestionarios.",
      modulosCount: 14,
      subTextoModulos: "14 Módulos interactivos",
      examenUrl: "/evaluaciones/guardia-de-seguridad",
      examenNombre: "📝 Examen Final OS-10 (140 V/F)",
      cuestionariosUrl: "/cuestionarios/guardia-de-seguridad",
    },
    {
      slug: "operador-cctv-y-alarmas",
      nombre: "Curso Operador CCTV y Alarmas",
      shortName: "Operador CCTV",
      horas: "40 hrs",
      icono: "📹",
      descripcion: "Capacitación en software de monitoreo, videograbación, protocolos ante incidentes y normativa legal para centrales de monitoreo CCTV y alarmas.",
      modulosCount: 8,
      subTextoModulos: "8 Módulos interactivos",
      examenUrl: "/evaluaciones/operador-cctv-y-alarmas",
      examenNombre: "📝 Examen Final CCTV (60 Preguntas)",
      cuestionariosUrl: null,
    },
    {
      slug: "baston-y-esposas",
      nombre: "Curso Bastón y Esposas",
      shortName: "Bastón y Esposas",
      horas: "8 hrs",
      icono: "🥋",
      descripcion: "Técnicas de defensa personal policial, comunicación persuasiva, palancas, torsiones, uso legal de la fuerza, bastón retráctil y grilletes de seguridad.",
      modulosCount: 4,
      subTextoModulos: "11 Submódulos temáticos",
      examenUrl: "/evaluaciones/baston-y-esposas",
      examenNombre: "📝 Examen Final Bastón (20 Preguntas)",
      cuestionariosUrl: null,
    },
    {
      slug: "supervisor-de-seguridad",
      nombre: "Curso Supervisor de Seguridad",
      shortName: "Supervisor de Seguridad",
      horas: "140 hrs",
      icono: "⭐",
      descripcion: "Especialización para jefaturas de turno y supervisores. Gestión de riesgos, legislación laboral y de seguridad privada, liderazgo de equipos e informes.",
      modulosCount: 6,
      subTextoModulos: "6 Módulos interactivos",
      examenUrl: "/evaluaciones/supervisor-de-seguridad",
      examenNombre: "📝 Examen Final Supervisor (60 Preguntas)",
      cuestionariosUrl: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Control Switch de Pruebas OS-10 */}
      <ControlCuestionariosOS10Card />

      {/* Banner Explicativo */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-apre-blue to-slate-900 p-6 text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-cyan-400 text-slate-950 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
            👁️ Modo Auditoría y Clientes
          </span>
          <span className="text-xs font-bold text-cyan-300">Todo 100% Desbloqueado</span>
        </div>
        <h2 className="mt-2 text-xl md:text-2xl font-black text-white">
          Explorador de Cursos y Evaluaciones APRECAP
        </h2>
        <p className="mt-1 text-xs text-slate-200 leading-relaxed max-w-3xl">
          Como administrador o cliente, al ingresar a cualquiera de estos cursos tendrás <strong>todos los módulos, videos, diapositivas, manuales oficiales en PDF, mini-quizzes y exámenes finales 100% desbloqueados</strong>. Puedes navegar libremente por cualquier parte del contenido sin esperar tiempos de video ni tener que aprobar pasos anteriores.
        </p>
      </div>

      {/* Grid de Cursos */}
      <div className="grid gap-6 md:grid-cols-2">
        {cursosDetallados.map((c) => (
          <div
            key={c.slug}
            className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.icono}</span>
                  <div>
                    <h3 className="font-extrabold text-apre-blue text-lg leading-snug">{c.nombre}</h3>
                    <p className="text-xs font-bold text-gray-500">
                      {c.horas} oficial · {c.subTextoModulos}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-black uppercase">
                  ✓ Desbloqueado
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-600 leading-relaxed">{c.descripcion}</p>
            </div>

            <div className="mt-5 space-y-2 pt-4 border-t border-gray-100">
              {/* Botón Principal: Entrar al Aula */}
              <Link
                href={`/materiales/${c.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-apre-blue px-4 py-3 text-xs font-black text-white transition hover:bg-apre-blue-dark shadow-sm"
              >
                <span>👁️ Entrar al Aula Virtual (Todo Desbloqueado)</span>
                <span>→</span>
              </Link>

              {/* Botones Secundarios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  href={c.examenUrl}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 px-3 py-2 text-center text-[11px] font-bold text-apre-red transition hover:bg-red-100 hover:border-red-300"
                >
                  <span>{c.examenNombre}</span>
                </Link>

                {c.cuestionariosUrl ? (
                  <Link
                    href={c.cuestionariosUrl}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-[11px] font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    <span>📋 Cuestionarios Oficiales</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onIrAGestion}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-[11px] font-bold text-gray-600 transition hover:bg-gray-100"
                  >
                    <span>👥 Ver Matrículas del Curso</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Gestión por Cursos y Alumnos (Estilo SARMAT) ---------- */
function CursosGestionTab({
  onEmitirDiploma,
}: {
  onEmitirDiploma: (datos: { uid: string; nombre: string; rut: string; cursoSlug: string }) => void;
}) {
  const db = getFirestoreDb();
  const [cursoActivoSlug, setCursoActivoSlug] = useState<string>(CURSOS_LISTA[0].slug);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<any[]>([]);
  const [nuevoMatriculaUid, setNuevoMatriculaUid] = useState<string>("");

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "usuarios"), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "enrollments"), (snap) =>
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un3 = onSnapshot(collection(db, "resultados_evaluaciones"), (snap) =>
      setEvaluaciones(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
      un3();
    };
  }, [db]);

  const cursoInfo = CURSOS_LISTA.find((c) => c.slug === cursoActivoSlug) || CURSOS_LISTA[0];
  const fieldKey = cursoInfo.fieldKey;

  // Alumnos matriculados en este curso
  const matriculadosEnEsteCurso = enrolls
    .filter((e) => e.courseSlug === cursoActivoSlug)
    .map((e) => {
      const u = usuarios.find((x) => x.id === e.uid || x.uid === e.uid);
      return {
        enrollId: e.id,
        uid: e.uid,
        nombre: u?.nombre || e.uid,
        email: u?.email || "—",
        rut: u?.rut || "—",
        modulosCompletados: e.modulosCompletados || [],
        fecha: e.fecha,
      };
    });

  // Solicitudes de acceso pendientes para este curso
  const pendientesEsteCurso = usuarios.filter((u) => u.rol === "alumno" && u[fieldKey] === "pendiente");

  // Alumnos que han aprobado el examen final de este curso (Examen Oficial de Egreso)
  const aprobadosEsteCurso = evaluaciones.filter((ev) => {
    if (!ev.aprobado) return false;
    const esFinal = Boolean(
      ev.esExamenFinal === true ||
      ev.tipo === "examen_final" ||
      (ev.moduloNombre || "").toLowerCase().includes("examen final") ||
      (ev.moduloNombre || "").toLowerCase().includes("evaluación final") ||
      (ev.moduloNombre || "").toLowerCase().includes("evaluacion final")
    );
    if (!esFinal) return false;
    if (ev.courseSlug === cursoActivoSlug) return true;
    const mod = (ev.moduloNombre || "").toLowerCase();
    if (cursoActivoSlug === "guardia-de-seguridad" && (mod.includes("os-10") || mod.includes("guardia"))) return true;
    if (cursoActivoSlug === "operador-cctv-y-alarmas" && mod.includes("cctv")) return true;
    if (cursoActivoSlug === "baston-y-esposas" && mod.includes("bastón")) return true;
    if (cursoActivoSlug === "supervisor-de-seguridad" && mod.includes("supervisor")) return true;
    return false;
  });

  const aprobarSolicitudCurso = async (u: any) => {
    if (!db) return;
    await updateDoc(doc(db, "usuarios", u.id), {
      [fieldKey]: "aceptado",
    });
    await setDoc(doc(collection(db, "enrollments"), `${u.id}_${cursoActivoSlug}`), {
      uid: u.id,
      courseSlug: cursoActivoSlug,
      modulosCompletados: [],
      fecha: serverTimestamp(),
    });
  };

  const rechazarSolicitudCurso = async (u: any) => {
    if (!db) return;
    await updateDoc(doc(db, "usuarios", u.id), {
      [fieldKey]: "rechazado",
    });
  };

  const matricularAlumnoManual = async () => {
    if (!db || !nuevoMatriculaUid) return;
    await updateDoc(doc(db, "usuarios", nuevoMatriculaUid), {
      [fieldKey]: "aceptado",
    });
    await setDoc(doc(collection(db, "enrollments"), `${nuevoMatriculaUid}_${cursoActivoSlug}`), {
      uid: nuevoMatriculaUid,
      courseSlug: cursoActivoSlug,
      modulosCompletados: [],
      fecha: serverTimestamp(),
    });
    setNuevoMatriculaUid("");
  };

  const desmatricularAlumno = async (enrollId: string, uid: string) => {
    if (!db || !confirm("¿Desmatricular al alumno de este curso?")) return;
    await deleteDoc(doc(db, "enrollments", enrollId));
    await updateDoc(doc(db, "usuarios", uid), {
      [fieldKey]: "bloqueado",
    });
  };

  return (
    <div className="space-y-6">
      {/* Selector de Cursos por Pestañas */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {CURSOS_LISTA.map((c) => {
          const active = cursoActivoSlug === c.slug;
          const matriculadosCount = enrolls.filter((e) => e.courseSlug === c.slug).length;
          const pendCount = usuarios.filter((u) => u.rol === "alumno" && u[c.fieldKey] === "pendiente").length;

          return (
            <button
              key={c.slug}
              onClick={() => setCursoActivoSlug(c.slug)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${
                active
                  ? "bg-apre-blue text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{c.icono}</span>
              <span>{c.shortName}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {matriculadosCount}
              </span>
              {pendCount > 0 && (
                <span className="rounded-full bg-amber-400 px-1.5 py-0.2 text-[9px] font-black text-slate-950 animate-pulse">
                  +{pendCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Resumen del Curso Seleccionado */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{cursoInfo.icono}</span>
            <h2 className="text-xl font-extrabold text-apre-blue">{cursoInfo.nombre}</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Duración oficial: {cursoInfo.horas} horas · Clave de permiso Firestore:{" "}
            <code className="font-mono text-apre-red font-bold">{cursoInfo.fieldKey}</code>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Matriculados</p>
            <p className="text-lg font-black text-emerald-900">{matriculadosEnEsteCurso.length}</p>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Pendientes</p>
            <p className="text-lg font-black text-amber-900">{pendientesEsteCurso.length}</p>
          </div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 px-4 py-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">Aprobados</p>
            <p className="text-lg font-black text-cyan-900">{aprobadosEsteCurso.length}</p>
          </div>
        </div>
      </div>

      {/* Botón destacado para entrar al aula de este curso como Admin */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">👁️</span>
          <div>
            <p className="text-xs font-black text-cyan-900">Vista Previa Desbloqueada de este Curso</p>
            <p className="text-[11px] text-gray-600">Entra al aula con todos los videos, manuales y cuestionarios listos para revisión.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/materiales/${cursoInfo.slug}`}
            className="rounded-xl bg-apre-blue hover:bg-apre-blue-dark text-white px-4 py-2 text-xs font-black transition shadow-xs flex items-center gap-1.5"
          >
            <span>Entrar al Aula (Todo Desbloqueado)</span>
            <span>→</span>
          </Link>
          <Link
            href={
              cursoInfo.slug === "guardia-de-seguridad"
                ? "/evaluaciones/guardia-de-seguridad"
                : cursoInfo.slug === "operador-cctv-y-alarmas"
                  ? "/evaluaciones/operador-cctv-y-alarmas"
                  : cursoInfo.slug === "baston-y-esposas"
                    ? "/evaluaciones/baston-y-esposas"
                    : "/evaluaciones/supervisor-de-seguridad"
            }
            className="rounded-xl bg-apre-red hover:bg-apre-red-dark text-white px-3.5 py-2 text-xs font-bold transition shadow-xs"
          >
            📝 Ver Examen
          </Link>
        </div>
      </div>

      {/* Solicitudes Pendientes para este Curso */}
      {pendientesEsteCurso.length > 0 && (
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏳</span>
            <h3 className="font-extrabold text-amber-900 text-sm uppercase tracking-wide">
              Solicitudes de Acceso Pendientes para {cursoInfo.shortName} ({pendientesEsteCurso.length})
            </h3>
          </div>
          <div className="divide-y divide-amber-200/60 bg-white rounded-xl border border-amber-200 p-2">
            {pendientesEsteCurso.map((u) => (
              <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-3">
                <div>
                  <p className="font-bold text-apre-blue text-sm">{u.nombre}</p>
                  <p className="text-xs text-gray-600">
                    {u.email} {u.rut ? `· RUT: ${formatRut(u.rut)}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => aprobarSolicitudCurso(u)}
                    className="rounded-lg bg-whatsapp px-3.5 py-1.5 text-xs font-bold text-white hover:brightness-105 shadow-xs"
                  >
                    ✓ Aprobar Acceso al Curso
                  </button>
                  <button
                    onClick={() => rechazarSolicitudCurso(u)}
                    className="rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-300"
                  >
                    ✕ Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alumnos Aprobados en este Curso (Egresados con Diploma Listo) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-apre-blue flex items-center gap-2">
              <span>🎓</span> Alumnos que Han Aprobado el Examen Final
            </h3>
            <p className="text-xs text-gray-500">
              Egresados listos para emisión e impresión de su Certificado Oficial APRECAP.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            {aprobadosEsteCurso.length} {aprobadosEsteCurso.length === 1 ? "aprobado" : "aprobados"}
          </span>
        </div>

        {aprobadosEsteCurso.length === 0 ? (
          <p className="text-xs text-gray-500 italic p-4 bg-gray-50 rounded-xl text-center">
            Aún no hay alumnos con examen final aprobado registrado en este curso.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Alumno</th>
                  <th className="p-3">RUT</th>
                  <th className="p-3">Porcentaje</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {aprobadosEsteCurso.map((ap) => {
                  const u = usuarios.find((x) => x.id === ap.userId || x.uid === ap.userId);
                  const nombre = u?.nombre || ap.nombreUsuario || "Estudiante";
                  const rut = u?.rut || ap.userRut || "—";
                  return (
                    <tr key={ap.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-apre-blue">{nombre}</td>
                      <td className="p-3 font-mono">{formatRut(rut)}</td>
                      <td className="p-3 font-black text-emerald-700">{ap.porcentaje}%</td>
                      <td className="p-3 text-gray-500">
                        {ap.fecha?.toDate ? ap.fecha.toDate().toLocaleDateString("es-CL") : "Reciente"}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() =>
                            onEmitirDiploma({
                              uid: ap.userId,
                              nombre,
                              rut,
                              cursoSlug: cursoActivoSlug,
                            })
                          }
                          className="rounded-lg bg-apre-red px-3 py-1.5 text-xs font-black text-white hover:bg-apre-red-dark shadow-xs"
                        >
                          📜 Generar Diploma
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Alumnos Matriculados en este Curso */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-apre-blue flex items-center gap-2">
              <span>👨‍🎓</span> Alumnos Matriculados en {cursoInfo.shortName}
            </h3>
            <p className="text-xs text-gray-500">
              Listado de estudiantes con acceso activo a las clases, materiales y cuestionarios de este curso.
            </p>
          </div>

          {/* Formulario rápido para matricular nuevo alumno */}
          <div className="flex items-center gap-2">
            <select
              value={nuevoMatriculaUid}
              onChange={(e) => setNuevoMatriculaUid(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-xs"
            >
              <option value="">+ Matricular alumno registrado…</option>
              {usuarios
                .filter(
                  (u) =>
                    u.rol === "alumno" &&
                    !matriculadosEnEsteCurso.some((m) => m.uid === u.id || m.uid === u.uid)
                )
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} ({u.email})
                  </option>
                ))}
            </select>
            <button
              onClick={matricularAlumnoManual}
              disabled={!nuevoMatriculaUid}
              className="rounded-xl bg-apre-blue px-4 py-2 text-xs font-bold text-white transition hover:bg-apre-blue-light disabled:opacity-40"
            >
              Matricular
            </button>
          </div>
        </div>

        {matriculadosEnEsteCurso.length === 0 ? (
          <p className="text-xs text-gray-500 italic p-4 bg-gray-50 rounded-xl text-center">
            No hay alumnos matriculados en este curso todavía. Usa el selector arriba para matricular a un estudiante.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Alumno</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">RUT</th>
                  <th className="p-3">Avance Módulos</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {matriculadosEnEsteCurso.map((m) => (
                  <tr key={m.enrollId} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-apre-blue">{m.nombre}</td>
                    <td className="p-3 text-gray-600">{m.email}</td>
                    <td className="p-3 font-mono">{formatRut(m.rut)}</td>
                    <td className="p-3 font-bold text-gray-700">
                      {m.modulosCompletados.length} módulos
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => desmatricularAlumno(m.enrollId, m.uid)}
                        className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-apre-red hover:bg-red-100"
                      >
                        Quitar acceso
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Seguimiento y Días de Alumnos (Panel de Control Académico) ---------- */
function SeguimientoTab({
  onEmitirDiploma,
}: {
  onEmitirDiploma?: (datos: { uid: string; nombre: string; rut: string; cursoSlug: string }) => void;
}) {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<any[]>([]);
  const [cursoFiltro, setCursoFiltro] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [modalAlumno, setModalAlumno] = useState<any | null>(null);

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "usuarios"), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "enrollments"), (snap) =>
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un3 = onSnapshot(collection(db, "resultados_evaluaciones"), (snap) =>
      setEvaluaciones(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
      un3();
    };
  }, [db]);

  const listaAlumnos = enrolls
    .map((e) => {
      const u = usuarios.find(
        (x) =>
          x.id === e.uid ||
          x.uid === e.uid ||
          (e.userEmail && x.email?.toLowerCase() === e.userEmail?.toLowerCase())
      );

      // Si el usuario no existe en la base de datos o fue borrado, no lo listamos para evitar confusiones
      if (!u || !u.email || u.nombre === "Estudiante") return null;

      const cursoInfo = CURSOS_LISTA.find((c) => c.slug === e.courseSlug) || {
        slug: e.courseSlug,
        nombre: cursoNombreDe(e.courseSlug),
        shortName: cursoNombreDe(e.courseSlug),
        icono: "📚",
        horas: 90,
        fieldKey: "accesoOS10",
      };

      const rawFecha = e.fecha || u?.fechaRegistro;
      const timing = getAlumnoSeguimientoTiming(e.courseSlug, rawFecha);

      const uEmail = (u.email || "").toLowerCase().trim();
      const uRut = (u.rut || "").replace(/[^0-9kK]/g, "").toLowerCase();

      const evalsAlumno = evaluaciones.filter((ev) => {
        const evEmail = (ev.userEmail || "").toLowerCase().trim();
        const evRut = (ev.userRut || "").replace(/[^0-9kK]/g, "").toLowerCase();
        const matchUser =
          ev.userId === e.uid ||
          ev.userId === u.id ||
          ev.userId === u.uid ||
          (uEmail && evEmail && evEmail === uEmail) ||
          (uRut && evRut && evRut === uRut);

        if (!matchUser) return false;

        const modName = (ev.moduloNombre || "").toLowerCase();
        const matchCurso =
          ev.courseSlug === e.courseSlug ||
          (e.courseSlug === "guardia-de-seguridad" && (modName.includes("os-10") || modName.includes("guardia"))) ||
          (e.courseSlug === "operador-cctv-y-alarmas" && (modName.includes("cctv") || modName.includes("alarma"))) ||
          (e.courseSlug === "supervisor-de-seguridad" && modName.includes("supervisor")) ||
          (e.courseSlug === "baston-y-esposas" && (modName.includes("bastón") || modName.includes("baston") || modName.includes("esposa")));

        return matchCurso;
      });

      const quizzes = evalsAlumno.filter(
        (ev) =>
          !ev.esExamenFinal &&
          ev.tipo !== "examen_final" &&
          !(ev.moduloNombre || "").toLowerCase().includes("examen final") &&
          !(ev.moduloNombre || "").toLowerCase().includes("evaluación final") &&
          !(ev.moduloNombre || "").toLowerCase().includes("evaluacion final")
      );

      const examenesFinales = evalsAlumno.filter(
        (ev) =>
          ev.esExamenFinal === true ||
          ev.tipo === "examen_final" ||
          (ev.moduloNombre || "").toLowerCase().includes("examen final") ||
          (ev.moduloNombre || "").toLowerCase().includes("evaluación final") ||
          (ev.moduloNombre || "").toLowerCase().includes("evaluacion final")
      );

      const mejorExamenFinal = examenesFinales.sort((a, b) => (b.porcentaje ?? 0) - (a.porcentaje ?? 0))[0] || null;

      const promedioQuizzes =
        quizzes.length > 0
          ? Math.round(quizzes.reduce((acc, curr) => acc + (curr.porcentaje ?? 0), 0) / quizzes.length)
          : null;

      const accesoOnline = Boolean(u?.accesoOnline === true || u?.accesoClasesVivo === true || (u as any)?.modalidadOnline === true);
      const habilitadoMaterialOS10 = Boolean(u?.habilitadoMaterialOS10 === true || u?.materialOS10Habilitado === true);

      return {
        enrollId: e.id,
        uid: u.id || e.uid,
        nombre: u.nombre || "Estudiante",
        email: u.email || "—",
        rut: u.rut || "",
        telefono: u.telefono || "—",
        accesoOnline,
        habilitadoMaterialOS10,
        courseSlug: e.courseSlug,
        cursoInfo,
        fechaMatricula: rawFecha,
        timing,
        quizzes,
        promedioQuizzes,
        examenFinal: mejorExamenFinal,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const toggleOnlineAlumno = async (uid: string, actual: boolean) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "usuarios", uid), {
        accesoOnline: !actual,
        accesoClasesVivo: !actual,
      });
    } catch (err) {
      console.error("Error al actualizar acceso online:", err);
    }
  };

  const toggleMaterialOS10Alumno = async (uid: string, actual: boolean) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "usuarios", uid), {
        habilitadoMaterialOS10: !actual,
        materialOS10Habilitado: !actual,
      });
    } catch (err) {
      console.error("Error al actualizar material OS-10:", err);
    }
  };

  const filtrados = listaAlumnos.filter((item) => {
    if (cursoFiltro !== "todos" && item.courseSlug !== cursoFiltro) return false;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase().trim();
      const matchNom = item.nombre.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchRut = item.rut.toLowerCase().includes(q);
      if (!matchNom && !matchEmail && !matchRut) return false;
    }
    return true;
  });

  const totalMatriculados = listaAlumnos.length;
  const enFormacion = listaAlumnos.filter((x) => x.timing.esCursoConTiempo && !x.timing.examenDisponible).length;
  const examenHabilitado = listaAlumnos.filter((x) => x.timing.examenDisponible && !x.examenFinal?.aprobado).length;
  const graduados = listaAlumnos.filter((x) => x.examenFinal?.aprobado).length;

  const exportarExcelSeguimiento = () => {
    const filas = [
      [
        "Fecha Matrícula",
        "Alumno",
        "RUT",
        "Email",
        "Teléfono",
        "Asignatura / Curso",
        "Jornada Actual",
        "Días Totales",
        "Días Restantes Examen",
        "Estado Examen Final",
        "Nota Examen Final (%)",
        "Quizzes Rendidos",
        "Promedio Quizzes (%)",
      ],
      ...filtrados.map((item) => [
        item.fechaMatricula?.toDate
          ? item.fechaMatricula.toDate().toLocaleDateString("es-CL")
          : typeof item.fechaMatricula === "string"
          ? new Date(item.fechaMatricula).toLocaleDateString("es-CL")
          : "—",
        item.nombre,
        item.rut ? formatRut(item.rut) : "Sin RUT",
        item.email,
        item.telefono,
        item.cursoInfo.nombre || item.courseSlug,
        `Día ${item.timing.diaActual}`,
        String(item.timing.totalDiasCurso),
        item.timing.esCursoConTiempo
          ? item.timing.examenDisponible
            ? "0 (Examen Habilitado)"
            : `${item.timing.diasRestantes} días`
          : "0 (Acceso Inmediato)",
        item.examenFinal
          ? item.examenFinal.aprobado
            ? "Aprobado Oficial"
            : "Reprobado"
          : item.timing.examenDisponible
          ? "Habilitado (Sin rendir)"
          : "Bloqueado por tiempo",
        item.examenFinal ? `${item.examenFinal.porcentaje}%` : "—",
        String(item.quizzes.length),
        item.promedioQuizzes !== null ? `${item.promedioQuizzes}%` : "—",
      ]),
    ];

    const csv =
      "\uFEFF" +
      filas
        .map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
        .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seguimiento-alumnos-aprecap-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Banner Principal */}
      <div className="rounded-2xl border border-cyan-200 bg-linear-to-r from-cyan-50 via-blue-50/70 to-indigo-50/50 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-600/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-800 border border-cyan-300">
              <span>⏱️</span> Panel de Control y Seguimiento Académico
            </div>
            <h2 className="text-xl font-extrabold text-apre-blue mt-2">
              Seguimiento de Alumnos y Temporizadores por Días
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Monitorea en tiempo real en qué jornada se encuentra cada estudiante, cuántos días y horas le faltan para desbloquear el examen final, y revisa el detalle de calificaciones en cada mini-quiz de módulo.
            </p>
          </div>
          <button
            onClick={exportarExcelSeguimiento}
            disabled={filtrados.length === 0}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shadow-sm transition flex items-center gap-2 disabled:opacity-50"
          >
            <span>⬇</span>
            <span>Descargar Planilla de Seguimiento (Excel)</span>
          </button>
        </div>

        {/* Tarjetas de Métricas Resumen */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cyan-100">
          <div className="rounded-xl bg-white/90 p-3 text-xs border border-cyan-200 shadow-2xs">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Matrículas Totales</span>
            <span className="text-xl font-black text-apre-blue">{totalMatriculados}</span>
          </div>
          <div className="rounded-xl bg-white/90 p-3 text-xs border border-amber-200 shadow-2xs">
            <span className="text-amber-700 font-bold block text-[10px] uppercase">En Formación (Días Activos)</span>
            <span className="text-xl font-black text-amber-700">{enFormacion}</span>
          </div>
          <div className="rounded-xl bg-white/90 p-3 text-xs border border-blue-200 shadow-2xs">
            <span className="text-blue-700 font-bold block text-[10px] uppercase">Examen Habilitado</span>
            <span className="text-xl font-black text-blue-700">{examenHabilitado}</span>
          </div>
          <div className="rounded-xl bg-white/90 p-3 text-xs border border-emerald-200 shadow-2xs">
            <span className="text-emerald-700 font-bold block text-[10px] uppercase">Graduados (Examen Aprobado)</span>
            <span className="text-xl font-black text-emerald-700">{graduados}</span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        {/* Selector de Cursos */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCursoFiltro("todos")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              cursoFiltro === "todos"
                ? "bg-apre-blue text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos los Cursos ({listaAlumnos.length})
          </button>
          {CURSOS_LISTA.map((c) => {
            const count = listaAlumnos.filter((x) => x.courseSlug === c.slug).length;
            const active = cursoFiltro === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setCursoFiltro(c.slug)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                  active
                    ? "bg-apre-blue text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{c.icono}</span>
                <span>{c.shortName}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Buscador */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar por nombre, RUT o email…"
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tabla Principal de Seguimiento */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-3.5">Alumno</th>
              <th className="p-3.5">Curso Matriculado</th>
              <th className="p-3.5">Jornada y Temporizador</th>
              <th className="p-3.5">Mini-Quizzes de Módulos</th>
              <th className="p-3.5">Examen Final Oficial</th>
              <th className="p-3.5 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtrados.map((item) => {
              const { timing, examenFinal, quizzes, promedioQuizzes } = item;
              const hasPassedFinal = examenFinal?.aprobado === true;

              return (
                <tr key={`${item.uid}_${item.courseSlug}`} className="hover:bg-slate-50/80 transition">
                  {/* Alumno */}
                  <td className="p-3.5">
                    <p className="font-extrabold text-apre-blue text-sm">{item.nombre}</p>
                    <p className="text-gray-500 text-[11px]">{item.email}</p>
                    <p className="text-gray-700 font-mono text-[11px] mt-0.5">
                      RUT: <strong>{item.rut ? formatRut(item.rut) : "Sin RUT"}</strong>
                    </p>
                    {/* Badge y Toggle de Modalidad Online */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => toggleOnlineAlumno(item.uid, item.accesoOnline)}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border transition ${
                          item.accesoOnline
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                        title="Clic para cambiar entre Modalidad Online (Zoom) y Presencial"
                      >
                        <span>{item.accesoOnline ? "🟢" : "⚪"}</span>
                        <span>{item.accesoOnline ? "Online (Zoom Activo)" : "Presencial (Sin Zoom)"}</span>
                      </button>

                      {/* Badge y Toggle de Material OS-10 si es alumno de OS-10 */}
                      {item.courseSlug === "guardia-de-seguridad" && (
                        <button
                          onClick={() => toggleMaterialOS10Alumno(item.uid, item.habilitadoMaterialOS10)}
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border transition ${
                            item.habilitadoMaterialOS10
                              ? "bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100"
                              : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                          }`}
                          title="Clic para habilitar o bloquear material digital y exámenes de OS-10"
                        >
                          <span>{item.habilitadoMaterialOS10 ? "📚" : "🔒"}</span>
                          <span>{item.habilitadoMaterialOS10 ? "Material OS-10 Habilitado" : "Fase Presencial (Bloqueado)"}</span>
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Curso */}
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800 border border-slate-200">
                      <span>{item.cursoInfo.icono}</span>
                      <span>{item.cursoInfo.shortName}</span>
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Inicio:{" "}
                      {item.fechaMatricula?.toDate
                        ? item.fechaMatricula.toDate().toLocaleDateString("es-CL")
                        : typeof item.fechaMatricula === "string"
                        ? new Date(item.fechaMatricula).toLocaleDateString("es-CL")
                        : "—"}
                    </p>
                  </td>

                  {/* Jornada y Temporizador */}
                  <td className="p-3.5">
                    {timing.esCursoConTiempo ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-xs">
                            Día {timing.diaActual} de {timing.totalDiasCurso}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                              timing.examenDisponible
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {timing.examenDisponible ? "✅ Examen Habilitado" : `⏳ Faltan ${timing.diasRestantes}d`}
                          </span>
                        </div>
                        {/* Barra visual de progreso por días */}
                        <div className="h-1.5 w-36 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full transition-all ${timing.examenDisponible ? "bg-emerald-500" : "bg-cyan-500"}`}
                            style={{
                              width: `${Math.min(100, (timing.diaActual / timing.totalDiasCurso) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="inline-block rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                        ⚡ Acceso Inmediato
                      </span>
                    )}
                  </td>

                  {/* Mini-Quizzes */}
                  <td className="p-3.5">
                    {quizzes.length > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 text-[11px] font-bold">
                            {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"}
                          </span>
                          {promedioQuizzes !== null && (
                            <span className="font-black text-slate-700 text-xs">
                              Promedio: {promedioQuizzes}%
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setModalAlumno(item)}
                          className="text-[11px] font-bold text-apre-blue hover:underline flex items-center gap-1"
                        >
                          <span>👁️ Ver notas de quizzes</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-[11px]">Sin quizzes rendidos</span>
                    )}
                  </td>

                  {/* Examen Final */}
                  <td className="p-3.5">
                    {examenFinal ? (
                      <div className="space-y-1">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-black ${
                            examenFinal.aprobado
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {examenFinal.aprobado
                            ? `✅ APROBADO (${examenFinal.porcentaje}%)`
                            : `❌ REPROBADO (${examenFinal.porcentaje}%)`}
                        </span>
                        <p className="text-[10px] text-gray-400">
                          {examenFinal.fecha?.toDate
                            ? examenFinal.fecha.toDate().toLocaleDateString("es-CL")
                            : typeof examenFinal.fecha === "string"
                            ? new Date(examenFinal.fecha).toLocaleDateString("es-CL")
                            : "Reciente"}
                        </p>
                      </div>
                    ) : timing.examenDisponible ? (
                      <span className="rounded-md bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 text-[11px] font-bold">
                        📝 Habilitado (Sin rendir)
                      </span>
                    ) : (
                      <span className="rounded-md bg-gray-100 text-gray-500 px-2 py-0.5 text-[11px] font-medium">
                        🔒 Bloqueado por días
                      </span>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setModalAlumno(item)}
                        className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 text-xs font-bold transition"
                        title="Ver expediente del estudiante"
                      >
                        📋 Expediente
                      </button>
                      {hasPassedFinal && onEmitirDiploma && (
                        <button
                          onClick={() =>
                            onEmitirDiploma({
                              uid: item.uid,
                              nombre: item.nombre,
                              rut: item.rut,
                              cursoSlug: item.courseSlug,
                            })
                          }
                          className="rounded-lg bg-apre-red hover:bg-apre-red-dark text-white px-2.5 py-1.5 text-xs font-bold transition shadow-xs flex items-center gap-1"
                        >
                          <span>📜</span>
                          <span>Diploma</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No se encontraron alumnos con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Desglose de Notas y Expediente del Alumno */}
      {modalAlumno && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Header Modal */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-800 border border-cyan-200">
                  <span>{modalAlumno.cursoInfo.icono}</span>
                  <span>{modalAlumno.cursoInfo.nombre}</span>
                </div>
                <h3 className="text-xl font-extrabold text-apre-blue mt-1.5">{modalAlumno.nombre}</h3>
                <p className="text-xs text-gray-500">
                  {modalAlumno.email} · RUT: {modalAlumno.rut ? formatRut(modalAlumno.rut) : "Sin RUT"} · Tel: {modalAlumno.telefono}
                </p>

                {/* Control de Modalidad Online en el Modal */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                      modalAlumno.accesoOnline
                        ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    <span>{modalAlumno.accesoOnline ? "🟢" : "⚪"}</span>
                    <span>{modalAlumno.accesoOnline ? "Modalidad Online (Zoom Habilitado)" : "Modalidad Presencial (Sin Zoom)"}</span>
                  </span>
                  <button
                    onClick={async () => {
                      await toggleOnlineAlumno(modalAlumno.uid, modalAlumno.accesoOnline);
                      setModalAlumno((prev: any) => prev ? { ...prev, accesoOnline: !prev.accesoOnline } : null);
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-2xs ${
                      modalAlumno.accesoOnline
                        ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {modalAlumno.accesoOnline ? "✕ Cambiar a Presencial" : "✓ Dar Acceso a Clases Online"}
                  </button>
                </div>

                {/* Control de Material OS-10 en el Modal */}
                {modalAlumno.courseSlug === "guardia-de-seguridad" && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                        modalAlumno.habilitadoMaterialOS10
                          ? "bg-blue-50 text-blue-900 border-blue-300"
                          : "bg-amber-50 text-amber-900 border-amber-300"
                      }`}
                    >
                      <span>{modalAlumno.habilitadoMaterialOS10 ? "📚" : "🔒"}</span>
                      <span>
                        {modalAlumno.habilitadoMaterialOS10
                          ? "Material Digital OS-10: Habilitado"
                          : "Material Digital OS-10: Bloqueado (Fase Presencial)"}
                      </span>
                    </span>
                    <button
                      onClick={async () => {
                        await toggleMaterialOS10Alumno(modalAlumno.uid, modalAlumno.habilitadoMaterialOS10);
                        setModalAlumno((prev: any) =>
                          prev ? { ...prev, habilitadoMaterialOS10: !prev.habilitadoMaterialOS10 } : null
                        );
                      }}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-2xs ${
                        modalAlumno.habilitadoMaterialOS10
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {modalAlumno.habilitadoMaterialOS10 ? "🔒 Bloquear Material OS-10" : "📚 Habilitar Material OS-10"}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setModalAlumno(null)}
                className="rounded-full bg-gray-100 hover:bg-gray-200 p-2 text-gray-500 font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Resumen de Temporizador */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block font-semibold text-[10px] uppercase">Jornada Actual</span>
                <span className="font-black text-slate-800 text-sm">
                  Día {modalAlumno.timing.diaActual} de {modalAlumno.timing.totalDiasCurso}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block font-semibold text-[10px] uppercase">Examen Final</span>
                <span
                  className={`font-black text-xs ${
                    modalAlumno.examenFinal?.aprobado
                      ? "text-emerald-700"
                      : modalAlumno.timing.examenDisponible
                      ? "text-blue-700"
                      : "text-amber-700"
                  }`}
                >
                  {modalAlumno.examenFinal?.aprobado
                    ? `Aprobado (${modalAlumno.examenFinal.porcentaje}%)`
                    : modalAlumno.timing.examenDisponible
                    ? "Habilitado"
                    : `Faltan ${modalAlumno.timing.diasRestantes} días`}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block font-semibold text-[10px] uppercase">Quizzes Rendidos</span>
                <span className="font-black text-slate-800 text-sm">
                  {modalAlumno.quizzes.length} pruebas {modalAlumno.promedioQuizzes !== null ? `(${modalAlumno.promedioQuizzes}% prom.)` : ""}
                </span>
              </div>
            </div>

            {/* Listado de Mini-Quizzes Rendidos */}
            <div>
              <h4 className="text-sm font-extrabold text-apre-blue mb-2 flex items-center gap-1.5">
                <span>📝</span> Desglose de Evaluaciones y Quizzes Rendidos
              </h4>
              {modalAlumno.quizzes.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="p-2.5">Evaluación / Quiz</th>
                        <th className="p-2.5">Correctas</th>
                        <th className="p-2.5">Nota %</th>
                        <th className="p-2.5">Estado</th>
                        <th className="p-2.5">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {modalAlumno.quizzes.map((q: any) => (
                        <tr key={q.id} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-apre-blue">{q.moduloNombre || "Quiz de Módulo"}</td>
                          <td className="p-2.5 text-gray-600">
                            {q.correctas ?? "—"} / {q.total ?? "—"}
                          </td>
                          <td className="p-2.5 font-black text-slate-800">{q.porcentaje}%</td>
                          <td className="p-2.5">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                q.aprobado ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {q.aprobado ? "✓ Aprobado" : "✕ Reprobado"}
                            </span>
                          </td>
                          <td className="p-2.5 text-gray-400">
                            {q.fecha?.toDate
                              ? q.fecha.toDate().toLocaleDateString("es-CL")
                              : typeof q.fecha === "string"
                              ? new Date(q.fecha).toLocaleDateString("es-CL")
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic p-4 bg-gray-50 rounded-xl text-center">
                  El alumno no registra mini-quizzes rendidos todavía.
                </p>
              )}
            </div>

            {/* Footer Modal */}
            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              {modalAlumno.examenFinal?.aprobado && onEmitirDiploma && (
                <button
                  onClick={() => {
                    const sel = modalAlumno;
                    setModalAlumno(null);
                    onEmitirDiploma({
                      uid: sel.uid,
                      nombre: sel.nombre,
                      rut: sel.rut,
                      cursoSlug: sel.courseSlug,
                    });
                  }}
                  className="rounded-xl bg-apre-red text-white px-4 py-2 text-xs font-bold hover:bg-apre-red-dark transition"
                >
                  📜 Generar Diploma Oficial
                </button>
              )}
              <button
                onClick={() => setModalAlumno(null)}
                className="rounded-xl bg-gray-200 text-gray-700 px-4 py-2 text-xs font-bold hover:bg-gray-300 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Alumnos Aprobados por Asignatura (Egresados Oficiales) ---------- */
function AprobadosTab({
  onEmitirDiploma,
}: {
  onEmitirDiploma?: (datos: { uid: string; nombre: string; rut: string; cursoSlug: string }) => void;
}) {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<any[]>([]);
  const [cursoFiltro, setCursoFiltro] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(query(collection(db, "usuarios"), where("rol", "==", "alumno")), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "resultados_evaluaciones"), (snap) =>
      setEvaluaciones(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  // Filtrar exclusivamente exámenes finales aprobados
  const aprobadosFinales = evaluaciones.filter((ev) => {
    if (!ev.aprobado) return false;
    const esFinal = Boolean(
      ev.esExamenFinal === true ||
      ev.tipo === "examen_final" ||
      (ev.moduloNombre || "").toLowerCase().includes("examen final") ||
      (ev.moduloNombre || "").toLowerCase().includes("evaluación final") ||
      (ev.moduloNombre || "").toLowerCase().includes("evaluacion final")
    );
    return esFinal;
  });

  // Normalizar curso y asociar usuario
  const listaAprobados = aprobadosFinales.map((ev) => {
    const u = usuarios.find((x) => x.id === ev.userId || x.uid === ev.userId || (ev.userEmail && x.email === ev.userEmail));
    const slug =
      ev.courseSlug ||
      ((ev.moduloNombre || "").toLowerCase().includes("cctv")
        ? "operador-cctv-y-alarmas"
        : (ev.moduloNombre || "").toLowerCase().includes("supervisor")
        ? "supervisor-de-seguridad"
        : (ev.moduloNombre || "").toLowerCase().includes("bastón")
        ? "baston-y-esposas"
        : "guardia-de-seguridad");

    const cursoInfo = CURSOS_LISTA.find((c) => c.slug === slug) || {
      slug,
      nombre: cursoNombreDe(slug),
      shortName: cursoNombreDe(slug),
      icono: "🎓",
    };

    return {
      id: ev.id,
      uid: ev.userId || u?.id,
      nombre: u?.nombre || ev.nombreUsuario || "Estudiante",
      rut: u?.rut || ev.userRut || "",
      email: u?.email || ev.userEmail || "—",
      telefono: u?.telefono || "—",
      courseSlug: slug,
      cursoInfo,
      porcentaje: ev.porcentaje ?? 100,
      correctas: ev.correctas,
      total: ev.total,
      fecha: ev.fecha,
    };
  });

  // Desduplicar si un alumno rindió el examen más de una vez con aprobación (dejar el de mayor porcentaje)
  const mapaUnicos = new Map<string, typeof listaAprobados[0]>();
  listaAprobados.forEach((item) => {
    const key = `${item.uid || item.email}_${item.courseSlug}`;
    const prev = mapaUnicos.get(key);
    if (!prev || (item.porcentaje > prev.porcentaje)) {
      mapaUnicos.set(key, item);
    }
  });

  const egresadosUnicos = Array.from(mapaUnicos.values());

  const filtrados = egresadosUnicos.filter((item) => {
    if (cursoFiltro !== "todos" && item.courseSlug !== cursoFiltro) return false;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase().trim();
      const matchNom = item.nombre.toLowerCase().includes(q);
      const matchRut = item.rut.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      if (!matchNom && !matchRut && !matchEmail) return false;
    }
    return true;
  });

  const exportarCsvEgresados = () => {
    const filas = [
      ["Fecha Aprobación", "Alumno", "RUT", "Email", "Teléfono", "Asignatura / Curso", "Nota Examen Final (%)", "Correctas", "Total Preguntas", "Estado"],
      ...filtrados.map((r) => [
        r.fecha?.toDate
          ? r.fecha.toDate().toLocaleString("es-CL")
          : typeof r.fecha === "string"
          ? new Date(r.fecha).toLocaleString("es-CL")
          : "—",
        r.nombre,
        r.rut ? formatRut(r.rut) : "Sin RUT",
        r.email,
        r.telefono,
        r.cursoInfo.nombre || r.courseSlug,
        `${r.porcentaje}%`,
        String(r.correctas ?? "—"),
        String(r.total ?? "—"),
        "APROBADO",
      ]),
    ];
    const csv =
      "\uFEFF" +
      filas
        .map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
        .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nomina-alumnos-aprobados-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-linear-to-r from-emerald-50 via-teal-50/70 to-blue-50/50 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 border border-emerald-300">
              <span>🎓</span> Nómina Oficial de Aprobados
            </div>
            <h2 className="text-xl font-extrabold text-apre-blue mt-2">
              Alumnos Aprobados y Egresados por Asignatura
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Listado exclusivo de estudiantes que han rendido y aprobado el <strong>Examen Final Oficial</strong> de cada curso. Listos para emisión de Diploma, Certificado y acreditación ante las entidades correspondientes.
            </p>
          </div>
          <button
            onClick={exportarCsvEgresados}
            disabled={filtrados.length === 0}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shadow-sm transition flex items-center gap-2 disabled:opacity-50"
          >
            <span>⬇</span>
            <span>Descargar Nómina de Aprobados (Excel)</span>
          </button>
        </div>

        {/* Resumen por Asignatura */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-4 border-t border-emerald-100">
          <div className="rounded-xl bg-white/90 p-3 text-xs border border-emerald-200 shadow-2xs">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Total Egresados</span>
            <span className="text-xl font-black text-emerald-800">{egresadosUnicos.length}</span>
          </div>
          {CURSOS_LISTA.map((c) => {
            const count = egresadosUnicos.filter((x) => x.courseSlug === c.slug).length;
            return (
              <div key={c.slug} className="rounded-xl bg-white/90 p-3 text-xs border border-emerald-100 shadow-2xs">
                <span className="text-slate-500 font-bold block text-[10px] uppercase truncate">
                  {c.icono} {c.shortName}
                </span>
                <span className="text-lg font-black text-slate-800">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCursoFiltro("todos")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              cursoFiltro === "todos"
                ? "bg-apre-blue text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas las Asignaturas ({egresadosUnicos.length})
          </button>
          {CURSOS_LISTA.map((c) => {
            const count = egresadosUnicos.filter((x) => x.courseSlug === c.slug).length;
            const active = cursoFiltro === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setCursoFiltro(c.slug)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                  active
                    ? "bg-apre-blue text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{c.icono}</span>
                <span>{c.shortName}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar aprobado por nombre o RUT…"
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tabla de Aprobados */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-3.5">Alumno</th>
              <th className="p-3.5">RUT</th>
              <th className="p-3.5">Asignatura / Curso</th>
              <th className="p-3.5">Nota Examen Final</th>
              <th className="p-3.5">Fecha Aprobación</th>
              <th className="p-3.5 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtrados.map((item) => (
              <tr key={`${item.uid}_${item.courseSlug}`} className="hover:bg-slate-50/80 transition">
                <td className="p-3.5">
                  <p className="font-extrabold text-apre-blue text-sm">{item.nombre}</p>
                  <p className="text-gray-500 text-[11px]">{item.email}</p>
                </td>
                <td className="p-3.5 font-mono font-bold text-slate-700">
                  {item.rut ? formatRut(item.rut) : "Sin RUT"}
                </td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 text-xs font-bold">
                    <span>{item.cursoInfo.icono}</span>
                    <span>{item.cursoInfo.shortName}</span>
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 text-xs font-black">
                    {item.porcentaje}%
                  </span>
                  {item.correctas !== undefined && item.total !== undefined && (
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {item.correctas}/{item.total} correctas
                    </p>
                  )}
                </td>
                <td className="p-3.5 text-gray-500">
                  {item.fecha?.toDate
                    ? item.fecha.toDate().toLocaleDateString("es-CL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : typeof item.fecha === "string"
                    ? new Date(item.fecha).toLocaleDateString("es-CL")
                    : "Reciente"}
                </td>
                <td className="p-3.5 text-right">
                  {onEmitirDiploma && (
                    <button
                      onClick={() =>
                        onEmitirDiploma({
                          uid: item.uid,
                          nombre: item.nombre,
                          rut: item.rut,
                          cursoSlug: item.courseSlug,
                        })
                      }
                      className="rounded-xl bg-apre-red hover:bg-apre-red-dark text-white px-3.5 py-2 text-xs font-bold transition shadow-xs inline-flex items-center gap-1.5"
                    >
                      <span>📜</span>
                      <span>Emitir Diploma</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No hay alumnos aprobados registrados con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Usuarios y Matrículas (Alumnos / Profesores) ---------- */
function UsuariosTab({ filtroRol }: { filtroRol: "alumno" | "profesor" }) {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [cohortes, setCohortes] = useState<any[]>([]);
  const [selUid, setSelUid] = useState<string | null>(null);
  const [selCurso, setSelCurso] = useState("");
  const [editandoRutUid, setEditandoRutUid] = useState<string | null>(null);
  const [rutInput, setRutInput] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [os10GlobalHabilitado, setOs10GlobalHabilitado] = useState(false);

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "usuarios"), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "enrollments"), (snap) =>
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un3 = onSnapshot(doc(db, "configuracion", "os10_materiales"), (snap) => {
      if (snap.exists()) {
        setOs10GlobalHabilitado(snap.data().habilitado === true);
      }
    });
    const un4 = onSnapshot(collection(db, "cohortes"), (snap) =>
      setCohortes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
      un3();
      un4();
    };
  }, [db]);

  const lista = usuarios.filter((u) => u.rol === filtroRol);

  const toggleActivo = async (u: any) => {
    if (!db) return;
    await updateDoc(doc(db, "usuarios", u.id), { activo: !u.activo });
  };

  const toggleOnline = async (u: any) => {
    if (!db) return;
    const actual = Boolean(u.accesoOnline || u.accesoClasesVivo || u.modalidadOnline);
    await updateDoc(doc(db, "usuarios", u.id), {
      accesoOnline: !actual,
      accesoClasesVivo: !actual,
    });
  };

  const toggleMaterialOS10 = async (u: any) => {
    if (!db) return;
    const actual = Boolean(u.habilitadoMaterialOS10 || u.materialOS10Habilitado);
    await updateDoc(doc(db, "usuarios", u.id), {
      habilitadoMaterialOS10: !actual,
      materialOS10Habilitado: !actual,
    });
  };

  const toggleGlobalOS10 = async () => {
    if (!db) return;
    const nuevo = !os10GlobalHabilitado;
    await setDoc(doc(db, "configuracion", "os10_materiales"), { habilitado: nuevo }, { merge: true });
    await setDoc(doc(db, "configuracion", "os10_cuestionarios"), { habilitado: nuevo }, { merge: true });
  };

  const eliminar = async (u: any) => {
    if (!confirm(`¿Eliminar a ${u.nombre}?`)) return;
    await deleteDoc(doc(db!, "usuarios", u.id));
    for (const e of enrolls.filter((e) => e.uid === u.id)) {
      await deleteDoc(doc(db!, "enrollments", e.id));
    }
  };

  const guardarRut = async (u: any) => {
    if (!db) return;
    await updateDoc(doc(db, "usuarios", u.id), { rut: formatRut(rutInput) });
    setEditandoRutUid(null);
    setRutInput("");
  };

  const matricular = async (u: any) => {
    if (!selCurso) return;
    const fieldKey = getCourseFieldKey(selCurso);
    await updateDoc(doc(db!, "usuarios", u.id), {
      [fieldKey]: "aceptado",
    });
    await setDoc(doc(collection(db!, "enrollments"), `${u.id}_${selCurso}`), {
      uid: u.id,
      courseSlug: selCurso,
      modulosCompletados: [],
      fecha: serverTimestamp(),
    });
    setSelCurso("");
    setSelUid(null);
  };

  const desmatricular = async (e: any) => {
    await deleteDoc(doc(db!, "enrollments", e.id));
  };

  const listaFiltrada = lista.filter((u) => {
    if (!busqueda.trim()) return true;
    const q = busqueda.toLowerCase().trim();
    const nom = (u.nombre || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const rut = (u.rut || "").toLowerCase();
    return nom.includes(q) || email.includes(q) || rut.includes(q);
  });

  if (lista.length === 0) {
    return <p className="text-gray-500">No hay {filtroRol === "profesor" ? "profesores" : "alumnos"} registrados.</p>;
  }

  return (
    <div className="space-y-4">
      {/* Banner de Control Global de Material OS-10 (Fase Presencial) */}
      {filtroRol === "alumno" && (
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 px-3 py-0.5 text-xs font-black uppercase text-blue-800 border border-blue-200">
              <span>🏫</span> Fase Presencial vs Material Digital OS-10
            </div>
            <h3 className="text-base font-extrabold text-apre-blue mt-1">
              Control de Material de Estudio Guardia OS-10
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Por defecto, los alumnos presenciales de OS-10 tienen el material digital y cuestionarios bloqueados mientras están en clases en sede. Puedes habilitar el material para todos con 1 clic al finalizar las clases, o alumno por alumno individualmente.
            </p>
          </div>
          <button
            onClick={toggleGlobalOS10}
            className={`rounded-xl px-4 py-2.5 text-xs font-black text-white transition shadow-sm flex items-center gap-2 ${
              os10GlobalHabilitado
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            <span>{os10GlobalHabilitado ? "🔒" : "📚"}</span>
            <span>
              {os10GlobalHabilitado
                ? "Bloquear Material OS-10 para Todos (Fase Presencial)"
                : "Habilitar Material OS-10 para Todos los Alumnos"}
            </span>
          </button>
        </div>
      )}

      {/* Buscador de Usuarios */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder={`🔍 Buscar ${filtroRol === "profesor" ? "profesor" : "alumno"} por nombre, RUT o email…`}
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
          />
        </div>
        <p className="text-xs font-bold text-gray-500">
          Mostrando {listaFiltrada.length} de {lista.length} {filtroRol === "profesor" ? "profesores" : "alumnos"}
        </p>
      </div>

      {listaFiltrada.map((u) => {
        const susEnrolls = enrolls.filter((e) => e.uid === u.id);
        const isOnline = Boolean(u.accesoOnline || u.accesoClasesVivo || u.modalidadOnline);
        const hasOS10 = susEnrolls.some((e) => e.courseSlug === "guardia-de-seguridad") || u.accesoOS10;
        const os10Habilitado = Boolean(u.habilitadoMaterialOS10 || u.materialOS10Habilitado || os10GlobalHabilitado);

        return (
          <div key={u.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-extrabold text-apre-blue text-base">{u.nombre}</p>
                <p className="text-xs text-gray-600">
                  {u.email} ·{" "}
                  <span className="font-mono text-[10px] text-gray-400">ID: {u.id}</span> ·{" "}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${
                      u.rol === "alumno"
                        ? "bg-apre-blue"
                        : u.rol === "profesor"
                        ? "bg-apre-pink"
                        : "bg-apre-red"
                    }`}
                  >
                    {u.rol}
                  </span>{" "}
                  {u.activo ? (
                    <span className="text-green-600 font-bold">· activo</span>
                  ) : (
                    <span className="text-red-600 font-bold">· desactivado</span>
                  )}
                </p>

                {/* RUT con edición rápida */}
                <div className="mt-1 flex items-center gap-2">
                  {editandoRutUid === u.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={rutInput}
                        onChange={(e) => setRutInput(formatRut(e.target.value))}
                        placeholder="12.345.678-9"
                        className="rounded-lg border border-gray-300 px-2 py-1 text-xs font-mono"
                      />
                      <button
                        onClick={() => guardarRut(u)}
                        className="rounded-lg bg-emerald-600 px-2 py-1 text-xs font-bold text-white"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditandoRutUid(null)}
                        className="rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-600 font-mono">
                      RUT: <strong>{u.rut ? formatRut(u.rut) : "Sin RUT"}</strong>{" "}
                      <button
                        onClick={() => {
                          setEditandoRutUid(u.id);
                          setRutInput(u.rut || "");
                        }}
                        className="text-[11px] font-bold text-apre-blue hover:underline ml-1"
                      >
                        ✎ {u.rut ? "Editar" : "+ Agregar RUT"}
                      </button>
                    </p>
                  )}
                </div>

                {/* Modalidad Online vs Presencial para Alumnos */}
                {u.rol === "alumno" && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                        isOnline
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      <span>{isOnline ? "🟢" : "⚪"}</span>
                      <span>{isOnline ? "Modalidad Online (Clases Zoom Habilitadas)" : "Modalidad Presencial (Sin Clases Zoom)"}</span>
                    </span>
                    <button
                      onClick={() => toggleOnline(u)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-2xs ${
                        isOnline
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }`}
                    >
                      {isOnline ? "✕ Cambiar a Presencial" : "✓ Dar Acceso a Clases Online"}
                    </button>
                  </div>
                )}

                {/* Control de Material OS-10 si es alumno matriculado en OS-10 */}
                {u.rol === "alumno" && hasOS10 && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                        os10Habilitado
                          ? "bg-blue-50 text-blue-900 border-blue-300"
                          : "bg-amber-50 text-amber-900 border-amber-300"
                      }`}
                    >
                      <span>{os10Habilitado ? "📚" : "🔒"}</span>
                      <span>
                        {os10Habilitado
                          ? "Material Digital OS-10: Habilitado"
                          : "Material Digital OS-10: Bloqueado (Fase Presencial)"}
                      </span>
                    </span>
                    <button
                      onClick={() => toggleMaterialOS10(u)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-2xs ${
                        u.habilitadoMaterialOS10
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {u.habilitadoMaterialOS10 ? "🔒 Bloquear Material OS-10" : "📚 Habilitar Material OS-10"}
                    </button>
                  </div>
                )}

                {/* Asignación de Grupo / Convocatoria para Alumnos */}
                {u.rol === "alumno" && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200">
                      <span>🗓️</span>
                      <span>Grupo: <strong>{u.cohorteNombre || "Sin convocatoria asignada"}</strong></span>
                    </span>
                    {cohortes.length > 0 && (
                      <select
                        value={u.cohorteId || ""}
                        onChange={async (e) => {
                          const val = e.target.value;
                          const cObj = cohortes.find((x) => x.id === val);
                          await updateDoc(doc(db!, "usuarios", u.id), {
                            cohorteId: val || null,
                            cohorteNombre: cObj ? cObj.nombre : null,
                            ...(cObj?.cursoSlug === "guardia-de-seguridad"
                              ? {
                                  habilitadoMaterialOS10: Boolean(cObj.materialHabilitado),
                                  materialOS10Habilitado: Boolean(cObj.materialHabilitado),
                                }
                              : {}),
                          });
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-700 font-medium focus:border-apre-blue focus:outline-hidden"
                      >
                        <option value="">Cambiar grupo / convocatoria…</option>
                        {cohortes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nombre} ({c.fechaInicio || "—"})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleActivo(u)}
                  className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-200"
                >
                  {u.activo ? "Desactivar" : "Activar"}
                </button>
                <button
                  onClick={() => eliminar(u)}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-apre-red hover:bg-red-100"
                >
                  Eliminar
                </button>
              </div>
            </div>

            {susEnrolls.length > 0 && (
              <ul className="mt-3 space-y-1">
                {susEnrolls.map((e) => (
                  <li key={e.id} className="rounded-lg bg-gray-50 px-3 py-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-apre-blue">{cursoNombreDe(e.courseSlug)}</span>
                    <button
                      onClick={() => desmatricular(e)}
                      className="font-bold text-apre-red hover:underline"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {filtroRol === "alumno" &&
              (selUid === u.id ? (
                <div className="mt-3 flex gap-2">
                  <select
                    value={selCurso}
                    onChange={(e) => setSelCurso(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs"
                  >
                    <option value="">Selecciona un curso…</option>
                    {CURSOS_PLATAFORMA.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => matricular(u)}
                    className="rounded-lg bg-apre-blue px-4 py-2 text-xs font-bold text-white"
                  >
                    Matricular
                  </button>
                  <button
                    onClick={() => setSelUid(null)}
                    className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelUid(u.id)}
                  className="mt-3 rounded-lg bg-apre-blue/10 px-3 py-1.5 text-xs font-bold text-apre-blue hover:bg-apre-blue/20"
                >
                  + Matricular en curso
                </button>
              ))}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Diplomas y Certificados (Con Firmas Base64, QR y RUT) ---------- */
function DiplomasTab({
  preselect,
}: {
  preselect?: { uid?: string; nombre?: string; rut?: string; cursoSlug?: string } | null;
}) {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<any[]>([]);
  const [selUid, setSelUid] = useState(preselect?.uid || "");
  const [nombreManual, setNombreManual] = useState(preselect?.nombre || "");
  const [rutManual, setRutManual] = useState(preselect?.rut || "");
  const [cursoSlug, setCursoSlug] = useState(preselect?.cursoSlug || CURSOS_CERTIFICADO[0].slug);
  const [fechaManual, setFechaManual] = useState("");

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(query(collection(db, "usuarios"), where("rol", "==", "alumno")), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "resultados_evaluaciones"), (snap) =>
      setEvaluaciones(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  useEffect(() => {
    if (preselect) {
      if (preselect.uid) setSelUid(preselect.uid);
      if (preselect.nombre) setNombreManual(preselect.nombre);
      if (preselect.rut) setRutManual(formatRut(preselect.rut));
      if (preselect.cursoSlug) setCursoSlug(preselect.cursoSlug);
    }
  }, [preselect]);

  const seleccionarAlumno = (u: any) => {
    setSelUid(u.id);
    setNombreManual(u.nombre || "");
    setRutManual(u.rut ? formatRut(u.rut) : "");
  };

  const guardarRutEnPerfil = async () => {
    if (!db || !selUid || !rutManual) return;
    await updateDoc(doc(db, "usuarios", selUid), { rut: formatRut(rutManual) });
    alert("RUT actualizado exitosamente en el perfil del alumno.");
  };

  const curso =
    CURSOS_CERTIFICADO.find((c) => c.slug === cursoSlug) ?? CURSOS_CERTIFICADO[0];

  // Lista de aprobados en este curso (SOLO EXÁMENES FINALES REALES)
  const aprobadosCurso = evaluaciones.filter((ev) => {
    if (!ev.aprobado) return false;
    const esFinal = Boolean(
      ev.esExamenFinal === true ||
      ev.tipo === "examen_final" ||
      (ev.moduloNombre || "").toLowerCase().includes("examen final") ||
      (ev.moduloNombre || "").toLowerCase().includes("evaluación final") ||
      (ev.moduloNombre || "").toLowerCase().includes("evaluacion final")
    );
    if (!esFinal) return false;
    if (ev.courseSlug === cursoSlug) return true;
    const mod = (ev.moduloNombre || "").toLowerCase();
    if (cursoSlug === "guardia-de-seguridad" && (mod.includes("os-10") || mod.includes("guardia"))) return true;
    if (cursoSlug === "operador-cctv-y-alarmas" && mod.includes("cctv")) return true;
    if (cursoSlug === "baston-y-esposas" && mod.includes("bastón")) return true;
    if (cursoSlug === "supervisor-de-seguridad" && mod.includes("supervisor")) return true;
    return false;
  });

  const imprimirCertificadoConNombre = () => {
    const nombreLimpio = (nombreManual || "Alumno")
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s-_]/g, "")
      .replace(/\s+/g, "_");

    const cursoLimpio = (curso.slug || "curso")
      .trim()
      .replace(/[^a-zA-Z0-9\s-_]/g, "")
      .replace(/\s+/g, "_");

    const tituloOriginal = typeof document !== "undefined" ? document.title : "";
    if (typeof document !== "undefined") {
      document.title = `Certificado_${cursoLimpio}_${nombreLimpio}`;
    }

    window.print();

    setTimeout(() => {
      if (typeof document !== "undefined" && tituloOriginal) {
        document.title = tituloOriginal;
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 print:hidden shadow-xs space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-blue/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-blue">
            <span>📜</span> Emisión Oficial de Diplomas y Certificados
          </div>
          <h2 className="text-xl font-extrabold text-apre-blue mt-2">
            Generador de Diplomas y Certificados
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Los diplomas incluyen las firmas digitales oficiales en Base64, sello con código QR interactivo a
            www.aprecap.cl y el RUT del estudiante.
          </p>
        </div>

        {/* Cursos Tabs */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
            1. Selecciona el Curso
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
            {CURSOS_CERTIFICADO.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCursoSlug(c.slug)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition text-left border ${
                  cursoSlug === c.slug
                    ? "bg-apre-blue text-white border-apre-blue shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <p className="font-extrabold">{c.nombre.replace("CURSO DE ", "")}</p>
                <p className="text-[10px] opacity-75 mt-0.5">{c.horas} Horas Acreditadas</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Aprobados en este Curso */}
        {aprobadosCurso.length > 0 && (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              2. Alumnos Aprobados en este Curso (Clic para cargar)
            </label>
            <div className="flex flex-wrap gap-2 mt-1.5 max-h-36 overflow-y-auto p-2 bg-emerald-50/50 rounded-xl border border-emerald-200">
              {aprobadosCurso.map((ap) => {
                const u = usuarios.find((x) => x.id === ap.userId || x.uid === ap.userId);
                const nombre = u?.nombre || ap.nombreUsuario || "Alumno";
                const rut = u?.rut || ap.userRut || "";
                const isSelected = selUid === (ap.userId || u?.id);
                return (
                  <button
                    key={ap.id}
                    onClick={() => {
                      setSelUid(ap.userId || u?.id || "");
                      setNombreManual(nombre);
                      setRutManual(rut ? formatRut(rut) : "");
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
                    }`}
                  >
                    <span>✅</span>
                    <span>{nombre}</span>
                    <span className="text-[10px] opacity-80">({ap.porcentaje}%)</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Edición de Datos del Certificado */}
        <div className="grid gap-3 sm:grid-cols-3 pt-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
              Nombre del Alumno (editable)
            </label>
            <input
              type="text"
              value={nombreManual}
              onChange={(e) => setNombreManual(e.target.value)}
              placeholder="Nombre completo del estudiante"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
              RUT del Alumno (editable)
            </label>
            <div className="flex gap-1.5 mt-1">
              <input
                type="text"
                value={rutManual}
                onChange={(e) => setRutManual(formatRut(e.target.value))}
                placeholder="12.345.678-9"
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 font-mono text-sm"
              />
              {selUid && (
                <button
                  type="button"
                  onClick={guardarRutEnPerfil}
                  title="Guardar RUT en el perfil del alumno"
                  className="rounded-xl bg-gray-100 hover:bg-gray-200 px-3 text-xs font-bold text-gray-700"
                >
                  💾
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-apre-blue">
              Fecha de Emisión (opcional)
            </label>
            <input
              type="text"
              value={fechaManual}
              onChange={(e) => setFechaManual(e.target.value)}
              placeholder="Ej: 19 de agosto de 2026"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Selector de cualquier otro alumno registrado */}
        <div className="pt-1">
          <label className="text-xs font-bold text-gray-500">
            O selecciona cualquier otro alumno registrado:
          </label>
          <select
            value={selUid}
            onChange={(e) => {
              const u = usuarios.find((x) => x.id === e.target.value);
              if (u) seleccionarAlumno(u);
              else setSelUid(e.target.value);
            }}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs"
          >
            <option value="">Selecciona alumno registrado…</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} · {u.email} {u.rut ? `(${formatRut(u.rut)})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={imprimirCertificadoConNombre}
            className="rounded-xl bg-apre-red px-6 py-3 text-sm font-black text-white transition hover:bg-apre-red-dark shadow-sm inline-flex items-center gap-2"
          >
            <span>🖨</span>
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>

      {/* Previsualización del Diploma */}
      <DiplomaCertificado
        nombre={nombreManual || "NOMBRE DEL ESTUDIANTE"}
        rut={rutManual || "12.345.678-9"}
        curso={curso}
        fechaPersonalizada={fechaManual || undefined}
      />
    </div>
  );
}

/* ---------- Clases en vivo y Programadas (Control exclusivo del Admin) ---------- */
function ClasesTab({
  onPublicarGrabada,
}: {
  onPublicarGrabada?: (datos: { titulo: string; cursoSlug: string; descripcion: string }) => void;
}) {
  const db = getFirestoreDb();
  const { userData } = useAuth();
  const [clases, setClases] = useState<any[]>([]);

  const getTodayDateStr = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const getFutureDateStr = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const getTomorrowAt = (hours: number, minutes: number = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(hours, minutes, 0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hours)}:${pad(minutes)}`;
  };

  const [tipoHorario, setTipoHorario] = useState<"rango_dias" | "programada" | "inmediata">("rango_dias");
  
  // Ciclo por Rango de Días (ej. del 1 al 10 de Septiembre, diario de 08:00 a 15:00 hrs)
  const [fechaInicioRango, setFechaInicioRango] = useState(getTodayDateStr());
  const [fechaFinRango, setFechaFinRango] = useState(getFutureDateStr(10));
  const [horaInicioDiaria, setHoraInicioDiaria] = useState("08:00");
  const [horaFinDiaria, setHoraFinDiaria] = useState("15:00");
  const [diasSemana, setDiasSemana] = useState<"lunes_a_viernes" | "lunes_a_sabado" | "todos_los_dias">("lunes_a_viernes");

  // Clase Única puntual
  const [fechaInicioProg, setFechaInicioProg] = useState(getTomorrowAt(8, 0));
  const [fechaFinProg, setFechaFinProg] = useState(getTomorrowAt(15, 0));

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    cursoSlug: "",
    joinUrl: "",
  });

  const [filtroEstado, setFiltroEstado] = useState<"todas" | "en_vivo" | "programadas" | "finalizadas">("todas");
  const [editandoUrlId, setEditandoUrlId] = useState<string | null>(null);
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [zoomMeetings, setZoomMeetings] = useState<any[]>([]);
  const [creandoZoom, setCreandoZoom] = useState(false);
  const [zoomMsg, setZoomMsg] = useState("");

  useEffect(() => {
    if (!db) return;
    // Escuchar la colección de clases completa para que todos los administradores y profesores vean todas las clases sin restricción
    const q = collection(db, "clases");
    return onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a: any, b: any) => {
          const timeA = a.fechaCreacion?.toMillis
            ? a.fechaCreacion.toMillis()
            : a.fechaInicio
            ? new Date(a.fechaInicio).getTime()
            : 0;
          const timeB = b.fechaCreacion?.toMillis
            ? b.fechaCreacion.toMillis()
            : b.fechaInicio
            ? new Date(b.fechaInicio).getTime()
            : 0;
          return timeB - timeA;
        });
        setClases(list);
      },
      (err) => {
        console.error("Error obteniendo clases:", err);
      }
    );
  }, [db]);

  // Cargar reuniones de Zoom API si está configurado
  useEffect(() => {
    fetch("/api/zoom", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.meetings && Array.isArray(data.meetings)) {
          setZoomMeetings(data.meetings);
        }
      })
      .catch(() => {});
  }, []);

  const getDiasPermitidosArray = (tipo: string) => {
    if (tipo === "lunes_a_viernes") return [1, 2, 3, 4, 5];
    if (tipo === "lunes_a_sabado") return [1, 2, 3, 4, 5, 6];
    return null;
  };

  const generarZoomAutomatico = async () => {
    if (!form.nombre.trim()) {
      alert("Por favor ingresa primero el nombre de la clase.");
      return;
    }
    setCreandoZoom(true);
    setZoomMsg("");
    try {
      let duracionMinutos = 90;
      let startTime = new Date().toISOString();

      if (tipoHorario === "rango_dias") {
        const [hIni, mIni] = horaInicioDiaria.split(":").map(Number);
        const [hFin, mFin] = horaFinDiaria.split(":").map(Number);
        duracionMinutos = Math.max(30, (hFin * 60 + mFin) - (hIni * 60 + mIni));
        startTime = new Date(`${fechaInicioRango}T${horaInicioDiaria}:00`).toISOString();
      } else if (tipoHorario === "programada") {
        duracionMinutos = Math.max(
          30,
          Math.round(
            (new Date(fechaFinProg).getTime() - new Date(fechaInicioProg).getTime()) / (1000 * 60)
          )
        );
        startTime = new Date(fechaInicioProg).toISOString();
      }

      const res = await fetch("/api/zoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: form.nombre.trim(),
          start_time: startTime,
          duration: String(duracionMinutos),
          timezone: "America/Santiago",
        }),
      });
      const data = await res.json();
      if (res.ok && data.meeting?.join_url) {
        const joinUrl = data.meeting.join_url;
        const startUrl = data.meeting.start_url || "";

        if (db) {
          const diasArray = getDiasPermitidosArray(diasSemana);
          const payloadBase: any = {
            nombre: form.nombre.trim(),
            descripcion: form.descripcion.trim(),
            cursoSlug: form.cursoSlug,
            joinUrl,
            startUrl,
            tipoHorario,
            fechaCreacion: serverTimestamp(),
            creadoPor: userData?.email || "",
          };

          if (tipoHorario === "rango_dias") {
            await addDoc(collection(db, "clases"), {
              ...payloadBase,
              fechaInicioRango,
              fechaFinRango,
              horaInicioDiaria,
              horaFinDiaria,
              diasPermitidos: diasArray,
              diasSemanaTipo: diasSemana,
              estado: "programada",
            });
            setZoomMsg(`✅ ¡Ciclo programado exitosamente! Del ${fechaInicioRango} al ${fechaFinRango} (Diario de ${horaInicioDiaria} a ${horaFinDiaria} hrs).`);
          } else if (tipoHorario === "programada") {
            await addDoc(collection(db, "clases"), {
              ...payloadBase,
              fechaInicioProgramada: fechaInicioProg,
              fechaFinProgramada: fechaFinProg,
              estado: "programada",
            });
            setZoomMsg(`✅ ¡Clase programada exitosamente! Horario: ${formatRangoHorario(fechaInicioProg, fechaFinProg)}`);
          } else {
            await addDoc(collection(db, "clases"), {
              ...payloadBase,
              estado: "activa",
              fechaInicio: serverTimestamp(),
            });
            setZoomMsg("✅ ¡Sala Zoom creada y ACTIVADA EN VIVO! Los alumnos ya pueden entrar directamente.");
          }

          setForm({ nombre: "", descripcion: "", cursoSlug: "", joinUrl: "" });
        }
      } else {
        setZoomMsg(data.error || "Zoom API no disponible. Puedes ingresar el enlace de Zoom manualmente abajo.");
      }
    } catch {
      setZoomMsg("Zoom API no disponible en este entorno. Puedes ingresar tu enlace de Zoom o Meet abajo.");
    } finally {
      setCreandoZoom(false);
    }
  };

  const crearManual = async () => {
    if (!db || !form.nombre.trim()) return;
    let url = form.joinUrl.trim();
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const diasArray = getDiasPermitidosArray(diasSemana);
    const payloadBase: any = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      cursoSlug: form.cursoSlug,
      joinUrl: url,
      tipoHorario,
      fechaCreacion: serverTimestamp(),
      creadoPor: userData?.email || "",
    };

    if (tipoHorario === "rango_dias") {
      await addDoc(collection(db, "clases"), {
        ...payloadBase,
        fechaInicioRango,
        fechaFinRango,
        horaInicioDiaria,
        horaFinDiaria,
        diasPermitidos: diasArray,
        diasSemanaTipo: diasSemana,
        estado: "programada",
      });
      setZoomMsg(`✅ Ciclo guardado: Del ${fechaInicioRango} al ${fechaFinRango} (Diario de ${horaInicioDiaria} a ${horaFinDiaria} hrs).`);
    } else if (tipoHorario === "programada") {
      await addDoc(collection(db, "clases"), {
        ...payloadBase,
        fechaInicioProgramada: fechaInicioProg,
        fechaFinProgramada: fechaFinProg,
        estado: "programada",
      });
      setZoomMsg(`✅ Clase programada para: ${formatRangoHorario(fechaInicioProg, fechaFinProg)}`);
    } else {
      await addDoc(collection(db, "clases"), {
        ...payloadBase,
        estado: "activa",
        fechaInicio: serverTimestamp(),
      });
      setZoomMsg("✅ Sala creada y ACTIVADA EN VIVO.");
    }

    setForm({ nombre: "", descripcion: "", cursoSlug: "", joinUrl: "" });
  };

  const guardarUrlClase = async (c: any) => {
    if (!db) return;
    let url = nuevaUrl.trim();
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    await updateDoc(doc(db, "clases", c.id), {
      joinUrl: url,
    });
    setEditandoUrlId(null);
    setNuevaUrl("");
  };

  const cambiarEstado = async (c: any, estado: string) => {
    if (!db) return;
    await updateDoc(doc(db, "clases", c.id), {
      estado,
      ...(estado === "activa" ? { fechaInicio: serverTimestamp() } : {}),
    });
  };

  const eliminar = async (c: any) => {
    if (!db) return;
    if (!confirm(`¿Eliminar la clase "${c.nombre}"?`)) return;
    await deleteDoc(doc(db, "clases", c.id));
  };

  // Clasificación por estado calculado
  const clasesConEstado = clases.map((c) => ({
    ...c,
    liveStatus: getClaseLiveStatus(c),
  }));

  const enVivoList = clasesConEstado.filter((c) => c.liveStatus === "en_vivo");
  const programadasList = clasesConEstado.filter((c) => c.liveStatus === "programada");
  const finalizadasList = clasesConEstado.filter((c) => c.liveStatus === "finalizada");

  const clasesFiltradas = clasesConEstado.filter((c) => {
    if (filtroEstado === "en_vivo") return c.liveStatus === "en_vivo";
    if (filtroEstado === "programadas") return c.liveStatus === "programada";
    if (filtroEstado === "finalizadas") return c.liveStatus === "finalizada";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Formulario de Creación y Programación */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-300 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-900">
            <span>🗓️</span> Programador de Clases en Vivo (Zoom / Virtual)
          </div>
          <span className="text-xs text-gray-500 font-bold">
            Solo visible para alumnos con modalidad Online aprobada
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-apre-blue mt-2">Programar o Abrir Sala de Clases</h2>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed">
          Configura un <strong>ciclo de varios días (ej. 10 días con apertura diaria a las 08:00 AM y cierre a las 15:00 PM)</strong>, programa una fecha única o abre la sala en el instante.
        </p>

        {/* Selector de Tipo de Horario */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTipoHorario("rango_dias")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
              tipoHorario === "rango_dias"
                ? "bg-apre-blue text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🗓️</span>
            <span>Ciclo por Rango de Días (ej. 10 días, diario 08:00 a 15:00)</span>
          </button>
          <button
            type="button"
            onClick={() => setTipoHorario("programada")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
              tipoHorario === "programada"
                ? "bg-apre-blue text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>⏰</span>
            <span>Clase Única con Fecha/Hora Puntual</span>
          </button>
          <button
            type="button"
            onClick={() => setTipoHorario("inmediata")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2 ${
              tipoHorario === "inmediata"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🔴</span>
            <span>Transmisión Inmediata (Abrir Ahora Mismo)</span>
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-gray-700 block mb-1">Nombre de la Clase o Ciclo: *</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="ej. Curso Guardia de Seguridad OS-10 - Clases Virtuales Matutinas"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-xs focus:border-apre-blue focus:outline-hidden"
            />
          </div>

          {/* Configuración de RANGO DE DÍAS CON HORARIO DIARIO */}
          {tipoHorario === "rango_dias" && (
            <div className="sm:col-span-2 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🗓️</span>
                <span className="text-xs font-black text-apre-blue uppercase tracking-wide">
                  Configuración del Rango de Días y Horarios Diarios
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                La sala Zoom se habilitará automáticamente todos los días entre la fecha de inicio y fin, abriendo exactamente a la hora diaria fijada y cerrando a la hora de término.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    📅 Día de Inicio del Ciclo: *
                  </label>
                  <input
                    type="date"
                    required
                    value={fechaInicioRango}
                    onChange={(e) => setFechaInicioRango(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    🏁 Día de Término del Ciclo: *
                  </label>
                  <input
                    type="date"
                    required
                    value={fechaFinRango}
                    onChange={(e) => setFechaFinRango(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    ⏰ Hora Diaria de Apertura: *
                  </label>
                  <input
                    type="time"
                    required
                    value={horaInicioDiaria}
                    onChange={(e) => setHoraInicioDiaria(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    ⏹️ Hora Diaria de Cierre: *
                  </label>
                  <input
                    type="time"
                    required
                    value={horaFinDiaria}
                    onChange={(e) => setHoraFinDiaria(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  📆 Días de la Semana Habilitados:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setDiasSemana("lunes_a_viernes")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      diasSemana === "lunes_a_viernes"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Lunes a Viernes
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiasSemana("lunes_a_sabado")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      diasSemana === "lunes_a_sabado"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Lunes a Sábado
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiasSemana("todos_los_dias")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      diasSemana === "todos_los_dias"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Todos los días (Corrido)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rango de Horarios si es puntual */}
          {tipoHorario === "programada" && (
            <>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  📅 Fecha y Hora de Inicio: * (ej. 08:00 AM)
                </label>
                <input
                  type="datetime-local"
                  required
                  value={fechaInicioProg}
                  onChange={(e) => setFechaInicioProg(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-blue-50/40 px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  🏁 Fecha y Hora de Término: * (ej. 15:00 PM / 3 de la tarde)
                </label>
                <input
                  type="datetime-local"
                  required
                  value={fechaFinProg}
                  onChange={(e) => setFechaFinProg(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-blue-50/40 px-3.5 py-2 text-xs font-medium focus:border-apre-blue focus:outline-hidden"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Curso Asignado:</label>
            <select
              value={form.cursoSlug}
              onChange={(e) => setForm({ ...form, cursoSlug: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-xs focus:border-apre-blue focus:outline-hidden"
            >
              <option value="">Todos los cursos (Transmisión Global)</option>
              {CURSOS_PLATAFORMA.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Descripción / Temario (opcional):</label>
            <input
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="ej. Clases teóricas transmitidas vía Zoom"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-xs focus:border-apre-blue focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-700 block">Enlace de la Sala Zoom / Meet:</label>
            <input
              value={form.joinUrl}
              onChange={(e) => setForm({ ...form, joinUrl: e.target.value })}
              placeholder="https://zoom.us/j/... (o genera automáticamente con el botón abajo)"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-xs focus:border-apre-blue focus:outline-hidden"
            />
            {zoomMeetings.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) setForm((prev) => ({ ...prev, joinUrl: e.target.value }));
                }}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[11px] text-gray-700"
              >
                <option value="">O seleccionar de tus reuniones Zoom sincronizadas…</option>
                {zoomMeetings.map((zm) => (
                  <option key={zm.id} value={zm.join_url}>
                    {zm.topic} ({new Date(zm.start_time).toLocaleDateString("es-CL")})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={generarZoomAutomatico}
            disabled={creandoZoom || !form.nombre.trim()}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-black text-white transition disabled:opacity-50 shadow-md flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>
              {creandoZoom
                ? "Sincronizando con Zoom…"
                : tipoHorario === "rango_dias" || tipoHorario === "programada"
                ? "🗓️ Programar con Zoom API Automático"
                : "🔴 Crear y Abrir Sala Zoom en Vivo (1 Clic)"}
            </span>
          </button>

          <button
            type="button"
            onClick={crearManual}
            disabled={!form.nombre.trim()}
            className="rounded-xl bg-apre-blue hover:bg-apre-blue-dark px-5 py-2.5 text-xs font-black text-white disabled:opacity-50 shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>
              {tipoHorario === "rango_dias" || tipoHorario === "programada"
                ? "Guardar Clase Programada"
                : "Crear y Abrir Manual"}
            </span>
          </button>
        </div>

        {zoomMsg && (
          <p className="mt-3 text-xs font-bold text-apre-blue bg-blue-50 border border-blue-200 p-2.5 rounded-xl">
            {zoomMsg}
          </p>
        )}
      </div>

      {/* Barra de Filtros de Clases */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFiltroEstado("todas")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              filtroEstado === "todas" ? "bg-apre-blue text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas ({clases.length})
          </button>
          <button
            onClick={() => setFiltroEstado("en_vivo")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroEstado === "en_vivo" ? "bg-emerald-600 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🔴 En Vivo Ahora</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{enVivoList.length}</span>
          </button>
          <button
            onClick={() => setFiltroEstado("programadas")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroEstado === "programadas" ? "bg-blue-600 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>⏳ Programadas / En Espera</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{programadasList.length}</span>
          </button>
          <button
            onClick={() => setFiltroEstado("finalizadas")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              filtroEstado === "finalizadas" ? "bg-slate-700 text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>📁 Finalizadas / Historial</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">{finalizadasList.length}</span>
          </button>
        </div>
      </div>

      {/* Lista de Clases */}
      <div className="space-y-3">
        {clasesFiltradas.map((c) => {
          const isLive = c.liveStatus === "en_vivo";
          const isProg = c.liveStatus === "programada";
          const isFin = c.liveStatus === "finalizada";

          return (
            <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-extrabold text-apre-blue text-base">{c.nombre}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                        isLive
                          ? "bg-whatsapp animate-pulse"
                          : isProg
                          ? "bg-blue-600"
                          : "bg-gray-400"
                      }`}
                    >
                      {isLive
                        ? "🔴 EN VIVO AHORA (SALA ABIERTA)"
                        : isProg
                        ? "⏳ PROGRAMADA (EN ESPERA)"
                        : "⏹️ CLASE FINALIZADA"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600">
                    Curso: <strong>{c.cursoSlug ? cursoNombreDe(c.cursoSlug) : "Todos los cursos (Global)"}</strong>
                  </p>

                  {/* Horario detallado del ciclo o puntual */}
                  {(c.tipoHorario === "rango_dias" || c.fechaInicioRango || c.fechaInicioProgramada || c.tipoHorario === "programada") && (
                    <p className="text-xs font-semibold text-indigo-900 bg-indigo-50 border border-indigo-200 inline-block px-2.5 py-1 rounded-lg">
                      ⏰ {formatDetalleHorario(c)}
                    </p>
                  )}

                  {c.descripcion && <p className="text-xs text-gray-500 italic">{c.descripcion}</p>}

                  {/* Creador y Visibilidad Compartida */}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 font-medium text-slate-700">
                      <span>👤</span> Creado por: <strong>{c.creadoPor || "Administración APRECAP"}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-medium text-emerald-800">
                      <span>🌐</span> Visible para: <strong>Todos los Administradores, Profesores y Alumnos</strong>
                    </span>
                  </div>

                  {/* Edición rápida del enlace de la clase */}
                  <div className="mt-2">
                    {editandoUrlId === c.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={nuevaUrl}
                          onChange={(e) => setNuevaUrl(e.target.value)}
                          placeholder="https://zoom.us/j/..."
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-mono w-72"
                        />
                        <button
                          onClick={() => guardarUrlClase(c)}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
                        >
                          Guardar enlace
                        </button>
                        <button
                          onClick={() => setEditandoUrlId(null)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500">Enlace Zoom:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 text-[11px]">
                          {c.joinUrl || "Sin enlace asignado"}
                        </code>
                        <button
                          onClick={() => {
                            setEditandoUrlId(c.id);
                            setNuevaUrl(c.joinUrl || "");
                          }}
                          className="text-blue-600 hover:underline font-bold text-[11px]"
                        >
                          ✏️ Editar enlace
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {c.joinUrl && (
                    <Link
                      href={`/aula-en-vivo?id=${c.id}`}
                      target="_blank"
                      className="rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-2 text-xs font-bold transition shadow-xs flex items-center gap-1"
                    >
                      <span>🚀</span>
                      <span>Probar Aula Virtual</span>
                    </Link>
                  )}

                  {isLive && (
                    <button
                      onClick={() => cambiarEstado(c, "finalizada")}
                      className="rounded-xl bg-amber-600 hover:bg-amber-700 px-3.5 py-2 text-xs font-bold text-white transition shadow-xs flex items-center gap-1"
                    >
                      <span>⏹️</span>
                      <span>Cerrar Sala Hoy</span>
                    </button>
                  )}

                  {isProg && (
                    <button
                      onClick={() => cambiarEstado(c, "activa")}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition shadow-xs flex items-center gap-1"
                    >
                      <span>🔴</span>
                      <span>Forzar Apertura Ahora</span>
                    </button>
                  )}

                  {isFin && (
                    <>
                      <button
                        onClick={() => cambiarEstado(c, "activa")}
                        className="rounded-xl bg-gray-100 hover:bg-gray-200 px-3.5 py-2 text-xs font-bold text-gray-700 transition flex items-center gap-1"
                      >
                        <span>🔄</span>
                        <span>Reactivar Sala</span>
                      </button>
                      {onPublicarGrabada && (
                        <button
                          onClick={() =>
                            onPublicarGrabada({
                              titulo: c.nombre,
                              cursoSlug: c.cursoSlug || "guardia-de-seguridad",
                              descripcion: c.descripcion || "",
                            })
                          }
                          className="rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white transition shadow-xs flex items-center gap-1"
                        >
                          <span>📹</span>
                          <span>Publicar como Clase Grabada</span>
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => eliminar(c)}
                    className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-2 text-xs font-bold text-red-600 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {clasesFiltradas.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-xs text-gray-400">
            No hay clases registradas en esta sección. Puedes programar una nueva arriba.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Reportes: Notas y Evaluaciones (Estilo SARMAT) ---------- */
function ReportesTab() {
  const db = getFirestoreDb();
  const [resultados, setResultados] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "quizzes" | "finales">("todos");
  const [filtroCurso, setFiltroCurso] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "resultados_evaluaciones"), (snap) =>
      setResultados(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "usuarios"), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  const nombreDe = (uid?: string) => {
    if (!uid) return "—";
    const u = usuarios.find((x) => x.id === uid || x.uid === uid);
    return u?.nombre || uid;
  };

  const rutDe = (uid?: string, rawRut?: string) => {
    if (rawRut) return formatRut(rawRut);
    const u = usuarios.find((x) => x.id === uid || x.uid === uid);
    return u?.rut ? formatRut(u.rut) : "—";
  };

  const emailDe = (uid?: string, rawEmail?: string) => {
    if (rawEmail) return rawEmail;
    const u = usuarios.find((x) => x.id === uid || x.uid === uid);
    return u?.email || "—";
  };

  const esFinal = (r: any) =>
    Boolean(
      r.esExamenFinal === true ||
      r.tipo === "examen_final" ||
      (r.moduloNombre || "").toLowerCase().includes("examen final") ||
      (r.moduloNombre || "").toLowerCase().includes("evaluación final") ||
      (r.moduloNombre || "").toLowerCase().includes("evaluacion final")
    );

  const listaFiltrada = resultados.filter((r) => {
    const isExFinal = esFinal(r);
    if (filtroTipo === "quizzes" && isExFinal) return false;
    if (filtroTipo === "finales" && !isExFinal) return false;

    if (filtroCurso !== "todos") {
      if (r.courseSlug && r.courseSlug !== filtroCurso) return false;
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase().trim();
      const nom = nombreDe(r.userId).toLowerCase();
      const rut = rutDe(r.userId, r.userRut).toLowerCase();
      const email = emailDe(r.userId, r.userEmail).toLowerCase();
      const mod = (r.moduloNombre || "").toLowerCase();
      const curso = (r.courseSlug ? cursoNombreDe(r.courseSlug) : "").toLowerCase();
      if (!nom.includes(q) && !rut.includes(q) && !email.includes(q) && !mod.includes(q) && !curso.includes(q)) return false;
    }

    return true;
  });

  const exportarCsv = (tipoExportar: "todos" | "quizzes" | "finales") => {
    const itemsAExportar = resultados.filter((r) => {
      const isExFinal = esFinal(r);
      if (tipoExportar === "quizzes" && isExFinal) return false;
      if (tipoExportar === "finales" && !isExFinal) return false;
      if (filtroCurso !== "todos" && r.courseSlug && r.courseSlug !== filtroCurso) return false;
      return true;
    });

    const filas = [
      [
        "Fecha y Hora",
        "Alumno",
        "RUT",
        "Email",
        "Asignatura/Curso",
        "Tipo Evaluación",
        "Módulo/Evaluación",
        "Correctas",
        "Total Preguntas",
        "Porcentaje (%)",
        "Estado",
      ],
      ...itemsAExportar.map((r) => [
        r.fecha?.toDate
          ? r.fecha.toDate().toLocaleString("es-CL")
          : typeof r.fecha === "string"
          ? new Date(r.fecha).toLocaleString("es-CL")
          : "—",
        nombreDe(r.userId),
        rutDe(r.userId, r.userRut),
        emailDe(r.userId, r.userEmail),
        r.courseSlug ? cursoNombreDe(r.courseSlug) : "General",
        esFinal(r) ? "Examen Final Oficial" : "Mini-Quiz de Módulo",
        r.moduloNombre || r.evaluacion || "—",
        String(r.correctas ?? ""),
        String(r.total ?? ""),
        `${r.porcentaje ?? ""}%`,
        r.aprobado ? "APROBADO" : "REPROBADO",
      ]),
    ];

    const csv =
      "\uFEFF" +
      filas
        .map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
        .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const prefijo =
      tipoExportar === "quizzes"
        ? "reporte-mini-quizzes"
        : tipoExportar === "finales"
        ? "reporte-examenes-finales"
        : "reporte-completo-calificaciones";
    a.download = `${prefijo}-aprecap-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalEvals = resultados.length;
  const totalQuizzes = resultados.filter((r) => !esFinal(r)).length;
  const totalFinales = resultados.filter((r) => esFinal(r)).length;
  const promedioGeneral =
    totalEvals > 0 ? Math.round(resultados.reduce((a, b) => a + (b.porcentaje || 0), 0) / totalEvals) : 0;

  return (
    <div className="space-y-6">
      {/* Banner Principal con Botones de Descarga Excel estilo SARMAT */}
      <div className="rounded-2xl border border-indigo-200 bg-linear-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-300 border border-cyan-400/30">
              <span>📊</span> Sistema de Calificaciones SARMAT
            </div>
            <h2 className="text-xl font-extrabold text-white mt-2">
              Reportes de Notas, Mini-Quizzes y Exámenes Finales
            </h2>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Exporta planillas oficiales en Excel con desglose por módulo, preguntas acertadas y porcentajes de aprobación de todos los alumnos.
            </p>
          </div>

          {/* Grupo de 3 Botones de Descarga Excel estilo SARMAT */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportarCsv("todos")}
              disabled={resultados.length === 0}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-4 py-2.5 text-xs shadow-md transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>📥</span>
              <span>Descargar Todo (Excel)</span>
            </button>
            <button
              onClick={() => exportarCsv("quizzes")}
              disabled={totalQuizzes === 0}
              className="rounded-xl bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 border border-purple-400/40 font-bold px-3.5 py-2.5 text-xs transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>📝</span>
              <span>Solo Mini-Quizzes</span>
            </button>
            <button
              onClick={() => exportarCsv("finales")}
              disabled={totalFinales === 0}
              className="rounded-xl bg-cyan-500/30 hover:bg-cyan-500/50 text-cyan-200 border border-cyan-400/40 font-bold px-3.5 py-2.5 text-xs transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>🎓</span>
              <span>Solo Exámenes Finales</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/10">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Total Evaluaciones</span>
            <span className="text-xl font-black text-white">{totalEvals}</span>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/10">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">Mini-Quizzes Rendidos</span>
            <span className="text-xl font-black text-purple-300">{totalQuizzes}</span>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/10">
            <span className="text-cyan-300 font-bold block text-[10px] uppercase">Exámenes Finales</span>
            <span className="text-xl font-black text-cyan-300">{totalFinales}</span>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/10">
            <span className="text-emerald-300 font-bold block text-[10px] uppercase">Promedio General</span>
            <span className="text-xl font-black text-emerald-300">{promedioGeneral}%</span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Filtro por Tipo */}
          <div className="flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              onClick={() => setFiltroTipo("todos")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                filtroTipo === "todos" ? "bg-apre-blue text-white shadow-xs" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todos ({resultados.length})
            </button>
            <button
              onClick={() => setFiltroTipo("quizzes")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                filtroTipo === "quizzes" ? "bg-purple-700 text-white shadow-xs" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              📝 Mini-Quizzes ({totalQuizzes})
            </button>
            <button
              onClick={() => setFiltroTipo("finales")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                filtroTipo === "finales" ? "bg-cyan-700 text-white shadow-xs" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              🎓 Exámenes Finales ({totalFinales})
            </button>
          </div>

          {/* Selector de Curso */}
          <select
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 focus:border-apre-blue focus:outline-hidden"
          >
            <option value="todos">Todos los Cursos</option>
            {CURSOS_LISTA.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icono} {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Buscador */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar por alumno, RUT o módulo…"
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-apre-blue focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tabla de Resultados */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-600">
              <th className="px-4 py-3.5">Fecha y Hora</th>
              <th className="px-4 py-3.5">Alumno</th>
              <th className="px-4 py-3.5">RUT</th>
              <th className="px-4 py-3.5">Tipo</th>
              <th className="px-4 py-3.5">Módulo / Evaluación</th>
              <th className="px-4 py-3.5">Correctas</th>
              <th className="px-4 py-3.5">%</th>
              <th className="px-4 py-3.5">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listaFiltrada.map((r) => {
              const isExFinal = esFinal(r);
              return (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="whitespace-nowrap px-4 py-3.5 text-gray-500 text-[11px]">
                    {r.fecha?.toDate
                      ? r.fecha.toDate().toLocaleString("es-CL", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : typeof r.fecha === "string"
                      ? new Date(r.fecha).toLocaleString("es-CL")
                      : "—"}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-apre-blue">{nombreDe(r.userId)}</p>
                    <p className="text-[10px] text-gray-400">{emailDe(r.userId, r.userEmail)}</p>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-gray-700 text-[11px]">
                    {rutDe(r.userId, r.userRut)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        isExFinal
                          ? "bg-cyan-100 text-cyan-800 border border-cyan-200"
                          : "bg-purple-100 text-purple-800 border border-purple-200"
                      }`}
                    >
                      <span>{isExFinal ? "🎓" : "📝"}</span>
                      <span>{isExFinal ? "Examen Final" : "Mini-Quiz"}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800">
                    {r.moduloNombre || r.evaluacion || "—"}
                    {r.courseSlug && (
                      <span className="block text-[10px] text-gray-400 font-normal">
                        {cursoNombreDe(r.courseSlug)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 font-medium">
                    {r.correctas ?? "—"} / {r.total ?? "—"}
                  </td>
                  <td className="px-4 py-3.5 font-black text-sm text-slate-800">{r.porcentaje ?? "—"}%</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        r.aprobado
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {r.aprobado ? "✓ Aprobado" : "✕ Reprobado"}
                    </span>
                  </td>
                </tr>
              );
            })}
            {listaFiltrada.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                  Sin resultados registrados para los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Reuniones Zoom API ---------- */
function ReunionesTab() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [form, setForm] = useState({ topic: "", start_time: "", duration: "60" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const cargar = useCallback(() => {
    fetch("/api/zoom", { method: "GET" })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) setMeetings(data.meetings ?? []);
        else setMsg(data.error || "Error al listar reuniones");
      })
      .catch(() => setMsg("Zoom no configurado aún (falta la app Server-to-Server)."));
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const crear = async () => {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/zoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(`Reunión creada: ${data.join_url}`);
        setForm({ topic: "", start_time: "", duration: "60" });
        cargar();
      } else {
        setMsg(data.error || "Error al crear reunión");
      }
    } catch {
      setMsg("Zoom no configurado aún (falta la app Server-to-Server).");
    } finally {
      setBusy(false);
    }
  };

  const eliminarReunionZoom = async (meetingId: number | string) => {
    if (!confirm("¿Deseas eliminar esta reunión?")) return;
    try {
      const res = await fetch(`/api/zoom?id=${meetingId}`, { method: "DELETE" });
      const d = await res.json();
      if (res.ok && d.ok) {
        setMeetings((prev) => prev.filter((m) => String(m.id) !== String(meetingId)));
        setMsg("Reunión eliminada correctamente de tu cuenta de Zoom.");
        setTimeout(() => cargar(), 500);
      } else {
        const errorMsg = d.error || "No se pudo eliminar la reunión de Zoom";
        if (confirm(`${errorMsg}\n\n¿Deseas quitarla de esta lista en pantalla de todos modos?`)) {
          setMeetings((prev) => prev.filter((m) => String(m.id) !== String(meetingId)));
        }
      }
    } catch {
      alert("Error al conectar con la API de Zoom");
    }
  };

  const forzarCierreZoom = async (meetingId: number | string) => {
    if (!confirm("¿Seguro que deseas forzar el cierre de esta sala? Esto expulsará a todos y cortará la grabación.")) return;
    try {
      const res = await fetch("/api/zoom/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: meetingId }),
      });
      const d = await res.json();
      if (res.ok && d.ok) {
        alert("Sala cerrada a la fuerza con éxito.");
      } else {
        alert(d.error || "Error al cerrar la sala");
      }
    } catch {
      alert("Error de conexión al apagar la sala");
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner explicativo */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-xs text-blue-950">
        <p className="font-bold flex items-center gap-2">
          <span>ℹ️</span> ¿Qué es esta sección?
        </p>
        <p className="mt-1 text-slate-600 leading-relaxed">
          Esta pestaña consulta directamente tus salas agendadas en la nube de <strong>zoom.us</strong>. Las salas que cierras en <em>&quot;Clases en Vivo (Admin)&quot;</em> se apagan inmediatamente para los alumnos (contador en 0), pero su registro en tu calendario de Zoom permanece guardado aquí a menos que decidas <strong>Eliminarla de Zoom</strong>.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-extrabold text-apre-blue">Crear reunión Zoom (API)</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            placeholder="Tema de la reunión (ej. Clase Módulo 1)"
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-xs sm:col-span-2"
          />
          <input
            type="datetime-local"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-xs"
          />
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="Duración (min)"
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-xs"
          />
        </div>
        <button
          onClick={crear}
          disabled={busy}
          className="mt-4 rounded-xl bg-apre-red px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50"
        >
          {busy ? "Creando…" : "Crear reunión"}
        </button>
        {msg && <p className="mt-3 text-xs text-gray-600">{msg}</p>}
      </div>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <p className="font-extrabold text-apre-blue text-sm">{m.topic}</p>
              <p className="text-xs text-gray-600 mt-0.5">
                {m.start_time ? new Date(m.start_time).toLocaleString("es-CL") : "Sin fecha"} ·{" "}
                {m.duration} min
              </p>
              <p className="text-[11px] font-mono text-gray-400 mt-1">ID Zoom: {m.id}</p>
            </div>
            <div className="flex items-center gap-2">
              {m.join_url && (
                <a
                  href={m.join_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-whatsapp px-4 py-2 text-xs font-bold text-white shadow-xs hover:brightness-105"
                >
                  Unirse
                </a>
              )}
              <button
                onClick={() => forzarCierreZoom(m.id)}
                className="rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-700 px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5"
                title="Cierra la sala y detiene la grabación"
              >
                <span>🛑</span> Forzar Cierre
              </button>
              <button
                onClick={() => eliminarReunionZoom(m.id)}
                className="rounded-xl bg-red-50 hover:bg-red-100 text-apre-red px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5"
                title="Eliminar permanentemente de la cuenta de Zoom"
              >
                <span>🗑</span> Eliminar
              </button>
            </div>
          </div>
        ))}
        {meetings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center">
            <p className="text-gray-500 text-xs">No hay reuniones agendadas en tu cuenta de Zoom.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Grabaciones Zoom en la Nube (Descargas directas MP4) ---------- */
function ZoomGrabacionesTab({
  onPublicar,
}: {
  onPublicar?: (datos: { titulo: string; fecha: string }) => void;
}) {
  const [recordings, setRecordings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/zoom/recordings", { method: "GET" });
      const data = await res.json();
      if (res.ok) {
        setRecordings(data.meetings || []);
      } else {
        setError(data.error || "No se pudieron obtener las grabaciones de Zoom.");
      }
    } catch {
      setError("Error al conectar con la API de grabaciones de Zoom.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const eliminarGrabacion = async (meetingId: number | string) => {
    if (
      !confirm(
        "¿Deseas enviar esta grabación a la papelera de Zoom para liberar espacio en tu cuenta?\n\n⚠️ Asegúrate de haber descargado el archivo .MP4 y haberlo respaldado antes de continuar."
      )
    ) {
      return;
    }

    setDeletingId(meetingId);
    try {
      const res = await fetch(`/api/zoom/recordings?id=${meetingId}&action=trash`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setRecordings((prev) => prev.filter((m) => String(m.id) !== String(meetingId)));
        alert("✅ Grabación enviada a la papelera de Zoom para liberar espacio.");
      } else {
        alert(data.error || "No se pudo eliminar la grabación de Zoom.");
      }
    } catch {
      alert("Error de red al intentar eliminar la grabación.");
    } finally {
      setDeletingId(null);
    }
  };

  const copiarDatos = (topic: string, fechaStr: string) => {
    const texto = `${topic} - ${fechaStr}`;
    navigator.clipboard.writeText(texto);
    alert(`Copiado al portapapeles: "${texto}"`);
  };

  return (
    <div className="space-y-6">
      {/* Banner Explicativo del Flujo */}
      <div className="rounded-2xl border border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50/50 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
              <span>☁️</span> Grabaciones en la Nube de Zoom
            </div>
            <h2 className="text-xl font-extrabold text-apre-blue mt-2">
              Descarga de Videos Originales (.MP4)
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Todas las clases en vivo se auto-graban en la nube de Zoom. Descarga el video original en alta definición con un clic, súbelo a tu canal de YouTube en modo <strong>Oculto (Unlisted)</strong> y luego puedes eliminarlo de Zoom para mantener tu espacio 100% libre.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={cargar}
              disabled={loading}
              className="rounded-xl bg-white border border-gray-300 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-xs transition inline-flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span>{loading ? "Consultando…" : "Actualizar"}</span>
            </button>
          </div>
        </div>

        {/* Pasos rápidos */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-blue-100">
          <div className="rounded-xl bg-white/80 p-3 text-xs border border-blue-100">
            <p className="font-bold text-apre-blue flex items-center gap-1.5">
              <span>1️⃣</span> Descargar MP4
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Haz clic en <strong>📥 Descargar Video</strong> para guardar el archivo en tu equipo.
            </p>
          </div>
          <div className="rounded-xl bg-white/80 p-3 text-xs border border-blue-100">
            <p className="font-bold text-apre-blue flex items-center gap-1.5">
              <span>2️⃣</span> Subir a YouTube (Oculto)
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Sube el video a tu canal en modo <em>No listado / Oculto</em> para streaming ilimitado.
            </p>
          </div>
          <div className="rounded-xl bg-white/80 p-3 text-xs border border-blue-100">
            <p className="font-bold text-apre-blue flex items-center gap-1.5">
              <span>3️⃣</span> Publicar en APRECAP
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Pega el enlace en la pestaña <strong>Clases Grabadas</strong> asignando el curso y temporizador.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          <p className="font-bold flex items-center gap-2">
            <span>⚠️</span> Error al consultar Zoom
          </p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xs">
          <div className="inline-block animate-spin text-3xl mb-3">⏳</div>
          <p className="text-xs font-bold text-gray-600">Consultando grabaciones en la nube de Zoom…</p>
        </div>
      )}

      {!loading && recordings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
          <div className="text-4xl mb-2">📹</div>
          <h3 className="text-sm font-bold text-apre-blue">No hay grabaciones en la nube de Zoom</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
            Cuando inicies y finalices una clase en vivo, Zoom procesará la grabación y aparecerá aquí automáticamente para que descargues el archivo MP4.
          </p>
          <button
            onClick={cargar}
            className="mt-4 rounded-xl bg-apre-blue/10 px-4 py-2 text-xs font-bold text-apre-blue hover:bg-apre-blue/20 transition"
          >
            🔄 Volver a consultar
          </button>
        </div>
      )}

      {/* Lista de Grabaciones */}
      {!loading && recordings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-600">
              Total: {recordings.length} {recordings.length === 1 ? "reunión grabada" : "reuniones grabadas"}
            </p>
          </div>

          <div className="grid gap-4">
            {recordings.map((m) => {
              const mp4Files = (m.recording_files || []).filter(
                (f: any) => (f.file_type || "").toUpperCase() === "MP4" || (f.file_extension || "").toUpperCase() === "MP4"
              );
              const otrosArchivos = (m.recording_files || []).filter(
                (f: any) => !mp4Files.includes(f)
              );

              const totalMB = m.total_size ? (m.total_size / (1024 * 1024)).toFixed(1) : "0";
              const fechaStr = m.start_time
                ? new Date(m.start_time).toLocaleDateString("es-CL", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Sin fecha";

              return (
                <div
                  key={m.id || m.uuid}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-gray-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-800 uppercase">
                          ZOOM CLOUD
                        </span>
                        <h3 className="font-extrabold text-apre-blue text-base">{m.topic || "Clase sin título"}</h3>
                      </div>
                      <p className="text-xs text-gray-600">
                        📅 <strong>{fechaStr}</strong> · ⏱ <strong>{m.duration || 0} minutos</strong> · 💾 <strong>{totalMB} MB</strong>
                      </p>
                      <p className="text-[11px] font-mono text-gray-400">ID Reunión: {m.id}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {onPublicar && (
                        <button
                          onClick={() =>
                            onPublicar({
                              titulo: m.topic || "",
                              fecha: m.start_time ? m.start_time.slice(0, 10) : "",
                            })
                          }
                          className="rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-2 text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                          title="Llevar título y fecha a la pestaña de Publicar Clase Grabada"
                        >
                          <span>🚀</span>
                          <span>Publicar en APRECAP</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (m.share_url) {
                            let textoCopiar = `Enlace de grabación: ${m.share_url}`;
                            if (m.recording_play_passcode) {
                              textoCopiar += `\nCódigo de acceso: ${m.recording_play_passcode}`;
                            }
                            navigator.clipboard.writeText(textoCopiar);
                            alert("Copiado al portapapeles:\n\n" + textoCopiar);
                          } else {
                            alert("Esta grabación no tiene enlace para compartir disponible de parte de Zoom.");
                          }
                        }}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition flex items-center gap-1 ${
                          m.share_url 
                            ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700" 
                            : "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
                        }`}
                        title="Copiar enlace de Zoom para compartir con alumnos"
                      >
                        <span>🔗</span>
                        <span>Copiar Link Zoom</span>
                      </button>

                      <button
                        onClick={() => copiarDatos(m.topic || "Clase", fechaStr)}
                        className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold transition flex items-center gap-1"
                        title="Copiar nombre y fecha"
                      >
                        <span>📋</span>
                        <span>Copiar Nombre</span>
                      </button>

                      <button
                        onClick={() => eliminarGrabacion(m.id)}
                        disabled={deletingId === m.id}
                        className="rounded-xl bg-red-50 hover:bg-red-100 text-apre-red px-3 py-2 text-xs font-bold transition flex items-center gap-1 disabled:opacity-50"
                        title="Eliminar de Zoom para liberar espacio"
                      >
                        <span>🗑</span>
                        <span>{deletingId === m.id ? "Eliminando…" : "Borrar de Zoom"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Archivos descargables */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    {mp4Files.map((f: any, idx: number) => {
                      const sizeMB = f.file_size ? (f.file_size / (1024 * 1024)).toFixed(1) : "";
                      const urlDescarga = f.download_url_auth || f.download_url;
                      return (
                        <a
                          key={f.id || idx}
                          href={urlDescarga}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-whatsapp hover:brightness-105 text-white px-4 py-2 text-xs font-black shadow-xs transition inline-flex items-center gap-2"
                        >
                          <span>📥</span>
                          <span>Descargar Video MP4 {sizeMB ? `(${sizeMB} MB)` : ""}</span>
                        </a>
                      );
                    })}

                    {otrosArchivos.map((f: any, idx: number) => {
                      const urlDescarga = f.download_url_auth || f.download_url;
                      return (
                        <a
                          key={f.id || idx}
                          href={urlDescarga}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 text-xs font-semibold transition inline-flex items-center gap-1.5"
                        >
                          <span>📄</span>
                          <span>
                            {f.file_type || "Archivo"} ({f.file_extension || "DAT"})
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Clases Grabadas y Repeticiones (YouTube ➡️ APRECAP) ---------- */
function ClasesGrabadasTab({
  preselect,
}: {
  preselect?: { titulo?: string; fecha?: string } | null;
}) {
  const db = getFirestoreDb();
  const { userData } = useAuth();
  const [clases, setClases] = useState<any[]>([]);
  const [filtroCurso, setFiltroCurso] = useState<string>("todos");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    titulo: preselect?.titulo || "",
    descripcion: "",
    cursoSlug: "guardia-de-seguridad",
    youtubeUrl: "",
    fechaClaseDictada: preselect?.fecha || new Date().toISOString().slice(0, 10),
    tipoInicio: "inmediato" as "inmediato" | "programado",
    disponibleDesde: "",
    tipoFin: "permanente" as "permanente" | "limite",
    disponibleHasta: "",
  });

  useEffect(() => {
    if (preselect) {
      if (preselect.titulo) setForm((p) => ({ ...p, titulo: preselect.titulo || "" }));
      if (preselect.fecha) setForm((p) => ({ ...p, fechaClaseDictada: preselect.fecha || "" }));
    }
  }, [preselect]);

  // Sync snapshot con Firestore
  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "clases_grabadas"), orderBy("fechaCreacion", "desc"));
    return onSnapshot(q, (snap) => {
      setClases(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [db]);

  const videoIdDetectado = extractYouTubeVideoId(form.youtubeUrl);

  const guardarClase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    if (!form.titulo.trim()) {
      alert("Por favor ingresa un título o tema para la clase.");
      return;
    }
    if (!videoIdDetectado) {
      alert("Por favor ingresa un enlace válido de YouTube (ej. https://youtu.be/... o https://www.youtube.com/watch?v=...)");
      return;
    }

    setGuardando(true);
    try {
      const docData: any = {
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        cursoSlug: form.cursoSlug,
        youtubeUrl: form.youtubeUrl.trim(),
        youtubeVideoId: videoIdDetectado,
        fechaClaseDictada: form.fechaClaseDictada,
        disponibleDesde: form.tipoInicio === "programado" && form.disponibleDesde ? form.disponibleDesde : null,
        disponibleHasta: form.tipoFin === "limite" && form.disponibleHasta ? form.disponibleHasta : null,
        actualizadoEn: serverTimestamp(),
      };

      if (editandoId) {
        await updateDoc(doc(db, "clases_grabadas", editandoId), docData);
        alert("✅ Clase grabada actualizada correctamente.");
        setEditandoId(null);
      } else {
        docData.activa = true;
        docData.creadoPor = userData?.email || "";
        docData.fechaCreacion = serverTimestamp();
        await addDoc(collection(db, "clases_grabadas"), docData);
        alert("✅ ¡Clase grabada publicada exitosamente!");
      }

      setForm({
        titulo: "",
        descripcion: "",
        cursoSlug: "guardia-de-seguridad",
        youtubeUrl: "",
        fechaClaseDictada: new Date().toISOString().slice(0, 10),
        tipoInicio: "inmediato",
        disponibleDesde: "",
        tipoFin: "permanente",
        disponibleHasta: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al guardar la clase grabada.");
    } finally {
      setGuardando(false);
    }
  };

  const cargarParaEditar = (c: any) => {
    setEditandoId(c.id);
    setForm({
      titulo: c.titulo || "",
      descripcion: c.descripcion || "",
      cursoSlug: c.cursoSlug || "guardia-de-seguridad",
      youtubeUrl: c.youtubeUrl || `https://youtu.be/${c.youtubeVideoId}`,
      fechaClaseDictada: c.fechaClaseDictada || new Date().toISOString().slice(0, 10),
      tipoInicio: c.disponibleDesde ? "programado" : "inmediato",
      disponibleDesde: c.disponibleDesde || "",
      tipoFin: c.disponibleHasta ? "limite" : "permanente",
      disponibleHasta: c.disponibleHasta || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({
      titulo: "",
      descripcion: "",
      cursoSlug: "guardia-de-seguridad",
      youtubeUrl: "",
      fechaClaseDictada: new Date().toISOString().slice(0, 10),
      tipoInicio: "inmediato",
      disponibleDesde: "",
      tipoFin: "permanente",
      disponibleHasta: "",
    });
  };

  const toggleActiva = async (c: any) => {
    if (!db) return;
    await updateDoc(doc(db, "clases_grabadas", c.id), {
      activa: !c.activa,
    });
  };

  const eliminarClase = async (c: any) => {
    if (!db) return;
    if (!confirm(`¿Eliminar permanentemente la clase grabada "${c.titulo}"?`)) return;
    await deleteDoc(doc(db, "clases_grabadas", c.id));
  };

  const clasesFiltradas = clases.filter((c) => {
    if (filtroCurso === "todos") return true;
    return c.cursoSlug === filtroCurso;
  });

  const obtenerEstadoTemporizador = (c: any) => {
    if (!c.activa) {
      return { estado: "pausada", label: "Pausada / Oculta", badgeBg: "bg-gray-100 text-gray-700 border-gray-300" };
    }
    const ahora = new Date().toISOString();
    if (c.disponibleDesde && c.disponibleDesde > ahora) {
      return {
        estado: "programada",
        label: `Programada (Desde: ${new Date(c.disponibleDesde).toLocaleString("es-CL")})`,
        badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
      };
    }
    if (c.disponibleHasta && c.disponibleHasta < ahora) {
      return {
        estado: "expirada",
        label: `Expirada (Venció: ${new Date(c.disponibleHasta).toLocaleString("es-CL")})`,
        badgeBg: "bg-red-100 text-red-900 border-red-300",
      };
    }
    if (c.disponibleHasta) {
      const diffMs = new Date(c.disponibleHasta).getTime() - new Date().getTime();
      const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return {
        estado: "activa_limite",
        label: `Visible (Expira en ${diffDias} ${diffDias === 1 ? "día" : "días"})`,
        badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300 font-bold",
      };
    }
    return {
      estado: "activa",
      label: "Visible (Permanente)",
      badgeBg: "bg-green-100 text-green-900 border-green-300 font-bold",
    };
  };

  return (
    <div className="space-y-6">
      {/* Formulario de Creación / Edición */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-red">
            <span>📹</span> {editandoId ? "Modo Edición" : "Publicar Nueva Grabación"}
          </div>
          {editandoId && (
            <button
              onClick={cancelarEdicion}
              className="text-xs font-bold text-gray-500 hover:text-gray-700 underline"
            >
              ✕ Cancelar edición
            </button>
          )}
        </div>

        <h2 className="text-xl font-extrabold text-apre-blue mt-2">
          {editandoId ? "Editar Clase Grabada" : "Publicar Clase Grabada (YouTube)"}
        </h2>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed">
          Pega el enlace de YouTube del video que subiste en modo <strong>Oculto (Unlisted)</strong>. La clase únicamente será visible para los alumnos matriculados en el curso asignado y respetará los temporizadores de disponibilidad configurados.
        </p>

        <form onSubmit={guardarClase} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Título */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-apre-blue">
                Título o Tema de la Clase *
              </label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                placeholder="Ej. Módulo 1: Legislación de Seguridad Privada y Ley 21.659"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm"
                required
              />
            </div>

            {/* Curso Asociado */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-apre-blue">
                Curso Asociado (Control de Acceso) *
              </label>
              <select
                value={form.cursoSlug}
                onChange={(e) => setForm({ ...form, cursoSlug: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white font-medium"
              >
                {CURSOS_LISTA.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.icono} {c.nombre}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-gray-500">
                🔒 Solo los alumnos matriculados en este curso podrán verla.
              </p>
            </div>

            {/* Fecha en que se dictó */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-apre-blue">
                Fecha de Dictado de la Clase
              </label>
              <input
                type="date"
                value={form.fechaClaseDictada}
                onChange={(e) => setForm({ ...form, fechaClaseDictada: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm"
              />
            </div>

            {/* Enlace de YouTube */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-apre-blue">
                Enlace de YouTube (Video en modo Oculto) *
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  placeholder="https://youtu.be/... o https://www.youtube.com/watch?v=..."
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-mono"
                  required
                />
              </div>

              {/* Detección y preview en tiempo real */}
              {videoIdDetectado && (
                <div className="mt-2 flex items-center gap-3 rounded-xl bg-emerald-50 p-2.5 border border-emerald-200">
                  <img
                    src={getYouTubeThumbnailUrl(videoIdDetectado)}
                    alt="Miniatura"
                    className="h-12 w-20 rounded-lg object-cover shadow-xs border border-emerald-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-900">
                      ✅ Video de YouTube detectado correctamente
                    </p>
                    <p className="text-[11px] font-mono text-emerald-700">ID: {videoIdDetectado}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewVideoId(videoIdDetectado)}
                    className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold shadow-xs transition"
                  >
                    ▶ Probar Reproducción
                  </button>
                </div>
              )}
            </div>

            {/* Temporizadores de Disponibilidad */}
            <div className="sm:col-span-2 rounded-xl bg-gray-50 p-4 border border-gray-200 space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-apre-blue flex items-center gap-1.5">
                <span>⏳</span> Temporizadores de Disponibilidad (Drip & Vigencia)
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Disponibilidad Inicial */}
                <div>
                  <label className="text-xs font-bold text-gray-700">1. ¿Cuándo se publica para los alumnos?</label>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tipoInicio: "inmediato", disponibleDesde: "" })}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold border transition ${
                        form.tipoInicio === "inmediato"
                          ? "bg-apre-blue text-white border-apre-blue"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      Inmediata
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tipoInicio: "programado" })}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold border transition ${
                        form.tipoInicio === "programado"
                          ? "bg-apre-blue text-white border-apre-blue"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      Programar fecha
                    </button>
                  </div>

                  {form.tipoInicio === "programado" && (
                    <input
                      type="datetime-local"
                      value={form.disponibleDesde}
                      onChange={(e) => setForm({ ...form, disponibleDesde: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs"
                      required
                    />
                  )}
                </div>

                {/* Fecha Límite */}
                <div>
                  <label className="text-xs font-bold text-gray-700">2. ¿Hasta cuándo estará disponible?</label>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tipoFin: "permanente", disponibleHasta: "" })}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold border transition ${
                        form.tipoFin === "permanente"
                          ? "bg-apre-blue text-white border-apre-blue"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      Permanente
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tipoFin: "limite" })}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold border transition ${
                        form.tipoFin === "limite"
                          ? "bg-apre-blue text-white border-apre-blue"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      Expira con fecha
                    </button>
                  </div>

                  {form.tipoFin === "limite" && (
                    <input
                      type="datetime-local"
                      value={form.disponibleHasta}
                      onChange={(e) => setForm({ ...form, disponibleHasta: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs"
                      required
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-apre-blue">
                Descripción / Notas de la Clase (Opcional)
              </label>
              <textarea
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                rows={2}
                placeholder="Resumen de los temas tratados, artículos de ley vistos, o indicaciones para el alumno…"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={guardando}
              className="rounded-xl bg-apre-red hover:bg-apre-red-dark text-white px-6 py-2.5 text-sm font-black shadow-sm transition disabled:opacity-50 inline-flex items-center gap-2"
            >
              <span>{editandoId ? "💾 Actualizar Clase" : "🚀 Publicar Clase Grabada"}</span>
            </button>

            {editandoId && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 text-xs font-bold transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filtros por Curso */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-gray-600 mr-1">Filtrar por curso:</span>
        <button
          onClick={() => setFiltroCurso("todos")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition border ${
            filtroCurso === "todos"
              ? "bg-apre-blue text-white border-apre-blue shadow-xs"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Todos ({clases.length})
        </button>
        {CURSOS_LISTA.map((c) => {
          const count = clases.filter((x) => x.cursoSlug === c.slug).length;
          return (
            <button
              key={c.slug}
              onClick={() => setFiltroCurso(c.slug)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition border flex items-center gap-1 ${
                filtroCurso === c.slug
                  ? "bg-apre-blue text-white border-apre-blue shadow-xs"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{c.icono}</span>
              <span>{c.shortName}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Lista de Clases Grabadas */}
      <div className="space-y-4">
        {clasesFiltradas.map((c) => {
          const cursoInfo = CURSOS_LISTA.find((x) => x.slug === c.cursoSlug);
          const estadoInfo = obtenerEstadoTemporizador(c);

          return (
            <div
              key={c.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-gray-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail */}
                  <div className="relative shrink-0 w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-black/5 border border-gray-200">
                    <img
                      src={getYouTubeThumbnailUrl(c.youtubeVideoId)}
                      alt={c.titulo}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setPreviewVideoId(c.youtubeVideoId)}
                      className="absolute inset-0 bg-black/30 hover:bg-black/40 flex items-center justify-center text-white text-2xl transition"
                      title="Reproducir video"
                    >
                      ▶
                    </button>
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-apre-blue/10 px-2 py-0.5 text-[10px] font-black text-apre-blue uppercase">
                        {cursoInfo?.icono} {cursoInfo?.shortName || c.cursoSlug}
                      </span>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] border ${estadoInfo.badgeBg}`}>
                        {estadoInfo.label}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-apre-blue text-base leading-snug">{c.titulo}</h3>

                    {c.descripcion && (
                      <p className="text-xs text-gray-600 line-clamp-2">{c.descripcion}</p>
                    )}

                    <p className="text-[11px] text-gray-500">
                      📅 Fecha de clase: <strong>{c.fechaClaseDictada || "Sin fecha"}</strong> · 🔗{" "}
                      <a
                        href={c.youtubeUrl || `https://youtu.be/${c.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-apre-blue hover:underline font-mono"
                      >
                        YouTube Link
                      </a>
                    </p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewVideoId(c.youtubeVideoId)}
                    className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>👁️</span>
                    <span>Ver</span>
                  </button>

                  <button
                    onClick={() => toggleActiva(c)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                      c.activa
                        ? "bg-amber-50 hover:bg-amber-100 text-amber-800"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {c.activa ? "⏸ Pausar" : "▶ Activar"}
                  </button>

                  <button
                    onClick={() => cargarParaEditar(c)}
                    className="rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-2 text-xs font-bold transition"
                  >
                    ✎ Editar
                  </button>

                  <button
                    onClick={() => eliminarClase(c)}
                    className="rounded-xl bg-red-50 hover:bg-red-100 text-apre-red px-3 py-2 text-xs font-bold transition"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {clasesFiltradas.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500 text-xs">No hay clases grabadas publicadas para este filtro.</p>
          </div>
        )}
      </div>

      {/* Modal de Previsualización de Video */}
      {previewVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl rounded-2xl bg-black overflow-hidden shadow-2xl">
            <button
              onClick={() => setPreviewVideoId(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/60 hover:bg-black text-white w-8 h-8 flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={getYouTubeEmbedUrl(previewVideoId, true)}
                title="Reproductor YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Contacto ---------- */
function ContactoTab() {

  const db = getFirestoreDb();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(collection(db, "contact_submissions"), (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  if (items.length === 0) return <p className="text-gray-500">Sin mensajes de contacto.</p>;
  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div key={m.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <p className="font-extrabold text-apre-blue text-sm">{m.nombre || "Anónimo"}</p>
          <p className="text-xs text-gray-600">{m.email} · {m.telefono || "sin teléfono"}</p>
          {m.mensaje && <p className="mt-2 text-xs text-gray-700">{m.mensaje}</p>}
        </div>
      ))}
    </div>
  );
}

/* ---------- Pagos WebPay ---------- */
function PagosTab() {
  const db = getFirestoreDb();
  const [pagos, setPagos] = useState<any[]>([]);
  const [filtroCurso, setFiltroCurso] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "pagos"), orderBy("fechaCreacion", "desc"));
    return onSnapshot(q, (snap) =>
      setPagos(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  const filtrados = pagos.filter(
    (p) =>
      (!filtroCurso || p.cursoSlug === filtroCurso) &&
      (!filtroEstado || p.estado === filtroEstado)
  );
  const totalAprobado = filtrados
    .filter((p) => p.estado === "aprobado")
    .reduce((acc, p) => acc + (Number(p.monto) || 0), 0);
  const totalTodos = filtrados.reduce((acc, p) => acc + (Number(p.monto) || 0), 0);

  const exportarCsv = () => {
    const filas = [
      ["Fecha", "Orden", "Curso", "Email", "Nombre", "Monto", "Método", "Cuotas", "Monto cuota", "Estado", "Autorización", "Tarjeta"],
      ...filtrados.map((p) => [
        p.fechaCreacion?.toDate ? p.fechaCreacion.toDate().toISOString() : "",
        p.buyOrder || p.id || "",
        p.cursoNombre || p.cursoSlug || "",
        p.email || "",
        p.nombreUsuario || (p.uidUsuario || ""),
        String(p.monto ?? ""),
        p.metodo || "",
        String(p.cuotas ?? ""),
        String(p.montoCuota ?? ""),
        p.estado || "",
        p.authorizationCode || "",
        p.cardNumber || "",
      ]),
    ];
    const csv = "\uFEFF" + filas.map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pagos-aprecap-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filtroCurso}
            onChange={(e) => setFiltroCurso(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-xs"
          >
            <option value="">Todos los cursos</option>
            {[...new Set(pagos.map((p) => p.cursoSlug).filter(Boolean))].map((s) => (
              <option key={String(s)} value={String(s)}>
                {String(s)}
              </option>
            ))}
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-xs"
          >
            <option value="">Todos los estados</option>
            <option value="aprobado">Aprobados</option>
            <option value="rechazado">Rechazados</option>
            <option value="creado">Creados</option>
            <option value="error">Errores</option>
          </select>
        </div>
        <button
          onClick={exportarCsv}
          className="rounded-lg bg-apre-blue px-4 py-2 text-xs font-bold text-white hover:bg-apre-blue-light"
        >
          ⬇ Exportar a Excel (CSV)
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="rounded-2xl border border-gray-200 bg-whatsapp/10 px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Total aprobado (filtro)
          </p>
          <p className="text-2xl font-extrabold text-green-700">
            ${totalAprobado.toLocaleString("es-CL")}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Total (todos los estados)
          </p>
          <p className="text-2xl font-extrabold text-apre-blue">
            ${totalTodos.toLocaleString("es-CL")}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Curso</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-right">Monto</th>
              <th className="px-4 py-3">Método</th>
              <th className="px-4 py-3">Cuotas</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Orden</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                  {p.fechaCreacion?.toDate
                    ? p.fechaCreacion.toDate().toLocaleString("es-CL")
                    : String(p.fechaCreacion ?? "")}
                </td>
                <td className="px-4 py-3 font-semibold text-apre-blue">
                  {p.cursoNombre || p.cursoSlug}
                </td>
                <td className="px-4 py-3 text-gray-600">{p.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-bold">
                  ${Number(p.monto ?? 0).toLocaleString("es-CL")}
                </td>
                <td className="px-4 py-3 text-gray-600">{p.metodo ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">
                  {p.cuotas ? `${p.cuotas}${p.montoCuota ? ` · $${p.montoCuota.toLocaleString("es-CL")}` : ""}` : "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {p.estado === "aprobado" ? "✅ Aprobado" : p.estado === "rechazado" ? "❌ Rechazado" : p.estado}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[10px] text-gray-400">{p.buyOrder || p.id}</td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  Sin pagos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Auditoría ---------- */
function AuditoriaTab() {
  const db = getFirestoreDb();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "audit_logs"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  if (items.length === 0)
    return <p className="text-gray-500">Sin eventos registrados (solo lectura, escritura server-side).</p>;
  return (
    <div className="space-y-2">
      {items.map((l) => (
        <div key={l.id} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs">
          <span className="font-bold text-apre-blue">{l.accion}</span>
          <span className="text-gray-500"> · {l.email || l.uid || "sistema"} · </span>
          <span className="text-gray-400">
            {l.fecha?.toDate ? l.fecha.toDate().toLocaleString("es-CL") : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}
