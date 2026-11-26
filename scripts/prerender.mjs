// Prerender static HTML for every public route, so the static host
// (Cloudflare Pages) serves HTTP 200 with route-correct SEO and real
// content instead of an empty SPA shell.
//
// Run after `vite build` (the frontend `build` script chains it):
//   npm --prefix frontend run prerender
// or directly: node scripts/prerender.mjs [outDir]
//   outDir defaults to frontend/dist.
//
// For each route in frontend/public/route-manifest.json (the same list
// the sitemap is generated from) it writes:
//   <outDir>/<route>/index.html   — the directory index
//   <outDir>/<route>.html         — a twin so the exact extensionless
//                                   sitemap URL also returns 200 directly
// Route "/" overwrites <outDir>/index.html in place. Both files are the
// built shell with route-correct <title>, meta description, canonical,
// OG + Twitter tags and JSON-LD, plus real static content inside #root:
// home carries findings + tier links + site links; /sites lists ALL
// sites with links; tier pages list their sites; static pages carry
// their content. The React app still mounts normally in a browser
// (main.jsx uses createRoot, which replaces the static content).
// Running the script twice is safe: previously inserted tags are
// stripped before re-inserting.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "../frontend/src/config/site.js";
import {
  STATIC_PAGES,
  publicPages,
  TIERS,
  getTier,
  sitesByTier
} from "../frontend/src/config/pages.js";
import {
  SITES,
  SITE_STATS,
  FINDINGS,
  TOP10,
  CATEGORY_ROWS,
  FEATURE_GAPS,
  EARNING_MODELS,
  EMPTY_NICHES,
  GAP_TEXT,
  SOURCES,
  DISCLAIMER,
  NOT_VERIFIED
} from "../frontend/src/config/sites-data.js";
import {
  pageMeta,
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
  webPageJsonLd,
  websiteJsonLd,
  organizationJsonLd
} from "../frontend/src/config/seo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(process.argv[2] || join(root, "frontend/dist"));

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// base "/tools-websites-directory/" + "/sites" -> "/tools-websites-directory/sites";
// base "/" + "/sites" -> "/sites". Mirrors creator-toolbox: internal links
// in the prerendered static HTML must carry the Pages subpath, or they
// point at the domain root (zainmushtaq9.github.io/...) and 404.
function withBase(base, path) {
  return `${base.replace(/\/$/, "")}${path}`;
}

function crumbsFor(names) {
  const items = [{ name: "Home", path: "/" }];
  for (const [name, p] of names) items.push({ name, path: p });
  return items;
}

function siteLinkList(sites) {
  return `<ul>${sites
    .map(
      (s) =>
        `<li><a href="${esc(s.url)}">${esc(s.name)}</a> — ${esc(s.focus || "")}${s.tools ? ` (${esc(s.tools)} tools)` : ""}${s.notes ? ` — ${esc(s.notes)}` : ""}</li>`
    )
    .join("")}</ul>`;
}

