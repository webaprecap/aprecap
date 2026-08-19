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

type Tab =
  | "pendientes"
  | "historial"
  | "cursos-gestion"
  | "alumnos"
  | "profesores"
  | "clases"
  | "reuniones"
  | "diplomas"
  | "reportes"
  | "pagos"
  | "contacto"
  | "auditoria";

const NAV_GROUPS: { section: string; items: { id: Tab; label: string; emoji: string }[] }[] = [
  {
    section: "Solicitudes",
    items: [
      { id: "pendientes", label: "Pendientes", emoji: "📋" },
      { id: "historial", label: "Historial", emoji: "📁" },
    ],
  },
  {
    section: "Cursos y Alumnos",
    items: [
      { id: "cursos-gestion", label: "Gestión por Cursos", emoji: "📚" },
      { id: "diplomas", label: "Diplomas de Aprobados", emoji: "🎓" },
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
    section: "Clases y Salas",
    items: [
      { id: "clases", label: "Clases en Vivo (Admin)", emoji: "📹" },
      { id: "reuniones", label: "Reuniones Zoom (API)", emoji: "🔁" },
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

  const pendientesCount = useCount("solicitudes", "estado", "pendiente");
  const alumnosCount = useCount("usuarios", "rol", "alumno");
  const profesoresCount = useCount("usuarios", "rol", "profesor");
  const clasesActivasCount = useCount("clases", "estado", "activa");

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
            {tab === "cursos-gestion" && <CursosGestionTab onEmitirDiploma={irADiplomaAprobado} />}
            {tab === "alumnos" && <UsuariosTab filtroRol="alumno" />}
            {tab === "profesores" && <UsuariosTab filtroRol="profesor" />}
            {tab === "clases" && <ClasesTab />}
            {tab === "reuniones" && <ReunionesTab />}
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

/* ---------- Solicitudes Pendientes ---------- */
function PendientesTab() {
  const db = getFirestoreDb();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "solicitudes"), where("estado", "==", "pendiente"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  const aprobar = async (s: any) => {
    if (!db) return;
    const uidTemp = s.email.replace(/[^a-z0-9@._-]/gi, "-").toLowerCase();
    const nombreCompleto = [s.nombres, s.apellidoPaterno, s.apellidoMaterno]
      .filter(Boolean)
      .join(" ")
      .trim();

    const cursoSlug = s.cursoDeseado || "guardia-de-seguridad";
    const fieldKey = getCourseFieldKey(cursoSlug);

    await setDoc(doc(db, "usuarios", uidTemp), {
      uid: uidTemp,
      email: s.email,
      nombre: nombreCompleto || s.nombres,
      rut: s.rut || "",
      rol: s.tipoSolicitud || "alumno",
      activo: true,
      telefono: s.telefono || "",
      solicitudId: s.id,
      cursoDeseado: cursoSlug,
      [fieldKey]: "aceptado",
      fechaRegistro: serverTimestamp(),
    });

    if (s.tipoSolicitud === "alumno" || !s.tipoSolicitud) {
      await setDoc(doc(collection(db, "enrollments"), `${uidTemp}_${cursoSlug}`), {
        uid: uidTemp,
        courseSlug: cursoSlug,
        modulosCompletados: [],
        fecha: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, "solicitudes", s.id), {
      estado: "aprobada",
      fechaRevision: serverTimestamp(),
    });
  };

  const rechazar = async (s: any) => {
    if (!db) return;
    await updateDoc(doc(db, "solicitudes", s.id), {
      estado: "rechazada",
      fechaRevision: serverTimestamp(),
    });
  };

  if (items.length === 0) {
    return <p className="text-gray-500">No hay solicitudes pendientes.</p>;
  }
  return (
    <div className="space-y-4">
      {items.map((s) => (
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
            {s.email} · {s.telefono}
          </p>
          {s.cursoDeseado && (
            <p className="mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 inline-block px-2.5 py-1 rounded-lg border border-emerald-200">
              Curso solicitado: {cursoNombreDe(s.cursoDeseado)}
            </p>
          )}
          {s.mensaje && <p className="mt-2 text-xs text-gray-500 italic">{s.mensaje}</p>}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => aprobar(s)}
              className="rounded-xl bg-whatsapp px-5 py-2.5 text-xs font-black text-white hover:brightness-105 shadow-sm"
            >
              ✓ Aprobar y Matricular
            </button>
            <button
              onClick={() => rechazar(s)}
              className="rounded-xl bg-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-300"
            >
              ✕ Rechazar
            </button>
          </div>
        </div>
      ))}
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

  // Alumnos que han aprobado el examen final de este curso
  const aprobadosEsteCurso = evaluaciones.filter((ev) => {
    if (!ev.aprobado) return false;
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

/* ---------- Usuarios y Matrículas (Alumnos / Profesores) ---------- */
function UsuariosTab({ filtroRol }: { filtroRol: "alumno" | "profesor" }) {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [selUid, setSelUid] = useState<string | null>(null);
  const [selCurso, setSelCurso] = useState("");
  const [editandoRutUid, setEditandoRutUid] = useState<string | null>(null);
  const [rutInput, setRutInput] = useState("");

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "usuarios"), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "enrollments"), (snap) =>
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  const lista = usuarios.filter((u) => u.rol === filtroRol);

  const toggleActivo = async (u: any) => {
    await updateDoc(doc(db!, "usuarios", u.id), { activo: !u.activo });
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

  if (lista.length === 0) {
    return <p className="text-gray-500">No hay {filtroRol === "profesor" ? "profesores" : "alumnos"} registrados.</p>;
  }

  return (
    <div className="space-y-4">
      {lista.map((u) => {
        const susEnrolls = enrolls.filter((e) => e.uid === u.id);
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

  // Lista de aprobados en este curso
  const aprobadosCurso = evaluaciones.filter((ev) => {
    if (!ev.aprobado) return false;
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

/* ---------- Clases en vivo (Control exclusivo del Admin) ---------- */
function ClasesTab() {
  const db = getFirestoreDb();
  const { userData } = useAuth();
  const [clases, setClases] = useState<any[]>([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    cursoSlug: "",
    joinUrl: "",
  });

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "clases"), orderBy("fechaCreacion", "desc"));
    return onSnapshot(q, (snap) =>
      setClases(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  const [editandoUrlId, setEditandoUrlId] = useState<string | null>(null);
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [zoomMeetings, setZoomMeetings] = useState<any[]>([]);
  const [creandoZoom, setCreandoZoom] = useState(false);
  const [zoomMsg, setZoomMsg] = useState("");

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

  const generarZoomAutomatico = async () => {
    if (!form.nombre.trim()) {
      alert("Por favor ingresa primero el nombre de la clase.");
      return;
    }
    setCreandoZoom(true);
    setZoomMsg("");
    try {
      const res = await fetch("/api/zoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: form.nombre.trim(),
          start_time: new Date().toISOString(),
          duration: "90",
        }),
      });
      const data = await res.json();
      if (res.ok && data.meeting?.join_url) {
        setForm((prev) => ({ ...prev, joinUrl: data.meeting.join_url }));
        setZoomMsg("✅ Sala Zoom creada exitosamente con contraseña embebida.");
      } else {
        setZoomMsg(data.error || "Zoom API no disponible. Puedes pegar el enlace de Zoom manualmente abajo.");
      }
    } catch {
      setZoomMsg("Zoom API no disponible en este entorno. Puedes pegar tu enlace de Zoom o Meet abajo.");
    } finally {
      setCreandoZoom(false);
    }
  };

  const crear = async () => {
    if (!db || !form.nombre.trim()) return;
    let url = form.joinUrl.trim();
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    await addDoc(collection(db, "clases"), {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      cursoSlug: form.cursoSlug,
      joinUrl: url,
      estado: "inactiva",
      fechaCreacion: serverTimestamp(),
      creadoPor: userData?.email || "",
    });
    setForm({ nombre: "", descripcion: "", cursoSlug: "", joinUrl: "" });
    setZoomMsg("");
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
    await updateDoc(doc(db!, "clases", c.id), {
      estado,
      ...(estado === "activa" ? { fechaInicio: serverTimestamp() } : {}),
    });
  };

  const eliminar = async (c: any) => {
    if (!confirm(`¿Eliminar la clase "${c.nombre}"?`)) return;
    await deleteDoc(doc(db!, "clases", c.id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-red">
          <span>📹</span> Control Exclusivo de Salas
        </div>
        <h2 className="text-xl font-extrabold text-apre-blue mt-2">Crear Clase en Vivo</h2>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed">
          Solo tú puedes abrir o cerrar la sala. Al hacer clic en <strong>Iniciar Clase (Abrir Sala)</strong>, únicamente los alumnos matriculados y autorizados en el curso seleccionado podrán ver el aviso y unirse a la transmisión.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre de la clase (ej. Módulo 1: Legislación de Seguridad)"
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm sm:col-span-2"
          />
          <input
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción u objetivos (opcional)"
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm sm:col-span-2"
          />
          <select
            value={form.cursoSlug}
            onChange={(e) => setForm({ ...form, cursoSlug: e.target.value })}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm"
          >
            <option value="">Todos los cursos (transmisión global)</option>
            {CURSOS_PLATAFORMA.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>

          <div className="space-y-1">
            <input
              value={form.joinUrl}
              onChange={(e) => setForm({ ...form, joinUrl: e.target.value })}
              placeholder="Enlace de la sala (ej. https://zoom.us/j/... o Meet)"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm"
            />
            {zoomMeetings.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) setForm((prev) => ({ ...prev, joinUrl: e.target.value }));
                }}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-700"
              >
                <option value="">O seleccionar de tus reuniones Zoom existentes…</option>
                {zoomMeetings.map((zm) => (
                  <option key={zm.id} value={zm.join_url}>
                    {zm.topic} ({new Date(zm.start_time).toLocaleDateString("es-CL")})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={crear}
            disabled={!form.nombre.trim()}
            className="rounded-xl bg-apre-red px-6 py-2.5 text-sm font-black text-white transition hover:bg-apre-red-dark disabled:opacity-50 shadow-sm"
          >
            Crear Clase
          </button>

          <button
            type="button"
            onClick={generarZoomAutomatico}
            disabled={creandoZoom || !form.nombre.trim()}
            className="rounded-xl bg-apre-blue px-4 py-2.5 text-xs font-bold text-white transition hover:bg-apre-blue-light disabled:opacity-50 shadow-xs flex items-center gap-1.5"
          >
            <span>⚡</span>
            <span>{creandoZoom ? "Generando con Zoom API…" : "Generar enlace Zoom Automático"}</span>
          </button>
        </div>

        {zoomMsg && <p className="mt-2 text-xs font-semibold text-apre-blue">{zoomMsg}</p>}
      </div>

      <div className="space-y-3">
        {clases.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-extrabold text-apre-blue text-base">{c.nombre}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                      c.estado === "activa"
                        ? "bg-whatsapp animate-pulse"
                        : c.estado === "finalizada"
                        ? "bg-gray-400"
                        : "bg-apre-blue"
                    }`}
                  >
                    {c.estado === "activa" ? "🔴 EN VIVO (SALA ABIERTA)" : c.estado === "finalizada" ? "Sala Cerrada" : "Inactiva"}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Curso: <strong>{c.cursoSlug ? cursoNombreDe(c.cursoSlug) : "Todos los cursos (Global)"}</strong>
                </p>
                {c.descripcion && <p className="mt-1 text-xs text-gray-500">{c.descripcion}</p>}
                
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
                        className="rounded-lg bg-gray-200 px-3 py-1.5 text-xs text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {c.joinUrl ? (
                        <a
                          href={c.joinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs font-bold text-apre-blue hover:underline font-mono"
                        >
                          🔗 {c.joinUrl}
                        </a>
                      ) : (
                        <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          ⚠️ Sin enlace de Zoom/Meet configurado
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setEditandoUrlId(c.id);
                          setNuevaUrl(c.joinUrl || "");
                        }}
                        className="text-[11px] font-bold text-apre-blue hover:underline"
                      >
                        ✎ {c.joinUrl ? "Cambiar enlace" : "+ Pegar enlace Zoom/Meet"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {c.estado === "activa" && (
                  <Link
                    href={`/aula-en-vivo?id=${c.id}`}
                    target="_blank"
                    className="rounded-xl bg-cyan-500 px-3.5 py-2 text-xs font-black text-slate-950 hover:bg-cyan-400 shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>🚀</span>
                    <span>Ver Aula Virtual</span>
                  </Link>
                )}
                {c.estado === "inactiva" && (
                  <button
                    onClick={() => cambiarEstado(c, "activa")}
                    className="rounded-xl bg-whatsapp px-4 py-2 text-xs font-black text-white hover:brightness-105 shadow-sm"
                  >
                    ▶ Iniciar Clase (Abrir Sala)
                  </button>
                )}
                {c.estado === "activa" && (
                  <button
                    onClick={() => cambiarEstado(c, "finalizada")}
                    className="rounded-xl bg-gray-800 px-4 py-2 text-xs font-black text-white hover:bg-gray-900 shadow-sm"
                  >
                    ■ Finalizar Clase (Cerrar Sala)
                  </button>
                )}
                {c.estado === "finalizada" && (
                  <button
                    onClick={() => cambiarEstado(c, "activa")}
                    className="rounded-xl bg-whatsapp px-4 py-2 text-xs font-black text-white hover:brightness-105 shadow-sm"
                  >
                    ▶ Reiniciar Sala
                  </button>
                )}
                <button
                  onClick={() => eliminar(c)}
                  className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-apre-red hover:bg-red-100"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {clases.length === 0 && (
          <p className="text-gray-500 text-xs">Sin clases registradas. Crea la primera arriba.</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Reportes: Notas y Evaluaciones ---------- */
function ReportesTab() {
  const db = getFirestoreDb();
  const [resultados, setResultados] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

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
    return u?.nombre ? `${u.nombre} (${u.email ?? ""})` : uid;
  };

  const exportarCsv = () => {
    const filas = [
      ["Fecha", "Alumno", "Módulo/Evaluación", "Correctas", "Total", "%", "Aprobado"],
      ...resultados.map((r) => [
        r.fecha?.toDate ? r.fecha.toDate().toISOString() : "",
        nombreDe(r.userId),
        r.moduloNombre || r.evaluacion || "",
        String(r.correctas ?? ""),
        String(r.total ?? ""),
        String(r.porcentaje ?? ""),
        r.aprobado ? "Sí" : "No",
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
    a.download = `notas-aprecap-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-gray-600">
          Historial de notas y porcentajes de las evaluaciones de los alumnos.
        </p>
        <button
          onClick={exportarCsv}
          disabled={resultados.length === 0}
          className="rounded-xl bg-apre-blue px-4 py-2 text-xs font-bold text-white hover:bg-apre-blue-light disabled:opacity-40"
        >
          ⬇ Descargar Notas y % (Excel)
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Alumno</th>
              <th className="px-4 py-3">Módulo/Evaluación</th>
              <th className="px-4 py-3">Correctas</th>
              <th className="px-4 py-3">%</th>
              <th className="px-4 py-3">Aprobado</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                  {r.fecha?.toDate ? r.fecha.toDate().toLocaleString("es-CL") : "—"}
                </td>
                <td className="px-4 py-3 text-gray-700">{nombreDe(r.userId)}</td>
                <td className="px-4 py-3 font-semibold text-apre-blue">
                  {r.moduloNombre || r.evaluacion || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {r.correctas ?? "—"} / {r.total ?? "—"}
                </td>
                <td className="px-4 py-3 font-bold">{r.porcentaje ?? "—"}%</td>
                <td className="px-4 py-3">
                  {r.aprobado ? (
                    <span className="text-green-600 font-bold">✅ Sí</span>
                  ) : (
                    <span className="text-apre-red font-bold">❌ No</span>
                  )}
                </td>
              </tr>
            ))}
            {resultados.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Sin resultados registrados.
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
                onClick={() => eliminarReunionZoom(m.id)}
                className="rounded-xl bg-red-50 hover:bg-red-100 text-apre-red px-3.5 py-2 text-xs font-bold transition"
                title="Eliminar permanentemente de la cuenta de Zoom"
              >
                🗑 Eliminar de Zoom
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
