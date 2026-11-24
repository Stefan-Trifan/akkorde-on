import { eventos } from '../data/eventos.js'
import { NOMBRES_DISCOTECAS, NOMBRES_SALAS } from '../data/salas.js'
import ConcertCard from './ConcertCard.jsx'
import UbicacionSelector from './UbicacionSelector.jsx'
import { TODOS } from './formato.js'
import { DISTANCIA_MAX_KM, DISTANCIA_MIN_KM, PASO_KM, estaDentroDelRadio, formatearDistancia } from './distancia.js'
import { esEsteFinde, esHoy } from './tiempo.js'

// ---------- Constantes ----------
// Lista de géneros sin repetir, sacada de los eventos
const GENEROS = [TODOS, ...new Set(eventos.map((evento) => evento.genero))]
// Opciones del filtro por fecha
const CUANDO = { todas: 'Cualquier día', hoy: 'Hoy', finde: 'Este finde' }

// ¿Cae el evento en la fecha elegida?
function cumpleFecha(evento, cuando) {
  if (cuando === 'hoy') return esHoy(evento)
  if (cuando === 'finde') return esEsteFinde(evento)
  return true
}

// Botón redondo de filtro (género o fecha)
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

// Pantalla 2: buscar eventos filtrando por local, fecha, tipo de música y distancia
function Search({
  genero,
  onCambiarGenero,
  radio,
  onCambiarRadio,
  ubicacion,
  onCambiarUbicacion,
  local,
  onCambiarLocal,
  cuando,
  onCambiarCuando,
  onElegir,
  onVerLocal,
}) {
  const resultados = eventos.filter(
    (evento) =>
      (local === TODOS || evento.sala === local) &&
      cumpleFecha(evento, cuando) &&
      (genero === TODOS || evento.genero === genero) &&
      estaDentroDelRadio(evento, radio, ubicacion),
  )

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="pt-4 text-2xl font-extrabold text-texto">¿Qué plan te apetece?</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="local" className="text-sm text-suave">
          Sala o discoteca
        </label>
        <select
          id="local"
          value={local}
          onChange={(evento) => onCambiarLocal(evento.target.value)}
          className="rounded-2xl border border-borde bg-superficie px-3 py-2 text-texto"
        >
          <option value={TODOS}>Todos los locales</option>
          <optgroup label="Discotecas">
            {NOMBRES_DISCOTECAS.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </optgroup>
          <optgroup label="Salas de conciertos">
            {NOMBRES_SALAS.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </optgroup>
        </select>
        {local !== TODOS && (
          <button
            type="button"
            onClick={() => onVerLocal(local)}
            className="self-start text-sm font-semibold text-acento hover:underline"
          >
            Ver ficha y todos los eventos de {local} →
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(CUANDO).map(([clave, texto]) => (
          <Chip key={clave} activo={cuando === clave} onClick={() => onCambiarCuando(clave)}>
            {texto}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {GENEROS.map((opcion) => (
          <Chip key={opcion} activo={genero === opcion} onClick={() => onCambiarGenero(opcion)}>
            {opcion}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-borde bg-superficie p-4">
        <UbicacionSelector ubicacion={ubicacion} onCambiarUbicacion={onCambiarUbicacion} />
        <label htmlFor="distancia" className="flex justify-between pt-2 text-sm text-suave">
          <span>Distancia desde {ubicacion.nombre}</span>
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
          {resultados.length} {resultados.length === 1 ? 'evento' : 'eventos'}
        </p>
        {resultados.length === 0 && (
          <p className="rounded-2xl border border-borde p-4 text-sm text-suave">
            No hay eventos con estos filtros. Prueba con otro día, más distancia u otro estilo.
          </p>
        )}
        {resultados.map((evento) => (
          <ConcertCard key={evento.id} concierto={evento} ubicacion={ubicacion} onElegir={onElegir} />
        ))}
      </section>
    </div>
  )
}

export default Search
