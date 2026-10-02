import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { nav, site, themes } from "@/content/site";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-2" aria-label={`${site.name} — home`}>
      <span className="font-serif text-2xl leading-none">Pilot</span>
      <span className="eyebrow !text-[0.62rem]">België</span>
    </Link>
  );
}

const linkCls = "text-[0.8rem] font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors";

export function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
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
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500", scrolled ? "border-border bg-background/90 backdrop-blur" : "border-transparent")}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Hoofdmenu" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) =>
            n.to === "/themas" ? (
              <div key={n.to} ref={dropRef} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                <button type="button" className={linkCls} aria-expanded={drop} aria-haspopup="true" onClick={() => setDrop((d) => !d)}>
                  {n.label} <span aria-hidden>▾</span>
                </button>
                {drop && (
                  <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4">
                    <ul className="border bg-popover p-2 shadow-2xl">
                      <li><Link to="/themas" onClick={() => setDrop(false)} className="block px-4 py-2 text-sm text-primary hover:bg-accent">Alle thema's</Link></li>
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
              <Link key={n.to} to={n.to} className={linkCls} activeProps={{ className: "!text-foreground" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className={cn(btn(), "hidden sm:inline-flex !px-5 !py-2.5")}>{site.cta.label}</Link>
          <button type="button" className="p-2 lg:hidden" aria-label="Menu openen" aria-expanded={open} onClick={() => setOpen(true)}>
            <span className="block h-px w-6 bg-foreground" /><span className="mt-1.5 block h-px w-6 bg-foreground" /><span className="mt-1.5 block h-px w-4 bg-foreground" />
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="page-fade fixed inset-0 z-[70] overflow-y-auto bg-background lg:hidden">
          <div className="container-x flex h-20 items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="p-2 text-sm uppercase tracking-[0.2em]" aria-label="Menu sluiten">Sluiten ✕</button>
          </div>
          <nav aria-label="Mobiel menu" className="container-x pb-12 pt-6">
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} onClick={() => setOpen(false)} className="block border-b py-4 font-serif text-4xl">{n.label}</Link>
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
