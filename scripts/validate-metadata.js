// Checks page metadata: unique titles/descriptions, length bands
// (full rendered title <=65 chars, description 100-165), category
// site counts, site data shape, every site in at least one category,
// and no placeholder or internal-research text anywhere in the
// public registry, categories or FAQs.
import { STATIC_PAGES, publicPages, CATEGORIES, SITES, sitesByCategory } from "../frontend/src/config/pages.js";
import { SITE_STATS } from "../frontend/src/config/sites-data.js";
import { siteCategories } from "../frontend/src/config/categories.js";
import { HOME_FAQS, SITES_FAQS, BEST_FAQS, ABOUT_FAQS, CATEGORY_FAQS } from "../frontend/src/config/faqs.js";
import { SITE_NAME } from "../frontend/src/config/site.js";

let errors = 0;
const seen = new Map();

for (const [path, page] of Object.entries(STATIC_PAGES)) {
  const fullTitle = `${page.title} | ${SITE_NAME}`;
  for (const [field, val] of [["title", fullTitle], ["description", page.description]]) {
    const key = `${field}:${val}`;
    if (seen.has(key)) {
      console.error(`DUPLICATE ${field}: ${path} duplicates ${seen.get(key)}`);
      errors++;
    }
    seen.set(key, path);
  }
  if (fullTitle.length > 65) {
    console.error(`STATIC TITLE LENGTH ${fullTitle.length} (want <=65): ${path} — "${fullTitle}"`);
    errors++;
  }
  if (!page.description || page.description.length < 100 || page.description.length > 165) {
    console.error(`STATIC DESCRIPTION LENGTH ${page.description ? page.description.length : 0} (want 100-165): ${path}`);
    errors++;
  }
  if (!page.h1) {
    console.error(`MISSING h1: ${path}`);
    errors++;
  }
}

const paths = publicPages.map((p) => p.path);
const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
if (dupes.length) {
  console.error("DUPLICATE sitemap paths:", dupes);
  errors++;
}
for (const p of publicPages) {
  if (!STATIC_PAGES[p.path]) {
    console.error(`PUBLIC PAGE MISSING from STATIC_PAGES: ${p.path}`);
    errors++;
  }
}
if (paths.includes("/search")) {
  console.error("/search must NOT be in publicPages (not indexed)");
  errors++;
}
for (const bad of ["/tiers/", "/top-10", "/gaps", "/sources"]) {
  if (paths.some((p) => p === bad || p.startsWith(bad))) {
    console.error(`REMOVED ROUTE still public: ${bad}`);
    errors++;
  }
}

// Data shape checks.
if (!SITE_STATS || SITE_STATS.sites !== SITES.length) {
  console.error(`SITE_STATS.sites (${SITE_STATS ? SITE_STATS.sites : "missing"}) != SITES.length (${SITES.length})`);
  errors++;
}
if (CATEGORIES.length === 0) {
  console.error("NO CATEGORIES");
  errors++;
}
const names = SITES.map((s) => s.name);
const nameDupes = names.filter((n, i) => names.indexOf(n) !== i);
if (nameDupes.length) {
  console.error("DUPLICATE site names:", nameDupes);
  errors++;
}
for (const s of SITES) {
  for (const f of ["name", "url"]) {
    if (!s[f]) {
      console.error(`MISSING ${f} in site: ${s.name || "(no name)"}`);
      errors++;
    }
  }
  if (siteCategories(s).length === 0) {
    console.error(`SITE IN NO CATEGORY: ${s.name}`);
    errors++;
  }
}
for (const c of CATEGORIES) {
  if (sitesByCategory(c.id).length === 0) {
    console.error(`CATEGORY HAS NO SITES: ${c.id} (${c.name})`);
    errors++;
  }
}

// No internal-research wording in anything public: the registry,
// category copy or FAQs must never carry tier letters, findings,
// gaps or "top 10 additions" language. (The words may still live in
// sites-data.js and INTERNAL_RESEARCH_NOTES.md — those are not public.)
const publicBlob = JSON.stringify({
  STATIC_PAGES,
  CATEGORIES,
  faqs: { HOME_FAQS, SITES_FAQS, BEST_FAQS, ABOUT_FAQS, CATEGORY_FAQS }
});
for (const bad of ["Tier A", "Tier B", "Tier C", "Tier D", "Tier E", "Tier F", "Top 10 additions", "top-10", "/gaps", "/sources", "YOUR-DOMAIN", "Lorem", "TODO", "placeholder", "lorem ipsum", "scholar-jobs-hub", "ScholarJobs"]) {
  if (publicBlob.includes(bad)) {
    console.error(`FORBIDDEN / LEFTOVER TEXT "${bad}" in public registry/categories/faqs`);
    errors++;
  }
}

console.log(
  `metadata check: ${SITES.length} sites, ${CATEGORIES.length} categories, ${Object.keys(STATIC_PAGES).length} static pages, ${publicPages.length} public pages, ${errors} error(s).`
);
process.exit(errors ? 1 : 0);
