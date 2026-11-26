import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import Reveal from "../components/Reveal.jsx";
import { QuestionIcon, TrophyIcon } from "../components/Icons.jsx";
import { STATIC_PAGES } from "../config/pages.js";
import { BEST_FAQS } from "../config/faqs.js";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, itemListJsonLd } from "../config/seo.js";

// Ranked best picks, grounded in the directory data: the largest
// catalogues and the most-used general sites. No site paid for a
// place here — the order follows catalogue size and coverage.
const RANKED = [
  { n: 1, name: "Omni Calculator", url: "https://omnicalculator.com", tools: "3,938 tools", why: "Sab se bara catalogue — Math 687, Finance 618, Physics 546, Health 440. Har tool par lambi wazahat aur formulas. Aam user ke liye thoda bhari ho sakta hai, lekin research ke liye behtareen hai.", bestFor: "Gehri wazahat aur formulas" },
  { n: 2, name: "calculator.net", url: "https://calculator.net", tools: "~200 tools", why: "Tez aur simple — finance, health, maths, age aur date aik hi jagah par. Sab se zyada istemal hone wali calculator site.", bestFor: "Roz ke aam hisaab" },
  { n: 3, name: "Calculator Soup", url: "https://calculatorsoup.com", tools: "~480 tools", why: "Maths, statistics aur geometry mein gehra — kai tools mein darmiyani steps bhi dikhata hai, muft mein.", bestFor: "Maths aur steps" },
  { n: 4, name: "Inch Calculator", url: "https://inchcalculator.com", tools: "3,500+ tools", why: "Construction, electrical, conversions aur health — aur mobile apps bhi. Construction ke liye sab se mazboot site.", bestFor: "Construction aur conversions" },
  { n: 5, name: "MiniWebtool", url: "https://miniwebtool.com", tools: "2,022 tools", why: "Math, finance, text aur webmaster tools aik hi jagah par — aur 1,080 tools ki API bhi. 15 zabaanein, lekin Urdu nahi.", bestFor: "Har tarah ke tools aik jagah" }
];

const FREE_SITES = [
  { name: "calculator.net", url: "https://calculator.net", note: "Aam hisaab, free, bina sign-up" },
  { name: "Omni Calculator", url: "https://omnicalculator.com", note: "3,938 tools, free, bina sign-up" },
  { name: "Calculator Soup", url: "https://calculatorsoup.com", note: "Maths + steps, free" },
  { name: "Inch Calculator", url: "https://inchcalculator.com", note: "Construction + conversions, free" },
  { name: "Toolsped", url: "https://toolsped.com", note: "857 tools, free, bina sign-up" }
];

