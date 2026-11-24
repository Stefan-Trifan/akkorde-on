// Generador de personas de prueba: datos aleatorios pero VÁLIDOS
// (fechas que existen, mayores de edad, móviles españoles y DNI con su letra correcta).
// Solo se usa en modo demo (ver config.js).

// ---------- Constantes ----------
const NOMBRES = [
  'Lucía', 'Hugo', 'Martina', 'Mateo', 'Sofía', 'Leo', 'Julia', 'Daniel', 'Paula', 'Álvaro',
  'Valeria', 'Pablo', 'Carmen', 'Adrián', 'Noa', 'Diego', 'Elena', 'Marcos', 'Irene', 'Javier',
]
const APELLIDOS = [
  'García', 'Martínez', 'López', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández',
  'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos',
]
// Letra de control del DNI según el resto de dividir el número entre 23
const LETRAS_DNI = 'TRWAGMYFPDXBNJZSQVHLCKE'
const EDAD_MIN = 19
const EDAD_MAX = 34

// ---------- Utilidades ----------
const entero = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
const elegir = (lista) => lista[entero(0, lista.length - 1)]
const dosCifras = (n) => String(n).padStart(2, '0')

// Quita tildes y espacios para el email: "Álvaro Ruiz" → "alvaro.ruiz"
function paraEmail(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '.')
}

// Días que tiene un mes (con años bisiestos)
function diasDelMes(anio, mes) {
  return new Date(anio, mes, 0).getDate()
}

// ---------- Generadores ----------
// Fecha de nacimiento "AAAA-MM-DD" de alguien que, el día del evento, tiene entre 19 y 34 años
export function nacimientoAleatorio(fechaEvento = new Date().toISOString().slice(0, 10)) {
  const [anioEvento, mesEvento, diaEvento] = fechaEvento.split('-').map(Number)
  const edad = entero(EDAD_MIN, EDAD_MAX)
  const mes = entero(1, 12)
  // Si su cumpleaños es después del evento, aún no ha cumplido: nace un año antes
  let anio = anioEvento - edad
  const dia = entero(1, diasDelMes(anio, mes))
  if (mes > mesEvento || (mes === mesEvento && dia > diaEvento)) anio -= 1
  return `${anio}-${dosCifras(mes)}-${dosCifras(Math.min(dia, diasDelMes(anio, mes)))}`
}

// Móvil español: 9 cifras que empiezan por 6 o 7
export function movilAleatorio() {
  return `${elegir(['6', '7'])}${String(entero(0, 99999999)).padStart(8, '0')}`
}

// DNI con 8 cifras y la letra que le corresponde
export function dniAleatorio() {
  const numero = entero(10000000, 99999999)
  return `${numero}${LETRAS_DNI[numero % 23]}`
}

// Persona completa con el formato de los formularios del pago
export function personaAleatoria(fechaEvento) {
  const nombre = elegir(NOMBRES)
  // Dos apellidos distintos
  const primero = elegir(APELLIDOS)
  const apellidos = `${primero} ${elegir(APELLIDOS.filter((apellido) => apellido !== primero))}`
  return {
    nombre,
    apellidos,
    email: `${paraEmail(`${nombre} ${apellidos.split(' ')[0]}`)}${entero(1, 99)}@ejemplo.com`,
    prefijo: '+34',
    telefono: movilAleatorio(),
    nacimiento: nacimientoAleatorio(fechaEvento),
    dni: dniAleatorio(),
  }
}
