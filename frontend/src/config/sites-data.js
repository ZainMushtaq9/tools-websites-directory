// Tools Websites directory data — extracted from the research report
// "Tools Websites: Poori List aur Gaps" (Roman Urdu, research date 26 Nov 2026).
// One entry per INDIVIDUAL website. urlCertain is true only when the PDF
// prints the domain or it is a famous/obvious domain; false = best-guess domain.
export const SITE_STATS = { sites: 76, entries: 43, tiers: 6, researchDate: "26 Nov 2026" };

export const TIERS = [
  { id: "a", letter: "A", name: "Sab Se Badi Sites", subtitle: "Giants", takeaway: "Saari English, saari US-centric, ads par chalti hain. Urdu, Pakistan tools, dark mode, offline — in mein se kuch bhi in ke paas nahi." },
  { id: "b", letter: "B", name: "Bare Generalists, Converters aur Solvers", subtitle: "", takeaway: "API aur embed hi wahid cheezein hain jo backlinks laati hain — wo sirf MiniWebtool ke paas theek se hain. Steps ki paywall hi free site ka sab se bara mauqa hai." },
  { id: "c", letter: "C", name: "'All Tools' Sites", subtitle: "Asli Muqabla", takeaway: "Nov 2026 mein nayi sites ki aik lehar aayi hai — Toolsped, RupayaTools, SumKitTool, CalculateItNow, CalculatorApp.me — lekin taqreeban sab wohi English/US catalogue copy kar rahi hain. Jo do sites alag hain, un ki wajah tadaad nahi hai: CalculatorApp.me features ki wajah se (PDF, dark mode, offline) aur ToolsBuilt zabaan ki wajah se (Urdu)." },
  { id: "d", letter: "D", name: "Pakistan-Specific Sites", subtitle: "", takeaway: "Gap, chhoti soorat mein — specialists sirf 7 se 48 tools ke hain; Pakistan ka bara equivalent abhi bana hi nahi." },
  { id: "e", letter: "E", name: "Islamic Finance / Islamic Life", subtitle: "", takeaway: "Ilm Tools (70 tools) sirf English hai aur us ka nisab figure purana hai (Rs 252,000); Urdu Islamic tools sirf Ghulmil par hain." },
  { id: "f", letter: "F", name: "Agriculture / Farmer Tools", subtitle: "", takeaway: "Kisi bare generalist (Omni, calculator.net, Soup) ka agriculture section hi nahi hai. Omni ke sab se qareeb Food (71) aur Ecology (34) hain." },
];

