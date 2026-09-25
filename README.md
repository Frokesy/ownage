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

### Editing the rest of the website

Create one **Site settings** document for the logo, company details, navigation, footer columns, and social links. Then create one **Website page** document for each page option. The website preserves its built-in content whenever a document or field has not been published yet.

Use these exact section keys so each editable section is placed in its existing layout:

| Page | Section keys |
| --- | --- |
| Home | `whoWeAre`, `services`, `whyOwnage`, `experts`, `testimonials`, `latestNews`, `cta` |
| About | `intro`, `principles`, `story`, `leadership` |
| Projects | `properties` |
| Careers | `propertyGallery`, `skills`, `journeyGallery`, `opportunity`, `startJourney` |
| Realtor application | `howItWorks`, `application` |
| Contact | `intro`, `interestOptions`, `budgetOptions` |

For repeatable entries, use **Cards / entries / options**. The same structured item editor adapts to properties, team members, testimonials, feature cards, select options, and footer-style links. Images uploaded in Studio are served from Sanity's image CDN, while local images remain as fallbacks.

## Form email delivery

The contact and realtor application forms post to the included Node server, which sends mail directly through your SMTP account. Copy the dummy settings from `.env.example` into `.env.local` and replace them with the owner's mail-server details:

```env
APP_ORIGIN=http://localhost:5173
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=website@example.com
SMTP_PASSWORD=replace-with-smtp-password
SMTP_FROM="Ownage Website <website@example.com>"
CONTACT_FORM_EMAIL=contact@example.com
REALTOR_FORM_EMAIL=careers@example.com
```

For local development, run the frontend and mail server in separate terminals:

```bash
npm run dev:server
npm run dev
```

Run `npm run build && npm start` in production. The server hosts the built SPA and both form endpoints. `CONTACT_FORM_EMAIL` and `REALTOR_FORM_EMAIL` intentionally point to different inboxes. SMTP credentials are server-only—never rename them with a `VITE_` prefix or commit `.env.local`.

## Production route refreshes

The Node production server falls back to `dist/index.html` for client-side routes such as `/blog` and `/project`. `public/_redirects` provides the equivalent fallback on Netlify-compatible hosts, while `vercel.json` supplies it on Vercel. If another static host is used, configure its unknown-route fallback or rewrite to `/index.html`; a redirect response is not sufficient.
