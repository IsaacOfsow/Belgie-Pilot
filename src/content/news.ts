/**
 * NIEUWS — één plek voor alle artikelen op het portaal.
 *
 * Bronnen:
 *  1. `editorial`     — eigen artikels van de redactie (volledige tekst in `body`).
 *  2. `news-feed.json` — verzamelde berichten, gevuld door de scraper (zie docs/NIEUWS-FEED.md).
 *  3. `sampleFeed`    — fictieve voorbeeldberichten voor de pilot. Ze verdwijnen vanzelf zodra de
 *                       scraper genoeg echte berichten aanlevert (zie MIN_REAL_ITEMS).
 *
 * Voor verzamelde berichten tonen we alleen kop, korte samenvatting en een link naar de bron.
 */
import hero from "@/assets/hero.jpg";
import vakmanschap from "@/assets/theme-vakmanschap.jpg";
import innovatie from "@/assets/theme-innovatie.jpg";
import duurzaamheid from "@/assets/theme-duurzaamheid.jpg";
import familie from "@/assets/theme-familie.jpg";
import zorg from "@/assets/theme-zorg.jpg";
import internationaal from "@/assets/theme-internationaal.jpg";
import scraped from "./news-feed.json";

/** Toon een "Demo"-label bij voorbeeldartikels. Voor de pilot uit; zet op true om ze te markeren. */
export const SHOW_DEMO_LABELS = false;
/** Zodra de scraper minstens zoveel geldige berichten levert, verdwijnen alle voorbeeldartikels. */
export const MIN_REAL_ITEMS = 6;

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
  publishedAt: string; // YYYY-MM-DD
  image: string;
  /** Eigen artikel: volledige tekst, één alinea per item. */
  body?: string[];
  /** Verzameld artikel: bron met naam en link. */
  source?: { name: string; url: string };
  author?: string;
  featured?: boolean;
  video?: boolean;
  /** Voorbeeldinhoud (fictief). */
  demo?: boolean;
};

const categoryImage: Record<string, string> = { vlaanderen: vakmanschap, wallonie: duurzaamheid, brussel: zorg, europa: internationaal, beleid: hero };

/** Eigen redactionele artikels (voorbeeld). */
export const editorial: Article[] = [
  {
    slug: "kmos-zetten-stap-naar-automatisering", title: "Kmo's zetten de stap naar automatisering: eerst de werkvloer, dan de robot",
    category: "vlaanderen", publishedAt: "2026-10-06", image: innovatie, featured: true, author: "Redactie", demo: true,
    excerpt: "Kleine productiebedrijven investeren steeds vaker in automatisering. Wat werkt, wat mislukt en wat kost het echt?",
    body: [
      "Wie de werkplaats van een middelgroot metaalbedrijf in West-Vlaanderen binnenstapt, ziet het meteen: tussen de draaibanken staat sinds dit voorjaar een compacte robotarm. Hij laadt onderdelen, terwijl de operatoren zich op afwerking en controle richten.",
      "De zaakvoerder zegt dat de investering niet draaide om minder mensen, maar om meer capaciteit met hetzelfde team. Het project begon klein: één machine, één product, drie maanden testen. Pas daarna volgde een tweede lijn.",
      "Die aanpak komt vaak terug bij kmo's die slagen. Ze starten met een duidelijk afgebakend probleem, betrekken de medewerkers vanaf dag één en meten vooraf wat ze willen winnen. Bedrijven die met een groot plan en een grote machine beginnen, haken vaker af.",
      "Wat het kost, hangt sterk af van de toepassing. Een eenvoudige laadcel is voor veel kmo's haalbaar; een volledig geïntegreerde lijn vraagt een ander budget en een andere planning. Wie twijfelt, vraagt best eerst een proefopstelling.",
    ],
  },
  {
    slug: "familiebedrijf-draagt-stokje-over", title: "Een familiebedrijf draagt het stokje over: wat behoud je, wat verander je?",
    category: "vlaanderen", publishedAt: "2026-10-04", image: familie, author: "Redactie", demo: true,
    excerpt: "Drie generaties, één werkplaats en een overdracht die zorgvuldig werd voorbereid.",
    body: [
      "In een Limburgs familiebedrijf zijn vader en dochter al twee jaar bezig met de overdracht. Ze begonnen met een eenvoudige afspraak: elke maand één uur praten over wat blijft en wat mag veranderen.",
      "Het resultaat is een bedrijf dat zijn ambacht bewaart, maar sneller en digitaler werkt. De klanten merken vooral dat offertes sneller klaar zijn. De medewerkers merken dat de nieuwe zaakvoerder vaker op de vloer staat.",
      "Volgens de familie lag de grootste uitdaging niet in de cijfers, maar in het loslaten. Het advies van de dochter aan anderen: spreek vroeg af wie wat beslist, en schrijf het op.",
    ],
  },
  {
    slug: "exporteurs-kijken-naar-nieuwe-markten", title: "Belgische exporteurs kijken verder dan de buurlanden",
    category: "europa", publishedAt: "2026-10-03", image: internationaal, author: "Redactie", demo: true,
    excerpt: "Waar groeien Belgische bedrijven over de grens en welke fouten maken ze bij hun eerste exportmarkt?",
    body: [
      "De meeste Belgische kmo's beginnen hun export bij de buren. Maar een groeiende groep kijkt verder: naar Scandinavië, Zuid-Europa en Oost-Europa, waar vraag en concurrentie anders liggen.",
      "Exportbegeleiders merken dat de beste voorbereiding vaak banaal is: taal, betalingsvoorwaarden en een lokale partner. Wie die drie op orde heeft, loopt minder risico.",
      "Een veelgemaakte fout is te snel te veel markten tegelijk te willen bedienen. Het advies: kies één markt, leer die kennen en bouw van daaruit verder.",
    ],
  },
  {
    slug: "duurzamer-produceren-zonder-marge-te-verliezen", title: "Duurzamer produceren zonder dat de marge verdwijnt",
    category: "wallonie", publishedAt: "2026-10-02", image: duurzaamheid, author: "Redactie", demo: true,
    excerpt: "Een Waalse producent toont hoe energiebesparing en circulaire materialen samen een gezonde marge opleveren.",
    body: [
      "Een Waals productiebedrijf besliste twee jaar geleden om zijn energieverbruik stap voor stap te verlagen. Eerst kwamen de eenvoudige ingrepen: isolatie, warmteterugwinning en slimmere planning van de machines.",
      "Pas daarna volgden de grotere investeringen. Elke stap moest zich binnen een vaste termijn terugbetalen, anders ging hij niet door. Zo bleef de marge intact.",
      "De zaakvoerder noemt het grootste voordeel niet de besparing, maar de zekerheid: minder afhankelijk van schommelende energieprijzen en een sterker verhaal naar klanten.",
    ],
  },
];

type Sample = { title: string; excerpt: string; category: string; publishedAt: string; source: string; image?: string; video?: boolean };

/** Fictieve voorbeeldberichten — alleen voor de pilot. Bronnen en inhoud zijn verzonnen. */
const sampleRaw: Sample[] = [
  { title: "Nieuwe steunmaatregel moet investeringen van kmo's versnellen", category: "beleid", publishedAt: "2026-10-06", source: "Kmo Kompas",
    excerpt: "Een nieuwe regeling wil investeringen in machines en digitalisering aantrekkelijker maken voor kleine bedrijven. Ondernemersorganisaties vragen vooral een eenvoudige aanvraagprocedure." },
  { title: "Zorgsector zoekt versnelling bij digitale patiëntendossiers", category: "brussel", publishedAt: "2026-10-05", source: "Regio Ondernemen", image: zorg,
    excerpt: "Brusselse zorgaanbieders willen sneller werken met gedeelde dossiers, maar botsen op uiteenlopende systemen en strenge privacyregels." },
  { title: "Europese regels voor verpakkingen worden strenger: wat verandert er?", category: "europa", publishedAt: "2026-10-05", source: "Pilot Wire",
    excerpt: "Nieuwe Europese verpakkingsregels dwingen producenten om materialen te herzien. Een overzicht van de belangrijkste deadlines en wat bedrijven nu al kunnen doen." },
  { title: "Debat over administratieve lasten: ondernemers vragen concrete stappen", category: "beleid", publishedAt: "2026-10-04", source: "Kmo Kompas", video: true, image: hero,
    excerpt: "In de Kamer botsten meerderheid en oppositie over de vereenvoudiging van administratieve verplichtingen. Ondernemers willen vooral duidelijke deadlines." },
  { title: "Havenbedrijf investeert in elektrische kranen en walstroom", category: "vlaanderen", publishedAt: "2026-10-03", source: "Pilot Wire", image: innovatie,
    excerpt: "Een Vlaamse haventerminal vervangt oudere dieselkranen door elektrische varianten. De investering moet uitstoot en geluid beperken." },
  { title: "Waalse start-ups halen nieuwe financiering op", category: "wallonie", publishedAt: "2026-10-02", source: "Regio Ondernemen", image: internationaal,
    excerpt: "Jonge technologiebedrijven uit Wallonië sluiten financieringsrondes af. Investeerders wijzen op sterke technische teams en een groeiende klantenbasis." },
  { title: "Brusselse horeca zoekt oplossingen voor personeelstekort", category: "brussel", publishedAt: "2026-10-01", source: "Regio Ondernemen", image: familie,
    excerpt: "Restaurants en hotels in de hoofdstad zoeken nieuwe manieren om medewerkers te vinden en te houden, van flexibele roosters tot interne opleidingen." },
  { title: "Energieprijzen en industrie: wat de laatste cijfers betekenen", category: "europa", publishedAt: "2026-10-01", source: "Pilot Wire", image: vakmanschap,
    excerpt: "Een overzicht van de recente evolutie van de energiekosten en wat dat betekent voor energie-intensieve productiebedrijven in België." },
  { title: "Vakmensen gezocht: opleidingscentra breiden aanbod uit", category: "vlaanderen", publishedAt: "2026-09-30", source: "Kmo Kompas", image: vakmanschap,
    excerpt: "Opleidingscentra voor technische beroepen verwachten meer cursisten en breiden hun aanbod uit, in nauwe samenwerking met bedrijven." },
  { title: "Circulaire economie: Waalse producenten delen restmaterialen", category: "wallonie", publishedAt: "2026-09-30", source: "Pilot Wire", image: duurzaamheid,
    excerpt: "Een netwerk van Waalse producenten ruilt restmaterialen en bespaart zo grondstoffen en afvalkosten." },
  { title: "Handelsmissie naar Scandinavië trekt recordaantal bedrijven", category: "europa", publishedAt: "2026-09-29", source: "Regio Ondernemen", image: internationaal,
    excerpt: "Een geplande handelsmissie naar Noord-Europa kent veel belangstelling van Belgische kmo's uit voeding, technologie en bouw." },
  { title: "Gesprek met een zaakvoerder over opvolging: 'Begin vroeg met praten'", category: "vlaanderen", publishedAt: "2026-09-29", source: "Pilot Wire", video: true, image: familie,
    excerpt: "Een zaakvoerder blikt terug op zijn overdracht en geeft tips aan collega's die binnenkort hetzelfde moeten doen." },
];

