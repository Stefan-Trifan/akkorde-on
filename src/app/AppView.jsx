import { useState } from 'react'
import Home from './Home.jsx'
import Search from './Search.jsx'
import EventDetail from './EventDetail.jsx'
import Checkout from './Checkout.jsx'
import Ticket from './Ticket.jsx'
import { TODOS, crearCodigoEntrada } from './formato.js'
import { DISTANCIA_MAX_KM } from './distancia.js'

// ---------- Constantes ----------
// Pestañas de la barra inferior
const PESTANAS = [
  { pantalla: 'inicio', texto: 'Inicio', icono: '🏠' },
  { pantalla: 'buscar', texto: 'Buscar', icono: '🔍' },
  { pantalla: 'entrada', texto: 'Mi entrada', icono: '🎟️' },
]

// Vista App: la demo de Akkorde-on como app de móvil (5 pantallas)
function AppView() {
  const [pantalla, setPantalla] = useState('inicio')
  const [conciertoElegido, setConciertoElegido] = useState(null)
  const [entrada, setEntrada] = useState(null)
  // Pantalla desde la que se abrió la ficha, para que «Volver» regrese ahí
  const [origen, setOrigen] = useState('inicio')
  // Filtro de la búsqueda; vive aquí para no perderlo al volver de la ficha
  const [genero, setGenero] = useState(TODOS)
  // Filtro por distancia en km (empieza al máximo: se ven todos)
  const [radio, setRadio] = useState(DISTANCIA_MAX_KM)

  // Abre la ficha del concierto pulsado
  function elegirConcierto(concierto) {
    setConciertoElegido(concierto)
    setOrigen(pantalla)
    setPantalla('concierto')
  }

  // Guarda la entrada comprada con un código nuevo
  function comprarEntrada() {
    setEntrada({ concierto: conciertoElegido, codigo: crearCodigoEntrada(conciertoElegido) })
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
            onVerEntrada={() => setPantalla('entrada')}
            onVolver={() => setPantalla('concierto')}
          />
        )}
        {pantalla === 'entrada' && <Ticket entrada={entrada} onBuscar={() => setPantalla('buscar')} />}
      </main>

      <nav className="flex border-t border-borde bg-superficie">
        {PESTANAS.map((pestana) => (
          <button
            key={pestana.pantalla}
            type="button"
            onClick={() => setPantalla(pestana.pantalla)}
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
