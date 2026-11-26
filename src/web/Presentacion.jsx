import { PDF_PRESENTACION } from '../data/provisional.js'

// Sprint 3: la presentacion en PDF; sin PDF puesto, no se pinta nada
function Presentacion() {
  if (!PDF_PRESENTACION) return null
  const url = `${import.meta.env.BASE_URL}${PDF_PRESENTACION}`

  return (
    <section id="presentacion" className="mx-auto flex max-w-6xl scroll-mt-32 flex-col gap-6 px-5 py-16">
      <h2 className="text-3xl font-extrabold text-texto">Nuestra presentación</h2>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-borde">
        <iframe src={url} title="Presentación de Akkorde-on (Sprint 3)" className="h-full w-full" />
      </div>
      <a href={url} target="_blank" rel="noreferrer" className="w-fit rounded-2xl border border-borde px-5 py-3 font-bold text-texto hover:border-acento">
        Abrir el PDF
      </a>
    </section>
  )
}

export default Presentacion
