// boton fijo arriba para cambiar entre la vista App y la vista Web
const MODES = [
  { id: 'app', label: '📱 App' },
  { id: 'web', label: '🖥 Web' },
]

function ModeToggle({ mode, onChange }) {
  return (
    <div className="fixed top-2 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-slate-800 p-1 shadow-lg">
      {MODES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-pressed={mode === id}
          onClick={() => onChange(id)}
          className={`rounded-full px-4 py-1 text-sm font-semibold transition-colors ${
            mode === id ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ModeToggle
