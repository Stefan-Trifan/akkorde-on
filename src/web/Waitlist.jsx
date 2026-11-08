import { avisame } from '../data/textos.js'

// «Avísame cuando salga»: el formulario es el mismo de la app y se abre en una ventana
function Waitlist({ onAbrirAvisame }) {
  return (
    <section id="avisame" className="scroll-mt-32 bg-acento py-16 text-fondo">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-5 text-center">
        <h2 className="text-3xl font-extrabold">¿Te avisamos cuando salga?</h2>
        <p className="font-semibold">{avisame.subtitulo}</p>
        <button
          type="button"
          onClick={onAbrirAvisame}
          className="rounded-2xl bg-fondo px-8 py-3 font-bold text-acento hover:brightness-125"
        >
          {avisame.boton}
        </button>
      </div>
    </section>
  )
}

export default Waitlist
