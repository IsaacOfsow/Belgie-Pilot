import { createFileRoute } from "@tanstack/react-router";
import { videoModules, videos } from "@/content/video";
import { DemoBadge, VideoCard } from "@/components/site/modules";
import { AdSlot, PageTitle, SectionBar } from "@/components/site/portal";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/video/")({
  head: () => ({ meta: meta("Video", "Alle video's: nieuws, interviews, Ondernemer van de Week, Tech & AI, Business Explained en reportages.") }),
  component: VideoPage,
});

function VideoPage() {
  const [lead, ...rest] = videos;
  return (
    <>
      <PageTitle kicker="Video" title={<>Kijk naar <em>ondernemend Vlaanderen</em></>} intro="Nieuws, interviews en reportages voor ondernemers.">
        <p className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Demo</DemoBadge>De video's op deze pagina zijn voorbeelden; er zijn nog geen echte video's gekoppeld.</p>
      </PageTitle>
      <section className="container-x py-12">
        <SectionBar kicker="Nieuw" title="Laatste video's" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {lead && <div className="lg:col-span-2"><VideoCard v={lead} variant="lead" /></div>}
          <div className="grid gap-6">{rest.slice(0, 2).map((v) => <VideoCard key={v.slug} v={v} />)}</div>
        </div>
      </section>
      <section className="container-x pb-6"><AdSlot size="leaderboard" /></section>
      {videoModules.map((m) => {
        const list = videos.filter((v) => v.module === m.id);
        if (!list.length) return null;
        return (
          <section key={m.id} id={m.id} className="container-x py-10">
            <SectionBar title={m.label} />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((v) => <VideoCard key={v.slug} v={v} />)}</div>
          </section>
        );
      })}
    </>
  );
}
