type Opt = { value: string; label: string };
export function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Opt[] }) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground">
        <option value="">Alle</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
export function Search({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      Zoeken
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground placeholder:text-muted-foreground" />
    </label>
  );
}
