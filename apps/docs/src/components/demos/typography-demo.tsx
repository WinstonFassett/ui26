export function TypographyDemo() {
  return (
    <div className="typography">
      <h1>Install, don&apos;t port</h1>
      <p className="lead">
        A running log of how ui26 mixes with external shadcn-style registries —
        Kibo UI, Vercel AI Elements, and shadcn itself.
      </p>

      <h2>Why install first</h2>
      <p>
        Porting is expensive. Installing is cheap. Let upstream CLIs write
        wherever they want; observe the friction; decide later whether each
        component earns a port, a fork, or a pure-install relationship.
      </p>
      <p>
        Most friction we&apos;ve hit so far sits at the <em>platform</em> seam
        — Astro + Starlight + Tailwind v4 — not the components themselves.
      </p>

      <h3>What we track</h3>
      <ul>
        <li>Setup prereqs (components.json, aliases, <code>cn</code> shim)</li>
        <li>Per-install friction (theme vocabulary, motion, SSR)</li>
        <li>Wins worth preserving across installs</li>
      </ul>

      <h3>Install-friction checklist</h3>
      <ol>
        <li>Does the registry resolve cleanly?</li>
        <li>Do deps get declared correctly?</li>
        <li>Does it render with zero source edits?</li>
        <li>Does the look match our tokens?</li>
      </ol>

      <blockquote>
        &ldquo;Originate little, port lots.&rdquo; — the design stance this spike
        is pressure-testing.
      </blockquote>

      <h4>Small things</h4>
      <p>
        Inline code reads like <code>pnpm add class-variance-authority</code>;
        key combos like <kbd>⌘</kbd>+<kbd>K</kbd> get their own pill.
      </p>

      <pre>{`// example: demo data shape
type Ticket = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "P0" | "P1" | "P2" | "P3";
};`}</pre>

      <p className="small">
        Typography opt-out works via <code>.not-typography</code> on any
        descendant — useful for embedding raw widgets inside a prose column.
      </p>
      <p className="muted">
        Font choices inherit from the active theme (editorial serif default;
        vanilla system; etc.).
      </p>
    </div>
  );
}
