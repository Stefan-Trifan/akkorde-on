import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Avatar from '../components/Avatar.jsx'
import { MI_PERFIL, buscarUsuarios, nombreCompleto, usuarioPorId } from '../data/amigos.js'

// ---------- Constantes ----------
// Enlace para que otra persona te agregue (simulado)
const ENLACE_PERFIL = `https://akkorde-on.app/u/${MI_PERFIL.id}`

// Título pequeño de cada bloque
function Bloque({ titulo, children }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xs font-bold uppercase tracking-widest text-suave">{titulo}</h2>
      {children}
    </section>
  )
}

// Fila de una persona con botones a la derecha
function Persona({ persona, detalle, children }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-superficie p-3">
      <Avatar persona={persona} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-semibold text-texto">{nombreCompleto(persona)}</span>
        <span className="truncate text-xs text-suave">{detalle ?? `@${persona.id}`}</span>
      </div>
      {children}
    </li>
  )
}

const BOTON_PRINCIPAL = 'rounded-full bg-acento px-3 py-1.5 text-xs font-bold text-fondo transition hover:brightness-110'
const BOTON_SECUNDARIO = 'rounded-full border border-borde px-3 py-1.5 text-xs font-semibold text-suave hover:text-texto'

// Pantalla «Amigos»: tu perfil y QR, añadir por @usuario o teléfono, solicitudes y lista de amigos
function Amigos({ amigos, recibidas, enviadas, planesDe, onEnviarSolicitud, onAceptar, onRechazar, onEliminar }) {
  const [verQr, setVerQr] = useState(false)
  const [aviso, setAviso] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('')
  // Amigo con «¿Eliminar?» abierto
  const [eliminando, setEliminando] = useState(null)

  const resultados = buscarUsuarios(busqueda)
  const listaAmigos = amigos
    .map(usuarioPorId)
    .filter((amigo) => nombreCompleto(amigo).toLowerCase().includes(filtro.toLowerCase()))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))

  // Comparte el enlace del perfil (menú del móvil) o lo copia al portapapeles en el ordenador
  async function compartir() {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Agrégame en Akkorde-on', url: ENLACE_PERFIL })
      } else {
        await navigator.clipboard.writeText(ENLACE_PERFIL)
        setAviso('Enlace copiado')
      }
    } catch {
      setAviso('No se pudo compartir el enlace')
    }
  }

  // Estado de un usuario respecto a ti, para el botón de la búsqueda
  function botonBusqueda(usuario) {
    if (amigos.includes(usuario.id)) return <span className="text-xs font-semibold text-acento">✓ Amigos</span>
    if (enviadas.includes(usuario.id)) return <span className="text-xs text-suave">Pendiente…</span>
    if (recibidas.includes(usuario.id))
      return (
        <button type="button" onClick={() => onAceptar(usuario.id)} className={BOTON_PRINCIPAL}>
          Aceptar
        </button>
      )
    return (
      <button type="button" onClick={() => onEnviarSolicitud(usuario.id)} className={BOTON_PRINCIPAL}>
        + Añadir
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-8">
      <h1 className="text-2xl font-extrabold text-texto">Amigos</h1>

      {/* ---------- Tu perfil ---------- */}
      <section className="flex flex-col gap-4 rounded-2xl border border-borde bg-superficie p-4">
        <div className="flex items-center gap-3">
          <Avatar persona={MI_PERFIL} tamano="l" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-lg font-bold text-texto">{nombreCompleto(MI_PERFIL)}</span>
            <span className="text-sm text-acento">@{MI_PERFIL.id}</span>
            <span className="text-xs text-suave">
              {amigos.length} {amigos.length === 1 ? 'amigo' : 'amigos'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setVerQr(!verQr)} className={`${BOTON_SECUNDARIO} py-2`}>
            {verQr ? 'Ocultar mi QR' : '▦ Mi QR'}
          </button>
          <button type="button" onClick={compartir} className={`${BOTON_SECUNDARIO} py-2`}>
            🔗 Compartir enlace
          </button>
        </div>
        {aviso && (
          <p className="text-center text-xs text-acento" role="status">
            {aviso}
          </p>
        )}
        {verQr && (
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-crema p-4 text-fondo">
            <QRCodeSVG value={ENLACE_PERFIL} size={160} />
            <p className="text-center text-xs">Que tu amigo lo escanee con Akkorde-on para agregarte</p>
          </div>
        )}
      </section>

      {/* ---------- Añadir ---------- */}
      <Bloque titulo="Añadir amigos">
        <input
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="🔍  @usuario, nombre o teléfono"
          aria-label="Buscar personas por usuario, nombre o teléfono"
          className="rounded-2xl border border-borde bg-superficie px-4 py-3 text-texto placeholder:text-suave focus:border-acento focus:outline-none"
        />
        {busqueda.trim().length >= 2 && resultados.length === 0 && (
          <p className="px-1 text-sm text-suave">Nadie con ese usuario o teléfono en Akkorde-on.</p>
        )}
        <ul className="flex flex-col gap-2">
          {resultados.map((usuario) => (
            <Persona key={usuario.id} persona={usuario}>
              {botonBusqueda(usuario)}
            </Persona>
          ))}
        </ul>
        {busqueda.trim().length < 2 && (
          <p className="px-1 text-xs text-suave">Prueba con «sofia», «@carla.m» o «655».</p>
        )}
      </Bloque>

      {/* ---------- Solicitudes ---------- */}
      {recibidas.length > 0 && (
        <Bloque titulo={`Solicitudes · ${recibidas.length}`}>
          <ul className="flex flex-col gap-2">
            {recibidas.map(usuarioPorId).map((usuario) => (
              <Persona key={usuario.id} persona={usuario} detalle={`@${usuario.id} quiere ser tu amigo`}>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => onRechazar(usuario.id)} className={BOTON_SECUNDARIO}>
                    ✕
                  </button>
                  <button type="button" onClick={() => onAceptar(usuario.id)} className={BOTON_PRINCIPAL}>
                    Aceptar
                  </button>
                </div>
              </Persona>
            ))}
          </ul>
        </Bloque>
      )}

      {enviadas.length > 0 && (
        <Bloque titulo="Enviadas">
          <ul className="flex flex-col gap-2">
            {enviadas.map(usuarioPorId).map((usuario) => (
              <Persona key={usuario.id} persona={usuario} detalle="Esperando a que acepte…" />
            ))}
          </ul>
        </Bloque>
      )}

      {/* ---------- Tus amigos ---------- */}
      <Bloque titulo={`Tus amigos · ${amigos.length}`}>
        {amigos.length > 4 && (
          <input
            type="search"
            value={filtro}
            onChange={(evento) => setFiltro(evento.target.value)}
            placeholder="Buscar entre tus amigos"
            aria-label="Buscar entre tus amigos"
            className="rounded-xl border border-borde bg-superficie px-3 py-2 text-sm text-texto placeholder:text-suave focus:border-acento focus:outline-none"
          />
        )}
        {amigos.length === 0 && (
          <p className="rounded-2xl border border-dashed border-borde p-6 text-center text-sm text-suave">
            Aún no tienes amigos en Akkorde-on. Búscalos arriba o comparte tu QR.
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {listaAmigos.map((amigo) => {
            const planes = planesDe(amigo.id)
            return (
              <Persona
                key={amigo.id}
                persona={amigo}
                detalle={planes.length > 0 ? `🎟️ Va a ${planes.join(', ')}` : `@${amigo.id}`}
              >
                {eliminando === amigo.id ? (
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => setEliminando(null)} className={BOTON_SECUNDARIO}>
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onEliminar(amigo.id)
                        setEliminando(null)
                      }}
                      className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEliminando(amigo.id)}
                    aria-label={`Opciones de ${amigo.nombre}`}
                    className="px-2 text-lg text-suave hover:text-texto"
                  >
                    ⋯
                  </button>
                )}
              </Persona>
            )
          })}
        </ul>
      </Bloque>

      <p className="text-center text-xs text-suave">Demo: las personas son inventadas y no se envía nada a nadie.</p>
    </div>
  )
}

export default Amigos
