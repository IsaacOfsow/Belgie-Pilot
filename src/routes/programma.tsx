import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/theme-innovatie.jpg";
import familie from "@/assets/theme-familie.jpg";
import { ClosingCta, PageHero, Reveal, SectionHead } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/programma")({
  head: () => ({ meta: meta("Het programma", "De redactionele formule van OndernemersTV Vlaanderen: welke verhalen we zoeken, voor wie, en hoe een verhaal tot stand komt.") }),
  component: Programma,
});

const steps = [
  ["Kennismaking", "Een eerste gesprek met de redactie over uw bedrijf en uw verhaal."],
  ["Redactioneel voorstel", "We bepalen samen de invalshoek, de mensen en de locaties."],
  ["Opnames", "Een compacte ploeg filmt op locatie, met respect voor uw werking."],
  ["Montage & nazicht", "De redactie werkt het verhaal uit; u ziet het resultaat vóór publicatie."],
  ["Publicatie", "Het verhaal verschijnt op de afgesproken kanalen."],
];

function Programma() {
  return (
    <>
      <PageHero eyebrow="Het programma" image={hero} title={<>Verhalen met <em>inhoud</em></>} intro="OndernemersTV Vlaanderen is een redactioneel programma voor ondernemers, beslissers en iedereen die wil weten hoe goede bedrijven werken." />
      <section className="container-x grid gap-14 py-24 md:grid-cols-2 md:py-32">
        <SectionHead num="01" eyebrow="De formule" title="Eén bedrijf, één verhaal, veel inzicht">
          Elke reportage volgt één onderneming en de mensen die haar dragen. We zoeken geen reclame, maar een eerlijk beeld: de keuzes, de twijfels en de resultaten.
        </SectionHead>
        <Reveal className="space-y-8 text-muted-foreground">
          <div><h3 className="text-2xl text-foreground">Welke verhalen zoeken we?</h3><p className="mt-2">Bedrijven met een duidelijke expertise, een herkenbare ontwikkeling en mensen die er open over willen vertellen.</p></div>
          <div><h3 className="text-2xl text-foreground">Voor wie?</h3><p className="mt-2">Ondernemers, beslissers, studenten en geïnteresseerde kijkers die willen leren van anderen.</p></div>
        </Reveal>
      </section>
      <section className="theme-navy border-y bg-background">
        <div className="container-x grid gap-14 py-24 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead num="02" eyebrow="Werkwijze" title="Van gesprek tot publicatie" />
            <img src={familie} alt="Familie in hun bakkerij" loading="lazy" className="mt-10 aspect-[4/3] w-full border object-cover" />
          </div>
          <ol className="divide-y border-y self-start">
            {steps.map(([t, d], i) => (
              <Reveal as="li" key={t} className="grid grid-cols-[4rem_1fr] py-7">
                <span className="font-serif text-3xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="text-2xl">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
