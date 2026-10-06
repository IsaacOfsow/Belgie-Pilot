import { Link } from "@tanstack/react-router";
import { site, themes } from "@/content/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-primary bg-surface">
      <div className="container-x grid gap-12 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Een redactioneel televisie- en videoprogramma over ondernemers die met vakmanschap en visie koers zetten.
          </p>
        </div>
        <div>
          <p className="eyebrow">Kijken</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/afleveringen" className="text-muted-foreground hover:text-foreground">Afleveringen</Link></li>
            <li><Link to="/verhalen" className="text-muted-foreground hover:text-foreground">Verhalen</Link></li>
            <li><Link to="/programma" className="text-muted-foreground hover:text-foreground">Het programma</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Thema's</p>
          <ul className="mt-4 space-y-2 text-sm">{themes.map((t) => <li key={t.slug}><Link to="/themas/$slug" params={{ slug: t.slug }} className="text-muted-foreground hover:text-foreground">{t.title}</Link></li>)}</ul>
        </div>
        <div>
          <p className="eyebrow">Zakelijk</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Vertel uw verhaal</Link></li>
            <li><a href={`mailto:${site.email}`} className="text-primary hover:text-foreground">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>{site.socials.length ? site.socials.map((s) => <a key={s.href} href={s.href} className="ml-4">{s.label}</a>) : "Sociale kanalen volgen binnenkort"}</p>
      </div>
    </footer>
  );
}
