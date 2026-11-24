import { cartelDe, eventos, infoAcceso } from '../data/eventos.js'
import { TIPO_DISCOTECA, salas } from '../data/salas.js'
import { distanciaAConcierto, formatearDistancia } from './distancia.js'
import { formatearFecha, formatearPrecio, precioFinal, textoDressCode, textoEdad } from './formato.js'
import { esProximo } from './tiempo.js'

// Pantalla: ficha de una sala o discoteca con sus próximos eventos
function VenueDetail({ nombre, onElegir, onVolver }) {
  const local = salas[nombre]
  const proximos = eventos.filter((evento) => evento.sala === nombre && esProximo(evento))
  const distancia = distanciaAConcierto({ sala: nombre })

  return (
    <div className="flex flex-col gap-5 p-5">
      <button type="button" onClick={onVolver} className="self-start pt-2 text-suave hover:text-texto">
        ← Volver
      </button>

      <header className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-acento">
          {local.tipo === TIPO_DISCOTECA ? '🪩' : '🎤'} {local.tipo}
        </span>
        <h1 className="text-2xl font-extrabold text-texto">{nombre}</h1>
        <p className="text-sm text-suave">
          📍 {local.direccion}
          {distancia !== null && ` · ${formatearDistancia(distancia)}`}
        </p>
      </header>

      <p className="text-texto">{local.descripcion}</p>

      <ul className="flex flex-wrap gap-2 text-sm">
        <li className="rounded-full border border-borde px-3 py-1 text-suave">🔞 {textoEdad(local.edadMinima)}</li>
        <li className="rounded-full border border-borde px-3 py-1 text-suave">👔 {textoDressCode(local.dressCode)}</li>
      </ul>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-texto">Próximos eventos ({proximos.length})</h2>
        {proximos.length === 0 && (
          <p className="rounded-2xl border border-borde p-4 text-sm text-suave">
            {nombre} no tiene eventos próximos en Akkorde-on.
          </p>
        )}
        {proximos.map((evento) => {
          const acceso = infoAcceso(evento)
          return (
            <button
              key={evento.id}
              type="button"
              onClick={() => onElegir(evento)}
              className="flex flex-col gap-1 rounded-2xl border border-borde bg-superficie p-4 text-left transition hover:border-acento"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-acento">
                {formatearFecha(evento.fecha)} · {evento.hora} · {evento.genero}
              </span>
              <span className="font-bold text-texto">{evento.nombre}</span>
              {evento.descripcion && <span className="text-sm text-suave">{evento.descripcion}</span>}
              <span className="text-sm text-suave">🎧 Cartel: {cartelDe(evento).join(', ')}</span>
              <span className="text-sm text-suave">
                🔞 {textoEdad(acceso.edadMinima)} · 👔 {textoDressCode(acceso.dressCode)}
              </span>
              <span className="text-sm font-semibold text-texto">{formatearPrecio(precioFinal(evento.precio))}</span>
            </button>
          )
        })}
      </section>
    </div>
  )
}

export default VenueDetail
