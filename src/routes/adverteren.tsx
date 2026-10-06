import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { adSizes, faq, products, stats } from "@/content/portal";
import { site } from "@/content/site";
import { btn } from "@/components/site/ui";
import { PageTitle } from "@/components/site/portal";
import { PartnerContentCard, ProductCard, SponsorLabel } from "@/components/site/modules";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/adverteren")({
  head: () => ({ meta: meta("Adverteren & Samenwerken", "Breng uw onderneming in beeld bij Vlaamse ondernemers: bedrijfsreportages, branded content, partnerschappen en websitezichtbaarheid.") }),
  component: Adverteren,
});

const schema = z.object({
  naam: z.string().trim().min(2, "Vul uw naam in.").max(100),
  bedrijf: z.string().trim().min(2, "Vul de bedrijfsnaam in.").max(120),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(255),
  pakket: z.string().min(1, "Kies een product."),
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
    const body = `Naam: ${d.naam}\nBedrijf: ${d.bedrijf}\nE-mail: ${d.email}\nProduct: ${d.pakket}\n\n${d.bericht ?? ""}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(`Adverteren: ${d.bedrijf}`)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    window.location.href = href;
  };

  const input = "mt-2 w-full border bg-card px-4 py-3 text-foreground aria-[invalid=true]:border-destructive";
  return (
    <>
      <PageTitle kicker="Adverteren & Samenwerken" title={<>Breng uw onderneming <em>in beeld</em></>}
        intro="Zakelijke zichtbaarheid via video, artikels en social media — bij ondernemers, kmo's en beslissers. Alles wat betaald is, blijft duidelijk herkenbaar en gescheiden van de redactie.">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#aanvragen" className={btn()}>Vraag mogelijkheden aan</a>
          <a href="#producten" className={btn({ variant: "outline" })}>Bekijk de mogelijkheden</a>
        </div>
      </PageTitle>

      {showStats && (
        <section className="container-x py-12">
          <ul className="grid gap-px border bg-border sm:grid-cols-3">
            {stats.map((s) => <li key={s.label} className="bg-background p-8"><p className="font-serif text-5xl text-primary">{s.value}</p><p className="mt-2 text-sm text-muted-foreground">{s.label}</p></li>)}
          </ul>
        </section>
      )}

      <section id="producten" className="container-x py-16">
        <p className="eyebrow">Mogelijkheden</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Kies hoe u zichtbaar <em>wordt</em></h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Prijzen zijn op aanvraag. We beloven geen bereik zolang er geen betrouwbare statistieken zijn.</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.filter((p) => p.headline).map((p) => <ProductCard key={p.slug} p={p} />)}</ul>
        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl">Ook mogelijk</h3>
          <ul className="mt-4 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
            {products.filter((p) => !p.headline).map((p) => (
              <li key={p.slug} className="flex gap-3 border-b pb-3"><span className="font-head font-bold">{p.name}</span><span className="text-muted-foreground">{p.text}</span></li>
            ))}
          </ul>
          <p className="mt-6"><a href="#aanvragen" className={btn()}>Vraag mogelijkheden aan</a></p>
        </div>
      </section>

      <section className="border-y bg-surface">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Transparantie</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Betaald blijft <em>herkenbaar</em></h2>
            <p className="mt-4 text-muted-foreground">Gesponsorde inhoud krijgt altijd een vast label en wordt niet als redactioneel verslag voorgesteld. Zo blijft de geloofwaardigheid van de redactie beschermd — ook voor u als adverteerder.</p>
            <p className="mt-5 flex flex-wrap items-center gap-3 text-sm"><SponsorLabel>Partnercontent</SponsorLabel><SponsorLabel>Branded content</SponsorLabel><SponsorLabel>Gesponsord</SponsorLabel></p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {adSizes.map((s) => (
                <li key={s.id} className="border border-dashed border-primary/40 p-4 text-center">
                  <p className="font-head font-bold">{s.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.size}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">Zo kan het eruitzien</p>
            <PartnerContentCard />
          </div>
        </div>
      </section>

      <section id="aanvragen" className="container-x grid gap-14 py-16 md:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Aanvragen</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Neem <em>contact</em> op</h2>
          <p className="mt-4 text-muted-foreground">Vertel kort wat u wilt bereiken. U krijgt een voorstel op maat.</p>
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
            <label htmlFor="ad-pakket" className="text-sm">Product<span className="text-primary"> *</span></label>
            <select id="ad-pakket" name="pakket" defaultValue="" aria-invalid={!!errors.pakket} className={input}>
              <option value="" disabled>Kies…</option>
              {products.map((p) => <option key={p.slug}>{p.name}</option>)}
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
