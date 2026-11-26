import { Link, useParams } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SiteCard from "../components/SiteCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { QuestionIcon } from "../components/Icons.jsx";
import { STATIC_PAGES, CATEGORIES, sitesByCategory } from "../config/pages.js";
import { AVAILABLE_IMAGES } from "../config/categories.js";
import { CATEGORY_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, itemListJsonLd } from "../config/seo.js";

function CategoryImage({ cat }) {
  // Only render an <img> for a file that exists; otherwise a styled
  // placeholder div — never a broken image. When the image worker
  // delivers a category image, add its filename to AVAILABLE_IMAGES
  // in config/categories.js and it will show automatically.
  if (cat.image && AVAILABLE_IMAGES.has(cat.image)) {
    return (
      <img
        className="page-image"
        src={`${import.meta.env.BASE_URL}images/${cat.image}`}
        alt={`${cat.name} — tools websites`}
        style={{ maxWidth: "100%", height: "auto", borderRadius: 8, marginBottom: 16 }}
      />
    );
  }
  return (
    <div
      className="page-image"
      role="img"
      aria-label={`${cat.name} — tools websites`}
      style={{
        maxWidth: "100%",
        height: 180,
        borderRadius: 8,
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--hatch-widget-surface-muted, #eef2f5)",
        color: "var(--hatch-widget-muted, #5a6b7a)",
        fontSize: 20,
        fontWeight: 600,
        textAlign: "center",
        padding: 16
      }}
    >
      {cat.name}
    </div>
  );
}

export default function Category() {
  const { slug } = useParams();
  const cat = (CATEGORIES || []).find((c) => c.id === slug);
  const meta = STATIC_PAGES[`/categories/${slug}`];

  if (!cat || !meta) {
    return (
      <div className="container section article">
        <h1>Category nahi mili</h1>
        <p className="lede">
          Yeh category maujood nahi hai. <Link to="/categories">Saari categories</Link> ya{" "}
          <Link to="/sites">poori directory</Link> dekhein.
        </p>
      </div>
    );
  }

  const sites = sitesByCategory(cat.id);
  const faqs = CATEGORY_FAQS[cat.id] || [];
  const idx = (CATEGORIES || []).findIndex((c) => c.id === cat.id);
  const prev = idx > 0 ? CATEGORIES[idx - 1] : null;
  const next = idx >= 0 && idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : null;

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={`/categories/${cat.id}`}
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: `/categories/${cat.id}` }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
            { name: cat.name, path: `/categories/${cat.id}` }
          ]),
          itemListJsonLd(
            `${cat.name} — tools websites`,
            sites.map((s) => ({ name: s.name, url: s.url }))
          ),
          ...(faqs.length ? [faqJsonLd(faqs)] : [])
        ]}
      />
      <div className="container section">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
            { name: cat.name }
          ]}
        />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <CategoryImage cat={cat} />
        <p className="answer">
          <strong>Best pick:</strong> {cat.bestPick}
        </p>
        <p className="muted">
          {sites.length} site{sites.length === 1 ? "" : "s"} — {cat.name}
        </p>
        <h2>{cat.name} ki sites</h2>
        <div className="card-grid">
          {sites.map((s) => (
            <SiteCard key={s.name} site={s} />
          ))}
        </div>
        {faqs.length > 0 ? (
          <>
            <h2>Aam sawalat</h2>
            {faqs.map((f) => (
              <Reveal className="faq" key={f.q}>
                <h3><QuestionIcon size={18} className="faq-icon" />{f.q}</h3>
                <p>{f.a}</p>
              </Reveal>
            ))}
          </>
        ) : null}
        <p>
          {prev ? <><Link to={`/categories/${prev.id}`}>← {prev.name}</Link> · </> : null}
          <Link to="/categories">Saari categories →</Link> · <Link to="/sites">Poori directory →</Link>
          {next ? <> · <Link to={`/categories/${next.id}`}>{next.name} →</Link></> : null}
        </p>
      </div>
    </>
  );
}
