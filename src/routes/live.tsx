import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { edition } from "@/config/edition";
import { liveDemo, schedule } from "@/content/portal";
import { DemoBadge } from "@/components/site/modules";
import { PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: meta("Live", "Kijk live naar OndernemersTV: de 24/7 zakelijke televisie, zodra de stream gekoppeld is.") }),
  component: Live,
});

function Live() {
  const stream = edition.liveStream.embedUrl;
  return (
    <>
      <PageTitle kicker="Live" title={<>Kijk <em>live</em></>} intro="OndernemersTV wordt een 24/7 zakelijk televisiekanaal. Zodra de stream gekoppeld is, verschijnt hij hier.">
        {!stream && <p className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Pilot</DemoBadge>Er is nog geen live-uitzending gekoppeld. Het schema hieronder is een voorbeeld.</p>}
      </PageTitle>
      <section className="container-x grid gap-8 py-14 lg:grid-cols-[2fr_1fr]">
        <div className="relative aspect-video overflow-hidden border bg-surface">
          {stream ? (
            <iframe src={stream} title="OndernemersTV live" className="h-full w-full" allowFullScreen />
          ) : (
            <>
              <img src={hero} alt="" className="h-full w-full object-cover" />
              <div className="overlay-dark absolute inset-0" />
              <div className="theme-navy absolute inset-0 flex flex-col items-center justify-center gap-4 bg-transparent p-6 text-center">
                <span className="badge-live">Geen live-uitzending gekoppeld</span>
                <p className="font-serif text-3xl md:text-5xl">{edition.brandName}</p>
                <Link to="/nieuwsbrief" className={btn()}>Verwittig me bij de start</Link>
              </div>
            </>
          )}
        </div>
        <aside className="border">
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
    </>
  );
}
