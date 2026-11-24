import BotonFavorito from '../components/BotonFavorito.jsx'
import { artistaPorId, artistas } from '../data/artistas.js'
import { artistasDe, eventos } from '../data/eventos.js'
import { NOMBRES_DISCOTECAS, iconoLocal } from '../data/salas.js'
import { inicio } from '../data/textos.js'
import ConcertCard from './ConcertCard.jsx'
import { perfilDeGustos, recomendar } from './recomendaciones.js'
import { esProximo } from './tiempo.js'

// ---------- Constantes ----------
const NUM_FAVORITOS = 4
const NUM_RECOMENDADOS = 4
// Locales y artistas que se proponen para seguir cuando aún no hay favoritos
const SUGERIDOS = NOMBRES_DISCOTECAS.slice(0, 3)
const ARTISTAS_SUGERIDAS = artistas.slice(0, 3)

// Píldora de un favorito (artista o local) que abre su ficha
function Pildora({ icono, nombre, onAbrir }) {
  return (
    <button
      type="button"
      onClick={onAbrir}
      className="flex shrink-0 items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-sm font-semibold text-texto transition hover:border-pink-500"
    >
      <span aria-hidden="true">{icono}</span>
      {nombre}
    </button>
  )
}

// Fila de una sugerencia para seguir: nombre (abre su ficha) y corazón
function SugerenciaFavorito({ icono, nombre, onAbrir, onSeguir }) {
  return (
    <li className="flex items-center gap-3">
      <button
        type="button"
        onClick={onAbrir}
        className="flex flex-1 items-center gap-2 text-left text-sm font-semibold text-texto hover:text-acento"
      >
        <span aria-hidden="true">{icono}</span> {nombre}
      </button>
      <BotonFavorito activo={false} nombre={nombre} onCambiar={onSeguir} />
    </li>
  )
}

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
function Home({
  ubicacion,
  favoritos,
  artistasFavoritos,
  entradas,
  vistos,
  amigosQueVan,
  onCambiarFavorito,
  onCambiarArtistaFavorito,
  onElegir,
  onVerLocal,
  onVerArtista,
}) {
  // ¿Toca en el evento alguna artista que sigues?
  const tocaFavorita = (evento) => artistasDe(evento).some((artista) => artistasFavoritos.includes(artista.id))
  // Próximos eventos de tus artistas, salas y discotecas favoritas
  const deFavoritos = eventos
    .filter((evento) => esProximo(evento) && (favoritos.includes(evento.sala) || tocaFavorita(evento)))
    .slice(0, NUM_FAVORITOS)
  const sinFavoritos = favoritos.length === 0 && artistasFavoritos.length === 0

  // Recomendaciones: sin repetir lo de favoritos ni lo que ya has comprado
  const excluir = new Set([...deFavoritos.map((evento) => evento.id), ...entradas.map((e) => e.concierto.id)])
  const perfil = perfilDeGustos({ favoritos, artistasFavoritos, entradas, vistos })
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

        {sinFavoritos ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-borde p-4">
            <p className="text-sm text-suave">
              Toca <span className="text-pink-500">♡</span> en una artista, sala o discoteca y aquí verás sus próximos
              eventos.
            </p>
            <ul className="flex flex-col gap-2">
              {ARTISTAS_SUGERIDAS.map((artista) => (
                <SugerenciaFavorito
                  key={artista.id}
                  icono="🎤"
                  nombre={artista.nombre}
                  onAbrir={() => onVerArtista(artista)}
                  onSeguir={() => onCambiarArtistaFavorito(artista.id)}
                />
              ))}
              {SUGERIDOS.map((nombre) => (
                <SugerenciaFavorito
                  key={nombre}
                  icono={iconoLocal(nombre)}
                  nombre={nombre}
                  onAbrir={() => onVerLocal(nombre)}
                  onSeguir={() => onCambiarFavorito(nombre)}
                />
              ))}
            </ul>
          </div>
        ) : (
          <>
            {/* Tus artistas y locales favoritos, deslizando en horizontal */}
            <div className="sin-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
              {artistasFavoritos.map(artistaPorId).map((artista) => (
                <Pildora key={artista.id} icono="🎤" nombre={artista.nombre} onAbrir={() => onVerArtista(artista)} />
              ))}
              {favoritos.map((nombre) => (
                <Pildora key={nombre} icono={iconoLocal(nombre)} nombre={nombre} onAbrir={() => onVerLocal(nombre)} />
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
