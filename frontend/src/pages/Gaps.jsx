import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { GAP_TEXT, FEATURE_GAPS, EARNING_MODELS, EMPTY_NICHES } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd } from "../config/seo.js";

export default function Gaps() {
  const meta = STATIC_PAGES["/gaps"];
  const gap = GAP_TEXT || {};
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/gaps"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/gaps" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gaps", path: "/gaps" }
          ])
        ]}
      />
      <div className="container section article">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Gaps" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>

        <h2>Zabaan ka gap</h2>
        <p>{gap.language}</p>
        <h2>Pakistan ka gap</h2>
        <p>{gap.pakistan}</p>
        <h2>Features ka gap</h2>
        <p>{gap.features}</p>

        <h2>Feature gaps — table</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(FEATURE_GAPS || []).map((f) => (
              <tr key={f.feature}>
                <td>{f.feature}</td>
                <td>{f.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Earning models</h2>
        {(EARNING_MODELS || []).map((m) => (
          <section key={m.model}>
            <h3>{m.model}</h3>
            <p>{m.detail}</p>
          </section>
        ))}

        <h2>Khali niches</h2>
        <ul>
          {(EMPTY_NICHES || []).map((n) => (
            <li key={n.niche}>
              <strong>{n.niche}:</strong> {n.detail}
            </li>
          ))}
        </ul>

        <p className="answer">
          <strong>Race ab tadaad ki nahi — race zabaan, jagah aur bharose ki hai.</strong>
        </p>
        <p>
          <Link to="/top-10">Top 10 additions →</Link> ·{" "}
          <Link to="/categories">Categories ka jaiza →</Link>
        </p>
      </div>
    </>
  );
}
