import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import Benefits from './Benefits.jsx'
import Problem from './Problem.jsx'
import HowItWorks from './HowItWorks.jsx'
import PriceComparison from './PriceComparison.jsx'
import Testimonials from './Testimonials.jsx'
import Faq from './Faq.jsx'
import Waitlist from './Waitlist.jsx'
import Footer from './Footer.jsx'

// Vista Web: la página de Akkorde-on para el público, sección a sección
function WebView({ onAbrirAvisame }) {
  return (
    <div className="min-h-dvh bg-fondo text-texto">
      <Navbar onAbrirAvisame={onAbrirAvisame} />
      <main>
        <Hero onAbrirAvisame={onAbrirAvisame} />
        <Benefits />
        <Problem />
        <HowItWorks />
        <PriceComparison />
        <Testimonials />
        <Faq />
        <Waitlist onAbrirAvisame={onAbrirAvisame} />
      </main>
      <Footer />
    </div>
  )
}

export default WebView
