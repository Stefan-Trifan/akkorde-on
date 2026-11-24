// Lógica de venta de un evento: listas, entradas por tramos y reservados.
// Lo que se ofrece en cada evento lo decide quien lo publica (campo «venta» del evento);
// si el evento no tiene «venta», solo hay una entrada general a su precio.

import { formatearPrecio, precioFinal } from './formato.js'

// ---------- Constantes ----------
export const MAX_POR_OPCION = 10
const MS_POR_DIA = 24 * 60 * 60 * 1000

// Configuración de venta completa de un evento, con valores por defecto
export function opcionesVenta(evento) {
  const venta = evento.venta ?? {}
  return {
    listas: venta.listas ?? [],
    entradas: venta.entradas ?? [{ id: 'general', nombre: 'Entrada general', precio: evento.precio }],
    reservados: venta.reservados ?? [],
    plano: venta.plano ?? null,
    // Qué deja ver el organizador
    mostrar: { tramos: false, quedan: false, mapa: false, ...venta.mostrar },
  }
}

// ---------- Entradas y tramos ----------
// Tramo que se está vendiendo ahora: el primero que no está agotado (null si se acabaron todos)
export function tramoActual(entrada) {
  if (!entrada.tramos) return null
  return entrada.tramos.find((tramo) => tramo.vendidas < tramo.cupo) ?? null
}

// Precio actual de una entrada (null = agotada)
export function precioEntrada(entrada) {
  if (!entrada.tramos) return entrada.precio
  return tramoActual(entrada)?.precio ?? null
}

// Entradas que quedan al precio actual (null si el organizador no da el dato)
export function quedan(entrada) {
  const tramo = entrada.tramos ? tramoActual(entrada) : entrada
  if (!tramo || tramo.cupo === undefined) return null
  return tramo.cupo - tramo.vendidas
}

// Nombre para el ticket: "Entrada general · 2.º tramo"
export function nombreEntrada(entrada) {
  const tramo = tramoActual(entrada)
  return tramo ? `${entrada.nombre} · ${tramo.nombre}` : entrada.nombre
}

// ---------- Listas ----------
// Momento en que cierra una lista. Si la hora límite es «antes» que la hora del evento
// (p. ej. evento 23:30 y lista hasta 01:00), es de la madrugada siguiente.
export function cierreLista(evento, lista) {
  const cierre = new Date(`${evento.fecha}T${lista.hastaHora}`)
  if (lista.hastaHora < evento.hora) return new Date(cierre.getTime() + MS_POR_DIA)
  return cierre
}

// ¿Se puede apuntar uno todavía a la lista?
export function listaAbierta(evento, lista, ahora = new Date()) {
  return ahora < cierreLista(evento, lista)
}

// ---------- Resumen ----------
// Precio más barato que se puede comprar ahora (sin contar reservados); null si no queda nada
export function precioDesde(evento, ahora = new Date()) {
  const { listas, entradas } = opcionesVenta(evento)
  const precios = [
    ...listas.filter((lista) => listaAbierta(evento, lista, ahora)).map((lista) => lista.precio),
    ...entradas.map(precioEntrada).filter((precio) => precio !== null),
  ]
  if (precios.length === 0) return null
  return precioFinal(Math.min(...precios))
}

// Precio para las tarjetas: "19 €", "Desde 11 €", "Desde gratis" o "Agotado"
export function textoDesde(evento) {
  const desde = precioDesde(evento)
  if (desde === null) return 'Agotado'
  const precio = desde === 0 ? 'gratis' : formatearPrecio(desde)
  return tieneVariasOpciones(evento) ? `Desde ${precio}` : precio
}

// ¿Tiene el evento algo más que una entrada general? (listas, varias entradas o reservados)
export function tieneVariasOpciones(evento) {
  const { listas, entradas, reservados } = opcionesVenta(evento)
  return listas.length + entradas.length + reservados.length > 1
}

// ---------- Carrito ----------
// Carrito: { lineas: [{ clave, tipo, nombre, precio, cantidad, detalle }], reservado: { ...mesa, personas } | null }
// tipo: 'lista' | 'entrada' | 'reservado'

export function totalCarrito(carrito) {
  const lineas = carrito.lineas.reduce((suma, linea) => suma + precioFinal(linea.precio) * linea.cantidad, 0)
  return lineas + (carrito.reservado ? precioFinal(carrito.reservado.precio) : 0)
}

export function personasCarrito(carrito) {
  return carrito.lineas.reduce((suma, linea) => suma + linea.cantidad, 0) + (carrito.reservado?.personas ?? 0)
}

// Una plaza por persona: cada una será una entrada con su propio QR y el nombre del asistente.
// nominal = hace falta el nombre (listas y reservados); revendible = solo las entradas normales;
// precioPagado = null en los reservados (se paga la mesa entera, no cada plaza)
export function plazasDelCarrito(carrito) {
  const plazas = []
  carrito.lineas.forEach((linea) => {
    for (let i = 0; i < linea.cantidad; i++) {
      plazas.push({
        tipo: linea.tipo,
        opcion: linea.nombre,
        detalle: linea.detalle,
        aviso: linea.aviso ?? null,
        nominal: linea.tipo === 'lista',
        revendible: linea.tipo === 'entrada',
        precioPagado: precioFinal(linea.precio),
      })
    }
  })
  if (carrito.reservado) {
    for (let i = 0; i < carrito.reservado.personas; i++) {
      plazas.push({
        tipo: 'reservado',
        opcion: `Reservado ${carrito.reservado.nombre}`,
        detalle: carrito.reservado.incluye,
        aviso: `${carrito.reservado.zona} · reservado para ${carrito.reservado.personas} personas`,
        nominal: true,
        revendible: false,
        precioPagado: null,
      })
    }
  }
  return plazas
}
