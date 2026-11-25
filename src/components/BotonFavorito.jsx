// Corazón para guardar o quitar una sala o discoteca de favoritos
function BotonFavorito({ activo, onCambiar, nombre, className = '' }) {
  return (
    <button
      type="button"
      onClick={(evento) => {
        evento.stopPropagation()
        onCambiar()
      }}
      aria-pressed={activo}
      aria-label={activo ? `Quitar ${nombre} de favoritos` : `Añadir ${nombre} a favoritos`}
      title={activo ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg transition active:scale-90 ${
        activo ? 'bg-pink-500/20 text-pink-500' : 'bg-fondo/70 text-texto hover:text-pink-400'
      } ${className}`}
    >
      {activo ? '♥' : '♡'}
    </button>
  )
}

export default BotonFavorito
