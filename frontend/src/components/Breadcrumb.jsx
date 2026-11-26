import { Link } from "react-router-dom";
// Visible breadcrumb trail. Items with a path are links; the last item
// (no path) is the current page. Mirrors the BreadcrumbList JSON-LD
// already emitted for the same pages.
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={it.name}>
          {i > 0 && " / "}
          {it.path ? <Link to={it.path}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
        </span>
      ))}
    </nav>
  );
}
