import { etiquetaTipo, iconoLocal } from '../data/salas.js'
import { textoDesde } from './venta.js'
import { distanciaAConcierto, formatearDistancia } from './distancia.js'
import { etiquetaFecha } from './tiempo.js'

// Tarjeta de un evento en las listas (inicio y búsqueda)
function ConcertCard({ concierto, ubicacion, onElegir }) {
  const distancia = distanciaAConcierto(concierto, ubicacion)
  const fecha = etiquetaFecha(concierto.fecha)
  const esPronto = fecha === 'Hoy' || fecha === 'Mañana'

  return (
    <button
      type="button"
      onClick={() => onElegir(concierto)}
      className="group flex w-full gap-3 rounded-2xl border border-borde bg-superficie p-2 text-left transition hover:border-acento"
    >
      <img src={concierto.imagen} alt="" className="h-24 w-24 shrink-0 rounded-xl object-cover object-left" />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 pr-1">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span
            className={`rounded-full px-2 py-0.5 uppercase ${esPronto ? 'bg-acento text-fondo' : 'bg-fondo text-crema'}`}
          >
            {fecha} · {concierto.hora}
          </span>
          <span className="truncate text-suave">{concierto.genero}</span>
        </div>
        <span className="truncate font-bold text-texto group-hover:text-acento">{concierto.nombre}</span>
        <span className="truncate text-sm text-suave">
          {iconoLocal(concierto.sala)} {concierto.sala}
          {distancia !== null && ` · ${formatearDistancia(distancia)}`}
        </span>
        <div className="flex items-center justify-between">
          <span className="text-xs text-suave">{etiquetaTipo(concierto.sala)}</span>
          <span className="font-bold text-texto">{textoDesde(concierto)}</span>
        </div>
      </div>
    </button>
  )
}

export default ConcertCard
