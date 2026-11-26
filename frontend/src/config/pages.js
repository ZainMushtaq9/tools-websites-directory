// Single registry for the directory. Content data lives in
// frontend/src/config/sites-data.js (written by the research agent);
// this file derives the page registry and tier helpers from it.
// /search is intentionally NOT in publicPages — search pages are
// not indexed.
import { SITES, TIERS } from "./sites-data.js";

export { SITES, TIERS };

export const getTier = (id) => (TIERS || []).find((t) => t.id === id);
export const sitesByTier = (id) => (SITES || []).filter((s) => s.tier === id);
export const tierCount = (id) => sitesByTier(id).length;

// Static pages: values mirror the <SeoHead> props and <h1> in each page
// component (frontend/src/pages/*.jsx). Keep in sync with those files.
export const STATIC_PAGES = {
  "/": {
    title: "60+ Tools Websites ka Mukammal Jaiza",
    description:
      "60+ tools websites ka mukammal jaiza — teeno bade findings, top 10 additions aur Tier A se F tak ki poori directory, Roman Urdu mein.",
    h1: "60+ tools websites ka mukammal jaiza",
    lede: "Yeh directory 60+ tools websites ko aik hi jagah par rakhti hai — kaunsi site kis tier mein hai, kya kami hai, aur nayi site ke liye kya mauqa hai."
  },
  "/sites": {
    title: "Saari Tools Websites",
    description:
      "60+ tools websites ki poori directory — har site ka tier, tools ki tadaad, focus aur notes. Tier se filter karein ya naam se search karein.",
    h1: "Saari tools websites",
    lede: "Poori directory — har site ka tier, tools ki tadaad, focus aur notes. Filter ya search se apni matloba site dhoondhein."
  },
  "/top-10": {
    title: "Top 10 Additions",
    description:
      "10 additions jo is directory ko behtar bana sakti hain — pehle zabaan, phir jagah, phir features. Har addition ki tafseel Roman Urdu mein.",
    h1: "Top 10 additions",
    lede: "10 additions jo tools websites ko behtar bana sakti hain — order yaad rakho: pehle zabaan, phir jagah, phir features."
  },
  "/gaps": {
    title: "Gaps aur Khali Jagah",
    description:
      "Tools websites mein kya kami hai — zabaan, Pakistan aur features ke gaps, earning models aur khali niches, aik hi jagah par.",
    h1: "Gaps aur khali jagah",
    lede: "Race ab tadaad ki nahi — race zabaan, jagah aur bharose ki hai. Yeh page batata hai ke tools websites mein kya kami hai aur kahan mauqa hai."
  },
  "/categories": {
    title: "Categories ka Jaiza",
    description:
      "Har category mein kis ki coverage sab se achhi hai aur kahan kami hai — aik saaf table mein tools websites ka category-wise jaiza.",
    h1: "Categories ka jaiza",
    lede: "Har category mein sab se achhi coverage kahan hai aur kya kamzor ya ghayab hai — aik table mein poora jaiza."
  },
  "/about": {
    title: "About",
    description:
      "Tools Websites Directory kya hai, 26 Nov 2026 ki research report par kaise bana, tiers kaise kaam karte hain, aur disclaimer.",
    h1: "About — Tools Websites Directory",
    lede: "Yeh directory 26 Nov 2026 ki research report par mabni hai — 60+ tools websites ka jaiza, tiers mein batna hua, Roman Urdu mein."
  },
  "/sources": {
    title: "Sources aur Notes",
    description:
      "Is directory ke sources, jo details verify nahi hui hain, aur disclaimer — parhne se pehle yeh page zaroor dekh lein.",
    h1: "Sources aur notes",
    lede: "Yeh directory kin sources par mabni hai, kya verify nahi hua, aur disclaimer — sab kuch yahan saaf likha hai."
  },
  ...Object.fromEntries(
    (TIERS || []).map((t) => {
      // SeoHead title stays short (full title must fit ~65 chars);
      // the h1 below carries the full tier name.
      const SHORT_TITLES = {
        a: "Giants",
        b: "Generalists aur Solvers",
        c: "Asli Muqabla",
        d: "Pakistan Sites",
        e: "Islamic Finance",
        f: "Farmer Tools"
      };
      const short = SHORT_TITLES[t.id] || t.name;
      return [
        `/tiers/${t.id}`,
        {
          title: `Tier ${t.letter}: ${short}`,
          description: `Tier ${t.letter} (${t.name}) ki tools websites — ${sitesByTier(t.id).length} sites, takeaway aur har site ka focus, Roman Urdu mein.`,
          h1: `Tier ${t.letter} — ${t.name}`,
          lede: t.subtitle || t.takeaway || ""
        }
      ];
    })
  )
};

// Every public URL, in sitemap order. The sitemap, route manifest,
// prerender step and link validator all read this list.
export const publicPages = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/sites", changeFrequency: "weekly", priority: 0.9 },
  ...(TIERS || []).map((t) => ({
    path: `/tiers/${t.id}`,
    changeFrequency: "weekly",
    priority: 0.8
  })),
  { path: "/top-10", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gaps", changeFrequency: "monthly", priority: 0.8 },
  { path: "/categories", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/sources", changeFrequency: "monthly", priority: 0.6 }
];
