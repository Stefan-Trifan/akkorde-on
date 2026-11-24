// Sesiones de ejemplo en discotecas reales de Madrid (DJs y nombres de sesión inventados).
// Mismo formato que conciertos.js, más descripción y cartel.
// Las fechas se calculan desde hoy para que los filtros «Hoy» y «Este finde» siempre tengan algo que enseñar.
// edadMinima / dressCode en un evento mandan sobre los del local (salas.js).

import { fechaDentroDe } from '../app/tiempo.js'
import fitzClub from '../assets/conciertos/fitz-club.svg'
import teatroKapital from '../assets/conciertos/teatro-kapital.svg'
import opiumMadrid from '../assets/conciertos/opium-madrid.svg'
import mediasPuri from '../assets/conciertos/medias-puri.svg'

export const sesionesDiscoteca = [
  // ----- Fitz Club -----
  {
    id: 'fitz-noche-latina',
    nombre: 'Noche Latina',
    sala: 'Fitz Club',
    fecha: fechaDentroDe(0),
    hora: '23:30',
    genero: 'Reguetón',
    precio: 15,
    imagen: fitzClub,
    descripcion: 'Reguetón y clásicos latinos toda la noche. Copa incluida antes de la 01:00.',
    cartel: ['DJ Caribe', 'La Nena MC'],
  },
  {
    id: 'fitz-house-sessions',
    nombre: 'House Sessions',
    sala: 'Fitz Club',
    fecha: fechaDentroDe(2),
    hora: '23:30',
    genero: 'Electrónica',
    precio: 18,
    imagen: fitzClub,
    descripcion: 'House y tech-house con invitado internacional.',
    cartel: ['Marco Vela', 'Sundeck', 'Iria B2B Noa'],
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
  },

  // ----- Teatro Kapital -----
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
  },

  // ----- Opium Madrid -----
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
  },

  // ----- Medias Puri -----
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
  },
]
