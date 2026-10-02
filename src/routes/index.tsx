import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import vakmanschap from "@/assets/theme-vakmanschap.jpg";
import { companies, episodes, site, themes } from "@/content/site";
import { btn, ClosingCta, CompanyCard, EmptyState, EpisodeCard, Reveal, SectionHead, ThemeCard } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: meta("Ondernemen met koers", "Pilot België brengt de verhalen van Belgische ondernemers met vakmanschap, visie en lef — op televisie en online.") }),
  component: Home,
});

const pillars = [
  { n: "I", t: "Expertise", d: "Mensen die hun vak kennen en uitleggen waarom ze doen wat ze doen." },
  { n: "II", t: "Vakmanschap", d: "Aandacht voor kwaliteit, detail en de handen achter het product." },
  { n: "III", t: "Vernieuwing", d: "Bedrijven die durven kiezen en zichtbaar vooruitgaan." },
];

const inEpisode = [
  "Een kennismaking met de mensen achter het bedrijf.",
  "Een blik achter de schermen: werkplaats, kantoor of terrein.",
  "De keuzes, twijfels en kantelpunten van het verhaal.",
  "Wat de kijker meeneemt: inzichten die ook buiten de sector gelden.",
];

function Home() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img src={hero} alt="Ondernemer in zijn atelier bij avondlicht" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="overlay-dark absolute inset-0" />
        <div className="container-x relative pb-24 pt-40 md:pb-32">
          <p className="eyebrow">{site.season}</p>
          <h1 className="mt-6 text-6xl sm:text-7xl md:text-[9rem]">Pilot <em className="text-primary">België</em></h1>
          <p className="mt-4 font-serif text-2xl md:text-4xl">Ondernemen met koers.</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Een redactioneel programma over Belgische ondernemers die met vakmanschap en visie bouwen. Wij tonen hoe zij werken, kiezen en vooruitkijken.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/programma" className={btn()}>Ontdek het programma</Link>
            <Link to="/contact" className={btn({ variant: "outline" })}>{site.cta.label}</Link>
          </div>
        </div>
        <div aria-hidden className="scroll-cue absolute bottom-8 left-1/2 hidden h-10 w-px bg-foreground/60 md:block" />
      </section>

      <section className="container-x grid items-center gap-14 py-24 md:grid-cols-2 md:py-36">
        <SectionHead num="01" eyebrow="Waarom deze verhalen" title={<>Achter elk bedrijf schuilt een <em>keuze</em>.</>}>
          Cijfers vertellen wat een bedrijf doet. Mensen vertellen waarom. Pilot België zoekt die verhalen op en brengt ze met de zorg van een documentaire.
        </SectionHead>
        <Reveal className="relative aspect-[4/5] overflow-hidden border">
          <img src={vakmanschap} alt="Vakman bewerkt hout" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/20" />
        </Reveal>
      </section>

      <section className="border-y bg-navy">
        <div className="container-x py-24">
          <SectionHead num="02" eyebrow="Redactionele pijlers" title="Waar wij naar kijken" />
          <div className="mt-14 grid gap-px border bg-border md:grid-cols-3">
            {pillars.map((p) => (
              <Reveal key={p.t} className="bg-navy p-8 md:p-10">
                <span className="font-serif text-5xl text-primary">{p.n}</span>
                <h3 className="mt-6 text-3xl">{p.t}</h3>
                <p className="mt-3 text-muted-foreground">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead num="03" eyebrow="Thema's" title="Zes invalshoeken" />
          <Link to="/themas" className={btn({ variant: "ghost" })}>Alle thema's →</Link>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{themes.map((t) => <Reveal key={t.slug}><ThemeCard t={t} /></Reveal>)}</div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead num="04" eyebrow="Uitgelicht" title="Verhalen" >Voorbeeldkaarten — de eerste echte verhalen volgen.</SectionHead>
          <Link to="/verhalen" className={btn({ variant: "ghost" })}>Alle verhalen →</Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">{companies.map((c) => <Reveal key={c.slug}><CompanyCard c={c} /></Reveal>)}</div>
      </section>

      <section className="border-t">
        <div className="container-x grid gap-14 py-24 md:grid-cols-2 md:py-32">
          <SectionHead num="05" eyebrow="In een aflevering" title="Wat u als kijker ziet" />
          <ol className="divide-y border-y">
            {inEpisode.map((s, i) => (
              <Reveal as="li" key={s} className="flex gap-6 py-6">
                <span className="font-serif text-3xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="pt-2 text-lg">{s}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <SectionHead num="06" eyebrow="Afleveringen" title="Recent" />
        <div className="mt-14">
          {episodes.length ? (
            <div className="grid gap-6 md:grid-cols-3">{episodes.slice(0, 3).map((e) => <EpisodeCard key={e.slug} e={e} />)}</div>
          ) : (
            <EmptyState title="De eerste afleveringen zijn in voorbereiding" action={<Link to="/contact" className={btn({ variant: "outline" })}>Uw verhaal voorstellen</Link>}>
              Zodra een aflevering gepubliceerd is, vindt u die hier.
            </EmptyState>
          )}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
