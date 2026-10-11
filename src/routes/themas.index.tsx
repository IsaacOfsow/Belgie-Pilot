import { createFileRoute } from "@tanstack/react-router";
import { themes } from "@/content/site";
import { ClosingCta, PageHero, Reveal, ThemeCard } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/themas/")({
  head: () => ({ meta: meta("Thema's", "Zes thema's waarin Pilot België ondernemers volgt: van vakmanschap tot internationaal ondernemen.") }),
  component: () => (
    <>
      <PageHero eyebrow="Thema's" title="Zes invalshoeken op ondernemen" intro="Elk thema is een lens waarmee de redactie naar bedrijven kijkt." />
      <section className="container-x grid gap-6 py-24 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => <Reveal key={t.slug}><ThemeCard t={t} /></Reveal>)}
      </section>
      <ClosingCta />
    </>
  ),
});