export const SITES = [
  // ---- Tier A: Sab Se Badi Sites (8) ----
  { name: "calculator.net", url: "https://calculator.net", urlCertain: true, tier: "a", tools: "~200", focus: "Finance, fitness/health, math, age, date, GPA, subnet, password", language: "Sirf English", notes: "AdSense. SimilarWeb: 40.3M visits/mo; SEMrush: 77.32M — estimators mukhtalif, range hi samjho" },
  { name: "Omni Calculator", url: "https://omnicalculator.com", urlCertain: true, tier: "a", tools: "3,938 (live verify)", focus: "Sab kuch: Math 687, Finance 618, Physics 546, Health 440, Conversion 330; lambi wazahat aur formulas", language: "Sirf English", notes: "~10-11M visits/mo (estimate). Embed ke liye application + logo/link-back lazmi" },
  { name: "Calculator Soup", url: "https://calculatorsoup.com", urlCertain: true, tier: "a", tools: "~480", focus: "Math, statistics, geometry, fractions, science; kai tools mein darmiyani steps", language: "English", notes: "AdSense" },
  { name: "Inch Calculator", url: "https://inchcalculator.com", urlCertain: true, tier: "a", tools: "3,500+", focus: "Math/science, construction, electrical, health, finance, automotive; mobile apps bhi", language: "English", notes: "calculator.net/Omni ke top-3 competitors mein" },
  { name: "Good Calculators", url: "https://goodcalculators.com", urlCertain: true, tier: "a", tools: "360+ (24 categories)", focus: "Salary/income tax (US+UK), mortgage, retirement, statistics, engineering, HRM", language: "English", notes: "Ezoic ads — pura model advertising par (UK, 2015 se)" },
  { name: "Calculator-Online.net", url: "https://calculator-online.net", urlCertain: true, tier: "a", tools: "~350", focus: "Math, algebra, percentage, fractions, statistics, conversions, finance", language: "English", notes: "Ads page par nahi mile" },
  { name: "The Calculator Site", url: "https://thecalculatorsite.com", urlCertain: true, tier: "a", tools: "250+", focus: "Finance, health, cooking, math, construction, education, astrology", language: "English", notes: "Apni site ke mutabiq \"funded by advertising\"" },
  { name: "GigaCalculator", url: "https://gigacalculator.com", urlCertain: true, tier: "a", tools: "n/v", focus: "Finance, business, health, date/time, math, geometry; citations (BibTeX/IEEE) ki sahulat", language: "English", notes: "Traffic n/v; tool count verify nahi ho saka" },
  // ---- Tier B: Bare Generalists, Converters aur Solvers (18) ----
  { name: "MiniWebtool", url: "https://miniwebtool.com", urlCertain: true, tier: "b", tools: "2,022", focus: "Math 464, Financial 314, Text 150, randomness, health, time/date, webmaster, hash", language: "15 zabaanein — Urdu/Hindi/Arabic nahi", notes: "1,080 tools ki REST API + MCP server — API wali akeli site" },
  { name: "RapidTables", url: "https://rapidtables.com", urlCertain: true, tier: "b", tools: "~130 + 300 conv.", focus: "Math, conversion, electrical, reference tables (wire gauge, resistor, ASCII)", language: "English", notes: "Taqreeban no-JS — sab se tez" },
  { name: "Calculator.io", url: "https://calculator.io", urlCertain: true, tier: "b", tools: "~60", focus: "Fitness, science, math, finance, health", language: "English", notes: "AdSense" },
  { name: "ConvertUnits", url: "https://convertunits.com", urlCertain: true, tier: "b", tools: "n/v", focus: "Sirf unit conversion, metric tables, SI", language: "English", notes: "Tool count verify nahi ho saka (n/v)" },
  { name: "PlanetCalc", url: "https://planetcalc.com", urlCertain: true, tier: "b", tools: "n/v (bara)", focus: "User ke banaye calculators: engineering, maths, calendars (Hindu/Indian bhi)", language: "English", notes: "Tool count verify nahi ho saka (n/v)" },
  { name: "Time and Date", url: "https://timeanddate.com", urlCertain: true, tier: "b", tools: "Date/time only", focus: "Date duration, calendars, time zones, countdowns", language: "English", notes: "" },
  { name: "Desmos", url: "https://desmos.com", urlCertain: true, tier: "b", tools: "Thode, gehre", focus: "Graphing, geometry, algebra, statistics — classroom maths", language: "", notes: "Free" },
  { name: "GeoGebra", url: "https://geogebra.org", urlCertain: true, tier: "b", tools: "Thode, gehre", focus: "Graphing, geometry, algebra, statistics — classroom maths", language: "", notes: "Free; save ke liye account chahiye" },
  { name: "Wolfram Alpha", url: "https://wolframalpha.com", urlCertain: true, tier: "b", tools: "Engine", focus: "Maths, science, finance, history — computational knowledge engine", language: "", notes: "Freemium: steps free nahi; Pro $9.99/mo ya $5/mo (saalana)" },
  { name: "Symbolab", url: "https://symbolab.com", urlCertain: true, tier: "b", tools: "Solver", focus: "Algebra, trig, calculus, matrices — step-by-step maths", language: "13+ interface languages (Urdu confirm nahi)", notes: "Pro ~$9.95/mo" },
  { name: "Mathway", url: "https://mathway.com", urlCertain: true, tier: "b", tools: "59+", focus: "Algebra/calculus solver", language: "", notes: "Full steps ~$9.99/mo" },
  { name: "Photomath", url: "https://photomath.com", urlCertain: true, tier: "b", tools: "59+ / camera", focus: "Algebra/calculus solver; camera se sawal parhta hai", language: "", notes: "Photomath Plus $9.99/mo" },
  { name: "Calculatored", url: "https://calculatored.com", urlCertain: true, tier: "b", tools: "n/v", focus: "General aur maths calculators", language: "English", notes: "Group entry (Calculatored, EasyCalculation, Calculator.com, Ncalculators, eMathHelp, HackMath); tool counts verify nahi hue (n/v)" },
  { name: "EasyCalculation", url: "https://easycalculation.com", urlCertain: true, tier: "b", tools: "n/v", focus: "General aur maths calculators", language: "English", notes: "Group entry; tool count verify nahi ho saka (n/v)" },
  { name: "Calculator.com", url: "https://calculator.com", urlCertain: true, tier: "b", tools: "n/v", focus: "General aur maths calculators", language: "English", notes: "~284K visits/mo (estimate); group entry, tool count n/v" },
  { name: "Ncalculators", url: "https://ncalculators.com", urlCertain: true, tier: "b", tools: "n/v", focus: "General aur maths calculators; step-by-step maths", language: "English", notes: "Group entry; tool count verify nahi ho saka (n/v)" },
  { name: "eMathHelp", url: "https://emathhelp.com", urlCertain: true, tier: "b", tools: "n/v", focus: "General aur maths calculators; step-by-step maths", language: "English", notes: "Group entry; tool count verify nahi ho saka (n/v)" },
  { name: "HackMath", url: "https://hackmath.net", urlCertain: true, tier: "b", tools: "n/v", focus: "General aur maths calculators", language: "English", notes: "Group entry; tool count verify nahi ho saka (n/v)" },
];

