import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { site } from "@/content/site";
import { PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: meta("Live", "Kijk live naar Pilot België.") }),
  component: Live,
});

function Live() {
  return (
    <>
      <PageTitle kicker="Live" title={<>Kijk <em>live</em></>} intro="Hier verschijnt de livestream zodra het eerste seizoen start." />
      <section className="container-x py-14">
        <div className="relative aspect-video overflow-hidden border">
          <img src={hero} alt="" className="h-full w-full object-cover" />
          <div className="overlay-dark absolute inset-0" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="badge-live">Binnenkort live</span>
            <p className="font-serif text-4xl md:text-6xl">{site.season}</p>
            <Link to="/nieuwsbrief" className={btn()}>Verwittig me bij de start</Link>
          </div>
        </div>
      </section>
    </>
  );
}
