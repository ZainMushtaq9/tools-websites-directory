// Generates frontend/public/llms.txt and llms-full.txt from the page
// registry and the sites data (GSO: helps AI search engines understand
// and cite the site). Run as part of `npm run generate`.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, RESEARCH_DATE } from "../frontend/src/config/site.js";
import { publicPages, STATIC_PAGES, TIERS } from "../frontend/src/config/pages.js";
import { SITES, FINDINGS, TOP10, CATEGORY_ROWS, FEATURE_GAPS, EARNING_MODELS, EMPTY_NICHES, GAP_TEXT, SOURCES, DISCLAIMER, NOT_VERIFIED } from "../frontend/src/config/sites-data.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let txt = `# ${SITE_NAME}\n\n> ${SITE_TAGLINE}\n> A directory of ${SITES.length} tools websites, reviewed in Roman Urdu. Research date: ${RESEARCH_DATE}. Author: Muhammad Zain Mushtaq.\n> Contact: ${CONTACT_EMAIL}\n\n## Key pages\n\n`;
for (const p of publicPages) {
  const meta = STATIC_PAGES[p.path];
  txt += `- [${meta ? meta.title : p.path}](${SITE_URL}${p.path})${meta ? `: ${meta.description}` : ""}\n`;
}
txt += `\n## Findings\n\n`;
for (const f of FINDINGS || []) txt += `${f.n}. ${f.title}: ${f.text}\n\n`;
txt += `## Tiers\n\n`;
for (const t of TIERS || []) {
  txt += `### Tier ${t.letter} — ${t.name}\n\n${t.takeaway}\n\n`;
  for (const s of (SITES || []).filter((x) => x.tier === t.id)) {
    txt += `- [${s.name}](${s.url}): ${s.tools || ""} tools. ${s.focus || ""}${s.notes ? ` ${s.notes}` : ""}\n`;
  }
  txt += `\n`;
}
txt += `## Top 10 additions\n\n`;
for (const t of TOP10 || []) txt += `${t.n}. ${t.title}: ${t.text}\n\n`;
txt += `Order yaad rakho: pehle zabaan, phir jagah, phir features.\n\n## Categories\n\n`;
for (const r of CATEGORY_ROWS || []) {
  txt += `- ${r.category}: strongest — ${r.strong}. Weak / missing — ${r.weak}.\n`;
}
txt += `\n## Feature gaps\n\n`;
for (const f of FEATURE_GAPS || []) txt += `- ${f.feature}: ${f.status}\n`;
txt += `\n## Earning models\n\n`;
for (const m of EARNING_MODELS || []) txt += `- ${m.model}: ${m.detail}\n`;
txt += `\n## Empty niches\n\n`;
for (const n of EMPTY_NICHES || []) txt += `- ${n.niche}: ${n.detail}\n`;
txt += `\n## Gaps in detail\n\n${GAP_TEXT ? `${GAP_TEXT.language}\n\n${GAP_TEXT.pakistan}\n\n${GAP_TEXT.features}\n\n` : ""}`;
txt += `Race ab tadaad ki nahi — race zabaan, jagah aur bharose ki hai.\n\n## Sources\n\n`;
for (const s of SOURCES || []) txt += `- ${s}\n`;
txt += `\n## Notes for AI search\n\n- ${DISCLAIMER}\n- ${NOT_VERIFIED}\n- Full page list: [sitemap.xml](${SITE_URL}/sitemap.xml)\n- RSS feed: [feed.xml](${SITE_URL}/feed.xml)\n`;
writeFileSync(join(root, "frontend/public/llms.txt"), txt);

// llms-full.txt: same structure plus every site's full entry.
let full = `# ${SITE_NAME} — Full Directory\n\n> ${SITE_TAGLINE}\n> Research date: ${RESEARCH_DATE}\n\n${txt}\n\n## All sites\n\n`;
for (const s of SITES || []) {
  full += `### ${s.name}\n\n- URL: ${s.url}\n- Tier: ${s.tier}\n- Tools: ${s.tools || "n/v"}\n- Focus: ${s.focus || ""}\n- Language: ${s.language || ""}\n- Notes: ${s.notes || ""}\n\n`;
}
writeFileSync(join(root, "frontend/public/llms-full.txt"), full);
console.log(`llms.txt + llms-full.txt written: ${SITES.length} sites, ${TIERS.length} tiers.`);