SITES.push(
  // ---- Tier C: "All Tools" Sites (34) ----
  { name: "Toolsped", url: "https://toolsped.com", urlCertain: true, tier: "c", tools: "857 (live verify)", focus: "Converters 248, Generators/Text 142, Finance 126, Home 107, Math 90, PDF 62, Health/Education 80", language: "English (UI)", notes: "Urdu Keyboard, Hijri converter, Prayer Time, Qibla — lekin ye tools hain, UI English hai. Free, no sign-up" },
  { name: "RupayaTools", url: "https://rupayatools.com", urlCertain: false, tier: "c", tools: "874+", focus: "India-focused: salary, EMI, income tax, CGPA, FD, cement/construction, PDF", language: "", notes: "Nov 2026 launch. Pakistan ke liye yehi model copy karne wala hai" },
  { name: "Calculators Daily", url: "https://calculatorsdaily.com", urlCertain: false, tier: "c", tools: "1,007", focus: "General, 30+ categories", language: "", notes: "Free" },
  { name: "Muxtly", url: "https://muxtly.com", urlCertain: false, tier: "c", tools: "300+", focus: "Finance, health, file conversion; privacy-first, 100% browser mein", language: "", notes: "Free, no sign-up" },
  { name: "TinyWow", url: "https://tinywow.com", urlCertain: true, tier: "c", tools: "250+", focus: "PDF, image, video, AI writing, text, code tools", language: "", notes: "Free, no sign-up" },
  { name: "10015.io", url: "https://10015.io", urlCertain: true, tier: "c", tools: "300+", focus: "PDF, image, video, AI writing, text, code tools", language: "", notes: "Free, no sign-up" },
  { name: "iLovePDF", url: "https://ilovepdf.com", urlCertain: true, tier: "c", tools: "Bara PDF set", focus: "Merge, split, compress, convert, OCR, sign", language: "", notes: "Freemium: free limits, Premium ~$4-9/mo. Files upload hoti hain — privacy gap yahin hai" },
  { name: "Smallpdf", url: "https://smallpdf.com", urlCertain: true, tier: "c", tools: "30+", focus: "Merge, split, compress, convert, OCR, sign", language: "", notes: "Freemium: free limits, Premium ~$4-9/mo. Files upload hoti hain — privacy gap yahin hai" },
  { name: "PDF24", url: "https://pdf24.org", urlCertain: true, tier: "c", tools: "PDF+image", focus: "Merge, split, compress, convert, OCR, sign", language: "", notes: "Freemium / ads; files upload hoti hain — privacy gap yahin hai" },
  { name: "CalculatorApp.me", url: "https://calculatorapp.me", urlCertain: true, tier: "c", tools: "150+", focus: "Finance, health, maths, tax (US/UK/CA/AU/IN)", language: "", notes: "Sab se feature-complete chhoti site: PDF export, dark mode, PWA/offline, embed, local history, voice input — sab free" },
  { name: "CalculateItNow", url: "https://www.calculateitnow.com", urlCertain: false, tier: "c", tools: "413", focus: "General + generated date/conversion/tax pages", language: "", notes: "Instant embed — koi form/approval nahi. Sep 2026 launch" },
  { name: "Calculators Planet", url: "https://calculatorsplanet.com", urlCertain: false, tier: "c", tools: "382+", focus: "Financial, math, health, everyday; formulas established standards se", language: "", notes: "Free, no sign-up" },
  { name: "SumKitTool", url: "https://sumkittool.com", urlCertain: false, tier: "c", tools: "331+", focus: "Finance 145, math 70, text, health, home, dev; US/UK/CA/AU salary+tax", language: "", notes: "Har tool par formula + worked example + sources. Founder Sargodha, Pakistan se" },
  { name: "calculate.at", url: "https://calculate.at", urlCertain: true, tier: "c", tools: "290+", focus: "Finance, health, math, construction; mortgage, EMI, tax, retirement/FIRE, solar ROI", language: "", notes: "Free, ad-supported / no sign-up" },
  { name: "Calculator4U", url: "https://calculator4u.com", urlCertain: false, tier: "c", tools: "185+", focus: "Finance, health, math, construction; mortgage, EMI, tax, retirement/FIRE, solar ROI", language: "", notes: "Free, ad-supported / no sign-up" },
  { name: "Miryori", url: "https://miryori.org", urlCertain: true, tier: "c", tools: "29", focus: "Salary/pay, loans, interest, PTO, health, utility", language: "9 zabaanein (EN, ES, FR, DE, AR, PT, JA, KO, ZH) — Urdu phir bhi nahi", notes: "Adsterra ads" },
  { name: "ToolsBuilt", url: "https://toolsbuilt.com", urlCertain: true, tier: "c", tools: "50", focus: "Finance/maths, dates; FBR salary tax, matric/FSc/university marks; PKR default", language: "9 zabaanein incl. Urdu, RTL support", notes: "Koi ads nahi, GitHub Pages par" },
  { name: "CalculatorBaba", url: "https://calculatorbaba.com", urlCertain: true, tier: "c", tools: "29", focus: "Health, money, math, study, daily life; tola/marla/kanal", language: "English + Urdu", notes: "Free, browser mein" },
  { name: "CyberChef", url: "https://cyberchef.org", urlCertain: true, tier: "c", tools: "Dev set", focus: "Developer utilities: data recipes, text, encoding", language: "", notes: "Free / open source, self-host ho sakta hai" },
  { name: "IT Tools", url: "https://it-tools.tech", urlCertain: true, tier: "c", tools: "Dev set", focus: "Developer utilities: data recipes, text, encoding", language: "", notes: "Free / open source, self-host ho sakta hai" },
  { name: "Sejda", url: "https://sejda.com", urlCertain: false, tier: "c", tools: "PDF set", focus: "PDF edit/convert", language: "", notes: "Freemium; group entry (Sejda / PDFgear / PDF Candy / Stirling-PDF)" },
  { name: "PDFgear", url: "https://pdfgear.com", urlCertain: false, tier: "c", tools: "PDF set", focus: "PDF edit/convert", language: "", notes: "Free; group entry (Sejda / PDFgear / PDF Candy / Stirling-PDF)" },
  { name: "PDF Candy", url: "https://pdfcandy.com", urlCertain: false, tier: "c", tools: "PDF set", focus: "PDF edit/convert", language: "", notes: "Free; group entry (Sejda / PDFgear / PDF Candy / Stirling-PDF)" },
  { name: "Stirling-PDF", url: "https://www.stirling.com", urlCertain: false, tier: "c", tools: "60+", focus: "PDF edit/convert; 60+ tools, open source", language: "", notes: "Open source; group entry (Sejda / PDFgear / PDF Candy / Stirling-PDF)" },
  { name: "Vanta Calc", url: "https://vantacalc.com", urlCertain: false, tier: "c", tools: "n/v", focus: "General + niche: LLM API cost calculator (110+ models, data 23 Nov 2026 refresh), stats, GPA", language: "", notes: "AI-era calculators — 2026 ka naya niche" },
  { name: "Calculora", url: "https://calculora.com", urlCertain: false, tier: "c", tools: "Chhote sets", focus: "Finance/health/math", language: "", notes: "Free/freemium, no sign-up; group entry" },
  { name: "SolveIndex", url: "https://solveindex.com", urlCertain: false, tier: "c", tools: "Chhote sets", focus: "Finance/health/math; business/SaaS metrics", language: "", notes: "Free/freemium, no sign-up; group entry" },
  { name: "ZFinPro", url: "https://zfinpro.com", urlCertain: false, tier: "c", tools: "Chhote sets", focus: "Finance/health/math", language: "", notes: "Free/freemium, no sign-up; group entry" },
  { name: "Kinced", url: "https://kinced.com", urlCertain: false, tier: "c", tools: "Chhote sets", focus: "Finance/health/math", language: "", notes: "Free/freemium, no sign-up; group entry" },
  { name: "fixmint", url: "https://fixmint.cc", urlCertain: false, tier: "c", tools: "Chhote sets", focus: "Finance/health/math", language: "", notes: "Free/freemium, no sign-up; group entry" },
  { name: "The Mighty Calculator", url: "https://themightycalculator.com", urlCertain: false, tier: "c", tools: "38", focus: "Finance/health/math", language: "", notes: "Free/freemium, no sign-up; group entry" },
  { name: "SudoTool", url: "https://sudotool.com", urlCertain: false, tier: "c", tools: "n/v", focus: "Finance, mortgage, dev, date tools", language: "", notes: "Free, koi upload nahi" },
  // ---- Tier D: Pakistan-Specific Sites (8) ----
  { name: "HissabAI", url: "https://hissabai.com", urlCertain: true, tier: "d", tools: "20", focus: "FBR 2026-27 salary tax, freelancer tax, GST, bijli bill (NEPRA Feb 2026), Zakat (aaj ka nisab), committees, PSX dividends, PKR inflation", language: "", notes: "WhatsApp tracker EN / Roman Urdu / Urdu mein" },
  { name: "PKTaxCalc", url: "https://pktaxcalc.com", urlCertain: true, tier: "d", tools: "10", focus: "Income/salary tax slab-by-slab working ke saath, Zakat, gold/silver Zakat tola mein, vehicle/token tax", language: "", notes: "Finance Act 2026; Rs 600k tak tax-free" },
  { name: "ToolsFluent", url: "https://toolsfluent.com", urlCertain: true, tier: "d", tools: "7", focus: "Income tax old-vs-new, freelancer (PSEB 0.25%), Zakat nisab Rs 503,529, GST 18%, Punjab token tax, property transfer 236K/236C", language: "", notes: "Tax tools (ToolsFluent tax)" },
  { name: "PakDar", url: "https://pakdar.com", urlCertain: true, tier: "d", tools: "48+", focus: "MDCAT (PMDC 10/40/50), NUST/GIKI/PIEAS/UET/COMSATS aggregates, FBR salary tax, bijli bill, EN-Urdu/Arabic/Roman-Urdu translators", language: "", notes: "Sab client-side" },
  { name: "The Pakistan Edition", url: "https://thepakistanedition.com", urlCertain: false, tier: "d", tools: "~6+", focus: "FBR salary tax 2026-27, bijli (NEPRA July 2025), Zakat (nisab Rs 503,529), PTA/DIRBS mobile tax, property tax", language: "", notes: "" },
  { name: "Haadi Associates", url: "https://haadiassociates.com", urlCertain: false, tier: "d", tools: "8", focus: "Salary/business/rental tax, late-filing penalty, GST, Zakat, WHT finder", language: "", notes: "Tax consultants ke checked" },
  { name: "Ghulmil", url: "https://ghulmil.net", urlCertain: true, tier: "d", tools: "n/v", focus: "Urdu keyboard, Roman to Urdu, namaz (Hanafi/Jafria), Zakat/Khums, Hijri, gold tola, salary tax, Desi months", language: "Urdu-first", notes: "Urdu-first site" },
  { name: "DigitalSpot", url: "https://digitalspot.com", urlCertain: false, tier: "d", tools: "n/v", focus: "EMI, discount waghera", language: "", notes: "Pura interface EN se Urdu switch ho jata hai" },
  // ---- Tier E: Islamic Finance / Islamic Life (3) ----
  { name: "Ilm Tools", url: "https://ilm-tools.netlify.app/", urlCertain: true, tier: "e", tools: "70", focus: "Zakat (cash/gold/silver/business/shares), prayer times, Qibla, Hijri, Ramadan/Eid countdowns, Tasbih, 99 Names, Hajj/Umrah checklists", language: "Sirf English", notes: "Nisab figure Rs 252,000 purana hai" },
  { name: "IslamicTool", url: "https://islamictool.com", urlCertain: true, tier: "e", tools: "28", focus: "Prayer, Qibla, Hijri, Zakat + live nisab, inheritance (Faraid), Murabaha calculator, 99 Names, duas", language: "", notes: "" },
  { name: "IslamicInfo", url: "https://islamicinfo.org", urlCertain: true, tier: "e", tools: "12+", focus: "Prayer, Qibla, Hijri, Zakat (live nisab), inheritance, Tasbeeh", language: "", notes: "" },
  // ---- Tier F: Agriculture / Farmer Tools (7) ----
  { name: "FertDose", url: "https://fertdose.com", urlCertain: true, tier: "f", tools: "n/v", focus: "NPK dose per acre/kanal/marla/hectare, crop library, planting calendar", language: "", notes: "Har step aur source ke saath (Pakistan)" },
  { name: "VIPTools.pk", url: "https://viptools.pk", urlCertain: true, tier: "f", tools: "~6 tools", focus: "Urea/DAP/SOP bags, yield/profit maunds/acre mein, tube-well bijli, beej, livestock", language: "", notes: "Pakistan" },
  { name: "OfficeCalculator", url: "https://officecalculator.com", urlCertain: false, tier: "f", tools: "n/v", focus: "Crop workspace (Punjab crop calendar ke saath)", language: "", notes: "Pakistan" },
  { name: "TechnicalKisan", url: "https://technicalkisan.com", urlCertain: true, tier: "f", tools: "n/v", focus: "9 faslon ki khad, seed rate 27 faslein, mandi prices", language: "", notes: "India" },
  { name: "Toolvala", url: "https://www.toolvala.in/", urlCertain: true, tier: "f", tools: "18", focus: "Agriculture tools", language: "", notes: "India" },
  { name: "Fibub", url: "https://fibub.com", urlCertain: false, tier: "f", tools: "22", focus: "Agriculture tools", language: "", notes: "General" },
  { name: "1001.tools", url: "https://1001.tools", urlCertain: true, tier: "f", tools: "n/v", focus: "Agriculture tools", language: "", notes: "General" },
);

