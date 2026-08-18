/**
 * Helpers compartidos para los bancos de preguntas de exámenes finales (CCTV, Bastón y Esposas).
 * Selección balanceada entre módulos y barajado de opciones (Fisher-Yates).
 */

import type { ExamQuestion } from "./types";

/** Baraja el orden de las opciones de cada pregunta (Fisher-Yates). */
export function barajarOpciones(question: ExamQuestion): ExamQuestion {
  const options = [...question.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { ...question, options };
}

/**
 * Selecciona preguntas balanceadas entre todos los módulos del banco.
 * Reparte una base por módulo y distribuye el remanente de forma aleatoria,
 * barajando también el orden final de las preguntas.
 */
export function seleccionarBalanceadas(
  banco: ExamQuestion[],
  totalPreguntas: number
): ExamQuestion[] {
  const byModule: Record<string, ExamQuestion[]> = {};
  for (const q of banco) {
    if (!byModule[q.moduleTitle]) byModule[q.moduleTitle] = [];
    byModule[q.moduleTitle].push(q);
  }

  const moduleKeys = Object.keys(byModule);
  if (moduleKeys.length === 0) return [];

  const basePerModule = Math.floor(totalPreguntas / moduleKeys.length);
  let remainder = totalPreguntas % moduleKeys.length;

  const selected: ExamQuestion[] = [];

  for (const moduleKey of moduleKeys) {
    const moduleQuestions = byModule[moduleKey];
    const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
    const take = Math.min(shuffled.length, basePerModule + (remainder > 0 ? 1 : 0));
    selected.push(...shuffled.slice(0, take));
    if (remainder > 0) remainder--;
  }

  if (selected.length < totalPreguntas) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const remainingPool = banco
      .filter((q) => !selectedIds.has(q.id))
      .sort(() => Math.random() - 0.5);
    selected.push(...remainingPool.slice(0, totalPreguntas - selected.length));
  }

  return selected.sort(() => Math.random() - 0.5).slice(0, totalPreguntas);
}