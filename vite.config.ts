import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://www.your-domain.com').replace(/\/$/, '')
  const companyName = env.VITE_COMPANY_NAME || 'Haven Estate Management'

  return {
    server: { proxy: { '/api': 'http://localhost:8787' } },
    plugins: [
      react(),
      {
        name: 'html-seo-defaults',
        transformIndexHtml(html) {
          return html
            .replaceAll('__SITE_URL__', siteUrl)
            .replaceAll('__COMPANY_NAME__', companyName)
        },
      },
    ],
  }
})
