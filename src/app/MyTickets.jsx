import { formatearFecha } from './formato.js'

// Rectángulo de una entrada en la lista; al pulsarlo se abre la entrada
function TicketRow({ entrada, onAbrir }) {
  const { concierto, enReventa } = entrada

  return (
    <button
      type="button"
      onClick={() => onAbrir(entrada.id)}
      className="flex w-full items-center overflow-hidden rounded-2xl bg-crema text-left text-fondo transition hover:brightness-95"
    >
      <img src={concierto.imagen} alt="" className="h-20 w-24 shrink-0 object-cover object-left" />
      <div className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        <span className="font-bold">{concierto.nombre}</span>
        <span className="text-sm">
          {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
        </span>
        {enReventa && (
          <span className="w-fit rounded-full bg-fondo px-2 py-0.5 text-xs font-bold text-acento">En reventa</span>
        )}
      </div>
      <span className="pr-4 text-xl" aria-hidden="true">
        ›
      </span>
    </button>
  )
}

// Pantalla «Mis entradas»: todas las entradas compradas, de la más próxima a la más lejana
function MyTickets({ entradas, onAbrir, onBuscar }) {
  if (entradas.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-suave">Todavía no tienes entradas.</p>
        <button type="button" onClick={onBuscar} className="font-bold text-acento">
          Buscar conciertos
        </button>
      </div>
    )
  }

  const ordenadas = [...entradas].sort((a, b) => a.concierto.fecha.localeCompare(b.concierto.fecha))

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="pt-4 text-2xl font-extrabold text-texto">Mis entradas</h1>
      <p className="text-sm text-suave">
        {entradas.length} {entradas.length === 1 ? 'entrada' : 'entradas'}. Pulsa una para verla.
      </p>
      {ordenadas.map((entrada) => (
        <TicketRow key={entrada.id} entrada={entrada} onAbrir={onAbrir} />
      ))}
    </div>
  )
}

export default MyTickets
