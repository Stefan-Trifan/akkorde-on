import { useState } from 'react'
import Avatar from '../components/Avatar.jsx'
import { MI_PERFIL } from '../data/amigos.js'
import { MODO_DEMO } from '../demo/config.js' // DEMO:
import { personaAleatoria } from '../demo/datosAleatorios.js' // DEMO:
import { infoAcceso } from '../data/eventos.js'
import { GASTOS_GESTION, formatearFecha, formatearPrecio } from './formato.js'
import { edadEnFecha, horasLlegada, opcionesVenta, plazasDelCarrito, totalCarrito } from './venta.js'

// ---------- Constantes ----------
const PREFIJOS = ['+34', '+351', '+33', '+44', '+39', '+49', '+1']
const METODOS_PAGO = ['Tarjeta', 'Bizum', 'Apple / Google Pay']
const ASISTENTE_VACIO = {
  nombre: '',
  apellidos: '',
  email: '',
  prefijo: '+34',
  telefono: '',
  nacimiento: '',
  dni: '',
  promos: false,
}

// ---------- Validación ----------
const esEmail = (texto) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto.trim())
const esTelefono = (texto) => /^\d{6,15}$/.test(texto.replace(/\s/g, ''))
const esDocumento = (texto) => /^[A-Z0-9]{6,12}$/i.test(texto.trim())

// Errores de los datos de un asistente de entrada o lista ({ campo: 'mensaje' })
function erroresAsistente(datos, { edadMinima, fechaEvento, pideDni }) {
  const errores = {}
  if (!datos.nombre.trim()) errores.nombre = 'Escribe el nombre'
  if (!datos.apellidos.trim()) errores.apellidos = 'Escribe los apellidos'
  if (!esEmail(datos.email)) errores.email = 'Email no válido: ahí llega el QR'
  if (datos.telefono && !esTelefono(datos.telefono)) errores.telefono = 'Teléfono no válido'
  if (!datos.nacimiento) errores.nacimiento = 'Indica la fecha de nacimiento'
  else if (edadMinima && edadEnFecha(datos.nacimiento, fechaEvento) < edadMinima)
    errores.nacimiento = `Hay que tener ${edadMinima} años el día del evento`
  if (pideDni && !esDocumento(datos.dni)) errores.dni = 'DNI o pasaporte no válido'
  return errores
}

// Errores de los datos del titular de un reservado
function erroresTitular(datos) {
  const errores = {}
  if (!datos.nombre.trim()) errores.nombre = 'Escribe el nombre'
  if (!datos.apellidos.trim()) errores.apellidos = 'Escribe los apellidos'
  if (!esTelefono(datos.telefono)) errores.telefono = 'Móvil obligatorio para confirmar la mesa'
  if (!esEmail(datos.email)) errores.email = 'Email no válido'
  if (!datos.llegada) errores.llegada = 'Elige una hora de llegada'
  return errores
}

