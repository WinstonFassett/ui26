# Ubiquitous Language

Glossary for the ui26 / tvui (tentative) cross-framework design-system project. Canonicalizes the vocabulary emerging in the kickoff grill and fixes ambiguous usage before it drifts.

## Component architecture

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Component** | A named logical unit (e.g. Button), realized as N **wrappers** on disk (one per supported framework) and as N **registry entries** over the wire. | widget, control |
| **Polyglot component** | Adjective for a **component** that has wrappers for more than one framework. Avoids hard-coding the count (initial 3 = R+S+A, potential future: Vue, Solid, Qwik, Lit). | triad, multi-framework pattern |
| **Wrapper** | A single per-framework source file (`Button.tsx`, `Button.svelte`, `Button.astro`, future `.vue` / `.ts` Lit / `.solid.tsx`) that consumes the **theme config** and renders the element. | binding, adapter, port |
| **Wrappers** (plural) | The full set of per-framework files for one **component**. No collective noun needed — just "a component's wrappers". | triad, variants |
| **Theme config** | The `tailwind-variants` definition (e.g. `Button.tv.ts`) declaring variants/slots; colocated with its **component**'s wrappers and imported by each. | tv file, variants file, style config |
| **Primitive** | A dumb, stateless **component** (Button, Badge, Input, Card, Label, Textarea). Wave 1 scope. | atom, base component |
| **Compound component** | A stateful, multi-part **component** that composes **primitives** with state (Dialog, Dropdown, Command palette). Wave 3+, *only if wanted* — not a commitment. | complex component, stateful component |
| **Headless primitive** | A **compound component** whose state is framework-agnostic (Zag/Matchina style) and whose rendering is provided by the consumer. Wave 3+ optional. | unstyled primitive |
| **Block** | A large compound pattern or page-level assembly (Hero, Profile, FAQ, SocialProof) that stitches multiple **primitives** and **compound components** together. Associated with premium-feel design systems (webcoreui has ~30). **Stretch / far-future scope** — not a Wave 1–3 commitment, but not precluded; the architecture should allow them to land later without restructuring. | recipe, pattern, example |

## Distribution

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Shared (authoring)** | In-monorepo dir (`apps/docs/registry/_shared/`) holding `cn` and **tokens** CSS that apply to every component. **Theme configs are NOT here** — they're colocated with their component (e.g. `Button/Button.tv.ts`). Not published as npm; at emit time its contents are inlined or emitted as separate `registry:base` / `registry:lib` entries. | core, @tvui/core |
| **Registry** | A shadcn-compatible JSON-serving endpoint (`@tvui-react`, `@tvui-svelte`, `@tvui-astro`) — one per framework. | namespace, channel |
| **Registry entry** | One component's JSON manifest within a **registry** (e.g. `/r/react/button.json`). | manifest, component spec |
| **Wrapper source** | On-disk wrapper files (`apps/docs/registry/<Component>/…`) that the build script scans to emit **registry entries**. | authoring source |
| **Source distribution** | The shadcn-style model where the CLI copies **wrapper** source into the consumer's repo; the consumer owns and may edit the code. | copy-paste distribution, shadcn-style |
| **Prebuilt distribution** | Traditional model: consumer installs a compiled npm package and imports from it; cannot edit source. webcoreui uses this. | library install, npm-only |
| **Delegator CLI** | Optional `@tvui/cli` — a thin wrapper that detects the consumer's framework and shells out to `shadcn add <registry>/<component>`. Convenience only; stock `npx shadcn add <url>` works without it. Pattern borrowed from Kibo UI. | our CLI, ui26 CLI |
| **Tokens** | The design-system constants (OKLch colors, spacing, radii, typography) declared as CSS variables, sourced from tix's DESIGN.md. Distributed as a `registry:base` entry — installed once per consumer project. | design tokens, CSS vars |
| **Inlining** | Build-time transform (Wave 2, `scripts/build-registry.ts`) that replaces `import { button } from './Button.tv'` with the file's literal contents, so each emitted **registry entry** is self-contained and the consumer installs a single file with no extra deps. | bundling, expansion |

## Project structure

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Monorepo** | The pnpm-workspace repo containing `apps/`, `packages/`, `registry/`, `examples/`, `scripts/`, `inspiration/`. | repo, workspace |
| **Workspace** | A single package or app within the **monorepo** (e.g. `apps/docs`, `packages/core`). | module, project |
| **Docs app** | `apps/docs/` — Astro + Starlight site; serves both human docs and **registry** JSON. Evolved from `starlight-design-system`. | docs site, reference site |
| **Inspiration** | Gitignored `inspiration/` folder with cloned external reference repos (shadcn-ui, kibo, webcoreui, shadcn-svelte). Not a **workspace**. | references, vendor |

## Delivery

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Steel thread** | Minimum end-to-end slice that exercises every load-bearing layer (tokens → theme config → triad wrappers → docs rendering) without any polish scope. | MVP, POC, spike |
| **Wave** | A bounded milestone of scope. Current plan: **Wave 0** = research + inventory. **Wave 1** = primitives + external consumer. **Wave 2** = registry JSON + delegator CLI. **Wave 3+** = headless primitives via Matchina, React Native port. | phase, milestone, sprint |

## Prior art and people

