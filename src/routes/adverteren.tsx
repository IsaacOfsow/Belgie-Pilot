import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { adFormats, adSizes, faq, stats, tiers } from "@/content/portal";
import { site } from "@/content/site";
import { btn } from "@/components/site/ui";
import { PageTitle } from "@/components/site/portal";
import { cn } from "@/lib/utils";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/adverteren")({
  head: () => ({ meta: meta("Adverteren", "Adverteer bij Belgische ondernemers: banners, gesponsorde artikels en nieuwsbriefvermeldingen vanaf een klein bedrag.") }),
  component: Adverteren,
});

const schema = z.object({
  naam: z.string().trim().min(2, "Vul uw naam in.").max(100),
  bedrijf: z.string().trim().min(2, "Vul de bedrijfsnaam in.").max(120),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(255),
  pakket: z.string().min(1, "Kies een pakket of vorm."),
  bericht: z.string().trim().max(2000).optional(),
});
type Data = z.infer<typeof schema>;

function Adverteren() {
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [mailto, setMailto] = useState<string | null>(null);
  const showStats = stats.some((s) => s.value !== "—");

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(ev.currentTarget)));
    if (!r.success) {
      const e: typeof errors = {};
      r.error.issues.forEach((i) => { e[i.path[0] as keyof Data] ??= i.message; });
      setErrors(e); setMailto(null);
      ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    const d = r.data;
    const body = `Naam: ${d.naam}\nBedrijf: ${d.bedrijf}\nE-mail: ${d.email}\nPakket/vorm: ${d.pakket}\n\n${d.bericht ?? ""}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(`Adverteren: ${d.bedrijf}`)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    window.location.href = href;
  };

  const input = "mt-2 w-full border bg-card px-4 py-3 text-foreground aria-[invalid=true]:border-destructive";
  return (
    <>
      <PageTitle kicker="Adverteren" title={<>Uw merk zichtbaar bij Belgische <em>ondernemers</em></>}
        intro="Adverteren kan al voor een klein bedrag. Kies een pakket of een losse vorm en bereik de mensen die beslissen over bedrijven.">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#aanvragen" className={btn()}>Vraag een offerte</a>
          <a href="#pakketten" className={btn({ variant: "outline" })}>Bekijk de pakketten</a>
        </div>
      </PageTitle>

      {showStats && (
        <section className="container-x py-12">
          <ul className="grid gap-px border bg-border sm:grid-cols-3">
            {stats.map((s) => <li key={s.label} className="bg-background p-8"><p className="font-serif text-5xl text-primary">{s.value}</p><p className="mt-2 text-sm text-muted-foreground">{s.label}</p></li>)}
          </ul>
        </section>
      )}

      <section id="pakketten" className="container-x py-16">
        <p className="eyebrow">Pakketten</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Kies uw <em>positie</em></h2>
        <p className="mt-3 text-sm text-muted-foreground">Prijzen exclusief btw.</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <li key={t.name} className={cn("relative flex flex-col border bg-card p-8", t.popular && "border-primary")}>
              {t.popular && <span className="absolute -top-3 left-8 bg-primary px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-primary-foreground">Populair</span>}
              <p className="eyebrow">{t.name}</p>
              <p className="mt-4 font-serif text-6xl">{t.price}</p>
              <p className="text-sm text-muted-foreground">{t.period}</p>
              <p className="mt-4 text-sm text-muted-foreground">{t.note}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t pt-6 text-sm">
                {t.features.map((f) => <li key={f} className="flex gap-3"><span aria-hidden className="text-primary">✓</span>{f}</li>)}
              </ul>
              <a href="#aanvragen" className={`${btn(t.popular ? {} : { variant: "outline" })} mt-8`}>Kies {t.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y bg-surface">
        <div className="container-x py-16">
          <p className="eyebrow">Advertentievormen</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Van subtiel tot <em>volledig verhaal</em></h2>
          <ul className="mt-10 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {adFormats.map((f) => (
              <li key={f.name} className="bg-background p-6">
                <h3 className="text-xl">{f.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                <p className="mt-4 text-sm"><span className="text-muted-foreground">vanaf </span><span className="font-serif text-3xl text-primary">{f.from}</span><span className="text-muted-foreground"> {f.per}</span></p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {adSizes.map((s) => (
              <div key={s.id} className="border border-dashed border-primary/40 p-5 text-center">
                <p className="font-head font-bold">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.size}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Betaalde inhoud wordt altijd duidelijk aangeduid als 'Advertentie' of 'Gesponsord'.</p>
        </div>
      </section>

      <section id="aanvragen" className="container-x grid gap-14 py-16 md:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Aanvragen</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Vraag een <em>offerte</em></h2>
          <p className="mt-4 text-muted-foreground">Vertel kort wat u wilt bereiken. U krijgt een voorstel op maat, meestal binnen enkele werkdagen.</p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-block font-serif text-3xl hover:text-primary">{site.email}</a>
        </div>
        <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
          {([["naam", "Naam", "text"], ["bedrijf", "Bedrijf", "text"], ["email", "E-mail", "email"]] as const).map(([name, label, type]) => (
            <div key={name} className={name === "email" ? "sm:col-span-2" : ""}>
              <label htmlFor={`ad-${name}`} className="text-sm">{label}<span className="text-primary"> *</span></label>
              <input id={`ad-${name}`} name={name} type={type} aria-invalid={!!errors[name]} className={input} />
              {errors[name] && <p className="mt-1 text-sm text-destructive">{errors[name]}</p>}
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="ad-pakket" className="text-sm">Pakket of vorm<span className="text-primary"> *</span></label>
            <select id="ad-pakket" name="pakket" defaultValue="" aria-invalid={!!errors.pakket} className={input}>
              <option value="" disabled>Kies…</option>
              {tiers.map((t) => <option key={t.name}>{`Pakket ${t.name}`}</option>)}
              {adFormats.map((f) => <option key={f.name}>{f.name}</option>)}
              <option>Ik weet het nog niet</option>
            </select>
            {errors.pakket && <p className="mt-1 text-sm text-destructive">{errors.pakket}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ad-bericht" className="text-sm">Toelichting</label>
            <textarea id="ad-bericht" name="bericht" rows={5} className={input} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={btn()}>Open in e-mailprogramma</button>
            <p className="mt-3 text-xs text-muted-foreground">Dit formulier verstuurt nog niets automatisch: het opent uw e-mailprogramma met een ingevuld bericht.</p>
            {mailto && <p role="status" className="mt-4 border border-primary/40 p-4 text-sm">Uw e-mailprogramma zou nu moeten openen. Lukt dat niet? <a href={mailto} className="text-primary underline">Klik hier</a>.</p>}
          </div>
        </form>
      </section>

      <section className="border-t bg-surface">
        <div className="container-x max-w-3xl py-16">
          <h2 className="text-4xl">Veelgestelde <em>vragen</em></h2>
          <dl className="mt-8 divide-y border-y">
            {faq.map((f) => <div key={f.q} className="py-5"><dt className="font-head font-bold">{f.q}</dt><dd className="mt-2 text-muted-foreground">{f.a}</dd></div>)}
          </dl>
        </div>
      </section>
    </>
  );
}
