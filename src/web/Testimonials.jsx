import { ENSENAR_PENDIENTES, opiniones } from '../data/pendientes.js'
import Pending from './Pending.jsx'

// Opiniones reales sacadas de la encuesta (sin nombres)
function Testimonials() {
  if (opiniones.length === 0 && !ENSENAR_PENDIENTES) return null

  return (
    <section className="bg-superficie py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5">
        <h2 className="text-3xl font-extrabold text-texto">Lo que nos habéis contado</h2>
        {opiniones.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {opiniones.map((opinion) => (
              <li key={opinion.texto} className="rounded-2xl border border-borde bg-fondo p-5 text-texto">
                <p>«{opinion.texto}»</p>
                <p className="mt-2 text-xs text-suave">Respuesta anónima de nuestra encuesta</p>
              </li>
            ))}
          </ul>
        ) : (
          <Pending texto="3-4 frases reales de la encuesta (Nico, 06-11)" />
        )}
      </div>
    </section>
  )
}

export default Testimonials
