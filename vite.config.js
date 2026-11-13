import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/akkorde-on/',
  build: {
    rollupOptions: {
      // dos paginas: la web (index.html) y la demo de la app (demo/index.html)
      input: {
        web: 'index.html',
        demo: 'demo/index.html',
      },
    },
  },
})
