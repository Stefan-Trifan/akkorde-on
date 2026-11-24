// ---------- Constantes ----------
// Horas antes del concierto a partir de las que se puede ver el QR
export const HORAS_ANTES_QR = 1
const MS_POR_HORA = 60 * 60 * 1000

// ---------- Fechas como texto AAAA-MM-DD (hora local) ----------
// Pasa un Date a "AAAA-MM-DD" con la fecha local (no UTC)
export function aFechaTexto(momento) {
  const mes = String(momento.getMonth() + 1).padStart(2, '0')
  const dia = String(momento.getDate()).padStart(2, '0')
  return `${momento.getFullYear()}-${mes}-${dia}`
}

// Fecha que cae dentro de X días desde hoy: 0 = hoy, 1 = mañana...
export function fechaDentroDe(dias, desde = new Date()) {
  const momento = new Date(desde)
  momento.setDate(momento.getDate() + dias)
  return aFechaTexto(momento)
}

// Fecha para las tarjetas: "Hoy", "Mañana" o "sáb, 28 nov"
export function etiquetaFecha(fecha, ahora = new Date()) {
  if (fecha === aFechaTexto(ahora)) return 'Hoy'
  if (fecha === fechaDentroDe(1, ahora)) return 'Mañana'
  return new Date(`${fecha}T00:00`).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
}

// ¿Es el evento hoy?
export function esHoy(evento, ahora = new Date()) {
  return evento.fecha === aFechaTexto(ahora)
}

// ¿Es el evento este finde? (de viernes a domingo de esta semana; si ya es finde, desde hoy)
export function esEsteFinde(evento, ahora = new Date()) {
  const diaSemana = ahora.getDay() // 0 = domingo ... 6 = sábado
  const diasHastaDomingo = diaSemana === 0 ? 0 : 7 - diaSemana
  const diasHastaViernes = diaSemana === 0 || diaSemana >= 5 ? 0 : 5 - diaSemana
  return evento.fecha >= fechaDentroDe(diasHastaViernes, ahora) && evento.fecha <= fechaDentroDe(diasHastaDomingo, ahora)
}

// ¿Es hoy o más adelante? (los eventos pasados no se enseñan en la ficha del local)
export function esProximo(evento, ahora = new Date()) {
  return evento.fecha >= aFechaTexto(ahora)
}

// Fecha y hora de inicio del concierto ("2026-11-13" + "21:00")
function inicioConcierto(concierto) {
  return new Date(`${concierto.fecha}T${concierto.hora}`)
}

// Momento a partir del cual se puede ver el QR (1 h antes del concierto)
export function momentoVerQr(concierto) {
  return new Date(inicioConcierto(concierto).getTime() - HORAS_ANTES_QR * MS_POR_HORA)
}

// ¿Se puede ver ya el QR en este momento?
export function puedeVerQr(concierto, ahora) {
  return ahora >= momentoVerQr(concierto)
}

// Fecha y hora al estilo español: "vie, 13 nov a las 20:00"
export function formatearMomento(momento) {
  const dia = momento.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
  const hora = momento.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  return `${dia} a las ${hora}`
}