// ——— Helpers voor de scraper-feed ———
export type RawFeedItem = {
  title: string; url: string; source: string; publishedAt: string;
  excerpt?: string; image?: string; category?: string; slug?: string; video?: boolean;
};

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70);
const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h).toString(36).slice(0, 5); };
const stripHtml = (s: string) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const isoDay = (s: string) => { const d = new Date(s); return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10); };

function normalizeCategory(c?: string): string {
  const v = (c ?? "").toLowerCase().trim();
  return categories.find((x) => x.slug === v || x.label.toLowerCase() === v)?.slug ?? "vlaanderen";
}

/** Zet een ruw feed-item om naar een Article. Ongeldige items geven null. */
export function fromFeed(raw: RawFeedItem): Article | null {
  const day = isoDay(raw.publishedAt);
  if (!raw.title || !raw.url || !raw.source || !day) return null;
  const category = normalizeCategory(raw.category);
  const excerpt = stripHtml(raw.excerpt ?? "").slice(0, 220);
  return {
    slug: raw.slug ? slugify(raw.slug) : `${slugify(raw.title)}-${hash(raw.url)}`,
    title: stripHtml(raw.title), excerpt, category, publishedAt: day,
    image: raw.image || categoryImage[category] || hero,
    source: { name: raw.source, url: raw.url },
    ...(raw.video ? { video: true } : {}),
  };
}

const sampleFeed: Article[] = sampleRaw.map((s) => ({
  slug: slugify(s.title), title: s.title, excerpt: s.excerpt, category: s.category, publishedAt: s.publishedAt,
  image: s.image ?? categoryImage[s.category] ?? hero,
  source: { name: s.source, url: "https://example.com/" }, demo: true, ...(s.video ? { video: true } : {}),
}));

const real: Article[] = (scraped as unknown as RawFeedItem[]).map(fromFeed).filter((a): a is Article => a !== null);
const useSamples = real.length < MIN_REAL_ITEMS;

/** Alle artikelen, nieuwste eerst. */
export const articles: Article[] = [...editorial.filter((a) => !a.demo || useSamples), ...real, ...(useSamples ? sampleFeed : [])]
  .filter((a, i, all) => all.findIndex((b) => b.slug === a.slug) === i)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const articlesIn = (category: string) => articles.filter((a) => a.category === category);

const dateFmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Brussels" });
const shortFmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "short", timeZone: "Europe/Brussels" });
export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T12:00:00Z`));
export const formatShort = (iso: string) => shortFmt.format(new Date(`${iso}T12:00:00Z`));