export const FINDINGS = [
  { n: 1, title: "Urdu kahin nahi hai", text: "Omni ke 3,938 tools aur calculator.net ke ~200 tools — dono sirf English mein hain. Full Urdu interface sirf chhoti sites par hai, 50 tools se kam wali." },
  { n: 2, title: "Pakistan ke tools kahin nahi hain", text: "FBR tax, Zakat, bijli ka bill, tola aur marla kisi badi site par nahi. India ki RupayaTools (874+ tools) ye kaam kar chuki hai; Pakistan ki koi bari site abhi nahi hai — specialists sirf 7 se 48 tools ke hain." },
  { n: 3, title: "Features ya missing hain ya paisay mein band", text: "Free step-by-step, PDF export, dark mode aur offline mode badi sites par nahi hain — Wolfram, Symbolab aur Mathway steps ke liye ~$5-10/month lete hain. Apne liye matlab: 54 tools wali site catalogue ke size par nahi jeet sakti (Omni 73 guna bara hai). Jeet in teen cheezon se hogi — full Urdu interface, har budget ke saath update hone wala Pakistan cluster, aur har tool par free steps + PDF/WhatsApp share." },
];

export const TOP10 = [
  { n: 1, title: "Full Urdu interface (+ Roman Urdu toggle) har tool par", text: "50 se zyada tools wali kisi site ke paas nahi hai. Ye Omni aur calculator.net ke khilaf sab se bara moat hai." },
  { n: 2, title: "Pakistan cluster, har budget ke saath current", text: "FBR salary/income tax 2026-27 slab-by-slab working ke saath, Zakat (tola, sarkari nisab, tareekh ke saath), NEPRA bijli bill, gold tola price, PTA mobile tax, property transfer, GST aur filer vs non-filer. India ke paas RupayaTools hai; Pakistan ke paas 100+ tools wala equivalent nahi." },
  { n: 3, title: "Har tool par free step-by-step + formula + worked example", text: "Yehi feature Wolfram, Symbolab aur Mathway ~$10/month mein bechte hain. SumKitTool aur Toolsped sabit karte hain ke ye free ho sakta hai." },
  { n: 4, title: "Har result par PDF export + WhatsApp/share link", text: "Koi Tier A site PDF export nahi deti, aur Pakistan mein results WhatsApp par hi share hote hain." },
  { n: 5, title: "Pakistani exams ka student cluster", text: "MDCAT / ECAT / NUST / GIKI / COMSATS aggregates, matric/FSc percentage, CGPA to percentage. Sirf PakDar (48 tools) cover karta hai, wo bhi sirf English mein." },
  { n: 6, title: "Urdu mein Islamic finance cluster", text: "Zakat, Wirasat (inheritance), Khums, Murabaha, Fitrana, Qurbani share, Hijri/Desi calendar. Ilm Tools (70 tools) sirf English hai aur us ka nisab figure purana hai; Ghulmil akeli Urdu site hai aur chhoti hai." },
  { n: 7, title: "Farmer cluster", text: "Khad ki boriyan (urea/DAP/MOP), beej ki miqdar, fasal ka munafa maunds/acre mein, tube-well ki cost, mandi prices. Kisi generalist site ka farm section hi nahi hai." },
  { n: 8, title: "Offline PWA + dark mode + local history", text: "CalculatorApp.me akeli chhoti site hai jo teeno karti hai; giants mein se koi bhi web par ye nahi karta." },
  { n: 9, title: "Instant embed widget + baad mein free API", text: "Omni embed ke liye application aur approval mangta hai; API sirf MiniWebtool ke paas hai. Instant embed backlinks lata hai — is niche mein sab se sasta SEO." },
  { n: 10, title: "Har money tool par \"rates checked on [date] - source\" wali line", text: "Purane nisab aur tariff kai sites par mile. Tareekh aur source ke saath rates bharosa bhi hai aur SEO bhi. Order yaad rakho: pehle zabaan (Urdu), phir jagah (Pakistan tools), phir features (steps, PDF, offline). Naye calculators sab se aakhir mein — catalogue ka size is race mein jeet nahi dilata." },
];

