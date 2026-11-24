// Sesiones de ejemplo en discotecas reales de Madrid (DJs, precios y planos inventados).
// Mismo formato que conciertos.js, más descripción, cartel y «venta».
// Las fechas se calculan desde hoy para que los filtros «Hoy» y «Este finde» siempre tengan algo que enseñar.
// edadMinima / dressCode en un evento mandan sobre los del local (salas.js).
//
// «venta» es lo que publica el dueño del local para esa noche (ver app/venta.js):
//   listas:     [{ id, nombre, precio, hastaHora, incluye }]  → con nombre y hasta una hora
//   entradas:   [{ id, nombre, incluye, precio }] o con tramos: [{ nombre, precio, cupo, vendidas }]
//   reservados: mesas del plano [{ id, nombre, zona, precio, personas, incluye, x, y, ocupado }]
//   plano:      elementos fijos del plano de la sala (pista, cabina, barra) en un lienzo de 100 x 70
//   mostrar:    qué deja ver el dueño → tramos (todos los tramos), quedan (entradas que quedan), mapa

import { fechaDentroDe } from '../app/tiempo.js'
import fitzClub from '../assets/conciertos/fitz-club.svg'
import teatroKapital from '../assets/conciertos/teatro-kapital.svg'
import opiumMadrid from '../assets/conciertos/opium-madrid.svg'
import mediasPuri from '../assets/conciertos/medias-puri.svg'

// ---------- Planos y mesas de cada local ----------
const PLANO_FITZ = [
  { tipo: 'cabina', texto: 'Cabina DJ', x: 38, y: 3, w: 24, h: 8 },
  { tipo: 'pista', texto: 'Pista', x: 28, y: 15, w: 44, h: 38 },
  { tipo: 'barra', texto: 'Barra', x: 10, y: 61, w: 80, h: 6 },
]
const MESAS_FITZ = [
  { id: 'v1', nombre: 'Palco 1', zona: 'Junto a cabina', precio: 400, personas: 8, incluye: '2 botellas premium', x: 18, y: 7 },
  { id: 'v2', nombre: 'Palco 2', zona: 'Junto a cabina', precio: 400, personas: 8, incluye: '2 botellas premium', x: 82, y: 7 },
  { id: 'm1', nombre: 'Mesa 1', zona: 'Pista', precio: 200, personas: 5, incluye: '1 botella', x: 14, y: 22 },
  { id: 'm2', nombre: 'Mesa 2', zona: 'Pista', precio: 200, personas: 5, incluye: '1 botella', x: 14, y: 35 },
  { id: 'm3', nombre: 'Mesa 3', zona: 'Pista', precio: 180, personas: 4, incluye: '1 botella', x: 14, y: 48 },
  { id: 'm4', nombre: 'Mesa 4', zona: 'Pista', precio: 200, personas: 5, incluye: '1 botella', x: 86, y: 22 },
  { id: 'm5', nombre: 'Mesa 5', zona: 'Pista', precio: 200, personas: 5, incluye: '1 botella', x: 86, y: 35 },
  { id: 'm6', nombre: 'Mesa 6', zona: 'Pista', precio: 180, personas: 4, incluye: '1 botella', x: 86, y: 48 },
]

const PLANO_KAPITAL = [
  { tipo: 'cabina', texto: 'DJ', x: 3, y: 22, w: 10, h: 22 },
  { tipo: 'pista', texto: 'Pista central', x: 17, y: 8, w: 52, h: 46 },
  { tipo: 'barra', texto: 'Barra', x: 17, y: 61, w: 52, h: 6 },
]
const MESAS_KAPITAL = [
  { id: 'k1', nombre: 'Mesa 1', zona: 'Lateral', precio: 250, personas: 6, incluye: '1 botella + refrescos', x: 78, y: 12 },
  { id: 'k2', nombre: 'Mesa 2', zona: 'Lateral', precio: 250, personas: 6, incluye: '1 botella + refrescos', x: 91, y: 12 },
  { id: 'k3', nombre: 'Mesa 3', zona: 'Lateral', precio: 250, personas: 6, incluye: '1 botella + refrescos', x: 78, y: 27 },
  { id: 'k4', nombre: 'Mesa 4', zona: 'Lateral', precio: 250, personas: 6, incluye: '1 botella + refrescos', x: 91, y: 27 },
  { id: 'k5', nombre: 'Mesa 5', zona: 'Lateral', precio: 300, personas: 8, incluye: '2 botellas', x: 78, y: 42 },
  { id: 'k6', nombre: 'Mesa 6', zona: 'Lateral', precio: 300, personas: 8, incluye: '2 botellas', x: 91, y: 42 },
  { id: 'k7', nombre: 'Palco', zona: 'Sobre la barra', precio: 600, personas: 10, incluye: '3 botellas premium', x: 85, y: 60 },
]

