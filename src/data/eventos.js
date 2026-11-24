import { conciertos } from './conciertos.js'
import { conciertosExtra } from './conciertosExtra.js'
import { sesionesDiscoteca } from './discotecas.js'
import { salas } from './salas.js'

// Todos los eventos de la demo (conciertos de Alejandro + extra + sesiones de discoteca), ordenados por fecha y hora
export const eventos = [...conciertos, ...conciertosExtra, ...sesionesDiscoteca].sort((a, b) =>
  `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`),
)

// Edad mínima y código de vestimenta del evento; si el evento no dice nada, los del local
export function infoAcceso(evento) {
  const local = salas[evento.sala] ?? {}
  return {
    edadMinima: evento.edadMinima ?? local.edadMinima ?? null,
    dressCode: evento.dressCode ?? local.dressCode ?? null,
  }
}

// Artistas o DJs del evento; si no hay cartel, el propio nombre del evento
export function cartelDe(evento) {
  return evento.cartel ?? [evento.nombre]
}
