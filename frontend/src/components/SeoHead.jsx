import { Helmet } from "react-helmet-async";
import { pageMeta, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "../config/seo.js";
import { SITE_NAME } from "../config/site.js";

// Unique title / description / canonical / OG per page, plus optional JSON-LD.
// No fake reviews, ratings or prices are ever added to structured data.
// canonical={false} is for the 404 page: no canonical, no og:url, noindex.
export default function SeoHead({ title, description, path, jsonLd, type = "website", noindex = false, canonical = true }) {
  const meta = pageMeta({ title, description, path, type });
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {canonical ? <link rel="canonical" href={meta.canonical} /> : null}
      <meta name="robots" content={noindex ? "noindex,follow" : "index,follow"} />
      <meta name="theme-color" content="#1a5276" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={meta.canonical} /> : null}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content="Tools Websites Directory — 78 tools websites ki directory, tiers A se F tak" />
      <meta property="og:locale" content="ur_PK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
}
