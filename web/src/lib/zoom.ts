// Capa Zoom (API Server-to-Server OAuth) — env-gated.
// Las claves se obtienen al crear la app en marketplace.zoom.us con la cuenta del cliente.

export interface ZoomMeeting {
  id: number | string;
  topic: string;
  start_time: string;
  join_url: string;
  start_url?: string;
  password?: string;
  encrypted_password?: string;
  duration: number;
  timezone?: string;
}

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_HOST_KEY = process.env.ZOOM_HOST_KEY || process.env.NEXT_PUBLIC_ZOOM_HOST_KEY || "";

export function zoomEnabled() {
  return Boolean(ZOOM_ACCOUNT_ID && ZOOM_CLIENT_ID && ZOOM_CLIENT_SECRET);
}

export function getZoomHostKey(): string {
  return ZOOM_HOST_KEY;
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

async function zoomPut(path: string, body: unknown): Promise<boolean> {
  if (!zoomEnabled()) throw new Error("Zoom no configurado");
  const token = await getZoomToken();
  const res = await fetch(`https://api.zoom.us/v2${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (res.status === 204 || res.status === 200 || res.status === 404) {
    return true;
  }
  let errorDetail = "";
  try {
    const json = await res.json();
    errorDetail = json.message || JSON.stringify(json);
  } catch {
    errorDetail = await res.text();
  }
  throw new Error(errorDetail || `Zoom API ${res.status}`);
}

export async function createMeeting(
  topic: string,
  startTime: string,
  durationMinutes: number = 90,
  timezone: string = "America/Santiago"
): Promise<ZoomMeeting> {
  return zoomPost<ZoomMeeting>("/users/me/meetings", {
    topic,
    type: 2,
    start_time: startTime,
    duration: durationMinutes,
    timezone: timezone,
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: true, // Permite ingresar de inmediato a la sala
      jbh_time: 0, // En cualquier momento sin esperar al anfitrión
      waiting_room: false, // Desactiva la sala de espera para acceso instantáneo
      mute_upon_entry: false,
      auto_recording: "cloud", // Grabación automática en la nube
      approval_type: 2, // Aprobación automática sin requerir registro previo
      audio: "both",
    },
  });
}

export async function listMeetings(type?: "scheduled" | "live" | "upcoming"): Promise<ZoomMeeting[]> {
  const query = type ? `?type=${type}&page_size=30` : `?page_size=30`;
  const data = await zoomFetch<{ meetings: ZoomMeeting[] }>(`/users/me/meetings${query}`);
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

export interface ZoomRecordingFile {
  id: string;
  meeting_id: string | number;
  recording_start: string;
  recording_end?: string;
  file_type: string; // "MP4", "M4A", "TIMELINE", "TRANSCRIPT", "CHAT"
  file_extension: string;
  file_size: number;
  play_url?: string;
  download_url: string;
  status: string;
  recording_type?: string;
}

export interface ZoomRecordingMeeting {
  uuid: string;
  id: number;
  topic: string;
  start_time: string;
  duration: number;
  total_size: number;
  recording_count: number;
  share_url?: string;
  recording_play_passcode?: string;
  recording_files: ZoomRecordingFile[];
}

export interface ZoomRecordingsResponse {
  from?: string;
  to?: string;
  page_size?: number;
  total_records?: number;
  meetings: ZoomRecordingMeeting[];
}

export async function getZoomAccessToken(): Promise<string> {
  return getZoomToken();
}

export async function listRecordings(from?: string, to?: string): Promise<ZoomRecordingsResponse> {
  const params = new URLSearchParams({ page_size: "50" });
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  return zoomFetch<ZoomRecordingsResponse>(`/users/me/recordings?${params.toString()}`);
}

export async function deleteMeeting(meetingId: number | string): Promise<boolean> {
  const cleanId = String(meetingId).trim();
  return zoomDelete(`/meetings/${encodeURIComponent(cleanId)}`);
}

export async function deleteMeetingRecordings(
  meetingId: number | string,
  action: "trash" | "delete" = "trash"
): Promise<boolean> {
  const cleanId = String(meetingId).trim();
  return zoomDelete(`/meetings/${encodeURIComponent(cleanId)}/recordings?action=${action}`);
}

export async function endMeeting(meetingId: number | string): Promise<boolean> {
  const cleanId = String(meetingId).trim();
  return zoomPut(`/meetings/${encodeURIComponent(cleanId)}/status`, { action: "end" });
}




