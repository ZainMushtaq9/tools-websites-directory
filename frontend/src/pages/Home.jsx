import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SeoHead from "../components/SeoHead.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { STATIC_PAGES, TIERS, tierCount } from "../config/pages.js";
import { SITE_STATS, FINDINGS, TOP10, SITES } from "../config/sites-data.js";
import { HOME_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "../config/seo.js";

export default function Home() {
  const meta = STATIC_PAGES["/"];
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const stats = SITE_STATS || { sites: SITES.length, entries: SITES.length, tiers: 6, researchDate: "26 Nov 2026" };

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/"
        jsonLd={[webPageJsonLd({ title: meta.title, description: meta.description, path: "/" }), breadcrumbJsonLd([{ name: "Home", path: "/" }]), faqJsonLd(HOME_FAQS)]}
      />
      <section className="hero">
        <div className="container">
          <h1>{meta.h1}</h1>
          <p className="lede">{meta.lede}</p>
          <SearchBar
            id="home-search"
            value={query}
            onChange={setQuery}
            onSubmit={(v) => {
              const q = (v || "").trim();
              navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
            }}
          />
          <p>
            <Link className="button" to="/sites">Poori directory dekhein</Link>{" "}
            <Link className="button button-secondary" to="/top-10">Top 10 additions</Link>
          </p>
          <img
            src={`${import.meta.env.BASE_URL}og-image.jpg`}
            alt="Tools Websites Directory — 78 tools websites ki directory, tiers A se F tak"
            width="2192"
            height="1152"
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8, marginTop: 16 }}
          />
        </div>
      </section>
      <div className="container section">
        <div className="stats-strip" role="list">
          <div role="listitem"><strong>{stats.sites}</strong><span>sites</span></div>
          <div role="listitem"><strong>{stats.entries}</strong><span>report entries</span></div>
          <div role="listitem"><strong>{stats.tiers}</strong><span>tiers</span></div>
          <div role="listitem"><strong>{stats.researchDate}</strong><span>research date</span></div>
        </div>

        <h2>Teen bade findings</h2>
        <p className="lede">
          Poori research ka khulasa teen baton mein hai — aur teeno aik hi taraf ishara karti hain:
          Urdu aur Pakistan ke tools hi sab se bara mauqa hain.
        </p>
        <div className="card-grid">
          {(FINDINGS || []).map((f) => (
            <article className="card" key={f.n}>
              <h3>{f.n}. {f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>

        <h2>Top 10 additions</h2>
        <p>
          10 additions jo tools websites ko behtar bana sakti hain — poori tafseel{" "}
          <Link to="/top-10">Top 10 page</Link> par hai.
        </p>
        <ol>
          {(TOP10 || []).map((t) => (
            <li key={t.n}>
              <Link to="/top-10">{t.title}</Link>
            </li>
          ))}
        </ol>

        <h2>Tiers — A se F tak</h2>
        <p>
          Har site aik tier mein hai — badi giants se le kar Pakistan aur agriculture ki
          specialist sites tak. Tier kholein aur us ki saari sites dekhein.
        </p>
        <div className="card-grid">
          {(TIERS || []).map((t) => (
            <article className="card" key={t.id}>
              <h3>
                <Link to={`/tiers/${t.id}`}>Tier {t.letter} — {t.name}</Link>
              </h3>
              {t.subtitle ? <p className="post-card-meta">{t.subtitle}</p> : null}
              <p>{tierCount(t.id)} sites</p>
              <p>
                <Link to={`/tiers/${t.id}`}>Tier {t.letter} dekhein →</Link>
              </p>
            </article>
          ))}
        </div>
        <p>
          <Link to="/sites">Saari {SITES.length} sites aik hi page par →</Link> ·{" "}
          <Link to="/gaps">Gaps aur khali jagah →</Link> ·{" "}
          <Link to="/categories">Categories ka jaiza →</Link>
        </p>

        <h2>Aam sawalat</h2>
        {HOME_FAQS.map((f) => (
          <div className="faq" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
