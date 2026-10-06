import { createFileRoute, Link } from "@tanstack/react-router";
import { programmes } from "@/content/portal";
import { DemoBadge } from "@/components/site/modules";
import { AnyLink, PageTitle } from "@/components/site/portal";
import { btn } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/programmas/")({
  head: () => ({ meta: meta("Programma's", "De programma's van OndernemersTV: nieuws, interviews, reportages en meer.") }),
  component: Programmas,
});

function Programmas() {
  return (
    <>
      <PageTitle kicker="Programma's" title={<>Alle <em>programma's</em></>} intro="Elke week iets anders: gesprekken, reportages en nieuws over ondernemen in Vlaanderen.">
        <p className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Concept</DemoBadge>Dit zijn programmaconcepten voor de pilot, nog geen bestaande uitzendingen.</p>
      </PageTitle>
      <section className="container-x py-14">
        <ul className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <li key={p.slug} className="bg-background">
              <AnyLink to="/programmas/$slug" params={{ slug: p.slug }} className="group block h-full p-8 transition-colors hover:bg-card">
                <p className="flex items-center gap-3"><span className="eyebrow !text-[0.65rem]">{p.kind}</span>{p.demo && <DemoBadge>Concept</DemoBadge>}</p>
                <h2 className="mt-3 text-3xl group-hover:text-primary">{p.title}</h2>
                <p className="mt-3 text-muted-foreground">{p.blurb}</p>
              </AnyLink>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/tvgids" className={btn({ variant: "outline" })}>TV-gids (demo)</Link>
          <Link to="/afleveringen" className={btn({ variant: "outline" })}>Afleveringen</Link>
          <Link to="/video" className={btn({ variant: "outline" })}>Video</Link>
        </div>
      </section>
    </>
  );
}
