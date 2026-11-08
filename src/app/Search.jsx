import { conciertos } from '../data/conciertos.js'
import { UBICACION_EJEMPLO } from '../data/salas.js'
import ConcertCard from './ConcertCard.jsx'
import { TODOS } from './formato.js'
import { RADIOS, estaDentroDelRadio } from './distancia.js'

// ---------- Constantes ----------
// Lista de géneros sin repetir, sacada de los conciertos
const GENEROS = [TODOS, ...new Set(conciertos.map((concierto) => concierto.genero))]

// Botón de filtro con forma de pastilla (género o distancia)
function Chip({ activo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        activo ? 'border-acento bg-acento text-fondo' : 'border-borde text-suave hover:text-texto'
      }`}
    >
      {children}
    </button>
  )
}

// Pantalla 2: buscar conciertos filtrando por tipo de música y por distancia
function Search({ genero, onCambiarGenero, radio, onCambiarRadio, onElegir }) {
  const resultados = conciertos.filter(
    (concierto) => (genero === TODOS || concierto.genero === genero) && estaDentroDelRadio(concierto, radio),
  )

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="pt-4 text-2xl font-extrabold text-texto">¿Qué te apetece escuchar?</h1>

      <div className="flex flex-wrap gap-2">
        {GENEROS.map((opcion) => (
          <Chip key={opcion} activo={genero === opcion} onClick={() => onCambiarGenero(opcion)}>
            {opcion}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-suave">📍 Cerca de {UBICACION_EJEMPLO.nombre} (ubicación de ejemplo)</p>
        <div className="flex flex-wrap gap-2">
          {RADIOS.map((opcion) => (
            <Chip key={opcion.texto} activo={radio === opcion.km} onClick={() => onCambiarRadio(opcion.km)}>
              {opcion.texto}
            </Chip>
          ))}
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
