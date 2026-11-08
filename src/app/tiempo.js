// ---------- Constantes ----------
// Horas antes del concierto a partir de las que se puede ver el QR
export const HORAS_ANTES_QR = 1
const MS_POR_HORA = 60 * 60 * 1000

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
