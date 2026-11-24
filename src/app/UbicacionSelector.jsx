import { useState } from 'react'
import { zonas } from '../data/zonas.js'

// ---------- Constantes ----------
// Valor del desplegable para «usar el GPS del móvil»
const ACTUAL = 'actual'
const NOMBRE_ACTUAL = 'Tu ubicación actual'

// Desplegable para elegir desde dónde se calculan las distancias:
// una zona de Madrid (donde vas a estar antes del plan) o la ubicación actual del móvil
function UbicacionSelector({ ubicacion, onCambiarUbicacion }) {
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
      () => setEstadoGps('No se pudo obtener tu ubicación. Elige una zona de la lista.'),
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
    <div className="flex flex-col gap-1">
      <label htmlFor="ubicacion" className="text-sm text-suave">
        📍 Salgo desde
      </label>
      <select
        id="ubicacion"
        value={valor}
        onChange={(evento) => cambiar(evento.target.value)}
        className="rounded-xl border border-borde bg-fondo px-3 py-2 text-texto"
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
      {estadoGps === 'buscando' && <p className="text-xs text-suave">Buscando tu ubicación…</p>}
      {estadoGps && estadoGps !== 'buscando' && <p className="text-xs text-acento">{estadoGps}</p>}
    </div>
  )
}

export default UbicacionSelector
