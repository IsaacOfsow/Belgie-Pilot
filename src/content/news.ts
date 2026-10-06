/**
 * NIEUWS — één plek voor alle artikelen op het portaal.
 *
 * Artikelen komen uit twee bronnen:
 *  1. `editorial`  — eigen artikelen van de redactie (volledige tekst in `body`).
 *  2. `feed`       — verzamelde nieuwsberichten (bv. door een scraper/RSS-import). Voor deze items tonen
 *                    we alleen kop, korte samenvatting en een link naar de bron (`source`).
 *
 * Alles met `demo: true` is voorbeeldinhoud en moet vervangen worden.
 */
import hero from "@/assets/hero.jpg";
import vakmanschap from "@/assets/theme-vakmanschap.jpg";
import innovatie from "@/assets/theme-innovatie.jpg";
import duurzaamheid from "@/assets/theme-duurzaamheid.jpg";
import familie from "@/assets/theme-familie.jpg";
import zorg from "@/assets/theme-zorg.jpg";
import internationaal from "@/assets/theme-internationaal.jpg";

export type Category = { slug: string; label: string; blurb: string };

export const categories: Category[] = [
  { slug: "vlaanderen", label: "Vlaanderen", blurb: "Ondernemen, economie en kmo's in Vlaanderen" },
  { slug: "wallonie", label: "Wallonië", blurb: "Entreprises, économie et industrie en Wallonie" },
  { slug: "brussel", label: "Brussel", blurb: "Ondernemen in en rond het Brussels Gewest" },
  { slug: "europa", label: "Europa", blurb: "Europese regels, markten en kansen voor Belgische bedrijven" },
  { slug: "beleid", label: "Beleid & politiek", blurb: "Wat beslissingen in de Kamer betekenen voor ondernemers" },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // Category slug
  publishedAt: string; // ISO-datum
  image: string;
  /** Eigen artikel: volledige tekst, alinea per item. */
  body?: string[];
  /** Verzameld artikel: bron met naam en link. */
  source?: { name: string; url: string };
  author?: string;
  featured?: boolean;
  video?: boolean;
  demo?: boolean;
};

const images = { hero, vakmanschap, innovatie, duurzaamheid, familie, zorg, internationaal };

/** Eigen redactionele artikelen. */
export const editorial: Article[] = [
  {
    slug: "demo-kmo-automatisering", title: "Voorbeeld: kmo's zetten stappen in automatisering", category: "vlaanderen",
    excerpt: "Demotekst: hoe kleine productiebedrijven stap voor stap robots en software inzetten.", publishedAt: "2026-10-05",
    image: images.innovatie, featured: true, author: "Redactie", demo: true,
    body: ["Demotekst. Dit artikel toont de opmaak van een eigen redactioneel stuk.", "Vervang dit voorbeeld door een echt artikel via src/content/news.ts."],
  },
  {
    slug: "demo-familiebedrijf-overdracht", title: "Voorbeeld: een familiebedrijf draagt het stokje over", category: "vlaanderen",
    excerpt: "Demotekst: drie generaties, één werkplaats en een nieuwe kijk op het vak.", publishedAt: "2026-10-04",
    image: images.familie, author: "Redactie", demo: true,
    body: ["Demotekst. Een tweede voorbeeldartikel om de lijstweergave te tonen."],
  },
  {
    slug: "demo-export-duitsland", title: "Voorbeeld: Belgische exporteurs kijken naar nieuwe markten", category: "europa",
    excerpt: "Demotekst: waar groeien Belgische bedrijven over de grens en wat gaat er mis?", publishedAt: "2026-10-03",
    image: images.internationaal, author: "Redactie", demo: true,
    body: ["Demotekst. Een voorbeeldartikel in de rubriek Europa."],
  },
  {
    slug: "demo-duurzame-productie", title: "Voorbeeld: duurzamer produceren zonder dat de marge verdwijnt", category: "wallonie",
    excerpt: "Demotekst: concrete investeringen en eerlijke afwegingen.", publishedAt: "2026-10-02",
    image: images.duurzaamheid, author: "Redactie", demo: true,
    body: ["Demotekst. Een voorbeeldartikel in de rubriek Wallonië."],
  },
];

/** Verzamelde berichten (bv. via scraper/RSS). Voeg hier items toe of laat een script dit bestand vullen. */
export const feed: Article[] = [
  {
    slug: "demo-feed-1", title: "Voorbeeld: nieuwe subsidieregeling voor investeringen in kmo's", category: "beleid",
    excerpt: "Demotekst: korte samenvatting van een bericht uit een externe bron, met link naar het origineel.", publishedAt: "2026-10-05",
    image: images.vakmanschap, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
  {
    slug: "demo-feed-2", title: "Voorbeeld: zorgsector zoekt versnelling in digitale dossiers", category: "brussel",
    excerpt: "Demotekst: een tweede verzameld bericht om het raster te vullen.", publishedAt: "2026-10-04",
    image: images.zorg, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
  {
    slug: "demo-feed-3", title: "Voorbeeld: Europese regels voor verpakkingen worden strenger", category: "europa",
    excerpt: "Demotekst: wat verandert er voor producenten en wanneer?", publishedAt: "2026-10-03",
    image: images.duurzaamheid, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
  {
    slug: "demo-feed-4", title: "Voorbeeld: debat over administratieve lasten voor ondernemers", category: "beleid",
    excerpt: "Demotekst: samenvatting van een debat in de Kamer.", publishedAt: "2026-10-02",
    image: images.hero, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true, video: true,
  },
  {
    slug: "demo-feed-5", title: "Voorbeeld: havenbedrijf investeert in elektrische kranen", category: "vlaanderen",
    excerpt: "Demotekst: een bericht over logistiek en energie.", publishedAt: "2026-10-01",
    image: images.innovatie, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
  {
    slug: "demo-feed-6", title: "Voorbeeld: Waalse start-ups halen financiering op", category: "wallonie",
    excerpt: "Demotekst: nieuwe financieringsronde voor jonge technologiebedrijven.", publishedAt: "2026-09-30",
    image: images.internationaal, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
  {
    slug: "demo-feed-7", title: "Voorbeeld: Brusselse horeca over personeelstekort", category: "brussel",
    excerpt: "Demotekst: wat ondernemers doen om medewerkers te vinden.", publishedAt: "2026-09-29",
    image: images.familie, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
  {
    slug: "demo-feed-8", title: "Voorbeeld: energieprijzen en de gevolgen voor de industrie", category: "europa",
    excerpt: "Demotekst: een overzicht van de laatste cijfers.", publishedAt: "2026-09-28",
    image: images.vakmanschap, source: { name: "Voorbeeldbron", url: "https://example.com/" }, demo: true,
  },
];

/** Alle artikelen, nieuwste eerst. */
export const articles: Article[] = [...editorial, ...feed].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const articlesIn = (category: string) => articles.filter((a) => a.category === category);

const dateFmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Brussels" });
const shortFmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "short", timeZone: "Europe/Brussels" });
export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T12:00:00Z`));
export const formatShort = (iso: string) => shortFmt.format(new Date(`${iso}T12:00:00Z`));
