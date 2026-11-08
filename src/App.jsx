import { useState } from 'react'
import AppView from './app/AppView.jsx'
import ModeToggle from './components/ModeToggle.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import WaitlistModal from './components/WaitlistModal.jsx'
import WebView from './web/WebView.jsx'

function App() {
  // la web abre siempre en modo App
  const [mode, setMode] = useState('app')
  const [avisameAbierto, setAvisameAbierto] = useState(false)

  const abrirAvisame = () => setAvisameAbierto(true)

  return (
    <main className="min-h-screen bg-slate-900 pt-14 text-white">
      <ModeToggle mode={mode} onChange={setMode} />
      {mode === 'app' ? (
        <PhoneFrame>
          <AppView onAbrirAvisame={abrirAvisame} />
        </PhoneFrame>
      ) : (
        <WebView onAbrirAvisame={abrirAvisame} />
      )}
      {/* fuera de las dos vistas para que cambiar de modo no recargue el formulario */}
      <WaitlistModal abierto={avisameAbierto} onCerrar={() => setAvisameAbierto(false)} />
    </main>
  )
}

export default App
