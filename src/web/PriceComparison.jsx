import { ENSENAR_PENDIENTES, comparativa } from '../data/pendientes.js'
import { formatearPrecio, precioFinal } from '../app/formato.js'
import Pending from './Pending.jsx'

// Comparativa del precio final de una misma entrada: Akkorde-on frente a otras webs
function PriceComparison() {
  const hayDatos = comparativa.otras.length > 0
  if (!hayDatos && !ENSENAR_PENDIENTES) return null

  const filas = [{ plataforma: 'Akkorde-on', precioFinal: precioFinal(comparativa.precioBase) }, ...comparativa.otras]
  const maximo = Math.max(...filas.map((fila) => fila.precioFinal))

  return (
    <section id="precios" className="mx-auto flex max-w-3xl scroll-mt-20 flex-col gap-6 px-5 py-16">
      <h2 className="text-3xl font-extrabold text-texto">La misma entrada, otro precio</h2>
      {hayDatos ? (
        <>
          <p className="text-suave">{comparativa.entrada}: precio final con todos los gastos.</p>
          <ul className="flex flex-col gap-3">
            {filas.map((fila) => (
              <li key={fila.plataforma} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm text-texto">
                  <span className="font-semibold">{fila.plataforma}</span>
                  <span className="font-bold">{formatearPrecio(fila.precioFinal)}</span>
                </div>
                <div
                  className={`h-3 rounded-full ${fila.plataforma === 'Akkorde-on' ? 'bg-acento' : 'bg-borde'}`}
                  style={{ width: `${(fila.precioFinal / maximo) * 100}%` }}
                />
              </li>
            ))}
          </ul>
          <p className="text-xs text-suave">
            Fuentes:{' '}
            {comparativa.otras.map((fila) => (
              <a key={fila.plataforma} href={fila.fuente.url} target="_blank" rel="noreferrer" className="mr-2 underline">
                {fila.fuente.nombre} ({fila.fuente.fecha})
              </a>
            ))}
          </p>
        </>
      ) : (
        <Pending texto="comparativa de precios con fuente (Fran, 05-11) en src/data/pendientes.js" />
      )}
    </section>
  )
}

export default PriceComparison
