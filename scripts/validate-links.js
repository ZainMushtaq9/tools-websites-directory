// Checks internal links in the route manifest: every /tiers/* path
// referenced by the registry must exist in publicPages, and every
// site URL in the data must be a valid https URL.
import { publicPages, TIERS } from "../frontend/src/config/pages.js";
import { SITES } from "../frontend/src/config/sites-data.js";

const pages = new Set(publicPages.map((p) => p.path));
let errors = 0;
const check = (from, path) => {
  if (!pages.has(path)) {
    console.error(`BROKEN LINK from ${from}: ${path}`);
    errors++;
  }
};
for (const t of TIERS) check("tiers", `/tiers/${t.id}`);
for (const s of ["/", "/sites", "/top-10", "/gaps", "/categories", "/about", "/sources"]) {
  check("static", s);
}
// /search is intentionally not in publicPages (not indexed), but the
// route must exist in the app — it is served by the SPA fallback.
for (const s of SITES) {
  if (!/^https:\/\//.test(s.url || "")) {
    console.error(`BAD site URL: ${s.name} -> ${s.url}`);
    errors++;
  }
  if (!TIERS.find((t) => t.id === s.tier)) {
    console.error(`BAD tier for site: ${s.name} -> ${s.tier}`);
    errors++;
  }
}
console.log(`link check: ${pages.size} public pages known, ${SITES.length} sites, ${errors} broken link(s).`);
process.exit(errors ? 1 : 0);
