import { Link, useParams } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SiteCard from "../components/SiteCard.jsx";
import { STATIC_PAGES, getTier, sitesByTier } from "../config/pages.js";
import { breadcrumbJsonLd, webPageJsonLd, itemListJsonLd } from "../config/seo.js";

export default function Tier() {
  const { tier: tierId } = useParams();
  const tier = getTier(tierId);
  const meta = STATIC_PAGES[`/tiers/${tierId}`];

  if (!tier || !meta) {
    return (
      <div className="container section article">
        <h1>Tier nahi mila</h1>
        <p className="lede">
          Yeh tier maujood nahi hai. <Link to="/sites">Poori directory</Link> ya{" "}
          <Link to="/">home page</Link> dekhein.
        </p>
      </div>
    );
  }

  const sites = sitesByTier(tierId);
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path={`/tiers/${tierId}`}
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: `/tiers/${tierId}` }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sites", path: "/sites" },
            { name: `Tier ${tier.letter}`, path: `/tiers/${tierId}` }
          ]),
          itemListJsonLd(
            `Tier ${tier.letter} — ${tier.name}`,
            sites.map((s) => ({ name: s.name, url: s.url }))
          )
        ]}
      />
      <div className="container section">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Sites", path: "/sites" },
            { name: `Tier ${tier.letter}` }
          ]}
        />
        <h1>{meta.h1}</h1>
        {tier.subtitle ? <p className="lede">{tier.subtitle}</p> : null}
        <p className="answer">
          <strong>Takeaway:</strong> {tier.takeaway}
        </p>
        <p className="muted">
          {sites.length} site{sites.length === 1 ? "" : "s"} — Tier {tier.letter}
        </p>
        <div className="card-grid">
          {sites.map((s) => (
            <SiteCard key={s.name} site={s} />
          ))}
        </div>
        <p>
          <Link to="/sites">Saari sites →</Link> · <Link to="/top-10">Top 10 additions →</Link>
        </p>
      </div>
    </>
  );
}
