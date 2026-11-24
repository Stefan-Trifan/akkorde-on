// Plano de la sala dibujado en SVG (lienzo de 100 x 70): pista, cabina, barra y mesas.
// Las mesas libres se pueden pulsar para elegir ese reservado.

// ---------- Constantes ----------
const RADIO_MESA = 4.6
// Color de relleno de cada elemento fijo del plano
const COLOR_ELEMENTO = {
  pista: 'fill-acento/10 stroke-acento/40',
  cabina: 'fill-crema/20 stroke-crema/50',
  barra: 'fill-suave/20 stroke-suave/50',
}

// Número que se pinta dentro de la mesa: "Mesa 3" → "3", "Palco 1" → "P1"
function etiquetaMesa(mesa) {
  const numero = mesa.nombre.match(/\d+/)?.[0]
  if (mesa.nombre.startsWith('Mesa') && numero) return numero
  return `${mesa.nombre[0]}${numero ?? ''}`
}

function PlanoSala({ plano, mesas, elegida, onElegir }) {
  return (
    <div className="flex flex-col gap-2">
      <svg viewBox="0 0 100 70" className="w-full rounded-2xl border border-borde bg-fondo" role="group" aria-label="Plano de la sala">
        {plano.map((elemento) => (
          <g key={elemento.tipo}>
            <rect
              x={elemento.x}
              y={elemento.y}
              width={elemento.w}
              height={elemento.h}
              rx="2"
              strokeWidth="0.4"
              className={COLOR_ELEMENTO[elemento.tipo]}
            />
            <text
              x={elemento.x + elemento.w / 2}
              y={elemento.y + elemento.h / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="3"
              className="fill-suave"
            >
              {elemento.texto}
            </text>
          </g>
        ))}

        {mesas.map((mesa) => {
          const esElegida = mesa.id === elegida
          const color = mesa.ocupado
            ? 'fill-borde stroke-borde'
            : esElegida
              ? 'fill-acento stroke-acento'
              : 'fill-superficie stroke-acento hover:fill-acento/30'
          return (
            <g
              key={mesa.id}
              role="button"
              tabIndex={mesa.ocupado ? -1 : 0}
              aria-label={`${mesa.nombre}, ${mesa.ocupado ? 'ocupada' : `${mesa.personas} personas, ${mesa.precio} euros`}`}
              aria-pressed={esElegida}
              aria-disabled={mesa.ocupado}
              onClick={() => !mesa.ocupado && onElegir(esElegida ? null : mesa.id)}
              onKeyDown={(evento) => {
                if (!mesa.ocupado && (evento.key === 'Enter' || evento.key === ' ')) {
                  evento.preventDefault()
                  onElegir(esElegida ? null : mesa.id)
                }
              }}
              className={mesa.ocupado ? 'cursor-not-allowed' : 'cursor-pointer'}
            >
              <circle cx={mesa.x} cy={mesa.y} r={RADIO_MESA} strokeWidth="0.6" className={`transition ${color}`} />
              <text
                x={mesa.x}
                y={mesa.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="3.2"
                fontWeight="700"
                className={esElegida ? 'fill-fondo' : mesa.ocupado ? 'fill-suave' : 'fill-texto'}
              >
                {etiquetaMesa(mesa)}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className="flex justify-center gap-4 text-xs text-suave">
        <li className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full border border-acento bg-superficie" /> Libre
        </li>
        <li className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-acento" /> Tu elección
        </li>
        <li className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-borde" /> Ocupada
        </li>
      </ul>
    </div>
  )
}

export default PlanoSala
