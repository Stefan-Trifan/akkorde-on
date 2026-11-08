import { avisame, inicio } from '../data/textos.js'
import { GASTOS_GESTION, formatearPrecio } from '../app/formato.js'

// Inicio de la página: eslogan, qué es, 3 puntos clave y botones
function Hero({ onAbrirAvisame }) {
  return (
    <section id="inicio" className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-16 pt-28 md:pt-36">
      <span className="w-fit rounded-full bg-acento/15 px-3 py-1 text-sm font-semibold text-acento">
        Solo {formatearPrecio(GASTOS_GESTION)} de gastos por entrada · Madrid
      </span>
      <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-texto md:text-6xl">{inicio.eslogan}</h1>
      <p className="max-w-2xl text-lg text-suave">{inicio.queEs}</p>

      <ul className="flex flex-col gap-2 text-texto md:flex-row md:gap-6">
        {inicio.destacados.map((punto) => (
          <li key={punto} className="flex items-start gap-2">
            <span className="text-exito">✓</span>
            {punto}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <a href="#como-funciona" className="rounded-2xl border border-borde px-5 py-3 font-bold text-texto hover:border-acento">
          Cómo funciona
        </a>
        <button type="button" onClick={onAbrirAvisame} className="rounded-2xl bg-acento px-5 py-3 font-bold text-fondo hover:brightness-110">
          {avisame.boton}
        </button>
      </div>
    </section>
  )
}

export default Hero
