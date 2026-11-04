import { ENSENAR_PENDIENTES } from '../data/pendientes.js'

// Hueco de contenido que falta: se ve solo en local, nunca en la web publicada
function Pending({ texto }) {
  if (!ENSENAR_PENDIENTES) return null

  return (
    <div className="rounded-2xl border-2 border-dashed border-acento/60 p-6 text-center text-sm text-suave">
      ⏳ Pendiente: {texto}
    </div>
  )
}

export default Pending
