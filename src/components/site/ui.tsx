import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { Theme, Company, Episode } from "@/content/site";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-300 rounded-sm",
  {
    variants: {
      variant: {
        gold: "bg-primary text-primary-foreground hover:bg-foreground",
        outline: "border border-foreground/40 text-foreground hover:border-primary hover:text-primary",
        ghost: "text-primary hover:text-foreground px-0",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);
export type BtnProps = VariantProps<typeof btn>;

export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // @ts-expect-error polymorphic ref
  return <Tag ref={ref} className={cn("reveal", className)}>{children}</Tag>;
}

export function SectionHead({ num, eyebrow, title, children }: { num?: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="max-w-3xl">
      <p className="eyebrow">{num && <span className="mr-3 text-muted-foreground">{num}</span>}{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-5xl">{title}</h2>
      {children && <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image?: string }) {
  return (
    <section className="relative flex min-h-[44vh] items-end overflow-hidden border-b">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className={cn("absolute inset-0", image ? "overlay-dark" : "bg-navy")} />
      <div className="container-x relative pb-14 pt-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-5xl md:text-7xl lg:text-8xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function ThemeCard({ t }: { t: Theme }) {
  return (
    <Link to="/themas/$slug" params={{ slug: t.slug }} className="group block overflow-hidden border bg-card transition-colors hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={t.image} alt={t.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-background/20" />
        <span className="badge-green absolute left-4 top-4">Thema {t.number}</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl md:text-2xl">{t.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.intro}</p>
        <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.14em] text-primary">Lees verder →</span>
      </div>
    </Link>
  );
}

export function CompanyCard({ c }: { c: Company }) {
  return (
    <Link to="/verhalen/$slug" params={{ slug: c.slug }} className="group block overflow-hidden border bg-card transition-colors hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-background/20" />
        <span className="absolute left-4 top-4 bg-primary px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-primary-foreground">{c.sector}</span>
        {c.demo && <span className="absolute right-4 top-4 border border-primary/60 bg-background/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">Demo</span>}
      </div>
      <div className="p-5">
        <h3 className="text-xl md:text-2xl">{c.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
      </div>
    </Link>
  );
}

export function EpisodeCard({ e }: { e: Episode }) {
  return (
    <Link to="/afleveringen/$slug" params={{ slug: e.slug }} className="group block overflow-hidden border bg-card transition-colors hover:border-primary/60">
      <div className="relative">
        <img src={e.thumbnail} alt={e.title} loading="lazy" className="aspect-video w-full object-cover" />
        <span className="badge-live absolute left-4 top-4">Video</span>
      </div>
      <div className="p-5">
        <p className="eyebrow">{e.season}{e.duration && ` · ${e.duration}`}</p>
        <h3 className="mt-2 text-xl md:text-2xl">{e.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
        {e.date && <p className="mt-3 text-xs text-muted-foreground">{e.date}</p>}
      </div>
    </Link>
  );
}

export function EmptyState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="border border-dashed px-6 py-16 text-center md:py-24">
      <p className="eyebrow">Binnenkort</p>
      <h3 className="mx-auto mt-4 max-w-xl text-3xl md:text-4xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{children}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export function ClosingCta({ title = "Heeft uw bedrijf een verhaal dat verteld moet worden?", text = "De redactie zoekt ondernemers met vakkennis, lef en een duidelijke visie. Neem vrijblijvend contact op voor een eerste gesprek." }) {
  return (
    <section className="border-t bg-navy">
      <div className="container-x py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow">Redactie</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl md:text-5xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{text}</p>
          <Link to="/contact" className={cn(btn(), "mt-10")}>Vertel uw verhaal</Link>
        </Reveal>
      </div>
    </section>
  );
}
