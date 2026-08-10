"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { cursosMoodle } from "@/data/moodle";
import { cursosLP } from "@/data/cursos";
import { CONTACTO } from "@/data/site";
import ConsentModal from "@/components/ConsentModal";
import PrivacidadPanel from "@/components/PrivacidadPanel";

interface Enroll {
  id: string;
  uid: string;
  courseSlug?: string;
  moodleCourseId?: number;
  modulosCompletados?: string[];
  fecha?: unknown;
}

interface Clase {
  id: string;
  nombre?: string;
  descripcion?: string;
  cursoSlug?: string;
  joinUrl?: string;
  estado?: string;
  fechaInicio?: unknown;
}

export default function PanelAlumno() {
  const { userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [enrolls, setEnrolls] = useState<Enroll[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);
  const [aviso, setAviso] = useState<Clase | null>(null);
  const avisados = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && (!userData || userData.rol !== "alumno")) {
      router.push("/login");
    }
  }, [userData, loading, router]);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !userData) return;
    const q = query(collection(db, "enrollments"), where("uid", "==", userData.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrolls(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Enroll)));
    });
    return unsub;
  }, [userData]);

  const cursosDeAlumno = enrolls.map((e) => e.courseSlug);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) return;
    const q = query(collection(db, "clases"), where("estado", "==", "activa"));
    const unsub = onSnapshot(q, (snap) => {
      const activas = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Clase))
        .filter(
          (c) => !c.cursoSlug || cursosDeAlumno.includes(c.cursoSlug)
        );
      setClases(activas);
      const nuevas = activas.filter((c) => !avisados.current.has(c.id));
      if (nuevas.length > 0) {
        for (const c of nuevas) avisados.current.add(c.id);
        setAviso(nuevas[0]);
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrolls.length > 0, cursosDeAlumno.join(",")]);

  if (loading || !userData) return <p className="p-8 text-center text-gray-500">Cargando…</p>;

  const cursoDe = (slug?: string) =>
    cursosLP.find((c) => c.slug === slug) || cursosMoodle.find((c) => c.slug === slug);
  const moodleUrl = (moodleCourseId?: number) =>
    moodleCourseId ? `https://aprecap.cl/campus/course/view.php?id=${moodleCourseId}` : "https://aprecap.cl/campus";

  return (
    <>
      <section className="bg-apre-blue text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-apre-red">
              Panel de Alumno
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Hola, {userData.nombre} 👋
            </h1>
          </div>
          <button
            onClick={() => signOut()}
            className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Cerrar sesión
          </button>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-extrabold text-apre-blue">Clases en Vivo</h2>
              {clases.length > 0 && (
                <span className="animate-pulse rounded-full bg-whatsapp px-3 py-1 text-xs font-bold text-white">
                  🔴 {clases.length} {clases.length === 1 ? "clase" : "clases"} en línea
                </span>
              )}
            </div>
            {clases.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="text-gray-600">
                  No hay clases en vivo. Cuando el administrador inicie una clase
                  para tus cursos, aparecerá aquí con su enlace.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {clases.map((c) => (
                  <div
                    key={c.id}
                    className="relative rounded-2xl border-2 border-whatsapp bg-white p-5 shadow-sm"
                  >
                    <span className="absolute -top-2 right-4 animate-pulse rounded-full bg-whatsapp px-2 py-0.5 text-xs font-bold text-white">
                      🔴 EN VIVO
                    </span>
                    <h3 className="font-extrabold text-apre-blue">{c.nombre}</h3>
                    {c.descripcion && (
                      <p className="mt-1 text-sm text-gray-600">{c.descripcion}</p>
                    )}
                    {c.fechaInicio ? (
                      <p className="mt-1 text-xs text-gray-400">
                        Iniciada a las{" "}
                        {new Date(
                          (c.fechaInicio as { toDate?: () => Date }).toDate?.()
                            ?? (c.fechaInicio as Date)
                        ).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    ) : null}
                    <a
                      href={c.joinUrl || "https://aprecap.cl/campus"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block rounded-xl bg-whatsapp px-4 py-2 text-center text-sm font-bold text-white transition hover:brightness-95"
                    >
                      Unirse a la clase
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-apre-blue">Mis Cursos</h2>
            {enrolls.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="text-gray-600">
                  Aún no tienes cursos matriculados. Si ya te inscribiste,
                  espera a que el administrador confirme tu matrícula.
                </p>
                <Link
                  href="/cursos"
                  className="mt-4 inline-block font-bold text-apre-red hover:underline"
                >
                  Ver catálogo de cursos
                </Link>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {enrolls.map((e) => {
                  const curso = cursoDe(e.courseSlug);
                  const curriculum = curso?.curriculum ?? [];
                  const completados = e.modulosCompletados ?? [];
                  const pct =
                    curriculum.length > 0
                      ? Math.round((completados.length / curriculum.length) * 100)
                      : 0;
                  return (
                    <div
                      key={e.id}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <h3 className="font-extrabold text-apre-blue">
                        {curso?.title || (e.courseSlug ?? "Curso")}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Modalidad: {curso ? "Asincrónico" : "Presencial/Online"}
                      </p>
                      {curriculum.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                            <span>Avance</span>
                            <span>
                              {completados.length}/{curriculum.length} módulos
                            </span>
                          </div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-whatsapp transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <details className="mt-2">
                            <summary className="cursor-pointer text-xs font-bold text-apre-blue">
                              Ver detalle
                            </summary>
                            <ul className="mt-2 space-y-1">
                              {curriculum.map((item, i) => {
                                const hecho = completados.includes(
                                  `${item.seccion}::${item.titulo}`
                                );
                                return (
                                  <li
                                    key={i}
                                    className={`flex items-center gap-2 text-xs ${
                                      hecho ? "text-green-600" : "text-gray-500"
                                    }`}
                                  >
                                    <span>{hecho ? "✅" : "⬜"}</span>
                                    <span>
                                      {item.seccion}: {item.titulo}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </details>
                        </div>
                      )}
                      <a
                        href={moodleUrl(e.moodleCourseId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block rounded-xl bg-apre-red px-4 py-2 text-sm font-bold text-white transition hover:bg-apre-red-dark"
                      >
                        Entrar al campus
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-apre-blue">Mis Reuniones</h2>
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-600">
                Cuando el administrador programe una clase en vivo por Zoom, la
                verás aquí con su enlace de acceso.
              </p>
              <a
                href={CONTACTO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-bold text-whatsapp hover:underline"
              >
                Dudas de tu curso → WhatsApp
              </a>
            </div>
          </div>

          <PrivacidadPanel />
        </div>
      </section>
      <ConsentModal />

      {aviso && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-whatsapp px-4 py-1.5 text-sm font-bold text-white">
              🔴 ¡Tu clase está en línea!
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-apre-blue">{aviso.nombre}</h3>
            {aviso.descripcion && <p className="mt-2 text-gray-600">{aviso.descripcion}</p>}
            <div className="mt-6 grid gap-2">
              <a
                href={aviso.joinUrl || "https://aprecap.cl/campus"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAviso(null)}
                className="rounded-xl bg-whatsapp px-4 py-3 text-center text-sm font-bold text-white hover:brightness-95"
              >
                🚀 Unirme a la clase ahora
              </a>
              <button
                onClick={() => setAviso(null)}
                className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
