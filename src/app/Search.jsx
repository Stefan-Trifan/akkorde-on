import { cartelDe, eventos } from '../data/eventos.js'
import { TIPO_DISCOTECA, salas } from '../data/salas.js'
import Buscador from './Buscador.jsx'
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
// Opciones del filtro por tipo de plan (concierto en sala o fiesta en discoteca)
const QUE = { todo: 'Todo', conciertos: '🎤 Conciertos', fiestas: '🪩 Fiestas' }

// ¿Cae el evento en la fecha elegida?
function cumpleFecha(evento, cuando) {
  if (cuando === 'hoy') return esHoy(evento)
  if (cuando === 'finde') return esEsteFinde(evento)
  return true
}

// ¿Es el evento del tipo de plan elegido? Las fiestas son las de discoteca; lo demás, conciertos
function cumpleTipo(evento, tipoPlan) {
  const esFiesta = salas[evento.sala]?.tipo === TIPO_DISCOTECA
  if (tipoPlan === 'conciertos') return !esFiesta
  if (tipoPlan === 'fiestas') return esFiesta
  return true
}

// Palabra para el recuento de resultados según el tipo de plan
function textoRecuento(numero, tipoPlan) {
  if (tipoPlan === 'conciertos') return numero === 1 ? 'concierto' : 'conciertos'
  if (tipoPlan === 'fiestas') return numero === 1 ? 'fiesta' : 'fiestas'
  return numero === 1 ? 'evento' : 'eventos'
}

// Título pequeño de cada bloque de filtros
function Etiqueta({ children }) {
  return <h2 className="text-xs font-bold uppercase tracking-widest text-suave">{children}</h2>
}

// Botones de una sola opción, en una píldora (para «Qué» y «Cuándo»)
function Segmentos({ opciones, valor, onCambiar }) {
  return (
    <div className="grid grid-cols-3 rounded-full border border-borde bg-superficie p-1" role="group">
      {Object.entries(opciones).map(([clave, texto]) => (
        <button
          key={clave}
          type="button"
          onClick={() => onCambiar(clave)}
          aria-pressed={valor === clave}
          className={`rounded-full py-2 text-sm font-semibold transition ${
            valor === clave ? 'bg-acento text-fondo' : 'text-suave hover:text-texto'
          }`}
        >
          {texto}
        </button>
      ))}
    </div>
  )
}

// Pantalla 2: buscar eventos por tipo de plan, artista, local, fecha, distancia y estilo
function Search({
  tipoPlan,
  onCambiarTipoPlan,
  artista,
  onCambiarArtista,
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
  artistasFavoritos,
  onCambiarArtistaFavorito,
  onElegir,
  onVerLocal,
  onVerArtista,
}) {
  const resultados = eventos.filter(
    (evento) =>
      esProximo(evento) &&
      cumpleTipo(evento, tipoPlan) &&
      (artista === TODOS || cartelDe(evento).includes(artista)) &&
      (local === TODOS || evento.sala === local) &&
      cumpleFecha(evento, cuando) &&
      (genero === TODOS || evento.genero === genero) &&
      estaDentroDelRadio(evento, radio, ubicacion),
  )
  const hayFiltros =
    tipoPlan !== 'todo' ||
    artista !== TODOS ||
    local !== TODOS ||
    cuando !== 'todas' ||
    genero !== TODOS ||
    radio !== DISTANCIA_MAX_KM

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-extrabold text-texto">¿Qué plan te apetece?</h1>
        <Buscador
          local={local}
          artista={artista}
          favoritos={favoritos}
          artistasFavoritos={artistasFavoritos}
          onCambiarLocal={onCambiarLocal}
          onCambiarArtista={onCambiarArtista}
          onCambiarFavorito={onCambiarFavorito}
          onCambiarArtistaFavorito={onCambiarArtistaFavorito}
          onVerLocal={onVerLocal}
          onVerArtista={onVerArtista}
        />
      </header>

      <section className="flex flex-col gap-2">
        <Etiqueta>Qué</Etiqueta>
        <Segmentos opciones={QUE} valor={tipoPlan} onCambiar={onCambiarTipoPlan} />
      </section>

      <section className="flex flex-col gap-2">
        <Etiqueta>Cuándo</Etiqueta>
        <Segmentos opciones={CUANDO} valor={cuando} onCambiar={onCambiarCuando} />
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
            {resultados.length} {textoRecuento(resultados.length, tipoPlan)}
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
            Prueba con otro día, más distancia, otro estilo u otra artista.
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
