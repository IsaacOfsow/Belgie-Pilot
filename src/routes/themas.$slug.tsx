import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { companies, episodes, themeBySlug } from "@/content/site";
import { btn, ClosingCta, CompanyCard, EmptyState, EpisodeCard, PageHero, Reveal, SectionHead } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/themas/$slug")({
  loader: ({ params }) => {
    const theme = themeBySlug(params.slug);
    if (!theme) throw notFound();
    return { theme };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.theme.title, loaderData.theme.intro) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: ThemePage,
});

function ThemePage() {
  const { theme: t } = Route.useLoaderData();
  const cs = companies.filter((c) => c.theme === t.slug);
  const es = episodes.filter((e) => e.theme === t.slug);
  return (
    <>
      <PageHero eyebrow={`Thema ${t.number}`} title={t.title} intro={t.intro} image={t.image} />
      <section className="container-x grid gap-14 py-24 md:grid-cols-2">
        <SectionHead num="01" eyebrow="Invalshoek" title="Hoe wij ernaar kijken">{t.angle}</SectionHead>
        <Reveal>
          <p className="eyebrow">Vragen die we onderzoeken</p>
          <ul className="mt-6 divide-y border-y">{t.questions.map((q) => <li key={q} className="py-5 font-serif text-2xl">{q}</li>)}</ul>
        </Reveal>
      </section>
      <section className="container-x pb-24">
        <SectionHead num="02" eyebrow="Gerelateerd" title="Afleveringen & verhalen" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {es.map((e) => <EpisodeCard key={e.slug} e={e} />)}
          {cs.map((c) => <CompanyCard key={c.slug} c={c} />)}
        </div>
        {!es.length && !cs.length && (
          <EmptyState title={`Nog geen verhalen binnen ${t.title.toLowerCase()}`} action={<Link to="/contact" className={btn({ variant: "outline" })}>Stel een verhaal voor</Link>}>
            Kent u een bedrijf dat hier past? Laat het de redactie weten.
          </EmptyState>
        )}
      </section>
      <ClosingCta title={`Past uw bedrijf binnen ${t.title.toLowerCase()}?`} />
    </>
  );
}
