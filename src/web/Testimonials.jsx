import { opiniones } from '../data/provisional.js'

// ---------- Constantes ----------
// Huecos que se ven mientras no lleguen las frases reales de la encuesta
const NUM_HUECOS = 3

// Opiniones reales sacadas de la encuesta (sin nombres); si aún no hay, tarjetas «Próximamente»
function Testimonials() {
  const hayOpiniones = opiniones.length > 0

  return (
    <section className="bg-superficie py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5">
        <h2 className="text-3xl font-extrabold text-texto">Lo que nos habéis contado</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {hayOpiniones
            ? opiniones.map((opinion) => (
                <li key={opinion.texto} className="rounded-2xl border border-borde bg-fondo p-5 text-texto">
                  <p>«{opinion.texto}»</p>
                  <p className="mt-2 text-xs text-suave">Respuesta anónima de nuestra encuesta</p>
                </li>
              ))
            : Array.from({ length: NUM_HUECOS }, (_, i) => (
                <li key={i} className="rounded-2xl border border-dashed border-borde bg-fondo p-5 text-suave">
                  <p>Próximamente: lo que nos contáis en nuestra encuesta.</p>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials
