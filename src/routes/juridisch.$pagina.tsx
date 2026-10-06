import { createFileRoute, notFound } from "@tanstack/react-router";
import { site } from "@/content/site";
import { DemoBadge } from "@/components/site/modules";
import { PageTitle } from "@/components/site/portal";
import { meta } from "@/lib/meta";

/** CONCEPTTEKSTEN — geen juridisch goedgekeurde teksten. Laat elke pagina nakijken voor publicatie. */
const pages: Record<string, { title: string; text: string[] }> = {
  privacy: { title: "Privacy", text: ["Hier komt het privacybeleid: welke gegevens we verzamelen (bijvoorbeeld e-mailadressen voor de nieuwsbrief), waarom, hoelang we ze bewaren en welke rechten bezoekers hebben.", "Er is nog geen verwerkingsregister, verwerker of contactpersoon voor gegevensbescherming vastgelegd."] },
  cookies: { title: "Cookies", text: ["Hier komt het cookiebeleid: welke cookies de site gebruikt, met welk doel en hoe bezoekers hun keuze kunnen wijzigen.", "Op dit moment plaatst de pilot nog geen analytische of marketingcookies. Zodra die worden gekoppeld, moet deze pagina en de cookiebanner worden bijgewerkt."] },
  voorwaarden: { title: "Voorwaarden", text: ["Hier komen de gebruiksvoorwaarden en, voor adverteerders, de algemene voorwaarden voor betaalde publicaties.", "Rechten op teksten en beelden en de regels voor partnercontent moeten juridisch worden vastgelegd."] },
  "redactioneel-beleid": { title: "Redactioneel beleid", text: ["Hier komt het redactionele beleid: hoe berichten worden geselecteerd, gecontroleerd en gecorrigeerd, en hoe redactie en commercie gescheiden blijven.", "Uitgangspunt: partnercontent en advertenties zijn altijd duidelijk gelabeld en beïnvloeden de redactionele inhoud niet. Dit uitgangspunt moet nog door TV Media Partners worden bevestigd."] },
  bronnen: { title: "Bronnen & transparantie", text: ["Overgenomen berichten tonen altijd de bron en een link naar het origineel. We maken niet de indruk dat externe berichten eigen verslaggeving zijn.", "Welke bronnen worden gebruikt en onder welke voorwaarden, wordt nog vastgelegd. We nemen geen beschermde inhoud over zonder toestemming."] },
};

export const Route = createFileRoute("/juridisch/$pagina")({
  loader: ({ params }) => {
    const page = pages[params.pagina];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData ? { meta: [...meta(loaderData.page.title, `${loaderData.page.title} van ${site.name}.`), { name: "robots", content: "noindex" }] } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Juridisch,
});

function Juridisch() {
  const { page } = Route.useLoaderData();
  return (
    <>
      <PageTitle kicker="Juridisch" title={page.title}>
        <p className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><DemoBadge>Concept</DemoBadge>Conceptpagina — nog niet juridisch beoordeeld.</p>
      </PageTitle>
      <section className="container-x max-w-3xl space-y-5 py-14">
        {page.text.map((t) => <p key={t} className="text-lg leading-relaxed text-muted-foreground">{t}</p>)}
        <p className="text-sm text-muted-foreground">Vragen? Mail naar <a href={`mailto:${site.editorialEmail}`} className="text-primary">{site.editorialEmail}</a>.</p>
      </section>
    </>
  );
}
