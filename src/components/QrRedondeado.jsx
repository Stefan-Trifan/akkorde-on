import { useMemo } from 'react'
import qrcode from 'qrcode-generator'

// ---------- Constantes ----------
// Nivel de corrección «M»: aguanta ~15 % de daño, suficiente con módulos redondeados
const CORRECCION = 'M'
// Radio de las esquinas de cada módulo (1 = tamaño del módulo); 0.5 = media luna
const RADIO = 0.45
// Margen en blanco alrededor del QR, en módulos (los lectores lo necesitan)
const MARGEN = 1
// Tamaño de los tres cuadros de las esquinas («ojos»)
const OJO = 7

// Rectángulo con cada esquina redondeada a su manera: [arriba-izq, arriba-der, abajo-der, abajo-izq]
function rectangulo(x, y, ancho, alto, [ai, ad, bd, bi]) {
  return (
    `M${x + ai},${y}H${x + ancho - ad}A${ad},${ad} 0 0 1 ${x + ancho},${y + ad}` +
    `V${y + alto - bd}A${bd},${bd} 0 0 1 ${x + ancho - bd},${y + alto}` +
    `H${x + bi}A${bi},${bi} 0 0 1 ${x},${y + alto - bi}` +
    `V${y + ai}A${ai},${ai} 0 0 1 ${x + ai},${y}Z`
  )
}

// ¿Está la casilla dentro de uno de los tres ojos? (se dibujan aparte)
function esOjo(fila, col, n) {
  const arriba = fila < OJO
  const izquierda = col < OJO
  return (arriba && izquierda) || (arriba && col >= n - OJO) || (fila >= n - OJO && izquierda)
}

// Calcula el dibujo del QR: los módulos como «gotas» unidas y los ojos con esquinas redondas
function dibujarQr(valor) {
  const qr = qrcode(0, CORRECCION)
  qr.addData(valor)
  qr.make()
  const n = qr.getModuleCount()
  const oscuro = (f, c) => f >= 0 && c >= 0 && f < n && c < n && !esOjo(f, c, n) && qr.isDark(f, c)

  // Cada módulo redondea solo las esquinas que no tocan a otro módulo, así los vecinos se ven unidos
  let modulos = ''
  for (let f = 0; f < n; f++) {
    for (let c = 0; c < n; c++) {
      if (!oscuro(f, c)) continue
      const arriba = oscuro(f - 1, c)
      const abajo = oscuro(f + 1, c)
      const izq = oscuro(f, c - 1)
      const der = oscuro(f, c + 1)
      modulos += rectangulo(c + MARGEN, f + MARGEN, 1, 1, [
        !arriba && !izq ? RADIO : 0,
        !arriba && !der ? RADIO : 0,
        !abajo && !der ? RADIO : 0,
        !abajo && !izq ? RADIO : 0,
      ])
    }
  }

  // Ojos: marco de 7×7 con hueco y cuadro central de 3×3, todo redondeado
  let ojos = ''
  ;[
    [0, 0],
    [0, n - OJO],
    [n - OJO, 0],
  ].forEach(([f, c]) => {
    const x = c + MARGEN
    const y = f + MARGEN
    ojos += rectangulo(x, y, OJO, OJO, [2.2, 2.2, 2.2, 2.2])
    ojos += rectangulo(x + 1, y + 1, OJO - 2, OJO - 2, [1.4, 1.4, 1.4, 1.4])
    ojos += rectangulo(x + 2, y + 2, 3, 3, [1, 1, 1, 1])
  })

  return { lado: n + MARGEN * 2, modulos, ojos }
}

// QR con módulos redondeados dentro de una tarjeta blanca con marco de color degradado,
// para que no quede «pegado» al fondo. difuminado = se ve borroso (antes de la hora o en reventa)
function QrRedondeado({ valor, tamano = 176, difuminado = false, etiqueta = 'Código QR' }) {
  const { lado, modulos, ojos } = useMemo(() => dibujarQr(valor), [valor])

  return (
    <div className="rounded-[1.75rem] bg-gradient-to-br from-acento via-cyan-400 to-fuchsia-500 p-[3px] shadow-lg">
      <div className="rounded-[calc(1.75rem-3px)] bg-white p-3">
        <svg
          viewBox={`0 0 ${lado} ${lado}`}
          width={tamano}
          height={tamano}
          role="img"
          aria-label={etiqueta}
          className={`block transition duration-500 ${difuminado ? 'blur-md' : ''}`}
          shapeRendering="geometricPrecision"
        >
          <path d={modulos} fill="#0b0b09" />
          <path d={ojos} fill="#0b0b09" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default QrRedondeado
