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
  { n: "01", t: "Expertise", d: "Mensen die hun vak kennen en uitleggen waarom ze doen wat ze doen." },
  { n: "02", t: "Vakmanschap", d: "Aandacht voor kwaliteit, detail en de handen achter het product." },
  { n: "03", t: "Vernieuwing", d: "Bedrijven die durven kiezen en zichtbaar vooruitgaan." },
];

const inEpisode = [
  "Een kennismaking met de mensen achter het bedrijf.",
  "Een blik achter de schermen: werkplaats, kantoor of terrein.",
  "De keuzes, twijfels en kantelpunten van het verhaal.",
  "Wat de kijker meeneemt: inzichten die ook buiten de sector gelden.",
];

function SectionBar({ title, to, label }: { title: string; to?: "/themas" | "/verhalen" | "/afleveringen"; label?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b-2 border-primary pb-3">
      <h2 className="text-2xl uppercase tracking-tight md:text-3xl">{title}</h2>
      {to && <Link to={to} className={btn({ variant: "ghost" })}>{label} →</Link>}
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Themastrook — zoals de "laatste nieuws"-balk */}
      <div className="border-b bg-surface">
        <div className="container-x flex h-12 items-center gap-5 overflow-x-auto whitespace-nowrap text-sm">
          <span className="badge-green shrink-0">Thema's</span>
          {themes.map((t) => (
            <Link key={t.slug} to="/themas/$slug" params={{ slug: t.slug }} className="shrink-0 text-muted-foreground transition-colors hover:text-foreground">
              <span className="mr-2 text-primary">{t.number}</span>{t.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Kop + uitgelicht */}
      <section className="container-x pb-12 pt-12 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Redactioneel programma over Belgische ondernemers</p>
            <h1 className="mt-4 text-5xl md:text-7xl">Pilot <em>België</em>. Ondernemen met koers.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Wij tonen hoe Belgische ondernemers met vakmanschap en visie werken, kiezen en vooruitkijken — op televisie en online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/programma" className={btn({ variant: "outline" })}>Het programma</Link>
            <Link to="/contact" className={btn()}>{site.cta.label}</Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Link to="/programma" className="group relative block min-h-[22rem] overflow-hidden border lg:col-span-2 lg:min-h-[28rem]">
            <img src={hero} alt="Ondernemer in zijn atelier bij avondlicht" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="overlay-dark absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <span className="badge-live">{site.season}</span>
              <h2 className="mt-4 max-w-xl text-3xl md:text-5xl">Het eerste seizoen is in voorbereiding</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">Ontdek waar de redactie naar kijkt en hoe een aflevering is opgebouwd.</p>
            </div>
          </Link>
          <div className="flex flex-col border">
            <p className="border-b bg-surface px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">Uitgelicht</p>
            <ul className="flex-1 divide-y">
              {companies.map((c, i) => (
                <li key={c.slug}>
                  <Link to="/verhalen/$slug" params={{ slug: c.slug }} className="group flex h-full gap-4 p-5 transition-colors hover:bg-card">
                    <span className="font-serif text-3xl font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="eyebrow !text-muted-foreground">{c.sector}</span>
                      <span className="mt-1 block font-serif text-lg font-bold leading-snug group-hover:text-primary">{c.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Verhalen */}
      <section className="container-x py-12">
        <SectionBar title="Verhalen" to="/verhalen" label="Alle verhalen" />
        <p className="mt-3 text-sm text-muted-foreground">Voorbeeldkaarten — de eerste echte verhalen volgen.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{companies.map((c) => <Reveal key={c.slug}><CompanyCard c={c} /></Reveal>)}</div>
      </section>

      {/* Waarom + beeld */}
      <section className="border-y bg-surface">
        <div className="container-x grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <SectionHead eyebrow="Waarom deze verhalen" title={<>Achter elk bedrijf schuilt een <em>keuze</em>.</>}>
            Cijfers vertellen wat een bedrijf doet. Mensen vertellen waarom. Pilot België zoekt die verhalen op en brengt ze met de zorg van een documentaire.
          </SectionHead>
          <Reveal className="relative aspect-[16/10] overflow-hidden border">
            <img src={vakmanschap} alt="Vakman bewerkt hout" loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Thema's */}
      <section className="container-x py-12 md:py-16">
        <SectionBar title="Thema's" to="/themas" label="Alle thema's" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{themes.map((t) => <Reveal key={t.slug}><ThemeCard t={t} /></Reveal>)}</div>
      </section>

      {/* Redactionele pijlers — genummerde lijst */}
      <section className="container-x pb-12 md:pb-16">
        <SectionBar title="Waar wij naar kijken" />
        <div className="mt-8 grid gap-px border bg-border md:grid-cols-3">
          {pillars.map((p) => (
            <Reveal key={p.t} className="bg-background p-8">
              <span className="font-serif text-5xl font-extrabold text-primary">{p.n}</span>
              <h3 className="mt-5 text-2xl">{p.t}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* In een aflevering */}
      <section className="border-y bg-surface">
        <div className="container-x grid gap-12 py-16 md:grid-cols-2 md:py-20">
          <SectionHead eyebrow="In een aflevering" title="Wat u als kijker ziet" />
          <ol className="divide-y border-y">
            {inEpisode.map((s, i) => (
              <Reveal as="li" key={s} className="flex gap-6 py-5">
                <span className="font-serif text-3xl font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="pt-1.5 text-lg">{s}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Afleveringen */}
      <section className="container-x py-12 md:py-16">
        <SectionBar title="Afleveringen" to="/afleveringen" label="Alle afleveringen" />
        <div className="mt-8">
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
