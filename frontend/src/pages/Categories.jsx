import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import Reveal from "../components/Reveal.jsx";
import { GridIcon } from "../components/Icons.jsx";
import { STATIC_PAGES, CATEGORIES, categoryCount } from "../config/pages.js";
import { breadcrumbJsonLd, webPageJsonLd, itemListJsonLd } from "../config/seo.js";

export default function Categories() {
  const meta = STATIC_PAGES["/categories"];
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/categories"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/categories" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" }
          ]),
          itemListJsonLd(
            "Tools website categories",
            CATEGORIES.map((c) => ({ name: c.name, url: `https://tools-websites-directory.pages.dev/categories/${c.id}` }))
          )
        ]}
      />
      <div className="container section">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Categories" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <img
          className="page-image"
          src={`${import.meta.env.BASE_URL}images/categories.jpg`}
          alt="Tools websites by category — maths, finance, health, Pakistan tools aur zyada"
          style={{ maxWidth: "100%", height: "auto", borderRadius: 8, marginBottom: 16 }}
        />
        <div className="card-grid">
          {(CATEGORIES || []).map((c) => (
            <Reveal as="article" className="card" key={c.id}>
              <h3>
                <Link to={`/categories/${c.id}`}><GridIcon size={18} /> {c.name}</Link>
              </h3>
              <p>{c.short}</p>
              <p>{categoryCount(c.id)} sites</p>
              <p><Link to={`/categories/${c.id}`}>{c.name} dekhein →</Link></p>
            </Reveal>
          ))}
        </div>
        <h2>Har kaam ke liye best site</h2>
        <ul>
          <li><strong>EMI / loan calculator:</strong> finance category mein sab se bara collection SumKitTool (145 finance tools) aur Toolsped (126) ka hai — <Link to="/categories/finance">Finance dekhein</Link>.</li>
          <li><strong>Age calculator:</strong> calculator.net aur Omni Calculator — dono ke health sections mein age tools hain — <Link to="/categories/datetime">Date &amp; Time dekhein</Link>.</li>
          <li><strong>Percentage calculator:</strong> calculator.net (percentage, fractions) aur Calculator Soup (maths, statistics) — <Link to="/categories/math">Maths dekhein</Link>.</li>
          <li><strong>BMI calculator:</strong> calculator.net (fitness/health) aur Omni Calculator (Health — 440 tools) — <Link to="/categories/health">Health dekhein</Link>.</li>
          <li><strong>Tax calculator:</strong> US/UK tax ke liye Good Calculators; Pakistan tax ke liye <Link to="/categories/pakistan">Pakistan Tools</Link> ki sites.</li>
          <li><strong>Construction calculator:</strong> Inch Calculator — is category mein sab se mazboot (math/science, construction, electrical) — <Link to="/categories/construction">Construction dekhein</Link>.</li>
          <li><strong>Zakat calculator:</strong> IslamicTool (live nisab) aur Ghulmil (Urdu) — <Link to="/categories/islamic">Islamic Tools dekhein</Link>.</li>
          <li><strong>CGPA / MDCAT:</strong> PakDar (48+ tools) — <Link to="/categories/pakistan">Pakistan Tools dekhein</Link>.</li>
        </ul>
        <p>
          <Link to="/sites">Poori directory →</Link> ·{" "}
          <Link to="/best">Best calculator websites →</Link>
        </p>
      </div>
    </>
  );
}
