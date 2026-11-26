// Checks internal links in the route manifest: every public path
// referenced by the registry must exist in publicPages, every
// category route must exist, and every site URL in the data must be
// a valid https URL.
import { publicPages, CATEGORIES, SITES, sitesByCategory } from "../frontend/src/config/pages.js";

const pages = new Set(publicPages.map((p) => p.path));
let errors = 0;
const check = (from, path) => {
  if (!pages.has(path)) {
    console.error(`BROKEN LINK from ${from}: ${path}`);
    errors++;
  }
};
for (const c of CATEGORIES) check("categories", `/categories/${c.id}`);
for (const s of ["/", "/sites", "/categories", "/best", "/about"]) {
  check("static", s);
}
// /search is intentionally not in publicPages (not indexed), but the
// route must exist in the app — it is served by the SPA fallback.
for (const s of SITES) {
  if (!/^https:\/\//.test(s.url || "")) {
    console.error(`BAD site URL: ${s.name} -> ${s.url}`);
    errors++;
  }
}
for (const c of CATEGORIES) {
  if (sitesByCategory(c.id).length === 0) {
    console.error(`CATEGORY HAS NO SITES: ${c.id} (${c.name})`);
    errors++;
  }
}
console.log(`link check: ${pages.size} public pages known, ${SITES.length} sites, ${CATEGORIES.length} categories, ${errors} broken link(s).`);
process.exit(errors ? 1 : 0);
