import { comoFunciona, solucion } from '../data/textos.js'

// Cómo funciona: la solución en 3 beneficios y los 4 pasos para comprar
function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-superficie py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-texto">{solucion.titulo}</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {solucion.beneficios.map((beneficio) => (
              <li key={beneficio.titulo} className="text-suave">
                <strong className="text-texto">{beneficio.titulo}.</strong> {beneficio.texto}
              </li>
            ))}
          </ul>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comoFunciona.map((paso) => (
            <li key={paso.paso} className="flex flex-col gap-2 rounded-2xl border border-borde bg-fondo p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-acento font-extrabold text-fondo">
                {paso.paso}
              </span>
              <h3 className="font-bold text-texto">{paso.titulo}</h3>
              <p className="text-sm text-suave">{paso.texto}</p>
            </li>
          ))}
        </ol>
        <p className="text-center text-sm text-suave">¿Al final no puedes ir? Revende tu entrada al mismo precio que pagaste.</p>
      </div>
    </section>
  )
}

export default HowItWorks
