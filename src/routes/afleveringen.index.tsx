import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { episodes, sectors, themes } from "@/content/site";
import { btn, EmptyState, EpisodeCard, PageHero } from "@/components/site/ui";
import { Search, Select } from "@/components/site/Filters";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/afleveringen/")({
  head: () => ({ meta: meta("Afleveringen", "Het archief van Pilot België: zoek en filter afleveringen op seizoen, thema en sector.") }),
  component: Afleveringen,
});

function Afleveringen() {
  const [q, setQ] = useState(""); const [season, setSeason] = useState(""); const [theme, setTheme] = useState(""); const [sector, setSector] = useState("");
  const seasons = [...new Set(episodes.map((e) => e.season))];
  const list = useMemo(() => episodes.filter((e) =>
    (!q || (e.title + e.summary).toLowerCase().includes(q.toLowerCase())) && (!season || e.season === season) && (!theme || e.theme === theme) && (!sector || e.sector === sector)), [q, season, theme, sector]);
  return (
    <>
      <PageHero eyebrow="Archief" title="Afleveringen" intro="Alle gepubliceerde reportages op één plek." />
      <section className="container-x py-16">
        <div className="grid gap-4 md:grid-cols-4">
          <Search value={q} onChange={setQ} placeholder="Titel of onderwerp" />
          <Select label="Seizoen" value={season} onChange={setSeason} options={seasons.map((s) => ({ value: s, label: s }))} />
          <Select label="Thema" value={theme} onChange={setTheme} options={themes.map((t) => ({ value: t.slug, label: t.title }))} />
          <Select label="Sector" value={sector} onChange={setSector} options={sectors.map((s) => ({ value: s, label: s }))} />
        </div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "aflevering" : "afleveringen"}</p>
        <div className="mt-6">
          {list.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((e) => <EpisodeCard key={e.slug} e={e} />)}</div> : (
            <EmptyState title={episodes.length ? "Geen resultaten voor deze filters" : "Nog geen afleveringen gepubliceerd"} action={<Link to="/contact" className={btn({ variant: "outline" })}>Uw verhaal voorstellen</Link>}>
              {episodes.length ? "Pas de zoekterm of filters aan." : "De eerste afleveringen zijn in voorbereiding. Kom binnenkort terug."}
            </EmptyState>
          )}
        </div>
      </section>
    </>
  );
}
