// Locales de la demo: salas de conciertos y discotecas reales de Madrid.
// Coordenadas aproximadas, sacadas de su dirección. Descripción, edad mínima y
// código de vestimenta son datos de ejemplo para la demo (no oficiales).
// edadMinima y dressCode = null → el local no pide nada especial.
// municipio y comunidad: solo los llevan los locales de fuera de Madrid capital (giras, ver giras.js).

import { COMUNIDAD_MADRID } from './comunidades.js'

// ---------- Constantes ----------
export const TIPO_SALA = 'Sala de conciertos'
export const TIPO_DISCOTECA = 'Discoteca'
const MUNICIPIO_MADRID = 'Madrid'

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

  // ----- Comunidad de Madrid, fuera de la capital (giras) -----
  'Teatro Salón Cervantes': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Cervantes, 7',
    municipio: 'Alcalá de Henares',
    comunidad: COMUNIDAD_MADRID,
    lat: 40.4816,
    lng: -3.3647,
    descripcion: 'Teatro histórico en el centro de Alcalá de Henares.',
    edadMinima: null,
    dressCode: null,
  },
  'Teatro Federico García Lorca': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Ramón y Cajal, 22',
    municipio: 'Getafe',
    comunidad: COMUNIDAD_MADRID,
    lat: 40.3057,
    lng: -3.7329,
    descripcion: 'Teatro municipal de Getafe con programación de conciertos.',
    edadMinima: null,
    dressCode: null,
  },
  'Teatro del Bosque': {
    tipo: TIPO_SALA,
    direccion: 'Av. de Portugal, s/n',
    municipio: 'Móstoles',
    comunidad: COMUNIDAD_MADRID,
    lat: 40.326,
    lng: -3.877,
    descripcion: 'Teatro municipal de Móstoles, junto al parque.',
    edadMinima: null,
    dressCode: null,
  },

  // ----- Otras comunidades (giras) -----
  'Teatro Buero Vallejo': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Cifuentes, 30',
    municipio: 'Guadalajara',
    comunidad: 'Castilla-La Mancha',
    lat: 40.6327,
    lng: -3.166,
    descripcion: 'Teatro municipal de Guadalajara.',
    edadMinima: null,
    dressCode: null,
  },
  'Teatro de Rojas': {
    tipo: TIPO_SALA,
    direccion: 'Pl. Mayor, s/n',
    municipio: 'Toledo',
    comunidad: 'Castilla-La Mancha',
    lat: 39.8575,
    lng: -4.0225,
    descripcion: 'Teatro del siglo XIX en el casco histórico de Toledo.',
    edadMinima: null,
    dressCode: null,
  },
  Razzmatazz: {
    tipo: TIPO_SALA,
    direccion: 'C/ dels Almogàvers, 122',
    municipio: 'Barcelona',
    comunidad: 'Cataluña',
    lat: 41.3976,
    lng: 2.1911,
    descripcion: 'Sala grande de Poblenou con varias salas y conciertos de gira.',
    edadMinima: null,
    dressCode: null,
  },
  'Palau de la Música de València': {
    tipo: TIPO_SALA,
    direccion: "Pg. de l'Albereda, 30",
    municipio: 'València',
    comunidad: 'Comunitat Valenciana',
    lat: 39.4727,
    lng: -0.3622,
    descripcion: 'Auditorio junto al antiguo cauce del Turia.',
    edadMinima: null,
    dressCode: null,
  },
  'Teatro Lope de Vega': {
    tipo: TIPO_SALA,
    direccion: 'Av. de María Luisa, s/n',
    municipio: 'Sevilla',
    comunidad: 'Andalucía',
    lat: 37.38,
    lng: -5.9893,
    descripcion: 'Teatro junto al parque de María Luisa.',
    edadMinima: null,
    dressCode: null,
  },
  'Kafe Antzokia': {
    tipo: TIPO_SALA,
    direccion: 'C/ de San Vicente, 2',
    municipio: 'Bilbao',
    comunidad: 'País Vasco',
    lat: 43.2631,
    lng: -2.9293,
    descripcion: 'Sala de conciertos en un antiguo cine del centro de Bilbao.',
    edadMinima: null,
    dressCode: null,
  },
  'Auditorio de Zaragoza': {
    tipo: TIPO_SALA,
    direccion: 'C/ de Eduardo Ibarra, 3',
    municipio: 'Zaragoza',
    comunidad: 'Aragón',
    lat: 41.6402,
    lng: -0.8986,
    descripcion: 'Auditorio con salas para conciertos grandes y pequeños.',
    edadMinima: null,
    dressCode: null,
  },
}

// Municipio y comunidad de un local; si no lo dice, está en Madrid capital
export function ubicacionDe(nombre) {
  const local = salas[nombre] ?? {}
  return {
    municipio: local.municipio ?? MUNICIPIO_MADRID,
    comunidad: local.comunidad ?? COMUNIDAD_MADRID,
  }
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
// Solo las de la Comunidad de Madrid: las de otras comunidades se ven en la gira de cada artista
export const NOMBRES_SALAS = Object.keys(salas)
  .filter((nombre) => salas[nombre].tipo === TIPO_SALA && ubicacionDe(nombre).comunidad === COMUNIDAD_MADRID)
  .sort((a, b) => a.localeCompare(b, 'es'))
