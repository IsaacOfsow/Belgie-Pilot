import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { navMain, type NavItem } from "@/content/portal";
import { site } from "@/content/site";
import { edition } from "@/config/edition";
import { AnyLink } from "./portal";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-2" aria-label={`${site.name} — home`}>
      {edition.logoImage ? (
        <img src={edition.logoImage} alt={site.name} className="h-8 w-auto" />
      ) : (
        <>
          <span className="font-serif text-2xl leading-none sm:text-3xl">{edition.logoWordmark.primary}</span>
          <span className="eyebrow !text-[0.62rem]">{edition.logoWordmark.secondary}</span>
        </>
      )}
    </Link>
  );
}

const linkCls = "relative py-2 text-[0.82rem] font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground";
const activeCls = "!text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary";

function useToday() {
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    const f = new Intl.DateTimeFormat(edition.language, { weekday: "short", day: "numeric", month: "short", timeZone: edition.timezone }).format(d);
    const t = new Intl.DateTimeFormat(edition.language, { hour: "2-digit", minute: "2-digit", timeZone: edition.timezone }).format(d);
    setToday(`${f} · ${t}`);
  }, []);
  return today;
}

function Dropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3">
      <ul className="border bg-popover p-2 shadow-2xl">
        {item.children?.map((c) => (
          <li key={c.label}>
            <AnyLink to={c.to} {...(c.params ? { params: c.params } : {})} onClick={onNavigate} className="block px-4 py-2.5 hover:bg-accent">
              <span className="block text-sm font-semibold">{c.label}</span>
              {c.note && <span className="block text-xs text-muted-foreground">{c.note}</span>}
            </AnyLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const today = useToday();

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDrop(null); } };
    const click = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setDrop(null); };
    window.addEventListener("keydown", key); document.addEventListener("mousedown", click);
    return () => { window.removeEventListener("keydown", key); document.removeEventListener("mousedown", click); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Bovenbalk: live-status */}
      <div className="theme-navy border-b bg-surface">
        <div className="container-x flex h-10 items-center justify-between gap-4 text-xs">
          <p className="flex min-w-0 items-center gap-3">
            <Link to="/live" className="badge-live shrink-0"><span aria-hidden className="size-1.5 rounded-full bg-white" />Live</Link>
            <span className="truncate text-muted-foreground">{site.season}</span>
          </p>
          <Link to="/adverteren" className="hidden shrink-0 font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground sm:block">Adverteren →</Link>
        </div>
      </div>

      <header className="theme-navy sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        {/* Servicerij */}
        <div className="container-x hidden h-9 items-center justify-between border-b text-[0.72rem] text-muted-foreground md:flex">
          <p className="flex items-center gap-5">
            <Link to="/nieuwsbrief" className="font-semibold uppercase tracking-[0.14em] hover:text-foreground">Nieuwsbrief</Link>
            <Link to="/podcast" className="font-semibold uppercase tracking-[0.14em] hover:text-foreground">Podcasts</Link>
            {site.socials.map((s) => <a key={s.href} href={s.href} className="font-semibold uppercase tracking-[0.14em] hover:text-foreground">{s.label}</a>)}
          </p>
          <p suppressHydrationWarning>{today}</p>
        </div>

        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav ref={navRef} aria-label="Hoofdmenu" className="hidden items-center gap-7 lg:flex">
            {navMain.map((n) =>
              n.children ? (
                <div key={n.label} className="relative" onMouseEnter={() => setDrop(n.label)} onMouseLeave={() => setDrop(null)}>
                  <button type="button" className={linkCls} aria-expanded={drop === n.label} aria-haspopup="true" onClick={() => setDrop((d) => (d === n.label ? null : n.label))}>
                    {n.label} <span aria-hidden>▾</span>
                  </button>
                  {drop === n.label && <Dropdown item={n} onNavigate={() => setDrop(null)} />}
                </div>
              ) : (
                <AnyLink key={n.label} to={n.to} className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: n.to === "/" }}>{n.label}</AnyLink>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/zoeken" aria-label="Zoeken" className="p-2 text-muted-foreground hover:text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </Link>
            <Link to="/adverteren" className={cn(btn(), "hidden sm:inline-flex !px-5 !py-2.5")}>Adverteren</Link>
            <button type="button" className="p-2 lg:hidden" aria-label="Menu openen" aria-expanded={open} onClick={() => setOpen(true)}>
              <span className="block h-0.5 w-6 bg-foreground" /><span className="mt-1.5 block h-0.5 w-6 bg-foreground" /><span className="mt-1.5 block h-0.5 w-4 bg-primary" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="theme-navy page-fade fixed inset-0 z-[70] overflow-y-auto bg-background lg:hidden">
          <div className="container-x flex h-[72px] items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="p-2 text-sm font-bold uppercase tracking-[0.2em]" aria-label="Menu sluiten">Sluiten ✕</button>
          </div>
          <nav aria-label="Mobiel menu" className="container-x pb-12 pt-4">
            <ul>
              {navMain.map((n) => (
                <li key={n.label} className="border-b">
                  <AnyLink to={n.to} onClick={() => setOpen(false)} className="block py-3.5 font-serif text-3xl">{n.label}</AnyLink>
                  {n.children && (
                    <ul className="grid grid-cols-2 gap-x-4 pb-4">
                      {n.children.map((c) => (
                        <li key={c.label}>
                          <AnyLink to={c.to} {...(c.params ? { params: c.params } : {})} onClick={() => setOpen(false)} className="block py-1.5 text-sm text-muted-foreground">{c.label}</AnyLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="border-b"><Link to="/nieuwsbrief" onClick={() => setOpen(false)} className="block py-3.5 font-serif text-3xl">Nieuwsbrief</Link></li>
              <li className="border-b"><Link to="/zoeken" onClick={() => setOpen(false)} className="block py-3.5 font-serif text-3xl">Zoeken</Link></li>
            </ul>
            <Link to="/adverteren" onClick={() => setOpen(false)} className={cn(btn(), "mt-8 w-full")}>Adverteren</Link>
          </nav>
        </div>
      )}
    </>
  );
}
