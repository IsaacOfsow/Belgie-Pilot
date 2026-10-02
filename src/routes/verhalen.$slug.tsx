import { createFileRoute, notFound } from "@tanstack/react-router";
import { companies, episodes, themeBySlug } from "@/content/site";
import { ClosingCta, CompanyCard, EpisodeCard, PageHero, Reveal } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/verhalen/$slug")({
  loader: ({ params }) => {
    const company = companies.find((c) => c.slug === params.slug);
    if (!company) throw notFound();
    return { company };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.company.name, loaderData.company.summary) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Company,
});

function Company() {
  const { company: c } = Route.useLoaderData();
  const ep = episodes.find((e) => e.slug === c.episode);
  const others = companies.filter((x) => x.slug !== c.slug).slice(0, 3);
  const blocks = [["Mensen achter het verhaal", c.people], ["Expertise", c.expertise], ["Ontwikkeling & keuzes", c.development], ["Toekomstplannen", c.future]];
  return (
    <>
      <PageHero eyebrow={`${c.sector} · ${themeBySlug(c.theme)?.title ?? ""}${c.demo ? " · Demo" : ""}`} title={c.name} intro={c.summary} image={c.image} />
      {c.demo && <p className="container-x mt-8 border border-primary/40 p-4 text-sm text-primary">Dit is fictieve demo-inhoud om de opmaak te tonen.</p>}
      <section className="container-x grid gap-px border bg-border my-16 md:grid-cols-2">
        {blocks.map(([t, d]) => <Reveal key={t} className="bg-background p-8 md:p-10"><p className="eyebrow">{t}</p><p className="mt-4 font-serif text-2xl leading-snug">{d}</p></Reveal>)}
      </section>
      <section className="container-x pb-24">
        <h2 className="text-4xl">Aflevering</h2>
        <div className="mt-8">{ep ? <div className="max-w-md"><EpisodeCard e={ep} /></div> : <p className="text-muted-foreground">De aflevering over dit bedrijf volgt.</p>}</div>
        <h2 className="mt-20 text-4xl">Andere verhalen</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{others.map((x) => <CompanyCard key={x.slug} c={x} />)}</div>
      </section>
      <ClosingCta />
    </>
  );
}
