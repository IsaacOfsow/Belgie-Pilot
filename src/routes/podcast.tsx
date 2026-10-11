import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/site/portal";
import { EmptyState, btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/podcast")({
  head: () => ({ meta: meta("Podcasts", "Lange gesprekken met Belgische ondernemers, ook onderweg te beluisteren.") }),
  component: Podcast,
});

function Podcast() {
  return (
    <>
      <PageTitle kicker="Luisteren" title={<>De Pilot <em>Podcast</em></>} intro="Lange gesprekken met ondernemers over keuzes, twijfels en doorbraken." />
      <section className="container-x py-14">
        <EmptyState title="De eerste aflevering volgt" action={<Link to="/nieuwsbrief" className={btn({ variant: "outline" })}>Verwittig me</Link>}>
          Zodra de podcast online staat, vindt u hem hier en op de bekende podcastplatformen.
        </EmptyState>
      </section>
    </>
  );
}
