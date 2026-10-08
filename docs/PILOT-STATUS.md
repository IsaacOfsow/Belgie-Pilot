# OndernemersTV Vlaanderen — pilotstatus

Eerste pilot van de "Country-in-a-Box": één configureerbare site per land. Deze pagina zegt eerlijk wat echt is, wat demo is en wat nog moet gebeuren.

## Waar staat wat

| Onderwerp | Bestand |
| --- | --- |
| Editie (land, regio, taal, merk, domein, logo, tijdzone, valuta, categorieën, bronnen, sociale kanalen, analytics, contact, livestream) | `src/config/edition.ts` |
| Datamodel Monday/CMS (statussen, urgentie, QC, velden) | `src/content/cms.ts` |
| Artikels + feed-normalisatie | `src/content/news.ts`, `src/content/news-feed.json`, `docs/NIEUWS-FEED.md` |
| Video, korte formaten (carrousels) | `src/content/video.ts` |
| Menu, programma's, commerciële producten, schema | `src/content/portal.ts` |
| Herbruikbare modules (LiveBanner, NewsTicker, LatestNewsList, VideoCard, CarouselContentCard, MostReadList, PartnerContentCard, CommercialCTA, ProductCard, DemoBadge, SponsorLabel) | `src/components/site/modules.tsx` |
| Kaarten, sectiekoppen, nieuwsbriefformulier, advertentieplek | `src/components/site/portal.tsx` |
| Header, footer, cookiebanner | `src/components/site/Header.tsx`, `Footer.tsx`, `CookieBanner.tsx` |

## Een nieuwe landeneditie maken

1. Kopieer het object `flandersEdition` in `src/config/edition.ts` en pas land, regio, taal (`fr-FR`, `de-DE`…), merknaam, domein, tijdzone, valuta, categorieën, bronnen en sociale kanalen aan.
2. Zet `export const edition` op het nieuwe object.
3. Vervang de inhoud in `news-feed.json` (en de demo-inhoud in `news.ts`, `video.ts`, `portal.ts`) door lokale inhoud.

De componenten blijven ongewijzigd. Tweetalig (nl-BE + fr-BE): `secondaryLanguage` is voorbereid; er is nog geen vertaallaag. Teksten staan nu in de componenten en inhoudsbestanden en moeten dan naar taalbestanden.

## Wat is DEMO (fictief, vervangen door echte inhoud)

- Artikels in `news.ts` (de redactionele voorbeelden en `sampleRaw`). Ze verdwijnen automatisch zodra de feed minstens 6 geldige items bevat (`MIN_REAL_ITEMS`). Zet `SHOW_DEMO_LABELS = true` om ze zichtbaar als demo te labelen.
- Video's en carrousels (`video.ts`): geen echte bestanden gekoppeld.
- Programma's: concepten, nog niet uitgezonden. Gemarkeerd als "Concept".
- Live-strook, schema en "nu/straks": demo. Gemarkeerd als "Demo" / "geen stream gekoppeld".
- "Meest gelezen": redactionele volgorde, geen leescijfers. Gemarkeerd als demo.
- Statistieken en bereik: er worden geen cijfers getoond.

## Wat is een PLACEHOLDER-koppeling (nog niet verbonden)

| Onderdeel | Status |
| --- | --- |
| Livestream / 24-7 lus | `edition.liveStream.embedUrl = null` |
| Videospeler | `videoUrl: null` per video |
| Nieuwsbrief | formulier opent het e-mailprogramma, geen mailservice |
| Contact- en adverteerformulier | opent het e-mailprogramma, geen backend |
| Analytics | `edition.analyticsId = null`; cookiebanner bewaart de keuze maar er is nog niets om aan te hangen |
| Sociale kanalen | alle `null`: niets getoond tot er echte links zijn |
| Zoeken | doorzoekt lokale pilotdata (artikels, video's, categorieën, programma's); later vervangen door CMS/API |
| Monday Newsmonitor | nog niet gekoppeld; voorbereid via `cms.ts` en de feed (zie `docs/NIEUWS-FEED.md`) |
| Social-distributie (LinkedIn/Facebook-tekst, `social_status`) | velden in datamodel, geen koppeling |
| Domein, canonical, `Sitemap:` in robots.txt | pas bij een toegewezen domein (`edition.domain`) |

## Nog te leveren door TV Media Partners

