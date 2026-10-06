/**
 * PORTAAL-INHOUD — programma's, kanalen, adverteren, menu.
 * Alles gemarkeerd met `PLACEHOLDER` moet door echte gegevens vervangen worden.
 */

import { categories } from "./news";

export type NavItem = { label: string; to: string; children?: { label: string; to: string; note?: string; params?: Record<string, string> }[] };

export const navMain: NavItem[] = [
  { label: "Live", to: "/live" },
  { label: "App", to: "/app" },
  { label: "Home", to: "/" },
  { label: "Nieuws", to: "/nieuws", children: [
    { label: "Alle nieuws", to: "/nieuws", note: "Het laatste nieuws voor ondernemers" },
    ...categories.map((c) => ({ label: c.label, to: "/rubriek/$slug", params: { slug: c.slug }, note: c.blurb })),
  ] },
  { label: "Kijken", to: "/kijken", children: [
    { label: "Alle programma's", to: "/kijken", note: "Het volledige overzicht" },
    { label: "Afleveringen", to: "/afleveringen", note: "Het archief" },
    { label: "Verhalen", to: "/verhalen", note: "Bedrijven in beeld" },
    { label: "Thema's", to: "/themas", note: "Zes invalshoeken" },
    { label: "TV-gids", to: "/tvgids", note: "Het zenderschema" },
    { label: "Podcasts", to: "/podcast", note: "Luister onderweg" },
  ] },
  { label: "Adverteren", to: "/adverteren" },
  { label: "Over ons", to: "/over-ons" },
];

export const programmes = [
  { slug: "pilot-tafel", title: "De Pilot Tafel", kind: "Talkshow", blurb: "Ondernemers en experts aan tafel over één onderwerp van de week.", to: "/kijken" as const },
  { slug: "portretten", title: "Portretten", kind: "Documentaire", blurb: "Diepgaande reportages over één bedrijf en de mensen erachter.", to: "/afleveringen" as const },
  { slug: "kompas", title: "Het Kompas 25", kind: "Reeks", blurb: "Vijfentwintig ondernemers die de richting van de sector bepalen.", to: "/kijken" as const },
  { slug: "radar", title: "Radar", kind: "Innovatie", blurb: "Elke week één vernieuwing: zo werken we straks.", to: "/kijken" as const },
  { slug: "weekoverzicht", title: "Weekoverzicht", kind: "Nieuws", blurb: "Het nieuws van de week in tien minuten.", to: "/nieuws" as const },
  { slug: "podcast", title: "De Pilot Podcast", kind: "Podcast", blurb: "Lange gesprekken met ondernemers, ook onderweg te beluisteren.", to: "/podcast" as const },
];

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

/** TV-gids — voorbeeldschema. */
export const schedule = [
  { time: "18:00", title: "Weekoverzicht", kind: "Nieuws" },
  { time: "18:30", title: "De Pilot Tafel", kind: "Talkshow" },
  { time: "19:30", title: "Portretten", kind: "Documentaire" },
  { time: "20:30", title: "Radar", kind: "Innovatie" },
  { time: "21:00", title: "Het Kompas 25", kind: "Reeks" },
]; // PLACEHOLDER

/** ADVERTEREN — alle prijzen zijn PLACEHOLDERS (excl. btw) en worden door de eigenaar vastgesteld. */
export type Tier = { name: string; price: string; period: string; note: string; features: string[]; popular?: boolean };

export const tiers: Tier[] = [
  { name: "Starter", price: "€49", period: "per week", note: "Voor lokale ondernemers die willen testen",
    features: ["Banner in de zijkolom van het nieuws", "Vermelding in de rubriek 'Uit de regio'", "Rapport met weergaven en klikken"] },
  { name: "Groei", price: "€149", period: "per maand", note: "Meest gekozen door kmo's", popular: true,
    features: ["Banner op alle nieuwspagina's", "Eén gesponsord artikel", "Vermelding in de wekelijkse nieuwsbrief", "Maandelijks rapport"] },
  { name: "Partner", price: "€399", period: "per maand", note: "Maximale zichtbaarheid",
    features: ["Banner bovenaan de homepage", "Twee gesponsorde artikels", "Vaste plek in de nieuwsbrief", "Vermelding bij een videosegment"] },
];

export const adFormats = [
  { name: "Banner", from: "€49", per: "/week", text: "Zichtbaar op nieuws- en artikelpagina's." },
  { name: "Gesponsord artikel", from: "€99", per: "", text: "Uw verhaal in redactionele stijl, duidelijk als 'gesponsord' aangeduid." },
  { name: "Nieuwsbriefvermelding", from: "€39", per: "/uitgave", text: "Een blok in de wekelijkse nieuwsbrief." },
  { name: "Segmentsponsoring", from: "€149", per: "/maand", text: "Uw naam gekoppeld aan een rubriek, bv. Innovatie." },
  { name: "Videovermelding", from: "€79", per: "", text: "Een korte vermelding rond een video of uitzending." },
]; // PLACEHOLDER

export const adSizes = [
  { id: "leaderboard", label: "Leaderboard", size: "728 × 90" },
  { id: "rectangle", label: "Rechthoek", size: "300 × 250" },
  { id: "native", label: "Gesponsorde kaart", size: "zoals nieuwskaart" },
] as const;

export const faq = [
  { q: "Hoe snel staat mijn advertentie online?", a: "Na akkoord en aanlevering van het materiaal meestal binnen enkele werkdagen." },
  { q: "Kan ik zelf kiezen waar mijn advertentie staat?", a: "Ja, u kiest een pakket en een rubriek. Voor segmentsponsoring stemmen we de plek samen af." },
  { q: "Wordt een advertentie als reclame herkenbaar?", a: "Ja. Betaalde inhoud is altijd duidelijk aangeduid als 'Advertentie' of 'Gesponsord'." },
  { q: "Hoe betaal ik?", a: "Na uw aanvraag ontvangt u een offerte en factuur. Online betalen volgt later." },
]; // PLACEHOLDER

export const stats: { value: string; label: string }[] = [
  { value: "—", label: "Pageviews per maand (PLACEHOLDER)" },
  { value: "—", label: "Nieuwsbriefabonnees (PLACEHOLDER)" },
  { value: "—", label: "Video's bekeken (PLACEHOLDER)" },
];
