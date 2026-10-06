import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { nav, site, themes } from "@/content/site";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-2" aria-label={`${site.name} — home`}>
      <span className="font-serif text-2xl font-extrabold leading-none tracking-tight">Pilot</span>
      <span className="eyebrow !text-[0.62rem]">België</span>
    </Link>
  );
}

const linkCls = "relative py-2 text-[0.82rem] font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground";
const activeCls = "!text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary";

function useToday() {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Intl.DateTimeFormat("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date()));
  }, []);
  return today;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const today = useToday();

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDrop(false); } };
    const click = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false); };
    window.addEventListener("keydown", key); document.addEventListener("mousedown", click);
    return () => { window.removeEventListener("keydown", key); document.removeEventListener("mousedown", click); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Bovenbalk — zoals de "live"-balk van bouwtv */}
      <div className="border-b bg-surface">
        <div className="container-x flex h-10 items-center justify-between gap-4 text-xs">
          <p className="flex min-w-0 items-center gap-3">
            <span className="badge-live shrink-0"><span aria-hidden className="size-1.5 rounded-full bg-white" />Binnenkort</span>
            <span className="truncate text-muted-foreground">{site.season}</span>
          </p>
          <Link to="/contact" className="hidden shrink-0 font-bold uppercase tracking-[0.14em] text-primary hover:text-foreground sm:block">
            Uw verhaal voorstellen →
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        {/* Servicerij */}
        <div className="container-x hidden h-9 items-center justify-between border-b text-[0.72rem] text-muted-foreground md:flex">
          <p className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">Nieuwsbrief & redactie</a>
            {site.socials.map((s) => <a key={s.href} href={s.href} className="hover:text-foreground">{s.label}</a>)}
          </p>
          <p className="capitalize" suppressHydrationWarning>{today}</p>
        </div>

        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Hoofdmenu" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) =>
              n.to === "/themas" ? (
                <div key={n.to} ref={dropRef} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                  <button type="button" className={linkCls} aria-expanded={drop} aria-haspopup="true" onClick={() => setDrop((d) => !d)}>
                    {n.label} <span aria-hidden>▾</span>
                  </button>
                  {drop && (
                    <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                      <ul className="border bg-popover p-2 shadow-2xl">
                        <li><Link to="/themas" onClick={() => setDrop(false)} className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-accent">Alle thema's</Link></li>
                        {themes.map((t) => (
                          <li key={t.slug}>
                            <Link to="/themas/$slug" params={{ slug: t.slug }} onClick={() => setDrop(false)} className="flex gap-3 px-4 py-2 text-sm hover:bg-accent">
                              <span className="text-muted-foreground">{t.number}</span>{t.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.to} to={n.to} className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className={cn(btn(), "hidden sm:inline-flex !px-5 !py-2.5")}>{site.cta.label}</Link>
            <button type="button" className="p-2 lg:hidden" aria-label="Menu openen" aria-expanded={open} onClick={() => setOpen(true)}>
              <span className="block h-0.5 w-6 bg-foreground" /><span className="mt-1.5 block h-0.5 w-6 bg-foreground" /><span className="mt-1.5 block h-0.5 w-4 bg-primary" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="page-fade fixed inset-0 z-[70] overflow-y-auto bg-background lg:hidden">
          <div className="container-x flex h-[72px] items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="p-2 text-sm font-bold uppercase tracking-[0.2em]" aria-label="Menu sluiten">Sluiten ✕</button>
          </div>
          <nav aria-label="Mobiel menu" className="container-x pb-12 pt-6">
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} onClick={() => setOpen(false)} className="block border-b py-4 font-serif text-3xl font-extrabold">{n.label}</Link>
                  {n.to === "/themas" && (
                    <ul className="grid grid-cols-2 gap-2 py-4">
                      {themes.map((t) => (
                        <li key={t.slug}><Link to="/themas/$slug" params={{ slug: t.slug }} onClick={() => setOpen(false)} className="block py-1 text-sm text-muted-foreground">{t.number} {t.title}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link to="/contact" onClick={() => setOpen(false)} className={cn(btn(), "mt-10 w-full")}>{site.cta.label}</Link>
          </nav>
        </div>
      )}
    </>
  );
}
