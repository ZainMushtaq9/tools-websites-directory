// Generates frontend/public/feed.xml (RSS 2.0) listing the directory's
// public pages. Run as part of `npm run generate`.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, AUTHOR_NAME } from "../frontend/src/config/site.js";
import { publicPages, STATIC_PAGES } from "../frontend/src/config/pages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const pubDate = new Date("2026-11-26T00:00:00Z").toUTCString();
const items = publicPages
  .map((p) => {
    const meta = STATIC_PAGES[p.path];
    const title = meta ? meta.title : p.path;
    const desc = meta ? meta.description : "";
    return `    <item>\n      <title>${esc(title)}</title>\n      <link>${SITE_URL}${p.path}</link>\n      <guid isPermaLink="true">${SITE_URL}${p.path}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <author>${esc(AUTHOR_NAME)}</author>\n      <description>${esc(desc)}</description>\n    </item>`;
  })
  .join("\n");
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${esc(SITE_NAME)}</title>\n    <link>${SITE_URL}/</link>\n    <description>${esc(SITE_TAGLINE)}</description>\n    <language>en</language>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;
writeFileSync(join(root, "frontend/public/feed.xml"), xml);
console.log(`feed.xml written: ${publicPages.length} items.`);
