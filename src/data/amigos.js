// Personas de ejemplo para el apartado de amigos (todas inventadas; emails de ejemplo.com).
// En la app real saldrían del servidor; en la demo viven en memoria y se pierden al recargar.

// Perfil de quien usa la demo
export const MI_PERFIL = {
  id: 'alex.ruiz',
  nombre: 'Álex',
  apellidos: 'Ruiz Moreno',
  email: 'alex.ruiz@ejemplo.com',
  prefijo: '+34',
  telefono: '600100200',
  nacimiento: '2003-06-14',
}

// Usuarios de Akkorde-on que se pueden buscar por @usuario o teléfono
export const usuarios = [
  { id: 'lucia.mg', nombre: 'Lucía', apellidos: 'Martín Gil', telefono: '611223344', nacimiento: '2003-02-11' },
  { id: 'marcos_r', nombre: 'Marcos', apellidos: 'Romero Sanz', telefono: '622334455', nacimiento: '2002-09-30' },
  { id: 'irene.v', nombre: 'Irene', apellidos: 'Vidal Ortega', telefono: '633445566', nacimiento: '2004-01-05' },
  { id: 'dani.cb', nombre: 'Dani', apellidos: 'Castro Blanco', telefono: '644556677', nacimiento: '2003-11-19' },
  { id: 'sofia.p', nombre: 'Sofía', apellidos: 'Prieto León', telefono: '655667788', nacimiento: '2004-07-23' },
  { id: 'hugo.n', nombre: 'Hugo', apellidos: 'Navarro Gil', telefono: '666778899', nacimiento: '2002-04-02' },
  { id: 'carla.m', nombre: 'Carla', apellidos: 'Molina Ruiz', telefono: '677889900', nacimiento: '2003-12-12' },
  { id: 'pablo.ts', nombre: 'Pablo', apellidos: 'Torres Sáez', telefono: '688990011', nacimiento: '2001-08-08' },
  { id: 'noa.f', nombre: 'Noa', apellidos: 'Fuentes Díaz', telefono: '699001122', nacimiento: '2004-03-17' },
  { id: 'leo.g', nombre: 'Leo', apellidos: 'Gómez Iglesias', telefono: '610112233', nacimiento: '2003-05-28' },
].map((usuario) => ({ ...usuario, prefijo: '+34', email: `${usuario.id.replace(/[._]/g, '')}@ejemplo.com` }))

// Con quién empieza la demo: amigos y solicitudes que te han llegado
export const AMIGOS_INICIALES = ['lucia.mg', 'marcos_r', 'irene.v', 'dani.cb']
export const SOLICITUDES_INICIALES = ['sofia.p', 'hugo.n']

// Qué personas tienen ya entrada para cada evento (solo cuentan las que son tus amigos)
export const asistencia = {
  'fitz-noche-latina': ['lucia.mg', 'marcos_r', 'irene.v', 'carla.m'],
  'kapital-siete-plantas': ['dani.cb', 'sofia.p'],
  'fitz-house-sessions': ['marcos_r'],
  'opium-dinner-club': ['irene.v', 'hugo.n'],
  'puri-cabaret': ['lucia.mg', 'dani.cb'],
  // Conciertos de las giras (giras.js)
  'bad-bunny-madrid': ['lucia.mg', 'marcos_r', 'sofia.p'],
  'lucho-rk-madrid': ['irene.v'],
  'quevedo-madrid': ['dani.cb', 'hugo.n'],
  'la-pantera-madrid': ['marcos_r'],
  'quevedo-alcala': ['lucia.mg'],
}

// Busca un usuario por su id
export function usuarioPorId(id) {
  return usuarios.find((usuario) => usuario.id === id)
}

// Nombre completo: "Lucía Martín Gil"
export function nombreCompleto(persona) {
  return `${persona.nombre} ${persona.apellidos}`
}

// Quita tildes y mayúsculas para buscar: "Lucía" → "lucia"
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Usuarios cuyo @usuario, nombre o teléfono contiene el texto buscado
export function buscarUsuarios(texto) {
  const busqueda = normalizar(texto.replace(/^@/, '').replace(/\s/g, ''))
  if (busqueda.length < 2) return []
  return usuarios.filter(
    (usuario) =>
      normalizar(usuario.id).includes(busqueda) ||
      normalizar(`${usuario.nombre}${usuario.apellidos}`).replace(/\s/g, '').includes(busqueda) ||
      usuario.telefono.includes(busqueda),
  )
}
