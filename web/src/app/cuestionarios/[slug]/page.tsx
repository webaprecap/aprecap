"use client";

import { Suspense, use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { getFirestoreDb } from "@/lib/firebase";
import { canAccessCourse, getCourseFieldKey, getCourseStatus, isMaterialHabilitado } from "@/lib/courseAccess";
import CursoAccessGate from "@/components/CursoAccessGate";
import CuestionarioVFView from "@/components/cuestionarios/CuestionarioVFView";
import { getCuestionarios } from "@/data/cuestionarios";
import type { PreguntaCuestionario } from "@/data/cuestionarios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CuestionariosPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <CuestionariosInner params={params} />
    </Suspense>
  );
}

function CuestionariosInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, userData, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<{ courseSlug?: string }[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [solicitando, setSolicitando] = useState(false);
  const [activoIdx, setActivoIdx] = useState(0);
  const [cuestionariosHabilitados, setCuestionariosHabilitados] = useState(false);

  const cursoCuestionarios = getCuestionarios(slug);

  const isAdminUser =
    userData?.rol === "admin" ||
    userData?.rol === "superadmin" ||
    userData?.rol === "profesor";

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db || !user) return;
    const q = query(collection(db, "enrollments"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setEnrollments(snap.docs.map((d) => ({ courseSlug: d.data().courseSlug })));
      setLoadingEnrollments(false);
    });
    return unsub;
  }, [user]);

  // Listener para el switch global de habilitación de cuestionarios OS-10 fijado por Admin
  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) return;
    const unsub = onSnapshot(doc(db, "configuracion", "os10_cuestionarios"), (snap) => {
      if (snap.exists()) {
        setCuestionariosHabilitados(snap.data().habilitado === true);
      } else {
        setCuestionariosHabilitados(false);
      }
    });
    return unsub;
  }, []);

  const handleRequestAccess = async () => {
    if (!user) return;
    setSolicitando(true);
    try {
      const db = getFirestoreDb();
      if (db) {
        const fieldKey = getCourseFieldKey(slug);
        await updateDoc(doc(db, "usuarios", user.uid), {
          [fieldKey]: "pendiente",
        });
      }
    } catch (err) {
      console.error("Error solicitando acceso:", err);
    } finally {
      setSolicitando(false);
    }
  };

  if (!cursoCuestionarios) {
    notFound();
  }

  // Verificación de acceso al curso
  const status = getCourseStatus(userData, slug, enrollments);
  const hasAccess = canAccessCourse(userData, slug, enrollments);

  if (authLoading || loadingEnrollments) {
    return <div className="min-h-[70vh] flex items-center justify-center">Verificando accesos...</div>;
  }

  if (!hasAccess) {
    return (
      <CursoAccessGate
        cursoTitulo={cursoCuestionarios.titulo}
        cursoSlug={slug}
        status={status}
        isNotLoggedIn={!user}
        solicitando={solicitando}
        onRequestAccess={handleRequestAccess}
      />
    );
  }

  // Compuerta: Si son los cuestionarios de Guardia OS-10 y están en fase presencial (deshabilitados por Admin para alumnos)
  if (slug === "guardia-de-seguridad" && !isMaterialHabilitado(userData, slug, cuestionariosHabilitados) && !isAdminUser) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-white p-8 border border-gray-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
            🔒
          </div>
          <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-black uppercase text-amber-800">
            Fase Presencial en Sede
          </span>
          <h2 className="text-2xl font-black text-apre-blue">
            Cuestionarios Oficiales Bloqueados
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Por disposición académica de OTEC APRECAP, las pruebas y cuestionarios oficiales del curso <strong>Guardia de Seguridad (SPD)</strong> se habilitan al concluir la formación presencial en aula con el docente, para garantizar un aprendizaje integral.
          </p>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/panel/alumno"
              className="w-full rounded-xl bg-apre-blue py-3 text-xs font-bold text-white transition hover:bg-apre-blue-dark shadow-sm"
            >
              ← Volver a Mi Panel de Alumno
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activo = cursoCuestionarios.cuestionarios[activoIdx] ?? cursoCuestionarios.cuestionarios[0];

  return (
    <>
      <section className="bg-apre-blue text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-apre-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-apre-red border border-apre-red/30">
              <span>📋</span> Cuestionarios Oficiales
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-black">
              Cuestionarios · {cursoCuestionarios.titulo}
            </h1>
            <p className="mt-1 text-xs text-white/80">
              Los cuestionarios oficiales que se rinden en el curso, digitalizados con las
              mismas preguntas y respuestas. Corrección inmediata: al responder verás si
              acertaste o no con retroalimentación explicativa.
            </p>
          </div>
          <Link
            href={`/materiales/${cursoCuestionarios.slug}`}
            className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition"
          >
            ← Volver al material del curso
          </Link>
        </div>
      </section>

      {/* Grid de cuestionarios */}
      <section className="bg-gray-50 py-8 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 grid gap-6 lg:grid-cols-4">
          {/* Sidebar de módulos / cuestionarios */}
          <aside className="space-y-2 lg:col-span-1">
            <p className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3 px-1">
              Cuestionarios Disponibles ({cursoCuestionarios.cuestionarios.length})
            </p>
            <div className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-1">
              {cursoCuestionarios.cuestionarios.map((c, idx) => {
                const isActive = idx === activoIdx;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActivoIdx(idx)}
                    className={`w-full text-left rounded-xl p-3 text-xs transition flex flex-col gap-1 border ${
                      isActive
                        ? "bg-apre-blue text-white border-apre-blue shadow-md font-bold"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase ${isActive ? "text-apre-red" : "text-gray-400"}`}>
                      Cuestionario {idx + 1}
                    </span>
                    <span className="line-clamp-2 leading-tight">{c.titulo}</span>
                    <span className={`text-[10px] mt-1 ${isActive ? "text-white/70" : "text-gray-400"}`}>
                      {c.preguntas.length} preguntas V/F
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Área principal del cuestionario */}
          <main className="lg:col-span-3">
            <CuestionarioVFView
              titulo={activo.titulo}
              preguntas={activo.preguntas}
            />
          </main>
        </div>
      </section>
    </>
  );
}
