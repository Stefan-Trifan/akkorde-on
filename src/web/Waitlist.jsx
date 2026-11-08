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

// el script se mete una sola vez; al volver del modo App solo hay que reactivar el formulario
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

// «Avísame cuando salga»: es la prueba del MVP, los correos se guardan en Tally
function Waitlist() {
  useEffect(() => {
    if (TALLY_FORM_ID) loadTally()
  }, [])

  return (
    <section id="avisame" className="scroll-mt-32 bg-acento py-16 text-fondo">
      <div className="mx-auto flex max-w-xl flex-col gap-5 px-5 text-center">
        <h2 className="text-3xl font-extrabold">¿Te avisamos cuando salga?</h2>
        {TALLY_FORM_ID ? (
          <iframe
            data-tally-src={TALLY_EMBED_URL}
            loading="lazy"
            width="100%"
            height="420"
            title="Formulario Avísame"
          />
        ) : (
          // sin formulario conectado no se enseña una confirmacion falsa
          <p className="rounded-2xl bg-fondo p-5 font-semibold text-texto">{avisame.sinFormulario}</p>
        )}
        <p className="text-xs">{avisame.privacidad}</p>
      </div>
    </section>
  )
}

export default Waitlist