- Officieel logo en huisstijl (nu een tekstlogo).
- Domein, e-mailadressen (nu `.example`-adressen), sociale accounts, analyticsaccount.
- Goedkeuring van de tekst "Een initiatief van TV Media Partners / AI Media Factory" (`edition.initiative.approved`).
- Officiële programmanamen en uitzendplanning.
- Vlaamse bronnenlijst met toestemming of open feeds (`edition.newsSources`); geen beschermde inhoud overnemen zonder toestemming.
- Producten en prijzen voor adverteerders. Er staan bewust geen prijzen; elk product toont "Prijs op aanvraag".
- Juridisch gecontroleerde teksten: privacy, cookies, voorwaarden, redactioneel beleid, bronnentransparantie (nu conceptpagina's) en een juridische toets van de cookiebanner.
- Een stream- of videobron.

## Gescheiden betaald en redactioneel

Betaalde inhoud krijgt altijd het label "Partnercontent", "Branded content" of "Gesponsord" (`SponsorLabel`). Overgenomen berichten tonen altijd "Bron" en "Bronlink".

## Publicatiestatus en QC (voorbereid)

Statussen: Draft, AI generated, Needs review, Approved, Published, Rejected. De site toont alleen "published". Interne QC-velden (`sourceChecked`, `factChecked`, `languageChecked`, `visualChecked`) staan in `cms.ts` en zijn niet publiek zichtbaar.

## Niet gecontroleerd

Deze wijziging is gemaakt zonder lokale build of typecontrole (geen toegang tot de pakketregistry). Controleer de Lovable-preview en de buildmelding na elke synchronisatie.

## Huisstijl en tokens

Kleurensysteem (alle tokens in `src/styles.css`):

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--color-brand-primary` | `#0B1F33` | header, footer, live-vlak, nieuwsbrief, secundaire knop, links en labels op wit |
| `--country-accent` | `#F2B705` | landaccent (Vlaanderen): actieve navigatie, primaire knop met navy tekst, kleine details. Nooit als tekst op wit |
| `--color-background-secondary` | `#F4F6F8` | scheiding van secties (video, commercieel, secundair) |
| `--color-text-primary` | `#17212B` | koppen en lopende tekst |
| `--live` | `#E63946` | alleen live, breaking en dringend; knop "Kijk live" |
| `--success` | `#16805C` | alleen positieve systeem- en datastatussen (nog nergens in gebruik) |

- **Landaccent per editie:** `edition.theme.countryAccent` en `onAccent` in `src/config/edition.ts` worden op `<html>` gezet. Een andere editie verandert alleen die waarde.
- **Navy vlakken:** de klasse `theme-navy` keert de tokens om (wit op navy, accent goud). Gebruik die voor elk donker vlak of tekst over een foto.
- **Knoppen** (`btn` in `ui.tsx`): `gold` = primair (navy tekst), `navy` = secundair, `live` = rood, `outline`, `ghost`.
- **Partnercontent:** `SponsorLabel` (goud/navy, rustig) en `DemoBadge`.

Contrast: navy op goud 9,2:1; grijze hulptekst op wit 5,8:1. Wit op `#E63946` haalt 4,2:1, net onder de AA-grens van 4,5:1 voor kleine tekst. Dat is de gevraagde combinatie; groter of dikker lettertype of een iets donkerder rood lost dit op. Foutmeldingen gebruiken een donkerdere rode tint (`--destructive`) voor leesbaarheid.

## Review-ronde (senior pass)
- `edition.pilot.enabled` (pilotMode) zet een pilotregel in de footer, een pilotnotitie bij demo-artikels en de demo-labels op live, schema, video's, carrousels en "Meest gelezen". `labelDemoArticles` labelt ook elk demo-artikel. Allebei uitzetten vóór productie.
- `edition.regions` voedt de regionale module; `edition.countryCode`, `region`, `newsTheme` voeden teksten in header, footer en pagina's.
- Nieuwe componenten (`src/components/site/modules.tsx`): LiveBanner, NewsTicker, LatestNewsList, MostReadList, VideoCard, CarouselContentCard, PartnerContentCard, CommercialCTA, RegionalModule, TodayForEntrepreneurs, ProductCard, UrgencyBadge, SponsorLabel, DemoBadge, CookieBanner.
- Adverteren: zes hoofdproposities (`headline: true` in `src/content/portal.ts`), rest als secundaire lijst. Prijzen blijven `null` = "Prijs op aanvraag".
- Volledige classificatie: `docs/AUDIT.md`.

## Vereist vóór "L1 operationeel"
1. Echte feed van Michael/Monday in `news-feed.json` (of API), met bronnen gecontroleerd en status "published".
2. Echt domein, analytics (en daarmee echte "Meest gelezen"), cookiebanner gekoppeld aan echte tooling.
3. Echte livestream (`edition.liveStream.embedUrl`) en echt programmaschema, of live verwijderd.
4. Echte video's (`videoUrl`) en programma's; demo-items weg.
5. Nieuwsbriefdienst gekoppeld (nu mailto) en adverteerformulier met echte afhandeling.
6. Juridische teksten (privacy, cookies, voorwaarden, redactioneel beleid, bronnen) door jurist goedgekeurd.
7. Productaanbod en prijzen van TV Media Partners; echte contactadressen; sociale kanalen.
8. `pilot.enabled=false`, `initiative.approved` bevestigd, build + mobiele test + toegankelijkheidscheck.

## Structuur van ondernemerstv.nl (oktober 2026)
De site volgt nu de opbouw van https://ondernemerstv.nl/, met de huisstijl en inhoud van OndernemersTV Vlaanderen:
- **Header:** marktstrook (Bel 20, Euro Stoxx 50, DAX, Brent-olie, EUR/USD — `edition.markets`; waarden blijven leeg tot er een databron is, er worden nooit koersen verzonnen), logo, menu **Nieuws · Achtergrond · Groei & strategie · Financiering · Video** (+ "Meer"), rode **▶ Kijk live**-knop.
- **Homepage:** Laatste artikelen → Uitgelicht → Clips van de dag → Voor jouw type onderneming (tabs uit `edition.segments`) → Achtergrond → commerciële module.
- **Footer (alle pagina's):** nieuwsbriefblok "Blijf op de hoogte", links Over ons · Contact · Adverteren, socials (alleen echte kanalen), juridische links, pilotregel.
- **/achtergrond** (nieuw): artikels met `kind` = achtergrond of uitleg. In de feed: veld `article_type` (nieuws | achtergrond | uitleg).
- **/live:** speler/pilotstatus, programma (demo), "Laatste nieuwsberichten", "Ook in de uitzending".
- Nieuwe categorie **Groei & strategie**; **Finance** heet nu **Financiering**.
- Bewust niet overgenomen: kijkcijfers bij clips (er zijn geen echte statistieken), echte marktkoersen. De eerdere live-strook, ticker, regionale module, "Vandaag voor ondernemers" en "Meest gelezen" staan niet meer op de homepage; de componenten bestaan nog in `src/components/site/modules.tsx`.
