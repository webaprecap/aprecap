// Capa Zoom (API Server-to-Server OAuth) — env-gated.
// Las claves se obtienen al crear la app en marketplace.zoom.us con la cuenta del cliente.

export interface ZoomMeeting {
  id: number;
  topic: string;
  start_time: string;
  join_url: string;
  duration: number;
}

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

export function zoomEnabled() {
  return Boolean(ZOOM_ACCOUNT_ID && ZOOM_CLIENT_ID && ZOOM_CLIENT_SECRET);
}

let tokenCache: { token: string; expires: number } | null = null;

async function getZoomToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expires - 60000) {
    return tokenCache.token;
  }
  const res = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: ZOOM_ACCOUNT_ID!,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Zoom OAuth falló: ${res.status}`);
  const data = await res.json();
  tokenCache = { token: data.access_token, expires: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function zoomFetch<T>(path: string): Promise<T> {
  if (!zoomEnabled()) throw new Error("Zoom no configurado");
  const token = await getZoomToken();
  const res = await fetch(`https://api.zoom.us/v2${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Zoom API ${res.status}`);
  return res.json() as Promise<T>;
}

async function zoomPost<T>(path: string, body: unknown): Promise<T> {
  if (!zoomEnabled()) throw new Error("Zoom no configurado");
  const token = await getZoomToken();
  const res = await fetch(`https://api.zoom.us/v2${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Zoom API ${res.status}`);
  return res.json() as Promise<T>;
}

export async function createMeeting(topic: string, startTime: string, durationMinutes: number): Promise<ZoomMeeting> {
  return zoomPost<ZoomMeeting>("/users/me/meetings", {
    topic,
    type: 2,
    start_time: startTime,
    duration: durationMinutes,
    settings: { host_video: true, participant_video: true, auto_recording: "cloud" },
  });
}

export async function listMeetings(): Promise<ZoomMeeting[]> {
  const data = await zoomFetch<{ meetings: ZoomMeeting[] }>("/users/me/meetings?page_size=30");
  return data.meetings ?? [];
}

export async function getMeeting(meetingId: number): Promise<ZoomMeeting> {
  return zoomFetch<ZoomMeeting>(`/meetings/${meetingId}`);
}

async function zoomDelete(path: string): Promise<boolean> {
  if (!zoomEnabled()) throw new Error("Zoom no configurado");
  const token = await getZoomToken();
  const res = await fetch(`https://api.zoom.us/v2${path}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status === 200 || res.status === 404) {
    return true;
  }

  let errorDetail = "";
  try {
    const json = await res.json();
    if (json.code === 3001 || json.code === 300) {
      // La reunión ya no existe en Zoom o ha expirado
      return true;
    }
    errorDetail = json.message || JSON.stringify(json);
  } catch {
    errorDetail = await res.text();
  }

  throw new Error(errorDetail || `Zoom API ${res.status}`);
}

export async function deleteMeeting(meetingId: number | string): Promise<boolean> {
  const cleanId = String(meetingId).trim();
  return zoomDelete(`/meetings/${encodeURIComponent(cleanId)}`);
}


