import { createFileRoute, notFound } from "@tanstack/react-router";
import { site } from "@/content/site";
import { PageTitle } from "@/components/site/portal";
import { meta } from "@/lib/meta";

const pages: Record<string, string> = { privacy: "Privacy", cookies: "Cookies", disclaimer: "Disclaimer", voorwaarden: "Algemene voorwaarden" };

export const Route = createFileRoute("/juridisch/$pagina")({
  loader: ({ params }) => {
    const title = pages[params.pagina];
    if (!title) throw notFound();
    return { title };
  },
  head: ({ loaderData }) => loaderData ? { meta: meta(loaderData.title, `${loaderData.title} van Pilot België.`) } : { meta: [{ title: "Niet gevonden" }, { name: "robots", content: "noindex" }] },
  component: Juridisch,
});

function Juridisch() {
  const { title } = Route.useLoaderData();
  return (
    <>
      <PageTitle kicker="Juridisch" title={title} />
      <section className="container-x max-w-3xl py-14">
        {/* PLACEHOLDER — vervang door de echte tekst (laat deze juridisch nakijken). */}
        <p className="text-lg text-muted-foreground">Deze tekst wordt binnenkort toegevoegd. Vragen? Mail naar <a href={`mailto:${site.email}`} className="text-primary">{site.email}</a>.</p>
      </section>
    </>
  );
}
