/**
 * COUNTRY-IN-A-BOX — de enige plek waar "deze editie" wordt vastgelegd.
 *
 * Een nieuwe landeneditie (Frankrijk, Duitsland, Spanje, VK, VS…) = een nieuw bestand met dezelfde vorm
 * (`Edition`) en één regel hieronder die het actief maakt. Componenten lezen hier hun merknaam, taal,
 * tijdzone, valuta, categorieën, bronnen en sociale kanalen — niets daarvan staat in de componenten zelf.
 *
 * Alles met `null` of `[]` is nog niet aangeleverd door TV Media Partners en wordt dan nergens getoond.
 * Zie docs/PILOT-STATUS.md voor de volledige lijst.
 */

export type EditionCategory = { slug: string; label: string; blurb: string };

export type SourceKind = "algemeen" | "economie" | "financieel" | "technologie" | "ondernemen" | "vastgoed" | "overheid";
/** Een nieuwsbron voor de scraper / Newsmonitor. Voeg alleen bronnen toe waarvoor toestemming of een open feed bestaat. */
export type EditionSource = { name: string; kind: SourceKind; feedUrl: string | null; permission: "onbekend" | "rss-open" | "toestemming" };

export type SocialKey = "linkedin" | "youtube" | "instagram" | "tiktok" | "facebook";

export type Edition = {
  /** Land en regio van deze editie. */
  country: string;
  region: string;
  /** BCP-47 taalcode van de site, bv. nl-BE. */
  language: string;
  primaryLanguage: string;
  /** Latere tweede taal (bv. fr-BE voor Wallonië). null = nog niet aanwezig. */
  secondaryLanguage: string | null;
  brandName: string;
  /** Korte merkregel onder de naam. */
  tagline: string;
  /** Moedermerk waar deze editie van afgeleid is. */
  parentBrand: string;
  /** Productiedomein; null zolang er geen domein is toegewezen. */
  domain: string | null;
  /** Tekst-logo. Een definitief logo wordt later geleverd (`logoImage`). */
  logoWordmark: { primary: string; secondary: string };
  logoImage: string | null;
  /** Landaccent. Het globale merk (navy/wit) blijft gelijk; alleen deze kleur verschilt per editie. */
  theme: { countryAccent: string; onAccent: string };
  timezone: string;
  currency: string;
  /** Adres voor commerciële aanvragen en redactie. Placeholder tot het echte adres bekend is. */
  commercialContact: string;
  editorialContact: string;
  analyticsId: string | null;
  /** Sociale kanalen. null = nog niet aangemaakt; er worden geen verzonnen links getoond. */
  socialAccounts: Record<SocialKey, string | null>;
  /** "Een initiatief van …" — pas tonen als de formulering is goedgekeurd. */
  initiative: { text: string; approved: boolean };
  /** Livestream. null = geen stream gekoppeld, de site toont dan eerlijk "geen live-uitzending". */
  liveStream: { embedUrl: string | null };
  categories: EditionCategory[];
  newsSources: EditionSource[];
  /** Plaatsnamen en regio's voor lokale herkenning in tags en zoekfuncties. */
  places: string[];
};

export const flandersEdition: Edition = {
  country: "België",
  region: "Vlaanderen",
  language: "nl-BE",
  primaryLanguage: "nl",
  secondaryLanguage: null, // later: "fr-BE" (Wallonië / Belgique francophone)
  brandName: "OndernemersTV Vlaanderen",
  tagline: "Het zakelijke nieuws- en videoplatform voor ondernemend Vlaanderen",
  parentBrand: "OndernemersTV Nederland",
  domain: null, // PLACEHOLDER — domein nog niet toegewezen
  logoWordmark: { primary: "OndernemersTV", secondary: "Vlaanderen" },
  logoImage: null, // PLACEHOLDER — officieel logo volgt van TV Media Partners
  theme: { countryAccent: "#F2B705", onAccent: "#0B1F33" }, // Vlaanderen: goud met navy tekst
  timezone: "Europe/Brussels",
  currency: "EUR",
  commercialContact: "adverteren@ondernemerstv-vlaanderen.example", // PLACEHOLDER
  editorialContact: "redactie@ondernemerstv-vlaanderen.example", // PLACEHOLDER
  analyticsId: null, // PLACEHOLDER — analyticsaccount nog niet gekoppeld
  socialAccounts: { linkedin: null, youtube: null, instagram: null, tiktok: null, facebook: null },
  initiative: { text: "Een initiatief van TV Media Partners / AI Media Factory", approved: false }, // NIET TONEN tot goedgekeurd
  liveStream: { embedUrl: null },
  categories: [
    { slug: "ondernemen", label: "Ondernemen", blurb: "Verhalen, praktijk en inzichten van Vlaamse ondernemers" },
    { slug: "economie", label: "Economie", blurb: "De Belgische en Vlaamse economie, beleid en conjunctuur" },
    { slug: "kmo", label: "MKB & KMO", blurb: "Alles voor de zelfstandige en de kleine en middelgrote onderneming" },
    { slug: "start-ups", label: "Start-ups & Scale-ups", blurb: "Jonge bedrijven, financiering en groei" },
    { slug: "tech-ai", label: "Tech & AI", blurb: "Technologie en artificiële intelligentie in de praktijk" },
    { slug: "finance", label: "Finance", blurb: "Financiering, beleggen, banken en fiscaliteit" },
    { slug: "vastgoed", label: "Vastgoed", blurb: "Bedrijfsvastgoed, bouw en woningmarkt" },
    { slug: "arbeidsmarkt", label: "Werk & Arbeidsmarkt", blurb: "Personeel, opleiding en de arbeidsmarkt" },
    { slug: "duurzaamheid", label: "Duurzaamheid", blurb: "Energie, circulair ondernemen en klimaat" },
    { slug: "internationaal", label: "Internationaal", blurb: "Export, Europa en wereldhandel voor Belgische bedrijven" },
  ],
  // Bronnen zijn nog niet vastgesteld: de scraper (Michael) en TV Media Partners leveren de definitieve set.
  newsSources: [],
  places: ["Brussel", "Antwerpen", "Gent", "Leuven", "West-Vlaanderen", "Oost-Vlaanderen", "Limburg", "Vlaams-Brabant"],
};

/** De actieve editie. Een andere editie kiezen = deze ene regel aanpassen. */
export const edition: Edition = flandersEdition;

export const socialLabels: Record<SocialKey, string> = { linkedin: "LinkedIn", youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook" };

/** Alleen kanalen met een echte link. */
export const activeSocials = (Object.keys(edition.socialAccounts) as SocialKey[])
  .flatMap((k) => { const href = edition.socialAccounts[k]; return href ? [{ key: k, label: socialLabels[k], href }] : []; });
