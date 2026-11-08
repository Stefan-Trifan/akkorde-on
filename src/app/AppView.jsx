import { useState } from 'react'
import Home from './Home.jsx'
import Search from './Search.jsx'
import EventDetail from './EventDetail.jsx'
import Checkout from './Checkout.jsx'
import MyTickets from './MyTickets.jsx'
import Ticket from './Ticket.jsx'
import { GASTOS_GESTION, TODOS, crearCodigoEntrada } from './formato.js'
import { DISTANCIA_MAX_KM } from './distancia.js'

// ---------- Constantes ----------
// Pestañas de la barra inferior
const PESTANAS = [
  { pantalla: 'inicio', texto: 'Inicio', icono: '🏠' },
  { pantalla: 'buscar', texto: 'Buscar', icono: '🔍' },
  { pantalla: 'entradas', texto: 'Mis entradas', icono: '🎟️' },
  { pantalla: 'avisame', texto: 'Avísame', icono: '🔔' },
]

// Vista App: la demo de Akkorde-on como app de móvil
function AppView({ onAbrirAvisame }) {
  const [pantalla, setPantalla] = useState('inicio')
  const [conciertoElegido, setConciertoElegido] = useState(null)
  // Todas las entradas compradas y la que está abierta (null = se ve la lista)
  const [entradas, setEntradas] = useState([])
  const [idAbierta, setIdAbierta] = useState(null)
  // Pantalla desde la que se abrió la ficha, para que «Volver» regrese ahí
  const [origen, setOrigen] = useState('inicio')
  // Filtro de la búsqueda; vive aquí para no perderlo al volver de la ficha
  const [genero, setGenero] = useState(TODOS)
  // Filtro por distancia en km (empieza al máximo: se ven todos)
  const [radio, setRadio] = useState(DISTANCIA_MAX_KM)

  const entradaAbierta = entradas.find((entrada) => entrada.id === idAbierta)

  // Abre la ficha del concierto pulsado
  function elegirConcierto(concierto) {
    setConciertoElegido(concierto)
    setOrigen(pantalla)
    setPantalla('concierto')
  }

  // Añade una entrada nueva a la lista y la deja abierta para verla
  function comprarEntrada() {
    const codigo = crearCodigoEntrada(conciertoElegido)
    const nueva = { id: codigo, codigo, concierto: conciertoElegido, enReventa: false, gastosExtra: 0 }
    setEntradas([...entradas, nueva])
    setIdAbierta(codigo)
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
    if (destino === 'entradas') setIdAbierta(null)
    setPantalla(destino)
  }

  return (
    <div className="flex h-full flex-col bg-fondo text-texto">
      <main className="flex-1 overflow-y-auto">
        {pantalla === 'inicio' && <Home onElegir={elegirConcierto} />}
        {pantalla === 'buscar' && (
          <Search
            genero={genero}
            onCambiarGenero={setGenero}
            radio={radio}
            onCambiarRadio={setRadio}
            onElegir={elegirConcierto}
          />
        )}
        {pantalla === 'concierto' && (
          <EventDetail
            concierto={conciertoElegido}
            onComprar={() => setPantalla('compra')}
            onVolver={() => setPantalla(origen)}
          />
        )}
        {pantalla === 'compra' && (
          <Checkout
            concierto={conciertoElegido}
            onPagar={comprarEntrada}
            onVerEntrada={() => setPantalla('entradas')}
            onVolver={() => setPantalla('concierto')}
          />
        )}
        {pantalla === 'entradas' && !entradaAbierta && (
          <MyTickets entradas={entradas} onAbrir={setIdAbierta} onBuscar={() => setPantalla('buscar')} />
        )}
        {pantalla === 'entradas' && entradaAbierta && (
          <Ticket
            key={entradaAbierta.id}
            entrada={entradaAbierta}
            onVolver={() => setIdAbierta(null)}
            onRevender={() => actualizarEntrada(entradaAbierta.id, { enReventa: true })}
            onQuitarReventa={() => quitarReventa(entradaAbierta)}
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
            <span className="text-lg" aria-hidden="true">
              {pestana.icono}
            </span>
            {pestana.texto}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default AppView
