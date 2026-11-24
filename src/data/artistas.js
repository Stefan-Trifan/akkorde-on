// Artistas que se pueden seguir y filtrar: los de los conciertos de Alejandro y los extra,
// más 4 nuevos con gira por España (giras.js). Todos inventados, como los conciertos.
// Se enlazan con los eventos por su nombre exacto (ver artistasDe en eventos.js),
// así no hace falta tocar conciertos.js.

import losKilometros from '../assets/conciertos/los-kilometros.svg'
import trioMalasanaJazz from '../assets/conciertos/trio-malasana-jazz.svg'
import neonHabanero from '../assets/conciertos/neon-habanero.svg'
import dunaRoja from '../assets/conciertos/duna-roja.svg'
import crater from '../assets/conciertos/crater.svg'
import mcLavapies from '../assets/conciertos/mc-lavapies.svg'
import polarisClub from '../assets/conciertos/polaris-club.svg'
import lasHermanasBrisa from '../assets/conciertos/las-hermanas-brisa.svg'
import lasFarolas from '../assets/conciertos/las-farolas.svg'
import corrienteAlterna from '../assets/conciertos/corriente-alterna.svg'
import mareaAlta from '../assets/conciertos/marea-alta.svg'
import cuartetoRetiro from '../assets/conciertos/cuarteto-retiro.svg'
import furiaNorte from '../assets/conciertos/furia-norte.svg'
import ritmoBarrio from '../assets/conciertos/ritmo-barrio.svg'
import auroraVega from '../assets/conciertos/aurora-vega.svg'
import losSatelites from '../assets/conciertos/los-satelites.svg'
import bruma from '../assets/conciertos/bruma.svg'
import niloSur from '../assets/conciertos/nilo-sur.svg'

// Crea la ficha de una artista en una línea (para la lista larga de abajo)
function artista(id, nombre, genero, origen, descripcion, imagen) {
  return { id, nombre, genero, origen, descripcion, imagen }
}

export const artistas = [
  // ----- Nuevos, con gira (giras.js) -----
  {
    id: 'aurora-vega',
    nombre: 'Aurora Vega',
    genero: 'Pop',
    origen: 'Valencia',
    descripcion: 'Pop luminoso con banda completa. Presenta «Mareas», su segundo disco.',
    imagen: auroraVega,
  },
  {
    id: 'los-satelites',
    nombre: 'Los Satélites',
    genero: 'Indie pop',
    origen: 'Alcalá de Henares',
    descripcion: 'Cuarteto de indie pop con sintetizadores. Gira «Órbita» por salas.',
    imagen: losSatelites,
  },
  {
    id: 'bruma',
    nombre: 'Bruma',
    genero: 'Rock alternativo',
    origen: 'Toledo',
    descripcion: 'Trío de rock alternativo con guitarras densas y directos intensos.',
    imagen: bruma,
  },
  {
    id: 'nilo-sur',
    nombre: 'Nilo Sur',
    genero: 'Soul',
    origen: 'Sevilla',
    descripcion: 'Voz soul con banda de metales. Gira «Delta» en formato íntimo.',
    imagen: niloSur,
  },

  // ----- De los conciertos que ya había (conciertos.js y conciertosExtra.js) -----
  artista('los-kilometros', 'Los Kilómetros', 'Indie rock', 'Madrid', 'Indie rock de guitarras y estribillos para cantar.', losKilometros),
  artista('trio-malasana-jazz', 'Trío Malasaña Jazz', 'Jazz', 'Madrid', 'Piano, contrabajo y batería: estándares y temas propios.', trioMalasanaJazz),
  artista('neon-habanero', 'Neón Habanero', 'Pop latino', 'Madrid', 'Pop latino bailable con aire caribeño.', neonHabanero),
  artista('duna-roja', 'Duna Roja', 'Flamenco fusión', 'Granada', 'Flamenco con electrónica y percusión.', dunaRoja),
  artista('crater', 'Cráter', 'Metal', 'Madrid', 'Metal pesado y directo sin descanso.', crater),
  artista('mc-lavapies', 'MC Lavapiés', 'Rap', 'Madrid', 'Rap de barrio con banda en directo.', mcLavapies),
  artista('polaris-club', 'Polaris Club', 'Electrónica', 'Madrid', 'Dúo de electrónica en directo con sintetizadores.', polarisClub),
  artista('las-hermanas-brisa', 'Las Hermanas Brisa', 'Pop', 'Madrid', 'Dúo de pop con armonías vocales.', lasHermanasBrisa),
  artista('las-farolas', 'Las Farolas', 'Indie rock', 'Madrid', 'Grupo emergente de indie rock.', lasFarolas),
  artista('corriente-alterna', 'Corriente Alterna', 'Electrónica', 'Madrid', 'Electrónica de baile con visuales.', corrienteAlterna),
  artista('marea-alta', 'Marea Alta', 'Pop latino', 'Madrid', 'Pop latino para grandes recintos.', mareaAlta),
  artista('cuarteto-retiro', 'Cuarteto Retiro', 'Jazz', 'Madrid', 'Cuarteto de jazz clásico.', cuartetoRetiro),
  artista('furia-norte', 'Furia Norte', 'Metal', 'Bilbao', 'Metal del norte con mucha caña.', furiaNorte),
  artista('ritmo-barrio', 'Ritmo Barrio', 'Rap', 'Madrid', 'Rap y R&B para grandes escenarios.', ritmoBarrio),
]

// Busca una artista por su nombre exacto (null si no está en el catálogo, p. ej. un DJ)
export function artistaPorNombre(nombre) {
  return artistas.find((artista) => artista.nombre === nombre) ?? null
}

// Busca una artista por su id
export function artistaPorId(id) {
  return artistas.find((artista) => artista.id === id) ?? null
}
