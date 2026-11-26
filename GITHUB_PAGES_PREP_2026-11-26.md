# GitHub Pages prep — Tools Websites Directory (26 Nov 2026)

Prepared, NOT pushed. The repo `ZainMushtaq9/tools-websites-directory` does not exist yet — the parent is creating it in the browser.

## What creator-toolbox does (mirrored)

- Repo `ZainMushtaq9/creator-toolbox`, live at `zainmushtaq9.github.io/creator-toolbox`.
- Deploy mechanism: GitHub Actions workflow `.github/workflows/deploy-pages.yml` (push to `main` + manual dispatch) → `actions/checkout`, Node 22, `npm ci`, tests, `vite build` with `PAGES_BASE_PATH=/creator-toolbox/`, prerender, `cp dist/index.html dist/404.html` + `touch dist/.nojekyll`, `actions/upload-pages-artifact` (path `frontend/dist`), `actions/deploy-pages@v4`. Permissions: `contents: read`, `pages: write`, `id-token: write`.
- `frontend/vite.config.js`: `base: process.env.PAGES_BASE_PATH || "/"` — root base for local/Cloudflare, subpath base only on Pages.
- Router: `<BrowserRouter basename={import.meta.env.BASE_URL}>` so all `<Link>`/`navigate` calls follow the base automatically.
- Prerender detects the base from the built `dist/index.html` JS path and prefixes every internal link in the static HTML via `withBase()`.
- No `gh-pages` branch, no `docs/` folder deploy — artifact-based Pages deploy.

## Files prepared / changed in `~/workspace/tools-websites-directory/`

| File | Change |
|---|---|
| `.github/workflows/deploy-pages.yml` | NEW — adapted from creator-toolbox (no backend steps; runs `npm run validate` instead of tests; `PAGES_BASE_PATH=/tools-websites-directory/`; Node 22; triggers on push to `main`) |
| `README.md` | NEW — site description, 78 sites / 6 tiers, Roman Urdu, both live URLs, build + deploy notes |
| `.gitignore` | NEW — mirrors creator-toolbox (`node_modules/`, `dist/`, `.wrangler/`, `.env`, logs) |
| `frontend/vite.config.js` | `base: process.env.PAGES_BASE_PATH \|\| "/"` (was hardcoded `"/"`) |
| `frontend/src/App.jsx` | `<BrowserRouter basename={import.meta.env.BASE_URL}>` (was no basename — this was the critical fix; without it every route 404s under the subpath) |
| `frontend/src/components/Footer.jsx` | RSS feed link now uses `import.meta.env.BASE_URL` (was root-absolute `/feed.xml`) |
| `frontend/src/components/ErrorBoundary.jsx` | "Go to the homepage" link now uses `import.meta.env.BASE_URL` (was `/`) |
| `scripts/prerender.mjs` | NEW `withBase()` + base detection from built `dist/index.html` (mirrors creator-toolbox); all internal links in prerendered static HTML (nav, tier links, `/top-10`) now carry the subpath; log line reports the base |

Deliberately UNCHANGED: `frontend/src/config/site.js` (`SITE_URL` stays `https://tools-websites-directory.pages.dev`) — canonicals, sitemap and `robots.txt` keep pointing at Cloudflare Pages as the canonical host; GitHub Pages is a mirror. `frontend/public/_redirects` stays — it is Cloudflare-only and GitHub Pages ignores it harmlessly.

## Verification done locally (26 Nov 2026, no deploy)

- **GitHub Pages variant** (separate output `frontend/dist-ghpages`, since deleted): `PAGES_BASE_PATH=/tools-websites-directory/ vite build` + prerender → 13 routes → 25 files, base detected `/tools-websites-directory/`. Asset paths (`/tools-websites-directory/assets/…`, favicon), all prerendered nav/body links prefixed; zero root-absolute internal links left. `404.html` identical to `index.html`, `.nojekyll` present.
- **Cloudflare variant** (normal `npm --prefix frontend run build`): base `/` confirmed, prerender base `/`, `validate` passes (13 pages, 78 sites, 0 broken links). Cloudflare build unaffected — `PAGES_BASE_PATH` unset means base stays `/`.
- **Push tooling:** `gh` CLI 2.102.0 present, authenticated as `ZainMushtaq9` (HTTPS). `git` 2.43.0, Node v24.22.1. No `.git` in the project yet (correct — repo not created).

## How the deploy will work once the repo exists

1. Parent creates the repo `ZainMushtaq9/tools-websites-directory` in the browser (public, default branch `main`).
2. Parent runs (from `~/workspace/tools-websites-directory`):
   ```bash
   git init -b main
   git add -A
   git commit -m "Tools Websites Directory — 78-site directory, GitHub Pages ready"
   git remote add origin https://github.com/ZainMushtaq9/tools-websites-directory.git
   git push -u origin main
   ```
   (`gh` auth already handles HTTPS credentials; no token needed. Alternative: `gh repo create ZainMushtaq9/tools-websites-directory --public --source=. --remote=origin --push` — NOT used, repo is being created in the browser.)
3. On first push, the `deploy-pages.yml` workflow runs automatically (or via Actions → Run workflow).
4. **Pages settings to enable (one-time, in repo Settings → Pages):** Source = **GitHub Actions** (not "Deploy from a branch"). If the workflow's first run asks to approve the `github-pages` environment, approve it. No custom domain, no secrets needed.
5. Site goes live at https://zainmushtaq9.github.io/tools-websites-directory/ — every later push to `main` redeploys automatically.

## Risks / gotchas

- **Branch name must be `main`.** The workflow triggers only on `main`. (Note: creator-toolbox's local checkout is on `master` while its remote default is `main` — the workflow only fires from `main`.) If the browser-created repo defaults to another branch, either rename it to `main` or change the workflow trigger to match.
- **`/search` is SPA-only** (intentionally not prerendered/indexed). It works on GitHub Pages only because `404.html` is a copy of the app shell — the workflow step that creates it is essential; do not remove it.
- **Canonical host stays Cloudflare.** Google will see the GitHub Pages copy's canonicals pointing at `tools-websites-directory.pages.dev` — intended, so the Pages copy does not compete in search.
- **`_redirects` does nothing on GitHub Pages** — the `404.html` fallback replaces it there.
- **No secrets/keys involved.** The workflow needs only the built-in `GITHUB_TOKEN` Pages permissions.
