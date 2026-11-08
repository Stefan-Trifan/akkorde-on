import { encuesta } from '../data/textos.js'

// datos reales de nuestra encuesta; no hay frases de opinion porque no tenia preguntas abiertas
function Testimonials() {
  return (
    <section className="bg-superficie py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5">
        <h2 className="text-3xl font-extrabold text-texto">Lo que nos habéis contado</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {encuesta.datos.map((dato) => (
            <li key={dato.texto} className="rounded-2xl border border-borde bg-fondo p-5">
              <p className="text-4xl font-extrabold text-acento">{dato.porcentaje}</p>
              <p className="mt-2 text-texto">{dato.texto}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-suave">{encuesta.fuente}</p>
      </div>
    </section>
  )
}

export default Testimonials
