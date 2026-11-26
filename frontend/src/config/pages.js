// Single registry for the directory. Content data lives in
// frontend/src/config/sites-data.js (kept intact — its internal tier
// labels never render publicly); user-facing categories live in
// frontend/src/config/categories.js.
// /search is intentionally NOT in publicPages — search pages are
// not indexed.
import { SITES } from "./sites-data.js";
import { CATEGORIES, sitesByCategory } from "./categories.js";

export { SITES };
export { CATEGORIES, sitesByCategory };

export const categoryCount = (id) => sitesByCategory(id).length;

// Static pages: values mirror the <SeoHead> props and <h1> in each page
// component (frontend/src/pages/*.jsx). Keep in sync with those files.
export const STATIC_PAGES = {
  "/": {
    title: "76 Free Online Tools Websites",
    description:
      "76 free online tools websites ki directory — best calculator sites, Pakistan tools websites aur free tools, Roman Urdu mein.",
    h1: "76 free online tools websites ki directory",
    lede:
      "Sahi calculator website dhoondhna mushkil hai — 76 free online tools websites aik hi jagah par, category ke hisaab se, best picks ke saath."
  },
  "/sites": {
    title: "All 76 Tools Websites — Full List",
    description:
      "Calculator websites list — 76 online tools websites aik hi jagah par. Category aur size se filter karein ya naam se search karein.",
    h1: "Saari tools websites",
    lede:
      "Poori directory — har site kya offer karti hai, kitne tools hain aur kis zabaan mein hai. Category ya size se filter karein, ya naam se search karein."
  },
  "/categories": {
    title: "Browse Tools Websites by Category",
    description:
      "Tools websites by category — maths, finance, health, construction, Pakistan tools aur zyada. Har category ki best sites aik hi list mein.",
    h1: "Categories — kaam ke hisaab se sites",
    lede:
      "Apna kaam choose karein — maths, finance, health, construction, Pakistan tools ya koi aur category — aur us kaam ki behtareen sites dekhein."
  },
  "/best": {
    title: "Best Calculator Websites",
    description:
      "Best calculator websites — calculator.net, Omni Calculator aur baaki top sites ki comparison, free sites aur calculator.net alternatives samet.",
    h1: "Best calculator websites",
    lede:
      "Kaun si calculator website sab se achhi hai? Jawab kaam par munhasir hai — yahan top sites ki comparison, free options aur calculator.net alternatives hain."
  },
  "/about": {
    title: "About This Directory",
    description:
      "Tools Websites Directory kya hai — visitors ke liye 76 free tools websites ki directory, sites kaise choose hoti hain aur list kaise istemal karein.",
    h1: "About — Tools Websites Directory",
    lede:
      "Yeh directory visitors ke liye hai — sahi tools website jaldi dhoondhne ke liye, bina har site ko aik aik kar ke kholay."
  },
  ...Object.fromEntries(
    (CATEGORIES || []).map((c) => [
      `/categories/${c.id}`,
      {
        title: c.title,
        description: c.description,
        h1: c.h1,
        lede: c.lede
      }
    ])
  )
};

// Every public URL, in sitemap order. The sitemap, route manifest,
// prerender step and link validator all read this list.
export const publicPages = [
  { path: "/", changeFrequency: "daily", priority: 1.0, lastmod: "2026-11-26" },
  { path: "/sites", changeFrequency: "weekly", priority: 0.9, lastmod: "2026-11-26" },
  { path: "/best", changeFrequency: "weekly", priority: 0.9, lastmod: "2026-11-26" },
  { path: "/categories", changeFrequency: "weekly", priority: 0.8, lastmod: "2026-11-26" },
  ...(CATEGORIES || []).map((c) => ({
    path: `/categories/${c.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastmod: "2026-11-26"
  })),
  { path: "/about", changeFrequency: "monthly", priority: 0.6, lastmod: "2026-11-26" }
];
