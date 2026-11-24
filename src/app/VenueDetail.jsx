import BotonFavorito from '../components/BotonFavorito.jsx'
import { cartelDe, eventos, infoAcceso } from '../data/eventos.js'
import { iconoLocal, salas } from '../data/salas.js'
import { distanciaAConcierto, formatearDistancia } from './distancia.js'
import { textoDressCode, textoEdad } from './formato.js'
import { textoDesde } from './venta.js'
import { esProximo, etiquetaFecha } from './tiempo.js'

// Día y mes por separado para la columna de fecha de la agenda: "28" y "NOV"
function partesFecha(fecha) {
  const dia = new Date(`${fecha}T00:00`)
  return {
    numero: dia.getDate(),
    mes: dia.toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''),
  }
}

// Pantalla: ficha de una sala o discoteca con su agenda de próximos eventos
function VenueDetail({ nombre, ubicacion, esFavorito, onCambiarFavorito, onElegir, onVolver }) {
  const local = salas[nombre]
  const proximos = eventos.filter((evento) => evento.sala === nombre && esProximo(evento))
  const distancia = distanciaAConcierto({ sala: nombre }, ubicacion)
  // Imagen de cabecera: la del primer evento del local, si tiene alguno
  const portada = eventos.find((evento) => evento.sala === nombre)?.imagen

  return (
    <div className="flex flex-col">
      <div className="relative h-44 overflow-hidden bg-superficie">
        {portada && <img src={portada} alt="" className="h-full w-full scale-125 object-cover opacity-50 blur-md" />}
        <div className="absolute inset-0 bg-gradient-to-t from-fondo via-fondo/40 to-transparent" />
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-fondo/70 text-texto backdrop-blur hover:bg-fondo"
        >
          ←
        </button>
        <BotonFavorito
          activo={esFavorito}
          nombre={nombre}
          onCambiar={onCambiarFavorito}
          className="absolute right-3 top-3 backdrop-blur"
        />
        <div className="absolute inset-x-5 bottom-3">
          <span className="text-xs font-bold uppercase tracking-widest text-acento">
            {iconoLocal(nombre)} {local.tipo}
          </span>
          <h1 className="text-3xl font-extrabold text-texto">{nombre}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-8 pt-3">
        <p className="text-sm text-suave">
          📍 {local.direccion}
          {distancia !== null && ` · a ${formatearDistancia(distancia)} de ${ubicacion.nombre}`}
        </p>

        <p className="text-texto">{local.descripcion}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-2xl bg-superficie p-3">
            <p className="text-xs text-suave">Edad mínima</p>
            <p className="font-semibold text-texto">{textoEdad(local.edadMinima)}</p>
          </div>
          <div className="rounded-2xl bg-superficie p-3">
            <p className="text-xs text-suave">Vestimenta</p>
            <p className="font-semibold text-texto">{textoDressCode(local.dressCode)}</p>
          </div>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-suave">
            Agenda · {proximos.length} {proximos.length === 1 ? 'evento' : 'eventos'}
          </h2>
          {proximos.length === 0 && (
            <p className="rounded-2xl border border-dashed border-borde p-6 text-center text-sm text-suave">
              {nombre} no tiene eventos próximos en Akkorde-on.
            </p>
          )}
          {proximos.map((evento) => {
            const acceso = infoAcceso(evento)
            const { numero, mes } = partesFecha(evento.fecha)
            // Solo se repite edad o vestimenta si el evento pide algo distinto al local
            const cambiaAcceso = acceso.edadMinima !== local.edadMinima || acceso.dressCode !== local.dressCode
            return (
              <button
                key={evento.id}
                type="button"
                onClick={() => onElegir(evento)}
                className="group flex gap-4 rounded-2xl border border-borde bg-superficie p-4 text-left transition hover:border-acento"
              >
                <div className="flex w-12 shrink-0 flex-col items-center self-start rounded-xl bg-fondo py-2">
                  <span className="text-xl font-extrabold leading-none text-acento">{numero}</span>
                  <span className="text-xs uppercase text-suave">{mes}</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-xs font-semibold uppercase text-suave">
                    {etiquetaFecha(evento.fecha)} · {evento.hora} · {evento.genero}
                  </span>
                  <span className="font-bold text-texto group-hover:text-acento">{evento.nombre}</span>
                  {evento.descripcion && <span className="text-sm text-suave">{evento.descripcion}</span>}
                  <span className="text-sm text-suave">🎧 {cartelDe(evento).join(' · ')}</span>
                  {cambiaAcceso && (
                    <span className="text-xs text-crema">
                      Este día: {textoEdad(acceso.edadMinima)} · {textoDressCode(acceso.dressCode)}
                    </span>
                  )}
                  <span className="mt-1 font-bold text-texto">{textoDesde(evento)}</span>
                </div>
              </button>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default VenueDetail
