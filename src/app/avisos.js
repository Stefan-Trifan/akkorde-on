// «Avísame si viene»: decide si un concierto recién anunciado cumple el aviso que pusiste a una artista.
// Sin servidor: en la app real lo comprobaría el servidor al publicarse el concierto y mandaría
// una notificación; aquí se comprueba en el momento y el aviso va a la bandeja «Avisos».
//
// Un aviso es { alcance, km, comunidad }:
//   - alcance 'zona':      el concierto está a km o menos de tu ubicación (la de Buscar)
//   - alcance 'comunidad': el concierto es en la comunidad autónoma elegida

import { COMUNIDAD_INICIAL } from '../data/comunidades.js'
import { ubicacionDe } from '../data/salas.js'
import { distanciaAConcierto, formatearDistancia } from './distancia.js'

// ---------- Constantes ----------
export const OPCIONES_KM = [10, 25, 50]
export const ALCANCES = { zona: 'En mi zona', comunidad: 'En mi comunidad' }

// Aviso con los valores de partida
export function avisoNuevo() {
  return { alcance: 'zona', km: 25, comunidad: COMUNIDAD_INICIAL }
}

// ¿Hay que avisar de este concierto? → { avisa, motivo }; el motivo explica la decisión en una frase
export function debeAvisar(aviso, concierto, ubicacion) {
  const { municipio, comunidad } = ubicacionDe(concierto.sala)

  if (aviso.alcance === 'zona') {
    const km = distanciaAConcierto(concierto, ubicacion)
    const donde = `${municipio}, a ${formatearDistancia(km)} de ${ubicacion.nombre}`
    if (km <= aviso.km) return { avisa: true, motivo: `En ${donde}` }
    return { avisa: false, motivo: `Es en ${donde}, y tu aviso es hasta ${aviso.km} km` }
  }

  if (comunidad === aviso.comunidad) return { avisa: true, motivo: `En ${municipio} (${comunidad})` }
  return { avisa: false, motivo: `Es en ${municipio} (${comunidad}) y tu aviso es para ${aviso.comunidad}` }
}

// Conciertos de una lista que cumplen el aviso
export function queCumplen(aviso, conciertos, ubicacion) {
  return conciertos.filter((concierto) => debeAvisar(aviso, concierto, ubicacion).avisa)
}
