import { createFileRoute } from "@tanstack/react-router";
import { schedule } from "@/content/portal";
import { PageTitle } from "@/components/site/portal";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/tvgids")({
  head: () => ({ meta: meta("TV-gids", "Het voorbeeldschema van OndernemersTV.") }),
  component: TvGids,
});

function TvGids() {
  return (
    <>
      <PageTitle kicker="Kijken" title={<>TV-<em>gids</em></>} intro="Het zenderschema. Er is nog geen echte uitzending: dit is een demo-schema." />
      <section className="container-x max-w-3xl py-14">
        <ol className="divide-y border-y">
          {schedule.map((s) => (
            <li key={s.time} className="flex items-baseline gap-6 py-5">
              <span className="w-16 shrink-0 font-serif text-3xl text-primary">{s.time}</span>
              <span className="font-head text-lg font-bold">{s.title}</span>
              <span className="ml-auto text-sm text-muted-foreground">{s.kind}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">Voorbeeldschema — de definitieve uitzendtijden volgen.</p>
      </section>
    </>
  );
}
