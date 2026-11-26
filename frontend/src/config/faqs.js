// FAQ content shared by the React pages and the prerender step.
// All answers are grounded in the research report / directory data —
// no invented figures, no promises of live rates. Keep in sync with
// frontend/src/pages/*.jsx (which render these) and scripts/prerender.mjs.
export const HOME_FAQS = [
  {
    q: "Sab se badi calculator website kaun si hai?",
    a: "Omni Calculator — 3,938 tools ke saath sab se badi hai. calculator.net ~200 tools ke saath doosri badi mashhoor site hai. Dono sirf English mein hain; poori comparison Tier A mein hai."
  },
  {
    q: "Best calculator website kaun si hai?",
    a: "Kaam par munhasir hai: aam hisaab ke liye calculator.net, gehri wazahat aur formulas ke liye Omni Calculator, aur maths ke steps ke liye Calculator Soup. Best sites ki poori list Tier A page par hai."
  },
  {
    q: "Kya yeh calculator websites free hain?",
    a: "Zyada tar free hain — calculator.net, Omni, Soup aur Toolsped bina sign-up ke muft hain. Sirf Wolfram Alpha, Symbolab aur Mathway step-by-step ke liye ~$10/month lete hain."
  },
  {
    q: "Pakistan mein best calculator website kaun si hai?",
    a: "Pakistan ke tools ke liye Tier D dekhein: FBR tax aur bijli bill ke liye HissabAI, MDCAT aur university aggregates ke liye PakDar, aur slab-by-slab tax ke liye PKTaxCalc."
  },
  {
    q: "Kya Urdu mein calculator website hai?",
    a: "Bari sites mein nahi — Omni aur calculator.net sirf English mein hain. Urdu ToolsBuilt, CalculatorBaba aur Ghulmil par milti hai; Ghulmil poori tarah Urdu-first hai."
  }
];

export const SITES_FAQS = [
  {
    q: "Is list mein kitni sites hain aur kaun si free hain?",
    a: "78 sites hain — zyada tar free hain. Wolfram Alpha, Symbolab aur Mathway ke full steps paid hain (~$10/month); baaki har site ke notes mein us ki pricing likhi hai."
  },
  {
    q: "Calculator websites list — sab se badi kaun si hai?",
    a: "Omni Calculator (3,938 tools), phir Inch Calculator (3,500+) aur MiniWebtool (2,022). Poori list tier ke hisaab se filter ki ja sakti hai."
  }
];

export const TOP10_FAQS = [
  {
    q: "Which is the best calculator website?",
    a: "Aam istemal ke liye calculator.net, gehri wazahat aur formulas ke liye Omni Calculator (3,938 tools), aur maths ke steps ke liye Calculator Soup. Koi aik site har kaam ke liye best nahi — Tier A page par poori comparison hai."
  },
  {
    q: "What are the best alternatives to calculator.net?",
    a: "Omni Calculator (sab se bara catalogue), Calculator Soup (maths aur steps), aur Inch Calculator (construction aur conversions). Teeno free hain aur Tier A mein listed hain."
  },
  {
    q: "What are the best alternatives to Omni Calculator?",
    a: "calculator.net (tez aur simple), Calculator Soup (maths par gehra), aur MiniWebtool (2,022 tools + API). Omni ki wazahat sab se lambi hai, lekin ye teeno muft aur tez hain."
  },
  {
    q: "calculator.net vs Omni Calculator — which is better?",
    a: "Catalogue mein Omni aage hai (3,938 tools vs ~200), aur us ki wazahat aur formulas bhi gehri hain. calculator.net tez aur simple hai aur us ka traffic zyada hai (~40–77M visits/month, estimate). Aam user ke liye calculator.net, research ke liye Omni."
  },
  {
    q: "calculator.net vs Calculator Soup — which is better?",
    a: "calculator.net har tarah ke tools deta hai (finance, health, maths), jab ke Calculator Soup maths, statistics aur geometry mein gehra hai aur kai tools mein darmiyani steps bhi dikhata hai. Maths ke liye Soup, baaki sab ke liye calculator.net."
  }
];

