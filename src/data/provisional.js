// Contenido PROVISIONAL de la vista Web (Sprint 2).
// Cada bloque dice quién lo cambia por el bueno. Nada de aquí es inventado:
// las cifras salen de textos.js (fuente OCU) y las respuestas, de cómo funciona Akkorde-on.
import { cifra } from './textos.js'

// Juan Guasp (06-11): cambiar por el id del vídeo conceptual (lo que va tras «v=» en el enlace)
// y poner VIDEO_PROVISIONAL a false.
// Provisional: noticia de la OCU sobre los gastos de las entradas de Bad Bunny.
export const VIDEO_YOUTUBE_ID = '1JIZCM9_92c'
export const VIDEO_PROVISIONAL = true

// Fran (05-11): misma entrada en 2-3 plataformas, precio final con gastos, enlace y fecha.
// Provisional: el caso de Bad Bunny que ya usamos en la cifra de la web.
export const comparativa = {
  entrada: 'Una entrada de Bad Bunny de 79,50 €',
  precioBase: 79.5,
  otras: [
    {
      plataforma: 'Ticketmaster',
      precioFinal: 269.3,
      fuente: { nombre: cifra.fuente.nombre, url: cifra.fuente.url },
    },
  ],
}

// Fran (05-11): revisar y completar. Respuestas sacadas de la guía del equipo (kit común).
export const faq = [
  {
    pregunta: '¿Por qué solo 1 € de gastos?',
    respuesta: 'Porque solo cobramos lo justo para mantener la web. Ese euro ya está sumado en el precio que ves.',
  },
  {
    pregunta: '¿Cómo evitáis que revendan caro?',
    respuesta: 'Las entradas solo se pueden revender en Akkorde-on y nunca por más de lo que costaron.',
  },
  {
    pregunta: '¿Qué pasa si al final no puedo ir?',
    respuesta: 'Pon tu entrada a la venta en la propia web al mismo precio que pagaste.',
  },
  {
    pregunta: '¿Es seguro el QR?',
    respuesta: 'Cada entrada tiene un QR único que solo sirve una vez en la puerta. Una copia no entra.',
  },
  {
    pregunta: '¿Para qué conciertos sirve?',
    respuesta: 'Para música en directo en Madrid. Puedes buscar los conciertos por estilo.',
  },
  {
    pregunta: '¿Le cuesta algo a la sala o al promotor?',
    respuesta: 'No. Publicar conciertos en Akkorde-on es gratis para salas y promotores.',
  },
]
