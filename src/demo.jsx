import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DemoPage from './DemoPage.jsx'

// Entrada de la demo (pagina /demo/): es una pagina aparte de la web
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DemoPage />
  </StrictMode>,
)
