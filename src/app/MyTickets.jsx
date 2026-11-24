import { formatearFecha } from './formato.js'

// Agrupa las entradas por evento, de la más próxima a la más lejana: [{ concierto, entradas }]
function agruparPorEvento(entradas) {
  const grupos = []
  entradas.forEach((entrada) => {
    const grupo = grupos.find((g) => g.concierto.id === entrada.concierto.id)
    if (grupo) grupo.entradas.push(entrada)
    else grupos.push({ concierto: entrada.concierto, entradas: [entrada] })
  })
  return grupos.sort((a, b) =>
    `${a.concierto.fecha} ${a.concierto.hora}`.localeCompare(`${b.concierto.fecha} ${b.concierto.hora}`),
  )
}

// Rectángulo de un evento con todas las entradas que aún tienes; al pulsarlo se abren para deslizarlas
function GrupoRow({ grupo, onAbrir }) {
  const { concierto, entradas } = grupo
  const enReventa = entradas.filter((entrada) => entrada.enReventa).length
  const nombres = entradas.map((entrada) => entrada.asistente).filter(Boolean)

  return (
    <button
      type="button"
      onClick={() => onAbrir(entradas.map((entrada) => entrada.id))}
      className="relative flex w-full items-center overflow-hidden rounded-2xl bg-crema text-left text-fondo transition hover:brightness-95"
    >
      <img src={concierto.imagen} alt="" className="h-24 w-24 shrink-0 object-cover object-left" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 px-3 py-2">
        <span className="truncate font-bold">{concierto.nombre}</span>
        <span className="truncate text-sm">
          {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
        </span>
        {nombres.length > 0 && <span className="truncate text-xs">{nombres.join(' · ')}</span>}
        <span className="flex gap-1">
          <span className="w-fit rounded-full bg-fondo px-2 py-0.5 text-xs font-bold text-acento">
            {entradas.length} {entradas.length === 1 ? 'entrada' : 'entradas'}
          </span>
          {enReventa > 0 && (
            <span className="w-fit rounded-full border border-fondo px-2 py-0.5 text-xs font-bold">
              {enReventa} en reventa
            </span>
          )}
        </span>
      </div>
      <span className="pr-4 text-xl" aria-hidden="true">
        ›
      </span>
    </button>
  )
}

// Rectángulo de una entrada que ya has dado a otra persona
function RegaladaRow({ entrada, onAbrir }) {
  const { concierto } = entrada
  return (
    <button
      type="button"
      onClick={() => onAbrir([entrada.id])}
      className="flex w-full items-center gap-3 rounded-2xl border border-borde bg-superficie p-2 text-left opacity-70 transition hover:opacity-100"
    >
      <img src={concierto.imagen} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover object-left" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-bold text-texto">{concierto.nombre}</span>
        <span className="truncate text-xs text-suave">
          {formatearFecha(concierto.fecha)} · {entrada.opcion ?? 'Entrada'}
        </span>
        <span className="truncate text-xs font-semibold text-acento">📤 Enviada a {entrada.enviadaA}</span>
      </div>
    </button>
  )
}

// Pantalla «Mis entradas»: primero las que aún tienes (juntas por evento) y al final las que ya has dado
function MyTickets({ entradas, onAbrir, onBuscar }) {
  if (entradas.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-suave">Todavía no tienes entradas.</p>
        <button type="button" onClick={onBuscar} className="font-bold text-acento">
          Buscar planes
        </button>
      </div>
    )
  }

  const grupos = agruparPorEvento(entradas.filter((entrada) => !entrada.enviadaA))
  const regaladas = entradas
    .filter((entrada) => entrada.enviadaA)
    .sort((a, b) => a.concierto.fecha.localeCompare(b.concierto.fecha))
  const tuyas = entradas.length - regaladas.length

  return (
    <div className="flex flex-col gap-4 px-5 pb-8 pt-8">
      <h1 className="text-2xl font-extrabold text-texto">Mis entradas</h1>

      {grupos.length > 0 ? (
        <p className="text-sm text-suave">
          Tienes {tuyas} {tuyas === 1 ? 'entrada' : 'entradas'}. Pulsa un evento para verlas y deslizar entre ellas.
        </p>
      ) : (
        <p className="text-sm text-suave">Ya has dado todas tus entradas.</p>
      )}
      {grupos.map((grupo) => (
        <GrupoRow key={grupo.concierto.id} grupo={grupo} onAbrir={onAbrir} />
      ))}

      {regaladas.length > 0 && (
        <section className="mt-4 flex flex-col gap-2 border-t border-borde pt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-suave">
            Ya regaladas · {regaladas.length}
          </h2>
          {regaladas.map((entrada) => (
            <RegaladaRow key={entrada.id} entrada={entrada} onAbrir={onAbrir} />
          ))}
        </section>
      )}
    </div>
  )
}

export default MyTickets