// ---------- Piezas del formulario ----------
// Campo con etiqueta y mensaje de error (solo se enseña el error si ya se intentó pagar)
function Campo({ etiqueta, error, mostrarError, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-semibold text-texto">{etiqueta}</span>
      {children}
      {mostrarError && error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  )
}

const ESTILO_INPUT =
  'min-w-0 rounded-xl border border-borde bg-fondo px-3 py-2.5 text-texto placeholder:text-suave/60 focus:border-acento focus:outline-none'

// Prefijo + número de teléfono
function Telefono({ datos, onCambiar }) {
  return (
    <div className="flex gap-2">
      <select
        value={datos.prefijo}
        onChange={(evento) => onCambiar('prefijo', evento.target.value)}
        aria-label="Código de país"
        className={`${ESTILO_INPUT} w-24 shrink-0`}
      >
        {PREFIJOS.map((prefijo) => (
          <option key={prefijo}>{prefijo}</option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="tel"
        value={datos.telefono}
        onChange={(evento) => onCambiar('telefono', evento.target.value)}
        placeholder="600 000 000"
        className={`${ESTILO_INPUT} flex-1`}
      />
    </div>
  )
}

// Casilla de verificación con texto
function Casilla({ marcada, onCambiar, children }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-suave">
      <input
        type="checkbox"
        checked={marcada}
        onChange={(evento) => onCambiar(evento.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-acento"
      />
      <span>{children}</span>
    </label>
  )
}

// Fila deslizable con «Yo» y tus amigos: al pulsar uno se rellenan sus datos de un toque
function RellenarCon({ personas, onElegir }) {
  if (personas.length === 0) return null
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-suave">Rellenar con:</span>
      <div className="sin-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            onClick={() => onElegir(persona)}
            className="flex shrink-0 items-center gap-2 rounded-full border border-borde py-1 pl-1 pr-3 text-sm text-texto transition hover:border-acento"
          >
            <Avatar persona={persona} tamano="s" />
            {persona.id === MI_PERFIL.id ? 'Yo' : persona.nombre}
          </button>
        ))}
      </div>
    </div>
  )
}

// Datos de una persona (tu perfil o un amigo) que se copian al formulario
function datosDe(persona) {
  return {
    nombre: persona.nombre,
    apellidos: persona.apellidos,
    email: persona.email,
    prefijo: persona.prefijo,
    telefono: persona.telefono,
    nacimiento: persona.nacimiento,
  }
}

// Bloque desplegable de un asistente (como un acordeón): cabecera con estado y contenido
function Desplegable({ titulo, subtitulo, abierto, completo, onAlternar, children }) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border bg-superficie transition ${abierto ? 'border-acento/70' : 'border-borde'}`}
    >
      <button
        type="button"
        onClick={onAlternar}
        aria-expanded={abierto}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            completo ? 'bg-acento text-fondo' : 'border border-borde text-suave'
          }`}
          aria-hidden="true"
        >
          {completo ? '✓' : ''}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-bold text-texto">{titulo}</span>
          <span className="truncate text-xs text-suave">{subtitulo}</span>
        </span>
        <span className={`text-suave transition ${abierto ? 'rotate-180' : ''}`} aria-hidden="true">
          ⌄
        </span>
      </button>
      {abierto && <div className="flex flex-col gap-4 border-t border-borde px-4 pb-4 pt-4">{children}</div>}
    </section>
  )
}

