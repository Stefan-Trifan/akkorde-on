// Conciertos de ejemplo extra para probar el filtro por distancia (Sprint 2).
// Mismo formato que conciertos.js: artistas inventados en salas reales de Madrid,
// repartidas entre 1 y 9 km de Sol.

import lasFarolas from '../assets/conciertos/las-farolas.svg'
import corrienteAlterna from '../assets/conciertos/corriente-alterna.svg'
import mareaAlta from '../assets/conciertos/marea-alta.svg'
import cuartetoRetiro from '../assets/conciertos/cuarteto-retiro.svg'
import furiaNorte from '../assets/conciertos/furia-norte.svg'
import ritmoBarrio from '../assets/conciertos/ritmo-barrio.svg'

export const conciertosExtra = [
  {
    id: 'las-farolas',
    nombre: 'Las Farolas',
    sala: 'Siroco',
    fecha: '2026-11-14',
    hora: '22:00',
    genero: 'Indie rock',
    precio: 12,
    imagen: lasFarolas,
  },
  {
    id: 'corriente-alterna',
    nombre: 'Corriente Alterna',
    sala: 'Matadero Madrid',
    fecha: '2026-11-20',
    hora: '23:00',
    genero: 'Electrónica',
    precio: 18,
    imagen: corrienteAlterna,
  },
  {
    id: 'marea-alta',
    nombre: 'Marea Alta',
    sala: 'Movistar Arena',
    fecha: '2026-11-22',
    hora: '21:00',
    genero: 'Pop latino',
    precio: 45,
    imagen: mareaAlta,
  },
  {
    id: 'cuarteto-retiro',
    nombre: 'Cuarteto Retiro',
    sala: 'Auditorio Nacional',
    fecha: '2026-11-29',
    hora: '19:30',
    genero: 'Jazz',
    precio: 22,
    imagen: cuartetoRetiro,
  },
  {
    id: 'furia-norte',
    nombre: 'Furia Norte',
    sala: 'Caja Mágica',
    fecha: '2026-12-06',
    hora: '20:00',
    genero: 'Metal',
    precio: 35,
    imagen: furiaNorte,
  },
  {
    id: 'ritmo-barrio',
    nombre: 'Ritmo Barrio',
    sala: 'IFEMA Madrid',
    fecha: '2026-12-12',
    hora: '21:30',
    genero: 'Rap',
    precio: 30,
    imagen: ritmoBarrio,
  },
]
