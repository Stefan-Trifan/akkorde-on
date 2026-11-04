import { useState } from 'react'
import { avisame } from '../data/textos.js'

// «Avísame cuando salga»: formulario simulado, no envía ni guarda nada
function Waitlist() {
  const [enviado, setEnviado] = useState(false)

  // Evita recargar la página y enseña la confirmación
  function enviar(evento) {
    evento.preventDefault()
    setEnviado(true)
  }

  return (
    <section id="avisame" className="scroll-mt-20 bg-acento py-16 text-fondo">
      <div className="mx-auto flex max-w-xl flex-col gap-5 px-5 text-center">
        <h2 className="text-3xl font-extrabold">¿Te avisamos cuando salga?</h2>
        {enviado ? (
          <p className="rounded-2xl bg-fondo p-5 font-semibold text-texto" role="status">
            {avisame.mensaje}
          </p>
        ) : (
          <form onSubmit={enviar} className="flex flex-col gap-3">
            <label className="sr-only" htmlFor="nombre">Nombre</label>
            <input id="nombre" required placeholder="Tu nombre" className="rounded-2xl bg-fondo px-4 py-3 text-texto placeholder:text-suave" />
            <label className="sr-only" htmlFor="correo">Correo</label>
            <input id="correo" type="email" required placeholder="Tu correo" className="rounded-2xl bg-fondo px-4 py-3 text-texto placeholder:text-suave" />
            <button type="submit" className="rounded-2xl bg-fondo py-3 font-bold text-acento hover:brightness-125">
              {avisame.boton}
            </button>
            <p className="text-xs">Demo: no guardamos tus datos.</p>
          </form>
        )}
      </div>
    </section>
  )
}

export default Waitlist
