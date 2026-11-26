import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page Not Found"
        description="Yeh page Tools Websites Directory par maujood nahi hai. Poori directory ya home page dekhein."
        path="/404"
        noindex
        canonical={false}
      />
      <div className="container section article">
        <h1>Page nahi mila</h1>
        <p className="lede">
          Yeh page maujood nahi hai. <Link to="/sites">Poori directory</Link> dekhein ya{" "}
          <Link to="/">home page</Link> par wapas jayein.
        </p>
        <p>
          <Link to="/sites">Saari sites →</Link> · <Link to="/best">Best sites →</Link> ·{" "}
          <Link to="/categories">Categories →</Link>
        </p>
      </div>
    </>
  );
}
