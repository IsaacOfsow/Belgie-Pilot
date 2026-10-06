import { createFileRoute } from "@tanstack/react-router";
import { NewsletterForm, PageTitle } from "@/components/site/portal";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/nieuwsbrief")({
  head: () => ({ meta: meta("Nieuwsbrief", "Elke week het ondernemersnieuws in uw mailbox.") }),
  component: Nieuwsbrief,
});

function Nieuwsbrief() {
  return (
    <>
      <PageTitle kicker="Nieuwsbrief" title={<>Elke week het <em>ondernemersnieuws</em></>} intro="Een overzicht van het belangrijkste nieuws, de nieuwste video's en tips van de redactie." />
      <section className="container-x max-w-2xl py-14">
        <NewsletterForm />
        <p className="mt-6 text-sm text-muted-foreground">U kunt zich op elk moment uitschrijven.</p>
      </section>
    </>
  );
}
