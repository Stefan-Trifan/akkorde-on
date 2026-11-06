import { conciertos } from '../data/conciertos.js'
import ConcertCard from './ConcertCard.jsx'
import { TODOS } from './formato.js'

// ---------- Constantes ----------
// Lista de géneros sin repetir, sacada de los conciertos
const GENEROS = [TODOS, ...new Set(conciertos.map((concierto) => concierto.genero))]

// Pantalla 2: buscar conciertos filtrando por tipo de música
function Search({ genero, onCambiarGenero, onElegir }) {
  const resultados = genero === TODOS ? conciertos : conciertos.filter((concierto) => concierto.genero === genero)

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

      <section className="flex flex-col gap-3">
        <p className="text-sm text-suave">
          {resultados.length} {resultados.length === 1 ? 'concierto' : 'conciertos'} en Madrid
        </p>
        {resultados.map((concierto) => (
          <ConcertCard key={concierto.id} concierto={concierto} onElegir={onElegir} />
        ))}
      </section>
    </div>
  )
}

export default Search
