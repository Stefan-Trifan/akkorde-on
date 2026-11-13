// en el ordenador (md en adelante) dibuja un movil centrado;
// en un movil de verdad no dibuja nada y el contenido ocupa toda la pantalla
function PhoneFrame({ children }) {
  return (
    <div className="md:flex md:justify-center md:pb-4">
      <div className="relative w-full overflow-hidden md:w-[375px] md:rounded-[2.5rem] md:border-[10px] md:border-slate-800 md:shadow-2xl">
        <div className="absolute top-0 left-1/2 z-10 hidden h-5 w-28 -translate-x-1/2 rounded-b-xl bg-slate-800 md:block" />
        {/* el scroll va dentro para que el marco no se mueva; en el movil ocupa el alto entero (100dvh) */}
        <div className="h-dvh overflow-y-auto bg-white text-slate-900 md:h-[760px] md:max-h-[calc(100dvh-5rem)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PhoneFrame
