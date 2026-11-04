import { avisame } from '../data/textos.js'
import { ENSENAR_PENDIENTES, comparativa, faq } from '../data/pendientes.js'

// ---------- Constantes ----------
// Enlaces del menú a cada sección; se quitan los de secciones que aún no salen
const ENLACES = [
  { href: '#problema', texto: 'El problema', visible: true },
  { href: '#como-funciona', texto: 'Cómo funciona', visible: true },
  { href: '#precios', texto: 'Precios', visible: comparativa.otras.length > 0 || ENSENAR_PENDIENTES },
  { href: '#faq', texto: 'Preguntas', visible: faq.length > 0 || ENSENAR_PENDIENTES },
].filter((enlace) => enlace.visible)

// Menú fijo arriba: logo, enlaces (en pantallas medianas o más) y botón «Avísame»
function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-borde bg-fondo/90 backdrop-blur">
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
        <a href="#avisame" className="rounded-full bg-acento px-4 py-2 text-sm font-bold text-fondo hover:brightness-110">
          {avisame.boton}
        </a>
      </nav>
    </header>
  )
}

export default Navbar
