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
import { cursosMoodle } from "@/data/moodle";
import { cursosLP } from "@/data/cursos";
import { cursosOtec } from "@/data/cursos-otec";
import ConsentModal from "@/components/ConsentModal";

type Tab = "solicitudes" | "usuarios" | "reuniones" | "clases" | "contacto" | "auditoria";

const TABS: { id: Tab; label: string }[] = [
  { id: "solicitudes", label: "Solicitudes" },
  { id: "usuarios", label: "Usuarios y Matrículas" },
  { id: "reuniones", label: "Reuniones Zoom" },
  { id: "clases", label: "Clases en Vivo" },
  { id: "contacto", label: "Contacto" },
  { id: "auditoria", label: "Auditoría" },
];

export default function PanelAdmin() {
  const { userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("solicitudes");

  useEffect(() => {
    if (!loading && (!userData || (userData.rol !== "admin" && userData.rol !== "superadmin"))) {
      router.push("/login");
    }
  }, [userData, loading, router]);

  if (loading || !userData) return <p className="p-8 text-center text-gray-500">Cargando…</p>;

  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
              Panel de Administración
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              {userData.rol === "superadmin" ? "Superadmin" : "Admin"} · {userData.nombre}
            </h1>
          </div>
          <button
            onClick={() => signOut()}
            className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold transition hover:bg-white/20"
          >
            Cerrar sesión
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2 pb-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  tab === t.id
                    ? "bg-apre-red text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          {tab === "solicitudes" && <SolicitudesTab />}
          {tab === "usuarios" && <UsuariosTab />}
          {tab === "reuniones" && <ReunionesTab />}
          {tab === "clases" && <ClasesTab />}
          {tab === "contacto" && <ContactoTab />}
          {tab === "auditoria" && <AuditoriaTab />}
        </div>
      </section>
      <ConsentModal />
    </>
  );
}

/* ---------- Solicitudes ---------- */
function SolicitudesTab() {
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

/* ---------- Usuarios y Matrículas ---------- */
function UsuariosTab() {
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
    const curso = [...cursosLP, ...cursosMoodle].find((c) => c.slug === selCurso);
    await setDoc(doc(collection(db!, "enrollments"), `${u.id}_${selCurso}`), {
      uid: u.id,
      courseSlug: selCurso,
      moodleCourseId: (curso as any)?.moodleId ? Number((curso as any).moodleId) : null,
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

  const cursoNombre = (slug: string) =>
    [...cursosLP, ...cursosMoodle, ...cursosOtec].find((c) => c.slug === slug)?.title ?? slug;

  const cursoCurriculum = (slug: string) =>
    [...cursosLP, ...cursosMoodle].find((c) => c.slug === slug)?.curriculum ?? null;

  return (
    <div className="space-y-4">
      {usuarios.map((u) => {
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
                        <span className="text-sm">{cursoNombre(e.courseSlug)}</span>
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

            {selUid === u.id ? (
              <div className="mt-3 flex gap-2">
                <select
                  value={selCurso}
                  onChange={(e) => setSelCurso(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">Selecciona un curso…</option>
                  {[...cursosLP, ...cursosMoodle].map((c) => (
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
            )}
          </div>
        );
      })}
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

  const cursoNombre = (slug: string) => {
    if (!slug) return "Todos los cursos";
    return [...cursosLP, ...cursosMoodle, ...cursosOtec].find((c) => c.slug === slug)?.title ?? slug;
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
            {[...cursosLP, ...cursosMoodle].map((c) => (
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
                  {cursoNombre(c.cursoSlug)} ·{" "}
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
