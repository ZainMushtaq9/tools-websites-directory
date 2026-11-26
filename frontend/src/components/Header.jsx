import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SITE_NAME } from "../config/site.js";
import { TIERS } from "../config/sites-data.js";
import SearchBar from "./SearchBar.jsx";

// Theme: default light; a saved choice wins. The pre-paint script in
// index.html sets data-theme before first paint, so this reads the
// attribute instead of guessing — no flash on load.
function getInitialTheme() {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
  }
  try {
    const saved = localStorage.getItem("twd-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* storage unavailable */
  }
  return "light";
}

export default function Header() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("twd-theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">{SITE_NAME}</Link>
        <SearchBar
          id="header-search"
          value={query}
          onChange={setQuery}
          onSubmit={(v) => {
            const q = (v || "").trim();
            navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
          }}
        />
        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/sites">Sites</NavLink>
          {(TIERS || []).map((t) => (
            <NavLink key={t.id} to={`/tiers/${t.id}`}>Tier {t.letter}</NavLink>
          ))}
          <NavLink to="/top-10">Top 10</NavLink>
          <NavLink to="/gaps">Gaps</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/sources">Sources</NavLink>
        </nav>
      </div>
    </header>
  );
}
