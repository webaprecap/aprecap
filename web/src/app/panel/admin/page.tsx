/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

type Tab =
  | "pendientes"
  | "historial"
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
    section: "Usuarios",
    items: [
      { id: "alumnos", label: "Alumnos y Matrículas", emoji: "👨‍🎓" },
      { id: "profesores", label: "Profesores", emoji: "👔" },
    ],
  },
  {
    section: "Clases",
    items: [
      { id: "clases", label: "En Vivo", emoji: "📹" },
      { id: "reuniones", label: "Reuniones Zoom", emoji: "🔁" },
    ],
  },
  {
    section: "Cursos",
    items: [{ id: "diplomas", label: "Diplomas y Certificados", emoji: "🎓" }],
  },
  {
    section: "Reportes",
    items: [{ id: "reportes", label: "Notas y Evaluaciones", emoji: "📊" }],
  },
  {
    section: "Gestión",
    items: [
      { id: "pagos", label: "Pagos", emoji: "💳" },
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

  const pendientesCount = useCount("solicitudes", "estado", "pendiente");
  const usuariosCount = useCount("usuarios");
  const profesoresCount = useCount("usuarios", "rol", "profesor");
  const clasesActivasCount = useCount("clases", "estado", "activa");

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
        return usuariosCount;
      case "profesores":
        return profesoresCount;
      case "clases":
        return clasesActivasCount;
      default:
        return null;
    }
  };

  const tituloTab = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.id === tab);

  return (
    <>
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar izquierda estilo sarmat */}
        <aside className="w-full shrink-0 border-b border-apre-blue-light bg-apre-blue lg:fixed lg:bottom-0 lg:left-0 lg:top-20 lg:z-40 lg:flex lg:w-[280px] lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r">
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
            <p className="truncate text-sm font-bold text-white">{userData.nombre}</p>
            <p className="truncate text-xs text-white/50">{userData.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-3 w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20"
            >
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Contenido */}
        <main className="flex-1 lg:pl-[280px]">
          <div className="px-4 py-6 md:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-apre-blue">
                  {tituloTab?.emoji} {tituloTab?.label}
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  {userData.rol === "superadmin" ? "Superadmin" : "Admin"} · {userData.nombre}
                </p>
              </div>
            </div>

            {tab === "pendientes" && <PendientesTab />}
            {tab === "historial" && <HistorialTab />}
            {tab === "alumnos" && <UsuariosTab filtroRol="alumno" />}
            {tab === "profesores" && <UsuariosTab filtroRol="profesor" />}
            {tab === "clases" && <ClasesTab />}
            {tab === "reuniones" && <ReunionesTab />}
            {tab === "diplomas" && <DiplomasTab />}
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
    await setDoc(doc(db, "usuarios", uidTemp), {
      uid: uidTemp,
      email: s.email,
      nombre: nombreCompleto || s.nombres,
      rol: s.tipoSolicitud || "alumno",
      activo: true,
      telefono: s.telefono || "",
      solicitudId: s.id,
      fechaRegistro: serverTimestamp(),
    });
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
        <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-extrabold text-apre-blue">
              {[s.nombres, s.apellidoPaterno, s.apellidoMaterno].filter(Boolean).join(" ")}
            </p>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${
                s.tipoSolicitud === "profesor" ? "bg-apre-pink" : "bg-apre-blue"
              }`}
            >
              {s.tipoSolicitud === "profesor" ? "👨‍🏫 Profesor" : "👨‍🎓 Alumno"}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {s.email} · {s.telefono}
          </p>
          {s.cursoDeseado && (
            <p className="mt-1 text-sm text-gray-600">Curso: {s.cursoDeseado}</p>
          )}
          {s.mensaje && <p className="mt-1 text-sm text-gray-500">{s.mensaje}</p>}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => aprobar(s)}
              className="rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-white hover:brightness-95"
            >
              Aprobar
            </button>
            <button
              onClick={() => rechazar(s)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-300"
            >
              Rechazar
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
            <p className="font-extrabold text-apre-blue">
              {[s.nombres, s.apellidoPaterno, s.apellidoMaterno].filter(Boolean).join(" ")}
            </p>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${
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

/* ---------- Usuarios y Matrículas (Alumnos / Profesores) ---------- */
function UsuariosTab({ filtroRol }: { filtroRol: "alumno" | "profesor" }) {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [selUid, setSelUid] = useState<string | null>(null);
  const [selCurso, setSelCurso] = useState("");
  const [avanceDe, setAvanceDe] = useState<string | null>(null);

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

  const matricular = async (u: any) => {
    if (!selCurso) return;
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

  const toggleModulo = async (e: any, key: string) => {
    const actual: string[] = e.modulosCompletados ?? [];
    const nuevo = actual.includes(key)
      ? actual.filter((k) => k !== key)
      : [...actual, key];
    await updateDoc(doc(db!, "enrollments", e.id), { modulosCompletados: nuevo });
  };

  const cursoCurriculum = (slug: string) =>
    cursosLP.find((c) => c.slug === slug)?.curriculum ?? null;

  if (lista.length === 0) {
    return <p className="text-gray-500">No hay {filtroRol === "profesor" ? "profesores" : "alumnos"} registrados.</p>;
  }

  return (
    <div className="space-y-4">
      {lista.map((u) => {
        const susEnrolls = enrolls.filter((e) => e.uid === u.id);
        return (
          <div key={u.id} className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-extrabold text-apre-blue">{u.nombre}</p>
                <p className="text-sm text-gray-600">
                  {u.email} ·{" "}
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
                    <span className="text-green-600">· activo</span>
                  ) : (
                    <span className="text-red-600">· desactivado</span>
                  )}
                </p>
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
                {susEnrolls.map((e) => {
                  const curriculum = cursoCurriculum(e.courseSlug);
                  const completados: string[] = e.modulosCompletados ?? [];
                  return (
                    <li key={e.id} className="rounded-lg bg-gray-50 px-3 py-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm">{cursoNombreDe(e.courseSlug)}</span>
                        <div className="flex items-center gap-2">
                          {curriculum && curriculum.length > 0 && (
                            <>
                              <span className="text-xs font-bold text-gray-500">
                                {completados.length}/{curriculum.length}
                              </span>
                              <button
                                onClick={() =>
                                  setAvanceDe((prev) =>
                                    prev === e.id ? null : e.id
                                  )
                                }
                                className="rounded-lg bg-apre-blue/10 px-3 py-1 text-xs font-bold text-apre-blue hover:bg-apre-blue/20"
                              >
                                {avanceDe === e.id ? "Cerrar avance" : "Marcar avance"}
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => desmatricular(e)}
                            className="text-xs font-bold text-apre-red hover:underline"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                      {avanceDe === e.id && curriculum && (
                        <div className="mt-2 space-y-1 border-t border-gray-200 pt-2">
                          {curriculum.map((item: any, i: number) => {
                            const key = `${item.seccion}::${item.titulo}`;
                            const hecho = completados.includes(key);
                            return (
                              <label
                                key={i}
                                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                              >
                                <input
                                  type="checkbox"
                                  checked={hecho}
                                  onChange={() => toggleModulo(e, key)}
                                  className="h-4 w-4 accent-apre-blue"
                                />
                                <span className="font-semibold text-gray-500">{item.seccion}:</span>{" "}
                                {item.titulo}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {filtroRol === "alumno" &&
              (selUid === u.id ? (
                <div className="mt-3 flex gap-2">
                  <select
                    value={selCurso}
                    onChange={(e) => setSelCurso(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
                    className="rounded-lg bg-apre-blue px-4 py-2 text-sm font-bold text-white"
                  >
                    Matricular
                  </button>
                  <button
                    onClick={() => setSelUid(null)}
                    className="rounded-lg bg-gray-200 px-3 py-2 text-sm text-gray-700"
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

/* ---------- Diplomas y Certificados ---------- */
function DiplomasTab() {
  const db = getFirestoreDb();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [selUid, setSelUid] = useState("");
  const [cursoSlug, setCursoSlug] = useState(CURSOS_CERTIFICADO[0].slug);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "usuarios"), where("rol", "==", "alumno"));
    return onSnapshot(q, (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  const alumno = usuarios.find((u) => u.id === selUid);
  const curso =
    CURSOS_CERTIFICADO.find((c) => c.slug === cursoSlug) ?? CURSOS_CERTIFICADO[0];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 print:hidden">
        <h2 className="text-xl font-extrabold text-apre-blue">
          Generar diploma de alumno
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Selecciona el alumno y el curso aprobado. El diploma se genera con sus datos y
          puedes imprimirlo o guardarlo como PDF.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select
            value={selUid}
            onChange={(e) => setSelUid(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
          >
            <option value="">Selecciona un alumno…</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} · {u.email}
              </option>
            ))}
          </select>
          <select
            value={cursoSlug}
            onChange={(e) => setCursoSlug(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
          >
            {CURSOS_CERTIFICADO.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nombre} ({c.horas} horas)
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            disabled={!alumno}
            className="rounded-xl bg-apre-red px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40"
          >
            🖨 Imprimir / Guardar como PDF
          </button>
        </div>
      </div>

      {alumno ? (
        <DiplomaCertificado
          nombre={alumno.nombre || ""}
          rut={typeof alumno.rut === "string" ? alumno.rut : "—"}
          curso={curso}
        />
      ) : (
        <p className="text-gray-500">Selecciona un alumno para previsualizar el diploma.</p>
      )}
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
        <p className="text-sm text-gray-600">
          Historial de notas y porcentajes de las evaluaciones de los alumnos.
        </p>
        <button
          onClick={exportarCsv}
          disabled={resultados.length === 0}
          className="rounded-lg bg-apre-blue px-4 py-2 text-sm font-bold text-white hover:bg-apre-blue-light disabled:opacity-40"
        >
          ⬇ Descargar Notas y % (Excel)
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wide text-gray-500">
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
                    <span className="text-green-600">✅ Sí</span>
                  ) : (
                    <span className="text-apre-red">❌ No</span>
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

/* ---------- Reuniones Zoom ---------- */
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

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-extrabold text-apre-blue">Crear reunión Zoom</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            placeholder="Tema de la reunión (ej. Clase Módulo 1)"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm sm:col-span-2"
          />
          <input
            type="datetime-local"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
          />
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="Duración (min)"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
          />
        </div>
        <button
          onClick={crear}
          disabled={busy}
          className="mt-4 rounded-xl bg-apre-red px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          {busy ? "Creando…" : "Crear reunión"}
        </button>
        {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
      </div>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5">
            <div>
              <p className="font-extrabold text-apre-blue">{m.topic}</p>
              <p className="text-sm text-gray-600">
                {m.start_time ? new Date(m.start_time).toLocaleString("es-CL") : "Sin fecha"} ·{" "}
                {m.duration} min
              </p>
            </div>
            {m.join_url && (
              <a
                href={m.join_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-white"
              >
                Unirse
              </a>
            )}
          </div>
        ))}
        {meetings.length === 0 && (
          <p className="text-gray-500">Sin reuniones. (Requiere ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID y ZOOM_CLIENT_SECRET en .env)</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Clases en vivo (control solo admin) ---------- */
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

  const crear = async () => {
    if (!db || !form.nombre.trim()) return;
    await addDoc(collection(db, "clases"), {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      cursoSlug: form.cursoSlug,
      joinUrl: form.joinUrl.trim(),
      estado: "inactiva",
      fechaCreacion: serverTimestamp(),
      creadoPor: userData?.email || "",
    });
    setForm({ nombre: "", descripcion: "", cursoSlug: "", joinUrl: "" });
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
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-extrabold text-apre-blue">Crear clase en vivo</h2>
        <p className="mt-1 text-sm text-gray-600">
          Solo tú puedes iniciarla/finalizarla. Cuando la inicies, los alumnos
          matriculados del curso verán el aviso EN VIVO en su panel.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre de la clase (ej. Módulo 1: Legislación)"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm sm:col-span-2"
          />
          <input
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción (opcional)"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm sm:col-span-2"
          />
          <select
            value={form.cursoSlug}
            onChange={(e) => setForm({ ...form, cursoSlug: e.target.value })}
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
          >
            <option value="">Todos los cursos (global)</option>
            {CURSOS_PLATAFORMA.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
          <input
            value={form.joinUrl}
            onChange={(e) => setForm({ ...form, joinUrl: e.target.value })}
            placeholder="Link de la clase (opcional: Zoom/Meet)"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm"
          />
        </div>
        <button
          onClick={crear}
          disabled={!form.nombre.trim()}
          className="mt-4 rounded-xl bg-apre-red px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          Crear clase
        </button>
      </div>

      <div className="space-y-3">
        {clases.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-extrabold text-apre-blue">{c.nombre}</p>
                <p className="text-sm text-gray-600">
                  {c.cursoSlug ? cursoNombreDe(c.cursoSlug) : "Todos los cursos"} ·{" "}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${
                      c.estado === "activa"
                        ? "bg-whatsapp"
                        : c.estado === "finalizada"
                        ? "bg-gray-400"
                        : "bg-apre-blue"
                    }`}
                  >
                    {c.estado === "activa" ? "🔴 EN VIVO" : c.estado === "finalizada" ? "Finalizada" : "Inactiva"}
                  </span>
                </p>
                {c.descripcion && <p className="mt-1 text-sm text-gray-500">{c.descripcion}</p>}
                {c.joinUrl && (
                  <a
                    href={c.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-bold text-apre-blue hover:underline"
                  >
                    {c.joinUrl}
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.estado === "inactiva" && (
                  <button
                    onClick={() => cambiarEstado(c, "activa")}
                    className="rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-white hover:brightness-95"
                  >
                    ▶ Iniciar clase
                  </button>
                )}
                {c.estado === "activa" && (
                  <button
                    onClick={() => cambiarEstado(c, "finalizada")}
                    className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-bold text-white hover:bg-gray-800"
                  >
                    ■ Finalizar clase
                  </button>
                )}
                {c.estado === "finalizada" && (
                  <button
                    onClick={() => cambiarEstado(c, "activa")}
                    className="rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-white hover:brightness-95"
                  >
                    ▶ Reiniciar
                  </button>
                )}
                <button
                  onClick={() => eliminar(c)}
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-apre-red hover:bg-red-100"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {clases.length === 0 && (
          <p className="text-gray-500">Sin clases. Crea la primera con el formulario de arriba.</p>
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
        <div key={m.id} className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="font-extrabold text-apre-blue">{m.nombre || "Anónimo"}</p>
          <p className="text-sm text-gray-600">{m.email} · {m.telefono || "sin teléfono"}</p>
          {m.mensaje && <p className="mt-2 text-sm text-gray-700">{m.mensaje}</p>}
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
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
          className="rounded-lg bg-apre-blue px-4 py-2 text-sm font-bold text-white hover:bg-apre-blue-light"
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
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wide text-gray-500">
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
                <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-400">{p.buyOrder || p.id}</td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  Sin pagos. Cuando un alumno pague por WebPay aparecerán aquí.
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
        <div key={l.id} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
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
