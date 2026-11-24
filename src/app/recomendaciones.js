// «Quizás te interese»: recomendaciones según los gustos de quien usa la app.
// Sin servidor ni IA: se puntúa cada evento con lo que la app ya sabe del usuario y se
// enseñan los mejores, cada uno con el motivo principal para que se entienda por qué sale.
//
// Señales (cuanto más pesan, más dicen de tus gustos):
//   - Salas favoritas (♥):        su tipo de local, sus estilos y el propio local
//   - Entradas compradas:         estilo, local y tipo de local de esos eventos
//   - Eventos que has abierto:    estilo y local (pesa poco: mirar no es comprar)
//   - Amigos que van:             cada amigo con entrada suma
//   - Cerca y pronto:             un empujón si está a menos de 3 km o en los próximos 3 días

import { eventos } from '../data/eventos.js'
import { TIPO_DISCOTECA, salas } from '../data/salas.js'
import { distanciaAConcierto } from './distancia.js'
import { esProximo, fechaDentroDe } from './tiempo.js'

// ---------- Constantes ----------
const PESO = {
  favorito: { local: 3, tipo: 2, genero: 1 },
  compra: { genero: 3, local: 2, tipo: 1 },
  visto: { genero: 1, local: 0.5 },
  amigo: 1.5,
  cerca: 1,
  pronto: 0.5,
}
const KM_CERCA = 3
const DIAS_PRONTO = 3
// A partir de esta puntuación un estilo cuenta como «te gusta»
const MINIMO_GUSTO = 2

function sumar(mapa, clave, puntos) {
  mapa[clave] = (mapa[clave] ?? 0) + puntos
}

// Resume lo que se sabe del usuario: { generos, locales, tipos } con puntos de afinidad
export function perfilDeGustos({ favoritos, entradas, vistos }) {
  const generos = {}
  const locales = {}
  const tipos = {}

  favoritos.forEach((nombre) => {
    sumar(locales, nombre, PESO.favorito.local)
    sumar(tipos, salas[nombre]?.tipo, PESO.favorito.tipo)
    // Los estilos que suele programar ese local
    new Set(eventos.filter((evento) => evento.sala === nombre).map((evento) => evento.genero)).forEach((genero) =>
      sumar(generos, genero, PESO.favorito.genero),
    )
  })

  // Una compra cuenta una vez por evento, aunque sean varias entradas
  const comprados = [...new Map(entradas.map((entrada) => [entrada.concierto.id, entrada.concierto])).values()]
  comprados.forEach((evento) => {
    sumar(generos, evento.genero, PESO.compra.genero)
    sumar(locales, evento.sala, PESO.compra.local)
    sumar(tipos, salas[evento.sala]?.tipo, PESO.compra.tipo)
  })

  vistos.forEach((id) => {
    const evento = eventos.find((e) => e.id === id)
    if (!evento) return
    sumar(generos, evento.genero, PESO.visto.genero)
    sumar(locales, evento.sala, PESO.visto.local)
  })

  const vacio = favoritos.length === 0 && comprados.length === 0 && vistos.length === 0
  return { generos, locales, tipos, vacio }
}

// Lista de eventos recomendados: [{ evento, puntos, motivo }]
// excluir = ids que ya se enseñan en otro sitio (favoritos, ya comprados)
export function recomendar({ perfil, amigosQueVan, ubicacion, excluir, limite = 4, ahora = new Date() }) {
  const limitePronto = fechaDentroDe(DIAS_PRONTO, ahora)

  return eventos
    .filter((evento) => esProximo(evento, ahora) && !excluir.has(evento.id))
    .map((evento) => {
      // Cada motivo con lo que aporta; el que más aporta es el que se enseña
      const motivos = []
      const genero = perfil.generos[evento.genero] ?? 0
      if (genero > 0) motivos.push({ puntos: genero, texto: `Te gusta ${evento.genero.toLowerCase()}` })
      const local = perfil.locales[evento.sala] ?? 0
      if (local > 0) motivos.push({ puntos: local * 0.8, texto: `Por tu interés en ${evento.sala}` })
      const tipo = perfil.tipos[salas[evento.sala]?.tipo] ?? 0
      if (tipo > 0)
        motivos.push({
          puntos: tipo * 0.5,
          texto: salas[evento.sala].tipo === TIPO_DISCOTECA ? 'Sueles ir a discotecas' : 'Sueles ir a conciertos',
        })

      const amigos = amigosQueVan(evento)
      if (amigos.length > 0)
        motivos.push({
          puntos: amigos.length * PESO.amigo,
          texto:
            amigos.length === 1
              ? `Va ${amigos[0].nombre}`
              : `Van ${amigos[0].nombre} y ${amigos.length - 1} ${amigos.length === 2 ? 'amigo' : 'amigos'} más`,
        })

      const distancia = distanciaAConcierto(evento, ubicacion)
      if (distancia !== null && distancia <= KM_CERCA) motivos.push({ puntos: PESO.cerca, texto: 'Cerca de ti' })
      if (evento.fecha <= limitePronto) motivos.push({ puntos: PESO.pronto, texto: 'Es muy pronto' })

      const puntos = motivos.reduce((suma, motivo) => suma + motivo.puntos, 0)
      // Un estilo con pocos puntos (solo lo has mirado) no se presenta como «te gusta»
      const principal = motivos.sort((a, b) => b.puntos - a.puntos)[0]
      const motivo =
        principal?.texto.startsWith('Te gusta') && genero < MINIMO_GUSTO ? 'Parecido a lo que has mirado' : principal?.texto
      return { evento, puntos, motivo: motivo ?? 'Próximamente' }
    })
    .sort((a, b) => b.puntos - a.puntos || a.evento.fecha.localeCompare(b.evento.fecha))
    .slice(0, limite)
}
