import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { videoBySlug, videos } from "@/content/video";
import { programmeBySlug } from "@/content/portal";
import { formatDate } from "@/content/news";
import { DemoBadge, VideoCard } from "@/components/site/modules";
import { AnyLink, SectionBar } from "@/components/site/portal";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/video/$slug")({
  loader: ({ params }) => {
    const video = videoBySlug(params.slug);
    if (!video) throw notFound();
    return { video };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.video.title, loaderData.video.summary, { image: loaderData.video.image }) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: VideoDetail,
});

function VideoDetail() {
  const { video: v } = Route.useLoaderData();
  const programme = programmeBySlug(v.programme);
  const related = videos.filter((x) => x.slug !== v.slug).slice(0, 3);
  return (
    <>
      <section className="container-x max-w-5xl py-10">
        <nav aria-label="Kruimelpad" className="text-xs text-muted-foreground">
          <Link to="/video" className="hover:text-foreground">Video</Link> / <span>{v.title}</span>
        </nav>
        <div className="relative mt-6 aspect-video overflow-hidden border bg-surface">
          {v.videoUrl ? (
            <iframe src={v.videoUrl} title={v.title} className="h-full w-full" allowFullScreen loading="lazy" />
          ) : (
            <>
              <img src={v.image} alt="" className="h-full w-full object-cover" />
              <div className="overlay-dark absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <DemoBadge>Demo · geen video gekoppeld</DemoBadge>
                <p className="max-w-md text-sm text-muted-foreground">Hier verschijnt de videospeler zodra een echte video is gekoppeld.</p>
              </div>
            </>
          )}
        </div>
        <p className="mt-8 flex flex-wrap items-center gap-3 text-xs">
          {programme && <AnyLink to="/programmas/$slug" params={{ slug: programme.slug }} className="eyebrow hover:text-foreground">{programme.title}</AnyLink>}
          <span className="text-muted-foreground">{v.duration} · {formatDate(v.publishedAt)}</span>
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl">{v.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{v.summary}</p>
      </section>
      <section className="container-x pb-16">
        <SectionBar title="Meer video's" to="/video" label="Alle video's" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((r) => <VideoCard key={r.slug} v={r} />)}</div>
      </section>
    </>
  );
}
