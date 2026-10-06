# Auditrapport — OndernemersTV Vlaanderen (pilot)

Classificatie per onderdeel: **GOED** (behouden) · **VERBETERD** (aangepast in deze ronde) · **NIEUW** (toegevoegd) · **VERWIJDERD**.

## Pagina's

| Onderdeel | Status | Opmerking |
|---|---|---|
| Homepage | VERBETERD | Nieuws-eerst: live-strook → nieuwsticker → hoofdverhaal (2/3) + Laatste nieuws (1/3) → grote verhalen → compacte koppen. Uitleg over het bedrijf staat onderaan. |
| Nieuwsoverzicht, categorie | GOED / VERBETERD | Categorieën uit `edition.categories`; `/rubriek` is `/categorie`. |
| Artikelpagina | VERBETERD | Bronblok (Bron / Originele bron / Laatst gecontroleerd), broodkruimel, tags, delen, JSON-LD, pilotnotitie. |
| Video + videodetail | VERBETERD | Videomodules: Nieuws, Interviews, Ondernemer in Beeld, Tech & AI, Business Updates. Demo's gelabeld. |
| Programma's | NIEUW | 6 conceptprogramma's, gemarkeerd als demo. |
| Live | VERBETERD | Eerlijke "geen stream gekoppeld"-pagina; demoschema. |
| Adverteren & Samenwerken | VERBETERD | Zes hoofdproposities + secundaire lijst; "Prijs op aanvraag"; transparantie over labels. |
| Zoeken | NIEUW | Artikels, video's, categorieën, programma's. |
| Juridische pagina's | NIEUW | Vijf conceptpagina's (noindex) — te laten nakijken. |
| Podcast / app / afleveringen / verhalen / thema's / programma | OVERBLIJFSEL | Uit eerdere versie; niet in navigatie, niet gelinkt vanaf de homepage. Kandidaten om te schrappen na overleg. |
| App-promo, partners/kanalen-blok, Reveal-animaties op de homepage | VERWIJDERD | Te veel visuele talen en CTA's, niet nieuws-eerst. |

## Beoordelingscriteria

| Criterium | Oordeel | Toelichting |
|---|---|---|
| Redactionele hiërarchie | VERBETERD | lead → major → card → compacte kop. |
| Geloofwaardigheid | VERBETERD | Bronvermelding, labels op betaald, geen verzonnen cijfers of prijzen. |
| Mediaal uiterlijk | VERBETERD | Rechthoekige beelden, dunne scheidingslijnen, gouden accentlijn, weinig schaduw/gradiënt. |
| Vlaamse lokalisatie | VERBETERD | Via inhoud en termen (KMO, regio's, nieuwsthema), niet via vlaggen. |
| Navigatie | VERBETERD | 9 hoofditems + "Meer"; zoeken en nieuwsbrief in de header. |
| Informatiedichtheid | VERBETERD | Ticker, 8 laatste items, regionale module, "Vandaag voor ondernemers". |
| Live-TV zichtbaarheid | VERBETERD | Strook bovenaan, rode Live-badge, Nu/Straks, "Pilot · demo". |
| Video-integratie | VERBETERD | Aparte kaart met play-icoon en duur. |
| Commerciële kansen | VERBETERD | Zes proposities, homepage-CTA, labels, AdSlots. |
| Mobiel | NIET BROWSER-GETEST | Layout is mobile-first opgebouwd (stapelvolgorde: live → ticker → hoofdverhaal → laatste nieuws → …), maar niet visueel gecontroleerd op een telefoon. |
| Country-in-a-Box | VERBETERD | `src/config/edition.ts` stuurt merk, regio, taal, tijdzone, valuta, accent, categorieën, regio's, socials, contact. |
| CMS/API-gereedheid | VERBETERD | Monday-velden en aliassen in `src/content/cms.ts`; feed in `src/content/news-feed.json`. |
| Kleursysteem | VERBETERD | Navy/goud/wit via tokens; rood alleen voor live/breaking. |
| Toegankelijkheid | DEELS | Focus-stijlen, aria-labels, contrast gecontroleerd op papier; geen echte audit. Wit op live-rood haalt 4,2:1 (grote/vette tekst). |
| Demo-transparantie | VERBETERD | `pilot.enabled` + `labelDemoArticles`; demo-onderdelen gelabeld; footerregel. |

## Open punten
- Geen build, typecheck of test kunnen draaien in de werkomgeving; Lovable bouwt bij de eerstvolgende sync.
- Overblijfselroutes (podcast, app, afleveringen, verhalen, thema's, programma) opruimen.
- Meta-beschrijvingen in `head()` bevatten nog vaste Vlaamse tekst.
