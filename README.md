# Tools Websites Directory

**78 tools websites ka mukammal jaiza — tiers, top 10 additions, gaps aur categories, Roman Urdu mein.**

A research-based directory of online tools websites: every site is graded into a tier (A–F), with its tool count, focus and notes in one place, so readers can compare tools websites honestly before choosing one.

- **Live (Cloudflare Pages):** https://tools-websites-directory.pages.dev
- **Live (GitHub Pages):** https://zainmushtaq9.github.io/tools-websites-directory/
- **Research date:** 26 Nov 2026 · **Author:** Muhammad Zain Mushtaq

## What is inside

- **78 sites** in **6 tiers** — A: sab se badi sites · B: bare generalists aur solvers · C: "all tools" sites · D: Pakistan-specific sites · E: Islamic finance / life · F: agriculture / farmer tools
- **Top 10 additions** — naye tools websites jo directory mein shaamil karne chahiye, order ke saath
- **Gaps** — zabaan ka gap, Pakistan ka gap, features ka gap, earning models, khali niches
- **Categories** — har category mein sab se achhi coverage aur kamzor / ghayab jagah
- **Sources** — poori source list aur jo verify nahi hua, woh bhi khula likha hai
- **Search** — poori directory mein keyword search (client-side, no tracking)

No analytics, no ads, no signup. The site is a static React + Vite app; every public route is prerendered to real static HTML, so crawlers and no-JS readers see full content.

## Quick start

```bash
cd frontend
npm install
npm run dev      # local development
npm run build    # production build -> dist/ (also runs generate + prerender)
```

From the repo root:

```bash
npm run generate           # rebuild route-manifest, sitemap, llms.txt, feed
npm run validate:metadata  # unique titles/descriptions, FAQs, related links
npm run validate:links     # no broken internal links
npm run validate           # both validations
```

## Deploy

**Cloudflare Pages** (primary, live now) — build command `npm run build`, output directory `frontend/dist`. No `PAGES_BASE_PATH` is set, so the app serves from the root (`/`).

**GitHub Pages** (mirror) — `.github/workflows/deploy-pages.yml` builds with `PAGES_BASE_PATH=/tools-websites-directory/` and publishes `frontend/dist` via the official Pages actions on every push to `main`. The same source deploys to both hosts; the base path is the only difference. The workflow also copies `index.html` → `404.html` (SPA fallback for `/search` and any unknown route) and adds `.nojekyll`. This mirrors the `creator-toolbox` repo's Pages setup exactly.

Canonical URLs, sitemap and `robots.txt` point at the Cloudflare Pages URL on both hosts — Cloudflare is the canonical host; GitHub Pages is a mirror.

## Structure

```
tools-websites-directory/
  frontend/   # React 18 + Vite app (src/pages, components, config/, public/)
  scripts/    # build-route-manifest, generate-sitemap, generate-llms,
              # generate-feed, validate-links, validate-metadata, prerender
  .github/workflows/deploy-pages.yml   # GitHub Pages deploy
```

## Honesty note

Kuch details verify nahi hui hain aur kuch figures estimates hain — yeh baat site par khuli likhi hai (Sources page). Har site ko khud check karein.
