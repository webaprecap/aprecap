"use client";

import { useEffect, useState } from "react";
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
  fecha?: unknown;
}

export default function PanelAlumno() {
  const { userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [enrolls, setEnrolls] = useState<Enroll[]>([]);

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
    </>
  );
}
