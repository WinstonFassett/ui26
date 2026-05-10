# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

**ui26** is a cross-framework UI component library for React, Svelte, and Astro. Components are source-distributed via `npx @winstonfassett/ui26 add <component>` — consumers own the code, shadcn-style. The docs site at `apps/docs/` doubles as the registry server.

## Commands

All commands run from repo root via pnpm:

```bash
pnpm dev           # start docs dev server (apps/docs)
pnpm build         # build all monorepo packages
pnpm lint          # lint all packages

# Inside apps/docs directly:
pnpm --filter docs dev
pnpm --filter docs build
pnpm --filter docs preview
```

Playwright E2E tests live in the consumer examples (`examples/ui26-consumer-react`, etc.):
```bash
pnpm --filter ui26-consumer-react test
```

## Architecture

### Monorepo layout

- `apps/docs/` — Astro + Starlight docs site; also serves the registry API
- `examples/ui26-consumer-{react,svelte,astro}/` — consumer test beds
- No `packages/` — shared code lives inside `apps/docs/`

### Registry

`apps/docs/registry/` is the source of truth for all components.

- `registry.meta.ts` — authoritative list of 21 components with metadata (name, title, framework-specific file lists, compound subcomponents)
- Each component directory contains framework-specific implementations:
  - `*.tv.ts` — shared `tailwind-variants` definition (the only file shared across frameworks)
  - `*.tsx` — React
  - `*.svelte` — Svelte 5
  - `*.astro` — Astro

The JSON registry API is served at `/r/[framework]/[component].json.ts`. Components are fetched by the shadcn CLI via `npx @winstonfassett/ui26 add`.

**Key constraint**: registry components are dumb — no runtime registries, stores, or helper machinery in `registry/`. Tooling lives in `apps/docs/src/`.

### Sample / Spec system

`apps/docs/src/samples/` defines every interactive preview on the docs site.

- Each sample file exports a `Sample` (or `BlockSample`) typed in `samples/types.ts`
- Samples use a **JSON Render Spec** — a serializable tree of `{component, props, children}` nodes
- `src/lib/spec-to-code.ts` converts Spec → React/Svelte/Astro source code for the code pane
- Two kinds: `"atom"` (component variants page) and `"block"` (composed layout blocks)

When adding a new component, add both an atom sample and one or more block samples.

### Theme system

`registry/themes/` contains 17 themes as CSS files. `registry/all-themes.css` aggregates them.

Tokens use CSS variables with OKLCH colors. From `registry/AGENTS.md`:
- Use semantic names only — no numbered tokens like `--surface-1` or `--panel2`
- Dark blocks only override tokens whose values change; no duplication
- Shadows must be explicit `none`, never omitted
- Font stacks always end in a system fallback
- No Starlight-compat aliases like `[data-theme="dark"]`

### tailwind-variants vs CVA

Registry components use `tailwind-variants` (TV) exclusively. The `@/components/ui/` directory contains CVA-based Kibo compatibility shims — these are not the same as registry components. Never mix the two patterns in a single component.

### Astro content collections gotcha

After adding a new `.mdx` file under `content/docs/`, run:
```bash
touch src/content.config.ts
```
Otherwise the new route 500s with `UnknownContentCollectionError` until the next cold restart.

## Key files

| File | Purpose |
|------|---------|
| `apps/docs/registry/registry.meta.ts` | Component manifest — names, file lists, compound subcomponents |
| `apps/docs/src/lib/spec-to-code.ts` | JSON Spec → framework source code |
| `apps/docs/src/samples/types.ts` | Sample/BlockSample type definitions |
| `apps/docs/registry/AGENTS.md` | Taste rules for token/theme authoring |
| `apps/docs/src/pages/r/[framework]/[component].json.ts` | Registry API endpoint |

## Commit style

Conventional Commits subject line only — no body. Example: `feat: add Slider component`.
