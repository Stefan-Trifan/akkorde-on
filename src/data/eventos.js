import { esProximo } from '../app/tiempo.js'
import { artistaPorNombre } from './artistas.js'
import { COMUNIDAD_MADRID } from './comunidades.js'
import { conciertos } from './conciertos.js'
import { conciertosExtra } from './conciertosExtra.js'
import { sesionesDiscoteca } from './discotecas.js'
import { conciertosGira } from './giras.js'
import { salas, ubicacionDe } from './salas.js'

// ¿Está el evento en la Comunidad de Madrid? (donde vende la app)
function enComunidadDeMadrid(evento) {
  return ubicacionDe(evento.sala).comunidad === COMUNIDAD_MADRID
}

// Todos los eventos de la demo en la Comunidad de Madrid (conciertos de Alejandro + extra +
// giras + sesiones de discoteca), ordenados por fecha y hora
export const eventos = [
  ...conciertos,
  ...conciertosExtra,
  ...conciertosGira.filter(enComunidadDeMadrid),
  ...sesionesDiscoteca,
].sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))

// Conciertos de las giras en otras comunidades: solo salen en la ficha de cada artista y en los avisos
export const conciertosFuera = conciertosGira.filter((evento) => !enComunidadDeMadrid(evento))

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

// Artistas del catálogo que tocan en el evento (los DJs no están en el catálogo)
export function artistasDe(evento) {
  return cartelDe(evento).map(artistaPorNombre).filter(Boolean)
}

// Próximos conciertos de una artista dentro de una lista de eventos, por fecha
export function proximosDe(nombre, lista) {
  return lista
    .filter((evento) => esProximo(evento) && cartelDe(evento).includes(nombre))
    .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))
}
