# Dawnwalker Planner

Unofficial fan site: 30-day / 480 AP planner for The Blood of Dawnwalker.

Domain: https://dawnwalkerplanner.org

## Routes

- / — home
- /planner — interactive planner
- /time-costs — AP catalog
- /beginner — tips
- /builds — templates
- /faq — FAQ
- /disclaimer — legal

## Local development

```bash
npm install
npm run dev
```

Preview in the Cloudflare Workers runtime:

```bash
npm run preview
```

## Deploy to Cloudflare Workers

1. Log in to Cloudflare (once):

```bash
npx wrangler login
```

2. Deploy:

```bash
npm run deploy
```

This runs `opennextjs-cloudflare build` then `opennextjs-cloudflare deploy`.

3. Attach the custom domain in the Cloudflare dashboard:
   - Workers & Pages -> **dawnwalkerplanner** -> Settings -> Domains & Routes
   - Add custom domain: `dawnwalkerplanner.org` (and optionally `www.dawnwalkerplanner.org`)
   - Point DNS for `dawnwalkerplanner.org` to Cloudflare if it is not already.

Optional env: set `NEXT_PUBLIC_SITE_URL=https://dawnwalkerplanner.org` in Workers build variables / secrets if you use Workers Builds.

Useful scripts:

- `npm run build` — Next.js build only
- `npm run preview` — build + local Workers preview
- `npm run deploy` — build + deploy to Cloudflare
- `npm run upload` — build + upload a new Worker version
- `npm run cf-typegen` — generate `cloudflare-env.d.ts`

## Legal

Not affiliated with Rebel Wolves / Bandai Namco / The Blood of Dawnwalker (TM).
Estimated data. Spoilers collapsed. No cheats.
