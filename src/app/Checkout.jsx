import { useState } from 'react'
import { formatearFecha, formatearPrecio, precioFinal } from './formato.js'

// Pantalla 4: compra simulada (no se paga de verdad ni se piden datos de tarjeta)
function Checkout({ concierto, onPagar, onVerEntrada, onVolver }) {
  const [pagado, setPagado] = useState(false)

  // Simula el pago: guarda la entrada y enseña la confirmación
  function pagar() {
    onPagar()
    setPagado(true)
  }

  if (pagado) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-exito text-4xl text-fondo">✓</div>
        <h1 className="text-2xl font-extrabold text-texto">¡Compra hecha!</h1>
        <p className="text-suave">Tu entrada para {concierto.nombre} ya está en tu móvil.</p>
        <button
          type="button"
          onClick={onVerEntrada}
          className="w-full rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110"
        >
          Ver mi entrada
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <button type="button" onClick={onVolver} className="self-start pt-4 text-suave hover:text-texto">
        ← Volver
      </button>
      <h1 className="text-2xl font-extrabold text-texto">Confirma tu compra</h1>

      <div className="rounded-2xl border border-borde bg-superficie p-4">
        <p className="font-bold text-texto">{concierto.nombre}</p>
        <p className="text-sm text-suave">
          {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
        </p>
        <p className="mt-3 flex justify-between border-t border-borde pt-3 font-bold text-texto">
          <span>1 entrada</span>
          <span>{formatearPrecio(precioFinal(concierto.precio))}</span>
        </p>
      </div>

      <p className="text-xs text-suave">Demo: no se realiza ningún pago real.</p>

      <button
        type="button"
        onClick={pagar}
        className="rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110"
      >
        Pagar {formatearPrecio(precioFinal(concierto.precio))}
      </button>
    </div>
  )
}

export default Checkout
