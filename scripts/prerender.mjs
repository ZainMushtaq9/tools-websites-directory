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
// home carries categories + best picks + all site links; /sites lists
// ALL sites with links; category pages list their sites; /best carries
// the ranked comparison. The React app still mounts normally in a
// browser (main.jsx uses createRoot, which replaces the static content).
// Running the script twice is safe: previously inserted tags are
// stripped before re-inserting.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "../frontend/src/config/site.js";
import {
  STATIC_PAGES,
  publicPages,
  CATEGORIES,
  sitesByCategory
} from "../frontend/src/config/pages.js";
import { SITES } from "../frontend/src/config/sites-data.js";
import { AVAILABLE_IMAGES, siteCategories } from "../frontend/src/config/categories.js";
import {
  pageMeta,
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
  webPageJsonLd
} from "../frontend/src/config/seo.js";
import { HOME_FAQS, SITES_FAQS, BEST_FAQS, ABOUT_FAQS, CATEGORY_FAQS } from "../frontend/src/config/faqs.js";

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const OG_ALT = "Tools Websites Directory — 76 free online tools websites";

// The five best picks, mirroring pages/Home.jsx and pages/Best.jsx.
const BEST_PICKS = [
  { name: "Omni Calculator", url: "https://omnicalculator.com", why: "Sab se bara catalogue — 3,938 tools, gehri wazahat aur formulas ke saath." },
  { name: "calculator.net", url: "https://calculator.net", why: "Tez aur simple — aam hisaab ke liye sab se zyada istemal hone wali site." },
  { name: "Calculator Soup", url: "https://calculatorsoup.com", why: "Maths aur statistics mein gehra — kai tools mein darmiyani steps bhi." },
  { name: "Inch Calculator", url: "https://inchcalculator.com", why: "Construction aur conversions mein sab se mazboot — 3,500+ tools." },
  { name: "MiniWebtool", url: "https://miniwebtool.com", why: "2,022 tools aur API — text, math aur finance aik hi jagah par." }
];

const RANKED_BEST = [
  { n: 1, name: "Omni Calculator", url: "https://omnicalculator.com", tools: "3,938 tools", why: "Sab se bara catalogue — Math 687, Finance 618, Physics 546, Health 440. Har tool par lambi wazahat aur formulas.", bestFor: "Gehri wazahat aur formulas" },
  { n: 2, name: "calculator.net", url: "https://calculator.net", tools: "~200 tools", why: "Tez aur simple — finance, health, maths, age aur date aik hi jagah par. Sab se zyada istemal hone wali calculator site.", bestFor: "Roz ke aam hisaab" },
  { n: 3, name: "Calculator Soup", url: "https://calculatorsoup.com", tools: "~480 tools", why: "Maths, statistics aur geometry mein gehra — kai tools mein darmiyani steps bhi dikhata hai, muft mein.", bestFor: "Maths aur steps" },
  { n: 4, name: "Inch Calculator", url: "https://inchcalculator.com", tools: "3,500+ tools", why: "Construction, electrical, conversions aur health — aur mobile apps bhi. Construction ke liye sab se mazboot site.", bestFor: "Construction aur conversions" },
  { n: 5, name: "MiniWebtool", url: "https://miniwebtool.com", tools: "2,022 tools", why: "Math, finance, text aur webmaster tools aik hi jagah par — aur 1,080 tools ki API bhi.", bestFor: "Har tarah ke tools aik jagah" }
];

function faqHtml(faqs) {
  return `<h2>Aam sawalat</h2>${(faqs || []).map((f) => `<div class="faq"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("")}`;
}

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
    .map((s) => {
      const cats = siteCategories(s)
        .map((id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id)
        .join(", ");
      return `<li><a href="${esc(s.url)}">${esc(s.name)}</a> — ${esc(s.focus || "")}${s.tools ? ` (${esc(s.tools)} tools)` : ""}${cats ? ` — ${esc(cats)}` : ""}</li>`;
    })
    .join("")}</ul>`;
}

// Links every prerendered page carries so a no-JavaScript crawler (or an
// AI agent with JS off) can reach every main section from any page. The
// React app replaces this static body on mount, so users never see it.
const NAV_LINKS = [
  { href: "/sites", label: "Sites" },
  { href: "/categories", label: "Categories" },
  { href: "/best", label: "Best" },
  { href: "/about", label: "About" },
  { href: "/search", label: "Search" }
];

