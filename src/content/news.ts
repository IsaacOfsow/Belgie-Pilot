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
import { edition } from "@/config/edition";
import { parseStatus, parseUrgency, type ArticleRecord, type ArticleRecordAliases, type PublicationStatus, type Urgency } from "./cms";

/** Toon een "Demo"-label bij voorbeeldartikels. Voor de pilot uit; zet op true om ze te markeren. */
export const SHOW_DEMO_LABELS = edition.pilot.enabled && edition.pilot.labelDemoArticles;
/** Pilotmodus aan: demo-artikels krijgen op de artikelpagina een korte pilotnotitie. */
export const PILOT_MODE = edition.pilot.enabled;
/** Zodra de scraper minstens zoveel geldige berichten levert, verdwijnen alle voorbeeldartikels. */
export const MIN_REAL_ITEMS = 6;

export type Category = { slug: string; label: string; blurb: string };

/** Categorieën komen uit de editie-configuratie (src/config/edition.ts). */
export const categories: Category[] = edition.categories;
const DEFAULT_CATEGORY = categories[0]?.slug ?? "ondernemen";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // Category slug
  publishedAt: string; // YYYY-MM-DD
  /** Publicatietijd (HH:mm, lokale tijd) als die bekend is. */
  publishedTime?: string;
  image: string;
  /** Eigen artikel: volledige tekst, één alinea per item. */
  body?: string[];
  /** Verzameld artikel: bron met naam en link ("Bron" / "Originele bron"); `checked` = laatst gecontroleerd. */
  source?: { name: string; url: string; checked?: string };
  /** Voorbereide teksten voor social (LinkedIn/Facebook) en de status ervan. Nog niet gekoppeld. */
  social?: { linkedin?: string; facebook?: string; status?: string };
  author?: string;
  featured?: boolean;
  video?: boolean;
  videoUrl?: string;
  urgency?: Urgency;
  breaking?: boolean;
  tags?: string[];
  language?: string;
  region?: string;
  status?: PublicationStatus;
  /** Voorbeeldinhoud (fictief). */
  demo?: boolean;
};

const categoryImage: Record<string, string> = {
  ondernemen: vakmanschap, economie: hero, kmo: familie, "start-ups": internationaal, "tech-ai": innovatie,
  finance: hero, vastgoed: zorg, arbeidsmarkt: familie, duurzaamheid: duurzaamheid, internationaal,
};

/** Eigen redactionele artikels (voorbeeld). */
export const editorial: Article[] = [
  {
    slug: "kmos-zetten-stap-naar-automatisering", title: "Kmo's zetten de stap naar automatisering: eerst de werkvloer, dan de robot",
    category: "tech-ai", publishedAt: "2026-10-06", publishedTime: "08:30", image: innovatie, featured: true, urgency: "hoog", tags: ["KMO", "Automatisering", "West-Vlaanderen"], author: "Redactie", demo: true,
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
    category: "ondernemen", publishedAt: "2026-10-04", publishedTime: "07:45", image: familie, tags: ["Opvolging", "Familiebedrijf", "Limburg"], author: "Redactie", demo: true,
    excerpt: "Drie generaties, één werkplaats en een overdracht die zorgvuldig werd voorbereid.",
    body: [
      "In een Limburgs familiebedrijf zijn vader en dochter al twee jaar bezig met de overdracht. Ze begonnen met een eenvoudige afspraak: elke maand één uur praten over wat blijft en wat mag veranderen.",
      "Het resultaat is een bedrijf dat zijn ambacht bewaart, maar sneller en digitaler werkt. De klanten merken vooral dat offertes sneller klaar zijn. De medewerkers merken dat de nieuwe zaakvoerder vaker op de vloer staat.",
      "Volgens de familie lag de grootste uitdaging niet in de cijfers, maar in het loslaten. Het advies van de dochter aan anderen: spreek vroeg af wie wat beslist, en schrijf het op.",
    ],
  },
  {
    slug: "exporteurs-kijken-naar-nieuwe-markten", title: "Belgische exporteurs kijken verder dan de buurlanden",
    category: "internationaal", publishedAt: "2026-10-03", publishedTime: "10:10", image: internationaal, tags: ["Export", "Internationaal"], author: "Redactie", demo: true,
    excerpt: "Waar groeien Belgische bedrijven over de grens en welke fouten maken ze bij hun eerste exportmarkt?",
    body: [
      "De meeste Belgische kmo's beginnen hun export bij de buren. Maar een groeiende groep kijkt verder: naar Scandinavië, Zuid-Europa en Oost-Europa, waar vraag en concurrentie anders liggen.",
      "Exportbegeleiders merken dat de beste voorbereiding vaak banaal is: taal, betalingsvoorwaarden en een lokale partner. Wie die drie op orde heeft, loopt minder risico.",
      "Een veelgemaakte fout is te snel te veel markten tegelijk te willen bedienen. Het advies: kies één markt, leer die kennen en bouw van daaruit verder.",
    ],
  },
  {
    slug: "duurzamer-produceren-zonder-marge-te-verliezen", title: "Duurzamer produceren zonder dat de marge verdwijnt",
    category: "duurzaamheid", publishedAt: "2026-10-02", publishedTime: "09:00", image: duurzaamheid, tags: ["Energie", "Circulair", "Oost-Vlaanderen"], author: "Redactie", demo: true,
    excerpt: "Een Oost-Vlaamse producent toont hoe energiebesparing en circulaire materialen samen een gezonde marge opleveren.",
    body: [
      "Een Oost-Vlaams productiebedrijf besliste twee jaar geleden om zijn energieverbruik stap voor stap te verlagen. Eerst kwamen de eenvoudige ingrepen: isolatie, warmteterugwinning en slimmere planning van de machines.",
      "Pas daarna volgden de grotere investeringen. Elke stap moest zich binnen een vaste termijn terugbetalen, anders ging hij niet door. Zo bleef de marge intact.",
      "De zaakvoerder noemt het grootste voordeel niet de besparing, maar de zekerheid: minder afhankelijk van schommelende energieprijzen en een sterker verhaal naar klanten.",
    ],
  },
];

type Sample = { tags?: string[]; title: string; excerpt: string; category: string; publishedAt: string; time?: string; urgency?: Urgency; source: string; image?: string; video?: boolean };

/** Fictieve voorbeeldberichten — alleen voor de pilot. Bronnen en inhoud zijn verzonnen. */
const sampleRaw: Sample[] = [
  { tags: ["KMO","Beleid"], title: "Nieuwe steunmaatregel moet investeringen van kmo's versnellen", category: "kmo", publishedAt: "2026-10-06", time: "09:15", urgency: "hoog", source: "Kmo Kompas",
    excerpt: "Een nieuwe regeling wil investeringen in machines en digitalisering aantrekkelijker maken voor kleine bedrijven. Ondernemersorganisaties vragen vooral een eenvoudige aanvraagprocedure." },
  { tags: ["Brussel","Zorg"], title: "Zorgsector zoekt versnelling bij digitale patiëntendossiers", category: "tech-ai", publishedAt: "2026-10-05", time: "14:20", source: "Regio Ondernemen", image: zorg,
    excerpt: "Brusselse zorgaanbieders willen sneller werken met gedeelde dossiers, maar botsen op uiteenlopende systemen en strenge privacyregels." },
  { title: "Europese regels voor verpakkingen worden strenger: wat verandert er?", category: "internationaal", publishedAt: "2026-10-05", time: "11:05", urgency: "hoog", source: "Pilot Wire",
    excerpt: "Nieuwe Europese verpakkingsregels dwingen producenten om materialen te herzien. Een overzicht van de belangrijkste deadlines en wat bedrijven nu al kunnen doen." },
  { title: "Debat over administratieve lasten: ondernemers vragen concrete stappen", category: "economie", publishedAt: "2026-10-04", time: "16:40", source: "Kmo Kompas", video: true, image: hero,
    excerpt: "In de Kamer botsten meerderheid en oppositie over de vereenvoudiging van administratieve verplichtingen. Ondernemers willen vooral duidelijke deadlines." },
  { tags: ["Antwerpen","Haven"], title: "Havenbedrijf investeert in elektrische kranen en walstroom", category: "duurzaamheid", publishedAt: "2026-10-03", time: "13:30", source: "Pilot Wire", image: innovatie,
    excerpt: "Een Vlaamse haventerminal vervangt oudere dieselkranen door elektrische varianten. De investering moet uitstoot en geluid beperken." },
  { tags: ["Gent","Leuven","Start-ups"], title: "Vlaamse start-ups halen nieuwe financiering op", category: "start-ups", publishedAt: "2026-10-02", time: "12:00", source: "Regio Ondernemen", image: internationaal,
    excerpt: "Jonge technologiebedrijven uit Vlaanderen sluiten financieringsrondes af. Investeerders wijzen op sterke technische teams en een groeiende klantenbasis." },
  { tags: ["Brussel","Horeca"], title: "Brusselse horeca zoekt oplossingen voor personeelstekort", category: "arbeidsmarkt", publishedAt: "2026-10-01", time: "15:10", source: "Regio Ondernemen", image: familie,
    excerpt: "Restaurants en hotels in de hoofdstad zoeken nieuwe manieren om medewerkers te vinden en te houden, van flexibele roosters tot interne opleidingen." },
  { title: "Energieprijzen en industrie: wat de laatste cijfers betekenen", category: "economie", publishedAt: "2026-10-01", time: "08:50", source: "Pilot Wire", image: vakmanschap,
    excerpt: "Een overzicht van de recente evolutie van de energiekosten en wat dat betekent voor energie-intensieve productiebedrijven in België." },
  { tags: ["Limburg","Opleiding"], title: "Vakmensen gezocht: opleidingscentra breiden aanbod uit", category: "arbeidsmarkt", publishedAt: "2026-09-30", time: "10:25", source: "Kmo Kompas", image: vakmanschap,
    excerpt: "Opleidingscentra voor technische beroepen verwachten meer cursisten en breiden hun aanbod uit, in nauwe samenwerking met bedrijven." },
  { tags: ["West-Vlaanderen","Circulair"], title: "Circulaire economie: Vlaamse producenten delen restmaterialen", category: "duurzaamheid", publishedAt: "2026-09-30", time: "17:00", source: "Pilot Wire", image: duurzaamheid,
    excerpt: "Een netwerk van Vlaamse producenten ruilt restmaterialen en bespaart zo grondstoffen en afvalkosten." },
  { tags: ["Export","Antwerpen"], title: "Handelsmissie naar Scandinavië trekt recordaantal bedrijven", category: "internationaal", publishedAt: "2026-09-29", time: "09:40", source: "Regio Ondernemen", image: internationaal,
    excerpt: "Een geplande handelsmissie naar Noord-Europa kent veel belangstelling van Belgische kmo's uit voeding, technologie en bouw." },
  { title: "Gesprek met een zaakvoerder over opvolging: 'Begin vroeg met praten'", category: "ondernemen", publishedAt: "2026-09-29", time: "18:15", source: "Pilot Wire", video: true, image: familie,
    excerpt: "Een zaakvoerder blikt terug op zijn overdracht en geeft tips aan collega's die binnenkort hetzelfde moeten doen." },
  { tags: ["Antwerpen","Vastgoed"], title: "Bedrijfsvastgoed: vraag verschuift naar kleinere kantoren en logistieke ruimte", category: "vastgoed", publishedAt: "2026-10-05", time: "09:55", source: "Regio Ondernemen", image: zorg,
    excerpt: "Ondernemers zoeken minder vierkante meters kantoor en meer flexibele opslag- en productieruimte. Wat betekent dat voor huurprijzen en locatiekeuze?" },
  { tags: ["Gent","KMO"], title: "Kmo's en financiering: waarmee houdt een bank rekening bij een kredietaanvraag?", category: "finance", publishedAt: "2026-10-04", time: "11:30", source: "Kmo Kompas", image: hero,
    excerpt: "Een overzicht van de elementen die kredietverstrekkers bekijken, en hoe een ondernemer zijn dossier sterker kan maken." },
  { tags: ["Leuven","AI"], title: "AI-tools in de boekhouding: wat kan een kleine zaak er nu mee?", category: "tech-ai", publishedAt: "2026-10-03", time: "08:20", source: "Pilot Wire", image: innovatie,
    excerpt: "Van het inlezen van facturen tot het opvolgen van betalingen: een nuchtere blik op wat slimme software vandaag wel en niet kan." },
];

