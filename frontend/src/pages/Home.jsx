import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SeoHead from "../components/SeoHead.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Reveal from "../components/Reveal.jsx";
import StatCounter from "../components/StatCounter.jsx";
import { QuestionIcon, TrophyIcon, CategoryIcon } from "../components/Icons.jsx";
import { STATIC_PAGES, CATEGORIES, categoryCount } from "../config/pages.js";
import { SITES } from "../config/sites-data.js";
import { HOME_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "../config/seo.js";

// The five best picks, grounded in the directory data: the largest
// catalogues and the most-used general sites.
const BEST_PICKS = [
  { name: "Omni Calculator", url: "https://omnicalculator.com", why: "Sab se bara catalogue — 3,938 tools, gehri wazahat aur formulas ke saath." },
  { name: "calculator.net", url: "https://calculator.net", why: "Tez aur simple — aam hisaab ke liye sab se zyada istemal hone wali site." },
  { name: "Calculator Soup", url: "https://calculatorsoup.com", why: "Maths aur statistics mein gehra — kai tools mein darmiyani steps bhi." },
  { name: "Inch Calculator", url: "https://inchcalculator.com", why: "Construction aur conversions mein sab se mazboot — 3,500+ tools." },
  { name: "MiniWebtool", url: "https://miniwebtool.com", why: "2,022 tools aur API — text, math aur finance aik hi jagah par." }
];

export default function Home() {
  const meta = STATIC_PAGES["/"];
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
            <Link className="button button-secondary" to="/best">Best calculator websites</Link>
          </p>
          <img
            className="page-image"
            src={`${import.meta.env.BASE_URL}hero-poster.jpg`}
            alt="Tools Websites Directory — free online tools websites ki directory"
            style={{ maxWidth: "100%", height: "auto", borderRadius: 8, marginTop: 16 }}
          />
        </div>
      </section>
      <div className="container section">
        <Reveal className="stats-strip" role="list">
          <div role="listitem" className="stat-card"><StatCounter value={SITES.length} /><span>sites listed</span></div>
          <div role="listitem" className="stat-card"><StatCounter value={CATEGORIES.length} /><span>categories</span></div>
          <div role="listitem" className="stat-card"><StatCounter value={BEST_PICKS.length} /><span>best picks</span></div>
          <div role="listitem" className="stat-card"><strong>Free</strong><span>to browse</span></div>
        </Reveal>

        <h2>Categories</h2>
        <p className="lede">Apna kaam choose karein — us kaam ki behtareen sites aik hi list mein milengi.</p>
        <div className="card-grid">
          {CATEGORIES.map((c) => (
            <Reveal as="article" className="card" key={c.id}>
              <h3>
                <Link to={`/categories/${c.id}`}><CategoryIcon category={c.id} size={18} /> {c.name}</Link>
              </h3>
              <p>{c.short}</p>
              <p>{categoryCount(c.id)} sites</p>
              <p><Link to={`/categories/${c.id}`}>{c.name} dekhein →</Link></p>
            </Reveal>
          ))}
        </div>
        <p><Link to="/categories">Saari {CATEGORIES.length} categories →</Link></p>

        <h2>Best sites — ek nazar mein</h2>
        <p className="lede">Har kaam ke liye aik best site nahi hoti. Yeh paanch sites aksar sab se zyada kaam aati hain.</p>
        <div className="card-grid">
          {BEST_PICKS.map((s, i) => (
            <Reveal as="article" className="card" key={s.name}>
              <h3>
                {i + 1}. <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
              </h3>
              <p>{s.why}</p>
            </Reveal>
          ))}
        </div>
        <p><Link to="/best">Poori comparison — Best calculator websites →</Link></p>

        <h2>Aam sawalat</h2>
        {HOME_FAQS.map((f) => (
          <Reveal className="faq" key={f.q}>
            <h3><QuestionIcon size={18} className="faq-icon" />{f.q}</h3>
            <p>{f.a}</p>
          </Reveal>
        ))}
        <p>
          <Link to="/sites">Saari {SITES.length} sites aik hi page par →</Link> ·{" "}
          <Link to="/categories">Categories →</Link> ·{" "}
          <Link to="/best">Best sites →</Link>
        </p>
      </div>
    </>
  );
}
