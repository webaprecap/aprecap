import dotenv from 'dotenv';
dotenv.config();

const projectId = process.env.SANITY_PROJECT_ID || 'mwwotgjc';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

async function testSanity() {
  console.log(`Conectando a Sanity Project: ${projectId}, Dataset: ${dataset}...`);
  const url = `https://${projectId}.api.sanity.io/v2024-03-17/data/mutate/${dataset}`;

  const doc = {
    _type: 'studySlide',
    courseSlug: 'guardia-de-seguridad',
    moduleName: 'Módulo 1: Legislación laboral y seguridad privada',
    slideNumber: 1,
    title: 'Principios de Seguridad Privada y Estado de Derecho',
    contentBullets: [
      'La seguridad privada es una actividad complementaria a la seguridad pública ejercida por las Fuerzas de Orden (Carabineros y PDI).',
      'Regida bajo la Ley N° 21.659 y Decreto N° 867.',
      'El objetivo principal es la protección de personas, bienes e instalaciones acreditadas.'
    ],
    imageUrl: 'https://aprecap.cl/wp-content/uploads/2023/10/capacitacion.png'
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      mutations: [{ createOrReplace: { ...doc, _id: 'slide-os10-mod1-1' } }]
    })
  });

  console.log('Status:', res.status);
  const json = await res.json();
  console.log('Resultado Sanity:', JSON.stringify(json, null, 2));
}

testSanity().catch(err => console.error('Error:', err));
