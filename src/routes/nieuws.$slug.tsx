import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { articleBySlug, articles, categoryBySlug, formatDateTime, SHOW_DEMO_LABELS } from "@/content/news";
import { videos } from "@/content/video";
import { edition } from "@/config/edition";
import { AdSlot, AnyLink, ArticleCard, NewsletterForm, SectionBar } from "@/components/site/portal";
import { VideoCard } from "@/components/site/modules";
import { btn } from "@/components/site/ui";
import { meta, canonical } from "@/lib/meta";

export const Route = createFileRoute("/nieuws/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    const ld = {
      "@context": "https://schema.org", "@type": "NewsArticle", headline: a.title, description: a.excerpt, inLanguage: edition.language,
      datePublished: `${a.publishedAt}${a.publishedTime ? `T${a.publishedTime}` : ""}`,
      author: { "@type": "Organization", name: a.source && !a.body ? a.source.name : edition.brandName },
      publisher: { "@type": "Organization", name: edition.brandName },
      ...(a.source ? { isBasedOn: a.source.url } : {}),
    };
    return {
      meta: meta(a.title, a.excerpt, { type: "article" }),
      links: canonical(`/nieuws/${a.slug}`),
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
    };
  },
  component: Artikel,
});

function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => { setUrl(window.location.href); }, []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const cls = "border px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary";
  if (!url) return null;
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Delen">
      <span className="mr-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">Delen</span>
      <a className={cls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a className={cls} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className={cls} href={`mailto:?subject=${t}&body=${u}`}>E-mail</a>
    </div>
  );
}

function Artikel() {
  const { article: a } = Route.useLoaderData();
  const cat = categoryBySlug(a.category);
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).concat(articles.filter((x) => x.slug !== a.slug && x.category !== a.category)).slice(0, 3);
  const relatedVideo = a.video ? videos[0] : undefined;
  return (
    <>
      <article>
        <header className="border-b bg-surface">
          <div className="container-x max-w-4xl py-12 md:py-16">
            <nav aria-label="Kruimelpad" className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/nieuws" className="hover:text-foreground">Nieuws</Link>
              {cat && <> / <AnyLink to="/categorie/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.label}</AnyLink></>}
            </nav>
            <p className="mt-6 flex items-center gap-3 text-xs">
              {cat && <AnyLink to="/categorie/$slug" params={{ slug: cat.slug }} className="eyebrow hover:text-foreground">{cat.label}</AnyLink>}
              {a.demo && SHOW_DEMO_LABELS && <span className="border border-primary/50 px-1.5 py-0.5 font-bold uppercase tracking-[0.14em] text-primary">Demo-inhoud voor pilot</span>}
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl">{a.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{a.excerpt}</p>
            <p className="mt-6 text-sm text-muted-foreground"><time>{formatDateTime(a)}</time> · {a.source && !a.body ? `Bron: ${a.source.name}` : a.author ?? "Redactie"}</p>
          </div>
        </header>
        <div className="container-x grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="max-w-3xl">
            <img src={a.image} alt="" loading="eager" className="aspect-[16/9] w-full border object-cover" />
            {a.body ? (
              <div className="mt-8 space-y-5 text-lg leading-relaxed">{a.body.map((p) => <p key={p}>{p}</p>)}</div>
            ) : (
              <div className="mt-8 border border-primary/30 bg-surface p-6">
                <p className="text-muted-foreground">Dit bericht komt van een externe bron en is geen origineel verslag van de redactie. Lees het volledige artikel op de website van de bron.</p>
                {a.source && <a href={a.source.url} target="_blank" rel="noopener noreferrer" className={`${btn()} mt-5`}>Lees verder bij {a.source.name} ↗</a>}
              </div>
            )}

            {/* Bronvermelding — altijd zichtbaar bij overgenomen berichten */}
            {a.source && (
              <dl className="mt-8 grid gap-x-6 gap-y-1 border-y py-4 text-sm sm:grid-cols-[auto_1fr]">
                <dt className="font-semibold text-muted-foreground">Bron</dt><dd>{a.source.name}</dd>
                <dt className="font-semibold text-muted-foreground">Bronlink</dt>
                <dd className="break-all"><a href={a.source.url} target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:text-foreground">{a.source.url}</a></dd>
              </dl>
            )}

            {a.tags?.length ? <ul className="mt-6 flex flex-wrap gap-2">{a.tags.map((t) => <li key={t} className="border px-3 py-1 text-xs text-muted-foreground">{t}</li>)}</ul> : null}

            <div className="mt-8"><ShareButtons title={a.title} /></div>

            {relatedVideo && (
              <div className="mt-12">
                <h2 className="text-2xl">Bijbehorende video</h2>
                <div className="mt-4 max-w-md"><VideoCard v={relatedVideo} /></div>
              </div>
            )}

            <div className="mt-12 border bg-surface p-6">
              <p className="eyebrow">Nieuwsbrief</p>
              <h2 className="mt-2 text-2xl">Blijf op de hoogte van ondernemend Vlaanderen</h2>
              <div className="mt-5"><NewsletterForm /></div>
            </div>
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
