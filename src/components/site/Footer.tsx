import { Link } from "@tanstack/react-router";
import { categories } from "@/content/news";
import { site } from "@/content/site";
import { edition } from "@/config/edition";
import { AnyLink, NewsletterForm } from "./portal";
import { Logo } from "./Header";

const col = "mt-4 space-y-2 text-sm";
const lnk = "text-muted-foreground hover:text-foreground";

const legal: [string, string][] = [["privacy", "Privacy"], ["cookies", "Cookies"], ["voorwaarden", "Voorwaarden"], ["redactioneel-beleid", "Redactioneel beleid"], ["bronnen", "Bronnen & transparantie"]];

export function Footer() {
  return (
    <footer className="theme-navy mt-8 border-t-2 border-primary bg-background">
      <div className="container-x grid gap-10 border-b py-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">Nieuwsbrief</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Blijf op de hoogte van <em>ondernemend Vlaanderen</em></h2>
        </div>
        <NewsletterForm />
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{site.tagline}.</p>
          {site.socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {site.socials.map((s) => <li key={s.href}><a href={s.href} rel="noopener noreferrer" className={lnk}>{s.label}</a></li>)}
            </ul>
          )}
        </div>
        <div>
          <p className="eyebrow">Nieuws</p>
          <ul className={col}>
            <li><Link to="/nieuws" className={lnk}>Alle nieuws</Link></li>
            {categories.map((c) => <li key={c.slug}><AnyLink to="/categorie/$slug" params={{ slug: c.slug }} className={lnk}>{c.label}</AnyLink></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Kijken</p>
          <ul className={col}>
            <li><Link to="/video" className={lnk}>Video</Link></li>
            <li><Link to="/programmas" className={lnk}>Programma's</Link></li>
            <li><Link to="/live" className={lnk}>Live</Link></li>
            <li><Link to="/tvgids" className={lnk}>TV-gids</Link></li>
            <li><Link to="/podcast" className={lnk}>Podcasts</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Zakelijk</p>
          <ul className={col}>
            <li><Link to="/adverteren" className="font-semibold text-primary hover:text-foreground">Adverteren</Link></li>
            <li><Link to="/over-ons" className={lnk}>Over ons</Link></li>
            <li><Link to="/contact" className={lnk}>Contact</Link></li>
            <li><Link to="/nieuwsbrief" className={lnk}>Nieuwsbrief</Link></li>
            <li><a href={`mailto:${site.email}`} className={lnk}>{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col justify-between gap-3 border-t py-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} {site.name}{edition.initiative.approved ? ` · ${edition.initiative.text}` : ""}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {legal.map(([slug, label]) => (
            <li key={slug}><AnyLink to="/juridisch/$pagina" params={{ pagina: slug }} className="hover:text-foreground">{label}</AnyLink></li>
          ))}
          <li><button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} className="hover:text-foreground">Cookie-instellingen</button></li>
        </ul>
      </div>
    </footer>
  );
}
