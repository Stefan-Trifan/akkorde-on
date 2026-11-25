import { useState } from 'react'
import { zonas } from '../data/zonas.js'
import { DISTANCIA_MAX_KM, DISTANCIA_MIN_KM, PASO_KM, formatearDistancia } from './distancia.js'

// ---------- Constantes ----------
// Valor del desplegable para «usar el GPS del móvil»
const ACTUAL = 'actual'
const NOMBRE_ACTUAL = 'Tu ubicación actual'

// Bloque «Dónde»: desde qué zona sales (o tu ubicación actual) y hasta cuántos km
function UbicacionSelector({ ubicacion, onCambiarUbicacion, radio, onCambiarRadio }) {
  // 'buscando' mientras el navegador da la posición; texto de error si falla
  const [estadoGps, setEstadoGps] = useState(null)

  // Pide la posición al navegador; si no hay permiso, se queda la zona que había
  function usarUbicacionActual() {
    if (!navigator.geolocation) {
      setEstadoGps('Tu navegador no permite saber la ubicación.')
      return
    }
    setEstadoGps('buscando')
    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        setEstadoGps(null)
        onCambiarUbicacion({ nombre: NOMBRE_ACTUAL, lat: posicion.coords.latitude, lng: posicion.coords.longitude })
      },
      () => setEstadoGps('No se pudo obtener tu ubicación. Elige una zona.'),
      { timeout: 10000 },
    )
  }

  function cambiar(valor) {
    if (valor === ACTUAL) {
      usarUbicacionActual()
      return
    }
    setEstadoGps(null)
    onCambiarUbicacion(zonas.find((zona) => zona.nombre === valor))
  }

  const valor = ubicacion.nombre === NOMBRE_ACTUAL ? ACTUAL : ubicacion.nombre

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-borde bg-superficie p-4">
      <div className="flex items-center gap-2">
        <label htmlFor="ubicacion" className="shrink-0 text-sm text-suave">
          📍 Salgo desde
        </label>
        <div className="relative min-w-0 flex-1">
          <select
            id="ubicacion"
            value={valor}
            onChange={(evento) => cambiar(evento.target.value)}
            className="w-full cursor-pointer appearance-none rounded-full bg-fondo py-1.5 pl-3 pr-8 text-sm font-semibold text-texto focus:outline-none focus:ring-1 focus:ring-acento"
          >
            <option value={ACTUAL}>📡 {NOMBRE_ACTUAL}</option>
            <optgroup label="Zonas de Madrid">
              {zonas.map((zona) => (
                <option key={zona.nombre} value={zona.nombre}>
                  {zona.nombre}
                </option>
              ))}
            </optgroup>
          </select>
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-acento"
            aria-hidden="true"
          >
            ▼
          </span>
        </div>
      </div>
      {estadoGps === 'buscando' && <p className="-mt-1 text-xs text-suave">Buscando tu ubicación…</p>}
      {estadoGps && estadoGps !== 'buscando' && <p className="-mt-1 text-xs text-acento">{estadoGps}</p>}

      <div className="flex flex-col gap-1">
        <label htmlFor="distancia" className="flex items-baseline justify-between text-sm text-suave">
          <span>Distancia máxima</span>
          <span className="font-bold text-acento">{formatearDistancia(radio)}</span>
        </label>
        <input
          id="distancia"
          type="range"
          min={DISTANCIA_MIN_KM}
          max={DISTANCIA_MAX_KM}
          step={PASO_KM}
          value={radio}
          onChange={(evento) => onCambiarRadio(Number(evento.target.value))}
          className="w-full accent-acento"
        />
      </div>
    </div>
  )
}

export default UbicacionSelector
