[**Ver demo en vivo de Akkorde-on**](https://stefan-trifan.github.io/akkorde-on/)

## Modo demo

Mientras no haya backend, la app trae datos de prueba para que cualquiera pueda probarla sin escribir nada:

- **Pago:** cada ficha de asistente (y el titular del reservado) aparece rellena con una persona inventada **aleatoria pero válida**: fecha de nacimiento real y mayor de edad el día del evento, móvil español (6xx/7xx), DNI con su letra correcta y email `@ejemplo.com`. Botón «🎲 Otros» para cambiarlos.
- **Mis entradas:** se empieza con 5 entradas de ejemplo (una ya regalada) para probar el carrusel, enviar y revender.
- **Entrada:** botón «🧪 simular que falta 1 h» para ver el QR sin esperar.
- **Amigos:** las solicitudes que envías se aceptan solas a los 3 segundos.

Todo vive en `src/demo/` y cada punto del código que lo usa lleva el comentario `// DEMO:`.

### Apagarlo (sin tocar código)

Crear un archivo `.env` en la raíz con:

```
VITE_MODO_DEMO=false
```

### Quitarlo del todo (cuando haya backend)

1. Borrar la carpeta `src/demo/`.
2. Buscar `DEMO:` en `src/` y quitar esas líneas o bloques (imports, `MODO_DEMO && …`, autorrelleno del pago, entradas iniciales y `setTimeout` de Amigos).
3. Sustituir los datos de ejemplo de `src/data/` (eventos, discotecas, salas, amigos) por llamadas al backend.

Prompt para hacerlo con IA:

> Quita el modo demo de Akkorde-on: borra `src/demo/`, elimina todo lo marcado con `// DEMO:` en `src/` dejando el comportamiento normal (formularios vacíos, sin entradas iniciales, sin botón de simular hora y sin aceptar solicitudes solas) y comprueba que `npm run lint` y `npm run build` pasan.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
