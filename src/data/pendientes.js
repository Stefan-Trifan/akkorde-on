// Contenido de la vista Web que todavía falta (Sprint 2).
// Mientras una lista esté vacía, su sección sale como «pendiente» solo en local (npm run dev)
// y no aparece en la web publicada: nunca se enseña nada inventado como real.

// Se ven los huecos pendientes solo en desarrollo
export const ENSENAR_PENDIENTES = import.meta.env.DEV

// Fran (05-11): misma entrada en otras plataformas, precio final con gastos y fuente
// Ejemplo: { plataforma: 'Ticketmaster', precioFinal: 42.5, fuente: { nombre: 'ticketmaster.es', url: 'https://…', fecha: '2026-11-05' } }
export const comparativa = {
  entrada: '', // qué entrada se compara, p. ej. 'Concierto X en La Riviera'
  precioBase: 0, // precio de la entrada sin gastos, para calcular la de Akkorde-on
  otras: [],
}

// Fran (05-11): 5-6 preguntas frecuentes con respuesta corta
// Ejemplo: { pregunta: '¿Por qué solo 1 € de gastos?', respuesta: '…' }
export const faq = []

// Nico (06-11): 3-4 frases reales de la encuesta, sin nombres
// Ejemplo: { texto: '…' }
export const opiniones = []

// Juan Gasp (06-11): id del vídeo conceptual en YouTube (lo que va tras «v=» en el enlace)
export const VIDEO_YOUTUBE_ID = ''
