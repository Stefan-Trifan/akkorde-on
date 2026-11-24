import { useState } from 'react'
import Home from './Home.jsx'
import Search from './Search.jsx'
import EventDetail from './EventDetail.jsx'
import Checkout from './Checkout.jsx'
import ElegirEntradas from './ElegirEntradas.jsx'
import MyTickets from './MyTickets.jsx'
import TicketCarrusel from './TicketCarrusel.jsx'
import VenueDetail from './VenueDetail.jsx'
import Amigos from './Amigos.jsx'
import { AMIGOS_INICIALES, SOLICITUDES_INICIALES, asistencia, usuarioPorId } from '../data/amigos.js'
import { eventos } from '../data/eventos.js'
import { esProximo } from './tiempo.js'
import { MODO_DEMO } from '../demo/config.js' // DEMO:
import { crearEntradasDemo } from '../demo/entradasDemo.js' // DEMO:
import { UBICACION_INICIAL } from '../data/zonas.js'
import { GASTOS_GESTION, TODOS, crearCodigoEntrada } from './formato.js'
import { DISTANCIA_MAX_KM } from './distancia.js'

// ---------- Constantes ----------
// Pestañas de la barra inferior
const PESTANAS = [
  { pantalla: 'inicio', texto: 'Inicio', icono: '🏠' },
  { pantalla: 'buscar', texto: 'Buscar', icono: '🔍' },
  { pantalla: 'entradas', texto: 'Mis entradas', icono: '🎟️' },
  { pantalla: 'amigos', texto: 'Amigos', icono: '👥' },
  { pantalla: 'avisame', texto: 'Avísame', icono: '🔔' },
]
// DEMO: segundos que tarda en «aceptar» una solicitud de amistad (con backend, lo decide la otra persona)
const SEGUNDOS_ACEPTAR = 3

