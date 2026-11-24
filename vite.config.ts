import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { handleRuntimeRequest } from './server/runtimeApi.ts'

// Serves /api/* routes from the Vite dev server (MongoDB access lives here, not in the browser).
function apiPlugin(): Plugin {
  return {
    name: 'ats-api',
    configureServer(server) {
      server.middlewares.use('/api/runtime', (req, res) => {
        void handleRuntimeRequest(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
})
