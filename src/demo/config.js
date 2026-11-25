// ============================================================================
// MODO DEMO
// Mientras no haya backend, la app se rellena sola con datos de prueba para que
// cualquiera pueda probarla sin escribir nada (formularios del pago y entradas de ejemplo).
//
// Para APAGARLO sin tocar código: crear un archivo .env con  VITE_MODO_DEMO=false
// Para QUITARLO del todo: ver la sección «Modo demo» del README
// (borrar la carpeta src/demo y las líneas marcadas con «// DEMO:»).
// ============================================================================

export const MODO_DEMO = import.meta.env.VITE_MODO_DEMO !== 'false'