export const CATEGORY_ROWS = [
  { category: "Finance", strong: "Omni (618), calculator.net, Toolsped (126), SumKitTool (145)", weak: "US/UK se aage mulki tax sirf PK/IN specialists par; Islamic finance sirf IslamicTool/Ilm par" },
  { category: "Health / Fitness", strong: "Omni (440), calculator.net, Calculator.io, Toolsped (80)", weak: "Local health (Pakistani diet, rupay mein cost) — kahin nahi" },
  { category: "Math / Statistics", strong: "Omni (687+196), Soup (~480), MiniWebtool (464)", weak: "Free full step-by-step — Wolfram/Symbolab/Mathway par paywall" },
  { category: "Science / Engineering", strong: "Omni (Physics 546, Chemistry 109), RapidTables (electrical), PlanetCalc", weak: "Offline/field use; citations sirf GigaCalculator deta hai" },
  { category: "Converters", strong: "RapidTables (300+), MiniWebtool, Toolsped (248), Omni (330)", weak: "Live PKR rates, tola/marla/kanal — sirf PK sites par" },
  { category: "Date / Time", strong: "Time and Date, calculator.net, Toolsped (Hijri)", weak: "Hijri + Desi months aik saath — sirf Ghulmil/PakDar" },
  { category: "Text Tools", strong: "MiniWebtool (150), Toolsped (142), 10015.io", weak: "Urdu text tools (Urdu keyboard, Roman to Urdu) — sirf Ghulmil, Toolsped, PakDar" },
  { category: "PDF Tools", strong: "iLovePDF, Smallpdf, PDF24, TinyWow, Toolsped (62)", weak: "Browser mein (bina upload) PDF — bohat kam; baqi upload + daily limit + paywall" },
  { category: "Developer Tools", strong: "CyberChef, IT Tools, MiniWebtool, Toolsped", weak: "API sirf MiniWebtool ke paas" },
  { category: "Student Tools", strong: "Omni, Soup, GeoGebra/Desmos, Toolsped (GPA, SAT/GRE)", weak: "Pakistani exams: MDCAT/ECAT/NUST/GIKI/matric/FSc/CGPA — sirf PakDar aur ToolsBuilt" },
  { category: "Small Business", strong: "SolveIndex, Toolsped (platform fees, break-even)", weak: "PKR invoicing, GST, filer/non-filer WHT — sirf PK specialists" },
  { category: "Home / Construction", strong: "Inch (sab se mazboot), Toolsped (107)", weak: "PKR construction (cement bags, marla/kanal plot) — sirf RupayaTools (India)" },
  { category: "Islamic", strong: "Ilm Tools (70), IslamicTool (28), IslamicInfo (12+)", weak: "Urdu Islamic tools, Khums, Wirasat, Fitrana, Qurbani share — sirf Ghulmil" },
  { category: "Agriculture", strong: "FertDose, VIPTools, TechnicalKisan, Fibub (22)", weak: "Kisi generalist ka farm section hi nahi" },
];