// Vista App: la demo de Akkorde-on como app de móvil
function AppView({ onAbrirAvisame }) {
  const [pantalla, setPantalla] = useState('inicio')
  const [conciertoElegido, setConciertoElegido] = useState(null)
  // Todas las entradas compradas y las que se están viendo en el carrusel ([] = se ve la lista)
  // DEMO: en modo demo se empieza con unas entradas de ejemplo (ver src/demo/entradasDemo.js)
  const [entradas, setEntradas] = useState(() => (MODO_DEMO ? crearEntradasDemo() : []))
  const [idsAbiertos, setIdsAbiertos] = useState([])
  // Pantalla desde la que se abrió la ficha, para que «Volver» regrese ahí
  const [origen, setOrigen] = useState('inicio')
  // Filtro de la búsqueda; vive aquí para no perderlo al volver de la ficha
  const [genero, setGenero] = useState(TODOS)
  // Filtro por distancia en km (empieza al máximo: se ven todos)
  const [radio, setRadio] = useState(DISTANCIA_MAX_KM)
  // Punto desde el que se miden las distancias ({ nombre, lat, lng }): una zona o el GPS
  const [ubicacion, setUbicacion] = useState(UBICACION_INICIAL)
  // Filtro por sala o discoteca y por fecha ('todas', 'hoy' o 'finde')
  const [local, setLocal] = useState(TODOS)
  const [cuando, setCuando] = useState('todas')
  // Ficha de local abierta y pantalla a la que vuelve
  const [localElegido, setLocalElegido] = useState(null)
  const [origenLocal, setOrigenLocal] = useState('buscar')
  // Lo elegido en «Elegir entradas» antes de pagar (ver venta.js)
  const [carrito, setCarrito] = useState(null)
  // Datos del comprador si marcó «Recordar mis datos» (solo en memoria, se pierden al recargar)
  const [datosGuardados, setDatosGuardados] = useState(null)

  // ---------- Amigos (ver data/amigos.js) ----------
  const [amigos, setAmigos] = useState(AMIGOS_INICIALES)
  const [recibidas, setRecibidas] = useState(SOLICITUDES_INICIALES)
  const [enviadas, setEnviadas] = useState([])
  const perfilesAmigos = amigos.map(usuarioPorId)

  // Envía una solicitud. DEMO: la otra persona la acepta sola a los 3 segundos (con backend, quitar el setTimeout)
  function enviarSolicitud(id) {
    setEnviadas((lista) => [...lista, id])
    setTimeout(() => {
      setEnviadas((lista) => lista.filter((otro) => otro !== id))
      setAmigos((lista) => (lista.includes(id) ? lista : [...lista, id]))
    }, SEGUNDOS_ACEPTAR * 1000)
  }

  function aceptarSolicitud(id) {
    setRecibidas((lista) => lista.filter((otro) => otro !== id))
    setAmigos((lista) => (lista.includes(id) ? lista : [...lista, id]))
  }

  // Amigos que ya tienen entrada para un evento
  function amigosQueVan(evento) {
    return (asistencia[evento.id] ?? []).filter((id) => amigos.includes(id)).map(usuarioPorId)
  }

  // Próximos planes de un amigo: nombres de los eventos a los que va
  function planesDe(id) {
    return eventos
      .filter((evento) => esProximo(evento) && (asistencia[evento.id] ?? []).includes(id))
      .map((evento) => evento.nombre)
  }

  // Entradas abiertas, en el orden en que se abrieron (aunque una se envíe, sigue en el carrusel hasta salir)
  const entradasAbiertas = idsAbiertos.map((id) => entradas.find((entrada) => entrada.id === id)).filter(Boolean)

  // ---------- Favoritos y gustos ----------
  // Salas y discotecas favoritas (♥) y eventos que se han abierto (para «Quizás te interese»)
  const [favoritos, setFavoritos] = useState([])
  const [vistos, setVistos] = useState([])

  function cambiarFavorito(nombre) {
    setFavoritos((lista) => (lista.includes(nombre) ? lista.filter((otro) => otro !== nombre) : [...lista, nombre]))
  }

  // Abre la ficha del concierto pulsado
  function elegirConcierto(concierto) {
    setVistos((lista) => (lista.includes(concierto.id) ? lista : [...lista, concierto.id]))
    setConciertoElegido(concierto)
    setOrigen(pantalla)
    setPantalla('concierto')
  }

  // Vuelve los filtros de búsqueda a como estaban al abrir la app (la ubicación se mantiene)
  function limpiarFiltros() {
    setGenero(TODOS)
    setRadio(DISTANCIA_MAX_KM)
    setLocal(TODOS)
    setCuando('todas')
  }

  // Abre la ficha de una sala o discoteca. Si se abre desde un evento, «Volver» salta
  // a donde se abrió ese evento (así no se crea un bucle evento ↔ local)
  function verLocal(nombre) {
    setLocalElegido(nombre)
    const desde = pantalla === 'concierto' ? origen : pantalla
    // Si el evento se abrió desde una ficha de local, se mantiene el origen que ya había
    if (desde !== 'local') setOrigenLocal(desde)
    setPantalla('local')
  }

  // Pasa de «Elegir entradas» al pago con lo elegido
  function irAPagar(nuevoCarrito) {
    setCarrito(nuevoCarrito)
    setPantalla('compra')
  }

  // Crea una entrada (con su QR) por cada persona de la compra
  function comprarEntradas(plazas) {
    const nuevas = plazas.map((plaza) => {
      const codigo = crearCodigoEntrada(conciertoElegido)
      return { id: codigo, codigo, concierto: conciertoElegido, enReventa: false, gastosExtra: 0, enviadaA: null, ...plaza }
    })
    setEntradas([...entradas, ...nuevas])
    setIdsAbiertos([])
  }

  // Cambia algunos datos de una entrada concreta
  function actualizarEntrada(id, cambios) {
    setEntradas(entradas.map((entrada) => (entrada.id === id ? { ...entrada, ...cambios } : entrada)))
  }

  // Saca la entrada de la reventa y suma los gastos de gestión (simulado)
  function quitarReventa(entrada) {
    actualizarEntrada(entrada.id, { enReventa: false, gastosExtra: entrada.gastosExtra + GASTOS_GESTION })
  }

  // Pulsar «Mis entradas» en la barra siempre lleva a la lista
  function irAPestana(destino) {
    // avisame no es una pantalla: abre el formulario sin perder donde estaba el usuario
    if (destino === 'avisame') {
      onAbrirAvisame()
      return
    }
    if (destino === 'entradas') setIdsAbiertos([])
    setPantalla(destino)
  }

  return (
    <div className="flex h-full flex-col bg-fondo text-texto">
      <main className="flex-1 overflow-y-auto">
        {pantalla === 'inicio' && (
          <Home
            ubicacion={ubicacion}
            favoritos={favoritos}
            entradas={entradas}
            vistos={vistos}
            amigosQueVan={amigosQueVan}
            onCambiarFavorito={cambiarFavorito}
            onElegir={elegirConcierto}
            onVerLocal={verLocal}
          />
        )}
        {pantalla === 'buscar' && (
          <Search
            genero={genero}
            onCambiarGenero={setGenero}
            radio={radio}
            onCambiarRadio={setRadio}
            ubicacion={ubicacion}
            onCambiarUbicacion={setUbicacion}
            local={local}
            onCambiarLocal={setLocal}
            cuando={cuando}
            onCambiarCuando={setCuando}
            onLimpiar={limpiarFiltros}
            favoritos={favoritos}
            onCambiarFavorito={cambiarFavorito}
            onElegir={elegirConcierto}
            onVerLocal={verLocal}
          />
        )}
        {pantalla === 'local' && (
          <VenueDetail
            nombre={localElegido}
            ubicacion={ubicacion}
            esFavorito={favoritos.includes(localElegido)}
            onCambiarFavorito={() => cambiarFavorito(localElegido)}
            onElegir={elegirConcierto}
            onVolver={() => setPantalla(origenLocal)}
          />
        )}
        {pantalla === 'concierto' && (
          <EventDetail
            concierto={conciertoElegido}
            amigosQueVan={amigosQueVan(conciertoElegido)}
            esFavorito={favoritos.includes(conciertoElegido.sala)}
            onCambiarFavorito={() => cambiarFavorito(conciertoElegido.sala)}
            onComprar={() => setPantalla('opciones')}
            onVolver={() => setPantalla(origen)}
            onVerLocal={verLocal}
          />
        )}
        {pantalla === 'opciones' && (
          <ElegirEntradas
            concierto={conciertoElegido}
            onContinuar={irAPagar}
            onVolver={() => setPantalla('concierto')}
          />
        )}
        {pantalla === 'compra' && (
          <Checkout
            concierto={conciertoElegido}
            carrito={carrito}
            datosGuardados={datosGuardados}
            amigos={perfilesAmigos}
            onGuardarDatos={setDatosGuardados}
            onPagar={comprarEntradas}
            onVerEntradas={() => setPantalla('entradas')}
            onVolver={() => setPantalla('opciones')}
          />
        )}
        {pantalla === 'entradas' && entradasAbiertas.length === 0 && (
          <MyTickets entradas={entradas} onAbrir={setIdsAbiertos} onBuscar={() => setPantalla('buscar')} />
        )}
        {pantalla === 'entradas' && entradasAbiertas.length > 0 && (
          <TicketCarrusel
            key={idsAbiertos.join()}
            entradas={entradasAbiertas}
            onVolver={() => setIdsAbiertos([])}
            onRevender={(entrada) => actualizarEntrada(entrada.id, { enReventa: true })}
            onQuitarReventa={quitarReventa}
            amigos={perfilesAmigos}
            onEnviar={(entrada, nombre) => actualizarEntrada(entrada.id, { enviadaA: nombre, asistente: nombre })}
          />
        )}
        {pantalla === 'amigos' && (
          <Amigos
            amigos={amigos}
            recibidas={recibidas}
            enviadas={enviadas}
            planesDe={planesDe}
            onEnviarSolicitud={enviarSolicitud}
            onAceptar={aceptarSolicitud}
            onRechazar={(id) => setRecibidas((lista) => lista.filter((otro) => otro !== id))}
            onEliminar={(id) => setAmigos((lista) => lista.filter((otro) => otro !== id))}
          />
        )}
      </main>

      <nav className="flex border-t border-borde bg-superficie">
        {PESTANAS.map((pestana) => (
          <button
            key={pestana.pantalla}
            type="button"
            onClick={() => irAPestana(pestana.pantalla)}
            aria-current={pantalla === pestana.pantalla ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs ${
              pantalla === pestana.pantalla ? 'text-acento' : 'text-suave'
            }`}
          >
            <span className="relative text-lg" aria-hidden="true">
              {pestana.icono}
              {pestana.pantalla === 'amigos' && recibidas.length > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-acento px-1 text-[10px] font-bold text-fondo">
                  {recibidas.length}
                </span>
              )}
            </span>
            {pestana.texto}
            {pestana.pantalla === 'amigos' && recibidas.length > 0 && (
              <span className="sr-only">
                , {recibidas.length} {recibidas.length === 1 ? 'solicitud nueva' : 'solicitudes nuevas'}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default AppView