function navHtml(extraLinks, base) {
  const links = [
    { href: "/", label: SITE_NAME },
    ...extraLinks,
    ...NAV_LINKS.filter((n) => !extraLinks.some((l) => l.href === n.href))
  ];
  return `<nav><p>${links
    .map((l) => `<a href="${esc(withBase(base, l.href))}">${esc(l.label)}</a>`)
    .join(" · ")}</p></nav>`;
}

// Category header image if the file exists, else a plain placeholder
// block (never a broken <img>). Mirrors pages/Category.jsx.
function categoryImageHtml(cat, base) {
  if (cat.image && AVAILABLE_IMAGES.has(cat.image) && existsSync(join(root, "frontend/public/images", cat.image))) {
    return `<img src="${esc(withBase(base, `/images/${cat.image}`))}" alt="${esc(cat.name)} — tools websites" width="1200" height="630" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:16px" />`;
  }
  return `<div role="img" aria-label="${esc(cat.name)} — tools websites" style="max-width:100%;height:180px;border-radius:8px;margin-bottom:16px;display:flex;align-items:center;justify-content:center;background:#eef2f5;color:#5a6b7a;font-size:20px;font-weight:600;text-align:center;padding:16px">${esc(cat.name)}</div>`;
}

// Returns { title, description, h1, lede, jsonLd, body } for a route,
// mirroring what the React page renders (SeoHead + H1 + content).
// `base` is the hosting subpath ("/" on Cloudflare Pages, the project
// subpath on GitHub Pages); every internal href goes through withBase.
function routeMeta(path, base) {
  // Category pages: /categories/<slug>
  if (path.startsWith("/categories/")) {
    const cat = CATEGORIES.find((c) => c.id === path.slice("/categories/".length));
    if (!cat) throw new Error(`unknown category route: ${path}`);
    const page = STATIC_PAGES[path];
    const sites = sitesByCategory(cat.id);
    const faqs = CATEGORY_FAQS[cat.id] || [];
    const idx = CATEGORIES.findIndex((c) => c.id === cat.id);
    const prev = idx > 0 ? CATEGORIES[idx - 1] : null;
    const next = idx >= 0 && idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : null;
    return {
      ...page,
      jsonLd: [
        webPageJsonLd({ title: page.title, description: page.description, path }),
        breadcrumbJsonLd(
          crumbsFor([
            ["Categories", "/categories"],
            [cat.name, path]
          ])
        ),
        itemListJsonLd(
          `${cat.name} — tools websites`,
          sites.map((s) => ({ name: s.name, url: s.url }))
        ),
        ...(faqs.length ? [faqJsonLd(faqs)] : [])
      ],
      body:
        categoryImageHtml(cat, base) +
        `<p><strong>Best pick:</strong> ${esc(cat.bestPick)}</p>` +
        `<p>${sites.length} sites — ${esc(cat.name)}</p>` +
        `<h2>${esc(cat.name)} ki sites</h2>` +
        siteLinkList(sites) +
        (faqs.length ? faqHtml(faqs) : "") +
        `<p>${prev ? `<a href="${esc(withBase(base, `/categories/${prev.id}`))}">← ${esc(prev.name)}</a> · ` : ""}<a href="${esc(withBase(base, "/categories"))}">Saari categories →</a> · <a href="${esc(withBase(base, "/sites"))}">Poori directory →</a>${next ? ` · <a href="${esc(withBase(base, `/categories/${next.id}`))}">${esc(next.name)} →</a>` : ""}</p>`,
      links: sites.map((s) => ({ href: s.url, label: s.name }))
    };
  }

  const page = STATIC_PAGES[path];
  if (!page) throw new Error(`no metadata for route: ${path}`);
  let body = "";
  let links = [];
  let jsonLd = [];

  if (path === "/") {
    body =
      `<img src="${esc(withBase(base, "/hero-poster.jpg"))}" alt="Tools Websites Directory — free online tools websites ki directory" style="max-width:100%;height:auto;border-radius:8px;margin-top:16px" />` +
      `<p>${SITES.length} sites · ${CATEGORIES.length} categories · ${BEST_PICKS.length} best picks · Free to browse</p>` +
      `<h2>Popular categories</h2><ul>${["math", "finance", "health", "pakistan", "construction", "units"]
        .map((id) => {
          const c = CATEGORIES.find((x) => x.id === id);
          return `<li><a href="${esc(withBase(base, `/categories/${c.id}`))}">${esc(c.name)}</a> — ${esc(c.short)} — ${sitesByCategory(c.id).length} sites</li>`;
        })
        .join("")}</ul>` +
      `<h2>Best sites — ek nazar mein</h2><ol>${BEST_PICKS
        .map((s) => `<li><a href="${esc(s.url)}">${esc(s.name)}</a> — ${esc(s.why)}</li>`)
        .join("")}</ol>` +
      `<h2>How to use this directory</h2><ol><li><strong>Search ya category choose karein</strong> — search karein ya apne kaam ki category kholein.</li><li><strong>Best pick se compare karein</strong> — har category page par best pick likha hai.</li><li><strong>Site kholein — free</strong> — card par “Visit” link se site khul jati hai; zyada tar sites free hain aur bina sign-up ke chalti hain.</li></ol>` +
      `<h2>Saari sites</h2>` +
      siteLinkList(SITES) +
      faqHtml(HOME_FAQS);
    links = [
      { href: "/sites", label: "Sites" },
      { href: "/categories", label: "Categories" },
      { href: "/best", label: "Best" },
      ...CATEGORIES.map((c) => ({ href: `/categories/${c.id}`, label: c.name })),
      ...SITES.map((s) => ({ href: s.url, label: s.name }))
    ];
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([])),
      faqJsonLd(HOME_FAQS)
    ];
  } else if (path === "/sites") {
    body =
      `<img src="${esc(withBase(base, "/images/sites.jpg"))}" alt="Free online tools websites ki poori directory" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:16px" />` +
      `<p>${SITES.length} sites — har site kya offer karti hai, kitne tools hain aur kis zabaan mein hai. Category aur size se filter karein ya naam se search karein.</p>` +
      `<h2>Poori directory</h2>` +
      siteLinkList(SITES) +
      faqHtml(SITES_FAQS);
    links = SITES.map((s) => ({ href: s.url, label: s.name }));
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Sites", "/sites"]])),
      itemListJsonLd(
        "Tools Websites Directory",
        SITES.map((s) => ({ name: s.name, url: s.url }))
      ),
      faqJsonLd(SITES_FAQS)
    ];
  } else if (path === "/categories") {
    body =
      `<img src="${esc(withBase(base, "/images/categories.jpg"))}" alt="Tools websites by category — maths, finance, health, Pakistan tools aur zyada" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:16px" />` +
      `<ul>${(CATEGORIES || [])
        .map(
          (c) =>
            `<li><a href="${esc(withBase(base, `/categories/${c.id}`))}">${esc(c.name)}</a> — ${esc(c.short)} — ${sitesByCategory(c.id).length} sites</li>`
        )
        .join("")}</ul>` +
      `<h2>Har kaam ke liye best site</h2><ul><li><strong>EMI / loan calculator:</strong> finance category mein sab se bara collection SumKitTool (145 finance tools) aur Toolsped (126) ka hai.</li><li><strong>Age calculator:</strong> calculator.net aur Omni Calculator — dono ke health sections mein age tools hain.</li><li><strong>Percentage calculator:</strong> calculator.net (percentage, fractions) aur Calculator Soup (maths, statistics).</li><li><strong>BMI calculator:</strong> calculator.net (fitness/health) aur Omni Calculator (Health — 440 tools).</li><li><strong>Tax calculator:</strong> US/UK tax ke liye Good Calculators; Pakistan tax ke liye <a href="${esc(withBase(base, "/categories/pakistan"))}">Pakistan Tools</a> ki sites.</li><li><strong>Construction calculator:</strong> Inch Calculator — is category mein sab se mazboot (math/science, construction, electrical).</li><li><strong>Zakat calculator:</strong> IslamicTool (live nisab) aur Ghulmil (Urdu).</li><li><strong>CGPA / MDCAT:</strong> PakDar (48+ tools).</li></ul>`;
    links = CATEGORIES.map((c) => ({ href: `/categories/${c.id}`, label: c.name }));
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Categories", "/categories"]])),
      itemListJsonLd(
        "Tools website categories",
        CATEGORIES.map((c) => ({ name: c.name, url: `${SITE_URL}/categories/${c.id}` }))
      )
    ];
  } else if (path === "/best") {
    body =
      `<img src="${esc(withBase(base, "/images/best.jpg"))}" alt="Best calculator websites — top sites ki comparison" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:16px" />` +
      `<h2>Best calculator websites — top 5</h2>${RANKED_BEST
        .map((s) => `<h3>${s.n}. <a href="${esc(s.url)}">${esc(s.name)}</a> — ${esc(s.tools)}</h3><p>${esc(s.why)}</p><p><strong>Best for:</strong> ${esc(s.bestFor)}</p>`)
        .join("")}` +
      `<h2>Best free calculator sites</h2><p>calculator.net, Omni Calculator, Calculator Soup, Inch Calculator aur Toolsped — paanchon free hain aur bina sign-up ke chalti hain. Steps ke liye paid sites (Wolfram Alpha, Symbolab, Mathway — ~$10/month) se behtar muft option Calculator Soup hai.</p>` +
      `<h2>calculator.net alternatives</h2><p>calculator.net ke best alternatives: Omni Calculator (sab se bara catalogue), Calculator Soup (maths aur steps) aur Inch Calculator (construction aur conversions). Teeno free hain.</p>` +
      `<h2>Omni Calculator alternatives</h2><p>Omni ke alternatives: calculator.net (tez aur simple), Calculator Soup (maths par gehra) aur MiniWebtool (2,022 tools + API).</p>` +
      `<h2>calculator.net vs Omni Calculator — which is better?</h2><p>Catalogue mein Omni aage hai (3,938 tools vs ~200), aur us ki wazahat aur formulas bhi gehri hain. calculator.net tez aur simple hai. Aam user ke liye calculator.net, research ke liye Omni.</p>` +
      `<h2>calculator.net vs Calculator Soup — which is better?</h2><p>calculator.net har tarah ke tools deta hai (finance, health, maths), jab ke Calculator Soup maths, statistics aur geometry mein gehra hai aur kai tools mein darmiyani steps bhi dikhata hai. Maths ke liye Soup, baaki sab ke liye calculator.net.</p>` +
      `<h2>Which calculator website is best?</h2><p>Koi aik site har kaam ke liye best nahi: aam hisaab ke liye calculator.net, gehri wazahat ke liye Omni Calculator, maths ke steps ke liye Calculator Soup, aur construction ke liye Inch Calculator.</p>` +
      faqHtml(BEST_FAQS);
    links = RANKED_BEST.map((s) => ({ href: s.url, label: s.name }));
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["Best", "/best"]])),
      itemListJsonLd(
        "Best calculator websites",
        RANKED_BEST.map((s) => ({ name: s.name, url: s.url }))
      ),
      faqJsonLd(BEST_FAQS)
    ];
  } else if (path === "/about") {
    body =
      `<h2>Yeh directory kya karti hai</h2><p>Tools Websites Directory ${SITES.length} free online tools websites ko aik hi jagah par rakhti hai. Har site ke liye likha hai ke woh kya offer karti hai, kitne tools hain, kis zabaan mein hai, aur kis kaam ke liye best hai.</p>` +
      `<h2>Sites kaise choose aur list hoti hain</h2><p>Har site ko us ke apne tools, focus aur language ke hisaab se list kiya jata hai. Koi site pay karke upar nahi aati. Best picks us site ke catalogue aur coverage par likhe jate hain. Tool counts sites ki apni ginti hain aur waqt ke saath badal sakti hain. Tax slabs, bijli tariff, nisab aur gold rates badalte rehte hain, is liye yeh directory live rates publish nahi karti — live figures hamesha us site par check karein jis ka link diya gaya hai.</p>` +
      `<h2>Kaun likhta hai</h2><p>By ${esc(AUTHOR_NAME)}.</p>` +
      faqHtml(ABOUT_FAQS);
    links = [{ href: "/sites", label: "Sites" }];
    jsonLd = [
      webPageJsonLd({ title: page.title, description: page.description, path }),
      breadcrumbJsonLd(crumbsFor([["About", "/about"]])),
      faqJsonLd(ABOUT_FAQS)
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
    html = html.replace(/<meta name="theme-color"[^>]*>\n?/g, "");
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
      `<meta name="theme-color" content="#1a5276" />\n` +
      `<meta property="og:type" content="website" />\n` +
      `<meta property="og:title" content="${esc(meta.title)}" />\n` +
      `<meta property="og:description" content="${esc(meta.description)}" />\n` +
      `<meta property="og:url" content="${esc(seo.canonical)}" />\n` +
      `<meta property="og:site_name" content="${esc(SITE_NAME)}" />\n` +
      `<meta property="og:image" content="${OG_IMAGE}" />\n` +
      `<meta property="og:image:width" content="2192" />\n` +
      `<meta property="og:image:height" content="1152" />\n` +
      `<meta property="og:image:alt" content="${esc(OG_ALT)}" />\n` +
      `<meta property="og:locale" content="ur_PK" />\n` +
      `<meta name="twitter:card" content="summary_large_image" />\n` +
      `<meta name="twitter:title" content="${esc(meta.title)}" />\n` +
      `<meta name="twitter:description" content="${esc(meta.description)}" />\n` +
      `<meta name="twitter:image" content="${OG_IMAGE}" />\n` +
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