export const GAPS_FAQS = [
  {
    q: "Pakistan users ko kaun se tools nahi milte?",
    a: "FBR tax, bijli ka bill, Zakat tola mein aur marla — ye sab kisi bari tools website par nahi hain. Sirf chhoti Pakistan sites (HissabAI, PakDar, PKTaxCalc) ye deti hain; poori list Tier D mein hai."
  },
  {
    q: "Bari calculator websites par Urdu kyun nahi hai?",
    a: "Omni, calculator.net aur baaki giants sirf English mein hain — MiniWebtool ki 15 zabaano mein bhi Urdu nahi. Full Urdu interface sirf chhoti sites (ToolsBuilt, CalculatorBaba, Ghulmil) par hai, 50 tools se kam wali."
  },
  {
    q: "Free step-by-step solutions kahan milte hain?",
    a: "Wolfram Alpha, Symbolab aur Mathway steps ke liye ~$10/month lete hain. Muft mein steps Calculator Soup, SumKitTool aur Toolsped ke kuch tools par milte hain."
  },
  {
    q: "Nayi tools website ke liye sab se bara mauqa kya hai?",
    a: "Teen cheezein: full Urdu interface, Pakistan ke current tools (FBR, Zakat, bijli), aur har tool par free steps + PDF export. Ye teeno aik saath kisi bari site ke paas nahi hain."
  }
];

// Tier-specific FAQs (only tiers d/e/f have them — the Pakistan, Islamic
// and farmer clusters are where users ask comparison questions).
export const TIER_FAQS = {
  d: [
    {
      q: "Pakistan mein best calculator website kaun si hai?",
      a: "Kaam par munhasir hai: FBR salary tax aur bijli bill ke liye HissabAI, MDCAT aur university aggregates ke liye PakDar, aur slab-by-slab tax working ke liye PKTaxCalc. Teeno Tier D mein listed hain."
    },
    {
      q: "FBR tax calculator Pakistan ke liye best site kaun si hai?",
      a: "HissabAI (FBR 2026-27 salary tax), PKTaxCalc (slab-by-slab working, Rs 600k tak tax-free) aur ToolsFluent (old-vs-new tax). FBR ke slabs har saal badalte hain — hamesha site par current year check karein."
    },
    {
      q: "Bijli bill calculator — LESCO, IESCO, K-Electric ke liye best site?",
      a: "HissabAI (NEPRA Feb 2026 tariff), PakDar aur The Pakistan Edition bijli bill dete hain. Tariff badal sakta hai — bill hamesha site par live check karein."
    },
    {
      q: "CGPA calculator Pakistan — HEC formula wali best site kaun si hai?",
      a: "PakDar (48+ tools) aur ToolsBuilt (matric/FSc/university marks, PKR default) CGPA aur percentage dete hain. HEC ka 4.0 scale istemal hota hai."
    },
    {
      q: "MDCAT aggregate calculator ke liye best site?",
      a: "PakDar — MDCAT aggregate PMDC ke 10/40/50 formula par, aur NUST, GIKI, PIEAS, UET aur COMSATS ke aggregates bhi."
    },
    {
      q: "Kya Urdu calculator website hai?",
      a: "Haan — Ghulmil poori tarah Urdu-first hai (Urdu keyboard, Zakat, Hijri, gold tola), ToolsBuilt Urdu samet 9 zabaanein deta hai, aur CalculatorBaba English + Urdu hai. Bari international sites sirf English mein hain."
    }
  ],
  e: [
    {
      q: "Zakat calculator Pakistan — best site kaun si hai?",
      a: "IslamicTool (Zakat + live nisab, Faraid, Murabaha), IslamicInfo (live nisab) aur Ilm Tools (70 tools). Note: Ilm Tools ka nisab figure purana hai (Rs 252,000) — hamesha live nisab wali site check karein."
    },
    {
      q: "Zakat calculator Urdu mein hai?",
      a: "Ghulmil Urdu mein Zakat aur Khums deta hai. Ilm Tools aur IslamicTool sirf English mein hain."
    },
    {
      q: "Islamic finance calculator Pakistan ke liye kaun si site hai?",
      a: "IslamicTool — Murabaha calculator, inheritance (Faraid) aur Zakat live nisab ke saath. Wirasat aur Khums ke liye Ghulmil bhi dekhein."
    }
  ],
  f: [
    {
      q: "Kheti / agriculture calculator Pakistan ke liye best sites?",
      a: "FertDose (NPK dose per acre/kanal/marla, crop library) aur VIPTools.pk (urea/DAP/SOP boriyan, maunds/acre munafa, tube-well bijli) — dono Pakistan ke liye hain."
    },
    {
      q: "Mandi prices aur beej ki miqdar kahan check karein?",
      a: "TechnicalKisan (9 faslon ki khad, 27 faslon ka seed rate, mandi prices) aur FertDose ka planting calendar. Kisi bhi bare generalist site ka farm section nahi hai."
    }
  ]
};
