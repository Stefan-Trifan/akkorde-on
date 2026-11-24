import { cartelDe, infoAcceso } from '../data/eventos.js'
import {
  GASTOS_GESTION,
  formatearFecha,
  formatearPrecio,
  precioFinal,
  textoDressCode,
  textoEdad,
} from './formato.js'

// Pantalla 3: ficha del concierto con el precio final ya calculado
function EventDetail({ concierto, onComprar, onVolver, onVerLocal }) {
  const total = precioFinal(concierto.precio)
  const acceso = infoAcceso(concierto)

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={concierto.imagen} alt={`Cartel de ${concierto.nombre}`} className="aspect-[8/5] w-full object-cover" />
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver"
          className="absolute left-3 top-3 rounded-full bg-fondo/70 px-3 py-1 text-texto"
        >
          ←
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-acento">{concierto.genero}</span>
          <h1 className="text-2xl font-extrabold text-texto">{concierto.nombre}</h1>
        </div>

        {concierto.descripcion && <p className="text-texto">{concierto.descripcion}</p>}

        <ul className="flex flex-col gap-1 text-suave">
          <li>
            📍{' '}
            <button
              type="button"
              onClick={() => onVerLocal(concierto.sala)}
              className="font-semibold text-acento hover:underline"
            >
              {concierto.sala}
            </button>
            , Madrid
          </li>
          <li>
            📅 {formatearFecha(concierto.fecha)} · {concierto.hora}
          </li>
          <li>🎧 Cartel: {cartelDe(concierto).join(', ')}</li>
          <li>🔞 {textoEdad(acceso.edadMinima)}</li>
          <li>👔 {textoDressCode(acceso.dressCode)}</li>
        </ul>

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
            <span>Total</span>
            <span>{formatearPrecio(total)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onComprar}
          className="rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110"
        >
          Comprar por {formatearPrecio(total)}
        </button>
      </div>
    </div>
  )
}

export default EventDetail
