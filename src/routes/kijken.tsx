import { createFileRoute, Link } from "@tanstack/react-router";
import { programmes } from "@/content/portal";
import { AnyLink, PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/kijken")({
  head: () => ({ meta: meta("Kijken", "Alle programma's van Pilot België: talkshow, documentaires, reeksen, nieuws en podcast.") }),
  component: Kijken,
});

function Kijken() {
  return (
    <>
      <PageTitle kicker="Kijken" title={<>Alle <em>programma's</em></>} intro="Elke week iets anders: gesprekken, reportages en nieuws over ondernemen in België." />
      <section className="container-x py-14">
        <ul className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <li key={p.slug} className="bg-background">
              <AnyLink to={p.to} className="group block h-full p-8 transition-colors hover:bg-card">
                <p className="eyebrow !text-[0.65rem]">{p.kind}</p>
                <h2 className="mt-3 text-3xl group-hover:text-primary">{p.title}</h2>
                <p className="mt-3 text-muted-foreground">{p.blurb}</p>
              </AnyLink>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/tvgids" className={btn({ variant: "outline" })}>TV-gids</Link>
          <Link to="/afleveringen" className={btn({ variant: "outline" })}>Afleveringen</Link>
          <Link to="/programma" className={btn({ variant: "outline" })}>Over het programma</Link>
        </div>
      </section>
    </>
  );
}
