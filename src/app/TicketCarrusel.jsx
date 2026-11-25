import { useEffect, useRef, useState } from 'react'
import Ticket from './Ticket.jsx'

// Botón redondo de flecha a un lado de la entrada
function Flecha({ lado, onClick, etiqueta }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={etiqueta}
      className={`absolute top-48 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-fondo/80 text-xl font-bold text-acento shadow-lg ring-1 ring-borde backdrop-blur transition hover:bg-fondo ${
        lado === 'izquierda' ? 'left-1' : 'right-1'
      }`}
    >
      {lado === 'izquierda' ? '‹' : '›'}
    </button>
  )
}

// Entradas de un mismo evento una al lado de otra: se pasa de una a otra deslizando (móvil, trackpad)
// o con las flechas (ratón) y las teclas ← →. Las flechas solo salen si hay más entradas en ese lado.
function TicketCarrusel({ entradas, amigos, onVolver, onRevender, onQuitarReventa, onEnviar }) {
  const carril = useRef(null)
  const [indice, setIndice] = useState(0)
  const hayIzquierda = indice > 0
  const hayDerecha = indice < entradas.length - 1

  // Lleva el carril hasta la entrada «i» con animación
  function irA(i) {
    const destino = Math.max(0, Math.min(entradas.length - 1, i))
    carril.current?.scrollTo({ left: destino * carril.current.clientWidth, behavior: 'smooth' })
  }

  // Al deslizar con el dedo, se actualiza qué entrada se está viendo
  function alDeslizar() {
    const { scrollLeft, clientWidth } = carril.current
    setIndice(Math.round(scrollLeft / clientWidth))
  }

  // Teclas ← y → en el ordenador
  useEffect(() => {
    function alPulsarTecla(evento) {
      // Si se está escribiendo (p. ej. el nombre al enviar), las flechas mueven el cursor, no el carrusel
      if (evento.target instanceof Element && evento.target.closest('input, select, textarea')) return
      if (evento.key === 'ArrowLeft') irA(indice - 1)
      if (evento.key === 'ArrowRight') irA(indice + 1)
    }
    window.addEventListener('keydown', alPulsarTecla)
    return () => window.removeEventListener('keydown', alPulsarTecla)
  })

  const actual = entradas[indice]

  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-2 px-5 pb-4 pt-4">
        <button type="button" onClick={onVolver} className="self-start text-suave hover:text-texto">
          ← Mis entradas
        </button>
        <div className="flex items-end justify-between gap-3">
          <h1 className="text-2xl font-extrabold text-texto">{entradas.length === 1 ? 'Mi entrada' : 'Mis entradas'}</h1>
          {entradas.length > 1 && (
            <span className="pb-1 text-sm font-semibold text-suave" aria-live="polite">
              {indice + 1} de {entradas.length}
              {actual?.asistente && ` · ${actual.asistente}`}
            </span>
          )}
        </div>
        {entradas.length > 1 && (
          <div className="flex justify-center gap-1.5" role="tablist" aria-label="Elegir entrada">
            {entradas.map((entrada, i) => (
              <button
                key={entrada.id}
                type="button"
                role="tab"
                aria-selected={i === indice}
                aria-label={`Entrada ${i + 1}${entrada.asistente ? ` de ${entrada.asistente}` : ''}`}
                onClick={() => irA(i)}
                className={`h-2 rounded-full transition-all ${i === indice ? 'w-6 bg-acento' : 'w-2 bg-borde hover:bg-suave'}`}
              />
            ))}
          </div>
        )}
      </header>

      <div className="relative">
        {hayIzquierda && <Flecha lado="izquierda" onClick={() => irA(indice - 1)} etiqueta="Entrada anterior" />}
        {hayDerecha && <Flecha lado="derecha" onClick={() => irA(indice + 1)} etiqueta="Entrada siguiente" />}

        {/* Carril horizontal: cada entrada ocupa todo el ancho y se «engancha» al soltar */}
        <div
          ref={carril}
          onScroll={alDeslizar}
          className="sin-scrollbar flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain"
        >
          {entradas.map((entrada) => (
            <div key={entrada.id} className="w-full shrink-0 snap-center snap-always">
              <Ticket
                entrada={entrada}
                amigos={amigos}
                onRevender={() => onRevender(entrada)}
                onQuitarReventa={() => onQuitarReventa(entrada)}
                onEnviar={(nombre) => onEnviar(entrada, nombre)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TicketCarrusel