// Pantalla 4: datos de cada asistente (o del titular del reservado) y pago simulado.
// No se paga de verdad ni se piden datos de tarjeta.
function Checkout({ concierto, carrito, datosGuardados, amigos = [], onGuardarDatos, onPagar, onVerEntradas, onVolver }) {
  const { pideDni, reservadoHasta, senalReservado } = opcionesVenta(concierto)
  const { edadMinima } = infoAcceso(concierto)
  const plazas = plazasDelCarrito(carrito)
  // Una ficha de datos por cada entrada o lista; el reservado tiene un único titular
  const plazasConFicha = plazas.filter((plaza) => plaza.tipo !== 'reservado')
  const reservado = carrito.reservado

  const [pagado, setPagado] = useState(false)
  // Al intentar pagar con datos incompletos se enseñan los errores
  const [intentado, setIntentado] = useState(false)
  // La primera ficha empieza rellena si el usuario pidió recordar sus datos
  // DEMO: en modo demo cada ficha empieza rellena con una persona aleatoria válida (ver src/demo)
  const datosDemo = () => (MODO_DEMO ? personaAleatoria(concierto.fecha) : {})
  const llegadaDemo = () => (MODO_DEMO ? horasLlegada(concierto, reservadoHasta)[1] ?? '' : '')
  const [asistentes, setAsistentes] = useState(() =>
    plazasConFicha.map((_, i) => ({ ...ASISTENTE_VACIO, ...datosDemo(), ...(i === 0 ? datosGuardados : {}) })),
  )
  const [titular, setTitular] = useState(() => ({
    ...ASISTENTE_VACIO,
    ...datosDemo(),
    ...datosGuardados,
    llegada: llegadaDemo(),
  }))

  // DEMO: cambia todas las fichas por otras personas aleatorias
  function otrosDatosDemo() {
    setAsistentes(asistentes.map((datos) => ({ ...datos, ...personaAleatoria(concierto.fecha) })))
    setTitular({ ...titular, ...personaAleatoria(concierto.fecha) })
  }
  const [recordar, setRecordar] = useState(Boolean(datosGuardados))
  const [abierto, setAbierto] = useState(reservado && plazasConFicha.length === 0 ? 'titular' : 0)
  const [pagarSenal, setPagarSenal] = useState(senalReservado !== null)
  const [metodo, setMetodo] = useState(METODOS_PAGO[0])

  const reglas = { edadMinima, fechaEvento: concierto.fecha, pideDni }
  const errores = asistentes.map((datos) => erroresAsistente(datos, reglas))
  const erroresDelTitular = reservado ? erroresTitular(titular) : {}
  const todoBien = errores.every((e) => Object.keys(e).length === 0) && Object.keys(erroresDelTitular).length === 0

  // ---------- Importes ----------
  const total = totalCarrito(carrito)
  const unidadesPagadas =
    carrito.lineas.reduce((suma, linea) => suma + (linea.precio > 0 ? linea.cantidad : 0), 0) + (reservado ? 1 : 0)
  const gastos = unidadesPagadas * GASTOS_GESTION
  const subtotal = total - gastos
  // Con señal, del reservado solo se paga ahora la señal; el resto en el local
  const restoEnLocal = reservado && pagarSenal ? reservado.precio - senalReservado : 0
  const ahora = total - restoEnLocal

  function cambiarAsistente(indice, campo, valor) {
    setAsistentes(asistentes.map((datos, i) => (i === indice ? { ...datos, [campo]: valor } : datos)))
  }
  function cambiarTitular(campo, valor) {
    setTitular({ ...titular, [campo]: valor })
  }

  // «Yo» y tus amigos que todavía no están en otra ficha (se comparan por email)
  const personas = [MI_PERFIL, ...amigos]
  function personasLibres(indice) {
    const usados = asistentes.filter((_, i) => i !== indice).map((datos) => datos.email.trim().toLowerCase())
    return personas.filter((persona) => !usados.includes(persona.email))
  }

  // Rellena una ficha con los datos de una persona y abre la siguiente sin completar
  function rellenarAsistente(indice, persona) {
    const nuevos = asistentes.map((datos, i) => (i === indice ? { ...datos, ...datosDe(persona) } : datos))
    setAsistentes(nuevos)
    const siguiente = nuevos.findIndex((datos) => Object.keys(erroresAsistente(datos, reglas)).length > 0)
    setAbierto(siguiente >= 0 ? siguiente : reservado ? 'titular' : null)
  }

  // Si falta algo, se marcan los errores y se abre el primer bloque incompleto
  function pagar() {
    if (!todoBien) {
      setIntentado(true)
      const primero = errores.findIndex((e) => Object.keys(e).length > 0)
      setAbierto(primero >= 0 ? primero : 'titular')
      return
    }
    onGuardarDatos(recordar ? datosBasicos(plazasConFicha.length > 0 ? asistentes[0] : titular) : null)

    let ficha = 0
    let acompanante = 0
    const nombreTitular = `${titular.nombre.trim()} ${titular.apellidos.trim()}`
    onPagar(
      plazas.map((plaza) => {
        if (plaza.tipo === 'reservado') {
          acompanante++
          const extra = { llegada: titular.llegada, aviso: `${plaza.aviso} · llegada ${titular.llegada}` }
          return acompanante === 1
            ? { ...plaza, ...extra, asistente: nombreTitular }
            : { ...plaza, ...extra, asistente: `Acompañante ${acompanante - 1} de ${titular.nombre.trim()}` }
        }
        const datos = asistentes[ficha++]
        return { ...plaza, asistente: `${datos.nombre.trim()} ${datos.apellidos.trim()}`, email: datos.email.trim() }
      }),
    )
    setPagado(true)
  }

  if (pagado) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-exito text-4xl text-fondo">✓</div>
        <h1 className="text-2xl font-extrabold text-texto">¡Compra hecha!</h1>
        <p className="text-suave">
          {plazas.length === 1 ? 'Tu entrada ya está' : `Las ${plazas.length} entradas ya están`} en Mis entradas, cada una
          con su QR. También os llegarán por email{reservado && ' y la confirmación de la mesa por WhatsApp'}.
        </p>
        {restoEnLocal > 0 && (
          <p className="rounded-2xl bg-superficie p-3 text-sm text-texto">
            Pagaste la señal de la mesa. Quedan <strong>{formatearPrecio(restoEnLocal)}</strong> a pagar en el local.
          </p>
        )}
        <button
          type="button"
          onClick={onVerEntradas}
          className="w-full rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110"
        >
          Ver mis entradas
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 px-5 pb-8 pt-4">
      <button type="button" onClick={onVolver} className="self-start text-suave hover:text-texto">
        ← Cambiar entradas
      </button>
      <header>
        <h1 className="text-2xl font-extrabold text-texto">Tus datos</h1>
        <p className="text-sm text-suave">
          {concierto.nombre} · {concierto.sala} · {formatearFecha(concierto.fecha)} · {concierto.hora}
        </p>
      </header>

      {/* DEMO: aviso de que los datos son de prueba, con botón para generar otros */}
      {MODO_DEMO && (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-acento/50 bg-acento/5 p-3">
          <p className="flex-1 text-xs text-suave">
            🧪 <strong className="text-texto">Modo demo:</strong> hemos rellenado datos de prueba inventados para que
            puedas pagar directamente. Puedes cambiarlos.
          </p>
          <button
            type="button"
            onClick={otrosDatosDemo}
            className="shrink-0 rounded-full border border-borde px-3 py-1.5 text-xs font-semibold text-texto hover:border-acento"
          >
            🎲 Otros
          </button>
        </div>
      )}

      {/* Lo que se compra, como en la tarjeta de la izquierda de la web */}
      <ul className="flex flex-col gap-2">
        {carrito.lineas.map((linea) => (
          <li key={linea.nombre} className="flex items-center justify-between gap-3 rounded-2xl bg-superficie p-3">
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold uppercase text-texto">{linea.nombre.split(' · ')[0]}</span>
              {linea.nombre.includes(' · ') && (
                <span className="w-fit rounded-full bg-acento/15 px-2 py-0.5 text-[10px] font-bold uppercase text-acento">
                  {linea.nombre.split(' · ')[1]}
                </span>
              )}
            </span>
            <span className="shrink-0 text-sm text-suave">
              {linea.cantidad} × {linea.precio === 0 ? 'Gratis' : formatearPrecio(linea.precio)}
            </span>
          </li>
        ))}
        {reservado && (
          <li className="flex items-center justify-between gap-3 rounded-2xl bg-superficie p-3">
            <span className="flex flex-col">
              <span className="text-sm font-bold uppercase text-texto">Reservado {reservado.nombre}</span>
              <span className="text-xs text-suave">
                {reservado.personas} personas · {reservado.incluye}
              </span>
            </span>
            <span className="shrink-0 text-sm text-suave">{formatearPrecio(reservado.precio)}</span>
          </li>
        )}
      </ul>

      {/* ---------- Un bloque por cada entrada o lista ---------- */}
      {plazasConFicha.map((plaza, i) => {
        const datos = asistentes[i]
        const err = errores[i]
        const completo = Object.keys(err).length === 0
        return (
          <Desplegable
            key={i}
            titulo={`Datos del asistente ${i + 1}`}
            subtitulo={completo ? `${datos.nombre} ${datos.apellidos} · ${plaza.opcion}` : plaza.opcion}
            abierto={abierto === i}
            completo={completo}
            onAlternar={() => setAbierto(abierto === i ? null : i)}
          >
            <RellenarCon personas={personasLibres(i)} onElegir={(persona) => rellenarAsistente(i, persona)} />
            <div className="grid grid-cols-2 gap-3">
              <Campo etiqueta="Nombre" error={err.nombre} mostrarError={intentado}>
                <input
                  value={datos.nombre}
                  onChange={(e) => cambiarAsistente(i, 'nombre', e.target.value)}
                  autoComplete={i === 0 ? 'given-name' : 'off'}
                  className={ESTILO_INPUT}
                />
              </Campo>
              <Campo etiqueta="Apellidos" error={err.apellidos} mostrarError={intentado}>
                <input
                  value={datos.apellidos}
                  onChange={(e) => cambiarAsistente(i, 'apellidos', e.target.value)}
                  autoComplete={i === 0 ? 'family-name' : 'off'}
                  className={ESTILO_INPUT}
                />
              </Campo>
            </div>
            <Campo etiqueta="Email (aquí te llega el QR)" error={err.email} mostrarError={intentado}>
              <input
                type="email"
                value={datos.email}
                onChange={(e) => cambiarAsistente(i, 'email', e.target.value)}
                autoComplete={i === 0 ? 'email' : 'off'}
                className={ESTILO_INPUT}
              />
            </Campo>
            <Campo
              etiqueta={`Fecha de nacimiento${edadMinima ? ` (+${edadMinima})` : ''}`}
              error={err.nacimiento}
              mostrarError={intentado || Boolean(datos.nacimiento)}
            >
              <input
                type="date"
                value={datos.nacimiento}
                onChange={(e) => cambiarAsistente(i, 'nacimiento', e.target.value)}
                className={ESTILO_INPUT}
              />
            </Campo>
            <Campo etiqueta="Teléfono (opcional, para avisos del evento)" error={err.telefono} mostrarError={intentado}>
              <Telefono datos={datos} onCambiar={(campo, valor) => cambiarAsistente(i, campo, valor)} />
            </Campo>
            {pideDni && (
              <Campo etiqueta="DNI o pasaporte (lo pide el local)" error={err.dni} mostrarError={intentado}>
                <input
                  value={datos.dni}
                  onChange={(e) => cambiarAsistente(i, 'dni', e.target.value.toUpperCase())}
                  placeholder="12345678Z"
                  className={ESTILO_INPUT}
                />
              </Campo>
            )}
            <Casilla marcada={datos.promos} onCambiar={(valor) => cambiarAsistente(i, 'promos', valor)}>
              Quiero recibir por email o SMS promociones y próximos eventos de <strong>{concierto.sala}</strong>
            </Casilla>
          </Desplegable>
        )
      })}

      {/* ---------- Titular del reservado ---------- */}
      {reservado && (
        <Desplegable
          titulo={`Titular del reservado · ${reservado.nombre}`}
          subtitulo={
            Object.keys(erroresDelTitular).length === 0
              ? `${titular.nombre} ${titular.apellidos} · llegada ${titular.llegada}`
              : `${reservado.personas} personas · a nombre de una persona`
          }
          abierto={abierto === 'titular'}
          completo={Object.keys(erroresDelTitular).length === 0}
          onAlternar={() => setAbierto(abierto === 'titular' ? null : 'titular')}
        >
          <RellenarCon personas={personas} onElegir={(persona) => setTitular({ ...titular, ...datosDe(persona) })} />
          <div className="grid grid-cols-2 gap-3">
            <Campo etiqueta="Nombre" error={erroresDelTitular.nombre} mostrarError={intentado}>
              <input
                value={titular.nombre}
                onChange={(e) => cambiarTitular('nombre', e.target.value)}
                className={ESTILO_INPUT}
              />
            </Campo>
            <Campo etiqueta="Apellidos" error={erroresDelTitular.apellidos} mostrarError={intentado}>
              <input
                value={titular.apellidos}
                onChange={(e) => cambiarTitular('apellidos', e.target.value)}
                className={ESTILO_INPUT}
              />
            </Campo>
          </div>
          <Campo etiqueta="Móvil (WhatsApp): confirmación, QR y llegada" error={erroresDelTitular.telefono} mostrarError={intentado}>
            <Telefono datos={titular} onCambiar={cambiarTitular} />
          </Campo>
          <Campo etiqueta="Email" error={erroresDelTitular.email} mostrarError={intentado}>
            <input
              type="email"
              value={titular.email}
              onChange={(e) => cambiarTitular('email', e.target.value)}
              className={ESTILO_INPUT}
            />
          </Campo>
          <div className="flex items-center justify-between rounded-xl bg-fondo px-3 py-2.5 text-sm">
            <span className="text-suave">Personas</span>
            <span className="font-semibold text-texto">
              {reservado.personas}
              <button type="button" onClick={onVolver} className="ml-2 text-xs font-bold text-acento hover:underline">
                Cambiar
              </button>
            </span>
          </div>
          <Campo
            etiqueta={`Hora aproximada de llegada (la mesa se guarda hasta las ${reservadoHasta})`}
            error={erroresDelTitular.llegada}
            mostrarError={intentado}
          >
            <select value={titular.llegada} onChange={(e) => cambiarTitular('llegada', e.target.value)} className={ESTILO_INPUT}>
              <option value="">Elige una hora</option>
              {horasLlegada(concierto, reservadoHasta).map((hora) => (
                <option key={hora}>{hora}</option>
              ))}
            </select>
          </Campo>
          {senalReservado !== null && (
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-xs font-semibold text-texto">¿Cuánto pagas ahora por la mesa?</legend>
              <Casilla marcada={pagarSenal} onCambiar={() => setPagarSenal(true)}>
                Solo la señal: <strong className="text-texto">{formatearPrecio(senalReservado)}</strong> para bloquearla; el
                resto ({formatearPrecio(reservado.precio - senalReservado)}) en el local
              </Casilla>
              <Casilla marcada={!pagarSenal} onCambiar={() => setPagarSenal(false)}>
                La mesa entera: <strong className="text-texto">{formatearPrecio(reservado.precio)}</strong>
              </Casilla>
            </fieldset>
          )}
          <p className="text-xs text-suave">
            Los acompañantes tendrán su propia entrada con QR en tu móvil y podrás enviársela desde Mis entradas.
          </p>
        </Desplegable>
      )}

      <Casilla marcada={recordar} onCambiar={setRecordar}>
        Recordar mis datos para próximas compras
      </Casilla>

      {/* ---------- Pago ---------- */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-suave">Forma de pago</h2>
        <div className="grid grid-cols-3 gap-2">
          {METODOS_PAGO.map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() => setMetodo(opcion)}
              aria-pressed={metodo === opcion}
              className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                metodo === opcion ? 'border-acento bg-acento/10 text-texto' : 'border-borde text-suave hover:text-texto'
              }`}
            >
              {opcion}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex justify-between text-suave">
            <span>Subtotal</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>
          <div className="flex justify-between text-suave">
            <span>Gastos de gestión</span>
            <span>{formatearPrecio(gastos)}</span>
          </div>
          {restoEnLocal > 0 && (
            <div className="flex justify-between text-suave">
              <span>A pagar en el local</span>
              <span>− {formatearPrecio(restoEnLocal)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between border-t border-borde pt-2 text-base font-bold text-texto">
            <span>{restoEnLocal > 0 ? 'Pagas ahora' : 'Total'}</span>
            <span>{formatearPrecio(ahora)}</span>
          </div>
        </div>

        <p className="text-center text-xs text-suave">
          Al pagar aceptas los términos y condiciones, la política de privacidad y las condiciones del organizador.
          {/* DEMO: aviso de pago simulado */}
          {MODO_DEMO && ' Demo: no se realiza ningún pago real ni se piden datos de tarjeta.'}
        </p>

        {intentado && !todoBien && (
          <p className="text-center text-sm text-red-400" role="alert">
            Faltan datos. Revisa los bloques sin ✓.
          </p>
        )}
        <button
          type="button"
          onClick={pagar}
          className="rounded-2xl bg-acento py-3 font-bold text-fondo transition hover:brightness-110"
        >
          {ahora === 0 ? 'Confirmar (gratis)' : `Pagar ahora (${formatearPrecio(ahora)}) con ${metodo}`}
        </button>
      </section>
    </div>
  )
}

// Solo nombre, apellidos, email y teléfono se recuerdan para la siguiente compra
function datosBasicos(datos) {
  return {
    nombre: datos.nombre,
    apellidos: datos.apellidos,
    email: datos.email,
    prefijo: datos.prefijo,
    telefono: datos.telefono,
  }
}

export default Checkout
