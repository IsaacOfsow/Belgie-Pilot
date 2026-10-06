import { Link } from "@tanstack/react-router";
import { formatShort, formatStamp, SHOW_DEMO_LABELS, type Article } from "@/content/news";
import { urgencyLabels, type Urgency } from "@/content/cms";
import { liveDemo, priceLabel, programmeBySlug, type Product } from "@/content/portal";
import type { Carousel, Video } from "@/content/video";
import { edition } from "@/config/edition";
import { AnyLink, CategoryTag } from "./portal";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

/** Duidelijk label voor onderdelen die nog niet echt gekoppeld zijn (live, schema, cijfers…). */
export function DemoBadge({ children = "Demo" }: { children?: string }) {
  return <span className="border border-primary/50 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-primary">{children}</span>;
}

/** Label voor betaalde inhoud. Altijd zichtbaar, altijd hetzelfde. */
export function SponsorLabel({ children = "Partnercontent" }: { children?: string }) {
  return <span className="inline-block border border-teal px-2 py-0.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-teal">{children}</span>;
}

export function UrgencyBadge({ urgency }: { urgency?: Urgency | undefined }) {
  if (!urgency || urgency === "normaal") return null;
  return <span className={cn(urgency === "breaking" ? "badge-live" : "badge-teal")}>{urgencyLabels[urgency]}</span>;
}

/** Strook onder de header: nu / straks. DEMO zolang er geen stream is gekoppeld. */
export function LiveBanner() {
  const connected = !!edition.liveStream.embedUrl;
  return (
    <div className="border-b bg-surface">
      <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm">
        <span className="badge-live shrink-0">{connected ? "Nu live" : "Live-concept"}</span>
        <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-muted-foreground">Nu</span>
          <span className="font-head font-bold">{liveDemo.now?.title}</span>
          <span className="text-muted-foreground">· straks {liveDemo.next?.time} {liveDemo.next?.title}</span>
        </p>
        {!connected && <DemoBadge>Demo · geen stream gekoppeld</DemoBadge>}
        <Link to="/live" className="ml-auto shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground">Kijk live →</Link>
      </div>
    </div>
  );
}

