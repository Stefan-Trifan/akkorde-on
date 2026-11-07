import { cifra, ventajas } from '../data/textos.js'

// ---------- Constantes ----------
// Un icono por ventaja, en el mismo orden que en textos.js
const ICONOS = ['💶', '🔒', '🚫', '🎸']

// Cifra que impacta (precio antes y después de gastos) + 4 ventajas con icono
function Benefits() {
  return (
    <section className="bg-superficie py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="flex items-baseline gap-3 text-texto">
            <span className="text-2xl text-suave line-through md:text-3xl">{cifra.antes}</span>
            <span className="text-suave">→</span>
            <span className="text-5xl font-extrabold text-acento md:text-7xl">{cifra.despues}</span>
          </p>
          <p className="max-w-xl text-suave">{cifra.texto}</p>
          <a href={cifra.fuente.url} target="_blank" rel="noreferrer" className="text-xs text-suave underline">
            Fuente: {cifra.fuente.nombre}
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ventajas.map((ventaja, i) => (
            <li key={ventaja.titulo} className="rounded-2xl border border-borde bg-fondo p-5">
              <span className="text-3xl" aria-hidden="true">
                {ICONOS[i]}
              </span>
              <h3 className="mt-3 font-bold text-texto">{ventaja.titulo}</h3>
              <p className="mt-1 text-sm text-suave">{ventaja.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Benefits
