/**
 * PORTAAL-INHOUD — menu, programma's, kanalen en commerciële producten.
 * Alles gemarkeerd met `PLACEHOLDER` of `demo: true` moet door echte gegevens vervangen worden.
 * Merknaam, categorieën, contactadressen en sociale kanalen staan in src/config/edition.ts.
 */

import { categories } from "./news";

export type NavItem = { label: string; to: string; children?: { label: string; to: string; note?: string; params?: Record<string, string> }[] };

export const navMain: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Nieuws", to: "/nieuws", children: [
    { label: "Alle nieuws", to: "/nieuws", note: "Het laatste nieuws voor ondernemers" },
    ...categories.map((c) => ({ label: c.label, to: "/categorie/$slug", params: { slug: c.slug }, note: c.blurb })),
  ] },
  { label: "Video", to: "/video" },
  { label: "Programma's", to: "/programmas", children: [
    { label: "Alle programma's", to: "/programmas", note: "Het volledige overzicht" },
    { label: "Afleveringen", to: "/afleveringen", note: "Het archief" },
    { label: "Verhalen", to: "/verhalen", note: "Bedrijven in beeld" },
    { label: "Thema's", to: "/themas", note: "Zes invalshoeken" },
    { label: "TV-gids", to: "/tvgids", note: "Het zenderschema (demo)" },
    { label: "Podcasts", to: "/podcast", note: "Luister onderweg" },
  ] },
  { label: "Live", to: "/live" },
  { label: "Adverteren", to: "/adverteren" },
  { label: "Over ons", to: "/over-ons" },
];

/** Programmaconcepten. Dit zijn DEMO-concepten, geen bestaande uitzendingen — vervang door de officiële programma's. */
export type Programme = { slug: string; title: string; kind: string; blurb: string; demo: boolean };

export const programmes: Programme[] = [
  { slug: "ondernemerstv-nieuws", title: "OndernemersTV Nieuws", kind: "Nieuws", blurb: "Het zakelijke nieuws van de dag, kort en duidelijk.", demo: true },
  { slug: "de-uitblinkers", title: "De Uitblinkers", kind: "Reeks", blurb: "Ondernemers die in hun vak het verschil maken.", demo: true },
  { slug: "ondernemer-van-de-week", title: "Ondernemer van de Week", kind: "Interview", blurb: "Eén ondernemer, één gesprek, één verhaal.", demo: true },
  { slug: "business-update", title: "Business Update", kind: "Nieuws", blurb: "De economie van de week in enkele minuten.", demo: true },
  { slug: "tech-ai-update", title: "Tech & AI Update", kind: "Innovatie", blurb: "Wat nieuwe technologie vandaag betekent voor een onderneming.", demo: true },
  { slug: "ondernemer-in-beeld", title: "Ondernemer in Beeld", kind: "Reportage", blurb: "Een kijkje achter de schermen van een Vlaams bedrijf.", demo: true },
];
export const programmeBySlug = (slug: string) => programmes.find((p) => p.slug === slug);

export const guests = [
  { name: "Gast 1", role: "Zaakvoerder (PLACEHOLDER)" },
  { name: "Gast 2", role: "Econoom (PLACEHOLDER)" },
  { name: "Gast 3", role: "Ondernemer (PLACEHOLDER)" },
];

/** Waar het kanaal te zien is — enkel bevestigde partners invullen. */
export const channels: { name: string; note: string }[] = [
  { name: "Website", note: "Altijd beschikbaar op deze site" },
  { name: "Televisie", note: "Uitzendpartners worden binnenkort bekendgemaakt" }, // PLACEHOLDER
  { name: "Podcast", note: "Op de bekende podcastplatformen" }, // PLACEHOLDER
  { name: "Social media", note: "Kanalen volgen binnenkort" }, // PLACEHOLDER
];

export const partners: { name: string }[] = []; // alleen bevestigde partners

/** TV-gids — DEMO-schema. Er is nog geen echte uitzending of 24/7-lus gekoppeld. */
export const schedule = [
  { time: "18:00", title: "OndernemersTV Nieuws", kind: "Nieuws" },
  { time: "18:30", title: "Business Update", kind: "Nieuws" },
  { time: "19:00", title: "Ondernemer van de Week", kind: "Interview" },
  { time: "19:30", title: "Tech & AI Update", kind: "Innovatie" },
  { time: "20:00", title: "Ondernemer in Beeld", kind: "Reportage" },
]; // PLACEHOLDER

/** Wat in de live-strip als "nu" en "straks" getoond wordt (demo, tot er een echte stream is). */
export const liveDemo = { now: schedule[0], next: schedule[1] };

