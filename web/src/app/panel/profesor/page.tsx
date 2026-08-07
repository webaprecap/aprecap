"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { cursosLP } from "@/data/cursos";
import { cursosMoodle } from "@/data/moodle";
import ConsentModal from "@/components/ConsentModal";
import PrivacidadPanel from "@/components/PrivacidadPanel";

export default function PanelProfesor() {
  const { userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"reuniones" | "alumnos">("reuniones");

  useEffect(() => {
    if (!loading && (!userData || userData.rol !== "profesor")) {
      router.push("/login");
    }
  }, [userData, loading, router]);

  if (loading || !userData) return <p className="p-8 text-center text-gray-500">Cargando…</p>;

  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-apre-pink">
              Panel de Profesor
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Hola, {userData.nombre.split(" ")[0]} 👨‍🏫
            </h1>
          </div>
          <button
            onClick={() => signOut()}
            className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Cerrar sesión
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2 pb-4">
            <button
              onClick={() => setTab("reuniones")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                tab === "reuniones"
                  ? "bg-apre-pink text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              📹 Clases en Vivo (Zoom)
            </button>
            <button
              onClick={() => setTab("alumnos")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                tab === "alumnos"
                  ? "bg-apre-pink text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              👨‍🎓 Alumnos matriculados
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          {tab === "reuniones" ? <ReunionesProfesor /> : <AlumnosProfesor />}

          <div className="flex flex-wrap gap-3">
            <a
              href="https://aprecap.cl/campus"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-apre-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-apre-blue-light"
            >
              Entrar al Campus (Moodle)
            </a>
            <Link
              href="/cursos"
              className="rounded-xl border-2 border-apre-blue px-6 py-3 text-sm font-bold text-apre-blue transition hover:bg-apre-blue hover:text-white"
            >
              Ver catálogo de cursos
            </Link>
          </div>

          <PrivacidadPanel />
        </div>
      </section>
      <ConsentModal />
    </>
  );
}

/* ---------- Clase activa iniciada por el admin ---------- */
function ClaseActivaProfesor() {
  const db = getFirestoreDb();
  const [clases, setClases] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "clases"), where("estado", "==", "activa"));
    return onSnapshot(q, (snap) =>
      setClases(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  if (clases.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-600">
          No hay clases en vivo. Cuando el administrador inicie una clase,
          aparecerá aquí con su enlace.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {clases.map((c) => (
        <div
          key={c.id}
          className="relative rounded-2xl border-2 border-whatsapp bg-white p-5"
        >
          <span className="absolute -top-2 right-4 animate-pulse rounded-full bg-whatsapp px-2 py-0.5 text-xs font-bold text-white">
            🔴 EN VIVO
          </span>
          <p className="font-extrabold text-apre-blue">{c.nombre}</p>
          {c.descripcion && <p className="mt-1 text-sm text-gray-600">{c.descripcion}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={c.joinUrl || "https://aprecap.cl/campus"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-white"
            >
              Unirse a la clase
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Reuniones Zoom ---------- */
function ReunionesProfesor() {
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
      <ClaseActivaProfesor />
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-extrabold text-apre-blue">Crear clase en vivo</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            placeholder="Tema de la clase (ej. Módulo 1: Legislación)"
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
          className="mt-4 rounded-xl bg-apre-pink px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          {busy ? "Creando…" : "Crear clase"}
        </button>
        {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
      </div>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div
            key={m.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5"
          >
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
          <p className="text-gray-500">
            Sin clases programadas. (Requiere ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID y
            ZOOM_CLIENT_SECRET en .env)
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Alumnos matriculados ---------- */
function AlumnosProfesor() {
  const db = getFirestoreDb();
  const [enrolls, setEnrolls] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const un1 = onSnapshot(collection(db, "enrollments"), (snap) =>
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const un2 = onSnapshot(collection(db, "usuarios"), (snap) =>
      setUsuarios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => {
      un1();
      un2();
    };
  }, [db]);

  const cursoDe = (slug?: string) =>
    cursosLP.find((c) => c.slug === slug) || cursosMoodle.find((c) => c.slug === slug);

  const alumnos = enrolls.map((e) => {
    const u = usuarios.find((x) => x.id === e.uid || x.uid === e.uid);
    return {
      ...e,
      alumnoNombre: u?.nombre || e.uid,
      alumnoEmail: u?.email || "—",
    };
  });

  const porCurso = alumnos.reduce<Record<string, typeof alumnos>>((acc, a) => {
    const key = a.courseSlug ?? "sin-curso";
    acc[key] = acc[key] ?? [];
    acc[key].push(a);
    return acc;
  }, {});

  if (Object.keys(porCurso).length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-gray-600">Aún no hay alumnos matriculados en los cursos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(porCurso).map(([slug, lista]) => (
        <div key={slug} className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-extrabold text-apre-blue">
            {cursoDe(slug)?.title || slug}
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600">
              {lista.length} {lista.length === 1 ? "alumno" : "alumnos"}
            </span>
          </h3>
          <ul className="mt-3 divide-y divide-gray-100">
            {lista.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <span className="font-semibold text-gray-800">{a.alumnoNombre}</span>
                <span className="text-gray-500">{a.alumnoEmail}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
