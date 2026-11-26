import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { TOP10 } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd } from "../config/seo.js";

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
          ])
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
