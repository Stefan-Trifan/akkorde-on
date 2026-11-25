// Conciertos de ejemplo extra para probar el filtro por distancia (Sprint 2).
// Mismo formato que conciertos.js: artistas reales en salas reales de Madrid, repartidas
// entre 1 y 9 km de Sol. Fechas, salas y precios son de ejemplo (demo).

import vivaSuecia from '../assets/conciertos/viva-suecia.svg'
import saiko from '../assets/conciertos/saiko.svg'
import lolaIndigo from '../assets/conciertos/lola-indigo.svg'
import cTangana from '../assets/conciertos/c-tangana.svg'
import robe from '../assets/conciertos/robe.svg'
import morad from '../assets/conciertos/morad.svg'

export const conciertosExtra = [
  {
    id: 'viva-suecia',
    nombre: 'Viva Suecia',
    sala: 'Siroco',
    fecha: '2026-11-14',
    hora: '22:00',
    genero: 'Indie',
    precio: 12,
    imagen: vivaSuecia,
  },
  {
    id: 'saiko',
    nombre: 'Saiko',
    sala: 'Matadero Madrid',
    fecha: '2026-11-20',
    hora: '23:00',
    genero: 'Reguetón',
    precio: 18,
    imagen: saiko,
  },
  {
    id: 'lola-indigo',
    nombre: 'Lola Índigo',
    sala: 'Movistar Arena',
    fecha: '2026-11-22',
    hora: '21:00',
    genero: 'Pop',
    precio: 45,
    imagen: lolaIndigo,
  },
  {
    id: 'c-tangana',
    nombre: 'C. Tangana',
    sala: 'Auditorio Nacional',
    fecha: '2026-11-29',
    hora: '19:30',
    genero: 'Pop',
    precio: 22,
    imagen: cTangana,
  },
  {
    id: 'robe',
    nombre: 'Robe',
    sala: 'Caja Mágica',
    fecha: '2026-12-06',
    hora: '20:00',
    genero: 'Rock',
    precio: 35,
    imagen: robe,
  },
  {
    id: 'morad',
    nombre: 'Morad',
    sala: 'IFEMA Madrid',
    fecha: '2026-12-12',
    hora: '21:30',
    genero: 'Rap',
    precio: 30,
    imagen: morad,
  },
]
