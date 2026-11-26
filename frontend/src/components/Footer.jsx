import { Link } from "react-router-dom";
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, RESEARCH_DATE } from "../config/site.js";
import { TIERS } from "../config/sites-data.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          <strong>{SITE_NAME}</strong> — {SITE_TAGLINE}.
        </p>
        <p>
          <Link to="/">Home</Link> · <Link to="/sites">Sites</Link> ·{" "}
          {(TIERS || []).map((t, i) => (
            <span key={t.id}>
              {i > 0 ? " · " : ""}
              <Link to={`/tiers/${t.id}`}>Tier {t.letter}</Link>
            </span>
          ))}{" "}
          · <Link to="/top-10">Top 10</Link> · <Link to="/gaps">Gaps</Link> ·{" "}
          <Link to="/categories">Categories</Link> · <Link to="/about">About</Link> ·{" "}
          <Link to="/sources">Sources</Link> · <Link to="/search">Search</Link> ·{" "}
          <a href={`${import.meta.env.BASE_URL}feed.xml`}>RSS Feed</a>
        </p>
        <p>
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p className="muted">
          Research: {RESEARCH_DATE}. Yeh directory aik research report par mabni hai — har site
          ko khud check karein; kuch details verify nahi hui hain. © 2026 {SITE_NAME}.
        </p>
      </div>
    </footer>
  );
}
