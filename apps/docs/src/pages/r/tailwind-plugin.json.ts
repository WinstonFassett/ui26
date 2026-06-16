import type { APIRoute } from "astro";

// Ships the Tailwind-plugin *generator* — not a prebuilt stylesheet. The
// consumer owns and re-runs it: it walks their added components' *.tv.ts files
// and their theme tokens (resolved from components.json) and emits a ui26.css
// of DaisyUI-style component classes (.btn, .card, …) tied to their setup.
//
// One self-contained file lands in the consumer repo:
//   scripts/tailwind-plugin.ts  — generator (export→class NAME_MAP inlined)
//
// After install, the consumer runs `tsx scripts/tailwind-plugin.ts` (deps:
// tailwindcss v4 + tsx). It reads components.json (aliases.ui → their *.tv.ts,
// tailwind.css → their tokens) with --components/--css/--out overrides.

const SCRIPT = import.meta.glob("../../../scripts/tailwind-plugin.ts", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const GET: APIRoute = () => {
  const script = Object.values(SCRIPT)[0] ?? "";

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "tailwind-plugin",
    type: "registry:file",
    title: "ui26 Tailwind plugin generator",
    description:
      "Generator that emits DaisyUI-style component classes (.btn, .card, …) from your added components' tailwind-variants configs. Produces ui26.css. Requires tailwindcss v4 + tsx.",
    dependencies: ["tailwindcss", "tsx"],
    docs:
      'Add a script to package.json:\n  "scripts": { "tailwind-plugin": "tsx scripts/tailwind-plugin.ts" }\nThen run `pnpm tailwind-plugin` (or npm/yarn) to generate ui26.css from your components and theme tokens. Re-run it whenever you add or change components.',
    files: [
      {
        path: "scripts/tailwind-plugin.ts",
        content: script,
        type: "registry:file" as const,
        target: "scripts/tailwind-plugin.ts",
      },
    ],
  };

  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
