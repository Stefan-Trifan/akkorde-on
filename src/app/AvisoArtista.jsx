import { useState } from 'react'
import { comunidades } from '../data/comunidades.js'
import { conciertosFuera, eventos, proximosDe } from '../data/eventos.js'
import { MODO_DEMO } from '../demo/config.js' // DEMO:
import { ALCANCES, OPCIONES_KM, avisoNuevo, queCumplen } from './avisos.js'
import { etiquetaFecha } from './tiempo.js'

// Desplegable con el estilo de la app
function Desplegable({ id, etiqueta, valor, onCambiar, children }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-suave">
      <span className="shrink-0">{etiqueta}</span>
      <select
        id={id}
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        className="min-w-0 flex-1 cursor-pointer rounded-full bg-fondo px-3 py-1.5 font-semibold text-texto focus:outline-none focus:ring-1 focus:ring-acento"
      >
        {children}
      </select>
    </label>
  )
}

// Bloque «🔔 Avísame si viene» de la ficha de una artista.
// aviso = null si no está activado. extra = conciertos anunciados durante la demo.
// onSimular (DEMO) anuncia un concierto y devuelve { concierto, avisa, motivo }
function AvisoArtista({ artista, aviso, ubicacion, extra = [], onCambiar, onSimular }) {
  // Resultado del último anuncio simulado, para enseñar si te habría llegado el aviso y por qué
  const [resultado, setResultado] = useState(null)

  const proximos = proximosDe(artista.nombre, [...eventos, ...conciertosFuera, ...extra])
  const cumplen = aviso ? queCumplen(aviso, proximos, ubicacion).length : 0

  // Cambia un dato del aviso (alcance, km o comunidad)
  function cambiar(campo, valor) {
    onCambiar({ ...aviso, [campo]: valor })
    setResultado(null)
  }

  function activar() {
    onCambiar(aviso ? null : avisoNuevo())
    setResultado(null)
  }

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-borde bg-superficie p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-bold text-texto">🔔 Avísame si viene</p>
          <p className="text-xs text-suave">Te avisamos cuando {artista.nombre} anuncie un concierto cerca de ti.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(aviso)}
          aria-label="Avísame si viene"
          onClick={activar}
          className={`relative h-7 w-12 shrink-0 rounded-full transition ${aviso ? 'bg-acento' : 'bg-borde'}`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-fondo transition-all ${aviso ? 'left-6' : 'left-1'}`}
          />
        </button>
      </div>

      {aviso && (
        <>
          <div className="grid grid-cols-2 rounded-full border border-borde bg-fondo p-1" role="group">
            {Object.entries(ALCANCES).map(([clave, texto]) => (
              <button
                key={clave}
                type="button"
                onClick={() => cambiar('alcance', clave)}
                aria-pressed={aviso.alcance === clave}
                className={`rounded-full py-1.5 text-sm font-semibold transition ${
                  aviso.alcance === clave ? 'bg-acento text-fondo' : 'text-suave hover:text-texto'
                }`}
              >
                {texto}
              </button>
            ))}
          </div>

          {aviso.alcance === 'zona' ? (
            <Desplegable
              id="aviso-km"
              etiqueta="Hasta"
              valor={aviso.km}
              onCambiar={(valor) => cambiar('km', Number(valor))}
            >
              {OPCIONES_KM.map((km) => (
                <option key={km} value={km}>
                  {km} km de {ubicacion.nombre}
                </option>
              ))}
            </Desplegable>
          ) : (
            <Desplegable
              id="aviso-comunidad"
              etiqueta="Comunidad"
              valor={aviso.comunidad}
              onCambiar={(valor) => cambiar('comunidad', valor)}
            >
              {comunidades.map((comunidad) => (
                <option key={comunidad} value={comunidad}>
                  {comunidad}
                </option>
              ))}
            </Desplegable>
          )}

          <p className="text-sm text-texto">
            {cumplen === 0
              ? 'Ahora mismo ninguno de sus conciertos cumple tu aviso.'
              : `Ya hay ${cumplen} ${cumplen === 1 ? 'concierto anunciado que lo cumple' : 'conciertos anunciados que lo cumplen'}.`}
          </p>

          {/* DEMO: sin servidor no se anuncian conciertos de verdad; este botón lo simula */}
          {MODO_DEMO && (
            <button
              type="button"
              onClick={() => setResultado(onSimular())}
              className="rounded-2xl border border-dashed border-borde py-2 text-sm font-semibold text-suave transition hover:border-acento hover:text-texto"
            >
              🧪 Demo: simular que anuncia un concierto
            </button>
          )}
          {resultado && (
            <p
              role="status"
              className={`rounded-xl p-3 text-sm ${resultado.avisa ? 'bg-acento/15 text-texto' : 'bg-fondo text-suave'}`}
            >
              <strong>{resultado.avisa ? '🔔 Te avisamos' : '🔕 No te avisaríamos'}</strong>:{' '}
              {etiquetaFecha(resultado.concierto.fecha)} en {resultado.concierto.sala}. {resultado.motivo}.
              {resultado.avisa && ' Lo tienes en «Avisos» (campana de Inicio).'}
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default AvisoArtista
