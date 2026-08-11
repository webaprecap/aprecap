// Config de OpenNext para Cloudflare Workers (patrón SARMAT).
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

const config = defineCloudflareConfig({});
config.buildCommand = "npx next build --webpack";
config.edgeExternals = [...(config.edgeExternals || []), "sharp", "@img/sharp-win32-x64"];

export default config;
