"use client";

import { useState, useEffect } from "react";
import { getFirestoreDb } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";

const STORAGE_CACHE_KEY = "aprecap_modo_18_global_cached";
const CONFIG_COLLECTION = "configuracion";
const CONFIG_DOC = "fiestasPatrias";

export interface FiestasPatriasConfig {
  enabled: boolean;
  updatedAt?: Timestamp | null;
  updatedBy?: string | null;
}

/**
 * Guarda y actualiza en Firestore el estado global del Modo Fiestas Patrias de APRECAP.
 * Requiere rol de administrador.
 */
export async function setModoFiestasPatrias(enabled: boolean, updatedBy?: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    // Si no hay DB en local, guardar al menos en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_CACHE_KEY, enabled ? "true" : "false");
      if (enabled) {
        document.documentElement.setAttribute("data-modo-18", "true");
      } else {
        document.documentElement.removeAttribute("data-modo-18");
      }
    }
    return;
  }

  const configRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC);
  await setDoc(
    configRef,
    {
      enabled,
      updatedAt: serverTimestamp(),
      updatedBy: updatedBy || "admin@aprecap.cl",
    },
    { merge: true }
  );

  // Actualizar caché local inmediata para evitar latencia
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_CACHE_KEY, enabled ? "true" : "false");
    if (enabled) {
      document.documentElement.setAttribute("data-modo-18", "true");
    } else {
      document.documentElement.removeAttribute("data-modo-18");
    }
  }
}

/**
 * Hook de React para sincronizar en tiempo real el estado global del Modo Dieciochero
 * para todos los usuarios y visitantes desde Firestore.
 */
export function useFiestasPatrias() {
  const [isActive, setIsActive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_CACHE_KEY) === "true";
    }
    return false;
  });
  const [isClient, setIsClient] = useState<boolean>(false);
  const [configData, setConfigData] = useState<FiestasPatriasConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);

    // Leer valor inicial de cache
    const cached = localStorage.getItem(STORAGE_CACHE_KEY) === "true";
    setIsActive(cached);
    if (typeof document !== "undefined") {
      if (cached) {
        document.documentElement.setAttribute("data-modo-18", "true");
      } else {
        document.documentElement.removeAttribute("data-modo-18");
      }
    }

    const db = getFirestoreDb();
    if (!db) {
      setLoading(false);
      return;
    }

    // Suscripción en tiempo real al documento de configuración en Firestore
    const configRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC);
    const unsubscribe = onSnapshot(
      configRef,
      (docSnap) => {
        setLoading(false);
        if (docSnap.exists()) {
          const data = docSnap.data() as FiestasPatriasConfig;
          const isEnabled = !!data.enabled;
          setConfigData(data);
          setIsActive(isEnabled);

          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_CACHE_KEY, isEnabled ? "true" : "false");
          }
          if (typeof document !== "undefined") {
            if (isEnabled) {
              document.documentElement.setAttribute("data-modo-18", "true");
            } else {
              document.documentElement.removeAttribute("data-modo-18");
            }
          }
        } else {
          // Documento aún no creado: por defecto inactivo
          setIsActive(false);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_CACHE_KEY, "false");
          }
          if (typeof document !== "undefined") {
            document.documentElement.removeAttribute("data-modo-18");
          }
        }
      },
      (error) => {
        console.error("Error sincronizando configuración de Fiestas Patrias:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    isActive,
    isClient,
    loading,
    configData,
    setMode: (enabled: boolean, userEmail?: string) => setModoFiestasPatrias(enabled, userEmail),
  };
}
