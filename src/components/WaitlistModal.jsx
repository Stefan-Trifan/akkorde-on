import { useEffect } from 'react'
import { avisame } from '../data/textos.js'
import { TALLY_FORM_ID } from '../medicion.js'

const TALLY_SCRIPT_ID = 'tally-embed-script'
const TALLY_EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?hideTitle=1&transparentBackground=1&dynamicHeight=1`

// si el script de Tally no carga, el formulario se abre igual aunque sin ajustar su altura
function showFormWithoutScript() {
  document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
    iframe.src = iframe.dataset.tallySrc
  })
}

function loadTally() {
  if (window.Tally) {
    window.Tally.loadEmbeds()
    return
  }
  if (document.getElementById(TALLY_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = TALLY_SCRIPT_ID
  script.src = 'https://tally.so/widgets/embed.js'
  script.onload = () => window.Tally.loadEmbeds()
  script.onerror = showFormWithoutScript
  document.body.appendChild(script)
}

// unico formulario de la pagina: es la prueba del MVP y los correos se guardan en Tally.
// se monta siempre y solo se oculta, asi cada carga de la web cuenta una sola visita en Tally
function WaitlistModal({ abierto, onCerrar }) {
  useEffect(() => {
    if (TALLY_FORM_ID) loadTally()
  }, [])

  useEffect(() => {
    if (!abierto) return undefined

    function cerrarConEscape(evento) {
      if (evento.key === 'Escape') onCerrar()
    }
    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [abierto, onCerrar])

  return (
    // invisible y no display none: el iframe tiene que cargar y conservar su altura aunque no se vea
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Formulario Avísame"
      aria-hidden={!abierto}
      onClick={onCerrar}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-fondo/80 p-4 backdrop-blur-sm transition-opacity ${
        abierto ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        onClick={(evento) => evento.stopPropagation()}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl bg-texto p-5 text-fondo shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-fondo font-bold text-acento hover:brightness-125"
        >
          ✕
        </button>
        <h2 className="pr-10 text-2xl font-extrabold">¿Te avisamos cuando salga?</h2>
        <p className="mt-1 mb-4 font-semibold">{avisame.subtitulo}</p>
        {TALLY_FORM_ID ? (
          <iframe data-tally-src={TALLY_EMBED_URL} width="100%" height="420" title="Formulario Avísame" />
        ) : (
          <p className="rounded-2xl bg-fondo p-5 font-semibold text-texto">{avisame.sinFormulario}</p>
        )}
      </div>
    </div>
  )
}

export default WaitlistModal