/**
 * COMMERCIËLE PRODUCTEN — GEEN prijzen verzinnen. `price: null` toont "Prijs op aanvraag".
 * Beloof geen bereik zolang er geen analytics zijn.
 */
export type Product = { slug: string; name: string; text: string; includes: string[]; price: string | null };

export const products: Product[] = [
  { slug: "bedrijfsreportage", name: "Bedrijfsreportage", text: "Uw onderneming in beeld: een verhaal over uw bedrijf, uw mensen en uw aanpak.", includes: ["Artikel", "Video", "Publicatie op de website", "Verspreiding via social media"], price: null },
  { slug: "ondernemersinterview", name: "Ondernemersinterview", text: "Een gesprek met u of uw zaakvoerder, uitgewerkt als interview.", includes: ["Interview op video", "Uitgeschreven artikel", "Plaats in de rubriek Ondernemen"], price: null },
  { slug: "branded-content", name: "Branded content", text: "Een artikel of video in samenwerking met de redactie, altijd als 'Partnercontent' aangeduid.", includes: ["Gesponsorde publicatie", "Duidelijke labeling", "Bronvermelding en transparantie"], price: null },
  { slug: "programmapartner", name: "Programmapartner", text: "Verbind uw naam aan een programma of videoreeks.", includes: ["Vermelding bij het programma", "Zichtbaarheid op video en website"], price: null },
  { slug: "sectorpartner", name: "Sectorpartner", text: "Wees het gezicht van een categorie, bijvoorbeeld Tech & AI of Vastgoed.", includes: ["Vermelding bij de categoriepagina", "Gesponsorde rubriekblokken"], price: null },
  { slug: "gesponsorde-reeks", name: "Gesponsorde reeks", text: "Een reeks verhalen of video's rond een thema dat bij uw merk past.", includes: ["Meerdere publicaties", "Vaste labeling als gesponsord"], price: null },
  { slug: "websitezichtbaarheid", name: "Websitezichtbaarheid", text: "Bannerplaatsingen en uitgelichte plaatsen op de website.", includes: ["Banner op nieuws- en artikelpagina's", "Vermelding in de nieuwsbrief"], price: null },
  { slug: "social-distributie", name: "Social-mediadistributie", text: "Uw boodschap via de kanalen van OndernemersTV, zodra die actief zijn.", includes: ["LinkedIn", "Facebook", "Korte video's en carrousels"], price: null },
  { slug: "videoproductie", name: "Videoproductie", text: "Professionele video voor uw bedrijf, ook buiten de redactie om te gebruiken.", includes: ["Concept en opname", "Montage", "Uitlevering in meerdere formaten"], price: null },
  { slug: "jaarpartnerschap", name: "Jaarpartnerschap", text: "Een vaste samenwerking voor een heel jaar.", includes: ["Combinatie van producten", "Vaste contactpersoon"], price: null },
  { slug: "crossmediapakket", name: "Crossmediapakket", text: "Een samengesteld pakket over website, video, nieuwsbrief en social.", includes: ["Website", "Video", "Nieuwsbrief", "Social media"], price: null },
]; // Welke producten worden aangeboden en tegen welke prijs, bepaalt TV Media Partners.

export const priceLabel = (p: string | null) => p ?? "Prijs op aanvraag";

/** Formaten voor advertenties op de site (afmetingen zijn technisch, geen prijs). */
export const adSizes = [
  { id: "leaderboard", label: "Leaderboard", size: "728 × 90" },
  { id: "rectangle", label: "Rechthoek", size: "300 × 250" },
  { id: "native", label: "Gesponsorde kaart", size: "zoals nieuwskaart" },
] as const;

export const faq = [
  { q: "Wat kost adverteren?", a: "De prijs hangt af van wat u wilt doen. Neem contact op en u krijgt een voorstel op maat." },
  { q: "Kan ik zelf kiezen waar mijn boodschap staat?", a: "Dat bespreken we samen. U kiest een product en we stemmen de plek en de categorie met u af." },
  { q: "Wordt betaalde inhoud herkenbaar?", a: "Ja. Betaalde inhoud is altijd duidelijk aangeduid als 'Advertentie', 'Gesponsord' of 'Partnercontent' en blijft gescheiden van redactionele inhoud." },
  { q: "Welk bereik mag ik verwachten?", a: "We geven geen cijfers zolang er geen betrouwbare statistieken zijn. Zodra de analytics draaien, delen we die met u." },
]; // PLACEHOLDER — door TV Media Partners na te kijken

/** Statistieken — pas tonen als er echte analytics zijn. Geen verzonnen cijfers. */
export const stats: { value: string; label: string }[] = [
  { value: "—", label: "Pageviews per maand" },
  { value: "—", label: "Nieuwsbriefabonnees" },
  { value: "—", label: "Video's bekeken" },
];
