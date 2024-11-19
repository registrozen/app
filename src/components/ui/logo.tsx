export function Logo({ collapsed }: { collapsed: boolean }) {
  return collapsed ? (
    <h1>
      R<span className="rounded bg-slate-900 p-1 text-secondary">Z</span>
    </h1>
  ) : (
    <h1>
      Registro
      <span className="rounded bg-slate-900 p-1 text-secondary">Zen</span>
    </h1>
  );
}
