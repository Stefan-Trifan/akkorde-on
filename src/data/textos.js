// Textos de la web de Akkorde-on (Sprint 2)
// Sacados del kit común: eslogan, persona (Valentino) y cifras.
// Escritos para el usuario: frases cortas, qué gana él, sin palabras técnicas.

export const inicio = {
  eslogan: 'Los acordes de hoy no se repiten',
  queEs:
    'Akkorde-on te ayuda a encontrar conciertos en Madrid y comprar tus entradas a precio justo y sin miedo a estafas.',
  destacados: [
    'Descubre conciertos que no salen en otras webs.',
    'Paga lo que ves, sin cargos sorpresa.',
    'Tu entrada es solo tuya.',
  ],
}

export const cifra = {
  antes: '79,50 €',
  despues: '269,30 €',
  texto: 'Es lo que llegó a costar una entrada de Bad Bunny con gastos y cargos.',
  fuente: {
    nombre: 'OCU',
    url: 'https://www.ocu.org/consumo-familia/compras-online/noticias/denuncia-ticketmaster-cobro-entradas',
  },
}

export const ventajas = [
  {
    titulo: 'Precio justo',
    texto: 'Solo 1 € de gastos. El precio que ves es el que pagas.',
  },
  {
    titulo: 'Entradas seguras',
    texto: 'Cada entrada tiene un QR único. Nadie puede vendértela usada.',
  },
  {
    titulo: 'Adiós revendedores',
    texto: 'Si no puedes ir, revendes al precio original y se genera un QR nuevo.',
  },
  {
    titulo: 'Tu plan, fácil',
    texto: 'Busca conciertos por género y cerca de ti, todos en un mismo sitio.',
  },
]

export const problema = {
  titulo: '¿Te suena?',
  parrafos: [
    'Valentino tiene 19 años y vive para la música en directo.',
    'Cuando por fin encuentra un concierto que le encanta, ya está agotado o la reventa pide el triple.',
    'La última vez, la entrada que compró ya estaba usada: pagó dos veces y casi se queda fuera.',
  ],
}

export const solucion = {
  titulo: 'Con Akkorde-on, esto se acabó',
  beneficios: [
    { titulo: 'Encuentra tu plan', texto: 'Conciertos de culto que no salen en otras webs.' },
    { titulo: 'Paga lo justo', texto: 'Sin reventa y sin cargos sorpresa.' },
    { titulo: 'Entra seguro', texto: 'Tu QR es único y solo sirve una vez.' },
  ],
}

export const comoFunciona = [
  { paso: 1, titulo: 'Busca', texto: 'Encuentra tu concierto por género y cercanía.' },
  { paso: 2, titulo: 'Compra', texto: 'Paga en un minuto, sin cargos ocultos.' },
  { paso: 3, titulo: 'Recibe tu QR', texto: 'Te llega al móvil al momento.' },
  { paso: 4, titulo: 'Entra', texto: 'Enseña el QR en la puerta y a disfrutar.' },
]

export const encuesta = {
  datos: [
    { porcentaje: '64 %', texto: 'se ha encontrado las entradas agotadas.' },
    { porcentaje: '53 %', texto: 'ha visto precios elevados en la reventa.' },
    { porcentaje: '48 %', texto: 'ha renunciado a ir a un evento.' },
  ],
  fuente: 'Encuesta propia del equipo · 95 respuestas · noviembre de 2026',
}

export const avisame = {
  boton: 'Avísame',
  subtitulo: 'Déjanos tu correo y serás de los primeros en saberlo.',
  sinFormulario: 'Muy pronto podrás apuntarte aquí.',
}

// Sprint 3: lo que ya se puede hacer en la demo (MVP), contado como beneficio
export const novedades = {
  titulo: 'Pruébalo ya',
  subtitulo: 'La demo funciona en el móvil y en el ordenador. Así es comprar con Akkorde-on:',
  puntos: [
    { titulo: 'Tus artistas, primero', texto: 'Marca a tus favoritos y verás sus conciertos en Madrid y su gira.' },
    { titulo: 'Que no se te escape', texto: 'Te avisamos cuando tu artista venga a tu zona.' },
    { titulo: 'Compra en un minuto', texto: 'Precio final desde el principio, para ti o para tu grupo.' },
    { titulo: 'Tu entrada, en el móvil', texto: 'QR único y, si no puedes ir, reventa al mismo precio.' },
  ],
}

// Sprint 3: citas literales de las entrevistas con clientes reales (las rellena quien hace las entrevistas).
// Mientras este vacío, la web no enseña la seccion: nada inventado
export const validacion = {
  titulo: 'Lo que dicen quienes lo han probado',
  citas: [
    // { texto: 'cita literal', quien: 'nombre o iniciales, edad, perfil' },
  ],
}
