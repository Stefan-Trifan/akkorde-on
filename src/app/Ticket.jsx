import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { GASTOS_GESTION, formatearFecha, formatearPrecio, precioFinal } from './formato.js'
import { HORAS_ANTES_QR, formatearMomento, momentoVerQr, puedeVerQr } from './tiempo.js'

// Botón grande de acción (lima o con borde)
function Boton({ principal, disabled, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        principal ? 'bg-acento text-fondo hover:brightness-110' : 'border border-borde text-texto hover:border-acento'
      }`}
    >
      {children}
    </button>
  )
}

// Aviso antes de revender: precio máximo y lo que recibe el usuario
function ConfirmarReventa({ pagado, recibes, onConfirmar, onCancelar }) {
  return (
    <div role="alertdialog" aria-labelledby="titulo-reventa" className="flex flex-col gap-3 rounded-2xl border border-acento bg-superficie p-4">
      <p id="titulo-reventa" className="font-bold text-texto">¿Seguro que quieres revender tu entrada?</p>
      <p className="text-sm text-suave">
        En Akkorde-on solo se revende al precio original: como máximo <strong className="text-texto">{formatearPrecio(pagado)}</strong>.
      </p>
      <p className="text-sm text-suave">
        Precio estimado que recibes: <strong className="text-acento">{formatearPrecio(recibes)}</strong> ({formatearPrecio(GASTOS_GESTION)} de
        gastos de gestión para Akkorde-on).
      </p>
      <div className="flex gap-2">
        <Boton onClick={onCancelar}>Cancelar</Boton>
        <Boton principal onClick={onConfirmar}>
          Sí, revender
        </Boton>
      </div>
    </div>
  )
}

// Pantalla 5: la entrada comprada, con el QR difuminado hasta 1 h antes y opción de revender
function Ticket({ entrada, onBuscar, onRevender }) {
  const [qrVisible, setQrVisible] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  // Solo para la demo: hacer como si faltara 1 h para el concierto
  const [simularHora, setSimularHora] = useState(false)

  if (!entrada) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-suave">Todavía no tienes entradas.</p>
        <button type="button" onClick={onBuscar} className="font-bold text-acento">
          Buscar conciertos
        </button>
      </div>
    )
  }

  const { concierto, codigo, enReventa } = entrada
  const pagado = precioFinal(concierto.precio)
  const recibes = pagado - GASTOS_GESTION
  const ahora = simularHora ? momentoVerQr(concierto) : new Date()
  const sePuedeVer = puedeVerQr(concierto, ahora)
  const mostrarQr = qrVisible && sePuedeVer && !enReventa

  // Confirma la reventa y vuelve a esconder el QR
  function revender() {
    onRevender()
    setConfirmando(false)
    setQrVisible(false)
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="pt-4 text-2xl font-extrabold text-texto">Mi entrada</h1>

      <article className="overflow-hidden rounded-3xl bg-crema text-fondo">
        <img src={concierto.imagen} alt="" className="aspect-[8/3] w-full object-cover" />
        <div className="flex flex-col items-center gap-3 p-5">
          <div className="text-center">
            <p className="text-xl font-extrabold">{concierto.nombre}</p>
            <p className="text-sm">
              {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
            </p>
          </div>

          <div className="relative">
            <div className={`transition duration-500 ${mostrarQr ? '' : 'blur-md'}`} aria-hidden={!mostrarQr}>
              <QRCodeSVG value={codigo} size={176} />
            </div>
            {!mostrarQr && (
              <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm font-bold">
                {enReventa ? 'Entrada a la venta' : sePuedeVer ? 'Pulsa «Ver QR» abajo' : `Se verá ${HORAS_ANTES_QR} h antes`}
              </p>
            )}
          </div>

          <p className="font-mono text-xs">{mostrarQr ? codigo : 'AKK-••••••'}</p>
          <p className="text-xs">Pagado: {formatearPrecio(pagado)} · válida una sola vez</p>
          {enReventa && (
            <p className="rounded-full bg-fondo px-3 py-1 text-xs font-bold text-acento">
              A la venta por {formatearPrecio(pagado)}
            </p>
          )}
        </div>
      </article>

      <p className="text-center text-xs text-suave">
        Por seguridad, tu QR está difuminado hasta {HORAS_ANTES_QR} h antes del concierto. Desliza para ver las opciones.
      </p>

      <section className="flex flex-col gap-3 pt-6">
        <h2 className="font-bold text-texto">Opciones de tu entrada</h2>

        {enReventa ? (
          <p className="rounded-2xl border border-borde p-4 text-sm text-suave">
            Tu entrada está a la venta por {formatearPrecio(pagado)}. Cuando alguien la compre, recibirás{' '}
            {formatearPrecio(recibes)}.
          </p>
        ) : confirmando ? (
          <ConfirmarReventa pagado={pagado} recibes={recibes} onConfirmar={revender} onCancelar={() => setConfirmando(false)} />
        ) : (
          <>
            <Boton principal disabled={!sePuedeVer} onClick={() => setQrVisible(!qrVisible)}>
              {qrVisible ? 'Ocultar QR' : 'Ver QR'}
            </Boton>
            {!sePuedeVer && (
              <p className="text-center text-xs text-suave">
                Podrás verlo el {formatearMomento(momentoVerQr(concierto))}.
              </p>
            )}
            <Boton onClick={() => setConfirmando(true)}>Revender entrada</Boton>
          </>
        )}

        <button
          type="button"
          onClick={() => setSimularHora(!simularHora)}
          aria-pressed={simularHora}
          className="mt-4 rounded-2xl border border-dashed border-borde p-3 text-xs text-suave hover:text-texto"
        >
          🧪 Demo: {simularHora ? 'volver a la hora real' : `simular que falta ${HORAS_ANTES_QR} h para el concierto`}
        </button>
        <p className="text-center text-xs text-suave">Demo: no es una entrada real.</p>
      </section>
    </div>
  )
}

export default Ticket
