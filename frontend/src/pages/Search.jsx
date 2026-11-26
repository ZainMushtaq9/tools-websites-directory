import { Link, useSearchParams } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SiteCard from "../components/SiteCard.jsx";
import { SITES } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd } from "../config/seo.js";

// Client-side search across all sites by name, focus, notes, language
// and tools. No backend, no tracking — the query stays in the URL so a
// search result page can be shared and bookmarked.
function searchSites(query) {
  const q = query.trim().toLowerCase();
  if (!q) return { results: [], searched: false };
  const results = (SITES || []).filter((s) =>
    [s.name, s.focus, s.notes, s.language, s.tools].join(" ").toLowerCase().includes(q)
  );
  return { results, searched: true };
}

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const { results, searched } = searchSites(query);

  return (
    <>
      <SeoHead
        title="Search"
        description="Tools websites ko naam, focus ya keyword se search karein — har site kya offer karti hai, kitne tools hain aur kis category mein hai, aik hi jagah par."
        path="/search"
        noindex
        jsonLd={[
          webPageJsonLd({ title: "Search", description: "Tools websites ko search karein.", path: "/search" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Search", path: "/search" }
          ])
        ]}
      />
      <div className="container section">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Search" }]} />
        <h1>Search</h1>
        <p className="lede">
          Tools websites ko naam, focus ya keyword se dhoondhein — jaise “PDF”, “Zakat” ya “tax”.
        </p>
        <SearchBar
          id="search-page-input"
          value={query}
          autoFocus
          onChange={(v) => setParams(v ? { q: v } : {}, { replace: true })}
          onSubmit={() => {}}
        />
        {!searched ? (
          <>
            <h2>Browse karein</h2>
            <p>
              Keyword type karein, ya <Link to="/sites">poori directory</Link> dekhein.
            </p>
          </>
        ) : results.length === 0 ? (
          <>
            <h2>“{query}” ke liye koi result nahi</h2>
            <p>
              Chhota keyword try karein — “PDF”, “tax”, “image” — ya{" "}
              <Link to="/sites">saari sites</Link> dekhein.
            </p>
          </>
        ) : (
          <>
            <h2>
              {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
            </h2>
            <div className="card-grid">
              {results.map((s) => (
                <SiteCard key={s.name} site={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
