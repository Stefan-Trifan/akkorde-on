import BotonFavorito from '../components/BotonFavorito.jsx'
import { eventos } from '../data/eventos.js'
import { NOMBRES_DISCOTECAS, iconoLocal } from '../data/salas.js'
import { inicio } from '../data/textos.js'
import ConcertCard from './ConcertCard.jsx'
import { perfilDeGustos, recomendar } from './recomendaciones.js'
import { esProximo } from './tiempo.js'

// ---------- Constantes ----------
const NUM_FAVORITOS = 4
const NUM_RECOMENDADOS = 4
// Locales que se proponen para seguir cuando aún no hay favoritos
const SUGERIDOS = NOMBRES_DISCOTECAS.slice(0, 3)

// Título pequeño de cada bloque
function Titulo({ children, ayuda }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-suave">{children}</h2>
      {ayuda && <p className="text-xs text-suave">{ayuda}</p>}
    </div>
  )
}

// Pantalla 1: logo, próximos eventos de tus favoritos y «Quizás te interese»
function Home({ ubicacion, favoritos, entradas, vistos, amigosQueVan, onCambiarFavorito, onElegir, onVerLocal }) {
  // Próximos eventos de tus salas y discotecas favoritas
  const deFavoritos = eventos
    .filter((evento) => esProximo(evento) && favoritos.includes(evento.sala))
    .slice(0, NUM_FAVORITOS)

  // Recomendaciones: sin repetir lo de favoritos ni lo que ya has comprado
  const excluir = new Set([...deFavoritos.map((evento) => evento.id), ...entradas.map((e) => e.concierto.id)])
  const perfil = perfilDeGustos({ favoritos, entradas, vistos })
  const recomendados = recomendar({ perfil, amigosQueVan, ubicacion, excluir, limite: NUM_RECOMENDADOS })

  return (
    <div className="flex flex-col gap-7 px-5 pb-8 pt-8">
      <header>
        <h1 className="text-3xl font-extrabold text-texto">
          Akkorde<span className="text-acento">-on</span>
        </h1>
        <p className="mt-1 text-suave">{inicio.eslogan}</p>
      </header>

      <p className="rounded-2xl bg-acento/15 px-4 py-3 text-sm text-texto">
        Solo <strong className="text-acento">1 € de gastos</strong> por entrada. Lo que ves es lo que pagas.
      </p>

      {/* ---------- Favoritos ---------- */}
      <section className="flex flex-col gap-3">
        <Titulo>♥ Tus favoritos</Titulo>

        {favoritos.length === 0 ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-borde p-4">
            <p className="text-sm text-suave">
              Toca <span className="text-pink-500">♡</span> en una sala o discoteca y aquí verás sus próximos eventos.
            </p>
            <ul className="flex flex-col gap-2">
              {SUGERIDOS.map((nombre) => (
                <li key={nombre} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onVerLocal(nombre)}
                    className="flex flex-1 items-center gap-2 text-left text-sm font-semibold text-texto hover:text-acento"
                  >
                    <span aria-hidden="true">{iconoLocal(nombre)}</span> {nombre}
                  </button>
                  <BotonFavorito activo={false} nombre={nombre} onCambiar={() => onCambiarFavorito(nombre)} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {/* Tus locales favoritos, deslizando en horizontal */}
            <div className="sin-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
              {favoritos.map((nombre) => (
                <button
                  key={nombre}
                  type="button"
                  onClick={() => onVerLocal(nombre)}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-sm font-semibold text-texto transition hover:border-pink-500"
                >
                  <span aria-hidden="true">{iconoLocal(nombre)}</span>
                  {nombre}
                </button>
              ))}
            </div>
            {deFavoritos.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-borde p-4 text-center text-sm text-suave">
                Tus favoritos no tienen eventos próximos. Te avisaremos cuando publiquen algo.
              </p>
            ) : (
              deFavoritos.map((evento) => (
                <ConcertCard key={evento.id} concierto={evento} ubicacion={ubicacion} onElegir={onElegir} />
              ))
            )}
          </>
        )}
      </section>

      {/* ---------- Recomendaciones ---------- */}
      <section className="flex flex-col gap-3">
        <Titulo
          ayuda={
            perfil.vacio
              ? 'Lo que más se mueve cerca de ti. Mejorará cuando guardes favoritos o compres.'
              : 'Según tus favoritos, tus compras, lo que miras y dónde van tus amigos.'
          }
        >
          ✨ Quizás te interese
        </Titulo>
        {recomendados.map(({ evento, motivo }) => (
          <ConcertCard key={evento.id} concierto={evento} ubicacion={ubicacion} motivo={motivo} onElegir={onElegir} />
        ))}
      </section>
    </div>
  )
}

export default Home
