import { useState } from 'react'
import WaitlistModal from './components/WaitlistModal.jsx'
import WebView from './web/WebView.jsx'

// Pagina principal: la web de Akkorde-on. La demo de la app vive aparte, en /demo/
function App() {
  const [avisameAbierto, setAvisameAbierto] = useState(false)

  return (
    <>
      <WebView onAbrirAvisame={() => setAvisameAbierto(true)} />
      <WaitlistModal abierto={avisameAbierto} onCerrar={() => setAvisameAbierto(false)} />
    </>
  )
}

export default App
