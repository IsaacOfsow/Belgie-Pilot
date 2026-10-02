import { createFileRoute, notFound } from "@tanstack/react-router";
import { companies, episodes, themeBySlug } from "@/content/site";
import { CompanyCard, EpisodeCard, PageHero } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/afleveringen/$slug")({
  loader: ({ params }) => {
    const episode = episodes.find((e) => e.slug === params.slug);
    if (!episode) throw notFound();
    return { episode };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.episode.title, loaderData.episode.summary) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Episode,
});

function Episode() {
  const { episode: e } = Route.useLoaderData();
  const cs = companies.filter((c) => e.companies.includes(c.slug));
  const related = episodes.filter((x) => x.theme === e.theme && x.slug !== e.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${e.season} · ${themeBySlug(e.theme)?.title ?? ""}`} title={e.title} intro={e.summary} image={e.thumbnail} />
      <section className="container-x py-16">
        {e.embedUrl ? (
          <div className="aspect-video border"><iframe src={e.embedUrl} title={e.title} loading="lazy" allowFullScreen className="h-full w-full" /></div>
        ) : <div className="flex aspect-video items-center justify-center border bg-card text-muted-foreground">Video volgt</div>}
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">{e.description}</p>
        {cs.length > 0 && <><h2 className="mt-16 text-4xl">Besproken bedrijven</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{cs.map((c) => <CompanyCard key={c.slug} c={c} />)}</div></>}
        {related.length > 0 && <><h2 className="mt-16 text-4xl">Gerelateerd</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((x) => <EpisodeCard key={x.slug} e={x} />)}</div></>}
      </section>
    </>
  );
}
