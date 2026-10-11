/**
 * CENTRALE INHOUD — pas hier teksten, thema's, bedrijven en afleveringen aan.
 * Alles gemarkeerd met `PLACEHOLDER` of `demo: true` is voorbeeldinhoud en moet vervangen worden.
 */
import vakmanschap from "@/assets/theme-vakmanschap.jpg";
import innovatie from "@/assets/theme-innovatie.jpg";
import duurzaamheid from "@/assets/theme-duurzaamheid.jpg";
import familie from "@/assets/theme-familie.jpg";
import zorg from "@/assets/theme-zorg.jpg";
import internationaal from "@/assets/theme-internationaal.jpg";

export const site = {
  name: "Pilot België",
  tagline: "Ondernemen met koers",
  season: "Seizoen 1 · In voorbereiding", // PLACEHOLDER
  email: "redactie@pilotbelgie.be", // PLACEHOLDER — vervang door het echte adres
  phone: null as string | null, // PLACEHOLDER — nog niet opgegeven
  cta: { label: "Vertel uw verhaal", to: "/contact" as const },
  socials: [] as { label: string; href: string }[], // nog niet beschikbaar
  partners: [] as { name: string; logo: string }[], // alleen bevestigde uitzendpartners
};

export type Theme = {
  slug: string;
  number: string;
  title: string;
  intro: string;
  angle: string;
  questions: string[];
  image: string;
};

export const themes: Theme[] = [
  { slug: "vakmanschap", number: "01", title: "Vakmanschap", image: vakmanschap,
    intro: "Mensen die hun vak tot in de details beheersen en die kennis doorgeven.",
    angle: "We kijken naar de keuzes achter kwaliteit: tijd, materiaal en de mensen die het verschil maken.",
    questions: ["Hoe bewaar je ambacht in een tijd van schaalvergroting?", "Hoe leid je een nieuwe generatie vakmensen op?", "Wat kost kwaliteit, en wat levert ze op?"] },
  { slug: "innovatie", number: "02", title: "Innovatie & technologie", image: innovatie,
    intro: "Bedrijven die nieuwe technieken vertalen naar werkbare oplossingen.",
    angle: "Geen hype, wel het verhaal achter een vernieuwing: het probleem, de eerste mislukking, de doorbraak.",
    questions: ["Welk probleem lost deze vernieuwing écht op?", "Hoe neem je medewerkers mee in verandering?", "Wanneer is een idee klaar voor de markt?"] },
  { slug: "duurzaamheid", number: "03", title: "Duurzaamheid", image: duurzaamheid,
    intro: "Ondernemers die energie, materialen en productie anders organiseren.",
    angle: "We tonen concrete stappen en eerlijke afwegingen, inclusief wat (nog) niet lukt.",
    questions: ["Welke investering maakte het verschil?", "Hoe meet je vooruitgang?", "Wat leer je van anderen in de sector?"] },
  { slug: "familiebedrijven", number: "04", title: "Familiebedrijven", image: familie,
    intro: "Generaties die samen bouwen aan een bedrijf met wortels.",
    angle: "Over opvolging, traditie en de moed om dingen anders te doen dan vader of moeder.",
    questions: ["Hoe verloopt een goede overdracht?", "Wat behoud je, wat verander je?", "Hoe blijf je familie én collega?"] },
  { slug: "zorg-en-welzijn", number: "05", title: "Zorg & welzijn", image: zorg,
    intro: "Organisaties die zorg dichter bij mensen brengen.",
    angle: "Verhalen van professionals die met beperkte middelen betere zorg organiseren.",
    questions: ["Hoe zet je de mens centraal in een systeem?", "Welke rol speelt technologie?", "Hoe houd je personeel betrokken?"] },
  { slug: "internationaal", number: "06", title: "Internationaal ondernemen", image: internationaal,
    intro: "Belgische bedrijven die over de grens groeien.",
    angle: "Over nieuwe markten, culturele verschillen en wat België te bieden heeft.",
    questions: ["Hoe kies je een eerste exportmarkt?", "Wat zijn de valkuilen bij buitenlandse groei?", "Hoe blijf je lokaal verankerd?"] },
];

export const sectors = ["Industrie", "Bouw", "Voeding", "Zorg", "Technologie", "Logistiek"];

export type Company = {
  slug: string;
  demo: boolean;
  name: string;
  sector: string;
  theme: string; // theme slug
  summary: string;
  people: string;
  expertise: string;
  development: string;
  future: string;
  image: string;
  episode?: string;
};

/** DEMO-DATA — fictieve voorbeelden om de opmaak te tonen. Vervangen door echte verhalen. */
export const companies: Company[] = [
  { slug: "demo-houtatelier", demo: true, name: "Voorbeeldbedrijf — Houtatelier", sector: "Bouw", theme: "vakmanschap", image: vakmanschap,
    summary: "Demotekst: een atelier dat maatwerk combineert met traditionele technieken.",
    people: "Demotekst: zaakvoerder en team van vakmensen.", expertise: "Demotekst: maatwerk in massief hout.",
    development: "Demotekst: van eenmanszaak naar team.", future: "Demotekst: uitbreiding van de opleidingswerkplaats." },
  { slug: "demo-robotica", demo: true, name: "Voorbeeldbedrijf — Robotica", sector: "Technologie", theme: "innovatie", image: innovatie,
    summary: "Demotekst: een technologiebedrijf dat automatisering toegankelijk maakt voor kmo's.",
    people: "Demotekst: oprichters en ingenieurs.", expertise: "Demotekst: robotica voor kleine productielijnen.",
    development: "Demotekst: van prototype naar eerste klanten.", future: "Demotekst: nieuwe toepassingen in voeding." },
  { slug: "demo-bakkerij", demo: true, name: "Voorbeeldbedrijf — Familiebakkerij", sector: "Voeding", theme: "familiebedrijven", image: familie,
    summary: "Demotekst: drie generaties onder één dak, met een nieuwe kijk op het ambacht.",
    people: "Demotekst: de familie achter de bakkerij.", expertise: "Demotekst: ambachtelijk brood op schaal.",
    development: "Demotekst: overdracht naar de derde generatie.", future: "Demotekst: duurzamere productie." },
];

export type Episode = {
  slug: string;
  title: string;
  summary: string;
  season: string;
  theme: string;
  sector: string;
  date?: string;
  duration?: string;
  thumbnail: string;
  embedUrl?: string;
  description: string;
  companies: string[];
};

/** Nog geen afleveringen gepubliceerd. Voeg hier echte afleveringen toe. */
export const episodes: Episode[] = [];

export const nav = [
  { label: "Home", to: "/" },
  { label: "Het programma", to: "/programma" },
  { label: "Thema's", to: "/themas" },
  { label: "Afleveringen", to: "/afleveringen" },
  { label: "Verhalen", to: "/verhalen" },
  { label: "Contact", to: "/contact" },
] as const;

export const themeBySlug = (s: string) => themes.find((t) => t.slug === s);
