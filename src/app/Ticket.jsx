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

// Aviso con «Cancelar» y «Sí, …» antes de una acción (revender o quitar la reventa)
function Confirmacion({ titulo, textoSi, onConfirmar, onCancelar, children }) {
  return (
    <div role="alertdialog" aria-labelledby="titulo-confirmacion" className="flex flex-col gap-3 rounded-2xl border border-acento bg-superficie p-4">
      <p id="titulo-confirmacion" className="font-bold text-texto">
        {titulo}
      </p>
      {children}
      <div className="flex gap-2">
        <Boton onClick={onCancelar}>Cancelar</Boton>
        <Boton principal onClick={onConfirmar}>
          {textoSi}
        </Boton>
      </div>
    </div>
  )
}

// Pantalla 5: la entrada comprada, con el QR difuminado hasta 1 h antes y opción de revender
function Ticket({ entrada, onBuscar, onRevender, onQuitarReventa }) {
  const [qrVisible, setQrVisible] = useState(false)
  // Qué se está confirmando: null, 'revender' o 'quitar'
  const [confirmando, setConfirmando] = useState(null)
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

  const { concierto, codigo, enReventa, gastosExtra = 0 } = entrada
  const pagado = precioFinal(concierto.precio)
  const recibes = pagado - GASTOS_GESTION
  const ahora = simularHora ? momentoVerQr(concierto) : new Date()
  const sePuedeVer = puedeVerQr(concierto, ahora)
  const mostrarQr = qrVisible && sePuedeVer && !enReventa

  // Pone la entrada a la venta y vuelve a esconder el QR
  function revender() {
    onRevender()
    setConfirmando(null)
    setQrVisible(false)
  }

  // Quita la entrada de la venta (cobra los gastos de gestión)
  function quitarReventa() {
    onQuitarReventa()
    setConfirmando(null)
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
            {enReventa ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-fondo/90 p-3 text-center text-acento">
                <span className="text-2xl" aria-hidden="true">
                  🔄
                </span>
                <p className="text-sm font-bold">Tu QR está en proceso de reventa</p>
              </div>
            ) : (
              !mostrarQr && (
                <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm font-bold">
                  {sePuedeVer ? 'Pulsa «Ver QR» abajo' : `Se verá ${HORAS_ANTES_QR} h antes`}
                </p>
              )
            )}
          </div>

          <p className="font-mono text-xs">{mostrarQr ? codigo : 'AKK-••••••'}</p>
          <p className="text-xs">
            Pagado: {formatearPrecio(pagado)}
            {gastosExtra > 0 && ` + ${formatearPrecio(gastosExtra)} por quitar la reventa`} · válida una sola vez
          </p>
        </div>
      </article>

      <p className="text-center text-xs text-suave">
        Por seguridad, tu QR está difuminado hasta {HORAS_ANTES_QR} h antes del concierto. Desliza para ver las opciones.
      </p>

      <section className="flex flex-col gap-3 pt-6">
        <h2 className="font-bold text-texto">Opciones de tu entrada</h2>

        {confirmando === 'revender' && (
          <Confirmacion
            titulo="¿Seguro que quieres revender tu entrada?"
            textoSi="Sí, revender"
            onConfirmar={revender}
            onCancelar={() => setConfirmando(null)}
          >
            <p className="text-sm text-suave">
              En Akkorde-on solo se revende al precio original: como máximo{' '}
              <strong className="text-texto">{formatearPrecio(pagado)}</strong>.
            </p>
            <p className="text-sm text-suave">
              Precio estimado que recibes: <strong className="text-acento">{formatearPrecio(recibes)}</strong> (
              {formatearPrecio(GASTOS_GESTION)} de gastos de gestión para Akkorde-on).
            </p>
          </Confirmacion>
        )}

        {confirmando === 'quitar' && (
          <Confirmacion
            titulo="¿Seguro que quieres quitar la reventa?"
            textoSi="Sí, quitar"
            onConfirmar={quitarReventa}
            onCancelar={() => setConfirmando(null)}
          >
            <p className="text-sm text-suave">
              Quitar la entrada de la venta cuesta <strong className="text-acento">{formatearPrecio(GASTOS_GESTION)}</strong> de
              gastos de gestión. Tu entrada volverá a ser tuya y podrás usar el QR.
            </p>
          </Confirmacion>
        )}

        {!confirmando && enReventa && (
          <>
            <p className="rounded-2xl border border-borde p-4 text-sm text-suave">
              Tu entrada está a la venta por {formatearPrecio(pagado)}. Todavía no la ha comprado nadie; cuando alguien la
              compre, recibirás {formatearPrecio(recibes)}.
            </p>
            <Boton onClick={() => setConfirmando('quitar')}>
              Quitar reventa ({formatearPrecio(GASTOS_GESTION)} de gastos)
            </Boton>
          </>
        )}

        {!confirmando && !enReventa && (
          <>
            <Boton principal disabled={!sePuedeVer} onClick={() => setQrVisible(!qrVisible)}>
              {qrVisible ? 'Ocultar QR' : 'Ver QR'}
            </Boton>
            {!sePuedeVer && (
              <p className="text-center text-xs text-suave">Podrás verlo el {formatearMomento(momentoVerQr(concierto))}.</p>
            )}
            <Boton onClick={() => setConfirmando('revender')}>Revender entrada</Boton>
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
        <p className="text-center text-xs text-suave">Demo: no es una entrada real ni se cobra nada.</p>
      </section>
    </div>
  )
}

export default Ticket
