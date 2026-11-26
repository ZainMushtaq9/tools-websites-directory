import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { TOP10 } from "../config/sites-data.js";
import { TOP10_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "../config/seo.js";

export default function Top10() {
  const meta = STATIC_PAGES["/top-10"];
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/top-10"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/top-10" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Top 10", path: "/top-10" }
          ]),
          faqJsonLd(TOP10_FAQS)
        ]}
      />
      <div className="container section article">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Top 10" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        {(TOP10 || []).map((t) => (
          <section key={t.n}>
            <h2>
              {t.n}. {t.title}
            </h2>
            <p>{t.text}</p>
          </section>
        ))}
        <h2>Aam sawalat</h2>
        {TOP10_FAQS.map((f) => (
          <div className="faq" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
        <p className="answer">
          <strong>Order yaad rakho:</strong> pehle zabaan, phir jagah, phir features.
        </p>
        <p>
          <Link to="/gaps">Gaps aur khali jagah →</Link> ·{" "}
          <Link to="/sites">Poori directory →</Link>
        </p>
      </div>
    </>
  );
}
