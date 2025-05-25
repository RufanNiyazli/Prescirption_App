import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Vite serveri 0.0.0.0 ünvanında dinləsin
    port: 5173,  // default port, istəsən dəyişə bilərsən
  },
})
