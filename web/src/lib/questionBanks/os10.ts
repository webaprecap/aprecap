import type { BancoModulo, PreguntaAlternativa, PreguntaVF } from "./types";
import { seleccionarAlternativas, seleccionarVF, shuffleArray } from "./types";
import { bancoModulo1 } from "./os10-modulo1";
import { bancoModulo2 } from "./os10-modulo2";
import { bancoModulo3 } from "./os10-modulo3";
import { bancoModulo4 } from "./os10-modulo4";
import { bancoModulo5 } from "./os10-modulo5";
import { bancoModulo6 } from "./os10-modulo6";
import { bancoModulo7 } from "./os10-modulo7";
import { bancoModulo8 } from "./os10-modulo8";
import { bancoModulo9 } from "./os10-modulo9";
import { bancoModulo10 } from "./os10-modulo10";
import { bancoModulo11 } from "./os10-modulo11";
import { bancoModulo12 } from "./os10-modulo12";
import { bancoModulo13 } from "./os10-modulo13";
import { bancoModulo14 } from "./os10-modulo14";

export const OS10_BANCOS: BancoModulo[] = [
  bancoModulo1,
  bancoModulo2,
  bancoModulo3,
  bancoModulo4,
  bancoModulo5,
  bancoModulo6,
  bancoModulo7,
  bancoModulo8,
  bancoModulo9,
  bancoModulo10,
  bancoModulo11,
  bancoModulo12,
  bancoModulo13,
  bancoModulo14,
];

export const MINIQUIZ_PREGUNTAS_POR_MODULO = 5;
export const EXAMEN_PREGUNTAS_POR_MODULO = 10;
export const MINIQUIZ_UMBRAL_APROBACION = 60;
export const EXAMEN_UMBRAL_APROBACION = 80;

export interface PreguntaExamenFinal extends PreguntaVF {
  modulo: number;
  tituloModulo: string;
}

export function getBancoModulo(moduloIdx: number): BancoModulo | null {
  return OS10_BANCOS[moduloIdx] || null;
}

export function getMiniQuizPreguntas(moduloIdx: number): PreguntaAlternativa[] {
  const banco = getBancoModulo(moduloIdx);
  if (!banco) return [];
  return seleccionarAlternativas(banco.alternativas, MINIQUIZ_PREGUNTAS_POR_MODULO);
}

export function getExamenFinalPreguntas(): PreguntaExamenFinal[] {
  const seleccionadas: PreguntaExamenFinal[] = [];
  for (const banco of OS10_BANCOS) {
    const delModulo = seleccionarVF(banco.vf, EXAMEN_PREGUNTAS_POR_MODULO);
    for (const p of delModulo) {
      seleccionadas.push({
        ...p,
        modulo: banco.numero,
        tituloModulo: banco.titulo,
      });
    }
  }
  return shuffleArray(seleccionadas);
}

export function calcularPorcentaje(correctas: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correctas / total) * 100);
}
