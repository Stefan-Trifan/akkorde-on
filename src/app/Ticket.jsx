import { QRCodeSVG } from 'qrcode.react'
import { formatearFecha, formatearPrecio, precioFinal } from './formato.js'

// Pantalla 5: la entrada comprada con su código QR único
function Ticket({ entrada, onBuscar }) {
  if (!entrada) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-suave">Todavía no tienes entradas.</p>
        <button type="button" onClick={onBuscar} className="font-bold text-acento">
          Buscar conciertos
        </button>
      </div>
    )
  }

  const { concierto, codigo } = entrada

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="pt-4 text-2xl font-extrabold text-texto">Mi entrada</h1>

      <article className="overflow-hidden rounded-3xl bg-texto text-fondo">
        <img src={concierto.imagen} alt="" className="aspect-[8/3] w-full object-cover" />
        <div className="flex flex-col items-center gap-3 p-5">
          <div className="text-center">
            <p className="text-xl font-extrabold">{concierto.nombre}</p>
            <p className="text-sm">
              {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
            </p>
          </div>
          <QRCodeSVG value={codigo} size={176} />
          <p className="font-mono text-xs">{codigo}</p>
          <p className="text-xs">Pagado: {formatearPrecio(precioFinal(concierto.precio))} · válida una sola vez</p>
        </div>
      </article>

      <p className="text-center text-xs text-suave">
        Enséñala en la puerta. Si no puedes ir, revéndela al mismo precio que pagaste.
      </p>
      <p className="text-center text-xs text-suave">Demo: no es una entrada real.</p>
    </div>
  )
}

export default Ticket
