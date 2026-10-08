import { createFileRoute } from "@tanstack/react-router";
import { edition } from "@/config/edition";
import { articles, backgroundArticles } from "@/content/news";
import { videos } from "@/content/video";
import { ArticleCard, SectionBar } from "@/components/site/portal";
import { CommercialCTA, DemoBadge, SegmentSection, VideoCard } from "@/components/site/modules";
import { meta, canonical } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: meta("Zakelijk nieuws, video en live media voor ondernemend Vlaanderen", "Nieuws, video en gesprekken voor ondernemers, kmo's en beslissers in Vlaanderen."), links: canonical("/") }),
  component: Home,
});

/**
 * Homepage in de opbouw van ondernemerstv.nl:
 * Laatste artikelen → Uitgelicht → Clips van de dag → Voor jouw type onderneming → Achtergrond → (commerciële module) → nieuwsbrief in de footer.
 * De marktstrook en de "Kijk live"-knop zitten in de header.
 */
function Home() {
  const pinned = articles.filter((a) => a.featured);
  const featured = [...pinned, ...articles.filter((a) => !a.featured).slice(4)].slice(0, 3);
  const latest = articles.filter((a) => !featured.some((f) => f.slug === a.slug)).slice(0, 4);
  const background = backgroundArticles().slice(0, 3);
  const clips = videos.slice(0, 4);

  return (
    <>
      <h1 className="sr-only">{edition.brandName} — {edition.tagline}</h1>

      {/* Laatste artikelen */}
      <section className="container-x pt-8">
        <SectionBar title="Laatste artikelen" to="/nieuws" label="Alle artikelen" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{latest.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </section>

      {/* Uitgelicht */}
      <section className="container-x pt-12">
        <SectionBar title="Uitgelicht" />
        <div className="mt-6 grid gap-8 md:grid-cols-3">{featured.map((a) => <ArticleCard key={a.slug} a={a} variant="major" />)}</div>
      </section>

      {/* Clips van de dag */}
      <section className="mt-12 border-y bg-surface">
        <div className="container-x py-10">
          <SectionBar title="Clips van de dag" to="/video" label="Alle video's" />
          <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Demo</DemoBadge>Voorbeeldclips — er zijn nog geen echte video's gekoppeld.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{clips.map((v) => <VideoCard key={v.slug} v={v} />)}</div>
        </div>
      </section>

      {/* Voor jouw type onderneming */}
      <SegmentSection />

      {/* Achtergrond */}
      <section className="container-x pb-12 pt-4">
        <SectionBar title="Achtergrond" to="/achtergrond" label="Meer achtergrondartikelen" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">{background.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </section>

      <CommercialCTA />
    </>
  );
}