export default function Best() {
  const meta = STATIC_PAGES["/best"];
  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        path="/best"
        jsonLd={[
          webPageJsonLd({ title: meta.title, description: meta.description, path: "/best" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Best", path: "/best" }
          ]),
          itemListJsonLd(
            "Best calculator websites",
            RANKED.map((s) => ({ name: s.name, url: s.url }))
          ),
          faqJsonLd(BEST_FAQS)
        ]}
      />
      <div className="container section article">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Best" }]} />
        <h1>{meta.h1}</h1>
        <p className="lede">{meta.lede}</p>
        <img
          className="page-image"
          src={`${import.meta.env.BASE_URL}images/best.jpg`}
          alt="Best calculator websites — top sites ki comparison"
          style={{ maxWidth: "100%", height: "auto", borderRadius: 8, marginBottom: 16 }}
        />
        <h2>Best calculator websites — top 5</h2>
        {RANKED.map((s) => (
          <section key={s.name}>
            <h3>
              {s.n}. <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a> — {s.tools}
            </h3>
            <p>{s.why}</p>
            <p><strong>Best for:</strong> {s.bestFor}</p>
          </section>
        ))}

        <h2>Best free calculator sites</h2>
        <p>
          Yeh paanchon sites free hain aur bina sign-up ke chalti hain. Steps ke liye paid
          sites (Wolfram Alpha, Symbolab, Mathway) se behtar muft option Calculator Soup hai.
        </p>
        <ul>
          {FREE_SITES.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer"><strong>{s.name}</strong></a> — {s.note}
            </li>
          ))}
        </ul>

        <h2>calculator.net alternatives</h2>
        <p>
          calculator.net ke best alternatives: <strong>Omni Calculator</strong> (sab se bara
          catalogue), <strong>Calculator Soup</strong> (maths aur steps) aur{" "}
          <strong>Inch Calculator</strong> (construction aur conversions). Teeno free hain.
        </p>
        <h2>Omni Calculator alternatives</h2>
        <p>
          Omni ke alternatives: <strong>calculator.net</strong> (tez aur simple),{" "}
          <strong>Calculator Soup</strong> (maths par gehra) aur <strong>MiniWebtool</strong>{" "}
          (2,022 tools + API). Omni ki wazahat sab se lambi hai, lekin ye teeno muft aur tez hain.
        </p>

        <h2>calculator.net vs Omni Calculator — which is better?</h2>
        <p>
          Catalogue mein Omni aage hai (3,938 tools vs ~200), aur us ki wazahat aur formulas
          bhi gehri hain. calculator.net tez aur simple hai. Aam user ke liye calculator.net,
          research ke liye Omni.
        </p>
        <h2>calculator.net vs Calculator Soup — which is better?</h2>
        <p>
          calculator.net har tarah ke tools deta hai (finance, health, maths), jab ke
          Calculator Soup maths, statistics aur geometry mein gehra hai aur kai tools mein
          darmiyani steps bhi dikhata hai. Maths ke liye Soup, baaki sab ke liye calculator.net.
        </p>
        <h2>Which calculator website is best?</h2>
        <p>
          Koi aik site har kaam ke liye best nahi: aam hisaab ke liye calculator.net, gehri
          wazahat ke liye Omni Calculator, maths ke steps ke liye Calculator Soup, aur
          construction ke liye Inch Calculator. Apna kaam choose karein —{" "}
          <Link to="/categories">categories</Link> se us kaam ki best site mil jayegi.
        </p>

        <h2>Best site — kaam ke hisaab se</h2>
        <ul>
          <li><strong>EMI / loan:</strong> SumKitTool (145 finance tools) aur Toolsped (126) — <Link to="/categories/finance">Finance</Link></li>
          <li><strong>Age calculator:</strong> calculator.net aur Omni Calculator — <Link to="/categories/datetime">Date &amp; Time</Link></li>
          <li><strong>Percentage calculator:</strong> calculator.net aur Calculator Soup — <Link to="/categories/math">Maths</Link></li>
          <li><strong>BMI calculator:</strong> calculator.net aur Omni Calculator (Health — 440 tools) — <Link to="/categories/health">Health</Link></li>
          <li><strong>Tax calculator:</strong> US/UK ke liye Good Calculators; Pakistan ke liye HissabAI — <Link to="/categories/pakistan">Pakistan Tools</Link></li>
          <li><strong>Construction calculator:</strong> Inch Calculator — <Link to="/categories/construction">Construction</Link></li>
          <li><strong>CGPA / MDCAT:</strong> PakDar (48+ tools) — <Link to="/categories/pakistan">Pakistan Tools</Link></li>
        </ul>

        <h2>Aam sawalat</h2>
        {BEST_FAQS.map((f) => (
          <Reveal className="faq" key={f.q}>
            <h3><QuestionIcon size={18} className="faq-icon" />{f.q}</h3>
            <p>{f.a}</p>
          </Reveal>
        ))}
        <p>
          <TrophyIcon size={16} /> <Link to="/sites">Poori directory →</Link> ·{" "}
          <Link to="/categories">Categories →</Link>
        </p>
      </div>
    </>
  );
}
