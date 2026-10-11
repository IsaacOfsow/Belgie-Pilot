import { createFileRoute, notFound } from "@tanstack/react-router";
import { articlesIn, categories, categoryBySlug } from "@/content/news";
import { AdSlot, AnyLink, ArticleCard, PageTitle } from "@/components/site/portal";
import { EmptyState } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/rubriek/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.category.label, loaderData.category.blurb) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Rubriek,
});

function Rubriek() {
  const { category } = Route.useLoaderData();
  const list = articlesIn(category.slug);
  return (
    <>
      <PageTitle kicker="Rubriek" title={category.label} intro={category.blurb} />
      <section className="container-x py-12">
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <AnyLink to="/rubriek/$slug" params={{ slug: c.slug }} className={cn("inline-block border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors", c.slug === category.slug ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary hover:text-primary")}>{c.label}</AnyLink>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
          {list.length ? <div className="grid gap-6 sm:grid-cols-2">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div> : <EmptyState title="Nog geen artikels in deze rubriek">Kom binnenkort terug.</EmptyState>}
          <div className="lg:sticky lg:top-40 lg:self-start"><AdSlot size="rectangle" /></div>
        </div>
      </section>
    </>
  );
}
