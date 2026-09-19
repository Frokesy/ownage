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
