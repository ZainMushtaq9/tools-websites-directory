import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { AUTHOR_BIO, CONTACT_EMAIL, RESEARCH_DATE } from "../config/site.js";
import { DISCLAIMER, SITE_STATS, TIERS } from "../config/sites-data.js";
import { breadcrumbJsonLd, webPageJsonLd, faqJsonLd } from "../config/seo.js";

const FAQS = [
  {
    q: "Yeh directory kya hai?",
    a: "Yeh 60+ tools websites ka aik jaiza hai — har site ka tier, tools ki tadaad, focus aur notes, Roman Urdu mein, aik hi jagah par."
  },
  {
    q: "Tiers kaise kaam karte hain?",
    a: "Har site Tier A se F tak aik tier mein hai: A sab se badi sites, B bare generalists aur solvers, C 'all tools' sites, D Pakistan-specific sites, E Islamic finance/life, aur F agriculture/farmer tools."
  },
  {
    q: "Kya yeh saari maloomat verify hain?",
    a: "Nahi — kuch details verify nahi hui hain aur kuch figures estimates hain. Har site ko khud check karein; Sources page par poori tafseel hai."
  }
];

export default function About() {
  const meta = STATIC_PAGES["/about"];
  const stats = SITE_STATS || {};
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/about"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/about" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" }
          ]),
          faqJsonLd(FAQS)
        ]}
      />
      <div className="container section article">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "About" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <p className="answer">
          <strong>Disclaimer:</strong> {DISCLAIMER}
        </p>
        <h2>Yeh directory kya hai</h2>
        <p>
          Tools Websites Directory {RESEARCH_DATE} ki research report par mabni hai. Us report
          mein {stats.sites || "60+"} tools websites ka jaiza liya gaya — {stats.entries || ""}{" "}
          entries, {stats.tiers || 6} tiers mein bati hui. Har site ke liye us ka tier, tools ki
          tadaad, focus, zabaan aur notes diye gaye hain.
        </p>
        <p>
          Maqsad aik hi hai: koi bhi tools website banane ya istemal karne se pehle yeh dekh
          sake ke market mein kya hai, kya kami hai, aur kahan mauqa hai — bina har site ko
          aik aik kar ke kholay.
        </p>
        <h2>Tiers kaise kaam karte hain</h2>
        <ul>
          {(TIERS || []).map((t) => (
            <li key={t.id}>
              <Link to={`/tiers/${t.id}`}>Tier {t.letter} — {t.name}</Link>
              {t.subtitle ? ` (${t.subtitle})` : ""}: {t.takeaway}
            </li>
          ))}
        </ul>
        <h2>Kaun likhta hai</h2>
        <p>{AUTHOR_BIO}</p>
        <h2>Aam sawalat</h2>
        {FAQS.map((f) => (
          <div className="faq" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
        <h2>Contact</h2>
        <p>
          Ghalti mili ya koi site missing hai? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ya{" "}
          <Link to="/sources">sources</Link> dekhein.
        </p>
      </div>
    </>
  );
}
