import { problema } from '../data/textos.js'
import { VIDEO_PROVISIONAL, VIDEO_YOUTUBE_ID } from '../data/provisional.js'

// El problema contado con la persona del kit + el vídeo
function Problem() {
  return (
    <section id="problema" className="mx-auto grid max-w-6xl scroll-mt-32 gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-extrabold text-texto">{problema.titulo}</h2>
        {problema.parrafos.map((parrafo) => (
          <p key={parrafo} className="text-lg text-suave">
            {parrafo}
          </p>
        ))}
      </div>

      <figure className="flex flex-col gap-2">
        <div className="aspect-video overflow-hidden rounded-2xl border border-borde">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_YOUTUBE_ID}`}
            title="Vídeo de Akkorde-on"
            className="h-full w-full"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {VIDEO_PROVISIONAL && <figcaption className="text-xs text-suave">Vídeo: OCU</figcaption>}
      </figure>
    </section>
  )
}

export default Problem
