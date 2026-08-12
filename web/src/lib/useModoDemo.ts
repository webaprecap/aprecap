'use client'

import { useSyncExternalStore } from 'react'
import { useSearchParams } from 'next/navigation'

// TEMP-TEST: modo demo para demostraciones con clientes.
// Se activa con ?demo=1 o al hacer click en el botón "Test Curso OS-10"
// (que guarda la bandera en sessionStorage para que no se pierda al navegar).
// ELIMINAR ANTES DE PRODUCCIÓN junto con el botón del Header.

const DEMO_KEY = 'aprecap_demo'

let demoCache: boolean | null = null
const demoListeners = new Set<() => void>()

function subscribeDemo(cb: () => void) {
  demoListeners.add(cb)
  return () => demoListeners.delete(cb)
}

function getDemoSnapshot(): boolean {
  if (demoCache === null) {
    try {
      demoCache = sessionStorage.getItem(DEMO_KEY) === '1'
    } catch {
      demoCache = false
    }
  }
  return demoCache
}

function getDemoServerSnapshot(): boolean {
  return false
}

export function useModoDemo(): boolean {
  const searchParams = useSearchParams()
  const porParam = searchParams.get('demo') === '1'
  const porSesion = useSyncExternalStore(subscribeDemo, getDemoSnapshot, getDemoServerSnapshot)
  return porParam || porSesion
}
