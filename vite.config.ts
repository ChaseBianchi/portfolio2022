import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

// Vercel rewrites /resume to the resume page; do the same for the dev and preview servers.
const resumeRoute = {
  name: 'resume-route',
  configureServer(server: any) { server.middlewares.use(rewrite) },
  configurePreviewServer(server: any) { server.middlewares.use(rewrite) },
}
function rewrite(req: any, _res: any, next: () => void) {
  if (req.url?.split('?')[0] === '/resume') req.url = req.url.replace('/resume', '/resume/')
  next()
}

export default defineConfig({
  plugins: [resumeRoute],
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
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
})
