// Checks page metadata: unique titles/descriptions, length bands
// (full rendered title <=65 chars, description 100-165), tier site
// counts, site data shape, and no placeholder text anywhere in the
// registry or data.
import { STATIC_PAGES, publicPages, TIERS, SITES, sitesByTier } from "../frontend/src/config/pages.js";
import { SITE_STATS, FINDINGS, TOP10, CATEGORY_ROWS, FEATURE_GAPS, EARNING_MODELS, EMPTY_NICHES, GAP_TEXT, SOURCES, DISCLAIMER, NOT_VERIFIED } from "../frontend/src/config/sites-data.js";
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

// Data shape checks.
if (!SITE_STATS || SITE_STATS.sites !== SITES.length) {
  console.error(`SITE_STATS.sites (${SITE_STATS ? SITE_STATS.sites : "missing"}) != SITES.length (${SITES.length})`);
  errors++;
}
if (SITE_STATS && SITE_STATS.tiers !== TIERS.length) {
  console.error(`SITE_STATS.tiers (${SITE_STATS.tiers}) != TIERS.length (${TIERS.length})`);
  errors++;
}
for (const t of TIERS) {
  if (sitesByTier(t.id).length === 0) {
    console.error(`TIER HAS NO SITES: ${t.id} (${t.name})`);
    errors++;
  }
  if (!t.takeaway) {
    console.error(`TIER MISSING takeaway: ${t.id}`);
    errors++;
  }
}
const names = SITES.map((s) => s.name);
const nameDupes = names.filter((n, i) => names.indexOf(n) !== i);
if (nameDupes.length) {
  console.error("DUPLICATE site names:", nameDupes);
  errors++;
}
for (const s of SITES) {
  for (const f of ["name", "url", "tier"]) {
    if (!s[f]) {
      console.error(`MISSING ${f} in site: ${s.name || "(no name)"}`);
      errors++;
    }
  }
}
if ((FINDINGS || []).length !== 3) {
  console.error(`FINDINGS count ${(FINDINGS || []).length} (want 3)`);
  errors++;
}
if ((TOP10 || []).length !== 10) {
  console.error(`TOP10 count ${(TOP10 || []).length} (want 10)`);
  errors++;
}
for (const [label, arr] of [["CATEGORY_ROWS", CATEGORY_ROWS], ["FEATURE_GAPS", FEATURE_GAPS], ["EARNING_MODELS", EARNING_MODELS], ["EMPTY_NICHES", EMPTY_NICHES], ["SOURCES", SOURCES]]) {
  if (!arr || !arr.length) {
    console.error(`EMPTY ${label}`);
    errors++;
  }
}
for (const [label, v] of [["GAP_TEXT.language", GAP_TEXT && GAP_TEXT.language], ["GAP_TEXT.pakistan", GAP_TEXT && GAP_TEXT.pakistan], ["GAP_TEXT.features", GAP_TEXT && GAP_TEXT.features], ["DISCLAIMER", DISCLAIMER], ["NOT_VERIFIED", NOT_VERIFIED]]) {
  if (!v) {
    console.error(`MISSING ${label}`);
    errors++;
  }
}
const blob = JSON.stringify({ SITES, TIERS, FINDINGS, TOP10, STATIC_PAGES });
for (const bad of ["YOUR-DOMAIN", "Lorem", "TODO", "placeholder", "lorem ipsum", "scholar-jobs-hub", "ScholarJobs"]) {
  if (blob.includes(bad)) {
    console.error(`PLACEHOLDER / LEFTOVER TEXT "${bad}" in registry/data`);
    errors++;
  }
}

console.log(
  `metadata check: ${SITES.length} sites, ${TIERS.length} tiers, ${Object.keys(STATIC_PAGES).length} static pages, ${publicPages.length} public pages, ${errors} error(s).`
);
process.exit(errors ? 1 : 0);
