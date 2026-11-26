import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "./Icons.jsx";
import { siteCategories, sizeLabel, CATEGORIES } from "../config/categories.js";

// One directory row/card for a site. Used by Home, Sites, Category
// and Search so every listing looks the same.
// The data file keeps internal tier labels, but they are never shown
// here. Notes that are internal research remarks (unverified counts,
// group entries, "copy this model") are also not shown — only
// user-facing facts: what it offers, tool count, language, price.
const HIDDEN_NOTE = /verify nahi|Group entry|copy karne wala|n\/v/i;

export default function SiteCard({ site }) {
  const cats = siteCategories(site);
  const note = site.notes && !HIDDEN_NOTE.test(site.notes) ? site.notes : null;
  return (
    <article className="card site-card">
      <h3>
        <a href={site.url} target="_blank" rel="noopener noreferrer">
          {site.name}
        </a>
      </h3>
      <p className="post-card-meta">
        {sizeLabel(site)}
        {site.language ? ` · ${site.language}` : ""}
      </p>
      {site.focus ? <p><strong>What it offers:</strong> {site.focus}</p> : null}
      {note ? <p>{note}</p> : null}
      {cats.length ? (
        <p className="post-card-meta">
          {cats.map((id, i) => {
            const c = CATEGORIES.find((x) => x.id === id);
            return (
              <span key={id}>
                {i > 0 ? " · " : ""}
                <Link to={`/categories/${id}`}>{c ? c.name : id}</Link>
              </span>
            );
          })}
        </p>
      ) : null}
      <p>
        <a className="site-card-link" href={site.url} target="_blank" rel="noopener noreferrer">
          Visit {site.url.replace(/^https?:\/\//, "")} <ExternalLinkIcon size={14} />
        </a>
      </p>
    </article>
  );
}
