import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { companies, sectors, themes } from "@/content/site";
import { CompanyCard, EmptyState, PageHero } from "@/components/site/ui";
import { Search, Select } from "@/components/site/Filters";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/verhalen/")({
  head: () => ({ meta: meta("Bedrijven & verhalen", "Ontdek de ondernemers en bedrijven achter de reportages van Pilot België.") }),
  component: Verhalen,
});

function Verhalen() {
  const [q, setQ] = useState(""); const [sector, setSector] = useState(""); const [theme, setTheme] = useState("");
  const list = useMemo(() => companies.filter((c) =>
    (!q || (c.name + c.summary).toLowerCase().includes(q.toLowerCase())) && (!sector || c.sector === sector) && (!theme || c.theme === theme)), [q, sector, theme]);
  return (
    <>
      <PageHero eyebrow="Bedrijven" title="Verhalen" intro="De ondernemingen en mensen die we volgen. De huidige kaarten zijn demovoorbeelden." />
      <section className="container-x py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <Search value={q} onChange={setQ} placeholder="Bedrijfsnaam of onderwerp" />
          <Select label="Sector" value={sector} onChange={setSector} options={sectors.map((s) => ({ value: s, label: s }))} />
          <Select label="Thema" value={theme} onChange={setTheme} options={themes.map((t) => ({ value: t.slug, label: t.title }))} />
        </div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "verhaal" : "verhalen"}</p>
        <div className="mt-6">
          {list.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((c) => <CompanyCard key={c.slug} c={c} />)}</div>
            : <EmptyState title="Geen verhalen gevonden">Pas de zoekterm of filters aan.</EmptyState>}
        </div>
      </section>
    </>
  );
}
