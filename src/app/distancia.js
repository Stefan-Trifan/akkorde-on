import { salas } from '../data/salas.js'

// ---------- Constantes ----------
const RADIO_TIERRA_KM = 6371
// Límites de la barra de distancia (km); empieza al máximo para ver todos
export const DISTANCIA_MIN_KM = 0.5
export const DISTANCIA_MAX_KM = 10
export const PASO_KM = 0.5

// Pasa grados a radianes
function aRadianes(grados) {
  return (grados * Math.PI) / 180
}

// Distancia en km entre dos puntos del mapa (fórmula del semiverseno)
function distanciaKm(a, b) {
  const dLat = aRadianes(b.lat - a.lat)
  const dLng = aRadianes(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aRadianes(a.lat)) * Math.cos(aRadianes(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * RADIO_TIERRA_KM * Math.asin(Math.sqrt(h))
}

// Distancia desde la ubicación elegida ({ lat, lng }) hasta la sala del concierto (null si no hay coordenadas)
export function distanciaAConcierto(concierto, ubicacion) {
  const sala = salas[concierto.sala]
  if (!sala) return null
  return distanciaKm(ubicacion, sala)
}

// ¿Está el concierto dentro del radio elegido, contando desde la ubicación elegida?
export function estaDentroDelRadio(concierto, km, ubicacion) {
  const distancia = distanciaAConcierto(concierto, ubicacion)
  return distancia !== null && distancia <= km
}

// Distancia al estilo español: 1.234 → "1,2 km"
export function formatearDistancia(km) {
  return `${km.toLocaleString('es-ES', { maximumFractionDigits: 1 })} km`
}
