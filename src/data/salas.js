// Locales de la demo: salas de conciertos y discotecas reales de Madrid.
// Coordenadas aproximadas, sacadas de su dirección. Descripción, edad mínima y
// código de vestimenta son datos de ejemplo para la demo (no oficiales).
// edadMinima y dressCode = null → el local no pide nada especial.

// ---------- Constantes ----------
export const TIPO_SALA = 'Sala de conciertos'
export const TIPO_DISCOTECA = 'Discoteca'

export const salas = {
  // ----- Discotecas -----
  'Fitz Club': {
    tipo: TIPO_DISCOTECA,
    direccion: 'C/ de la Princesa, 1 (Plaza de España)',
    lat: 40.4234,
    lng: -3.7118,
    descripcion: 'Club junto a Plaza de España, en el local de la antigua Sala Heineken.',
    edadMinima: 18,
    dressCode: 'Arreglado informal; nada de ropa deportiva',
  },
  'Teatro Kapital': {
    tipo: TIPO_DISCOTECA,
    direccion: 'C/ de Atocha, 125',
    lat: 40.4098,
    lng: -3.693,
    descripcion: 'Siete plantas en un antiguo teatro junto a Atocha, cada una con un estilo de música distinto.',
    edadMinima: 18,
    dressCode: 'Arreglado: camisa o polo y zapato; sin chándal ni gorras',
  },
  'Opium Madrid': {
    tipo: TIPO_DISCOTECA,
    direccion: 'C/ de José Abascal, 56',
    lat: 40.4388,
    lng: -3.6916,
    descripcion: 'Club con restaurante cerca de la Castellana. Cena y después sesión de DJ hasta el cierre.',
    edadMinima: 18,
    dressCode: 'Elegante; no se permiten zapatillas deportivas',
  },
  'Medias Puri': {
    tipo: TIPO_DISCOTECA,
    direccion: 'Pl. de Tirso de Molina, 1',
    lat: 40.4124,
    lng: -3.7046,
    descripcion: 'Club escondido en los bajos del Teatro Nuevo Apolo, con espectáculos durante la sesión.',
    edadMinima: 18,
    dressCode: null,
  },

  // ----- Salas de conciertos -----
  'Sala El Sol': {
    tipo: TIPO_SALA,
    direccion: 'C/ de los Jardines, 3',
    lat: 40.4197,
    lng: -3.7016,
    descripcion: 'Sala pequeña junto a Gran Vía, clásica de la Movida madrileña.',
    edadMinima: null,
    dressCode: null,
  },
  'Café Berlín': {
    tipo: TIPO_SALA,
    direccion: 'C/ Costanilla de los Ángeles, 20',
    lat: 40.4196,
    lng: -3.7085,
    descripcion: 'Club de jazz y directos cerca de Ópera.',
    edadMinima: null,
    dressCode: null,
  },
  'La Riviera': {
    tipo: TIPO_SALA,
    direccion: 'P.º Bajo de la Virgen del Puerto, s/n',
    lat: 40.413,
    lng: -3.7215,
    descripcion: 'Sala grande junto al río Manzanares, con conciertos de gira.',
    edadMinima: null,
    dressCode: null,
  },
  'Galileo Galilei': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Galileo, 100',
    lat: 40.4388,
    lng: -3.7098,
    descripcion: 'Sala de conciertos y humor en Chamberí.',
    edadMinima: null,
    dressCode: null,
  },
  'Sala Copérnico': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Fernández de los Ríos, 67',
    lat: 40.4357,
    lng: -3.7128,
    descripcion: 'Sala mediana en Chamberí para directos de pop y rock.',
    edadMinima: null,
    dressCode: null,
  },
  Clamores: {
    tipo: TIPO_SALA,
    direccion: 'C/ de Alburquerque, 14',
    lat: 40.431,
    lng: -3.701,
    descripcion: 'Sala de jazz y música en directo en Chamberí.',
    edadMinima: null,
    dressCode: null,
  },
  'Sala But': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Barceló, 11',
    lat: 40.4269,
    lng: -3.7002,
    descripcion: 'Sala de conciertos en Malasaña que de madrugada pasa a sesión de club.',
    edadMinima: null,
    dressCode: null,
  },
  'Teatro Barceló': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Barceló, 11',
    lat: 40.4269,
    lng: -3.7002,
    descripcion: 'Antiguo teatro en Malasaña, en el mismo edificio que Sala But.',
    edadMinima: null,
    dressCode: null,
  },
  Siroco: {
    tipo: TIPO_SALA,
    direccion: 'C/ de San Dimas, 3',
    lat: 40.4269,
    lng: -3.7068,
    descripcion: 'Sala pequeña en Malasaña para grupos emergentes.',
    edadMinima: null,
    dressCode: null,
  },
  'Matadero Madrid': {
    tipo: TIPO_SALA,
    direccion: 'P.º de la Chopera, 14',
    lat: 40.3918,
    lng: -3.6979,
    descripcion: 'Centro cultural en el antiguo matadero de Legazpi.',
    edadMinima: null,
    dressCode: null,
  },
  'Movistar Arena': {
    tipo: TIPO_SALA,
    direccion: 'Av. de Felipe II, s/n',
    lat: 40.4239,
    lng: -3.6717,
    descripcion: 'Pabellón para grandes giras junto a Goya.',
    edadMinima: null,
    dressCode: null,
  },
  'Auditorio Nacional': {
    tipo: TIPO_SALA,
    direccion: 'C/ del Príncipe de Vergara, 146',
    lat: 40.4459,
    lng: -3.6766,
    descripcion: 'Auditorio de música clásica y jazz.',
    edadMinima: null,
    dressCode: null,
  },
  'Caja Mágica': {
    tipo: TIPO_SALA,
    direccion: 'Camino de Perales, 23',
    lat: 40.37,
    lng: -3.687,
    descripcion: 'Recinto grande junto al Manzanares para festivales y giras.',
    edadMinima: null,
    dressCode: null,
  },
  'IFEMA Madrid': {
    tipo: TIPO_SALA,
    direccion: 'Av. del Partenón, 5',
    lat: 40.4636,
    lng: -3.6157,
    descripcion: 'Recinto ferial con pabellones para grandes conciertos.',
    edadMinima: null,
    dressCode: null,
  },
}

// Icono y etiqueta corta según el tipo de local
export function iconoLocal(nombre) {
  return salas[nombre]?.tipo === TIPO_DISCOTECA ? '🪩' : '🎤'
}
export function etiquetaTipo(nombre) {
  return salas[nombre]?.tipo === TIPO_DISCOTECA ? 'Discoteca' : 'Sala'
}

// Nombres de los locales, discotecas primero y luego salas, por orden alfabético
export const NOMBRES_DISCOTECAS = Object.keys(salas)
  .filter((nombre) => salas[nombre].tipo === TIPO_DISCOTECA)
  .sort((a, b) => a.localeCompare(b, 'es'))
export const NOMBRES_SALAS = Object.keys(salas)
  .filter((nombre) => salas[nombre].tipo === TIPO_SALA)
  .sort((a, b) => a.localeCompare(b, 'es'))
