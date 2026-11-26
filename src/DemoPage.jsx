import { useState } from 'react'
import AppView from './app/AppView.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import WaitlistModal from './components/WaitlistModal.jsx'
import { URL_WEB } from './rutas.js'

// Pagina de la demo: la app sola, sin la web alrededor
function DemoPage() {
  const [avisameAbierto, setAvisameAbierto] = useState(false)

  return (
    <main className="min-h-dvh bg-slate-900 text-white">
      {/* el enlace de vuelta solo sale en el ordenador: en el movil la app ocupa toda la pantalla */}
      <a href={URL_WEB} className="hidden py-3 text-center text-sm text-slate-300 hover:text-white md:block">
        ← Volver a la web de Akkorde-on
      </a>
      <PhoneFrame>
        <AppView onAbrirAvisame={() => setAvisameAbierto(true)} />
      </PhoneFrame>
      <WaitlistModal abierto={avisameAbierto} onCerrar={() => setAvisameAbierto(false)} />
    </main>
  )
}

export default DemoPage
