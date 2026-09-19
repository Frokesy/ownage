import { mkdir, readFile, writeFile } from 'node:fs/promises'

async function readLocalEnv() {
  try {
    const file = await readFile('.env.local', 'utf8')
    return Object.fromEntries(
      file.split(/\r?\n/).filter((line) => line && !line.startsWith('#') && line.includes('='))
        .map((line) => {
          const separator = line.indexOf('=')
          return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')]
        }),
    )
  } catch {
    return {}
  }
}

const localEnv = await readLocalEnv()
const siteUrl = (process.env.VITE_SITE_URL || localEnv.VITE_SITE_URL || 'https://www.your-domain.com').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

await mkdir('public', { recursive: true })
await Promise.all([
  writeFile('public/robots.txt', robots),
  writeFile('public/sitemap.xml', sitemap),
])

console.log(`SEO files generated for ${siteUrl}`)
