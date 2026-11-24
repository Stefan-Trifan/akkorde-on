import { useState } from 'react'
import BotonFavorito from '../components/BotonFavorito.jsx'
import { NOMBRES_DISCOTECAS, NOMBRES_SALAS, iconoLocal, salas } from '../data/salas.js'
import { TODOS } from './formato.js'

// ---------- Constantes ----------
const LOCALES = [...NOMBRES_DISCOTECAS, ...NOMBRES_SALAS]

// Quita tildes y mayúsculas para comparar: "Café" → "cafe"
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Campo para buscar una sala o discoteca escribiendo su nombre.
// Al enfocarlo se ven todos los locales; al escribir se van filtrando.
function BuscadorLocal({ local, favoritos = [], onCambiarLocal, onCambiarFavorito, onVerLocal }) {
  const [texto, setTexto] = useState('')
  const [abierto, setAbierto] = useState(false)

  const sugerencias = LOCALES.filter((nombre) => normalizar(nombre).includes(normalizar(texto)))

  function elegir(nombre) {
    onCambiarLocal(nombre)
    setTexto('')
    setAbierto(false)
  }

  // Local ya elegido: se enseña como tarjeta con acceso a su ficha y botón para quitarlo
  if (local !== TODOS) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-acento/60 bg-acento/10 p-3">
        <span className="text-2xl" aria-hidden="true">
          {iconoLocal(local)}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-bold text-texto">{local}</span>
          <button
            type="button"
            onClick={() => onVerLocal(local)}
            className="self-start text-sm font-semibold text-acento hover:underline"
          >
            Ver ficha y agenda →
          </button>
        </div>
        <BotonFavorito activo={favoritos.includes(local)} nombre={local} onCambiar={() => onCambiarFavorito(local)} />
        <button
          type="button"
          onClick={() => onCambiarLocal(TODOS)}
          aria-label={`Quitar ${local}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-suave hover:bg-superficie hover:text-texto"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <label htmlFor="buscar-local" className="sr-only">
        Busca una sala o discoteca
      </label>
      <input
        id="buscar-local"
        type="search"
        value={texto}
        placeholder="🔍  Busca una sala o discoteca"
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
        <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-2xl border border-borde bg-superficie py-1 shadow-xl">
          {sugerencias.length === 0 && <li className="px-4 py-3 text-sm text-suave">Ningún local con ese nombre</li>}
          {sugerencias.map((nombre) => (
            <li key={nombre}>
              <button
                type="button"
                // onMouseDown para elegir antes de que el campo pierda el foco y se cierre la lista
                onMouseDown={(evento) => {
                  evento.preventDefault()
                  elegir(nombre)
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-fondo"
              >
                <span aria-hidden="true">{iconoLocal(nombre)}</span>
                <span className="flex-1 text-texto">{nombre}</span>
                <span className="text-xs text-suave">{salas[nombre].tipo}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BuscadorLocal
