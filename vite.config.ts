import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'resume-route',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.split('?')[0] === '/resume') req.url = req.url.replace('/resume', '/resume/')
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.split('?')[0] === '/resume') req.url = req.url.replace('/resume', '/resume/')
          next()
        })
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'resume/index.html'),
        agenticDelivery: resolve(__dirname, 'work/agentic-delivery/index.html'),
        aiHub: resolve(__dirname, 'work/ai-hub/index.html'),
        developerEnablement: resolve(__dirname, 'work/developer-enablement/index.html'),
        enterpriseEngineering: resolve(__dirname, 'work/enterprise-engineering/index.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
})
