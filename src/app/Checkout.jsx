import { useState } from 'react'
import { formatearFecha, formatearPrecio, precioFinal } from './formato.js'
import { personasCarrito, plazasDelCarrito, totalCarrito } from './venta.js'

// Pantalla 4: resumen del carrito, nombre de cada asistente y pago simulado
// (no se paga de verdad ni se piden datos de tarjeta)
function Checkout({ concierto, carrito, onPagar, onVerEntradas, onVolver }) {
  const [pagado, setPagado] = useState(false)
  const plazas = plazasDelCarrito(carrito)
  // Nombre de cada asistente, en el mismo orden que las plazas
  const [nombres, setNombres] = useState(() => plazas.map(() => ''))

  const total = totalCarrito(carrito)
  const personas = personasCarrito(carrito)
  // Las listas y los reservados van a nombre de cada persona
  const faltanNombres = plazas.some((plaza, i) => plaza.nominal && nombres[i].trim() === '')

  function cambiarNombre(indice, valor) {
    setNombres(nombres.map((nombre, i) => (i === indice ? valor : nombre)))
  }

  // Simula el pago: crea una entrada por persona y enseña la confirmación
  function pagar() {
    onPagar(
      plazas.map((plaza, i) => ({
        ...plaza,
        asistente: nombres[i].trim() || (i === 0 ? 'Tú' : `Invitado ${i + 1}`),
      })),
    )
    setPagado(true)
  }

  if (pagado) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-exito text-4xl text-fondo">✓</div>
        <h1 className="text-2xl font-extrabold text-texto">¡Compra hecha!</h1>
        <p className="text-suave">
          {personas === 1 ? 'Tu entrada' : `Las ${personas} entradas`} para {concierto.nombre}{' '}
          {personas === 1 ? 'ya está' : 'ya están'} en tu móvil. Cada una tiene su QR y puedes enviársela a quien vaya.
        </p>
        <button
          type="button"
          onClick={onVerEntradas}
          className="w-full rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110"
        >
          Ver mis entradas
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 px-5 pb-8 pt-4">
      <button type="button" onClick={onVolver} className="self-start text-suave hover:text-texto">
        ← Volver
      </button>
      <h1 className="text-2xl font-extrabold text-texto">Confirma tu compra</h1>

      <div className="rounded-2xl border border-borde bg-superficie p-4">
        <p className="font-bold text-texto">{concierto.nombre}</p>
        <p className="text-sm text-suave">
          {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
        </p>
        <ul className="mt-3 flex flex-col gap-1 border-t border-borde pt-3 text-sm text-suave">
          {carrito.lineas.map((linea) => (
            <li key={linea.nombre} className="flex justify-between gap-2">
              <span>
                {linea.cantidad} × {linea.nombre}
              </span>
              <span>{formatearPrecio(precioFinal(linea.precio) * linea.cantidad)}</span>
            </li>
          ))}
          {carrito.reservado && (
            <li className="flex justify-between gap-2">
              <span>
                Reservado {carrito.reservado.nombre} ({carrito.reservado.personas} personas)
              </span>
              <span>{formatearPrecio(precioFinal(carrito.reservado.precio))}</span>
            </li>
          )}
        </ul>
        <p className="mt-3 flex justify-between border-t border-borde pt-3 font-bold text-texto">
          <span>Total · gastos incluidos</span>
          <span>{formatearPrecio(total)}</span>
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-suave">¿Quién va?</h2>
          <p className="text-xs text-suave">
            Cada persona tendrá su propia entrada con QR. En listas y reservados el nombre es obligatorio.
          </p>
        </div>
        {plazas.map((plaza, i) => (
          <label key={i} className="flex flex-col gap-1">
            <span className="text-xs text-suave">
              Persona {i + 1} · {plaza.opcion}
              {plaza.nominal && <span className="text-acento"> *</span>}
            </span>
            <input
              type="text"
              value={nombres[i]}
              onChange={(evento) => cambiarNombre(i, evento.target.value)}
              placeholder={i === 0 ? 'Tu nombre' : 'Nombre y apellido'}
              required={plaza.nominal}
              className="rounded-xl border border-borde bg-superficie px-3 py-2 text-texto placeholder:text-suave focus:border-acento focus:outline-none"
            />
          </label>
        ))}
      </section>

      <p className="text-xs text-suave">Demo: no se realiza ningún pago real.</p>

      <button
        type="button"
        onClick={pagar}
        disabled={faltanNombres}
        className="rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110 disabled:opacity-30"
      >
        {faltanNombres
          ? 'Rellena los nombres obligatorios'
          : total === 0
            ? 'Apuntarme gratis'
            : `Pagar ${formatearPrecio(total)}`}
      </button>
    </div>
  )
}

export default Checkout
