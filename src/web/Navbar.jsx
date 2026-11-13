import { avisame } from '../data/textos.js'
import { URL_DEMO } from '../rutas.js'

// ---------- Constantes ----------
// Enlaces del menú a cada sección de la página
const ENLACES = [
  { href: '#problema', texto: 'El problema' },
  { href: '#como-funciona', texto: 'Cómo funciona' },
  { href: '#precios', texto: 'Precios' },
  { href: '#faq', texto: 'Preguntas' },
]

// Menú fijo arriba: logo, enlaces, «Probar la demo» (abre la app en su página) y botón «Avísame»
function Navbar({ onAbrirAvisame }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-borde bg-fondo/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#inicio" className="text-xl font-extrabold text-texto">
          Akkorde<span className="text-acento">-on</span>
        </a>
        <ul className="hidden gap-6 text-sm text-suave md:flex">
          {ENLACES.map((enlace) => (
            <li key={enlace.href}>
              <a href={enlace.href} className="hover:text-texto">
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={URL_DEMO} className="rounded-full border border-borde px-4 py-2 text-sm font-bold text-texto hover:border-acento">
            Probar la demo
          </a>
          <button type="button" onClick={onAbrirAvisame} className="rounded-full bg-acento px-4 py-2 text-sm font-bold text-fondo hover:brightness-110">
            {avisame.boton}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
