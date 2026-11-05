import { useState } from 'react'
import AppView from './app/AppView.jsx'
import ModeToggle from './components/ModeToggle.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import WebView from './web/WebView.jsx'

function App() {
  // la web abre siempre en modo App
  const [mode, setMode] = useState('app')

  return (
    <main className="min-h-screen bg-slate-900 pt-14 text-white">
      <ModeToggle mode={mode} onChange={setMode} />
      {mode === 'app' ? (
        <PhoneFrame>
          <AppView />
        </PhoneFrame>
      ) : (
        <WebView />
      )}
    </main>
  )
}

export default App
