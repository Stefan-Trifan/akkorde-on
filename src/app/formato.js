// ---------- Constantes ----------
// Gastos de gestión fijos por entrada; los paga el comprador
export const GASTOS_GESTION = 1
// Opción del filtro de búsqueda que enseña todos los géneros
export const TODOS = 'Todos'

// Precio final de una entrada: precio + gastos (lo gratis no paga gastos)
export function precioFinal(precio) {
  return precio === 0 ? 0 : precio + GASTOS_GESTION
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

// Edad mínima para mostrar: 18 → "+18 años"; null → sin requisito
export function textoEdad(edad) {
  return edad ? `+${edad} años` : 'Todas las edades'
}

// Código de vestimenta para mostrar; null → sin requisito
export function textoDressCode(dressCode) {
  return dressCode ?? 'Sin código de vestimenta'
}

// Código de la entrada para el QR (simulado): "AKK-mago-de-oz-482913"
export function crearCodigoEntrada(concierto) {
  const numero = Math.floor(100000 + Math.random() * 900000)
  return `AKK-${concierto.id}-${numero}`
}
