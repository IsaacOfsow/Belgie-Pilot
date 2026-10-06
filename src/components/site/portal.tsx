import { Link } from "@tanstack/react-router";
import { edition } from "@/config/edition";
import { useState, type FormEvent, type ReactNode } from "react";
import { categoryBySlug, formatShort, formatStamp, SHOW_DEMO_LABELS, type Article } from "@/content/news";
import { site } from "@/content/site";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

/** Link met een losse `to` (voor menu's en data-gedreven routes). */
export const AnyLink = Link as unknown as (props: {
  to: string; params?: Record<string, string>; className?: string; onClick?: () => void; children?: ReactNode;
  activeProps?: { className: string }; activeOptions?: { exact: boolean }; "aria-label"?: string;
}) => ReactNode;

/** Sectiekop met gouden lijn en optionele "alles bekijken"-link. */
export function SectionBar({ title, kicker, to, label }: { title: ReactNode; kicker?: string; to?: string; label?: string }) {
  return (
    <div className="relative flex items-end justify-between gap-6 border-b pb-3">
      <span aria-hidden className="absolute -bottom-px left-0 h-[3px] w-16 bg-gold" />
      <div>
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 className="mt-1 text-3xl md:text-4xl">{title}</h2>
      </div>
      {to && <AnyLink to={to} className={cn(btn({ variant: "ghost" }), "shrink-0")}>{label ?? "Alles bekijken"} →</AnyLink>}
    </div>
  );
}

export function CategoryTag({ slug }: { slug: string }) {
  const c = categoryBySlug(slug);
  if (!c) return null;
  return <span className="eyebrow inline-flex items-center gap-2 !text-[0.65rem]"><span aria-hidden className="h-3 w-[3px] bg-gold" />{c.label}</span>;
}

function DemoTag() {
  if (!SHOW_DEMO_LABELS) return null;
  return <span className="border border-primary/50 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-primary">Demo</span>;
}

