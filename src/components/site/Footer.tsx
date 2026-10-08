import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { edition } from "@/config/edition";
import { AnyLink, NewsletterForm } from "./portal";
import { Logo } from "./Header";

const lnk = "text-muted-foreground hover:text-foreground";

const legal: [string, string][] = [["privacy", "Privacy"], ["cookies", "Cookies"], ["voorwaarden", "Voorwaarden"], ["redactioneel-beleid", "Redactioneel beleid"], ["bronnen", "Bronnen & transparantie"]];

export function Footer() {
  return (
    <footer className="theme-navy mt-8 border-t-2 border-primary bg-background">
      {/* Blijf op de hoogte — op elke pagina, zoals ondernemerstv.nl */}
      <div className="container-x grid gap-8 border-b py-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">Nieuwsbrief</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Blijf op de <em>hoogte</em></h2>
          <p className="mt-3 text-muted-foreground">Elke vrijdag de belangrijkste verhalen, in 5 minuten.</p>
        </div>
        <NewsletterForm />
      </div>

      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{site.tagline}.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <li><Link to="/over-ons" className={lnk}>Over ons</Link></li>
          <li><Link to="/contact" className={lnk}>Contact</Link></li>
          <li><Link to="/adverteren" className="text-primary hover:text-foreground">Adverteren</Link></li>
        </ul>
        {site.socials.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {site.socials.map((s) => <li key={s.href}><a href={s.href} rel="noopener noreferrer" className={lnk}>{s.label}</a></li>)}
          </ul>
        )}
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
      {edition.pilot.enabled && (
        <p className="container-x border-t pb-6 pt-4 text-xs text-muted-foreground">Pilotversie — voorbeeldinhoud, demo-onderdelen gemarkeerd. Nog geen live stream, analytics of betaalde producten gekoppeld.</p>
      )}
    </footer>
  );
}
