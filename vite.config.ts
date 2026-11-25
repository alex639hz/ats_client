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

// Test framework API (start/stop tests). Override with FRAMEWORK_URL, e.g.
//   FRAMEWORK_URL=http://127.0.0.1:8000
const FRAMEWORK_URL = process.env.FRAMEWORK_URL ?? 'http://127.0.0.1:8088'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    proxy: {
      // /framework/start/dut_test -> FRAMEWORK_URL/start/dut_test
      '/framework': {
        target: FRAMEWORK_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/framework/, ''),
      },
    },
  },
})
