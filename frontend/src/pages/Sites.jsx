import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SiteCard from "../components/SiteCard.jsx";
import { STATIC_PAGES, TIERS } from "../config/pages.js";
import { SITES } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd, itemListJsonLd } from "../config/seo.js";

const TIER_ORDER = ["a", "b", "c", "d", "e", "f"];

function matches(site, q) {
  if (!q) return true;
  const hay = [site.name, site.focus, site.notes, site.language, site.tools].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

export default function Sites() {
  const meta = STATIC_PAGES["/sites"];
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const tierFilter = params.get("tier") || "all";
  const [sort, setSort] = useState("tier");

  const filtered = useMemo(() => {
    let list = (SITES || []).filter((s) => (tierFilter === "all" ? true : s.tier === tierFilter));
    list = list.filter((s) => matches(s, q));
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort(
        (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) || a.name.localeCompare(b.name)
      );
    }
    return list;
  }, [q, tierFilter, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

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
          )
        ]}
      />
      <div className="container section">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Sites" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <SearchBar
          id="sites-search"
          value={q}
          onChange={(v) => setParam("q", v)}
          onSubmit={() => {}}
        />
        <div className="toolbar" style={{ marginTop: 16 }}>
          <span><strong>Tier:</strong></span>
          <button type="button" className={tierFilter === "all" ? "button" : "button button-secondary"} onClick={() => setParam("tier", "all")}>All</button>
          {(TIERS || []).map((t) => (
            <button
              key={t.id}
              type="button"
              className={tierFilter === t.id ? "button" : "button button-secondary"}
              onClick={() => setParam("tier", t.id)}
            >
              Tier {t.letter}
            </button>
          ))}
          <label>
            Sort:{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="tier">Tier order</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
        <p className="muted" aria-live="polite">
          {filtered.length} site{filtered.length === 1 ? "" : "s"}
          {tierFilter !== "all" ? ` — Tier ${tierFilter.toUpperCase()}` : ""}
          {q ? ` — “${q}” ke liye` : ""}
        </p>
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
      </div>
    </>
  );
}
