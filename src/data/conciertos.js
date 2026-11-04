// Conciertos de ejemplo para la demo (Sprint 2)
// Los artistas son inventados; las salas son reales de Madrid.
// precio en euros; fecha en formato AAAA-MM-DD.

import losKilometros from '../assets/conciertos/los-kilometros.svg'
import trioMalasanaJazz from '../assets/conciertos/trio-malasana-jazz.svg'
import neonHabanero from '../assets/conciertos/neon-habanero.svg'
import dunaRoja from '../assets/conciertos/duna-roja.svg'
import crater from '../assets/conciertos/crater.svg'
import mcLavapies from '../assets/conciertos/mc-lavapies.svg'
import polarisClub from '../assets/conciertos/polaris-club.svg'
import lasHermanasBrisa from '../assets/conciertos/las-hermanas-brisa.svg'

export const conciertos = [
  {
    id: 'los-kilometros',
    nombre: 'Los Kilómetros',
    sala: 'Sala El Sol',
    fecha: '2026-11-13',
    hora: '21:00',
    genero: 'Indie rock',
    precio: 18,
    imagen: losKilometros,
  },
  {
    id: 'trio-malasana-jazz',
    nombre: 'Trío Malasaña Jazz',
    sala: 'Café Berlín',
    fecha: '2026-11-19',
    hora: '21:30',
    genero: 'Jazz',
    precio: 15,
    imagen: trioMalasanaJazz,
  },
  {
    id: 'neon-habanero',
    nombre: 'Neón Habanero',
    sala: 'La Riviera',
    fecha: '2026-11-21',
    hora: '21:00',
    genero: 'Pop latino',
    precio: 28,
    imagen: neonHabanero,
  },
  {
    id: 'duna-roja',
    nombre: 'Duna Roja',
    sala: 'Galileo Galilei',
    fecha: '2026-11-27',
    hora: '21:00',
    genero: 'Flamenco fusión',
    precio: 22,
    imagen: dunaRoja,
  },
  {
    id: 'crater',
    nombre: 'Cráter',
    sala: 'Sala Copérnico',
    fecha: '2026-11-28',
    hora: '20:30',
    genero: 'Metal',
    precio: 20,
    imagen: crater,
  },
  {
    id: 'mc-lavapies',
    nombre: 'MC Lavapiés',
    sala: 'Clamores',
    fecha: '2026-12-03',
    hora: '21:30',
    genero: 'Rap',
    precio: 16,
    imagen: mcLavapies,
  },
  {
    id: 'polaris-club',
    nombre: 'Polaris Club',
    sala: 'Sala But',
    fecha: '2026-12-05',
    hora: '23:00',
    genero: 'Electrónica',
    precio: 25,
    imagen: polarisClub,
  },
  {
    id: 'las-hermanas-brisa',
    nombre: 'Las Hermanas Brisa',
    sala: 'Teatro Barceló',
    fecha: '2026-12-11',
    hora: '21:00',
    genero: 'Pop',
    precio: 24,
    imagen: lasHermanasBrisa,
  },
]
