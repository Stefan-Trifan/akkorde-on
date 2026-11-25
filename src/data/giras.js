// Giras de ejemplo: conciertos de artistas de artistas.js en Madrid, en otros pueblos de la
// Comunidad de Madrid y en otras comunidades. Artistas y salas reales; las fechas, salas y precios
// son de ejemplo (demo): no son conciertos anunciados de verdad.
// Las fechas se calculan desde hoy (como en discotecas.js) para que siempre haya conciertos próximos.
// Mismo formato que conciertos.js, más «venta» (ver app/venta.js).

import { fechaDentroDe } from '../app/tiempo.js'
import { precioEntrada } from '../app/venta.js'
import { artistaPorId } from './artistas.js'

// ---------- Formas de venta típicas de un concierto ----------
// Recinto grande: pista, grada y meet & greet (pocas plazas)
function ventaRecinto(pista, grada) {
  return {
    entradas: [
      { id: 'pista', nombre: 'Pista', incluye: 'De pie, delante del escenario', precio: pista, cupo: 3000, vendidas: 2140 },
      { id: 'grada', nombre: 'Grada', incluye: 'Asiento numerado', precio: grada, cupo: 2500, vendidas: 1310 },
      { id: 'meet', nombre: 'Meet & greet', incluye: 'Pista + foto con la artista', precio: pista + 45, cupo: 20, vendidas: 17 },
    ],
    mostrar: { quedan: true },
  }
}

// Sala: entrada general por tramos y entrada con vinilo firmado
function ventaSala(precio) {
  return {
    entradas: [
      {
        id: 'general',
        nombre: 'Entrada general',
        tramos: [
          { nombre: 'Anticipada', precio: precio - 4, cupo: 100, vendidas: 100 },
          { nombre: '2.º tramo', precio, cupo: 200, vendidas: 120 },
          { nombre: 'Taquilla', precio: precio + 5, cupo: 100, vendidas: 0 },
        ],
      },
      { id: 'vinilo', nombre: 'Entrada + vinilo', incluye: 'Vinilo firmado al salir', precio: precio + 15, cupo: 50, vendidas: 34 },
    ],
    mostrar: { tramos: true, quedan: true },
  }
}

// Teatro: patio de butacas y anfiteatro
function ventaTeatro(patio, anfiteatro) {
  return {
    entradas: [
      { id: 'patio', nombre: 'Patio de butacas', incluye: 'Butaca numerada', precio: patio },
      { id: 'anfiteatro', nombre: 'Anfiteatro', incluye: 'Butaca numerada', precio: anfiteatro },
    ],
  }
}

// Crea un concierto de la gira de una artista: nombre, estilo e imagen salen de su ficha
function concierto(idArtista, lugar, { sala, dias, hora = '21:00', venta }) {
  const artista = artistaPorId(idArtista)
  // Precio de referencia: la entrada más barata que se vende ahora
  const precio = Math.min(...venta.entradas.map(precioEntrada))
  return {
    id: `${idArtista}-${lugar}`,
    nombre: artista.nombre,
    sala,
    fecha: fechaDentroDe(dias),
    hora,
    genero: artista.genero,
    precio,
    imagen: artista.imagen,
    venta,
  }
}

export const conciertosGira = [
  // ----- Bad Bunny -----
  concierto('bad-bunny', 'madrid', { sala: 'Movistar Arena', dias: 18, venta: ventaRecinto(42, 35) }),
  concierto('bad-bunny', 'barcelona', { sala: 'Razzmatazz', dias: 11, venta: ventaSala(30) }),
  concierto('bad-bunny', 'valencia', { sala: 'Palau de la Música de València', dias: 25, venta: ventaTeatro(38, 28) }),
  concierto('bad-bunny', 'sevilla', { sala: 'Teatro Lope de Vega', dias: 32, venta: ventaTeatro(34, 26) }),

  // ----- Quevedo -----
  concierto('quevedo', 'madrid', { sala: 'Sala El Sol', dias: 4, hora: '21:30', venta: ventaSala(16) }),
  concierto('quevedo', 'alcala', { sala: 'Teatro Salón Cervantes', dias: 9, hora: '20:00', venta: ventaTeatro(18, 14) }),
  concierto('quevedo', 'bilbao', { sala: 'Kafe Antzokia', dias: 16, venta: ventaSala(18) }),
  concierto('quevedo', 'zaragoza', { sala: 'Auditorio de Zaragoza', dias: 23, venta: ventaTeatro(20, 15) }),

  // ----- La Pantera -----
  concierto('la-pantera', 'madrid', { sala: 'La Riviera', dias: 12, venta: ventaSala(22) }),
  concierto('la-pantera', 'getafe', { sala: 'Teatro Federico García Lorca', dias: 6, hora: '20:30', venta: ventaTeatro(18, 14) }),
  concierto('la-pantera', 'guadalajara', { sala: 'Teatro Buero Vallejo', dias: 20, hora: '20:30', venta: ventaTeatro(17, 13) }),
  concierto('la-pantera', 'toledo', { sala: 'Teatro de Rojas', dias: 27, hora: '20:30', venta: ventaTeatro(19, 15) }),

  // ----- Lucho RK -----
  concierto('lucho-rk', 'madrid', { sala: 'Café Berlín', dias: 2, hora: '21:30', venta: ventaSala(15) }),
  concierto('lucho-rk', 'mostoles', { sala: 'Teatro del Bosque', dias: 14, hora: '20:00', venta: ventaTeatro(16, 12) }),
  concierto('lucho-rk', 'barcelona', { sala: 'Razzmatazz', dias: 30, venta: ventaSala(17) }),

  // ----- Más fechas de artistas de conciertos.js y conciertosExtra.js -----
  concierto('arde-bogota', 'madrid', { sala: 'Siroco', dias: 8, hora: '22:00', venta: ventaSala(14) }),
  concierto('arde-bogota', 'valencia', { sala: 'Palau de la Música de València', dias: 19, venta: ventaTeatro(20, 15) }),
  concierto('aitana', 'alcala', { sala: 'Teatro Salón Cervantes', dias: 21, hora: '20:00', venta: ventaTeatro(22, 17) }),
  concierto('aitana', 'sevilla', { sala: 'Teatro Lope de Vega', dias: 35, venta: ventaTeatro(24, 18) }),
  concierto('myke-towers', 'madrid', { sala: 'La Riviera', dias: 24, venta: ventaSala(26) }),
  concierto('natos-y-waor', 'getafe', { sala: 'Teatro Federico García Lorca', dias: 5, venta: ventaTeatro(15, 12) }),
  concierto('natos-y-waor', 'bilbao', { sala: 'Kafe Antzokia', dias: 17, hora: '21:30', venta: ventaSala(16) }),
]