export const FEATURE_GAPS = [
  { feature: "Step-by-step", status: "Soup/Good Calculators/Toolsped par kuch tools mein free; Wolfram, Symbolab, Mathway par paywall (~$10/mo)" },
  { feature: "Formula + example", status: "Omni, calculator.net, Soup, SumKitTool dete hain; 600+ tools wali aksar sites sirf result dikhati hain" },
  { feature: "Dark mode", status: "Web par bohat kam: sirf CalculatorApp.me. Koi Tier A site advertise nahi karti" },
  { feature: "Offline / PWA", status: "Taqreeban ghayab: sirf CalculatorApp.me (PWA). Miryori ke mutabiq bari sites mein se koi offline app nahi" },
  { feature: "Embed", status: "Omni: application + approval + logo + link-back. CalculateItNow aur CalculatorApp.me: instant" },
  { feature: "API", status: "Sirf MiniWebtool (1,080 tools, REST + MCP). Omni/calculator.net ki koi API nahi" },
  { feature: "History / save", status: "Sirf CalculatorApp.me (local history). Koi bari web site save/share-result link nahi deti" },
  { feature: "PDF export", status: "Sirf CalculatorApp.me. Koi Tier A site nahi deti — baqi sirf print view" },
  { feature: "Speed / mobile", status: "RapidTables sab se tez (taqreeban no-JS); Omni ka JS bundle heavy hai, slow connection par sust" },
  { feature: "Rates ki freshness", status: "Sab se kamzor point: nisab, tax slabs, bijli tariff purane milte hain. Sirf chand sites tareekh ke saath rate deti hain" },
];

