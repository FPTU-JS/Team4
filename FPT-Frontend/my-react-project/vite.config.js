import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:8081',
      '/oauth2/authorization': 'http://localhost:8081',
      '/login': 'http://localhost:8081',
      '/ws': {
        target: 'http://localhost:8081',
        ws: true,
      }
    }
  }
})
