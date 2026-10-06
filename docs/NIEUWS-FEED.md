# Nieuwsfeed voor de scraper

De site leest verzamelde berichten uit `src/content/news-feed.json`. De scraper hoeft alleen dit bestand te vullen
(en te committen naar `main`); Lovable synchroniseert het automatisch en er worden geen Lovable-credits gebruikt.

## Formaat

Een JSON-array. Elk item:

| veld          | verplicht | uitleg |
| ------------- | --------- | ------ |
| `title`       | ja        | kop van het bericht |
| `url`         | ja        | link naar het originele artikel |
| `source`      | ja        | naam van de bron, bv. "Kmo Kompas" |
| `publishedAt` | ja        | datum, bv. `2026-10-06` of een ISO-datum met tijd |
| `excerpt`     | nee       | korte samenvatting (wordt op 220 tekens afgekapt, html wordt verwijderd) |
| `image`       | nee       | afbeeldings-URL. Zonder dit veld gebruikt de site een standaardbeeld per rubriek |
| `category`    | nee       | slug of naam uit `src/config/edition.ts`: `ondernemen`, `economie`, `kmo`, `start-ups`, `tech-ai`, `finance`, `vastgoed`, `arbeidsmarkt`, `duurzaamheid`, `internationaal`. Onbekend of leeg wordt `ondernemen` |
| `video`       | nee       | `true` als het een video is |
| `slug`        | nee       | wordt anders automatisch gemaakt uit de titel en de url |

```json
[
  {
    "title": "Voorbeeldkop",
    "url": "https://voorbeeld.be/artikel",
    "source": "Voorbeeldbron",
    "publishedAt": "2026-10-06T08:30:00Z",
    "excerpt": "Korte samenvatting van het bericht.",
    "category": "europa"
  }
]
```

## Monday / CMS-velden (optioneel)

Dezelfde feed begrijpt ook de Monday-veldnamen uit `src/content/cms.ts`, zodat een Monday-export zonder omzetting kan:
`source_url`, `source_name`, `publication_date`, `publication_time` (HH:mm), `summary`, `article_body` (alinea's gescheiden door een lege regel),
`status`, `urgency` (`normaal` | `hoog` | `breaking`), `tags` (lijst), `video_url`, `breaking_news`, `featured`, `language`, `region`.

- `status`: zonder veld geldt het item als gepubliceerd. Alleen `published` wordt getoond; `draft`, `ai_generated`, `needs_review`, `approved` en `rejected` blijven verborgen.
- Een item met `article_body` wordt als artikel getoond, maar de bron (naam + link) blijft altijd zichtbaar.

## Gedrag

- Ongeldige items (zonder titel, url, bron of geldige datum) worden genegeerd.
- Zodra er minstens 6 geldige items in het bestand staan, verdwijnen alle fictieve voorbeeldartikels automatisch
  (`MIN_REAL_ITEMS` in `src/content/news.ts`).
- Voor verzamelde berichten toont de site kop, korte samenvatting en een link naar de bron. Neem geen volledige
  artikelteksten of afbeeldingen over zonder toestemming van de bron.
