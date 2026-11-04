import { conciertos } from '../data/conciertos.js'
import { inicio } from '../data/textos.js'
import ConcertCard from './ConcertCard.jsx'

// ---------- Constantes ----------
const NUM_DESTACADOS = 3

// Pantalla 1: logo, eslogan y conciertos destacados (los más próximos)
function Home({ onElegir }) {
  const destacados = conciertos.slice(0, NUM_DESTACADOS)

  return (
    <div className="flex flex-col gap-6 p-5">
      <header className="pt-4">
        <h1 className="text-3xl font-extrabold text-texto">
          Akkorde<span className="text-acento">-on</span>
        </h1>
        <p className="mt-1 text-suave">{inicio.eslogan}</p>
      </header>

      <p className="rounded-2xl bg-acento/15 px-4 py-3 text-sm text-texto">
        Solo <strong className="text-acento">1 € de gastos</strong> por entrada. Lo que ves es lo que pagas.
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-texto">Próximos conciertos</h2>
        {destacados.map((concierto) => (
          <ConcertCard key={concierto.id} concierto={concierto} onElegir={onElegir} />
        ))}
      </section>
    </div>
  )
}

export default Home
