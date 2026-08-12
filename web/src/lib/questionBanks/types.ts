export interface PreguntaAlternativa {
  id: string
  pregunta: string
  opciones: string[]
  respuestaCorrecta: string
  explicacion: string
}

export interface PreguntaVF {
  id: string
  afirmacion: string
  respuestaCorrecta: boolean
  explicacion: string
}

export interface BancoModulo {
  numero: number
  titulo: string
  alternativas: PreguntaAlternativa[]
  vf: PreguntaVF[]
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function seleccionarAlternativas(
  banco: PreguntaAlternativa[],
  cantidad: number
): PreguntaAlternativa[] {
  return shuffleArray(banco)
    .slice(0, Math.min(cantidad, banco.length))
    .map((p) => ({
      ...p,
      opciones: shuffleArray(p.opciones),
    }))
}

export function seleccionarVF(
  banco: PreguntaVF[],
  cantidad: number
): PreguntaVF[] {
  return shuffleArray(banco).slice(0, Math.min(cantidad, banco.length))
}
