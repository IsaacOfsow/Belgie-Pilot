import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articles, categories } from "@/content/news";
import { AdSlot, ArticleCard, PageTitle } from "@/components/site/portal";
import { Search } from "@/components/site/Filters";
import { EmptyState } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/nieuws/")({
  head: () => ({ meta: meta("Nieuws", "Het laatste nieuws voor Belgische ondernemers, per regio en onderwerp.") }),
  component: Nieuws,
});

const PAGE = 9;

function Nieuws() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => articles.filter((a) => (!cat || a.category === cat) && (!q || (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase()))), [q, cat]);
  const chip = (active: boolean) => cn("border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary hover:text-primary");
  return (
    <>
      <PageTitle kicker="Nieuws" title={<>Het laatste <em>nieuws</em></>} intro="Nieuws voor Belgische ondernemers, per regio en onderwerp." />
      <section className="container-x py-12">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-end">
          <Search value={q} onChange={(v) => { setQ(v); setShown(PAGE); }} placeholder="Zoek in het nieuws" />
          <ul className="flex flex-wrap gap-2">
            <li><button type="button" onClick={() => { setCat(""); setShown(PAGE); }} className={chip(!cat)}>Alles</button></li>
            {categories.map((c) => <li key={c.slug}><button type="button" onClick={() => { setCat(c.slug); setShown(PAGE); }} className={chip(cat === c.slug)}>{c.label}</button></li>)}
          </ul>
        </div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "artikel" : "artikels"}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            {list.length ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2">{list.slice(0, shown).map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
                {shown < list.length && (
                  <button type="button" onClick={() => setShown((n) => n + PAGE)} className="mt-10 w-full border py-3 text-xs font-bold uppercase tracking-[0.14em] hover:border-primary hover:text-primary">Meer laden</button>
                )}
              </>
            ) : (
              <EmptyState title="Geen resultaten">Pas de zoekterm of de rubriek aan.</EmptyState>
            )}
          </div>
          <div className="space-y-8 lg:sticky lg:top-40 lg:self-start"><AdSlot size="rectangle" /></div>
        </div>
      </section>
    </>
  );
}
