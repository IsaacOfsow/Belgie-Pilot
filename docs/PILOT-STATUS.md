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
