import { eventos } from '../data/eventos.js'
import BuscadorLocal from './BuscadorLocal.jsx'
import ConcertCard from './ConcertCard.jsx'
import UbicacionSelector from './UbicacionSelector.jsx'
import { TODOS } from './formato.js'
import { DISTANCIA_MAX_KM, estaDentroDelRadio } from './distancia.js'
import { esEsteFinde, esHoy, esProximo } from './tiempo.js'

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

// Título pequeño de cada bloque de filtros
function Etiqueta({ children }) {
  return <h2 className="text-xs font-bold uppercase tracking-widest text-suave">{children}</h2>
}

// Pantalla 2: buscar eventos por local, fecha, distancia y estilo
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
  onLimpiar,
  favoritos,
  onCambiarFavorito,
  onElegir,
  onVerLocal,
}) {
  const resultados = eventos.filter(
    (evento) =>
      esProximo(evento) &&
      (local === TODOS || evento.sala === local) &&
      cumpleFecha(evento, cuando) &&
      (genero === TODOS || evento.genero === genero) &&
      estaDentroDelRadio(evento, radio, ubicacion),
  )
  const hayFiltros = local !== TODOS || cuando !== 'todas' || genero !== TODOS || radio !== DISTANCIA_MAX_KM

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-extrabold text-texto">¿Qué plan te apetece?</h1>
        <BuscadorLocal
          local={local}
          favoritos={favoritos}
          onCambiarLocal={onCambiarLocal}
          onCambiarFavorito={onCambiarFavorito}
          onVerLocal={onVerLocal}
        />
      </header>

      <section className="flex flex-col gap-2">
        <Etiqueta>Cuándo</Etiqueta>
        <div className="grid grid-cols-3 rounded-full border border-borde bg-superficie p-1" role="group">
          {Object.entries(CUANDO).map(([clave, texto]) => (
            <button
              key={clave}
              type="button"
              onClick={() => onCambiarCuando(clave)}
              aria-pressed={cuando === clave}
              className={`rounded-full py-2 text-sm font-semibold transition ${
                cuando === clave ? 'bg-acento text-fondo' : 'text-suave hover:text-texto'
              }`}
            >
              {texto}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <Etiqueta>Dónde</Etiqueta>
        <UbicacionSelector
          ubicacion={ubicacion}
          onCambiarUbicacion={onCambiarUbicacion}
          radio={radio}
          onCambiarRadio={onCambiarRadio}
        />
      </section>

      <section className="flex flex-col gap-2">
        <Etiqueta>Estilo</Etiqueta>
        {/* Una sola fila que se desliza; -mx-5/px-5 para que llegue al borde de la pantalla */}
        <div className="sin-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          {GENEROS.map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() => onCambiarGenero(opcion)}
              aria-pressed={genero === opcion}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                genero === opcion
                  ? 'border-acento bg-acento text-fondo'
                  : 'border-borde text-suave hover:border-suave hover:text-texto'
              }`}
            >
              {opcion}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between border-t border-borde pt-4">
          <p className="font-bold text-texto">
            {resultados.length} {resultados.length === 1 ? 'evento' : 'eventos'}
          </p>
          {hayFiltros && (
            <button type="button" onClick={onLimpiar} className="text-sm font-semibold text-acento hover:underline">
              Limpiar filtros
            </button>
          )}
        </div>
        {resultados.length === 0 && (
          <p className="rounded-2xl border border-dashed border-borde p-6 text-center text-sm text-suave">
            No hay eventos con estos filtros.
            <br />
            Prueba con otro día, más distancia u otro estilo.
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
