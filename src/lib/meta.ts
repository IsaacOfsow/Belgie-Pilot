import { edition } from "@/config/edition";

export const meta = (title: string, description: string, extra: { image?: string; type?: "website" | "article" } = {}) => [
  { title: `${title} — ${edition.brandName}` },
  { name: "description", content: description },
  { property: "og:title", content: `${title} — ${edition.brandName}` },
  { property: "og:description", content: description },
  { property: "og:type", content: extra.type ?? "website" },
  { property: "og:locale", content: edition.language.replace("-", "_") },
  { property: "og:site_name", content: edition.brandName },
  ...(extra.image ? [{ property: "og:image", content: extra.image }] : []),
];

/** Canonical-link, alleen als er een domein is toegewezen (src/config/edition.ts). */
export const canonical = (path: string) => (edition.domain ? [{ rel: "canonical", href: `https://${edition.domain}${path}` }] : []);
