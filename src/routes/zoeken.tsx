import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articles, categories } from "@/content/news";
import { programmes } from "@/content/portal";
import { videos } from "@/content/video";
import { AnyLink, ArticleCard, PageTitle } from "@/components/site/portal";
import { VideoCard } from "@/components/site/modules";
import { Search } from "@/components/site/Filters";
import { EmptyState } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/zoeken")({
  head: () => ({ meta: [...meta("Zoeken", "Zoek in artikels, video's, categorieën en programma's."), { name: "robots", content: "noindex" }] }),
  component: Zoeken,
});

const has = (q: string, ...fields: (string | undefined)[]) => fields.join(" ").toLowerCase().includes(q);

/** Zoekt in lokale pilotdata. Later te vervangen door een zoekopdracht naar het CMS / de API. */
function Zoeken() {
  const [raw, setRaw] = useState("");
  const q = raw.trim().toLowerCase();
  const res = useMemo(() => q ? {
    articles: articles.filter((a) => has(q, a.title, a.excerpt, a.tags?.join(" "), a.source?.name)),
    videos: videos.filter((v) => has(q, v.title, v.summary)),
    categories: categories.filter((c) => has(q, c.label, c.blurb)),
    programmes: programmes.filter((p) => has(q, p.title, p.blurb, p.kind)),
  } : null, [q]);
  const total = res ? res.articles.length + res.videos.length + res.categories.length + res.programmes.length : 0;
  const h = "mt-10 text-2xl";
  return (
    <>
      <PageTitle kicker="Zoeken" title={<>Zoek in <em>alles</em></>} intro="Artikels, video's, categorieën en programma's." />
      <section className="container-x py-12">
        <div className="max-w-xl"><Search value={raw} onChange={setRaw} placeholder="Zoekterm" /></div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{res ? `${total} resultaten` : "Typ een zoekterm."}</p>
        {res && total === 0 && <div className="mt-6"><EmptyState title="Geen resultaten">Probeer een andere zoekterm.</EmptyState></div>}
        {res && res.categories.length > 0 && (<><h2 className={h}>Categorieën</h2><ul className="mt-4 flex flex-wrap gap-2">{res.categories.map((c) => <li key={c.slug}><AnyLink to="/categorie/$slug" params={{ slug: c.slug }} className="inline-block border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] hover:border-primary hover:text-primary">{c.label}</AnyLink></li>)}</ul></>)}
        {res && res.programmes.length > 0 && (<><h2 className={h}>Programma's</h2><ul className="mt-4 grid gap-4 sm:grid-cols-2">{res.programmes.map((p) => <li key={p.slug}><AnyLink to="/programmas/$slug" params={{ slug: p.slug }} className="block border p-5 hover:border-primary"><span className="eyebrow !text-[0.65rem]">{p.kind}</span><span className="mt-1 block font-head font-bold">{p.title}</span></AnyLink></li>)}</ul></>)}
        {res && res.videos.length > 0 && (<><h2 className={h}>Video's</h2><div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{res.videos.map((v) => <VideoCard key={v.slug} v={v} />)}</div></>)}
        {res && res.articles.length > 0 && (<><h2 className={h}>Artikels</h2><div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{res.articles.map((a) => <ArticleCard key={a.slug} a={a} />)}</div></>)}
      </section>
    </>
  );
}
