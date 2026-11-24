import { cartelDe, infoAcceso } from '../data/eventos.js'
import { iconoLocal } from '../data/salas.js'
import { opcionesVenta, precioDesde, tieneVariasOpciones } from './venta.js'
import {
  GASTOS_GESTION,
  formatearFecha,
  formatearPrecio,
  precioFinal,
  textoDressCode,
  textoEdad,
} from './formato.js'

// Casilla de dato: título pequeño y valor
function Dato({ titulo, children }) {
  return (
    <div className="rounded-2xl bg-superficie p-3">
      <p className="text-xs text-suave">{titulo}</p>
      <div className="font-semibold text-texto">{children}</div>
    </div>
  )
}

// Pantalla 3: ficha del evento con el precio final ya calculado
function EventDetail({ concierto, onComprar, onVolver, onVerLocal }) {
  const total = precioFinal(concierto.precio)
  const acceso = infoAcceso(concierto)
  const { listas, entradas, reservados, mostrar } = opcionesVenta(concierto)
  const variasOpciones = tieneVariasOpciones(concierto)
  const desde = precioDesde(concierto)

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={concierto.imagen} alt={`Cartel de ${concierto.nombre}`} className="aspect-[8/5] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-fondo via-transparent to-transparent" />
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-fondo/70 text-texto backdrop-blur hover:bg-fondo"
        >
          ←
        </button>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-acento">{concierto.genero}</span>
          <h1 className="text-3xl font-extrabold text-texto">{concierto.nombre}</h1>
          {concierto.descripcion && <p className="mt-2 text-suave">{concierto.descripcion}</p>}
        </div>

        <button
          type="button"
          onClick={() => onVerLocal(concierto.sala)}
          className="flex items-center gap-3 rounded-2xl border border-borde bg-superficie p-3 text-left transition hover:border-acento"
        >
          <span className="text-2xl" aria-hidden="true">
            {iconoLocal(concierto.sala)}
          </span>
          <span className="flex flex-1 flex-col">
            <span className="font-bold text-texto">{concierto.sala}</span>
            <span className="text-xs text-suave">Madrid · ver ficha y agenda</span>
          </span>
          <span className="text-acento" aria-hidden="true">
            →
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <Dato titulo="Fecha">{formatearFecha(concierto.fecha)}</Dato>
          <Dato titulo="Hora">{concierto.hora}</Dato>
          <Dato titulo="Edad mínima">{textoEdad(acceso.edadMinima)}</Dato>
          <Dato titulo="Vestimenta">{textoDressCode(acceso.dressCode)}</Dato>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-suave">Cartel</h2>
          <div className="flex flex-wrap gap-2">
            {cartelDe(concierto).map((artista) => (
              <span key={artista} className="rounded-full border border-borde px-3 py-1 text-sm text-texto">
                🎧 {artista}
              </span>
            ))}
          </div>
        </div>

        {variasOpciones ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-suave">A la venta</h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {listas.length > 0 && (
                <li className="rounded-full bg-superficie px-3 py-1 text-texto">
                  📝 {listas.length} {listas.length === 1 ? 'lista' : 'listas'}
                </li>
              )}
              <li className="rounded-full bg-superficie px-3 py-1 text-texto">
                🎟️ {entradas.length} {entradas.length === 1 ? 'tipo de entrada' : 'tipos de entrada'}
                {entradas.some((entrada) => entrada.tramos) && ' · por tramos'}
              </li>
              {reservados.length > 0 && (
                <li className="rounded-full bg-superficie px-3 py-1 text-texto">
                  🛋️ Reservados{mostrar.mapa && ' · con plano'}
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-borde bg-superficie p-4 text-sm">
            <div className="flex justify-between text-suave">
              <span>Entrada</span>
              <span>{formatearPrecio(concierto.precio)}</span>
            </div>
            <div className="flex justify-between text-suave">
              <span>Gastos de gestión</span>
              <span>{formatearPrecio(GASTOS_GESTION)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-borde pt-2 text-base font-bold text-texto">
              <span>Total por entrada</span>
              <span>{formatearPrecio(total)}</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onComprar}
          disabled={desde === null}
          className="rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110 disabled:opacity-30"
        >
          {desde === null
            ? 'Agotado'
            : variasOpciones
              ? `Elegir entradas · desde ${desde === 0 ? 'gratis' : formatearPrecio(desde)}`
              : `Comprar · ${formatearPrecio(total)} por entrada`}
        </button>
      </div>
    </div>
  )
}

export default EventDetail