// Links every prerendered page carries so a no-JavaScript crawler (or an
// AI agent with JS off) can reach every main section from any page. The
// React app replaces this static body on mount, so users never see it.
const NAV_LINKS = [
  { href: "/sites", label: "Sites" },
  { href: "/top-10", label: "Top 10" },
  { href: "/gaps", label: "Gaps" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/sources", label: "Sources" },
  { href: "/search", label: "Search" }
];

function navHtml(extraLinks, base) {
  const links = [
    { href: "/", label: SITE_NAME },
    ...extraLinks,
    ...NAV_LINKS.filter((n) => !extraLinks.some((l) => l.href === n.href)),
    ...(TIERS || []).map((t) => ({ href: `/tiers/${t.id}`, label: `Tier ${t.letter}` }))
  ];
  return `<nav><p>${links
    .map((l) => `<a href="${esc(withBase(base, l.href))}">${esc(l.label)}</a>`)
    .join(" · ")}</p></nav>`;
}

// Returns { title, description, h1, lede, jsonLd, body } for a route,
// mirroring what the React page renders (SeoHead + H1 + content).
// `base` is the hosting subpath ("/" on Cloudflare Pages, the project
// subpath on GitHub Pages); every internal href goes through withBase.
function routeMeta(path, base) {
  // Tier pages: /tiers/<id>
  if (path.startsWith("/tiers/")) {
    const tier = getTier(path.slice("/tiers/".length));
    if (!tier) throw new Error(`unknown tier route: ${path}`);
    const page = STATIC_PAGES[path];
    const sites = sitesByTier(tier.id);
    return {
      ...page,
      jsonLd: [
        webPageJsonLd({ title: page.title, description: page.description, path }),
        breadcrumbJsonLd(
          crumbsFor([
            ["Sites", "/sites"],
            [`Tier ${tier.letter}`, path]
          ])
        ),
        itemListJsonLd(
          `Tier ${tier.letter} — ${tier.name}`,
          sites.map((s) => ({ name: s.name, url: s.url }))
        )
      ],
      body:
        `<p><strong>Takeaway:</strong> ${esc(tier.takeaway)}</p>` +
        `<p>${sites.length} sites — Tier ${tier.letter}</p>` +
        siteLinkList(sites),
      links: sites.map((s) => ({ href: s.url, label: s.name }))
    };
  }

  const page = STATIC_PAGES[path];
  if (!page) throw new Error(`no metadata for route: ${path}`);
  let body = "";
  let links = [];
  let jsonLd = [];

  if (path === "/") {
    const stats = SITE_STATS || {};
    body =
      `<p>${stats.sites || SITES.length} sites · ${stats.entries || ""} entries · ${stats.tiers || 6} tiers · Research: ${esc(stats.researchDate || "26 Nov 2026")}</p>` +
      `<h2>Teen bade findings</h2>${(FINDINGS || [])
        .map((f) => `<h3>${f.n}. ${esc(f.title)}</h3><p>${esc(f.text)}</p>`)
        .join("")}` +
      `<h2>Top 10 additions</h2><ol>${(TOP10 || [])
        .map((t) => `<li><a href="${esc(withBase(base, "/top-10"))}">${esc(t.title)}</a></li>`)
        .join("")}</ol>` +
      `<h2>Tiers — A se F tak</h2><ul>${(TIERS || [])
        .map(
          (t) =>
            `<li><a href="${esc(withBase(base, `/tiers/${t.id}`))}">Tier ${t.letter} — ${esc(t.name)}</a> — ${sitesByTier(t.id).length} sites</li>`
        )
        .join("")}</ul>` +
      `<h2>Saari sites</h2>` +
      siteLinkList(SITES);
    links = [
      { href: "/sites", label: "Sites" },
      { href: "/top-10", label: "Top 10" },
      ...(TIERS || []).map((t) => ({ href: `/tiers/${t.id}`, label: `Tier ${t.letter}` })),
      ...SITES.map((s) => ({ href: s.url, label: s.name }))
    ];
    jsonLd = [websiteJsonLd(), organizationJsonLd()];
  } else if (path === "/sites") {
    body =
      `<p>${SITES.length} sites — har site ka tier, tools ki tadaad, focus aur notes.</p>` +
      siteLinkList(SITES);
    links = SITES.map((s) => ({ href: s.url, label: s.name }));
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Sites", "/sites"]])),
      itemListJsonLd(
        "Tools Websites Directory",
        SITES.map((s) => ({ name: s.name, url: s.url }))
      )
    ];
  } else if (path === "/top-10") {
    body =
      (TOP10 || [])
        .map((t) => `<h2>${t.n}. ${esc(t.title)}</h2><p>${esc(t.text)}</p>`)
        .join("") +
      `<p><strong>Order yaad rakho:</strong> pehle zabaan, phir jagah, phir features.</p>`;
    links = [{ href: "/gaps", label: "Gaps" }];
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Top 10", "/top-10"]]))
    ];
  } else if (path === "/gaps") {
    const gap = GAP_TEXT || {};
    body =
      `<h2>Zabaan ka gap</h2><p>${esc(gap.language || "")}</p>` +
      `<h2>Pakistan ka gap</h2><p>${esc(gap.pakistan || "")}</p>` +
      `<h2>Features ka gap</h2><p>${esc(gap.features || "")}</p>` +
      `<h2>Feature gaps — table</h2><table><thead><tr><th>Feature</th><th>Status</th></tr></thead><tbody>${(FEATURE_GAPS || [])
        .map((f) => `<tr><td>${esc(f.feature)}</td><td>${esc(f.status)}</td></tr>`)
        .join("")}</tbody></table>` +
      `<h2>Earning models</h2>${(EARNING_MODELS || [])
        .map((m) => `<h3>${esc(m.model)}</h3><p>${esc(m.detail)}</p>`)
        .join("")}` +
      `<h2>Khali niches</h2><ul>${(EMPTY_NICHES || [])
        .map((n) => `<li><strong>${esc(n.niche)}:</strong> ${esc(n.detail)}</li>`)
        .join("")}</ul>` +
      `<p><strong>Race ab tadaad ki nahi — race zabaan, jagah aur bharose ki hai.</strong></p>`;
    links = [{ href: "/top-10", label: "Top 10" }];
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Gaps", "/gaps"]]))
    ];
  } else if (path === "/categories") {
    body =
      `<table><thead><tr><th>Category</th><th>Sab se achhi coverage</th><th>Kamzor / Ghayab</th></tr></thead><tbody>${(CATEGORY_ROWS || [])
        .map(
          (r) =>
            `<tr><td><strong>${esc(r.category)}</strong></td><td>${esc(r.strong)}</td><td>${esc(r.weak)}</td></tr>`
        )
        .join("")}</tbody></table>`;
    links = [{ href: "/sites", label: "Sites" }];
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Categories", "/categories"]]))
    ];
  } else if (path === "/about") {
    body =
      `<p><strong>Disclaimer:</strong> ${esc(DISCLAIMER)}</p>` +
      `<h2>Tiers kaise kaam karte hain</h2><ul>${(TIERS || [])
        .map(
          (t) =>
            `<li><a href="${esc(withBase(base, `/tiers/${t.id}`))}">Tier ${t.letter} — ${esc(t.name)}</a>: ${esc(t.takeaway)}</li>`
        )
        .join("")}</ul>` +
      `<h2>Kaun likhta hai</h2><p>By ${esc(AUTHOR_NAME)}.</p>`;
    links = (TIERS || []).map((t) => ({ href: `/tiers/${t.id}`, label: `Tier ${t.letter}` }));
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["About", "/about"]])),
      faqJsonLd([
        {
          q: "Yeh directory kya hai?",
          a: "Yeh 60+ tools websites ka aik jaiza hai — har site ka tier, tools ki tadaad, focus aur notes, Roman Urdu mein, aik hi jagah par."
        },
        {
          q: "Tiers kaise kaam karte hain?",
          a: "Har site Tier A se F tak aik tier mein hai: A sab se badi sites, B bare generalists aur solvers, C 'all tools' sites, D Pakistan-specific sites, E Islamic finance/life, aur F agriculture/farmer tools."
        },
        {
          q: "Kya yeh saari maloomat verify hain?",
          a: "Nahi — kuch details verify nahi hui hain aur kuch figures estimates hain. Har site ko khud check karein; Sources page par poori tafseel hai."
        }
      ])
    ];
  } else if (path === "/sources") {
    body =
      `<h2>Sources</h2><ul>${(SOURCES || [])
        .map((s) => `<li>${esc(s)}</li>`)
        .join("")}</ul>` +
      `<h2>Jo verify nahi hua</h2><p>${esc(NOT_VERIFIED)}</p>` +
      `<h2>Disclaimer</h2><p>${esc(DISCLAIMER)}</p>`;
    links = [{ href: "/about", label: "About" }];
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Sources", "/sources"]]))
    ];
  } else {
    links = [{ href: "/sites", label: "Sites" }];
    jsonLd = [breadcrumbJsonLd(crumbsFor([[page.h1, path]]))];
  }
  return { ...page, jsonLd, body, links };
}