export const EARNING_MODELS = [
  { model: "AdSense / display", detail: "Default hai: calculator.net (AdSense), Calculator Soup (AdSense), Calculator.io (AdSense), calculate.at (ad-supported), Good Calculators (Ezoic), Miryori (Adsterra), PDF24 (ads). In par koi subscription nahi." },
  { model: "Freemium", detail: "Wolfram Pro ~$5-10/mo, Symbolab ~$10/mo, Mathway ~$10/mo, Photomath Plus ~$10/mo, iLovePDF Premium ~$4/mo, Smallpdf Pro ~$9/mo. Free tier jaan boojh kar mehdood hai — daily PDF limits, steps band." },
  { model: "No-ads farq", detail: "ToolsBuilt bilkul ads-free hai; Muxtly/Toolsped paywall nahi rakhte; CalculatorApp.me ads/limits nahi rakhta. In ka revenue model verify nahi ho saka." },
  { model: "Affiliate / lead-gen", detail: "SmartAsset, Bankrate, NerdWallet finance calculators ko lead-gen ke tor par chalate hain. Koi generalist transparent affiliate nahi karta — mauqa hai, lekin bharose ka risk bhi." },
  { model: "Free site ka raasta", detail: "Core hamesha free + no-upload privacy pitch banao. Kamai: (1) sirf result pages par halke ads, (2) jo features muqabilay wale bechte hain (PDF export, history, API, embed) pehle free de kar users jeeto, (3) affiliate sirf wahan jahan wo khud jawab ho, disclosure ke saath." },
];

export const EMPTY_NICHES = [
  { niche: "Pakistani students", detail: "MDCAT/ECAT/NUST/GIKI/PIEAS/UET/COMSATS aggregates, matric/FSc percentage, CGPA to percentage — sirf PakDar aur ToolsBuilt." },
  { niche: "Farmers", detail: "Khad boriyon mein (urea/DAP/MOP/SOP), beej ki miqdar, mandi/fasal prices, tube-well cost, livestock/poultry munafa — ye searches sabit shuda hain, lekin kisi generalist ke paas farm section nahi." },
  { niche: "Small business (PK)", detail: "GST 18% invoicing, filer vs non-filer WHT finder, salary slip/payroll, dukaan ka munafa, committee — sirf HissabAI, Haadi aur (USD mein) Toolsped." },
  { niche: "Islamic finance", detail: "Murabaha, Ijarah, Sukuk, Wirasat, Khums, Fitrana, Qurbani share — sirf IslamicTool (Murabaha) aur Ghulmil ke paas kuch hai. Urdu mein kisi ke paas nahi." },
  { niche: "Family / AI-era", detail: "Jahez/wedding budget ya EOBI/pension planning PKR mein kahin nahi mili; LLM API cost (Vanta Calc) aur AI ROI (ROIStack) 2026 ke naye tools hain, kisi generalist ke paas nahi." },
];

