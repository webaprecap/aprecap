const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'materiales', '[slug]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Imports
content = content.replace(
  `import PPTSlideViewer from "@/components/PPTSlideViewer";`,
  `import PPTSlideViewer from "@/components/PPTSlideViewer";\nimport VideoTracker from "@/components/cursos/VideoTracker";\nimport PDFSwipeViewer from "@/components/cursos/PDFSwipeViewer";\nimport { useEffect } from "react";`
);

// 2. State
content = content.replace(
  `const [selectedSubModuloIdx, setSelectedSubModuloIdx] = useState<number>(0);`,
  `const [selectedSubModuloIdx, setSelectedSubModuloIdx] = useState<number>(0);\n  const [videoUnlocked, setVideoUnlocked] = useState<boolean>(false);\n\n  useEffect(() => {\n    setVideoUnlocked(false);\n  }, [expandedModuloIdx, selectedSubModuloIdx]);`
);

// 3. Main Viewer Area
const oldMainArea = `<main className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                Unidad Activa: <strong className="text-cyan-400">{tituloActivo}</strong>
              </span>
              <span className="text-xs font-bold text-slate-400">
                {slidesActuales.length} Diapositivas disponibles
              </span>
            </div>

            <PPTSlideViewer
              slides={slidesActuales}
              pdfDownloadUrl={pdfDownloadUrl}
            />
          </main>`;

const newMainArea = `<main className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                Unidad Activa: <strong className="text-cyan-400">{tituloActivo}</strong>
              </span>
              <span className="text-xs font-bold text-slate-400">
                {moduloActual.videoUrl ? 'Video + Lectura PDF' : \`\${slidesActuales.length} Diapositivas disponibles\`}
              </span>
            </div>

            {moduloActual.videoUrl ? (
              <div className="space-y-4">
                {!videoUnlocked ? (
                  <VideoTracker
                    url={moduloActual.videoUrl}
                    title={tituloActivo}
                    onUnlockNext={() => setVideoUnlocked(true)}
                  />
                ) : (
                  <PDFSwipeViewer
                    url={moduloActual.pdfUrl || pdfDownloadUrl || ''}
                    onFinishReading={() => console.log('Finalizado PDF')}
                  />
                )}
              </div>
            ) : (
              <PPTSlideViewer
                slides={slidesActuales}
                pdfDownloadUrl={pdfDownloadUrl}
              />
            )}
          </main>`;

content = content.replace(oldMainArea, newMainArea);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete');
