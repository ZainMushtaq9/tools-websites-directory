import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { CATEGORY_ROWS } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd } from "../config/seo.js";

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
          ])
        ]}
      />
      <div className="container section">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Categories" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <h2>Category-wise jaiza</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Sab se achhi coverage</th>
              <th>Kamzor / Ghayab</th>
            </tr>
          </thead>
          <tbody>
            {(CATEGORY_ROWS || []).map((r) => (
              <tr key={r.category}>
                <td><strong>{r.category}</strong></td>
                <td>{r.strong}</td>
                <td>{r.weak}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Har kaam ke liye best site</h2>
        <ul>
          <li><strong>EMI / loan calculator:</strong> finance category mein sab se bara collection SumKitTool (145 finance tools) aur Toolsped (126) ka hai.</li>
          <li><strong>Age calculator:</strong> calculator.net aur Omni Calculator — dono ke health sections mein age tools hain.</li>
          <li><strong>Percentage calculator:</strong> calculator.net (percentage, fractions) aur Calculator Soup (maths, statistics).</li>
          <li><strong>BMI calculator:</strong> calculator.net (fitness/health) aur Omni Calculator (Health — 440 tools).</li>
          <li><strong>Tax calculator:</strong> US/UK tax ke liye Good Calculators; Pakistan tax ke liye <Link to="/tiers/d">Tier D</Link> ki sites.</li>
          <li><strong>Construction calculator:</strong> Inch Calculator — is category mein sab se mazboot (math/science, construction, electrical).</li>
        </ul>
        <p>
          <Link to="/sites">Poori directory →</Link> ·{" "}
          <Link to="/gaps">Gaps aur khali jagah →</Link>
        </p>
      </div>
    </>
  );
}