| Term | What | Role for ui26 |
| --- | --- | --- |
| **webcoreui** | Frontendland's MIT-licensed cross-framework design system (React + Svelte + Astro) using **literal triads** with Sass modules. | Closest structural comparator; style inspiration for look/feel; scaffolder script worth stealing. |
| **Kibo UI** | Hayden Bleasel's React-only shadcn extension with an elegant delegator CLI. | Aesthetic + architectural inspiration; CLI pattern to copy. |
| **Vercel AI Elements** | Vercel/Fernando Rojo's team. Shadcn-registry based; computes dependencies dynamically via `ts-morph` at request time. | Dynamic-dep-computation pattern reference. |
| **shadcn/ui** | React-only origin of the registry+CLI model. Uses **`cva`**, not `tv`. | Registry format target. |
| **shadcn-svelte** | Huntabyte's Svelte port of shadcn. | Closest non-React blueprint; uses same registry schema. |
| **Ark UI** | Chakra team's cross-framework (React/Vue/Solid/Svelte) headless primitive set. Powered by Zag.js. | Model for **headless primitives** wave. |
| **Zag.js** | Framework-agnostic finite-state machines powering Ark UI. | Direct analogue to Winston's **Matchina**. |
| **Matchina** | Winston's own TypeScript state-machine micro-library. Framework-agnostic. | Planned state engine for ui26's **headless primitives** (Wave 3). |
| **Fernando Rojo** | Vercel's Head of Mobile; creator of Solito, Dripsy, Moti. Authored the *"Composition is all you need"* talk at React Universe Conf 2025. | Philosophical north star for component API design. |
| **tix** / **tix-ui** | Winston's Linear-inspired ticket tracker; its `DESIGN.md` is the canonical **aesthetic voice** source for ui26. | Source of **tokens** and visual opinionation. |
| **job-search** | Winston's secondary reference app at `~/dev/tries/2026-03-01-job-search`. | Second data point for extractable-primitive inventory. |
| **starlight-design-system** | Winston's working cross-framework POC at `~/dev/personal/starlight-design-system/`; has Button/Badge/Card/Input/Label/Textarea triads over Tailwind v4 + `tailwind-variants`. | **The** starting point. Original stays untouched; its code lifts into `apps/docs/`. |

## Relationships

- A **component** is authored as one **triad** (three **wrappers** + one **theme config**) and published as three **registry entries** (one per framework **registry**).
- Every **wrapper** imports its **theme config** from **core**. **Core** is an npm dependency, never copied.
- The **docs app** is both the human-readable docs site and the HTTP host for all three **registries**.
- **Source distribution** implies the consumer owns the **wrappers** after install; **core** remains an npm import.
- A **steel thread** passes through **tokens → theme config → wrappers → docs app** for exactly one **component** (Button).
- **Waves** are sequential; each wave's output enables the next. **Wave 0** research does not block **Wave 1** building once the three-registry architecture is confirmed.

## Flagged ambiguities (resolved)

- **"triad"** was used as jargon without being defined. **Canonicalized** as the three-wrapper pattern. Do not use "variants" (already means tailwind-variants states) or "multi-framework pattern" (too vague).
- **"component"** was sometimes used for the logical thing, sometimes for a single **wrapper** file. **Use "component" only for the logical unit; use "wrapper" for the per-framework file.**
- **"theme"** was overloaded (CSS vars / `tv()` config / visual language). **Resolved** into three terms: **tokens** (CSS variables), **theme config** (the `tv()` file), **aesthetic voice** (the design opinionation — tix's DESIGN.md).
- **"registry"** was used for the manifest, the namespaced URL, and the whole distribution mechanism. **Canonicalized:** **registry** = the namespaced JSON endpoint (one per framework); **registry entry** = a single component's JSON; **registry source** = on-disk triads. The whole mechanism is **source distribution**.
- **"starlight-tailwind-variants"** vs **"starlight-design-system"** — both names were used for the reference POC. The POC with working triads is **`starlight-design-system`**. The bare-Starlight-shell project `starlight-tailwind-variants` is **not the reference** and should not be confused with it.
- **"ui26"** vs **"tvui"** — `ui26` is the working-directory / repo name; `@tvui` is the tentative package scope. These are allowed to differ (shadcn repo = `shadcn-ui/ui`, package = `shadcn`). Do not conflate.
- **"block"** — webcoreui calls compound demo patterns `blocks`. In ui26, use **block** for a library-shipped compound demo, and **example** for a standalone per-framework consumer app under `examples/`.
- **"base"** vs **"core"** — shadcn v4 has a `registry:base` entry type (one-shot design-system install of shared files). ui26's equivalent is **core** (the npm package). Use **core** for the package, **base install** for the shadcn one-shot import target.

## Example dialogue

> **Winston:** "Can we ship the **Dialog** as a **primitive** in Wave 1?"

> **Claude:** "No — **Dialog** is a **compound component** because it's stateful. First-wave scope is **primitives** only. **Dialog** becomes a **headless primitive** in Wave 3 once we wire **Matchina** in."

> **Winston:** "Fine. For the Wave-1 Button **steel thread** — does the consumer install from the **registry** or from **core**?"

> **Claude:** "Both. They install **core** once as an npm dep (that's where the **theme config** and **tokens** live), then run the **delegator CLI** to copy the **wrapper** for their framework from the matching **registry**. The **wrapper** imports the **theme config** back out of **core** — that's what makes the **triad** coherent across frameworks."

> **Winston:** "And the `button.module.scss` thing in **webcoreui** — that's their **theme config**?"

> **Claude:** "Effectively yes, but styled in Sass using their own token DSL. Our **theme config** is a `tv()` call over Tailwind v4 utilities with **tokens** sourced from tix's DESIGN.md. Same *role* in the architecture, completely different substance."