/** Nieuwskaart. variant: lead (hoofdbericht, tekst over beeld), major (grote kaart), card (standaard), thumb (beeld links), row (compact kopregel). */
export function ArticleCard({ a, variant = "card" }: { a: Article; variant?: "card" | "major" | "lead" | "row" | "thumb" }) {
  const common = { to: "/nieuws/$slug", params: { slug: a.slug } } as const;
  if (variant === "lead") {
    return (
      <Link {...common} className="theme-navy group relative block min-h-[22rem] overflow-hidden border lg:min-h-[30rem]">
        <img src={a.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="overlay-dark absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="flex items-center gap-3"><CategoryTag slug={a.category} />{a.demo && <DemoTag />}</div>
          <h3 className="mt-3 max-w-2xl font-serif text-3xl font-normal leading-[1.05] md:text-5xl">{a.title}</h3>
          <p className="mt-3 max-w-xl text-muted-foreground">{a.excerpt}</p>
          <p className="mt-4 text-xs text-muted-foreground">{a.author ?? a.source?.name} · {formatShort(a.publishedAt)}</p>
        </div>
      </Link>
    );
  }
  if (variant === "major") {
    return (
      <Link {...common} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden border">
          <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {a.video && <span className="badge-live absolute left-3 top-3">Video</span>}
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-3"><CategoryTag slug={a.category} />{a.demo && <DemoTag />}</div>
          <h3 className="mt-2 font-serif text-2xl font-normal leading-[1.1] group-hover:underline md:text-3xl">{a.title}</h3>
          <p className="mt-2 line-clamp-3 leading-relaxed text-muted-foreground">{a.excerpt}</p>
          <p className="mt-3 text-xs text-muted-foreground">{a.author ?? a.source?.name} · {formatStamp(a)}</p>
        </div>
      </Link>
    );
  }
  if (variant === "row") {
    return (
      <Link {...common} className="group flex gap-4 py-4">
        <span className="w-14 shrink-0 pt-0.5 text-xs font-semibold tabular-nums tracking-wide text-primary">{formatStamp(a)}</span>
        <span className="min-w-0">
          <CategoryTag slug={a.category} />
          <span className="mt-1 block font-head text-base font-bold leading-snug group-hover:text-primary">{a.title}</span>
        </span>
      </Link>
    );
  }
  if (variant === "thumb") {
    return (
      <Link {...common} className="group flex gap-4">
        <img src={a.image} alt="" loading="lazy" className="aspect-[4/3] w-28 shrink-0 object-cover sm:w-36" />
        <span className="min-w-0">
          <CategoryTag slug={a.category} />
          <span className="mt-1 block font-head text-base font-bold leading-snug group-hover:text-primary">{a.title}</span>
          <span className="mt-1 block text-xs text-muted-foreground">{formatShort(a.publishedAt)}</span>
        </span>
      </Link>
    );
  }
  return (
    <Link {...common} className="group block overflow-hidden border bg-card transition-colors hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {a.video && <span className="badge-live absolute left-3 top-3">Video</span>}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3"><CategoryTag slug={a.category} />{a.demo && <DemoTag />}</div>
        <h3 className="mt-2 text-lg group-hover:text-primary md:text-xl">{a.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
        <p className="mt-4 text-xs text-muted-foreground">{a.author ?? a.source?.name} · {formatShort(a.publishedAt)}</p>
      </div>
    </Link>
  );
}

/**
 * Advertentieplek. Zolang er geen adverteerder is, toont het een uitnodiging naar /adverteren.
 * Geef `ad` mee om een echte advertentie te tonen: { href, image, alt, advertiser }.
 */
export type Ad = { href: string; image: string; alt: string; advertiser: string };

export function AdSlot({ size = "leaderboard", ad, className }: { size?: "leaderboard" | "rectangle"; ad?: Ad; className?: string }) {
  const box = size === "leaderboard" ? "min-h-[90px] w-full" : "min-h-[250px] w-full max-w-[300px]";
  return (
    <aside aria-label="Advertentie" className={cn("mx-auto", className)}>
      <p className="mb-1 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Advertentie</p>
      {ad ? (
        <a href={ad.href} target="_blank" rel="sponsored noopener" className={cn("block", box)}>
          <img src={ad.image} alt={ad.alt} className="mx-auto" />
        </a>
      ) : (
        <Link to="/adverteren" className={cn("flex flex-col items-center justify-center gap-1 border border-dashed border-primary/40 bg-surface px-4 py-4 text-center transition-colors hover:border-primary", box)}>
          <span className="font-head text-sm font-bold">Hier kan uw advertentie staan</span>
          <span className="text-xs text-muted-foreground">Zichtbaar bij ondernemers in {edition.region} — prijs op aanvraag</span>
          <span className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">Adverteren →</span>
        </Link>
      )}
    </aside>
  );
}

/** Nieuwsbriefformulier. Er is nog geen mailservice gekoppeld: het opent het e-mailprogramma. */
export function NewsletterForm({ compact }: { compact?: boolean }) {
  const [error, setError] = useState("");
  const [href, setHref] = useState<string | null>(null);
  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const email = String(new FormData(ev.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Vul een geldig e-mailadres in."); setHref(null); return; }
    setError("");
    const h = `mailto:${site.email}?subject=${encodeURIComponent("Aanmelding nieuwsbrief")}&body=${encodeURIComponent(`Graag aanmelden voor de nieuwsbrief: ${email}`)}`;
    setHref(h);
    window.location.href = h;
  };
  return (
    <form noValidate onSubmit={submit} className={cn("flex flex-col gap-3", compact ? "" : "sm:flex-row")}>
      <div className="flex-1">
        <label htmlFor="nl-email" className="sr-only">E-mailadres</label>
        <input id="nl-email" name="email" type="email" placeholder="uw@email.be" aria-invalid={!!error} className="w-full border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive" />
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
      <button type="submit" className={btn()}>Aanmelden</button>
      {href && <p role="status" className="text-xs text-muted-foreground sm:basis-full">Uw e-mailprogramma opent nu. Lukt dat niet? <a href={href} className="text-primary underline">Klik hier</a>.</p>}
    </form>
  );
}

/** Eenvoudige pagina-kop voor de nieuwe pagina's. */
export function PageTitle({ kicker, title, intro, children }: { kicker: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b bg-surface">
      <div className="container-x py-14 md:py-20">
        <p className="eyebrow">{kicker}</p>
        <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
