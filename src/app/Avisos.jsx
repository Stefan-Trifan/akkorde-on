import { ubicacionDe } from '../data/salas.js'
import { etiquetaFecha } from './tiempo.js'

// Pantalla «Avisos»: conciertos anunciados que cumplen algún «Avísame si viene», el más nuevo arriba.
// Al pulsar uno se abre la ficha del concierto
function Avisos({ avisos, onElegir, onVolver }) {
  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-8">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-superficie text-texto hover:bg-borde"
        >
          ←
        </button>
        <h1 className="text-2xl font-extrabold text-texto">🔔 Avisos</h1>
      </header>

      {avisos.length === 0 && (
        <p className="rounded-2xl border border-dashed border-borde p-6 text-center text-sm text-suave">
          Aún no tienes avisos.
          <br />
          Entra en la ficha de una artista y activa «Avísame si viene»: te diremos cuándo toca cerca.
        </p>
      )}

      {avisos.map(({ id, concierto, motivo }) => (
        <button
          key={id}
          type="button"
          onClick={() => onElegir(concierto)}
          className="group flex gap-3 rounded-2xl border border-borde bg-superficie p-2 text-left transition hover:border-acento"
        >
          <img src={concierto.imagen} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover object-left" />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 pr-1">
            <span className="truncate font-bold text-texto group-hover:text-acento">
              {concierto.nombre} anuncia concierto
            </span>
            <span className="truncate text-sm text-suave">
              {etiquetaFecha(concierto.fecha)} · {concierto.sala}, {ubicacionDe(concierto.sala).municipio}
            </span>
            <span className="truncate text-xs font-semibold text-acento">🔔 {motivo}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Avisos
