import { createFileRoute, Link } from "@tanstack/react-router";
import { edition } from "@/config/edition";
import { articles, articlesIn, categoryBySlug } from "@/content/news";
import { programmes } from "@/content/portal";
import { carousels, videoModules, videos } from "@/content/video";
import { AdSlot, AnyLink, ArticleCard, NewsletterForm, SectionBar } from "@/components/site/portal";
import { CarouselContentCard, CommercialCTA, DemoBadge, LatestNewsList, LiveBanner, MostReadList, NewsTicker, PartnerContentCard, RegionalModule, TodayForEntrepreneurs, VideoCard } from "@/components/site/modules";
import { meta, canonical } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: meta("Zakelijk nieuws, video en live media voor ondernemend Vlaanderen", "Nieuws, video en gesprekken voor ondernemers, kmo's en beslissers in Vlaanderen."), links: canonical("/") }),
  component: Home,
});

/** Eén categorieblok: een grote kaart plus compacte items. Verdwijnt als de categorie nog geen artikels heeft. */
function CategorySection({ slug }: { slug: string }) {
  const cat = categoryBySlug(slug);
  const list = articlesIn(slug).slice(0, 4);
  const [first, ...others] = list;
  if (!cat || !first) return null;
  return (
    <section className="container-x py-8">
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
  const major = rest.slice(0, 2);
  const compact = rest.slice(2, 6);
  const topStories = rest.slice(6, 12);
  const mostRead = articles.slice(0, 5);
  const [leadVideo, ...moreVideos] = videos;

  return (
    <>
      <LiveBanner />
      <NewsTicker items={articles.slice(0, 6)} />

      {/* Nieuws eerst: hoofdbericht (2/3) + laatste nieuws (1/3) */}
      <section className="container-x pt-6 md:pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b pb-3">
          <h1 className="font-head text-sm font-extrabold uppercase tracking-[0.18em]">{edition.newsTheme}</h1>
          <p className="text-sm text-muted-foreground">{edition.tagline}</p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {featured && <ArticleCard a={featured} variant="lead" />}
          <LatestNewsList items={latest} />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid gap-8 md:grid-cols-2">{major.map((a) => <ArticleCard key={a.slug} a={a} variant="major" />)}</div>
          <ul className="divide-y border-t lg:border-l lg:border-t-0 lg:pl-6">{compact.map((a) => <li key={a.slug}><ArticleCard a={a} variant="row" /></li>)}</ul>
        </div>
      </section>

      <section className="container-x py-8"><AdSlot size="leaderboard" /></section>

      <TodayForEntrepreneurs />
      <RegionalModule />

      {/* Top stories */}
      <section className="container-x pb-4">
        <SectionBar kicker="Nieuws" title="Meer nieuws" to="/nieuws" label="Alle nieuws" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{topStories.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </section>

      {["ondernemen", "economie", "kmo", "tech-ai"].map((slug) => <CategorySection key={slug} slug={slug} />)}

      {/* Kijken: video als productpijler */}
      <section className="mt-6 border-y bg-surface">
        <div className="container-x py-12">
          <SectionBar kicker="Video" title="Kijken" to="/video" label="Alle video's" />
          <ul className="mt-5 flex flex-wrap gap-2">
            {videoModules.map((m) => <li key={m.id}><AnyLink to="/video" className="inline-block border bg-background px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] hover:border-primary">{m.label}</AnyLink></li>)}
          </ul>
          <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Demo</DemoBadge>Voorbeeldvideo's — er zijn nog geen echte video's gekoppeld.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {leadVideo && <div className="lg:col-span-2"><VideoCard v={leadVideo} variant="lead" /></div>}
            <div className="grid gap-6">{moreVideos.slice(0, 2).map((v) => <VideoCard key={v.slug} v={v} />)}</div>
          </div>
          <ul className="mt-8 grid gap-x-8 divide-y border-t md:grid-cols-3 md:divide-y-0">
            {programmes.slice(0, 6).map((p) => (
              <li key={p.slug} className="py-3">
                <AnyLink to="/programmas/$slug" params={{ slug: p.slug }} className="group flex items-baseline justify-between gap-3">
                  <span className="font-head font-bold group-hover:underline">{p.title}</span>
                  <span className="text-xs text-muted-foreground">{p.kind} · concept</span>
                </AnyLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Korte formaten */}
      <section className="container-x py-12">
        <SectionBar kicker="Social" title={<>Zakelijk <em>in beeld</em></>} />
        <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Voorbeeld</DemoBadge>Korte formaten voor social media — de koppeling met de kanalen volgt.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{carousels.map((c) => <CarouselContentCard key={c.id} c={c} />)}</div>
      </section>

      {/* Meest gelezen + partnercontent */}
      <section className="border-t">
        <div className="container-x grid gap-12 py-12 lg:grid-cols-2">
          <MostReadList items={mostRead} />
          <div>
            <h2 className="text-2xl">Partnercontent</h2>
            <div className="mt-4"><PartnerContentCard /></div>
          </div>
        </div>
      </section>

      {/* Nieuwsbrief */}
      <section className="theme-navy bg-background">
        <div className="container-x py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Nieuwsbrief</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Blijf op de hoogte van <em>ondernemend {edition.region}</em></h2>
            <p className="mt-4 text-muted-foreground">Het belangrijkste zakelijke nieuws in uw mailbox.</p>
            <div className="mt-8 text-left"><NewsletterForm /></div>
          </div>
        </div>
      </section>

      <CommercialCTA />
    </>
  );
}
