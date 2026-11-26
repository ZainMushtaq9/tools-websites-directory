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
        <p>
          <Link to="/sites">Poori directory →</Link> ·{" "}
          <Link to="/gaps">Gaps aur khali jagah →</Link>
        </p>
      </div>
    </>
  );
}
