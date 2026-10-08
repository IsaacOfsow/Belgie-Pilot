import { createFileRoute, Link } from "@tanstack/react-router";
import { backgroundArticles } from "@/content/news";
import { ArticleCard, PageTitle, SectionBar } from "@/components/site/portal";
import { meta, canonical } from "@/lib/meta";

export const Route = createFileRoute("/achtergrond")({
  head: () => ({ meta: meta("Achtergrond", "Uitleg en achtergrond voor ondernemers: wat nieuws betekent voor uw onderneming."), links: canonical("/achtergrond") }),
  component: Achtergrond,
});

function Achtergrond() {
  const list = backgroundArticles();
  return (
    <>
      <PageTitle kicker="Achtergrond" title={<>Uitleg en <em>achtergrond</em></>} intro="De belangrijkste uitlegstukken voor ondernemers: wat er verandert en wat dat voor u betekent.">
        <p className="mt-6"><Link to="/" className="text-sm font-semibold text-primary hover:text-foreground">← Terug naar de homepage</Link></p>
      </PageTitle>
      <section className="container-x py-12">
        <SectionBar title="Uitleg-stukken" />
        {list.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        ) : (
          <p className="mt-8 text-muted-foreground">Er zijn nog geen achtergrondartikels. Items met type "achtergrond" of "uitleg" in de feed verschijnen hier vanzelf.</p>
        )}
      </section>
    </>
  );
}
