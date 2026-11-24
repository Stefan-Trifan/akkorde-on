import { useState } from 'react'
import BotonFavorito from '../components/BotonFavorito.jsx'
import { artistaPorNombre } from '../data/artistas.js'
import { cartelDe, eventos } from '../data/eventos.js'
import { NOMBRES_DISCOTECAS, NOMBRES_SALAS, iconoLocal, salas } from '../data/salas.js'
import { TODOS } from './formato.js'
import { esProximo } from './tiempo.js'

// ---------- Constantes ----------
const LOCALES = [...NOMBRES_DISCOTECAS, ...NOMBRES_SALAS]
// Artistas y DJs de los eventos próximos, sin repetir y por orden alfabético
const ARTISTAS = [...new Set(eventos.filter((evento) => esProximo(evento)).flatMap(cartelDe))].sort((a, b) =>
  a.localeCompare(b, 'es'),
)

// Quita tildes y mayúsculas para comparar: "Café" → "cafe"
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Qué es cada nombre del cartel: el estilo si es una artista del catálogo; si no, un DJ
function etiquetaArtista(nombre) {
  return artistaPorNombre(nombre)?.genero ?? 'DJ'
}

// Filtro ya elegido: tarjeta con icono, nombre, lo que se pase dentro y botón para quitarlo
function Elegido({ icono, nombre, onQuitar, children }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-acento/60 bg-acento/10 p-3">
      <span className="text-2xl" aria-hidden="true">
        {icono}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-bold text-texto">{nombre}</span>
        {children}
      </div>
      <button
        type="button"
        onClick={onQuitar}
        aria-label={`Quitar ${nombre}`}
        className="flex h-8 w-8 items-center justify-center rounded-full text-suave hover:bg-superficie hover:text-texto"
      >
        ✕
      </button>
    </div>
  )
}

// Una fila de la lista de sugerencias
function Sugerencia({ icono, nombre, detalle, onElegir }) {
  return (
    <li>
      <button
        type="button"
        // onMouseDown para elegir antes de que el campo pierda el foco y se cierre la lista
        onMouseDown={(evento) => {
          evento.preventDefault()
          onElegir(nombre)
        }}
        className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-fondo"
      >
        <span aria-hidden="true">{icono}</span>
        <span className="flex-1 text-texto">{nombre}</span>
        <span className="text-xs text-suave">{detalle}</span>
      </button>
    </li>
  )
}

// Título de cada grupo de sugerencias
function Grupo({ children }) {
  return <li className="px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-suave">{children}</li>
}

// Campo para buscar una artista (o DJ) y una sala o discoteca escribiendo su nombre.
// Al enfocarlo se ve todo; al escribir se va filtrando. Lo elegido se queda como tarjeta encima.
function Buscador({
  local,
  artista,
  favoritos = [],
  onCambiarLocal,
  onCambiarArtista,
  onCambiarFavorito,
  onVerLocal,
  onVerArtista,
}) {
  const [texto, setTexto] = useState('')
  const [abierto, setAbierto] = useState(false)

  // Solo se sugiere lo que aún no está elegido
  const coincide = (nombre) => normalizar(nombre).includes(normalizar(texto))
  const artistas = artista === TODOS ? ARTISTAS.filter(coincide) : []
  const locales = local === TODOS ? LOCALES.filter(coincide) : []
  const todoElegido = artista !== TODOS && local !== TODOS

  let placeholder = '🔍  Busca artista, sala o discoteca'
  if (artista !== TODOS) placeholder = '🔍  Busca una sala o discoteca'
  if (local !== TODOS) placeholder = '🔍  Busca una artista o DJ'

  function elegir(cambiar, nombre) {
    cambiar(nombre)
    setTexto('')
    setAbierto(false)
  }

  return (
    <div className="flex flex-col gap-2">
      {artista !== TODOS && (
        <Elegido icono="🎤" nombre={artista} onQuitar={() => onCambiarArtista(TODOS)}>
          {artistaPorNombre(artista) ? (
            <button
              type="button"
              onClick={() => onVerArtista(artistaPorNombre(artista))}
              className="self-start text-sm font-semibold text-acento hover:underline"
            >
              {etiquetaArtista(artista)} · ver artista →
            </button>
          ) : (
            <span className="text-sm text-suave">{etiquetaArtista(artista)}</span>
          )}
        </Elegido>
      )}

      {local !== TODOS && (
        <Elegido icono={iconoLocal(local)} nombre={local} onQuitar={() => onCambiarLocal(TODOS)}>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onVerLocal(local)}
              className="text-sm font-semibold text-acento hover:underline"
            >
              Ver ficha y agenda →
            </button>
            <BotonFavorito
              activo={favoritos.includes(local)}
              nombre={local}
              onCambiar={() => onCambiarFavorito(local)}
            />
          </div>
        </Elegido>
      )}

      {!todoElegido && (
        <div className="relative">
          <label htmlFor="buscador" className="sr-only">
            {placeholder}
          </label>
          <input
            id="buscador"
            type="search"
            value={texto}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(evento) => {
              setTexto(evento.target.value)
              setAbierto(true)
            }}
            onFocus={() => setAbierto(true)}
            onBlur={() => setAbierto(false)}
            className="w-full rounded-2xl border border-borde bg-superficie px-4 py-3 text-texto placeholder:text-suave focus:border-acento focus:outline-none"
          />
          {abierto && (
            <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-2xl border border-borde bg-superficie py-1 shadow-xl">
              {artistas.length === 0 && locales.length === 0 && (
                <li className="px-4 py-3 text-sm text-suave">Nada con ese nombre</li>
              )}
              {artistas.length > 0 && <Grupo>Artistas y DJs</Grupo>}
              {artistas.map((nombre) => (
                <Sugerencia
                  key={nombre}
                  icono="🎤"
                  nombre={nombre}
                  detalle={etiquetaArtista(nombre)}
                  onElegir={(elegido) => elegir(onCambiarArtista, elegido)}
                />
              ))}
              {locales.length > 0 && <Grupo>Salas y discotecas</Grupo>}
              {locales.map((nombre) => (
                <Sugerencia
                  key={nombre}
                  icono={iconoLocal(nombre)}
                  nombre={nombre}
                  detalle={salas[nombre].tipo}
                  onElegir={(elegido) => elegir(onCambiarLocal, elegido)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Buscador
