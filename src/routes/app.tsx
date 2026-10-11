import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: meta("App", "De app van Pilot België: nieuws, video en tv-gids onderweg.") }),
  component: AppPage,
});

function AppPage() {
  return (
    <>
      <PageTitle kicker="App" title={<>Altijd <em>bij de hand</em></>} intro="Nieuws, video en de tv-gids onderweg. De app wordt binnenkort aangekondigd." />
      <section className="container-x py-14">
        <Link to="/nieuwsbrief" className={btn()}>Verwittig me bij de lancering</Link>
      </section>
    </>
  );
}
