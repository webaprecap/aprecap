// Capa Sanity — env-gated, se activa cuando llega el proyecto.
import { createClient, type ClientConfig } from "next-sanity";

export function sanityEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

export function getSanityClient() {
  const config: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2026-01-01",
    useCdn: true,
  };
  return createClient(config);
}