/** Nieuwsstrook. Data-gedreven: geef een willekeurige lijst artikels. */
export function NewsTicker({ items, label = "Laatste nieuws" }: { items: Article[]; label?: string }) {
  return (
    <div className="border-b bg-background">
      <div className="container-x flex h-12 items-center gap-6 overflow-x-auto whitespace-nowrap text-sm" role="region" aria-label={label}>
        <span className="badge-live shrink-0">{label}</span>
        {items.map((a) => (
          <Link key={a.slug} to="/nieuws/$slug" params={{ slug: a.slug }} className="flex shrink-0 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <span aria-hidden className="text-primary">•</span>
            {a.urgency === "breaking" && <span className="font-bold uppercase text-[color:var(--live)]">Breaking</span>}
            {a.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Compacte lijst: tijd, kop, categorie, urgentie. */
export function LatestNewsList({ items, title = "Laatste nieuws" }: { items: Article[]; title?: string }) {
  return (
    <div className="flex h-full flex-col border">
      <p className="border-b bg-surface px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{title}</p>
      <ul className="flex-1 divide-y px-5">
        {items.map((a) => (
          <li key={a.slug}>
            <Link to="/nieuws/$slug" params={{ slug: a.slug }} className="group flex gap-4 py-3.5">
              <time className="w-12 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-primary">{formatStamp(a)}</time>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2"><CategoryTag slug={a.category} /><UrgencyBadge urgency={a.breaking ? "breaking" : a.urgency} /></span>
                <span className="mt-1 block font-head text-[0.95rem] font-bold leading-snug group-hover:text-primary">{a.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/nieuws" className="border-t px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground">Alle nieuws →</Link>
    </div>
  );
}

/** Meest gelezen: nog GEEN leesstatistieken. Toont de redactionele volgorde en zegt dat eerlijk. */
export function MostReadList({ items }: { items: Article[] }) {
  return (
    <div>
      <div className="flex items-center gap-3"><h2 className="text-2xl">Meest gelezen</h2><DemoBadge>Demo · redactionele volgorde</DemoBadge></div>
      <ol className="mt-4 divide-y border-y">
        {items.map((a, i) => (
          <li key={a.slug}>
            <Link to="/nieuws/$slug" params={{ slug: a.slug }} className="group flex items-start gap-4 py-4">
              <span className="w-8 shrink-0 font-serif text-4xl leading-none text-primary">{i + 1}</span>
              <span className="font-head text-base font-bold leading-snug group-hover:text-primary">{a.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function VideoCard({ v, variant = "card" }: { v: Video; variant?: "card" | "lead" }) {
  const programme = programmeBySlug(v.programme);
  return (
    <Link to="/video/$slug" params={{ slug: v.slug }} className={cn("group block overflow-hidden border bg-card transition-colors hover:border-primary/60", variant === "lead" && "relative min-h-[22rem] bg-transparent")}>
      <div className={cn("relative overflow-hidden", variant === "lead" ? "absolute inset-0" : "aspect-video")}>
        <img src={v.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {variant === "lead" && <div className="overlay-dark absolute inset-0" />}
        <span aria-hidden className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">▶</span>
        <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-xs font-semibold tabular-nums">{v.duration}</span>
      </div>
      <div className={cn("p-5", variant === "lead" && "absolute inset-x-0 bottom-0 p-6 md:p-8")}>
        {programme && <p className="eyebrow !text-[0.65rem]">{programme.title}</p>}
        <h3 className={cn("mt-2 group-hover:text-primary", variant === "lead" ? "font-serif text-3xl font-normal md:text-4xl" : "text-lg")}>{v.title}</h3>
        <p className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">{formatShort(v.publishedAt)}{v.demo && SHOW_DEMO_LABELS && <DemoBadge />}<span className="ml-auto font-bold uppercase tracking-[0.14em] text-primary">Bekijk</span></p>
      </div>
    </Link>
  );
}

/** Kaart voor korte, verticale formaten (carrousel). Koppelpunt voor Instagram/TikTok/LinkedIn. */
export function CarouselContentCard({ c }: { c: Carousel }) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden border">
      <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="overlay-dark absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="eyebrow !text-[0.65rem]">{c.label}</p>
        <h3 className="mt-2 font-serif text-2xl font-normal leading-tight">{c.title}</h3>
        <p className="mt-3 text-xs text-muted-foreground">{c.slides} slides · <span className="uppercase tracking-[0.14em]">Voorbeeld</span></p>
      </div>
    </article>
  );
}

/** Plaats voor gesponsorde inhoud. Altijd gelabeld; zonder adverteerder een uitnodiging. */
export function PartnerContentCard({ a }: { a?: Article | undefined }) {
  if (a) {
    return (
      <Link to="/nieuws/$slug" params={{ slug: a.slug }} className="group block border border-teal/60 bg-card p-6">
        <SponsorLabel />
        <h3 className="mt-3 text-xl group-hover:text-primary">{a.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
      </Link>
    );
  }
  return (
    <div className="border border-dashed border-teal/70 bg-card p-6">
      <SponsorLabel />
      <h3 className="mt-3 text-xl">Hier kan uw partnercontent staan</h3>
      <p className="mt-2 text-sm text-muted-foreground">Een artikel of video in samenwerking met de redactie, altijd duidelijk als partnercontent aangeduid.</p>
      <Link to="/adverteren" className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground">Partner worden →</Link>
    </div>
  );
}

export function CommercialCTA({ title, text }: { title?: string; text?: string }) {
  return (
    <section className="border-y bg-surface">
      <div className="container-x grid items-center gap-8 py-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">Adverteren & Samenwerken</p>
          <h2 className="mt-3 text-4xl md:text-6xl">{title ?? <>Breng jouw onderneming <em>in beeld</em></>}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{text ?? "Zakelijke zichtbaarheid via video, artikels en social media. Partnercontent blijft altijd duidelijk gescheiden van de redactie."}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link to="/adverteren" className={btn()}>Partner worden</Link>
          <Link to="/adverteren" hash="aanvragen" className={btn({ variant: "outline" })}>Neem contact op</Link>
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <li className="flex flex-col border bg-card p-6">
      <p className="eyebrow !text-[0.65rem]">Product</p>
      <h3 className="mt-2 text-xl">{p.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
      <ul className="mt-4 flex-1 space-y-2 border-t pt-4 text-sm">{p.includes.map((i) => <li key={i} className="flex gap-3"><span aria-hidden className="text-primary">+</span>{i}</li>)}</ul>
      <p className="mt-5 font-head text-sm font-bold">{priceLabel(p.price)}</p>
      <AnyLink to="/adverteren" className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground">Neem contact op →</AnyLink>
    </li>
  );
}