// ——— Helpers voor de scraper-feed / Monday ———
/**
 * Eén item uit `news-feed.json`. Twee naamgevingen worden begrepen, zodat de scraper én een Monday-export werken:
 *  - eenvoudig:   title, url, source, publishedAt, excerpt, image, category, slug, video
 *  - Monday/CMS:  title, source_url, source_name, publication_date, publication_time, summary, article_body,
 *                 status, urgency, tags, video_url, breaking_news, featured, language, region (zie src/content/cms.ts)
 * Zonder `status` geldt het item als gepubliceerd; met een andere status dan "published" wordt het niet getoond.
 */
export type RawFeedItem = Partial<ArticleRecord> & Partial<ArticleRecordAliases> & {
  url?: string; source?: string; publishedAt?: string; excerpt?: string; video?: boolean; breaking?: boolean;
};

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70);
const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h).toString(36).slice(0, 5); };
const stripHtml = (s: string) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const dayFmt = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: edition.timezone });
const timeFmt = new Intl.DateTimeFormat(edition.language, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: edition.timezone });
const isoDay = (s: string) => { const d = new Date(s); return Number.isNaN(d.getTime()) ? null : dayFmt.format(d); };
const isoTime = (s: string) => { const d = new Date(s); return Number.isNaN(d.getTime()) ? undefined : timeFmt.format(d); };

function normalizeCategory(c?: string): string {
  const v = (c ?? "").toLowerCase().trim();
  return categories.find((x) => x.slug === v || x.label.toLowerCase() === v)?.slug ?? DEFAULT_CATEGORY;
}

