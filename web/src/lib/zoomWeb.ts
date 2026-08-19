/**
 * Utilidades para transformar enlaces estándar de Zoom a la versión Web Client directa
 * con nombre de usuario pre-cargado y contraseña embebida.
 */

export function getZoomWebClientUrl(rawUrl?: string, userName: string = ""): string {
  if (!rawUrl || !rawUrl.trim()) return "";
  const clean = rawUrl.trim();
  try {
    const fullUrl = clean.startsWith("http://") || clean.startsWith("https://") ? clean : `https://${clean}`;
    const urlObj = new URL(fullUrl);

    // Detectar si es un enlace de Zoom
    if (urlObj.hostname.includes("zoom.us")) {
      const match = urlObj.pathname.match(/\/j\/(\d+)/);
      if (match && match[1]) {
        const meetingId = match[1];
        const pwd = urlObj.searchParams.get("pwd") || "";
        const uName = encodeURIComponent(userName || "Estudiante APRECAP");
        const pwdParam = pwd ? `&pwd=${pwd}` : "";
        return `https://app.zoom.us/wc/${meetingId}/join?uname=${uName}${pwdParam}`;
      }
    }
    return fullUrl;
  } catch {
    return clean;
  }
}

export function getMeetingIdAndPwd(rawUrl?: string): { meetingId: string; pwd?: string } | null {
  if (!rawUrl) return null;
  try {
    const fullUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    const urlObj = new URL(fullUrl);
    if (urlObj.hostname.includes("zoom.us")) {
      const match = urlObj.pathname.match(/\/j\/(\d+)/);
      if (match && match[1]) {
        return {
          meetingId: match[1],
          pwd: urlObj.searchParams.get("pwd") || undefined,
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}
