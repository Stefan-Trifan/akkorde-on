// Entradas de ejemplo con las que arranca la demo, para que «Mis entradas», el carrusel,
// «Enviar a un amigo» y «Ya regaladas» se puedan probar sin comprar nada.
// Solo se usa en modo demo (ver config.js).

import { MI_PERFIL, nombreCompleto, usuarioPorId } from '../data/amigos.js'
import { eventos } from '../data/eventos.js'
import { crearCodigoEntrada } from '../app/formato.js'
import { nombreEntrada, opcionesVenta, precioEntrada } from '../app/venta.js'
import { precioFinal } from '../app/formato.js'
import { personaAleatoria } from './datosAleatorios.js'

// Qué se «ha comprado»: evento y para quién (null = persona aleatoria); enviadaA = ya regalada
const COMPRAS = [
  { evento: 'fitz-noche-latina', asistente: nombreCompleto(MI_PERFIL) },
  { evento: 'fitz-noche-latina', asistente: nombreCompleto(usuarioPorId('irene.v')) },
  { evento: 'fitz-noche-latina', asistente: null },
  { evento: 'kapital-techno', asistente: nombreCompleto(MI_PERFIL) },
  { evento: 'kapital-techno', asistente: null, enviadaA: nombreCompleto(usuarioPorId('dani.cb')) },
  // Conciertos (salen arriba del todo en «Mis entradas»)
  { evento: 'lucho-rk-madrid', asistente: nombreCompleto(MI_PERFIL) },
  { evento: 'lucho-rk-madrid', asistente: nombreCompleto(usuarioPorId('lucia.mg')) },
  { evento: 'bad-bunny-madrid', asistente: nombreCompleto(MI_PERFIL) },
  { evento: 'bad-bunny-madrid', asistente: null, enviadaA: nombreCompleto(usuarioPorId('marcos_r')) },
]

// Crea las entradas con el mismo formato que una compra real (ver AppView › comprarEntradas)
export function crearEntradasDemo() {
  return COMPRAS.map((compra) => {
    const concierto = eventos.find((evento) => evento.id === compra.evento)
    const general = opcionesVenta(concierto).entradas[0]
    const persona = personaAleatoria(concierto.fecha)
    const codigo = crearCodigoEntrada(concierto)
    return {
      id: codigo,
      codigo,
      concierto,
      enReventa: false,
      gastosExtra: 0,
      enviadaA: compra.enviadaA ?? null,
      tipo: 'entrada',
      opcion: nombreEntrada(general),
      detalle: general.incluye ?? null,
      aviso: null,
      nominal: false,
      revendible: true,
      precioPagado: precioFinal(precioEntrada(general)),
      asistente: compra.enviadaA ?? compra.asistente ?? `${persona.nombre} ${persona.apellidos}`,
      email: persona.email,
    }
  })
}
