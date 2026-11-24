// Artistas que se pueden seguir y filtrar: los de conciertos.js, conciertosExtra.js y giras.js.
// Son artistas reales, pero sus conciertos en la app son de ejemplo (fechas, salas y precios de la demo).
// Por eso de cada artista solo se dice su estilo: nada de discos, giras ni datos que no sean de verdad.
// Se enlazan con los eventos por su nombre exacto (ver artistasDe en eventos.js).

import ardeBogota from '../assets/conciertos/arde-bogota.svg'
import relsB from '../assets/conciertos/rels-b.svg'
import mykeTowers from '../assets/conciertos/myke-towers.svg'
import dellafuente from '../assets/conciertos/dellafuente.svg'
import magoDeOz from '../assets/conciertos/mago-de-oz.svg'
import natosYWaor from '../assets/conciertos/natos-y-waor.svg'
import bizarrap from '../assets/conciertos/bizarrap.svg'
import aitana from '../assets/conciertos/aitana.svg'
import vivaSuecia from '../assets/conciertos/viva-suecia.svg'
import saiko from '../assets/conciertos/saiko.svg'
import lolaIndigo from '../assets/conciertos/lola-indigo.svg'
import cTangana from '../assets/conciertos/c-tangana.svg'
import robe from '../assets/conciertos/robe.svg'
import morad from '../assets/conciertos/morad.svg'
import badBunny from '../assets/conciertos/bad-bunny.svg'
import quevedo from '../assets/conciertos/quevedo.svg'
import laPantera from '../assets/conciertos/la-pantera.svg'
import luchoRk from '../assets/conciertos/lucho-rk.svg'

// Crea la ficha de una artista en una línea (para la lista de abajo)
function artista(id, nombre, genero, imagen) {
  return { id, nombre, genero, imagen }
}

export const artistas = [
  // ----- Con gira por España (giras.js) -----
  artista('bad-bunny', 'Bad Bunny', 'Reguetón', badBunny),
  artista('quevedo', 'Quevedo', 'Reguetón', quevedo),
  artista('la-pantera', 'La Pantera', 'Trap', laPantera),
  artista('lucho-rk', 'Lucho RK', 'Trap', luchoRk),

  // ----- De conciertos.js y conciertosExtra.js (algunos también tienen fechas en giras.js) -----
  artista('arde-bogota', 'Arde Bogotá', 'Rock', ardeBogota),
  artista('rels-b', 'Rels B', 'R&B', relsB),
  artista('myke-towers', 'Myke Towers', 'Reguetón', mykeTowers),
  artista('dellafuente', 'Dellafuente', 'Flamenco urbano', dellafuente),
  artista('mago-de-oz', 'Mägo de Oz', 'Metal', magoDeOz),
  artista('natos-y-waor', 'Natos y Waor', 'Rap', natosYWaor),
  artista('bizarrap', 'Bizarrap', 'Electrónica', bizarrap),
  artista('aitana', 'Aitana', 'Pop', aitana),
  artista('viva-suecia', 'Viva Suecia', 'Indie', vivaSuecia),
  artista('saiko', 'Saiko', 'Reguetón', saiko),
  artista('lola-indigo', 'Lola Índigo', 'Pop', lolaIndigo),
  artista('c-tangana', 'C. Tangana', 'Pop', cTangana),
  artista('robe', 'Robe', 'Rock', robe),
  artista('morad', 'Morad', 'Rap', morad),
]

// Busca una artista por su nombre exacto (null si no está en el catálogo, p. ej. un DJ)
export function artistaPorNombre(nombre) {
  return artistas.find((artista) => artista.nombre === nombre) ?? null
}

// Busca una artista por su id
export function artistaPorId(id) {
  return artistas.find((artista) => artista.id === id) ?? null
}