export const GAP_TEXT = {
  language: "1. Zabaan — Urdu sab se bara khaali maidan hai. Bari sites ke hreflang check mein koi translated version nahi mila. MiniWebtool ki 15 zabaano mein bhi Urdu, Hindi, Arabic nahi. Miryori ki 9 zabaanein: EN, ES, FR, DE, AR, PT, JA, KO, ZH — Urdu phir bhi nahi. Full Urdu UI sirf chhoti nayi sites par: ToolsBuilt (Urdu/Arabic/Hindi, RTL), CalculatorBaba (29 tools), DigitalSpot, Ghulmil. Kisi ke paas 50 se zyada tools nahi. Roman Urdu — jis tarah aksar Pakistani type aur search karte hain — sirf HissabAI ke WhatsApp tracker aur PakDar ke translators mein hai. Matlab: 54 tools par bhi full Urdu + Roman Urdu toggle wo farq hai jo 100+ tools wali koi site nahi deti.",
  pakistan: "2. Pakistan tools — bara equivalent abhi bana hi nahi. calculator.net ka tax calculator sirf US ka hai, Omni ki finance generic/US hai. Zakat ka sarkari nisab 1447 AH ke liye Rs 503,529 hai (ToolsFluent / Pakistan Edition) — Ilm Tools ke page par abhi bhi Rs 252,000 hai, yani purana aur ghalat. Jo cheez specialists par bhi kamzor hai: tola mein live Sarafa gold rate, current month ka NEPRA/FPA bijli bill (HissabAI Feb 2026 ka tariff deta hai, Pakistan Edition July 2025 ka — dono mahino mein purane ho jate hain), PTA mobile tax (sirf Pakistan Edition), EOBI/pension, committee (BC) calculator (sirf HissabAI). India ko RupayaTools (874+, Nov 2026) ne cover kar liya hai. Pakistan ka bara equivalent abhi — yehi sab se saaf mauqa hai.",
  features: "3. Features — jo badi sites nahi detin ya bechti hain. Step-by-step: Soup/Good Calculators/Toolsped par kuch tools mein free; Wolfram, Symbolab, Mathway par paywall (~$10/mo). Formula + example: Omni, calculator.net, Soup, SumKitTool dete hain; 600+ tools wali aksar sites sirf result dikhati hain. Dark mode: web par bohat kam, sirf CalculatorApp.me. Offline/PWA: taqreeban ghayab, sirf CalculatorApp.me. Embed: Omni application + approval mangta hai, CalculateItNow aur CalculatorApp.me instant. API: sirf MiniWebtool. History/save aur PDF export: sirf CalculatorApp.me. Speed: RapidTables sab se tez, Omni ka JS bundle heavy hai. Rates ki freshness sab se kamzor point hai.",
};

export const SOURCES = [
  "Research report (26 Nov 2026)",
  "Live checks: calculator.net, omnicalculator.com, toolsped.com",
  "Directories/comparisons: Miryori, PeerPush, AlternativeTo, SaaSHub, Listme, Produk.co, CalculateItNow",
  "Estimates: SimilarWeb, SEMrush, HypeStat",
  "Pakistan/Urdu: hissabai.com, pktaxcalc.com, toolsfluent.com, pakdar.com, toolsbuilt.com, calculatorbaba.com, ghulmil.net",
  "Islamic: ilm-tools, islamictool.com, islamicinfo.org",
  "Agriculture: fertdose.com, viptools.pk, technicalkisan.com",
  "Features: calculatorapp.me, MiniWebtool, Omni embed page",
];

export const DISCLAIMER = "Traffic aur kamai ke saare figures estimates hain (SimilarWeb / SEMrush / HypeStat) aur sources aapas mein mukhtalif hain — is liye jahan range hai, wahan range hi di gayi hai. Tool counts sites ki apni ginti hain, 26 Nov 2026 ki tareekh par. Jo cheez verify nahi ho saki, use 'n/v' likha hai.";

export const NOT_VERIFIED = "Traffic par SimilarWeb aur SEMrush ~2 guna mukhtalif hain (calculator.net: 40.3M vs 77.32M, Oct 2026); kisi site ka primary (Google Analytics) figure maujood nahi. GigaCalculator, PlanetCalc, Calculatored, EasyCalculation, ConvertUnits ke tool counts verify nahi hue (n/v). Kuch sites ke ads aik page ke check se confirm nahi hote — page par ads na milna ads-free hone ka saboot nahi. Kisi site ki asal kamai primary source se verify nahi ho saki.";
