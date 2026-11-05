import { avisame } from '../data/textos.js'

// ---------- Constantes ----------
// Enlaces del menú a cada sección de la página
const ENLACES = [
  { href: '#problema', texto: 'El problema' },
  { href: '#como-funciona', texto: 'Cómo funciona' },
  { href: '#precios', texto: 'Precios' },
  { href: '#faq', texto: 'Preguntas' },
]

// Menú fijo arriba (debajo del botón App/Web de Alfredo): logo, enlaces y botón «Avísame»
function Navbar() {
  return (
    <header className="fixed inset-x-0 top-14 z-40 border-b border-borde bg-fondo/90 backdrop-blur">
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
