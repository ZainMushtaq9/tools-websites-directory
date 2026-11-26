import { TIERS } from "../config/sites-data.js";

// One directory row/card for a site. Used by Home (via lists), Sites,
// Tier and Search so every listing looks the same.
export function tierOf(site) {
  return (TIERS || []).find((t) => t.id === site.tier);
}

export default function SiteCard({ site }) {
  const tier = tierOf(site);
  return (
    <article className="card site-card">
      <h3>
        <a href={site.url} target="_blank" rel="noopener noreferrer">
          {site.name}
        </a>
      </h3>
      <p className="post-card-meta">
        {tier ? (
          <span className="tier-badge">Tier {tier.letter} — {tier.name}</span>
        ) : (
          <span className="tier-badge">Tier {site.tier}</span>
        )}{" "}
        · {site.tools ? `${site.tools} tools` : "Tools ki tadaad nahi di gayi"}
        {site.language ? ` · ${site.language}` : ""}
      </p>
      {site.focus ? <p><strong>Focus:</strong> {site.focus}</p> : null}
      {site.notes ? <p>{site.notes}</p> : null}
      <p>
        <a href={site.url} target="_blank" rel="noopener noreferrer">
          {site.url.replace(/^https?:\/\//, "")} ↗
        </a>
      </p>
    </article>
  );
}
