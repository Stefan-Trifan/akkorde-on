import { formatearFecha, formatearPrecio, precioFinal } from './formato.js'
import { distanciaAConcierto, formatearDistancia } from './distancia.js'

// Tarjeta de un concierto en las listas (inicio y búsqueda)
function ConcertCard({ concierto, onElegir }) {
  const distancia = distanciaAConcierto(concierto)

  return (
    <button
      type="button"
      onClick={() => onElegir(concierto)}
      className="flex w-full overflow-hidden rounded-2xl border border-borde bg-superficie text-left transition hover:border-acento"
    >
      <img src={concierto.imagen} alt="" className="h-24 w-28 shrink-0 object-cover object-left" />
      <div className="flex flex-1 flex-col justify-center gap-0.5 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-acento">{concierto.genero}</span>
        <span className="font-bold text-texto">{concierto.nombre}</span>
        <span className="text-sm text-suave">
          {concierto.sala} · {formatearFecha(concierto.fecha)}
          {distancia !== null && ` · ${formatearDistancia(distancia)}`}
        </span>
        <span className="text-sm font-semibold text-texto">{formatearPrecio(precioFinal(concierto.precio))}</span>
      </div>
    </button>
  )
}

export default ConcertCard
