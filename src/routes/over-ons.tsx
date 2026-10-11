import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/over-ons")({
  head: () => ({ meta: meta("Over ons", "Wie we zijn en wat we doen: nieuws en verhalen voor Belgische ondernemers.") }),
  component: OverOns,
});

const blocks = [
  ["Wat we doen", "Pilot België brengt nieuws, reportages en gesprekken voor Belgische ondernemers — op televisie, online en in de nieuwsbrief."],
  ["Hoe we werken", "We combineren eigen verhalen van de redactie met een selectie van nieuws uit de sector. Bij elk overgenomen bericht tonen we de bron en verwijzen we naar het origineel."],
  ["Onafhankelijkheid", "Betaalde inhoud is altijd duidelijk aangeduid als 'Advertentie' of 'Gesponsord' en staat los van de redactie."],
];

function OverOns() {
  return (
    <>
      <PageTitle kicker="Over ons" title={<>Het platform voor <em>ondernemers</em></>} intro={site.tagline + "."} />
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
