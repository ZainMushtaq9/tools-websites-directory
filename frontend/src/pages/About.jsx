import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import Reveal from "../components/Reveal.jsx";
import { QuestionIcon } from "../components/Icons.jsx";
import { STATIC_PAGES, CATEGORIES } from "../config/pages.js";
import { AUTHOR_BIO, CONTACT_EMAIL } from "../config/site.js";
import { SITES } from "../config/sites-data.js";
import { ABOUT_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, webPageJsonLd, faqJsonLd } from "../config/seo.js";

export default function About() {
  const meta = STATIC_PAGES["/about"];
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
          faqJsonLd(ABOUT_FAQS)
        ]}
      />
      <div className="container section article">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "About" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <h2>Yeh directory kya karti hai</h2>
        <p>
          Tools Websites Directory {SITES.length} free online tools websites ko aik hi jagah
          par rakhti hai. Har site ke liye likha hai ke woh kya offer karti hai, kitne tools
          hain, kis zabaan mein hai, aur kis kaam ke liye best hai — taake aap bina har site
          ko aik aik kar ke kholay, sahi site choose kar sakein.
        </p>
        <p>
          Sites ko category ke hisaab se browse karein — maths, finance, health,
          construction, Pakistan tools aur {CATEGORIES.length} categories mein se koi bhi — ya
          poori list mein search karein. Har card par site ka link hai; click karein aur
          seedha us site par chale jayein.
        </p>
        <h2>Sites kaise choose aur list hoti hain</h2>
        <p>
          Har site ko us ke apne tools, focus aur language ke hisaab se list kiya jata hai.
          Koi site pay karke upar nahi aati. Best picks us site ke catalogue aur coverage
          par likhe jate hain — jaise sab se bara maths collection, ya Pakistan ke liye
          sab se zyada tools. Tool counts sites ki apni ginti hain aur waqt ke saath badal
          sakti hain.
        </p>
        <p>
          Tax slabs, bijli tariff, nisab aur gold rates badalte rehte hain, is liye yeh
          directory live rates publish nahi karti — live figures hamesha us site par check
          karein jis ka link diya gaya hai.
        </p>
        <h2>Kaun likhta hai</h2>
        <p>{AUTHOR_BIO}</p>
        <h2>Aam sawalat</h2>
        {ABOUT_FAQS.map((f) => (
          <Reveal className="faq" key={f.q}>
            <h3><QuestionIcon size={18} className="faq-icon" />{f.q}</h3>
            <p>{f.a}</p>
          </Reveal>
        ))}
        <h2>Contact</h2>
        <p>
          Ghalti mili ya koi site missing hai? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          <Link to="/sites">Poori directory →</Link> ·{" "}
          <Link to="/categories">Categories →</Link> ·{" "}
          <Link to="/best">Best calculator websites →</Link>
        </p>
      </div>
    </>
  );
}
