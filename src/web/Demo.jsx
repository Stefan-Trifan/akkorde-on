import { novedades } from '../data/textos.js'
import { URL_DEMO } from '../rutas.js'

// Sprint 3: el MVP en 4 beneficios y el boton para abrir la demo
function Demo() {
  return (
    <section id="demo" className="mx-auto flex max-w-6xl scroll-mt-32 flex-col gap-8 px-5 py-16">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-extrabold text-texto">{novedades.titulo}</h2>
        <p className="max-w-2xl text-lg text-suave">{novedades.subtitulo}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {novedades.puntos.map((punto) => (
          <li key={punto.titulo} className="flex flex-col gap-2 rounded-2xl border border-borde bg-superficie p-5">
            <h3 className="font-bold text-texto">{punto.titulo}</h3>
            <p className="text-sm text-suave">{punto.texto}</p>
          </li>
        ))}
      </ul>
      <a href={URL_DEMO} className="w-fit rounded-2xl bg-acento px-5 py-3 font-bold text-fondo hover:brightness-110">
        Probar la demo
      </a>
    </section>
  )
}

export default Demo
