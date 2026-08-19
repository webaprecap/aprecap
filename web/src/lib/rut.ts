/**
 * Utilidades para validación, limpieza y formateo de RUT chileno (módulo 11)
 * Cumplimiento con Ley N° 19.628 y N° 21.719 sobre Protección de Datos Personales
 */

export function cleanRut(rut: string): string {
  if (!rut) return "";
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
}

export function formatRut(rut: string): string {
  const clean = cleanRut(rut);
  if (clean.length <= 1) return clean;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  // Formato con puntos: 12.345.678-K
  const formattedCuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedCuerpo}-${dv}`;
}

export function validateRut(rut: string): boolean {
  const clean = cleanRut(rut);
  if (clean.length < 8 || clean.length > 9) return false;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  // Solo dígitos en cuerpo
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperadoCalculado = 11 - (suma % 11);
  let dvEsperado = "";
  if (dvEsperadoCalculado === 11) dvEsperado = "0";
  else if (dvEsperadoCalculado === 10) dvEsperado = "K";
  else dvEsperado = String(dvEsperadoCalculado);

  return dv === dvEsperado;
}
