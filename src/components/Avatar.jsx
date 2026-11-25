// ---------- Constantes ----------
// Colores de fondo para las iniciales (siempre el mismo para la misma persona)
const COLORES = ['bg-pink-500', 'bg-sky-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500']
const TAMANOS = { s: 'h-7 w-7 text-[11px]', m: 'h-10 w-10 text-sm', l: 'h-16 w-16 text-xl' }

// Círculo con las iniciales de una persona: "Lucía Martín" → "LM"
function Avatar({ persona, tamano = 'm', className = '' }) {
  const iniciales = `${persona.nombre[0]}${persona.apellidos?.[0] ?? ''}`.toUpperCase()
  const suma = [...(persona.id ?? persona.nombre)].reduce((total, letra) => total + letra.charCodeAt(0), 0)
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${TAMANOS[tamano]} ${
        COLORES[suma % COLORES.length]
      } ${className}`}
    >
      {iniciales}
    </span>
  )
}

export default Avatar
