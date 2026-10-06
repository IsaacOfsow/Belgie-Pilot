import { createFileRoute, notFound } from "@tanstack/react-router";
import { programmeBySlug } from "@/content/portal";
import { videos } from "@/content/video";
import { DemoBadge, VideoCard } from "@/components/site/modules";
import { PageTitle, SectionBar } from "@/components/site/portal";
import { EmptyState } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/programmas/$slug")({
  loader: ({ params }) => {
    const programme = programmeBySlug(params.slug);
    if (!programme) throw notFound();
    return { programme };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.programme.title, loaderData.programme.blurb) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Programma,
});

function Programma() {
  const { programme: p } = Route.useLoaderData();
  const list = videos.filter((v) => v.programme === p.slug);
  return (
    <>
      <PageTitle kicker={p.kind} title={p.title} intro={p.blurb}>
        {p.demo && <p className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Concept</DemoBadge>Dit programma is een concept voor de pilot en wordt nog niet uitgezonden.</p>}
      </PageTitle>
      <section className="container-x py-12">
        <SectionBar title="Video's" to="/video" label="Alle video's" />
        <div className="mt-8">
          {list.length ? <div className="grid gap-6 md:grid-cols-3">{list.map((v) => <VideoCard key={v.slug} v={v} />)}</div> : <EmptyState title="Nog geen video's">Zodra er afleveringen zijn, staan ze hier.</EmptyState>}
        </div>
      </section>
    </>
  );
}
