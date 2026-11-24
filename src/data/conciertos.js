// Conciertos de ejemplo para la demo (Sprint 2)
// Artistas reales; las salas son reales de Madrid. Fechas, salas y precios son de ejemplo (demo):
// no son conciertos anunciados de verdad.
// precio en euros; fecha en formato AAAA-MM-DD.

import ardeBogota from '../assets/conciertos/arde-bogota.svg'
import relsB from '../assets/conciertos/rels-b.svg'
import mykeTowers from '../assets/conciertos/myke-towers.svg'
import dellafuente from '../assets/conciertos/dellafuente.svg'
import magoDeOz from '../assets/conciertos/mago-de-oz.svg'
import natosYWaor from '../assets/conciertos/natos-y-waor.svg'
import bizarrap from '../assets/conciertos/bizarrap.svg'
import aitana from '../assets/conciertos/aitana.svg'

export const conciertos = [
  {
    id: 'arde-bogota',
    nombre: 'Arde Bogotá',
    sala: 'Sala El Sol',
    fecha: '2026-11-13',
    hora: '21:00',
    genero: 'Rock',
    precio: 18,
    imagen: ardeBogota,
  },
  {
    id: 'rels-b',
    nombre: 'Rels B',
    sala: 'Café Berlín',
    fecha: '2026-11-19',
    hora: '21:30',
    genero: 'R&B',
    precio: 15,
    imagen: relsB,
  },
  {
    id: 'myke-towers',
    nombre: 'Myke Towers',
    sala: 'La Riviera',
    fecha: '2026-11-21',
    hora: '21:00',
    genero: 'Reguetón',
    precio: 28,
    imagen: mykeTowers,
  },
  {
    id: 'dellafuente',
    nombre: 'Dellafuente',
    sala: 'Galileo Galilei',
    fecha: '2026-11-27',
    hora: '21:00',
    genero: 'Flamenco urbano',
    precio: 22,
    imagen: dellafuente,
  },
  {
    id: 'mago-de-oz',
    nombre: 'Mägo de Oz',
    sala: 'Sala Copérnico',
    fecha: '2026-11-28',
    hora: '20:30',
    genero: 'Metal',
    precio: 20,
    imagen: magoDeOz,
  },
  {
    id: 'natos-y-waor',
    nombre: 'Natos y Waor',
    sala: 'Clamores',
    fecha: '2026-12-03',
    hora: '21:30',
    genero: 'Rap',
    precio: 16,
    imagen: natosYWaor,
  },
  {
    id: 'bizarrap',
    nombre: 'Bizarrap',
    sala: 'Sala But',
    fecha: '2026-12-05',
    hora: '23:00',
    genero: 'Electrónica',
    precio: 25,
    imagen: bizarrap,
  },
  {
    id: 'aitana',
    nombre: 'Aitana',
    sala: 'Teatro Barceló',
    fecha: '2026-12-11',
    hora: '21:00',
    genero: 'Pop',
    precio: 24,
    imagen: aitana,
  },
]
