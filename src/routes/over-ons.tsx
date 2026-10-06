import { createFileRoute, Link } from "@tanstack/react-router";
import { edition } from "@/config/edition";
import { site } from "@/content/site";
import { PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/over-ons")({
  head: () => ({ meta: meta("Over ons", "Wie we zijn en wat we doen: zakelijk nieuws en video voor ondernemend Vlaanderen.") }),
  component: OverOns,
});

const blocks = [
  ["Wat we doen", `${site.name} brengt zakelijk nieuws, video en gesprekken voor ondernemers — online, in de nieuwsbrief en later ook als 24/7 televisiekanaal. Dit is een pilot.`],
  ["Hoe we werken", "We combineren eigen verhalen van de redactie met een selectie van nieuws uit de sector. Bij elk overgenomen bericht tonen we de bron en verwijzen we naar het origineel."],
  ["Onafhankelijkheid", "Betaalde inhoud is altijd duidelijk aangeduid als 'Advertentie', 'Gesponsord' of 'Partnercontent' en staat los van de redactie."],
];

function OverOns() {
  return (
    <>
      <PageTitle kicker="Over ons" title={<>Het platform voor <em>ondernemend {edition.region}</em></>} intro={site.tagline + "."} />
      <section className="container-x py-14">
        <div className="grid gap-px border bg-border md:grid-cols-3">
          {blocks.map(([t, d]) => <div key={t} className="bg-background p-8"><p className="eyebrow">{t}</p><p className="mt-4 text-lg leading-relaxed">{d}</p></div>)}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className={btn()}>Contact</Link>
          <Link to="/adverteren" className={btn({ variant: "outline" })}>Adverteren</Link>
        </div>
      </section>
    </>
  );
}
