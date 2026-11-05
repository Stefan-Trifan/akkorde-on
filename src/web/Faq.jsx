import { faq } from '../data/provisional.js'

// Preguntas frecuentes: cada una se abre y se cierra al pulsarla
function Faq() {
  return (
    <section id="faq" className="mx-auto flex max-w-3xl scroll-mt-32 flex-col gap-6 px-5 py-16">
      <h2 className="text-3xl font-extrabold text-texto">Preguntas frecuentes</h2>
      <div className="flex flex-col gap-3">
        {faq.map((item) => (
          <details key={item.pregunta} className="rounded-2xl border border-borde bg-superficie p-4">
            <summary className="cursor-pointer font-semibold text-texto">{item.pregunta}</summary>
            <p className="mt-2 text-suave">{item.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default Faq
