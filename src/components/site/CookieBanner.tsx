import { useEffect, useState } from "react";
import { AnyLink } from "./portal";
import { btn } from "./ui";

/**
 * Cookiebanner (concept). De keuze wordt lokaal bewaard. Er worden nu nog GEEN analytische of marketingcookies geplaatst;
 * zodra analytics (edition.analyticsId) of advertentiescripts worden gekoppeld, moeten die hier aan de keuze hangen.
 * Deze tekst en werking zijn nog niet juridisch beoordeeld.
 */
const KEY = "cookie-consent-v1";
type Choice = { analytics: boolean; marketing: boolean };

const read = (): Choice | null => {
  try { const v = window.localStorage.getItem(KEY); return v ? (JSON.parse(v) as Choice) : null; } catch { return null; }
};
const write = (c: Choice) => { try { window.localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* opslag niet beschikbaar */ } };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: false, marketing: false });

  useEffect(() => {
    const saved = read();
    if (saved) setChoice(saved); else setVisible(true);
    const open = () => { setDetails(true); setVisible(true); };
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  const save = (c: Choice) => { write(c); setChoice(c); setVisible(false); setDetails(false); };
  if (!visible) return null;

  const row = "flex items-start gap-3 border-t py-3 text-sm";
  return (
    <section aria-label="Cookie-instellingen" className="fixed inset-x-0 bottom-0 z-[80] border-t-2 border-primary bg-popover shadow-2xl">
      <div className="container-x py-5">
        <p className="font-head text-base font-bold">Cookies op deze website</p>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          We gebruiken noodzakelijke cookies om de site te laten werken. Met uw toestemming kunnen we later ook statistieken en marketing toevoegen.
          Meer in ons <AnyLink to="/juridisch/$pagina" params={{ pagina: "cookies" }} className="text-primary underline">cookiebeleid</AnyLink> (concept).
        </p>
        {details && (
          <div className="mt-4 max-w-3xl">
            <label className={row}><input type="checkbox" checked disabled className="mt-1" /><span><b>Noodzakelijk</b><br /><span className="text-muted-foreground">Altijd actief.</span></span></label>
            <label className={row}><input type="checkbox" checked={choice.analytics} onChange={(e) => setChoice({ ...choice, analytics: e.target.checked })} className="mt-1" /><span><b>Analytics</b><br /><span className="text-muted-foreground">Helpt ons begrijpen hoe de site gebruikt wordt. Nog niet gekoppeld.</span></span></label>
            <label className={row}><input type="checkbox" checked={choice.marketing} onChange={(e) => setChoice({ ...choice, marketing: e.target.checked })} className="mt-1" /><span><b>Marketing</b><br /><span className="text-muted-foreground">Voor advertenties en sociale media. Nog niet gekoppeld.</span></span></label>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className={btn()} onClick={() => save({ analytics: true, marketing: true })}>Alles accepteren</button>
          <button type="button" className={btn({ variant: "outline" })} onClick={() => save({ analytics: false, marketing: false })}>Alleen noodzakelijke</button>
          {details
            ? <button type="button" className={btn({ variant: "ghost" })} onClick={() => save(choice)}>Keuze opslaan</button>
            : <button type="button" className={btn({ variant: "ghost" })} onClick={() => setDetails(true)}>Instellingen</button>}
        </div>
      </div>
    </section>
  );
}
