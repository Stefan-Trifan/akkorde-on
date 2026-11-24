// Conciertos «recién anunciados» para probar «Avísame si viene» sin servidor.
// Cada vez que se pulsa «Simular» en la ficha de una artista sale el siguiente caso,
// para ver cuándo llega el aviso y cuándo no. Solo se usa en modo demo (ver config.js).

import { fechaDentroDe } from '../app/tiempo.js'

// ---------- Constantes ----------
// Casos en orden: cerca de Sol, en la Comunidad de Madrid pero lejos (Alcalá, ~29 km) y en otra comunidad (Toledo)
const CASOS = ['Sala But', 'Teatro Salón Cervantes', 'Teatro de Rojas']
const DIAS_PRIMER_ANUNCIO = 40

// Crea el concierto que anuncia la artista; numero = cuántos ha anunciado ya en esta demo
export function crearAnuncioDemo(artista, numero) {
  return {
    id: `anuncio-${artista.id}-${numero}`,
    nombre: artista.nombre,
    sala: CASOS[numero % CASOS.length],
    fecha: fechaDentroDe(DIAS_PRIMER_ANUNCIO + numero * 3),
    hora: '21:00',
    genero: artista.genero,
    precio: 20,
    imagen: artista.imagen,
    descripcion: 'Concierto recién anunciado.',
    cartel: [artista.nombre],
  }
}
