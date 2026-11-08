import { inicio } from '../data/textos.js'

// ---------- Constantes ----------
const EQUIPO = ['Steven', 'Alfredo', 'Nico', 'Fran', 'Juan Guasp', 'Juan Antonio', 'Alejandro']

// Pie: logo, eslogan, equipo y U-tad
function Footer() {
  return (
    <footer className="border-t border-borde py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-suave">
        <p className="text-xl font-extrabold text-texto">
          Akkorde<span className="text-acento">-on</span>
        </p>
        <p>{inicio.eslogan}</p>
        <p>Equipo: {EQUIPO.join(' · ')}</p>
        <p>Proyecto de Proyectos III · U-tad · 2026-27</p>
      </div>
    </footer>
  )
}

export default Footer
