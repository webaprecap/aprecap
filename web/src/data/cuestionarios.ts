export type TipoPreguntaCuestionario = "vf" | "alternativa";

export interface PreguntaCuestionario {
  id: string;
  tipo: TipoPreguntaCuestionario;
  texto: string;
  respuesta?: boolean;
  opciones?: string[];
  respuestaCorrecta?: string;
  explicacion?: string;
}

export interface Cuestionario {
  id: string;
  titulo: string;
  descripcion: string;
  preguntas: PreguntaCuestionario[];
}

export interface CursoCuestionarios {
  slug: string;
  titulo: string;
  cuestionarios: Cuestionario[];
}

import { cuestionariosGuardiaOS10 } from "./cuestionarios-os10";

export const cuestionariosPorCurso: Record<string, CursoCuestionarios> = {
  "guardia-de-seguridad": {
    slug: "guardia-de-seguridad",
    titulo: "Curso de Guardia de Seguridad (SPD)",
    cuestionarios: cuestionariosGuardiaOS10,
  },
};

export function getCuestionarios(slug: string): CursoCuestionarios | null {
  return cuestionariosPorCurso[slug] ?? null;
}
