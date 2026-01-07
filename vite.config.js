import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // ✅ ESTA CONFIGURACIÓN ES ESENCIAL
  // Indica a Vite dónde están los archivos estáticos (tus MP3)
  publicDir: 'public',
  
  build: {
    // Carpeta de salida
    outDir: 'dist',
    
    // ✅ Copia TODO el contenido de public/ a dist/
    // Esto incluye public/audio/ con todos los MP3
    copyPublicDir: true,
    
    // Opcional: Optimización para muchos archivos
    rollupOptions: {
      output: {
        // Mantiene la estructura de carpetas
        preserveModules: false
      }
    }
  },
  
  // Opcional: Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true
  }
})