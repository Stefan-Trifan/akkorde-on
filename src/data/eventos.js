import { conciertos } from './conciertos.js'
import { conciertosExtra } from './conciertosExtra.js'

// Todos los conciertos de la demo (los de Alejandro + los extra), ordenados por fecha
export const eventos = [...conciertos, ...conciertosExtra].sort((a, b) => a.fecha.localeCompare(b.fecha))
