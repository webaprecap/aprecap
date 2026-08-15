import { NextRequest, NextResponse } from "next/server";

const SANITY_CDN_PREFIX = "https://cdn.sanity.io/files/";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") || "";

  if (!url.startsWith(SANITY_CDN_PREFIX)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 400 });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok || !res.body) {
      return NextResponse.json({ error: "No se pudo obtener el documento." }, { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", res.headers.get("Content-Type") || "application/pdf");
    const contentLength = res.headers.get("Content-Length");
    if (contentLength) headers.set("Content-Length", contentLength);
    headers.set("Cache-Control", "public, max-age=3600");

    return new NextResponse(res.body, { headers });
  } catch {
    return NextResponse.json({ error: "Error al obtener el documento." }, { status: 502 });
  }
}
