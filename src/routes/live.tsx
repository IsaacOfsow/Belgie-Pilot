import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { edition } from "@/config/edition";
import { articles } from "@/content/news";
import { liveDemo, schedule } from "@/content/portal";
import { videos } from "@/content/video";
import { DemoBadge, VideoCard } from "@/components/site/modules";
import { ArticleCard, SectionBar } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: meta("Live", "Kijk live naar OndernemersTV: de 24/7 zakelijke televisie, zodra de stream gekoppeld is.") }),
  component: Live,
});

function Live() {
  const stream = edition.liveStream.embedUrl;
  const latest = articles.slice(0, 4);
  const inBroadcast = videos.slice(0, 4);
  return (
    <>
      {/* Speler + programma */}
      <section className="container-x grid gap-8 pb-4 pt-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="mb-3 flex flex-wrap items-center gap-3 text-xs">
            {stream ? <span className="badge-live"><span aria-hidden className="size-1.5 rounded-full bg-white" />Nu live</span> : <span className="badge-live">Geen live-uitzending gekoppeld</span>}
            <span className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">{edition.brandName} · doorlopend</span>
            {!stream && <DemoBadge>Pilot</DemoBadge>}
          </p>
          <div className="relative aspect-video overflow-hidden border bg-surface">
            {stream ? (
              <iframe src={stream} title={`${edition.brandName} live`} className="h-full w-full" allow="autoplay; fullscreen" allowFullScreen />
            ) : (
              <>
                <img src={hero} alt="" className="h-full w-full object-cover" />
                <div className="overlay-dark absolute inset-0" />
                <div className="theme-navy absolute inset-0 flex flex-col items-center justify-center gap-4 bg-transparent p-6 text-center">
                  <p className="font-serif text-3xl md:text-5xl">{edition.brandName}</p>
                  <p className="max-w-md text-sm text-muted-foreground">De livestream is nog niet gekoppeld. Zodra hij beschikbaar is, verschijnt hij hier.</p>
                  <Link to="/nieuwsbrief" className={btn()}>Verwittig me bij de start</Link>
                </div>
              </>
            )}
          </div>
        </div>
        <aside className="self-start border">
          <p className="border-b bg-surface px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">Programma <DemoBadge>Demo</DemoBadge></p>
          <div className="space-y-1 border-b p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Nu</p>
            <p className="font-head text-lg font-bold">{liveDemo.now?.title}</p>
            <p className="text-sm text-muted-foreground">{liveDemo.now?.time} · {liveDemo.now?.kind}</p>
          </div>
          <div className="space-y-1 border-b p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Straks</p>
            <p className="font-head text-lg font-bold">{liveDemo.next?.title}</p>
            <p className="text-sm text-muted-foreground">{liveDemo.next?.time} · {liveDemo.next?.kind}</p>
          </div>
          <ul className="divide-y px-5 text-sm">{schedule.map((s) => <li key={s.time} className="flex gap-4 py-3"><span className="w-12 font-semibold tabular-nums text-primary">{s.time}</span>{s.title}</li>)}</ul>
        </aside>
      </section>

      <section className="container-x py-8">
        <h1 className="max-w-4xl text-3xl md:text-5xl">{edition.brandName} Live — de markten, het nieuws en de gesprekken van <em>vandaag</em></h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Een doorlopende uitzending over de markten, interviews en het nieuws voor kmo's, scale-ups en zelfstandigen. Zodra de stream gekoppeld is, start hij hier automatisch.</p>
        <p className="mt-3 text-sm text-muted-foreground">Redactie {edition.brandName}</p>
      </section>

      <section className="container-x py-8">
        <SectionBar title="Laatste nieuwsberichten" to="/nieuws" label="Alle artikelen" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{latest.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </section>

      <section className="container-x pb-12 pt-4">
        <SectionBar title="Ook in de uitzending" to="/video" label="Alle video's" />
        <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Demo</DemoBadge>Voorbeeldvideo's — er zijn nog geen echte video's gekoppeld.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{inBroadcast.map((v) => <VideoCard key={v.slug} v={v} />)}</div>
      </section>
    </>
  );
}
