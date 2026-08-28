/**
 * Utilidades para transformar enlaces estándar de Zoom a la versión Web Client directa
 * con nombre de usuario pre-cargado y contraseña embebida.
 */

export function formatMeetingId(id?: string | number): string {
  if (!id) return "";
  const clean = String(id).replace(/\D/g, "");
  if (clean.length === 11) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 7)} ${clean.slice(7)}`;
  } else if (clean.length === 10) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  } else if (clean.length === 9) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  return clean;
}

export function getZoomWebClientUrl(rawUrl?: string, userName: string = ""): string {
  if (!rawUrl || !rawUrl.trim()) return "";
  const clean = rawUrl.trim();
  try {
    const fullUrl = clean.startsWith("http://") || clean.startsWith("https://") ? clean : `https://${clean}`;
    const urlObj = new URL(fullUrl);

    // Detectar si es un enlace de Zoom
    if (urlObj.hostname.includes("zoom.us")) {
      const match = urlObj.pathname.match(/\/(?:j|s|wc)\/(\d+)/);
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
      const match = urlObj.pathname.match(/\/(?:j|s|wc)\/(\d+)/);
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

export function getZoomCredentials(
  joinUrl?: string,
  startUrl?: string,
  dbMeetingId?: string | number,
  dbPassword?: string
): { meetingId: string; formattedId: string; password?: string; hostUrl?: string } {
  const fromJoin = getMeetingIdAndPwd(joinUrl);
  const fromStart = getMeetingIdAndPwd(startUrl);

  const meetingId = String(dbMeetingId || fromJoin?.meetingId || fromStart?.meetingId || "").trim();
  const password = dbPassword || fromJoin?.pwd || fromStart?.pwd || "";
  const hostUrl = startUrl || (meetingId ? `https://zoom.us/s/${meetingId}` : joinUrl);

  return {
    meetingId,
    formattedId: formatMeetingId(meetingId),
    password: password || undefined,
    hostUrl,
  };
}
