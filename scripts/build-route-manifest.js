// Writes frontend/public/route-manifest.json from the route registry.
// The prerender step and the link validator read this list.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { publicPages, TIERS, SITES } from "../frontend/src/config/pages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = {
  generatedAt: new Date().toISOString(),
  tiers: (TIERS || []).map((t) => `/tiers/${t.id}`),
  sites: (SITES || []).length,
  pages: publicPages.map((p) => p.path)
};
writeFileSync(join(root, "frontend/public/route-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(
  `route-manifest.json written: ${manifest.pages.length} public pages, ${manifest.tiers.length} tiers, ${manifest.sites} sites.`
);
