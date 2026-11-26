import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { SOURCES, NOT_VERIFIED, DISCLAIMER } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd } from "../config/seo.js";

export default function Sources() {
  const meta = STATIC_PAGES["/sources"];
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/sources"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/sources" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sources", path: "/sources" }
          ])
        ]}
      />
      <div className="container section article">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Sources" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <h2>Sources</h2>
        <ul>
          {(SOURCES || []).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h2>Jo verify nahi hua</h2>
        <p>{NOT_VERIFIED}</p>
        <h2>Disclaimer</h2>
        <p>{DISCLAIMER}</p>
        <p>
          <Link to="/about">About →</Link> · <Link to="/sites">Poori directory →</Link>
        </p>
      </div>
    </>
  );
}