/** Zet een ruw feed-item om naar een Article. Ongeldige of nog niet gepubliceerde items geven null. */
export function fromFeed(raw: RawFeedItem): Article | null {
  const title = raw.title;
  const url = raw.source_url ?? raw.url;
  const sourceName = raw.source_name ?? raw.source;
  const sourceChecked = raw.source_checked ? isoDay(raw.source_checked) : null;
  const dateRaw = raw.publication_date ?? raw.publishedAt;
  const day = dateRaw ? isoDay(dateRaw) : null;
  if (!title || !url || !sourceName || !day) return null;
  if ((parseStatus(raw.status) ?? "published") !== "published") return null;
  const category = normalizeCategory(raw.category);
  const excerpt = stripHtml(raw.summary ?? raw.excerpt ?? "").slice(0, 220);
  const time = raw.publication_time ?? (dateRaw && dateRaw.includes("T") ? isoTime(dateRaw) : undefined);
  const articleText = raw.article_body ?? raw.article;
  const body = articleText ? articleText.split(/\n{2,}/).map((p) => stripHtml(p)).filter(Boolean) : [];
  const video = raw.video || !!raw.video_url;
  return {
    slug: raw.slug ? slugify(raw.slug) : `${slugify(title)}-${hash(url)}`,
    title: stripHtml(title), excerpt, category, publishedAt: day,
    image: raw.image || raw.photo || categoryImage[category] || hero,
    source: { name: sourceName, url, ...(sourceChecked ? { checked: sourceChecked } : {}) },
    urgency: parseUrgency(raw.urgency), status: "published",
    ...(time ? { publishedTime: time } : {}),
    ...(body.length ? { body } : {}),
    ...(video ? { video: true } : {}),
    ...(raw.video_url ? { videoUrl: raw.video_url } : {}),
    ...(raw.breaking_news || raw.breaking ? { breaking: true } : {}),
    ...(raw.featured ? { featured: true } : {}),
    ...(raw.tags?.length ? { tags: raw.tags } : {}),
    ...(raw.linkedin_text || raw.social_linkedin_text || raw.facebook_text || raw.social_facebook_text || raw.social_status ? { social: {
      ...((raw.linkedin_text ?? raw.social_linkedin_text) ? { linkedin: (raw.linkedin_text ?? raw.social_linkedin_text) as string } : {}),
      ...((raw.facebook_text ?? raw.social_facebook_text) ? { facebook: (raw.facebook_text ?? raw.social_facebook_text) as string } : {}),
      ...(raw.social_status ? { status: raw.social_status } : {}),
    } } : {}),
    ...(raw.language ? { language: raw.language } : {}),
    ...(raw.region ? { region: raw.region } : {}),
  };
}

const sampleFeed: Article[] = sampleRaw.map((s) => ({
  slug: slugify(s.title), title: s.title, excerpt: s.excerpt, category: s.category, publishedAt: s.publishedAt,
  image: s.image ?? categoryImage[s.category] ?? hero,
  source: { name: s.source, url: "https://example.com/" }, demo: true, urgency: s.urgency ?? "normaal", status: "published",
  ...(s.time ? { publishedTime: s.time } : {}),
  ...(s.tags ? { tags: s.tags } : {}),
  ...(s.video ? { video: true } : {}),
}));

const real: Article[] = (scraped as unknown as RawFeedItem[]).map(fromFeed).filter((a): a is Article => a !== null);
const useSamples = real.length < MIN_REAL_ITEMS;

const byNewest = (a: Article, b: Article) => `${b.publishedAt} ${b.publishedTime ?? "00:00"}`.localeCompare(`${a.publishedAt} ${a.publishedTime ?? "00:00"}`);

/** Alle artikelen, nieuwste eerst. */
export const articles: Article[] = [...editorial.filter((a) => !a.demo || useSamples), ...real, ...(useSamples ? sampleFeed : [])]
  .filter((a, i, all) => all.findIndex((b) => b.slug === a.slug) === i)
  .sort(byNewest);

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
/** Artikels die bij een regio horen (via tags). */
export const articlesInRegion = (label: string) => articles.filter((a) => a.tags?.some((t) => t.toLowerCase() === label.toLowerCase()));
export const articlesIn = (category: string) => articles.filter((a) => a.category === category);

const dateFmt = new Intl.DateTimeFormat(edition.language, { day: "numeric", month: "long", year: "numeric", timeZone: edition.timezone });
const shortFmt = new Intl.DateTimeFormat(edition.language, { day: "numeric", month: "short", timeZone: edition.timezone });
export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T12:00:00Z`));
export const formatShort = (iso: string) => shortFmt.format(new Date(`${iso}T12:00:00Z`));
/** "09:15" als de tijd bekend is, anders de korte datum. */
export const formatStamp = (a: Pick<Article, "publishedAt" | "publishedTime">) => a.publishedTime ?? formatShort(a.publishedAt);
/** "6 oktober 2026 · 09:15" */
export const formatDateTime = (a: Pick<Article, "publishedAt" | "publishedTime">) => `${formatDate(a.publishedAt)}${a.publishedTime ? ` · ${a.publishedTime}` : ""}`;
