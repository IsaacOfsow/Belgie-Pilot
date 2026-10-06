import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articles } from "@/content/news";
import { ArticleCard, PageTitle } from "@/components/site/portal";
import { Search } from "@/components/site/Filters";
import { EmptyState } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/zoeken")({
  head: () => ({ meta: meta("Zoeken", "Zoek in het nieuws van Pilot België.") }),
  component: Zoeken,
});

function Zoeken() {
  const [q, setQ] = useState("");
  const list = useMemo(() => (q.trim() ? articles.filter((a) => (a.title + a.excerpt).toLowerCase().includes(q.trim().toLowerCase())) : []), [q]);
  return (
    <>
      <PageTitle kicker="Zoeken" title={<>Zoek in het <em>nieuws</em></>} />
      <section className="container-x py-12">
        <div className="max-w-xl"><Search value={q} onChange={setQ} placeholder="Zoekterm" /></div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{q.trim() ? `${list.length} resultaten` : "Typ een zoekterm."}</p>
        <div className="mt-6">
          {q.trim() && (list.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div> : <EmptyState title="Geen resultaten">Probeer een andere zoekterm.</EmptyState>)}
        </div>
      </section>
    </>
  );
}
