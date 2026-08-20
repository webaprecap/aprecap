"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { cursosLP } from "@/data/cursos";
import ConsentModal from "@/components/ConsentModal";
import PrivacidadPanel from "@/components/PrivacidadPanel";

export default function PanelProfesor() {
  const { userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"reuniones" | "alumnos" | "cursos">("reuniones");

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

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
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 shadow-xs"
          >
            <span>🚪</span>
            <span>Cerrar sesión</span>
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
            <button
              onClick={() => setTab("cursos")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                tab === "cursos"
                  ? "bg-apre-pink text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              👁️ Explorar Cursos (Aula Desbloqueada)
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          {tab === "reuniones" ? (
            <ReunionesProfesor />
          ) : tab === "alumnos" ? (
            <AlumnosProfesor />
          ) : (
            <CursosProfesorTab />
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              href="/cursos"
              className="rounded-xl border-2 border-apre-blue px-6 py-3 text-sm font-bold text-apre-blue transition hover:bg-apre-blue hover:text-white"
            >
              Ver catálogo de cursos
            </Link>
          </div>

          {/* Barra de sesión y salida */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <p className="text-sm font-bold text-apre-blue">Sesión de Profesor Activa</p>
              <p className="text-xs text-gray-500">{userData.nombre} ({userData.email})</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 hover:border-red-300 shadow-xs"
            >
              <span>🚪</span>
              <span>Cerrar sesión</span>
            </button>
          </div>

          <PrivacidadPanel />
        </div>
      </section>
      <ConsentModal />
    </>
  );
}

/* ---------- Clases en vivo iniciadas por el admin ---------- */
function ReunionesProfesor() {
  const db = getFirestoreDb();
  const [clases, setClases] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "clases"), where("estado", "==", "activa"));
    return onSnapshot(q, (snap) =>
      setClases(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [db]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-apre-pink/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-pink">
          <span>📹</span> Sala de Clases en Vivo
        </div>
        <h2 className="text-xl font-extrabold text-apre-blue mt-2">Transmisión de Clases Virtuales</h2>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed">
          Las salas virtuales son abiertas y gestionadas directamente por la administración de APRECAP.
          Cuando la clase sea iniciada por el administrador, aparecerá a continuación para que puedas unirte como docente.
        </p>
      </div>

      <div className="space-y-3">
        {clases.map((c) => (
          <div
            key={c.id}
            className="relative rounded-2xl border-2 border-whatsapp bg-white p-6 shadow-md"
          >
            <span className="absolute -top-3 right-4 animate-pulse rounded-full bg-whatsapp px-3 py-0.5 text-xs font-black text-white shadow-sm">
              🔴 EN VIVO (SALA ABIERTA)
            </span>
            <p className="font-extrabold text-apre-blue text-lg">{c.nombre}</p>
            <p className="text-xs text-gray-500 mt-1">
              Curso: <strong>{c.cursoSlug || "Todos los cursos (Global)"}</strong>
            </p>
            {c.descripcion && <p className="mt-2 text-xs text-gray-600 leading-relaxed">{c.descripcion}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`/aula-en-vivo?id=${c.id}`}
                className="rounded-xl bg-whatsapp px-5 py-3 text-xs font-black text-white transition hover:brightness-105 shadow-sm inline-flex items-center gap-2"
              >
                <span>🚀</span>
                <span>Entrar al Aula Virtual como Docente</span>
              </Link>
            </div>
          </div>
        ))}
        {clases.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-gray-600 text-xs">
              No hay clases en vivo activas en este momento. Cuando la administración inicie una sesión, aparecerá aquí automáticamente.
            </p>
          </div>
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
    cursosLP.find((c) => c.slug === slug);

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

/* ---------- Explorar Cursos para Profesores ---------- */
function CursosProfesorTab() {
  const cursos = [
    {
      slug: "guardia-de-seguridad",
      nombre: "Curso Guardia de Seguridad (OS-10)",
      horas: "90 hrs",
      icono: "🛡️",
      descripcion: "14 Módulos interactivos, videos temáticos y cuestionarios oficiales.",
    },
    {
      slug: "operador-cctv-y-alarmas",
      nombre: "Curso Operador CCTV y Alarmas",
      horas: "40 hrs",
      icono: "📹",
      descripcion: "8 Módulos de monitoreo, videograbación y protocolos de seguridad electrónica.",
    },
    {
      slug: "baston-y-esposas",
      nombre: "Curso Bastón y Esposas",
      horas: "8 hrs",
      icono: "🥋",
      descripcion: "11 Submódulos de defensa personal policial, bastón retráctil y grilletes.",
    },
    {
      slug: "supervisor-de-seguridad",
      nombre: "Curso Supervisor de Seguridad",
      horas: "140 hrs",
      icono: "⭐",
      descripcion: "6 Módulos de gestión de seguridad privada, liderazgo de guardias y marco normativo.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-apre-pink/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-blue border border-apre-pink/30">
          <span>👨‍🏫</span> Material de Enseñanza Docente
        </div>
        <h2 className="text-xl font-extrabold text-apre-blue mt-2">Aulas Virtuales y Contenido Desbloqueado</h2>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed">
          Como docente de APRECAP, tienes acceso total a todas las aulas para proyectar videos, diapositivas y manuales en tus clases.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cursos.map((c) => (
          <div key={c.slug} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.icono}</span>
                <div>
                  <h3 className="font-extrabold text-apre-blue text-sm">{c.nombre}</h3>
                  <p className="text-xs text-gray-500">{c.horas}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">{c.descripcion}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
              <Link
                href={`/materiales/${c.slug}`}
                className="flex-1 rounded-xl bg-apre-blue text-white py-2 text-center text-xs font-bold hover:bg-apre-blue-dark transition shadow-xs"
              >
                👁️ Entrar al Aula Virtual
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
