import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articleBySlug, articles, categoryBySlug, formatDate, SHOW_DEMO_LABELS } from "@/content/news";
import { AdSlot, AnyLink, ArticleCard, SectionBar } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/nieuws/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.article.title, loaderData.article.excerpt) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Artikel,
});

function Artikel() {
  const { article: a } = Route.useLoaderData();
  const cat = categoryBySlug(a.category);
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).concat(articles.filter((x) => x.slug !== a.slug && x.category !== a.category)).slice(0, 3);
  return (
    <>
      <article>
        <header className="border-b bg-surface">
          <div className="container-x max-w-4xl py-12 md:py-16">
            <p className="flex items-center gap-3 text-xs">
              {cat && <AnyLink to="/rubriek/$slug" params={{ slug: cat.slug }} className="eyebrow hover:text-foreground">{cat.label}</AnyLink>}
              {a.demo && SHOW_DEMO_LABELS && <span className="border border-primary/50 px-1.5 py-0.5 font-bold uppercase tracking-[0.14em] text-primary">Demo</span>}
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl">{a.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{a.excerpt}</p>
            <p className="mt-6 text-sm text-muted-foreground">{a.author ?? a.source?.name} · {formatDate(a.publishedAt)}</p>
          </div>
        </header>
        <div className="container-x grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="max-w-3xl">
            <img src={a.image} alt="" className="aspect-[16/9] w-full border object-cover" />
            {a.body ? (
              <div className="mt-8 space-y-5 text-lg leading-relaxed">{a.body.map((p) => <p key={p}>{p}</p>)}</div>
            ) : (
              <div className="mt-8 border border-primary/30 bg-surface p-6">
                <p className="text-muted-foreground">Dit bericht komt van een externe bron. Lees het volledige artikel op de website van de bron.</p>
                {a.source && <a href={a.source.url} target="_blank" rel="noopener noreferrer" className={`${btn()} mt-5`}>Lees verder bij {a.source.name} ↗</a>}
              </div>
            )}
            <div className="mt-12"><AdSlot size="leaderboard" /></div>
          </div>
          <aside className="space-y-8 lg:sticky lg:top-40 lg:self-start"><AdSlot size="rectangle" /></aside>
        </div>
      </article>
      <section className="container-x pb-16">
        <SectionBar title="Meer lezen" to="/nieuws" label="Alle nieuws" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
        <p className="mt-10 text-sm text-muted-foreground"><Link to="/contact" className="text-primary hover:text-foreground">Een tip of correctie? Laat het de redactie weten.</Link></p>
      </section>
    </>
  );
}
