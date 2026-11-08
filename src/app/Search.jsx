import { eventos } from '../data/eventos.js'
import { UBICACION_EJEMPLO } from '../data/salas.js'
import ConcertCard from './ConcertCard.jsx'
import { TODOS } from './formato.js'
import { DISTANCIA_MAX_KM, DISTANCIA_MIN_KM, PASO_KM, estaDentroDelRadio, formatearDistancia } from './distancia.js'

// ---------- Constantes ----------
// Lista de géneros sin repetir, sacada de los conciertos
const GENEROS = [TODOS, ...new Set(eventos.map((concierto) => concierto.genero))]

// Pantalla 2: buscar conciertos filtrando por tipo de música y por distancia
function Search({ genero, onCambiarGenero, radio, onCambiarRadio, onElegir }) {
  const resultados = eventos.filter(
    (concierto) => (genero === TODOS || concierto.genero === genero) && estaDentroDelRadio(concierto, radio),
  )

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="pt-4 text-2xl font-extrabold text-texto">¿Qué te apetece escuchar?</h1>

      <div className="flex flex-wrap gap-2">
        {GENEROS.map((opcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => onCambiarGenero(opcion)}
            aria-pressed={genero === opcion}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              genero === opcion ? 'border-acento bg-acento text-fondo' : 'border-borde text-suave hover:text-texto'
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-borde bg-superficie p-4">
        <label htmlFor="distancia" className="flex justify-between text-sm text-suave">
          <span>📍 Cerca de {UBICACION_EJEMPLO.nombre} (ubicación de ejemplo)</span>
          <span className="shrink-0 whitespace-nowrap pl-2 font-bold text-acento">Hasta {formatearDistancia(radio)}</span>
        </label>
        <input
          id="distancia"
          type="range"
          min={DISTANCIA_MIN_KM}
          max={DISTANCIA_MAX_KM}
          step={PASO_KM}
          value={radio}
          onChange={(evento) => onCambiarRadio(Number(evento.target.value))}
          className="w-full accent-acento"
        />
        <div className="flex justify-between text-xs text-suave">
          <span>{formatearDistancia(DISTANCIA_MIN_KM)}</span>
          <span>{formatearDistancia(DISTANCIA_MAX_KM)}</span>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <p className="text-sm text-suave">
          {resultados.length} {resultados.length === 1 ? 'concierto' : 'conciertos'}
        </p>
        {resultados.length === 0 && (
          <p className="rounded-2xl border border-borde p-4 text-sm text-suave">
            No hay conciertos con estos filtros. Prueba con más distancia u otro estilo.
          </p>
        )}
        {resultados.map((concierto) => (
          <ConcertCard key={concierto.id} concierto={concierto} onElegir={onElegir} />
        ))}
      </section>
    </div>
  )
}

export default Search
