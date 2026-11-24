import BotonFavorito from '../components/BotonFavorito.jsx'
import { COMUNIDAD_MADRID } from '../data/comunidades.js'
import { conciertosFuera, eventos, proximosDe } from '../data/eventos.js'
import { ubicacionDe } from '../data/salas.js'
import ConcertCard from './ConcertCard.jsx'
import { textoDesde } from './venta.js'
import { etiquetaFecha } from './tiempo.js'

// Título pequeño de cada bloque
function Titulo({ children }) {
  return <h2 className="text-xs font-bold uppercase tracking-widest text-suave">{children}</h2>
}

// Fila de una fecha de la gira fuera de la Comunidad de Madrid: ciudad, comunidad y sala
function FechaGira({ concierto, onElegir }) {
  const { municipio, comunidad } = ubicacionDe(concierto.sala)
  return (
    <button
      type="button"
      onClick={() => onElegir(concierto)}
      className="group flex items-center gap-3 rounded-2xl border border-borde bg-superficie p-3 text-left transition hover:border-acento"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-semibold uppercase text-suave">
          {etiquetaFecha(concierto.fecha)} · {concierto.hora}
        </span>
        <span className="truncate font-bold text-texto group-hover:text-acento">
          📍 {municipio} <span className="font-normal text-suave">· {comunidad}</span>
        </span>
        <span className="truncate text-sm text-suave">🎤 {concierto.sala}</span>
      </div>
      <span className="shrink-0 font-bold text-texto">{textoDesde(concierto)}</span>
    </button>
  )
}

// Pantalla: ficha de una artista con sus conciertos en la Comunidad de Madrid y su gira fuera.
// extra = conciertos que se han anunciado durante la demo (ver «Avísame si viene»)
function ArtistDetail({
  artista,
  ubicacion,
  extra = [],
  esFavorita,
  onCambiarFavorita,
  onElegir,
  onVolver,
  children,
}) {
  const todos = proximosDe(artista.nombre, [...eventos, ...conciertosFuera, ...extra])
  const enMadrid = todos.filter((concierto) => ubicacionDe(concierto.sala).comunidad === COMUNIDAD_MADRID)
  const fuera = todos.filter((concierto) => ubicacionDe(concierto.sala).comunidad !== COMUNIDAD_MADRID)

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={artista.imagen} alt={`Cartel de ${artista.nombre}`} className="aspect-[8/5] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-fondo via-transparent to-transparent" />
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-fondo/70 text-texto backdrop-blur hover:bg-fondo"
        >
          ←
        </button>
        <BotonFavorito
          activo={esFavorita}
          nombre={artista.nombre}
          onCambiar={onCambiarFavorita}
          className="absolute right-3 top-3 backdrop-blur"
        />
      </div>

      <div className="flex flex-col gap-6 px-5 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-acento">🎤 {artista.genero}</span>
          <h1 className="text-3xl font-extrabold text-texto">{artista.nombre}</h1>
          {/* Artistas reales, conciertos inventados: se dice claramente */}
          <p className="mt-2 text-xs text-suave">Demo: fechas, salas y precios de ejemplo, no anunciados de verdad.</p>
        </div>

        <button
          type="button"
          onClick={onCambiarFavorita}
          aria-pressed={esFavorita}
          className={`rounded-2xl border py-3 font-bold transition ${
            esFavorita
              ? 'border-pink-500/60 bg-pink-500/15 text-pink-400'
              : 'border-borde bg-superficie text-texto hover:border-pink-500/60'
          }`}
        >
          {esFavorita ? '♥ Siguiendo · sus conciertos salen en Inicio' : '♡ Seguir'}
        </button>

        {/* «Avísame si viene» (lo pone AppView) */}
        {children}

        <section className="flex flex-col gap-3">
          <Titulo>Próximos en la Comunidad de Madrid · {enMadrid.length}</Titulo>
          {enMadrid.length === 0 && (
            <p className="rounded-2xl border border-dashed border-borde p-6 text-center text-sm text-suave">
              {artista.nombre} no tiene conciertos próximos por aquí.
            </p>
          )}
          {enMadrid.map((concierto) => (
            <ConcertCard key={concierto.id} concierto={concierto} ubicacion={ubicacion} onElegir={onElegir} />
          ))}
        </section>

        {fuera.length > 0 && (
          <section className="flex flex-col gap-3">
            <Titulo>De gira por España · {fuera.length}</Titulo>
            {fuera.map((concierto) => (
              <FechaGira key={concierto.id} concierto={concierto} onElegir={onElegir} />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default ArtistDetail
