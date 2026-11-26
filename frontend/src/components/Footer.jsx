import { Link } from "react-router-dom";
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL } from "../config/site.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          <strong>{SITE_NAME}</strong> — {SITE_TAGLINE}.
        </p>
        <p>
          <Link to="/">Home</Link> · <Link to="/sites">Sites</Link> ·{" "}
          <Link to="/categories">Categories</Link> · <Link to="/best">Best</Link> ·{" "}
          <Link to="/about">About</Link> · <Link to="/search">Search</Link> ·{" "}
          <a href={`${import.meta.env.BASE_URL}feed.xml`}>RSS Feed</a>
        </p>
        <p>
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p className="muted">
          Listings link out to each site — tool counts are the sites&apos; own
          figures and can change, so always check the site itself for current
          details. © 2026 {SITE_NAME}.
        </p>
      </div>
    </footer>
  );
}
