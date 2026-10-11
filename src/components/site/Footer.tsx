import { Link } from "@tanstack/react-router";
import { categories } from "@/content/news";
import { site } from "@/content/site";
import { AnyLink, NewsletterForm } from "./portal";
import { Logo } from "./Header";

const col = "mt-4 space-y-2 text-sm";
const lnk = "text-muted-foreground hover:text-foreground";

export function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-primary bg-surface">
      <div className="container-x grid gap-10 border-b py-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">Elke week het ondernemersnieuws</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Mis geen enkel <em>verhaal</em></h2>
        </div>
        <NewsletterForm />
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Het nieuws- en videoplatform voor Belgische ondernemers: nieuws, reportages en verhalen over vakmanschap en visie.
          </p>
        </div>
        <div>
          <p className="eyebrow">Kijken</p>
          <ul className={col}>
            <li><Link to="/kijken" className={lnk}>Alle programma's</Link></li>
            <li><Link to="/afleveringen" className={lnk}>Afleveringen</Link></li>
            <li><Link to="/verhalen" className={lnk}>Verhalen</Link></li>
            <li><Link to="/themas" className={lnk}>Thema's</Link></li>
            <li><Link to="/tvgids" className={lnk}>TV-gids</Link></li>
            <li><Link to="/podcast" className={lnk}>Podcasts</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Nieuws</p>
          <ul className={col}>
            <li><Link to="/nieuws" className={lnk}>Alle nieuws</Link></li>
            {categories.map((c) => <li key={c.slug}><AnyLink to="/rubriek/$slug" params={{ slug: c.slug }} className={lnk}>{c.label}</AnyLink></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Zakelijk</p>
          <ul className={col}>
            <li><Link to="/adverteren" className="font-semibold text-primary hover:text-foreground">Adverteren</Link></li>
            <li><Link to="/over-ons" className={lnk}>Over ons</Link></li>
            <li><Link to="/contact" className={lnk}>Contact</Link></li>
            <li><Link to="/contact" className={lnk}>Vertel uw verhaal</Link></li>
            <li><a href={`mailto:${site.email}`} className={lnk}>{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col justify-between gap-3 border-t py-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {[["privacy", "Privacy"], ["cookies", "Cookies"], ["disclaimer", "Disclaimer"], ["voorwaarden", "Algemene voorwaarden"]].map(([slug, label]) => (
            <li key={slug}><AnyLink to="/juridisch/$pagina" params={{ pagina: slug as string }} className="hover:text-foreground">{label}</AnyLink></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