function main() {
  const templatePath = join(outDir, "index.html");
  if (!existsSync(templatePath)) {
    console.error(`template not found: ${templatePath} — run vite build first`);
    process.exit(1);
  }
  const template = readFileSync(templatePath, "utf8");
  if (!/<div id="root">/.test(template) || !/<title>/.test(template)) {
    console.error(`template ${templatePath} does not look like the built shell (no <div id="root"> or <title>)`);
    process.exit(1);
  }

  // Asset base: detected from the built JS path (e.g. /tools-websites-directory/assets/…),
  // falling back to $PAGES_BASE_PATH, then "/". Mirrors creator-toolbox.
  const assetMatch = template.match(/src="([^"]*)\/assets\/[^"]*\.js"/);
  const base = assetMatch
    ? assetMatch[1] === ""
      ? "/"
      : `${assetMatch[1]}/`
    : process.env.PAGES_BASE_PATH || "/";

  // Route list: the same registry the sitemap is generated from.
  const manifest = JSON.parse(
    readFileSync(join(root, "frontend/public/route-manifest.json"), "utf8")
  );
  const routes = manifest.pages;
  if (!Array.isArray(routes) || routes.length === 0) {
    console.error("route-manifest.json has no pages");
    process.exit(1);
  }
  // Cross-check against the sitemap so a drifted sitemap cannot silently
  // leave a listed URL without a static file.
  const sitemap = readFileSync(join(root, "frontend/public/sitemap.xml"), "utf8");
  const sitemapPaths = [...sitemap.matchAll(/<loc>[^<]*<\/loc>/g)].map(
    (m) => m[0].replace(/<\/?loc>/g, "").replace(SITE_URL, "") || "/"
  );
  const missing = sitemapPaths.filter((p) => !routes.includes(p));
  if (missing.length) {
    console.error(`sitemap lists ${missing.length} URL(s) not in route-manifest.json: ${missing.join(", ")}`);
    process.exit(1);
  }

  let written = 0;
  for (const path of routes) {
    const meta = routeMeta(path, base);
    const seo = pageMeta({ title: meta.title, description: meta.description, path });
    const staticBody =
      `<main class="container section"><h1>${esc(meta.h1)}</h1>` +
      `<p class="lede">${esc(meta.lede)}</p>` +
      (meta.body || "") +
      navHtml(meta.links, base) +
      `</main>`;

    let html = template;
    // Strip tags a previous prerender run inserted (idempotent re-runs).
    html = html.replace(/<!-- prerendered: route [^>]*-->\n?/g, "");
    html = html.replace(/<link rel="canonical"[^>]*>\n?/g, "");
    html = html.replace(/<meta name="robots"[^>]*>\n?/g, "");
    html = html.replace(/<meta property="og:[^>]*>\n?/g, "");
    html = html.replace(/<meta name="twitter:[^>]*>\n?/g, "");
    html = html.replace(
      /<script type="application\/ld\+json" data-prerender="1">[\s\S]*?<\/script>\n?/g,
      ""
    );
    // Title + meta description (mirror SeoHead/pageMeta).
    if (!/<title>[\s\S]*?<\/title>/.test(html)) {
      console.error(`template has no <title> to replace (route ${path})`);
      process.exit(1);
    }
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
    if (!/<meta name="description"/.test(html)) {
      console.error(`template has no meta description to replace (route ${path})`);
      process.exit(1);
    }
    html = html.replace(
      /<meta name="description" content=".*?"[^>]*>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    );
    // Canonical, robots, OG + Twitter tags + JSON-LD before </head>.
    const jsonLdBlock =
      meta.jsonLd && meta.jsonLd.length
        ? `<script type="application/ld+json" data-prerender="1">${JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c")}</script>\n`
        : "";
    const headBlock =
      `<!-- prerendered: route ${path} -->\n` +
      `<link rel="canonical" href="${esc(seo.canonical)}" />\n` +
      `<meta name="robots" content="index,follow" />\n` +
      `<meta property="og:type" content="website" />\n` +
      `<meta property="og:title" content="${esc(meta.title)}" />\n` +
      `<meta property="og:description" content="${esc(meta.description)}" />\n` +
      `<meta property="og:url" content="${esc(seo.canonical)}" />\n` +
      `<meta property="og:site_name" content="${esc(SITE_NAME)}" />\n` +
      `<meta name="twitter:card" content="summary" />\n` +
      `<meta name="twitter:title" content="${esc(meta.title)}" />\n` +
      `<meta name="twitter:description" content="${esc(meta.description)}" />\n` +
      jsonLdBlock;
    if (!/<\/head>/.test(html)) {
      console.error(`template has no </head> (route ${path})`);
      process.exit(1);
    }
    html = html.replace("</head>", `${headBlock}</head>`);
    // Static content inside #root (createRoot replaces it on mount).
    if (!/<div id="root">[\s\S]*?<\/div>/.test(html)) {
      console.error(`template has no <div id="root">...</div> to replace (route ${path})`);
      process.exit(1);
    }
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticBody}</div>`);

    if (path === "/") {
      writeFileSync(templatePath, html);
      written++;
      continue;
    }
    // Directory index + extensionless twin (see header comment).
    const dir = join(outDir, path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
    written++;
    writeFileSync(join(outDir, `${path.slice(1)}.html`), html);
    written++;
  }
  console.log(`prerendered ${routes.length} routes -> ${written} files in ${outDir} (base ${base})`);
}

main();
