"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { cursosLP } from "@/data/cursos";
import ConsentModal from "@/components/ConsentModal";
import PrivacidadPanel from "@/components/PrivacidadPanel";
import { formatDetalleHorario, getClaseLiveStatus } from "@/lib/claseHorario";

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
      </section>

      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl space-y-6 px-4">
          <div className="flex gap-2 border-b border-gray-200 pb-4">
            <button
              onClick={() => setTab("reuniones")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 ${
                tab === "reuniones"
                  ? "bg-apre-blue text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>🔴</span>
              <span>Clases Virtuales (En Vivo y Programadas)</span>
            </button>
            <button
              onClick={() => setTab("alumnos")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 ${
                tab === "alumnos"
                  ? "bg-apre-blue text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>👥</span>
              <span>Alumnos Matriculados</span>
            </button>
            <button
              onClick={() => setTab("cursos")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 ${
                tab === "cursos"
                  ? "bg-apre-blue text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>📚</span>
              <span>Cursos APRECAP</span>
            </button>
          </div>

          {tab === "reuniones" && <ReunionesProfesor />}
          {tab === "alumnos" && <AlumnosProfesor />}
          {tab === "cursos" && <CursosProfesorTab />}

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
    const q = collection(db, "clases");
    return onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      items.sort((a: any, b: any) => {
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
      setClases(items);
    });
  }, [db]);

  const clasesConEstado = clases.map((c) => ({
    ...c,
    liveStatus: getClaseLiveStatus(c),
  }));

  const vigentes = clasesConEstado.filter((c) => c.liveStatus !== "finalizada" || c.estado === "activa");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-apre-pink/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-apre-pink">
          <span>📹</span> Sala de Clases Virtuales
        </div>
        <h2 className="text-xl font-extrabold text-apre-blue mt-2">Transmisión de Clases y Ciclos de Estudio</h2>
        <p className="mt-1 text-xs text-gray-600 leading-relaxed">
          Aquí puedes ver todas las clases creadas por la administración. Puedes ingresar como docente para dictar o acompañar la sesión en vivo.
        </p>
      </div>

      <div className="space-y-3">
        {vigentes.map((c) => {
          const isLive = c.liveStatus === "en_vivo";
          return (
            <div
              key={c.id}
              className={`relative rounded-2xl border-2 bg-white p-6 shadow-md ${
                isLive ? "border-whatsapp" : "border-blue-300"
              }`}
            >
              <span
                className={`absolute -top-3 right-4 rounded-full px-3 py-0.5 text-xs font-black text-white shadow-sm ${
                  isLive ? "bg-whatsapp animate-pulse" : "bg-blue-600"
                }`}
              >
                {isLive ? "🔴 EN VIVO (SALA ABIERTA)" : "⏳ PROGRAMADA (EN ESPERA)"}
              </span>
              <p className="font-extrabold text-apre-blue text-lg">{c.nombre}</p>
              <p className="text-xs text-gray-500 mt-1">
                Curso: <strong>{c.cursoSlug || "Todos los cursos (Global)"}</strong>
              </p>

              {(c.tipoHorario === "rango_dias" || c.fechaInicioRango || c.fechaInicioProgramada || c.tipoHorario === "programada") && (
                <p className="mt-2 text-xs font-semibold text-indigo-900 bg-indigo-50 border border-indigo-200 inline-block px-2.5 py-1 rounded-lg">
                  ⏰ {formatDetalleHorario(c)}
                </p>
              )}

              <div className="mt-2 text-[11px] text-gray-500">
                <span>👤 Creada por: <strong>{c.creadoPor || "Administración APRECAP"}</strong></span>
              </div>

              {c.descripcion && <p className="mt-2 text-xs text-gray-600 leading-relaxed italic">{c.descripcion}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={`/aula-en-vivo?id=${c.id}`}
                  className="rounded-xl bg-whatsapp hover:brightness-105 px-5 py-3 text-xs font-black text-white transition shadow-sm inline-flex items-center gap-2"
                >
                  <span>🚀</span>
                  <span>Entrar al Aula Virtual como Docente</span>
                </Link>
                {c.startUrl && (
                  <a
                    href={c.startUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-3 text-xs font-black text-slate-950 shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>👑</span>
                    <span>Abrir en Zoom (Host)</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
        {vigentes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-gray-600 text-xs">
              No hay clases activas ni programadas en este momento. Las clases creadas por cualquier administrador aparecerán aquí automáticamente.
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