const MESAS_OPIUM = [
  { id: 'o1', nombre: 'Mesa Terraza', zona: 'Terraza', precio: 300, personas: 6, incluye: '1 botella', x: 0, y: 0 },
  { id: 'o2', nombre: 'Mesa Pista', zona: 'Pista', precio: 350, personas: 6, incluye: '1 botella premium', x: 0, y: 0 },
  { id: 'o3', nombre: 'Reservado VIP', zona: 'Zona VIP', precio: 700, personas: 10, incluye: '3 botellas premium', x: 0, y: 0 },
]

// Copia las mesas marcando como ocupadas las de la lista (cada noche se ocupan unas distintas)
function conOcupadas(mesas, ocupadas) {
  return mesas.map((mesa) => ({ ...mesa, ocupado: ocupadas.includes(mesa.id) }))
}

export const sesionesDiscoteca = [
  // ----- Fitz Club: lo enseña todo (listas, tramos, cuántas quedan y plano) -----
  {
    id: 'fitz-noche-latina',
    nombre: 'Noche Latina',
    sala: 'Fitz Club',
    fecha: fechaDentroDe(0),
    hora: '23:30',
    genero: 'Reguetón',
    precio: 13,
    imagen: fitzClub,
    descripcion: 'Reguetón y clásicos latinos toda la noche. Copa incluida antes de la 01:00.',
    cartel: ['DJ Caribe', 'La Nena MC'],
    venta: {
      listas: [
        { id: 'lista-gratis', nombre: 'Lista gratis', precio: 0, hastaHora: '01:00', incluye: 'Entrada sin consumición' },
        { id: 'lista-copa', nombre: 'Lista con copa', precio: 8, hastaHora: '02:00', incluye: 'Entrada + 1 copa' },
      ],
      entradas: [
        {
          id: 'general',
          nombre: 'Entrada general',
          incluye: '1 copa',
          tramos: [
            { nombre: '1.er tramo', precio: 10, cupo: 100, vendidas: 100 },
            { nombre: '2.º tramo', precio: 13, cupo: 150, vendidas: 118 },
            { nombre: 'Último tramo', precio: 18, cupo: 150, vendidas: 0 },
          ],
        },
        { id: 'vip', nombre: 'Entrada VIP', incluye: 'Zona VIP + 2 copas', precio: 30, cupo: 40, vendidas: 31 },
      ],
      reservados: conOcupadas(MESAS_FITZ, ['m2', 'v1']),
      plano: PLANO_FITZ,
      mostrar: { tramos: true, quedan: true, mapa: true },
    },
  },
  {
    id: 'fitz-house-sessions',
    nombre: 'House Sessions',
    sala: 'Fitz Club',
    fecha: fechaDentroDe(2),
    hora: '23:30',
    genero: 'Electrónica',
    precio: 15,
    imagen: fitzClub,
    descripcion: 'House y tech-house con invitado internacional.',
    cartel: ['Marco Vela', 'Sundeck', 'Iria B2B Noa'],
    venta: {
      listas: [{ id: 'lista-reducida', nombre: 'Lista reducida', precio: 10, hastaHora: '00:30', incluye: 'Entrada + 1 copa' }],
      entradas: [
        {
          id: 'general',
          nombre: 'Entrada general',
          incluye: '1 copa',
          tramos: [
            { nombre: 'Early bird', precio: 12, cupo: 80, vendidas: 80 },
            { nombre: '2.º tramo', precio: 15, cupo: 200, vendidas: 64 },
            { nombre: 'Taquilla', precio: 22, cupo: 100, vendidas: 0 },
          ],
        },
      ],
      reservados: conOcupadas(MESAS_FITZ, ['m1', 'm4', 'm5']),
      plano: PLANO_FITZ,
      mostrar: { tramos: true, quedan: true, mapa: true },
    },
  },
  {
    id: 'fitz-universitaria',
    nombre: 'Fiesta Universitaria',
    sala: 'Fitz Club',
    fecha: fechaDentroDe(7),
    hora: '23:30',
    genero: 'Comercial',
    precio: 10,
    imagen: fitzClub,
    descripcion: 'Comercial y éxitos del momento. Descuento con carné de estudiante.',
    cartel: ['DJ Campus'],
    dressCode: 'Informal',
    venta: {
      listas: [
        { id: 'lista-uni', nombre: 'Lista universitaria', precio: 0, hastaHora: '01:30', incluye: 'Gratis con carné de estudiante' },
      ],
      entradas: [{ id: 'general', nombre: 'Entrada general', incluye: '1 copa', precio: 10 }],
    },
  },

  // ----- Teatro Kapital: tramos sin decir cuántas quedan; plano con mesas -----
  {
    id: 'kapital-siete-plantas',
    nombre: 'Siete Plantas',
    sala: 'Teatro Kapital',
    fecha: fechaDentroDe(0),
    hora: '23:45',
    genero: 'Comercial',
    precio: 20,
    imagen: teatroKapital,
    descripcion: 'Una música distinta en cada planta: comercial, reguetón, house y karaoke en la azotea.',
    cartel: ['DJ Atocha', 'Lola Kim', 'Resident Crew'],
    venta: {
      listas: [{ id: 'lista-gratis', nombre: 'Lista gratis', precio: 0, hastaHora: '01:30', incluye: 'Entrada sin consumición' }],
      entradas: [
        {
          id: 'general',
          nombre: 'Entrada con copa',
          incluye: '1 copa',
          tramos: [
            { nombre: 'Anticipada', precio: 17, cupo: 300, vendidas: 300 },
            { nombre: 'Normal', precio: 20, cupo: 400, vendidas: 250 },
            { nombre: 'Taquilla', precio: 25, cupo: 300, vendidas: 0 },
          ],
        },
      ],
      reservados: conOcupadas(MESAS_KAPITAL, ['k1', 'k4']),
      plano: PLANO_KAPITAL,
      mostrar: { tramos: true, quedan: false, mapa: true },
    },
  },
  {
    id: 'kapital-techno',
    nombre: 'Kapital Techno',
    sala: 'Teatro Kapital',
    fecha: fechaDentroDe(3),
    hora: '23:45',
    genero: 'Electrónica',
    precio: 22,
    imagen: teatroKapital,
    descripcion: 'Techno en la sala principal hasta el cierre.',
    cartel: ['Hormigón', 'Vera Lux'],
    venta: {
      entradas: [
        {
          id: 'general',
          nombre: 'Entrada general',
          tramos: [
            { nombre: '1.er tramo', precio: 18, cupo: 200, vendidas: 140 },
            { nombre: '2.º tramo', precio: 22, cupo: 300, vendidas: 0 },
          ],
        },
      ],
      mostrar: { tramos: true, quedan: true },
    },
  },

  // ----- Opium: reservados pero sin enseñar el plano -----
  {
    id: 'opium-dinner-club',
    nombre: 'Dinner & Club',
    sala: 'Opium Madrid',
    fecha: fechaDentroDe(1),
    hora: '23:00',
    genero: 'Comercial',
    precio: 25,
    imagen: opiumMadrid,
    descripcion: 'Después de la cena, sesión de DJ con música comercial y house.',
    cartel: ['Adri Sol', 'Monique'],
    venta: {
      entradas: [{ id: 'general', nombre: 'Entrada general', incluye: '1 copa', precio: 25 }],
      reservados: conOcupadas(MESAS_OPIUM, ['o2']),
      mostrar: { mapa: false },
    },
  },
  {
    id: 'opium-rnb',
    nombre: 'R&B Nights',
    sala: 'Opium Madrid',
    fecha: fechaDentroDe(4),
    hora: '23:30',
    genero: 'Rap',
    precio: 20,
    imagen: opiumMadrid,
    descripcion: 'Hip-hop y R&B de los 2000 hasta hoy.',
    cartel: ['DJ Kelvin', 'Sara Groove'],
    venta: {
      listas: [{ id: 'lista-gratis', nombre: 'Lista gratis', precio: 0, hastaHora: '00:30', incluye: 'Entrada sin consumición' }],
      entradas: [{ id: 'general', nombre: 'Entrada general', incluye: '1 copa', precio: 20 }],
      reservados: conOcupadas(MESAS_OPIUM, []),
    },
  },

  // ----- Medias Puri: hay tramos pero el dueño solo enseña el precio actual -----
  {
    id: 'puri-cabaret',
    nombre: 'Cabaret Club',
    sala: 'Medias Puri',
    fecha: fechaDentroDe(2),
    hora: '23:30',
    genero: 'Electrónica',
    precio: 18,
    imagen: mediasPuri,
    descripcion: 'Sesión de club con actuaciones en directo entre sala y sala.',
    cartel: ['Puri Selecta', 'Compañía Lentejuela'],
    venta: {
      entradas: [
        {
          id: 'general',
          nombre: 'Entrada general',
          incluye: '1 copa',
          tramos: [
            { nombre: '1.er tramo', precio: 15, cupo: 100, vendidas: 100 },
            { nombre: '2.º tramo', precio: 18, cupo: 150, vendidas: 40 },
            { nombre: '3.er tramo', precio: 22, cupo: 150, vendidas: 0 },
          ],
        },
      ],
      mostrar: { tramos: false, quedan: false },
    },
  },
  {
    id: 'puri-disco',
    nombre: 'Disco Inferno',
    sala: 'Medias Puri',
    fecha: fechaDentroDe(8),
    hora: '23:30',
    genero: 'Comercial',
    precio: 16,
    imagen: mediasPuri,
    descripcion: 'Disco, funk y pop de los 70 a los 90.',
    cartel: ['Mirror Ball'],
    dressCode: 'Temática disco (opcional)',
    venta: {
      listas: [{ id: 'lista-disco', nombre: 'Lista disco', precio: 12, hastaHora: '01:00', incluye: 'Entrada + 1 copa' }],
      entradas: [{ id: 'general', nombre: 'Entrada general', incluye: '1 copa', precio: 16 }],
    },
  },
]
