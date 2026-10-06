/**
 * VIDEO & KORTE FORMATEN — DEMO-inhoud.
 * Er zijn nog geen echte video's gekoppeld: `videoUrl: null` betekent "geen speler beschikbaar".
 * Koppelpunt: zodra een YouTube/Vimeo/CDN-link beschikbaar is, vul `videoUrl` in (of lever hem via de feed als `video_url`).
 */
import hero from "@/assets/hero.jpg";
import vakmanschap from "@/assets/theme-vakmanschap.jpg";
import innovatie from "@/assets/theme-innovatie.jpg";
import duurzaamheid from "@/assets/theme-duurzaamheid.jpg";
import familie from "@/assets/theme-familie.jpg";
import zorg from "@/assets/theme-zorg.jpg";
import internationaal from "@/assets/theme-internationaal.jpg";

export type VideoModule = "nieuws" | "interviews" | "ondernemer-van-de-week" | "tech-ai" | "business-explained" | "reportages";

export const videoModules: { id: VideoModule; label: string }[] = [
  { id: "nieuws", label: "OndernemersTV Nieuws" },
  { id: "interviews", label: "Interviews" },
  { id: "ondernemer-van-de-week", label: "Ondernemer van de Week" },
  { id: "tech-ai", label: "Tech & AI" },
  { id: "business-explained", label: "Business Explained" },
  { id: "reportages", label: "Reportages" },
];

export type Video = {
  slug: string; title: string; summary: string; module: VideoModule;
  /** Slug van het programma (src/content/portal.ts). */
  programme: string;
  duration: string; publishedAt: string; image: string;
  videoUrl: string | null;
  demo: boolean;
};

export const videos: Video[] = [
  { slug: "nieuwsoverzicht-van-de-dag", title: "Het zakelijke nieuws van de dag in drie minuten", summary: "De belangrijkste economische en ondernemersberichten kort samengevat.", module: "nieuws", programme: "ondernemerstv-nieuws", duration: "3:12", publishedAt: "2026-10-06", image: hero, videoUrl: null, demo: true },
  { slug: "ondernemer-van-de-week-metaalbedrijf", title: "Ondernemer van de week: van werkplaats naar groeibedrijf", summary: "Een zaakvoerder vertelt hoe een klein bedrijf stap voor stap groeide.", module: "ondernemer-van-de-week", programme: "ondernemer-van-de-week", duration: "12:40", publishedAt: "2026-10-05", image: vakmanschap, videoUrl: null, demo: true },
  { slug: "ai-in-de-kmo", title: "AI in de kmo: waar begin je?", summary: "Praktische eerste stappen met slimme software in een kleine onderneming.", module: "tech-ai", programme: "tech-ai-update", duration: "6:05", publishedAt: "2026-10-04", image: innovatie, videoUrl: null, demo: true },
  { slug: "wat-is-een-kredietlijn", title: "Business Explained: wat is een kredietlijn?", summary: "Een heldere uitleg van een veelgebruikt financieringsmiddel.", module: "business-explained", programme: "business-update", duration: "4:30", publishedAt: "2026-10-03", image: hero, videoUrl: null, demo: true },
  { slug: "interview-opvolging", title: "Interview: opvolging in een familiebedrijf", summary: "Twee generaties over loslaten, vertrouwen en afspraken.", module: "interviews", programme: "de-uitblinkers", duration: "9:20", publishedAt: "2026-10-02", image: familie, videoUrl: null, demo: true },
  { slug: "reportage-haventerminal", title: "Reportage: een haventerminal in transitie", summary: "Achter de schermen bij een terminal die elektrificeert.", module: "reportages", programme: "ondernemer-in-beeld", duration: "14:15", publishedAt: "2026-10-01", image: duurzaamheid, videoUrl: null, demo: true },
  { slug: "business-update-week", title: "Business Update: de economische week", summary: "Wat er deze week gebeurde, en wat dat voor ondernemers betekent.", module: "nieuws", programme: "business-update", duration: "5:48", publishedAt: "2026-09-30", image: internationaal, videoUrl: null, demo: true },
  { slug: "zorgsector-digitaliseert", title: "Reportage: zorgaanbieders en digitale dossiers", summary: "Hoe zorgondernemers hun administratie digitaliseren.", module: "reportages", programme: "ondernemer-in-beeld", duration: "11:02", publishedAt: "2026-09-29", image: zorg, videoUrl: null, demo: true },
];
export const videoBySlug = (slug: string) => videos.find((v) => v.slug === slug);

/** "Vandaag in 60 seconden" / "Zakelijk in beeld" — korte, verticale formaten voor social. DEMO; koppelpunt: Instagram/TikTok/LinkedIn. */
export type Carousel = { id: string; title: string; slides: number; label: string; image: string; demo: boolean };
export const carousels: Carousel[] = [
  { id: "c1", title: "3 cijfers over de Belgische economie", slides: 5, label: "Economie", image: hero, demo: true },
  { id: "c2", title: "Zo start je een bv in Vlaanderen", slides: 7, label: "Ondernemen", image: vakmanschap, demo: true },
  { id: "c3", title: "AI-tools voor kleine bedrijven", slides: 6, label: "Tech & AI", image: innovatie, demo: true },
  { id: "c4", title: "Kmo-financiering in vijf stappen", slides: 5, label: "Finance", image: familie, demo: true },
];
