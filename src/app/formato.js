// ---------- Constantes ----------
// Gastos de gestión fijos por entrada; los paga el comprador
export const GASTOS_GESTION = 1
// Opción del filtro de búsqueda que enseña todos los géneros
export const TODOS = 'Todos'

// Precio final de una entrada: precio del concierto + gastos
export function precioFinal(precio) {
  return precio + GASTOS_GESTION
}

// Precio en euros al estilo español: 19 → "19 €", 18.5 → "18,50 €"
export function formatearPrecio(precio) {
  return precio.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(precio) ? 0 : 2,
  })
}

// Fecha corta en español: "2026-11-13" → "vie, 13 nov"
export function formatearFecha(fecha) {
  const dia = new Date(`${fecha}T00:00`)
  return dia.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
}

// Código de la entrada para el QR (simulado): "AKK-crater-482913"
export function crearCodigoEntrada(concierto) {
  const numero = Math.floor(100000 + Math.random() * 900000)
  return `AKK-${concierto.id}-${numero}`
}
