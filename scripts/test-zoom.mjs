import fs from "fs";
import path from "path";

// Read web/.env manually
const envPath = path.resolve("web/.env");
if (!fs.existsSync(envPath)) {
  console.log("web/.env no encontrado");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    envVars[match[1]] = value.trim();
  }
});

const accountId = envVars.ZOOM_ACCOUNT_ID;
const clientId = envVars.ZOOM_CLIENT_ID;
const clientSecret = envVars.ZOOM_CLIENT_SECRET;

console.log("Credenciales configuradas:", {
  accountId: accountId ? "OK (" + accountId.slice(0, 4) + "...)" : "Falta",
  clientId: clientId ? "OK (" + clientId.slice(0, 4) + "...)" : "Falta",
  clientSecret: clientSecret ? "OK (***)" : "Falta",
});

if (!accountId || !clientId || !clientSecret) {
  console.log("Faltan variables en web/.env");
  process.exit(1);
}

async function test() {
  console.log("Obteniendo token OAuth...");
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authHeader}`,
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: accountId,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    console.error("Error obteniendo token:", tokenRes.status, tokenData);
    return;
  }

  console.log("Token obtenido exitosamente. Scopes otorgados:", tokenData.scope || "N/A");

  // Probar listar grabaciones
  console.log("Probando consulta de grabaciones en la nube (GET /users/me/recordings)...");
  const recRes = await fetch("https://api.zoom.us/v2/users/me/recordings", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const recData = await recRes.json();
  if (!recRes.ok) {
    console.log("Respuesta de grabaciones:", recRes.status, recData);
  } else {
    console.log("¡Grabaciones consultadas con éxito! Total de reuniones grabadas:", recData.total_records ?? 0);
  }
}

test().catch(console.error);
