import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import vakmanschap from "@/assets/theme-vakmanschap.jpg";
import { articles, categories } from "@/content/news";
import { channels, guests, partners, programmes } from "@/content/portal";
import { episodes, site } from "@/content/site";
import { AdSlot, AnyLink, ArticleCard, NewsletterForm, SectionBar } from "@/components/site/portal";
import { btn, EmptyState, EpisodeCard, Reveal } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: meta("Het platform voor Belgische ondernemers", "Nieuws, reportages en verhalen voor Belgische ondernemers — op televisie, online en in de nieuwsbrief.") }),
  component: Home,
});

function Home() {
  const [lead, ...rest] = articles;
  const featured = articles.find((a) => a.featured) ?? lead;
  const latest = articles.slice(0, 10);
  const recent = rest.slice(0, 5);
  const grid = articles.slice(1, 7);
  const videos = articles.filter((a) => a.video);
  const politics = articles.filter((a) => a.category === "beleid").slice(0, 3);
  const top5 = articles.slice(0, 5);

  return (
    <>
      {/* 1. Laatste nieuws — strook */}
      <div className="border-b bg-surface">
        <div className="container-x flex h-12 items-center gap-6 overflow-x-auto whitespace-nowrap text-sm">
          <span className="badge-live shrink-0">Laatste nieuws</span>
          {latest.slice(0, 6).map((a) => (
            <Link key={a.slug} to="/nieuws/$slug" params={{ slug: a.slug }} className="shrink-0 text-muted-foreground transition-colors hover:text-foreground">{a.title}</Link>
          ))}
        </div>
      </div>

      {/* 2. Kop + live-strip */}
      <section className="container-x pt-12 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Het platform voor Belgische ondernemers</p>
            <h1 className="mt-4 text-5xl md:text-7xl">Nieuws en verhalen voor wie <em>onderneemt</em></h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Het laatste nieuws, reportages en gesprekken — op televisie, online en in uw mailbox.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/nieuws" className={btn({ variant: "outline" })}>Alle nieuws</Link>
            <Link to="/live" className={btn()}>Kijk live</Link>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-l-4 border-l-[color:var(--live)] bg-surface px-5 py-4">
          <p className="flex flex-wrap items-center gap-3 text-sm">
            <span className="badge-live">Binnenkort live</span>
            <span className="font-head font-bold">{site.season}</span>
            <span className="text-muted-foreground">Het eerste seizoen wordt voorbereid.</span>
          </p>
          <Link to="/live" className={btn({ variant: "ghost" })}>Naar de livepagina →</Link>
        </div>
      </section>

      {/* 3. Uitgelicht + recent nieuws */}
      <section className="container-x py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {featured && <div className="lg:col-span-2"><ArticleCard a={featured} variant="lead" /></div>}
          <div className="flex flex-col border">
            <p className="border-b bg-surface px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">Recent</p>
            <ul className="flex-1 divide-y px-5">{recent.map((a) => <li key={a.slug}><ArticleCard a={a} variant="row" /></li>)}</ul>
          </div>
        </div>
      </section>

      {/* 4. Advertentie */}
      <section className="container-x pb-12"><AdSlot size="leaderboard" /></section>

      {/* 5. Meer nieuws uit de sector — raster */}
      <section className="container-x pb-14">
        <SectionBar kicker="Nieuws" title="Meer nieuws uit de sector" to="/nieuws" label="Alle nieuws" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{grid.map((a) => <Reveal key={a.slug}><ArticleCard a={a} /></Reveal>)}</div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => <li key={c.slug}><AnyLink to="/rubriek/$slug" params={{ slug: c.slug }} className="inline-block border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary">{c.label}</AnyLink></li>)}
        </ul>
      </section>

      {/* 6. Video */}
      <section className="border-y bg-surface">
        <div className="container-x py-14">
          <SectionBar kicker="Kijken" title="Video" to="/afleveringen" label="Alle afleveringen" />
          <div className="mt-8">
            {episodes.length ? (
              <div className="grid gap-6 md:grid-cols-3">{episodes.slice(0, 3).map((e) => <EpisodeCard key={e.slug} e={e} />)}</div>
            ) : videos.length ? (
              <div className="grid gap-6 md:grid-cols-3">{videos.slice(0, 3).map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
            ) : (
              <EmptyState title="De eerste afleveringen zijn in voorbereiding" action={<Link to="/contact" className={btn({ variant: "outline" })}>Uw verhaal voorstellen</Link>}>Zodra een aflevering gepubliceerd is, vindt u die hier.</EmptyState>
            )}
          </div>
        </div>
      </section>

      {/* 7. App */}
      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow">App</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Altijd <em>bij de hand</em></h2>
          <p className="mt-4 max-w-md text-muted-foreground">Nieuws, video en de tv-gids in uw broekzak. De app wordt binnenkort aangekondigd.</p>
          <Link to="/app" className={`${btn({ variant: "outline" })} mt-6`}>Meer over de app</Link>
        </div>
        <Reveal className="relative aspect-[16/10] overflow-hidden border">
          <img src={hero} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="overlay-dark absolute inset-0" />
        </Reveal>
      </section>

      {/* 8. Redactie-aanbevelingen — genummerde lijst */}
      <section className="container-x pb-16">
        <SectionBar kicker="Redactie" title="Onze keuze van de week" />
        <ol className="mt-4 divide-y">
          {top5.map((a, i) => (
            <li key={a.slug}>
              <Link to="/nieuws/$slug" params={{ slug: a.slug }} className="group flex items-start gap-6 py-5">
                <span className="w-12 shrink-0 font-serif text-5xl leading-none text-primary">{i + 1}</span>
                <span>
                  <span className="block font-head text-lg font-bold leading-snug group-hover:text-primary md:text-xl">{a.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{a.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 9. Beleid & politiek */}
      <section className="border-y bg-surface">
        <div className="container-x grid gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Beleid & politiek</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Wat de <em>Kamer</em> beslist</h2>
            <p className="mt-4 text-muted-foreground">Debatten en besluiten die ondernemers raken, uitgelegd zonder jargon.</p>
            <AnyLink to="/rubriek/$slug" params={{ slug: "beleid" }} className={`${btn({ variant: "outline" })} mt-6`}>Alle beleidsnieuws</AnyLink>
          </div>
          <ul className="grid gap-6">{politics.map((a) => <li key={a.slug}><ArticleCard a={a} variant="thumb" /></li>)}</ul>
        </div>
      </section>

      {/* 10. Vlog van de week */}
      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
        <Reveal className="relative aspect-video overflow-hidden border">
          <img src={vakmanschap} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="overlay-dark absolute inset-0" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden>▶</span>
        </Reveal>
        <div>
          <p className="eyebrow">Vlog van de week</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Achter de <em>schermen</em></h2>
          <p className="mt-4 text-muted-foreground">Een kijkje bij de redactie en bij de ondernemers die we bezoeken. De eerste vlog volgt met het eerste seizoen.</p>
        </div>
      </section>

      {/* 11. De Pilot Tafel — talkshow */}
      <section className="border-y bg-surface">
        <div className="container-x py-16">
          <p className="eyebrow">Talkshow</p>
          <h2 className="mt-3 text-5xl md:text-7xl">De Pilot <em>Tafel</em></h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Ondernemers en experts schuiven aan voor één onderwerp van de week.</p>
          <ul className="mt-10 grid gap-px border bg-border sm:grid-cols-3">
            {guests.map((g) => (
              <li key={g.name} className="bg-background p-6">
                <p className="eyebrow">Aan tafel</p>
                <p className="mt-3 font-head text-xl font-bold">{g.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{g.role}</p>
              </li>
            ))}
          </ul>
          <Link to="/contact" className={`${btn()} mt-8`}>Zelf aanschuiven?</Link>
        </div>
      </section>

      {/* 12. Programma-overzicht */}
      <section className="container-x py-16">
        <SectionBar kicker="Programma's" title="Elke week iets anders" to="/kijken" label="Alle programma's" />
        <ul className="mt-8 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <li key={p.slug} className="bg-background">
              <AnyLink to={p.to} className="group block h-full p-6 transition-colors hover:bg-card">
                <p className="eyebrow !text-[0.65rem]">{p.kind}</p>
                <h3 className="mt-2 text-xl group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              </AnyLink>
            </li>
          ))}
        </ul>
      </section>

      {/* 13. Netwerk + kanalen */}
      <section className="border-t">
        <div className="container-x grid gap-12 py-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Ons netwerk</p>
            <h2 className="mt-3 text-4xl">Partners</h2>
            {partners.length ? (
              <ul className="mt-6 flex flex-wrap gap-3">{partners.map((p) => <li key={p.name} className="border px-4 py-2 text-sm">{p.name}</li>)}</ul>
            ) : (
              <p className="mt-4 text-muted-foreground">Onze partners worden binnenkort bekendgemaakt. Wilt u partner worden?</p>
            )}
            <Link to="/adverteren" className={`${btn({ variant: "ghost" })} mt-4`}>Partner worden →</Link>
          </div>
          <div>
            <p className="eyebrow">Kanalen</p>
            <h2 className="mt-3 text-4xl">Waar u ons kunt zien</h2>
            <ul className="mt-6 divide-y border-y">
              {channels.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-6 py-3">
                  <span className="font-head font-bold">{c.name}</span>
                  <span className="text-right text-sm text-muted-foreground">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 14. Adverteren — commercieel blok */}
      <section className="border-y bg-surface">
        <div className="container-x grid items-center gap-8 py-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Voor adverteerders</p>
            <h2 className="mt-3 text-4xl md:text-6xl">Uw merk in beeld bij <em>Belgische ondernemers</em></h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">Adverteren kan al voor een klein bedrag: een banner, een gesponsord artikel of een vermelding in de nieuwsbrief.</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link to="/adverteren" className={btn()}>Bekijk de pakketten</Link>
            <Link to="/contact" className={btn({ variant: "outline" })}>Vraag een offerte</Link>
          </div>
        </div>
      </section>

      {/* 15. Nieuwsbrief */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Nieuwsbrief</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Elke week het <em>ondernemersnieuws</em></h2>
          <p className="mt-4 text-muted-foreground">Een overzicht van het belangrijkste nieuws, elke week in uw mailbox.</p>
          <div className="mt-8 text-left"><NewsletterForm /></div>
        </div>
      </section>
    </>
  );
}
