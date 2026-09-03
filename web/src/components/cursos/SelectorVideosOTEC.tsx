"use client";

import { useState } from "react";
import type { VideoOTEC } from "@/data/cursos-otec-laborales";

interface SelectorVideosOTECProps {
  videos: VideoOTEC[];
  cursoTitulo: string;
}

export default function SelectorVideosOTEC({
  videos,
  cursoTitulo,
}: SelectorVideosOTECProps) {
  const [videoActivoIndex, setVideoActivoIndex] = useState(0);

  if (!videos || videos.length === 0) {
    return null;
  }

  const videoActivo = videos[videoActivoIndex] || videos[0];

  return (
    <div className="space-y-6">
      {/* Selector de Botones de Video */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-apre-blue flex items-center gap-2">
            <span>🎬</span> Clases en Video y Cápsulas Audiovisuales ({videos.length})
          </h3>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            YouTube HD
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, idx) => {
            const isSelected = idx === videoActivoIndex;
            return (
              <button
                key={v.id}
                onClick={() => setVideoActivoIndex(idx)}
                className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition text-xs relative group ${
                  isSelected
                    ? "border-apre-red bg-red-50/50 shadow-xs ring-1 ring-apre-red/30"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                {/* Icono / Play Badge */}
                <div
                  className={`h-9 w-9 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm shadow-xs transition ${
                    isSelected
                      ? "bg-apre-red text-white"
                      : "bg-slate-100 text-slate-700 group-hover:bg-apre-red group-hover:text-white"
                  }`}
                >
                  {isSelected ? "▶" : `${idx + 1}`}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Video {idx + 1}
                    </span>
                    {v.duracionAprox && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-white/80 border border-slate-200 px-1.5 py-0.2 rounded">
                        ⏱ {v.duracionAprox}
                      </span>
                    )}
                  </div>

                  <p
                    className={`font-bold mt-0.5 leading-snug line-clamp-2 ${
                      isSelected ? "text-apre-red font-extrabold" : "text-gray-800"
                    }`}
                  >
                    {v.titulo}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reproductor de Video Activo */}
      <div className="rounded-2xl border border-gray-200 bg-slate-900 overflow-hidden shadow-lg">
        {/* Cabecera del video */}
        <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 py-3 text-white flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-apre-red uppercase tracking-widest block">
              Reproduciendo Video {videoActivoIndex + 1} de {videos.length}
            </span>
            <h4 className="text-sm font-extrabold text-white truncate mt-0.5">
              {videoActivo.titulo}
            </h4>
          </div>

          <a
            href={videoActivo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-slate-700 hover:bg-slate-600 px-3 py-1.5 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span>Ver en YouTube</span>
            <span>↗</span>
          </a>
        </div>

        {/* Iframe YouTube Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            key={videoActivo.youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${videoActivo.youtubeId}?rel=0&modestbranding=1`}
            title={videoActivo.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {videoActivo.descripcion && (
          <div className="bg-slate-800/80 px-4 py-2.5 text-xs text-slate-300 border-t border-slate-700/60">
            <span className="font-bold text-white mr-1.5">Descripción:</span>
            {videoActivo.descripcion}
          </div>
        )}
      </div>
    </div>
  );
}
