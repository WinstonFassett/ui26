# ui26

Winston's cross-framework UI for 2026. Source-distributed component wrappers (React / Svelte / Astro) backed by a shared `tailwind-variants` theme config, shipped via a shadcn-compatible registry.

Working notes: [`UBIQUITOUS_LANGUAGE.md`](UBIQUITOUS_LANGUAGE.md).
Tickets: `tix ls --all`.

## Layout

```
apps/docs/         Astro + Starlight docs site (also serves registry JSON)
registry/          Component source (not a workspace)
  _shared/         theme configs, cn utility, tokens.css
  <Component>/     wrappers per framework (Button.tsx, Button.svelte, Button.astro, …)
packages/          future: cli/, typescript-config/
scripts/           build-registry, create-component
examples/          per-framework consumers (later waves)
inspiration/       gitignored reference clones
tickets/           tix tickets
```

## Dev

```sh
pnpm install
pnpm dev        # starts apps/docs Starlight
```
