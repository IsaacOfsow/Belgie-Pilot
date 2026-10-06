import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { edition } from "@/config/edition";
import { articles, articlesIn, categoryBySlug } from "@/content/news";
import { channels, partners, programmes } from "@/content/portal";
import { carousels, videos } from "@/content/video";
import { AdSlot, AnyLink, ArticleCard, NewsletterForm, SectionBar } from "@/components/site/portal";
import { CarouselContentCard, CommercialCTA, DemoBadge, LatestNewsList, LiveBanner, MostReadList, NewsTicker, PartnerContentCard, VideoCard } from "@/components/site/modules";
import { btn, Reveal } from "@/components/site/ui";
import { meta, canonical } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: meta("Zakelijk nieuws en video voor ondernemend Vlaanderen", "Nieuws, video en gesprekken voor ondernemers, kmo's en beslissers in Vlaanderen."), links: canonical("/") }),
  component: Home,
});

/** Eén categorieblok: een grote kaart plus compacte items. Verdwijnt als de categorie nog geen artikels heeft. */
function CategorySection({ slug }: { slug: string }) {
  const cat = categoryBySlug(slug);
  const list = articlesIn(slug).slice(0, 4);
  const [first, ...others] = list;
  if (!cat || !first) return null;
  return (
    <section className="container-x py-10">
      <SectionBar title={cat.label} to={`/categorie/${cat.slug}`} label={`Meer ${cat.label}`} />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <ArticleCard a={first} />
        <ul className="divide-y">{others.map((a) => <li key={a.slug} className="py-4 first:pt-0"><ArticleCard a={a} variant="thumb" /></li>)}</ul>
      </div>
    </section>
  );
}

function Home() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug);
  const latest = articles.slice(0, 8);
  const secondary = rest.slice(0, 3);
  const topStories = rest.slice(3, 9);
  const mostRead = articles.slice(0, 5);
  const [leadVideo, ...moreVideos] = videos;

  return (
    <>
      <LiveBanner />
      <NewsTicker items={articles.slice(0, 6)} />

      {/* Hero: hoofdbericht + laatste nieuws */}
      <section className="container-x pt-10 md:pt-12">
        <p className="eyebrow">{edition.region} · {edition.country}</p>
        <h1 className="mt-3 max-w-4xl text-3xl md:text-5xl">Zakelijk nieuws en video voor <em>ondernemend {edition.region}</em></h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featured && <div className="lg:col-span-2"><ArticleCard a={featured} variant="lead" /></div>}
          <LatestNewsList items={latest} />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">{secondary.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </section>

      <section className="container-x py-10"><AdSlot size="leaderboard" /></section>

      {/* Top stories */}
      <section className="container-x pb-6">
        <SectionBar kicker="Nieuws" title="Top stories" to="/nieuws" label="Alle nieuws" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{topStories.map((a) => <Reveal key={a.slug}><ArticleCard a={a} /></Reveal>)}</div>
      </section>

      {/* Categorieblokken */}
      {["ondernemen", "economie", "kmo", "tech-ai"].map((slug) => <CategorySection key={slug} slug={slug} />)}

      {/* Video */}
      <section className="mt-6 border-y bg-surface">
        <div className="container-x py-14">
          <SectionBar kicker="Kijken" title="Video" to="/video" label="Alle video's" />
          <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Demo</DemoBadge>Voorbeeldvideo's — er zijn nog geen echte video's gekoppeld.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {leadVideo && <div className="lg:col-span-2"><VideoCard v={leadVideo} variant="lead" /></div>}
            <div className="grid gap-6">{moreVideos.slice(0, 2).map((v) => <VideoCard key={v.slug} v={v} />)}</div>
          </div>
        </div>
      </section>

      {/* Programma's */}
      <section className="container-x py-14">
        <SectionBar kicker="Live & programma's" title="Elke week iets anders" to="/programmas" label="Alle programma's" />
        <ul className="mt-8 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <li key={p.slug} className="bg-background">
              <AnyLink to="/programmas/$slug" params={{ slug: p.slug }} className="group block h-full p-6 transition-colors hover:bg-card">
                <p className="flex items-center gap-3"><span className="eyebrow !text-[0.65rem]">{p.kind}</span>{p.demo && <DemoBadge>Concept</DemoBadge>}</p>
                <h3 className="mt-2 text-xl group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              </AnyLink>
            </li>
          ))}
        </ul>
      </section>

      {/* Korte formaten */}
      <section className="border-y bg-surface">
        <div className="container-x py-14">
          <SectionBar kicker="Social" title={<>Zakelijk <em>in beeld</em></>} />
          <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Voorbeeld</DemoBadge>Korte formaten voor social media — de koppeling met de kanalen volgt.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{carousels.map((c) => <CarouselContentCard key={c.id} c={c} />)}</div>
        </div>
      </section>

      {/* Meest gelezen + partnercontent */}
      <section className="container-x grid gap-12 py-14 lg:grid-cols-2">
        <MostReadList items={mostRead} />
        <div>
          <h2 className="text-2xl">Partnercontent</h2>
          <div className="mt-4"><PartnerContentCard /></div>
        </div>
      </section>

      {/* App */}
      <section className="container-x grid items-center gap-10 py-12 md:grid-cols-2">
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

      {/* Netwerk + kanalen */}
      <section className="border-t">
        <div className="container-x grid gap-12 py-14 md:grid-cols-2">
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

      {/* Nieuwsbrief */}
      <section className="border-t bg-surface">
        <div className="container-x py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Nieuwsbrief</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Blijf op de hoogte van <em>ondernemend Vlaanderen</em></h2>
            <p className="mt-4 text-muted-foreground">Het belangrijkste zakelijke nieuws in uw mailbox.</p>
            <div className="mt-8 text-left"><NewsletterForm /></div>
          </div>
        </div>
      </section>

      <CommercialCTA />
    </>
  );
}
