import dotenv from 'dotenv';
dotenv.config();

import { materialesEstudio } from '../web/src/data/materiales-estudio.js';

const projectId = process.env.SANITY_PROJECT_ID || 'mwwotgjc';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

async function syncAllToSanity() {
  console.log(`Sincronizando la estructura exacta de módulos con Sanity Project: ${projectId}...`);
  const url = `https://${projectId}.api.sanity.io/v2024-03-17/data/mutate/${dataset}`;

  const mutations = [];

  for (const curso of materialesEstudio) {
    for (const mod of curso.modulos) {
      for (const slide of mod.slides) {
        mutations.push({
          createOrReplace: {
            _id: `slide-${slide.id}`,
            _type: 'studySlide',
            courseSlug: curso.slug,
            courseTitle: curso.title,
            moduleName: mod.nombre,
            slideNumber: slide.slideNumber,
            title: slide.title,
            contentBullets: slide.contentBullets,
            imageUrl: slide.imageUrl,
            pdfUrl: curso.pdfUrl || ''
          }
        });
      }
    }
  }

  console.log(`Subiendo ${mutations.length} diapositivas de módulos a Sanity...`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ mutations })
  });

  console.log('Status Sanity:', res.status);
  const json = await res.json();
  console.log('Resultado Sanity:', JSON.stringify(json, null, 2));
}

syncAllToSanity().catch(err => console.error('Error sincronizando con Sanity:', err));
