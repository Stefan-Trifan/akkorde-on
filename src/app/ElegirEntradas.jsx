import { useState } from 'react'
import PlanoSala from './PlanoSala.jsx'
import { formatearFecha, formatearPrecio, precioFinal } from './formato.js'
import {
  MAX_POR_OPCION,
  cierreLista,
  listaAbierta,
  nombreEntrada,
  opcionesVenta,
  personasCarrito,
  precioEntrada,
  quedan,
  totalCarrito,
  tramoActual,
} from './venta.js'

// Precio para enseñar: "Gratis" o el precio con gastos incluidos
function textoPrecio(precio) {
  return precio === 0 ? 'Gratis' : formatearPrecio(precioFinal(precio))
}

// Botones − n + para elegir cuántas
function Selector({ valor, max, onCambiar, nombre }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={() => onCambiar(valor - 1)}
        disabled={valor === 0}
        aria-label={`Quitar una de ${nombre}`}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-borde text-texto transition hover:border-acento disabled:opacity-30"
      >
        −
      </button>
      <span className="w-5 text-center font-bold text-texto" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        onClick={() => onCambiar(valor + 1)}
        disabled={valor >= max}
        aria-label={`Añadir una de ${nombre}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-acento font-bold text-fondo transition hover:brightness-110 disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}

// Tarjeta de una opción (lista o entrada) con su selector
function Opcion({ titulo, subtitulo, precio, etiqueta, desactivada, children }) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-borde bg-superficie p-4 ${desactivada ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="font-bold text-texto">{titulo}</span>
          {subtitulo && <span className="text-sm text-suave">{subtitulo}</span>}
          {etiqueta && <span className="text-xs font-semibold text-crema">{etiqueta}</span>}
        </div>
        <span className="shrink-0 text-lg font-extrabold text-texto">{precio}</span>
      </div>
      {children}
    </div>
  )
}

// Título de cada bloque
function Bloque({ titulo, ayuda, children }) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-suave">{titulo}</h2>
        {ayuda && <p className="text-xs text-suave">{ayuda}</p>}
      </div>
      {children}
    </section>
  )
}

// Pantalla: elegir listas, entradas (por tramos) y reservados para uno mismo y sus amigos.
// Solo aparece lo que el organizador ha publicado para ese evento.
function ElegirEntradas({ concierto, onContinuar, onVolver }) {
  const { listas, entradas, reservados, plano, mostrar } = opcionesVenta(concierto)
  // Cuántas de cada lista/entrada: { 'lista:lista-gratis': 2, 'entrada:general': 1 }
  const [cantidades, setCantidades] = useState({})
  const [mesaId, setMesaId] = useState(null)
  const [personasMesa, setPersonasMesa] = useState(0)

  const mesa = reservados.find((reservado) => reservado.id === mesaId) ?? null

  // Hora a la que cierra una lista: "01:00"
  function horaCierre(lista) {
    return cierreLista(concierto, lista).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  function cambiarCantidad(clave, valor) {
    setCantidades({ ...cantidades, [clave]: Math.max(0, valor) })
  }

  // Al elegir una mesa se proponen tantas personas como admite
  function elegirMesa(id) {
    setMesaId(id)
    setPersonasMesa(id ? reservados.find((reservado) => reservado.id === id).personas : 0)
  }

  // Monta el carrito con lo elegido (ver venta.js)
  function crearCarrito() {
    const lineas = []
    listas.forEach((lista) => {
      const cantidad = cantidades[`lista:${lista.id}`] ?? 0
      if (cantidad > 0)
        lineas.push({
          tipo: 'lista',
          nombre: lista.nombre,
          precio: lista.precio,
          cantidad,
          detalle: lista.incluye,
          aviso: `Válida entrando antes de las ${horaCierre(lista)}`,
        })
    })
    entradas.forEach((entrada) => {
      const cantidad = cantidades[`entrada:${entrada.id}`] ?? 0
      if (cantidad > 0)
        lineas.push({
          tipo: 'entrada',
          nombre: nombreEntrada(entrada),
          precio: precioEntrada(entrada),
          cantidad,
          detalle: entrada.incluye,
        })
    })
    return { lineas, reservado: mesa ? { ...mesa, personas: personasMesa } : null }
  }

  const carrito = crearCarrito()
  const personas = personasCarrito(carrito)

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col gap-6 px-5 pb-6 pt-4">
        <button type="button" onClick={onVolver} className="self-start text-suave hover:text-texto">
          ← Volver
        </button>
        <header>
          <h1 className="text-2xl font-extrabold text-texto">Elige tus entradas</h1>
          <p className="text-sm text-suave">
            {concierto.nombre} · {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
          </p>
          <p className="mt-1 text-xs text-suave">Puedes coger entradas para ti y tus amigos: cada uno tendrá su QR.</p>
        </header>

        {listas.length > 0 && (
          <Bloque titulo="Listas" ayuda="Con nombre y solo hasta la hora indicada.">
            {listas.map((lista) => {
              const abierta = listaAbierta(concierto, lista)
              const clave = `lista:${lista.id}`
              const hora = horaCierre(lista)
              return (
                <Opcion
                  key={lista.id}
                  titulo={lista.nombre}
                  subtitulo={lista.incluye}
                  precio={textoPrecio(lista.precio)}
                  etiqueta={abierta ? `⏰ Entrando antes de las ${hora}` : `Cerrada (era hasta las ${hora})`}
                  desactivada={!abierta}
                >
                  {abierta && (
                    <Selector
                      nombre={lista.nombre}
                      valor={cantidades[clave] ?? 0}
                      max={MAX_POR_OPCION}
                      onCambiar={(valor) => cambiarCantidad(clave, valor)}
                    />
                  )}
                </Opcion>
              )
            })}
          </Bloque>
        )}

        <Bloque titulo="Entradas" ayuda="Precio final con gastos de gestión incluidos.">
          {entradas.map((entrada) => {
            const precio = precioEntrada(entrada)
            const restantes = quedan(entrada)
            const tramo = tramoActual(entrada)
            const clave = `entrada:${entrada.id}`
            return (
              <Opcion
                key={entrada.id}
                titulo={entrada.nombre}
                subtitulo={entrada.incluye && `Incluye ${entrada.incluye}`}
                precio={precio === null ? 'Agotada' : textoPrecio(precio)}
                etiqueta={
                  precio !== null && mostrar.quedan && restantes !== null
                    ? `Quedan ${restantes} ${tramo ? `en ${tramo.nombre}` : ''}`
                    : null
                }
                desactivada={precio === null}
              >
                {entrada.tramos && mostrar.tramos && (
                  <ol className="flex gap-1.5 text-xs">
                    {entrada.tramos.map((t) => {
                      const agotado = t.vendidas >= t.cupo
                      const actual = t === tramo
                      return (
                        <li
                          key={t.nombre}
                          className={`flex flex-1 flex-col items-center rounded-lg px-1 py-1.5 ${
                            actual ? 'bg-acento text-fondo' : 'bg-fondo text-suave'
                          } ${agotado ? 'line-through opacity-60' : ''}`}
                        >
                          <span className="font-semibold">{t.nombre}</span>
                          <span>{formatearPrecio(precioFinal(t.precio))}</span>
                        </li>
                      )
                    })}
                  </ol>
                )}
                {precio !== null && (
                  <Selector
                    nombre={entrada.nombre}
                    valor={cantidades[clave] ?? 0}
                    max={Math.min(MAX_POR_OPCION, restantes ?? MAX_POR_OPCION)}
                    onCambiar={(valor) => cambiarCantidad(clave, valor)}
                  />
                )}
              </Opcion>
            )
          })}
        </Bloque>

        {reservados.length > 0 && (
          <Bloque titulo="Reservados" ayuda="Mesa para tu grupo con botella incluida. Una por compra.">
            {mostrar.mapa && plano ? (
              <PlanoSala plano={plano} mesas={reservados} elegida={mesaId} onElegir={elegirMesa} />
            ) : (
              <div className="flex flex-col gap-2">
                {reservados.map((reservado) => (
                  <button
                    key={reservado.id}
                    type="button"
                    disabled={reservado.ocupado}
                    onClick={() => elegirMesa(reservado.id === mesaId ? null : reservado.id)}
                    aria-pressed={reservado.id === mesaId}
                    className={`flex items-center justify-between rounded-2xl border p-3 text-left transition disabled:opacity-40 ${
                      reservado.id === mesaId ? 'border-acento bg-acento/10' : 'border-borde bg-superficie hover:border-acento'
                    }`}
                  >
                    <span className="flex flex-col">
                      <span className="font-bold text-texto">{reservado.nombre}</span>
                      <span className="text-xs text-suave">
                        {reservado.ocupado ? 'Ocupado' : `${reservado.zona} · hasta ${reservado.personas} personas`}
                      </span>
                    </span>
                    <span className="font-bold text-texto">{formatearPrecio(precioFinal(reservado.precio))}</span>
                  </button>
                ))}
              </div>
            )}

            {mesa ? (
              <div className="flex flex-col gap-3 rounded-2xl border border-acento bg-acento/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-texto">{mesa.nombre}</span>
                    <span className="text-sm text-suave">
                      {mesa.zona} · {mesa.incluye}
                    </span>
                  </div>
                  <span className="text-lg font-extrabold text-texto">{formatearPrecio(precioFinal(mesa.precio))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-suave">Personas (máx. {mesa.personas})</span>
                  <Selector
                    nombre="personas del reservado"
                    valor={personasMesa}
                    max={mesa.personas}
                    onCambiar={(valor) => setPersonasMesa(Math.max(1, valor))}
                  />
                </div>
              </div>
            ) : (
              mostrar.mapa && plano && <p className="text-center text-xs text-suave">Pulsa una mesa libre para ver su precio.</p>
            )}
          </Bloque>
        )}
      </div>

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-borde bg-fondo/95 px-5 py-3 backdrop-blur">
        <div className="flex flex-1 flex-col">
          <span className="text-xs text-suave">
            {personas} {personas === 1 ? 'persona' : 'personas'}
          </span>
          <span className="text-lg font-extrabold text-texto">{formatearPrecio(totalCarrito(carrito))}</span>
        </div>
        <button
          type="button"
          onClick={() => onContinuar(carrito)}
          disabled={personas === 0}
          className="rounded-2xl bg-acento px-6 py-3 font-bold text-fondo transition hover:brightness-110 disabled:opacity-30"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default ElegirEntradas
