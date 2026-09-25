# Estate management website

A Vite-powered React + TypeScript website with Tailwind CSS and production-oriented SEO basics.

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Update `.env.local` with the real company name, contact details, and production URL. The URL must include `https://` and should not end in a slash.

## SEO and crawlers

`npm run build` regenerates `public/robots.txt` and `public/sitemap.xml` from `VITE_SITE_URL`. The page also includes a canonical URL, index/follow crawler policy, Open Graph metadata, and `RealEstateAgent` JSON-LD structured data.

Before launch, replace `public/og-image.svg` with a branded 1200×630 social image if available, then submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Sanity blog CMS

The website reads published blog posts from Sanity and falls back to `src/data/blog.ts` when Sanity is not configured, unavailable, or still empty.

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `studio/.env.example` to `studio/.env`, then add the project ID.
3. Add the same project ID to the root `.env.local` as `VITE_SANITY_PROJECT_ID`.
4. Install the Studio dependencies with `npm --prefix studio install`.
5. Start the editor with `npm run studio:dev`, create an author, and publish blog posts.

If the website and Studio run on different domains, add the website origin under **API > CORS origins** in the Sanity project settings. Keep `VITE_SANITY_DATASET=production` and `SANITY_STUDIO_DATASET=production` in sync.

Deploy the owner-facing editor with `npm run studio:deploy`. The public website only uses unauthenticated, read-only queries; do not add a Sanity write token to any `VITE_` environment variable.
