import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SiteCard from "../components/SiteCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { QuestionIcon, SlidersIcon } from "../components/Icons.jsx";
import { STATIC_PAGES, CATEGORIES } from "../config/pages.js";
import { SITES } from "../config/sites-data.js";
import { SITES_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, itemListJsonLd } from "../config/seo.js";
import { siteCategories, parseToolCount, sizeBucket, SIZE_BUCKETS } from "../config/categories.js";

function matches(site, q) {
  if (!q) return true;
  const hay = [site.name, site.focus, site.notes, site.language, site.tools].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

export default function Sites() {
  const meta = STATIC_PAGES["/sites"];
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const catFilter = params.get("category") || "all";
  const sizeFilter = params.get("size") || "all";
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    let list = (SITES || []).filter((s) => (catFilter === "all" ? true : siteCategories(s).includes(catFilter)));
    list = list.filter((s) => (sizeFilter === "all" ? true : sizeBucket(s) === sizeFilter));
    list = list.filter((s) => matches(s, q));
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "most") {
      list = [...list].sort((a, b) => (parseToolCount(b.tools) ?? -1) - (parseToolCount(a.tools) ?? -1));
    } else if (sort === "fewest") {
      list = [...list].sort((a, b) => (parseToolCount(a.tools) ?? Number.MAX_SAFE_INTEGER) - (parseToolCount(b.tools) ?? Number.MAX_SAFE_INTEGER));
    }
    return list;
  }, [q, catFilter, sizeFilter, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const catName = catFilter === "all" ? "" : (CATEGORIES.find((c) => c.id === catFilter) || {}).name;
  const sizeName = sizeFilter === "all" ? "" : (SIZE_BUCKETS.find((b) => b.id === sizeFilter) || {}).label;

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/sites"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/sites" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sites", path: "/sites" }
          ]),
          itemListJsonLd(
            "Tools Websites Directory",
            filtered.map((s) => ({ name: s.name, url: s.url }))
          ),
          faqJsonLd(SITES_FAQS)
        ]}
      />
      <div className="container section">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Sites" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <img
          className="page-image"
          src={`${import.meta.env.BASE_URL}images/sites.jpg`}
          alt="Free online tools websites ki poori directory"
          style={{ maxWidth: "100%", height: "auto", borderRadius: 8, marginBottom: 16 }}
        />
        <SearchBar
          id="sites-search"
          value={q}
          onChange={(v) => setParam("q", v)}
          onSubmit={() => {}}
        />
        <div className="toolbar" style={{ marginTop: 16 }}>
          <span className="toolbar-label"><SlidersIcon size={16} /><strong>Category:</strong></span>
          <button type="button" className={catFilter === "all" ? "button" : "button button-secondary"} onClick={() => setParam("category", "all")}>All</button>
          {(CATEGORIES || []).map((c) => (
            <button
              key={c.id}
              type="button"
              className={catFilter === c.id ? "button" : "button button-secondary"}
              onClick={() => setParam("category", c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="toolbar" style={{ marginTop: 8 }}>
          <span className="toolbar-label"><SlidersIcon size={16} /><strong>Size:</strong></span>
          {SIZE_BUCKETS.map((b) => (
            <button
              key={b.id}
              type="button"
              className={sizeFilter === b.id ? "button" : "button button-secondary"}
              onClick={() => setParam("size", b.id)}
            >
              {b.label}
            </button>
          ))}
          <label>
            Sort:{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="name">Name A–Z</option>
              <option value="most">Most tools first</option>
              <option value="fewest">Fewest tools first</option>
            </select>
          </label>
        </div>
        <p className="muted" aria-live="polite">
          {filtered.length} site{filtered.length === 1 ? "" : "s"}
          {catName ? ` — ${catName}` : ""}
          {sizeName ? ` — ${sizeName}` : ""}
          {q ? ` — “${q}” ke liye` : ""}
        </p>
        <h2>Poori directory</h2>
        {filtered.length === 0 ? (
          <p>
            Koi site nahi mili. Filter badlein ya <Link to="/sites">saari sites</Link> dekhein.
          </p>
        ) : (
          <div className="card-grid">
            {filtered.map((s) => (
              <SiteCard key={s.name} site={s} />
            ))}
          </div>
        )}
        <h2>Aam sawalat</h2>
        {SITES_FAQS.map((f) => (
          <Reveal className="faq" key={f.q}>
            <h3><QuestionIcon size={18} className="faq-icon" />{f.q}</h3>
            <p>{f.a}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}
