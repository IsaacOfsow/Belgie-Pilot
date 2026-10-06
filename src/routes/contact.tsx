import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { sectors, site } from "@/content/site";
import { btn, PageHero } from "@/components/site/ui";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: meta("Contact", "Vertel uw verhaal aan de redactie van OndernemersTV Vlaanderen. Vul het intakeformulier in of mail ons rechtstreeks.") }),
  component: Contact,
});

const schema = z.object({
  naam: z.string().trim().min(2, "Vul uw naam in.").max(100),
  bedrijf: z.string().trim().min(2, "Vul de bedrijfsnaam in.").max(120),
  functie: z.string().trim().max(100).optional(),
  sector: z.string().min(1, "Kies een sector."),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(255),
  telefoon: z.string().trim().max(30).regex(/^[+\d\s()/-]*$/, "Gebruik alleen cijfers en + ( ) - /").optional(),
  toelichting: z.string().trim().min(20, "Vertel ons iets meer (min. 20 tekens).").max(2000),
});
type Data = z.infer<typeof schema>;
const fields: { name: keyof Data; label: string; type?: string; required?: boolean }[] = [
  { name: "naam", label: "Naam", required: true },
  { name: "bedrijf", label: "Bedrijf", required: true },
  { name: "functie", label: "Functie" },
  { name: "email", label: "E-mail", type: "email", required: true },
  { name: "telefoon", label: "Telefoon", type: "tel" },
];

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [mailto, setMailto] = useState<string | null>(null);

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const raw = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(raw);
    if (!r.success) {
      const e: typeof errors = {};
      r.error.issues.forEach((i) => { e[i.path[0] as keyof Data] ??= i.message; });
      setErrors(e); setMailto(null);
      ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    const d = r.data;
    const body = `Naam: ${d.naam}\nBedrijf: ${d.bedrijf}\nFunctie: ${d.functie ?? ""}\nSector: ${d.sector}\nE-mail: ${d.email}\nTelefoon: ${d.telefoon ?? ""}\n\n${d.toelichting}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(`Intake: ${d.bedrijf}`)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    window.location.href = href;
  };

  const input = "mt-2 w-full border bg-card px-4 py-3 text-foreground aria-[invalid=true]:border-destructive";
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Vertel uw <em>verhaal</em></>} intro="Heeft uw bedrijf een verhaal over vakmanschap, vernieuwing of groei? De redactie leest elke aanvraag." />
      <section className="container-x grid gap-16 py-20 md:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-10">
          <div><p className="eyebrow">Rechtstreeks</p><a href={`mailto:${site.email}`} className="mt-3 block font-serif text-3xl hover:text-primary">{site.email}</a>{site.phone && <p className="mt-2">{site.phone}</p>}</div>
          <div><p className="eyebrow">Wat gebeurt er daarna?</p><p className="mt-3 text-muted-foreground">De redactie bekijkt uw aanvraag en neemt contact op als uw verhaal past binnen een thema. Een aanvraag is vrijblijvend.</p></div>
        </aside>
        <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="text-sm">{f.label}{f.required && <span className="text-primary"> *</span>}</label>
              <input id={f.name} name={f.name} type={f.type ?? "text"} aria-invalid={!!errors[f.name]} aria-describedby={`${f.name}-err`} className={input} />
              {errors[f.name] && <p id={`${f.name}-err`} className="mt-1 text-sm text-destructive">{errors[f.name]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="sector" className="text-sm">Sector<span className="text-primary"> *</span></label>
            <select id="sector" name="sector" defaultValue="" aria-invalid={!!errors.sector} className={input}>
              <option value="" disabled>Kies…</option>{sectors.map((s) => <option key={s}>{s}</option>)}<option>Andere</option>
            </select>
            {errors.sector && <p className="mt-1 text-sm text-destructive">{errors.sector}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="toelichting" className="text-sm">Toelichting<span className="text-primary"> *</span></label>
            <textarea id="toelichting" name="toelichting" rows={6} aria-invalid={!!errors.toelichting} className={input} />
            {errors.toelichting && <p className="mt-1 text-sm text-destructive">{errors.toelichting}</p>}
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={btn()}>Open in e-mailprogramma</button>
            <p className="mt-3 text-xs text-muted-foreground">Dit formulier verstuurt nog niets automatisch: het opent uw e-mailprogramma met een ingevuld bericht.</p>
            {mailto && <p role="status" className="mt-4 border border-primary/40 p-4 text-sm">Uw e-mailprogramma zou nu moeten openen. Lukt dat niet? <a href={mailto} className="text-primary underline">Klik hier</a> of mail naar {site.email}.</p>}
          </div>
        </form>
      </section>
    </>
  );
}
