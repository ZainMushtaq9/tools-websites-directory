// Generates frontend/public/llms.txt and llms-full.txt from the page
// registry and the sites data (GSO: helps AI search engines understand
// and cite the site). Run as part of `npm run generate`.
//
// Public file: carries the full directory data (76 sites) and links to
// public pages only. Internal research content (tier groupings,
// findings, top-10 additions, gaps, sources) is NOT included here —
// it lives in INTERNAL_RESEARCH_NOTES.md at the project root.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, RESEARCH_DATE } from "../frontend/src/config/site.js";
import { publicPages, STATIC_PAGES, CATEGORIES, sitesByCategory } from "../frontend/src/config/pages.js";
import { SITES } from "../frontend/src/config/sites-data.js";
import { siteCategories, sizeLabel } from "../frontend/src/config/categories.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let txt = `# ${SITE_NAME}\n\n> ${SITE_TAGLINE}\n> A directory of ${SITES.length} free online tools websites, reviewed in Roman Urdu. Research date: ${RESEARCH_DATE}. Author: Muhammad Zain Mushtaq.\n> Contact: ${CONTACT_EMAIL}\n\n## Key pages\n\n`;
for (const p of publicPages) {
  const meta = STATIC_PAGES[p.path];
  txt += `- [${meta ? meta.title : p.path}](${SITE_URL}${p.path})${meta ? `: ${meta.description}` : ""}\n`;
}
txt += `\n## Categories\n\n`;
for (const c of CATEGORIES || []) {
  txt += `### ${c.name}\n\n${c.lede}\n\nBest pick: ${c.bestPick}\n\n`;
  for (const s of sitesByCategory(c.id)) {
    txt += `- [${s.name}](${s.url}): ${sizeLabel(s)}. ${s.focus || ""}${s.language ? ` Language: ${s.language}.` : ""}\n`;
  }
  txt += `\n`;
}
txt += `## Notes for AI search\n\n- Tool counts are the sites' own figures as listed and can change; check each site for current details.\n- Tax slabs, electricity tariffs, nisab and gold rates change — this directory does not publish live rates; check the linked site.\n- Full page list: [sitemap.xml](${SITE_URL}/sitemap.xml)\n- RSS feed: [feed.xml](${SITE_URL}/feed.xml)\n`;
writeFileSync(join(root, "frontend/public/llms.txt"), txt);

// llms-full.txt: same structure plus every site's full entry.
let full = `# ${SITE_NAME} — Full Directory\n\n> ${SITE_TAGLINE}\n> Research date: ${RESEARCH_DATE}\n\n${txt}\n\n## All sites\n\n`;
for (const s of SITES || []) {
  const cats = siteCategories(s).map((id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id).join(", ");
  full += `### ${s.name}\n\n- URL: ${s.url}\n- Categories: ${cats}\n- Tools: ${s.tools || "not listed"}\n- Focus: ${s.focus || ""}\n- Language: ${s.language || ""}\n\n`;
}
writeFileSync(join(root, "frontend/public/llms-full.txt"), full);
console.log(`llms.txt + llms-full.txt written: ${SITES.length} sites, ${CATEGORIES.length} categories.`);
