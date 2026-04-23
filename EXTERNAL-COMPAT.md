# External-component compatibility log

Ongoing log for [d127](tickets/) — mixing ui26 with external shadcn-style registries (Kibo UI, Vercel AI Elements, shadcn).

Approach: **install, don't port**. Let upstream CLIs write wherever they want; observe friction; document handling options. Port work deferred until we've mapped the surface.

---

## Setup prereqs (one-time, shared by all external installs)

For `shadcn add <registry-url>` to work against `apps/docs`, three files must exist:

| File | Purpose | Our choice |
|---|---|---|
| `apps/docs/components.json` | shadcn CLI config — aliases, tailwind config path, style, iconLibrary | Hand-written: `style: new-york`, `css: src/styles/global.css`, aliases at `@/components`, `@/lib/utils`, etc. |
| `apps/docs/tsconfig.json` paths — `@/*` → `./src/*` | Resolves the imports shadcn CLI emits | Added alongside existing `@registry/*` alias |
| `apps/docs/src/lib/utils.ts` | Where shadcn expects `cn` per components.json aliases | Re-export shim: `export { cn } from "@registry/lib/utils"`. Keeps single source of truth in `registry/lib/utils.ts` |

Committed under "feat(compat): shadcn CLI prereqs" (separate from any specific-vendor install commit).

---

## Friction findings

### F1 — `shadcn add` requires components.json and prompts interactively
- **Where**: any `npx shadcn@latest add <url>` in an un-initialized project.
- **Behavior**: prompts "create components.json?" (Y/n) then "Radix or Base?" — `--yes` isn't enough to pipe through.
- **Handling**: pre-write `components.json` by hand (what we did) OR run `shadcn init` interactively once per project. Hand-writing is cheaper and lets us control `style` and aliases.

### F2 — `shadcn init --yes --defaults` rejects our Tailwind v4 setup
- **Error**: `"Validating Tailwind CSS. Found v4." ✖ No Tailwind CSS configuration found`
- **Cause**: [global.css](apps/docs/src/styles/global.css) uses Starlight's split imports (`@import 'tailwindcss/theme.css'` + `'tailwindcss/utilities.css'`) instead of the single `@import 'tailwindcss'` shadcn's detector scans for.
- **Impact**: blocks the happy-path `shadcn init`. Not a functional Tailwind problem — our `@theme inline` + `tokens.css` setup is correct.
- **Handling**:
  1. **Bypass init** (what we did) — hand-write components.json. Fine for mono-repo-style setups where we control prereqs.
  2. **Add a sentinel import** `@import 'tailwindcss';` that loads the whole bundle, accept the double-load cost.
  3. **File upstream** — shadcn's v4 validator should accept the `theme.css`/`utilities.css` split (it's valid Tailwind v4). Low leverage, slow.
  4. Leave as documented gotcha in setup instructions for consumers.

### F3 — Installed components import `@/lib/utils` but the file is missing when init is skipped
- **Where**: every shadcn-registry component references `cn` via `@/lib/utils`.
- **Cause**: `shadcn init` normally seeds `src/lib/utils.ts`. Skipping init leaves the alias dangling.
- **Handling**: re-export shim at `src/lib/utils.ts` pointing at our existing `registry/lib/utils.ts` (what we did). Zero-cost. Preserves single source of truth for `cn`.

### F4 — Component theme vocabulary mismatches our multi-theme system
- **Where**: Kibo theme-switcher (first observed — will recur for theme-aware components).
- **Specific**: theme-switcher's `value` type is `"light" | "dark" | "system"`. Our [tokens.css](apps/docs/registry/tokens.css) supports `editorial light/dark` (default `:root`) + `vanilla light/dark` via arbitrary `[data-theme]` values, and the system is designed for more.
- **Behavior**: Kibo's switcher is UI-only (controlled) — it doesn't actually apply a theme. It calls `onChange`, and you wire the application yourself. That's both a win (no conflict with our `data-theme` approach) and a gap (we'd need a `useUi26Theme` hook to bridge 3 labels to N-theme names, or fork the switcher to accept arbitrary theme keys).
- **Handling options**:
  1. **Adapter in consumer code** — wrap `<ThemeSwitcher onChange={applyEditorialOrVanilla}>`. Lightweight; leaves installed source untouched.
  2. **Fork on install** — post-process the installed file to accept `ReadonlyArray<{ key, icon, label }>` as a prop so multi-theme is first-class. More invasive; gives us a tools-shaped component but drifts from upstream.
  3. **Sidecar a ui26-native theme-switcher** keyed to our data-theme values, keep Kibo's as a "tri-state quick toggle" for projects that only want 3 themes.

### F5 — Motion transitions use spring physics
- **Where**: Kibo theme-switcher uses `transition={{ type: "spring", duration: 0.5 }}`.
- **Conflict**: [TASTE-AUDIT.md](TASTE-AUDIT.md) + design stance — "no bounces, no springs" (bans overshoot physics, not the library).
- **Handling**:
  1. Post-install patch: swap `type: "spring"` → `type: "tween", ease: [0.16, 1, 0.3, 1]`. One-line per component.
  2. Leave as-is; accept the overshoot in exchange for zero drift.
  3. Publish a "ui26 motion profile" and apply it wholesale during install (automation opportunity — see below).

### F7 — Starlight content rhythm margins leak onto installed-component children
- **Where**: any external component rendered inside a Starlight `<StarlightPage>` (or MDX content area).
- **Observed**: Kibo theme-switcher's three buttons — active (first) rendered at the correct y, the other two pushed 8px below the pill (beyond the container), with an extra `margin-top: 16px` computed on them. Screenshot of broken state: [installs-shot2](/tmp/installs-shot2.png).
- **Cause**: Starlight injects `.sl-content > * + * { margin-top: ... }`-style typographic rhythm on every child of the content area, including flex items of nested components.
- **Fix**: wrap external-component demos in `<div class="not-content">` — Starlight's documented opt-out. Killed the 16px margins that were pushing siblings below the container.
- **Convention**: every `/installs`, component-doc demo, and kitchen-sink section hosting an external component goes inside `.not-content`.

### F8 — Kibo container is block-level flex (stretches to parent width)
- **Where**: Kibo theme-switcher base classes `relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border`.
- **Observed**: container stretched to full content width (1080px) — pill ring extended far past the three icons.
- **Cause**: `flex` without `inline-flex` / `w-fit` is a block-level flex container. kibo-ui.com's own layouts must wrap it in a narrower flex parent.
- **Fix in demo**: `<ThemeSwitcher className="w-fit" />`. One className token, passed via the component's own `className` prop.
- **Handling options**:
  1. **Consumer-side className** (what we did). Zero drift, per-site decision.
  2. Post-install patch: swap `flex` → `inline-flex` in the installed file. Automatable.
  3. Upstream PR to Kibo.

### F9 — Tailwind preflight is intentionally not loaded in apps/docs
- **Where**: [apps/docs/src/styles/global.css](apps/docs/src/styles/global.css) imports only `tailwindcss/theme.css` + `tailwindcss/utilities.css` (Starlight's recommended setup), not `tailwindcss/preflight.css`.
- **Why intentional**: preflight would fight Starlight's prose/typography reset. Keeping it off preserves the default docs look.
- **Consequence**: browser UA defaults leak everywhere. E.g. `button { padding: 1px 6px }` (Chromium default), which Tailwind preflight normally zeroes out. Installed components authored against Tailwind preflight (Kibo, AIE, shadcn) render with unreset button/form geometry — icons overflow content boxes, `m-auto` fails, etc.
- **Observed symptom**: in Kibo theme-switcher, button padding left icons offset to the left (m-auto resolved to 0 when icon was wider than content box). Separate from F7/F8 — this is the UA-reset issue underneath.
- **Fix**: scope Tailwind v4's full preflight to `.not-content` descendants via native CSS `@scope`, inside `@layer base` so Tailwind utilities still override (see [starlight-overrides.css](apps/docs/src/styles/starlight-overrides.css)):
  ```css
  @layer base {
    @scope (.not-content) {
      *, ::after, ::before { box-sizing: border-box; margin: 0; padding: 0; border: 0 solid; }
      ol, ul, menu { list-style: none; }
      img, svg, video, canvas, audio, iframe { display: block; vertical-align: middle; }
      button, input, select, optgroup, textarea { font: inherit; color: inherit; border-radius: 0; ... }
      /* ...full preflight rules that make sense scoped... */
    }
  }
  ```
  - **Why `@layer base`**: unlayered rules beat all layered rules. If the scoped reset were unlayered, its `* { margin: 0 }` would override `.m-auto` and other utilities. Putting it in `base` keeps it below `utilities` in the cascade so component classes win.
  - **Why `@scope`**: native CSS scope (Chrome/Safari/Firefox since 2024), no PostCSS plugin required, rules literally don't fire outside `.not-content`. Kitchen-sink, nav, sidebar all unaffected.
  - **What's omitted from preflight**: `html`/`:host` rules (scope doesn't wrap html) and `code/kbd/samp/pre` font-family (Starlight owns code typography).
- **Convention**: every external-component demo container gets `class="not-content"`. One wrapper, full preflight, zero per-install patches.

### F6 — `"use client"` directive isn't respected by Astro's default hydration
- **Where**: every AIE + Kibo component (they all ship `"use client"`).
- **Observed**: installed ThemeSwitcher with `<ThemeSwitcher client:load />` → SSR error storm ("Unable to render ThemeSwitcher"). motion/react + Radix hooks crash in SSR.
- **Cause**: `"use client"` is a React Server Components (Next) signal. Astro doesn't interpret it — it attempts SSR anyway unless the page uses `client:only`.
- **Fix**: use `client:only="react"` on the page. Works immediately, no source edits.
- **Handling options**:
  1. **Document the pattern** — any AIE/Kibo import gets `client:only="react"` by default. Cheap, explicit.
  2. **Wrapper component** — ui26 ships a `<ClientOnly>` Astro wrapper that defaults to `client:only="react"` for known-client-only externals.
  3. **Auto-detection post-install** — scan installed files for `"use client"` and flag the required directive in docs/demos.

---

### F11 — shadcn registry `dependencies` are stale vs current component source
- **Where**: installing Kibo table cascaded `shadcn` primitives (`button`, `dropdown-menu`, `table`). The button it wrote uses `import { cva } from "class-variance-authority"` and `import { Slot } from "radix-ui"`, but the shadcn registry JSON for `button` only lists `@radix-ui/react-slot` as a dep.
- **Observed**: clean install → Vite 500 on first page load: `Failed to resolve import "class-variance-authority" from "src/components/ui/button.tsx"`. CVA was never added to `package.json`.
- **Cause**: shadcn's published registry item drifted from the actual source. Dep list was authored when the button used `@radix-ui/react-slot` directly; the source now imports the `radix-ui` umbrella and `class-variance-authority`, but the registry metadata wasn't updated.
- **Handling**:
  1. **Manual `pnpm add` after install** (what we did) — one extra step per install until upstream fixes it. Low friction once you know what's missing.
  2. **Install-time scan**: post-install grep the installed files for top-level imports and diff against `package.json`; install any missing. Automatable per the "ui26 sanitize" tool idea at the bottom.
  3. **Pin shadcn styles to a known-good snapshot** in our own mirror of the registry — heavy, probably not worth it for now.
- **Related**: `radix-ui` umbrella was already present (AIE reasoning pulled it in), so we only hit one missing dep. Future installs against cleaner trees may hit more.

### F12 — `registry:style` items inject into `@layer base`, but Starlight overrides are unlayered → injected styles lose
- **Where**: Kibo typography is a `registry:style` — shadcn splices its CSS directly into [global.css](apps/docs/src/styles/global.css). The target write point is inside our existing `@layer base { ... }` block.
- **Observed**: after install, `.typography h1`..`h6` rendered at the wrong size — `.typography h3` computed to `margin-top: 0` and `font-size: 16px`. The Kibo rules were present in the stylesheet but had zero effect.
- **Cause**: [starlight-overrides.css](apps/docs/src/styles/starlight-overrides.css) defines `.sl-markdown-content h3 { font-family...; font-size: 16px; font-weight: 600 }` at file scope (unlayered). Unlayered rules beat any `@layer` in the cascade, regardless of specificity. So `.typography h3:not(.not-typography h3)` (specificity 0,2,2) lost to `.sl-markdown-content h3` (specificity 0,1,1) purely because the latter was unlayered. The injected CSS lived under our `@layer base { ... }` wrap in global.css.
- **Fix**: move the Kibo-injected `.typography` rules *outside* the `@layer base` block in global.css, so they sit unlayered alongside starlight-overrides. Specificity then decides normally and `.typography h3` wins over `.sl-markdown-content h3`.
- **Handling options**:
  1. **Post-install unwrap** (what we did) — edit the `@layer base { ... }` wrap off the injection site once. One-time per `registry:style` install; trivial to script.
  2. **Wrap Starlight overrides in their own layer** (`@layer starlight { ... }` positioned after `base`). Broader blast radius; would reorder tons of existing rules. Avoid for now.
  3. **Prefix typography selectors** (`.not-content .typography h3 { ... }`, specificity 0,2,1) — bumps their specificity *while still layered*. No: still loses to unlayered.
- **Pattern**: `registry:style` is a different install shape from `registry:ui` — verify the injected layer placement every time, and remember unlayered > layered in Starlight.

### F10 — Tailwind v4 doesn't scan `node_modules` by default
- **Where**: any installed component that pulls in a lib which emits Tailwind classes at runtime. First hit: AIE reasoning → [streamdown](https://www.npmjs.com/package/streamdown) renders markdown JSX with `list-decimal`, `list-inside`, `[li_&]:pl-6`, etc. written as class strings in its compiled JS.
- **Observed**: `<ol class="list-decimal list-inside">` rendered, but computed `list-style-type: none` — the Tailwind utility rule was never generated because Tailwind v4's default content scan excludes `node_modules`. Combined with F9's scoped `ol { list-style: none }`, the markdown lost its numbers/bullets.
- **Cause**: Tailwind v4 scans the project source tree + explicit `@source` paths. `node_modules` is excluded by default to avoid scanning every dep.
- **Fix**: in [global.css](apps/docs/src/styles/global.css), add `@source "../../node_modules/streamdown/dist";` — path is relative to global.css and must target the installed hoisted lib (pnpm puts it under `apps/docs/node_modules/streamdown`, not repo-root `node_modules`).
- **Pattern**: add one `@source` per external dep that emits runtime Tailwind classes. Don't wildcard-scan all of `node_modules` — performance hit and most deps don't need it.
- **Related**: `tw-animate-css` is another case — AIE components use `animate-in / animate-out / fade-out-0 / slide-in-from-top-2`. Those will likely break when installing components that rely on them; deal with when we hit.

## Wins (don't bury these)

- **Kibo namespaces cleanly** — writes to `src/components/kibo-ui/<name>/`, zero collision with our `@registry/*` tree. Easy to tell ported vs installed code apart at a glance.
- **Token vocabulary overlaps 100%** — installed Kibo theme-switcher uses `bg-background`, `text-foreground`, `bg-secondary`, `text-muted-foreground`, `ring-border`. All present in our [tokens.css](apps/docs/registry/tokens.css). No visual drift on install.
- **Dep install was clean** — three new deps (`@radix-ui/react-use-controllable-state`, `lucide-react`, `motion`) written straight into `apps/docs/package.json` by shadcn.
- **Renders with minimal intervention** — post-prereqs, the only per-install edit was `client:only="react"`. Component boots, all three theme buttons present, no console errors.

---

## Install log — Kibo theme-switcher *(spike [40d2](tickets/))*

**Command**: `npx -y shadcn@latest add https://www.kibo-ui.com/r/theme-switcher.json --yes` from `apps/docs/`

**Files created**: `src/components/kibo-ui/theme-switcher/index.tsx` (1 file)

**Deps added to [apps/docs/package.json](apps/docs/package.json)**:
- `@radix-ui/react-use-controllable-state ^1.2.2`
- `lucide-react ^1.8.0`
- `motion ^12.38.0`

**Source edits**: none (component file untouched).

**Demo-page edits required to render well**:
- `client:only="react"` directive on the island (F6)
- wrap the island in `<div class="not-content">` (F7)
- `className="w-fit"` on the island (F8)
- one-time: scoped preflight inside `.not-content` in [starlight-overrides.css](apps/docs/src/styles/starlight-overrides.css) (F9)

**Render status**: ✓ 200 at `/installs`, three theme buttons inline in a fitted pill, no errors.

**Port-effort estimate if we wanted it permanent**:
- ~1h — fork into `apps/docs/registry/theme-switcher/` with a `.tv.ts` for the classes + tween-swap for the motion + prop-shape change to accept arbitrary theme entries (editorial/vanilla/dark variants).
- Or: keep installed-as-is and wrap in a `<Ui26ThemeSwitcher>` adapter (~15 min) — preserves upgrade path from Kibo, loses some native-feel.

---

## Install log — AI Elements reasoning *(spike [8bc4](tickets/))*

**Command**: `npx -y shadcn@latest add https://elements.ai-sdk.dev/api/registry/reasoning.json --yes` from `apps/docs/`

**Files created** (3):
- `src/components/ai-elements/reasoning.tsx` — the component
- `src/components/ai-elements/shimmer.tsx` — sibling (streaming-text animation)
- `src/components/ui/collapsible.tsx` — shadcn primitive (thin wrapper over Radix, via the `radix-ui` umbrella package)

**Deps added to [apps/docs/package.json](apps/docs/package.json)** (6 new):
- `radix-ui ^1.4.3` (umbrella re-export)
- `streamdown ^2.5.0` (markdown renderer)
- `@streamdown/cjk`, `@streamdown/code`, `@streamdown/math`, `@streamdown/mermaid` (plugin set)

**Source edits**: none.

**Demo harness** (`src/components/demos/reasoning-demo.tsx`): 12-line React wrapper composing `<Reasoning defaultOpen><ReasoningTrigger/><ReasoningContent>{markdown}</ReasoningContent></Reasoning>` — needed because Astro's `client:only` doesn't compose React children across the Astro/React boundary cleanly.

**Demo-page edits required to render well**:
- `client:only="react"` on the island (F6)
- wrap in `<div class="not-content">` (F7)
- scoped preflight handled everything except list-style (F9)
- `@source "../../node_modules/streamdown/dist"` in global.css (F10) — made the numbered list render

**Render status**: ✓ 200 at `/installs`, collapsible opens/closes, markdown renders with numbered list, no console errors.

**Wins specific to AIE**:
- **Namespaces cleanly** — `src/components/ai-elements/` parallel to `src/components/kibo-ui/`. No collision.
- **Transitively installs shadcn primitives** — AIE registry declares `collapsible` as a registry dep, shadcn CLI resolved it and wrote `src/components/ui/collapsible.tsx` automatically.
- **Modern radix pattern** — the installed Collapsible uses `import { Collapsible as CollapsiblePrimitive } from "radix-ui"` (the umbrella), not 20 separate `@radix-ui/react-*` packages. Smaller dep tree.
- **`data-slot` convention** — shadcn's new styling hooks (e.g. `data-slot="collapsible-trigger"`). Useful for targeted overrides.

**Port-effort estimate if we wanted it permanent**:
- React-only: essentially already done — just mark it as first-party under `registry/ai-elements/` with our meta conventions. ~30 min.
- Polyglot: hard. Reasoning = Collapsible + Streamdown. Svelte port needs a Radix-equivalent (bits-ui/melt-ui) and a Svelte markdown-stream lib — no direct Streamdown port exists. Estimate 6-10h + ongoing drift. Recommendation: AIE stays React-only annex.

---

### F13 — Installed Kibo source pins icon names from a prior react-icons release
- **Where**: Kibo code-block hardcodes ~90 imports from `react-icons/si` (filename-icon map: `"*.css": SiCss3`, `"*.ts": SiTypescript`, etc.).
- **Observed**: shadcn add → clean install → Vite hydration error: `SyntaxError: The requested module 'react-icons_si.js' does not provide an export named 'SiCss3'`.
- **Cause**: react-icons evolved. `SiCss3` was renamed to `SiCss` in a recent simple-icons upgrade (simple-icons dropped version suffixes). The Kibo source file was written against the old name and ships that way in the registry. Of 66 icons Kibo imports, only 1 (`SiCss3`) was affected at the version we got (`react-icons ^5.6.0`), but the surface area is huge — any future simple-icons rename breaks the build.
- **Fix**: one-line patch on the installed file — `sed SiCss3 → SiCss`. Trivial; but it's a real source edit (first one so far).
- **Handling options**:
  1. **Patch on install** (what we did) — fast, unique to this component. Doc in EXTERNAL-COMPAT alongside the install log so the next person hits it with context.
  2. **Pin `react-icons` to the Kibo-contemporary version** in `package.json` — would freeze the whole docs tree on an older react-icons. Cost > benefit for a 1-icon fix.
  3. **Strip the `filenameIconMap`** from the installed source — we're unlikely to use all 90 filename patterns anyway. Smaller blast radius if simple-icons does another rename, but drifts further from upstream Kibo.
  4. **Upstream PR**: Hayden (Kibo author) probably wants to know. Low-effort to file.
- **Pattern**: "install but edit ≤1 line" is a different frictional class from "install as-is". Distinguish in install logs.

## Install log — Kibo list *(spike [a43c](tickets/))*

**Command**: `npx -y shadcn@latest add https://www.kibo-ui.com/r/list.json --yes` from `apps/docs/`

**Files created**: `src/components/kibo-ui/list/index.tsx` (1 file)

**Deps added**: `@dnd-kit/core ^6.3.1`, `@dnd-kit/modifiers ^9.0.0` — both present in the registry metadata, installed cleanly.

**Source edits**: none.

**Demo harness** (`src/components/demos/list-demo.tsx`): ~90 lines — 4 status columns with colored dots, 8 tix-style tickets with P0-P3 priorities and `epic`/`spike` tag pills, drag between statuses updates state. Uses `useDraggable`/`useDroppable` primitives via `ListProvider` → `ListGroup` → `ListItems` → `ListItem`.

**Demo-page edits**: `client:only="react"`, wrap in `.not-content`. That's it.

**Render status**: ✓ grid renders, drag between columns updates state, no console errors.

**Wins**:
- **No Radix required** — dnd-kit is self-contained. Good candidate for polyglot port (Svelte has `svelte-dnd-action`).
- **API is thin and sane** — list-item content is render-children, so styling every row as a tix-card took 20 lines.

**Port-effort estimate**: ~1h for React port (extract `.tv.ts`). Polyglot adds 3-4h to map dnd-kit ↔ svelte-dnd-action, but doable because the Kibo source is tiny.

---

## Install log — Kibo table *(spike [a43c](tickets/))*

**Command**: `npx -y shadcn@latest add https://www.kibo-ui.com/r/table.json --yes` from `apps/docs/`

**Files created** (4):
- `src/components/kibo-ui/table/index.tsx` — kibo wrapper
- `src/components/ui/button.tsx` — shadcn primitive (registryDependency)
- `src/components/ui/dropdown-menu.tsx` — shadcn primitive
- `src/components/ui/table.tsx` — shadcn primitive

**Deps added**: `@tanstack/react-table ^8.21.3`, `jotai ^2.19.1` (per Kibo metadata). **Then F11 bit us** — installed button needed `class-variance-authority`, which shadcn's registry doesn't declare. Had to `pnpm add class-variance-authority` manually post-install.

**Source edits**: none.

**Demo harness** (`src/components/demos/table-demo.tsx`): ~100 lines — 5 columns (ID, Title, Status with dot, Priority colored, Updated), 8 tix-style rows, all columns sortable via `TableColumnHeader` + dropdown menu.

**Demo-page edits**: `client:only="react"`, wrap in `.not-content`.

**Render status**: ✓ table renders, headers show sort chevrons, click opens asc/desc dropdown, sorting works across all columns, no console errors.

**Wins**:
- **Transitively installs shadcn primitives** — one `shadcn add` gives you Kibo table + shadcn's button/table/dropdown-menu, all using the `ui/` convention.
- **Ticket-table composition is natural** — per-column `cell` render-prop means we can style status/priority freely without fighting the component.

**Port-effort estimate**: 2-3h for a React port (the primitives are substantial — Kibo's wrapper is thin, but shadcn's button/dropdown-menu/table are 100-250 LOC each). Polyglot port: hard, shadcn-style headless tables don't have a widely-adopted Svelte equivalent; tanstack-table does work in Svelte but needs different boilerplate. Defer.

---

## Install log — Kibo typography *(spike [a43c](tickets/))*

**Command**: `npx -y shadcn@latest add https://www.kibo-ui.com/r/typography.json --yes` from `apps/docs/`

**Files created**: none. This is a `registry:style` type — shadcn **injects CSS directly into `global.css`** rather than writing a component file. ~265 lines of rules added inside our `@layer base { ... }` block.

**Deps added**: none.

**Source edits**:
- Moved the injected `.typography` rules *outside* `@layer base` to fix F12 (Starlight overrides are unlayered and would otherwise always win).

**Demo harness** (`src/components/demos/typography-demo.tsx`): ~50 lines of plain static JSX — `<div className="typography">` wrapping h1-h4, lead/muted/small paragraphs, bullet + ordered lists, blockquote, `code`, `kbd`, `pre`. No interactivity, so no `client:only` needed.

**Demo-page edits**: wrap in `.not-content`.

**Render status**: ✓ after F12 fix: big serif H1 (editorial theme), lead paragraph muted, H2 with border-bottom rhythm, H3 with proper 48px top margin, lists and inline code styled correctly.

**Wins**:
- **Opt-in by class** — `.typography` root + `.not-typography` descendant escape hatch. Clean coexistence with Starlight prose elsewhere.
- **Uses our token vocabulary** — `var(--color-foreground)`, `var(--color-border)`, `var(--color-muted)`, `var(--color-primary)`, `var(--text-4xl)`. Zero visual drift after the layer fix.
- **Uses Tailwind v4 `--spacing` and `--text-*--line-height`** — takes advantage of the theme tokens from Tailwind v4 setup, so spacing scales coherently with the rest of the site.

**Port-effort estimate**: trivial — it's already CSS-only. If we wanted to own it we'd paste into `registry/tokens.css` or a sibling file, then delete the shadcn-injected block.

---

## Install log — Kibo tags *(spike [4448](tickets/))*

**Command**: `npx -y shadcn@latest add https://www.kibo-ui.com/r/tags.json --yes` from `apps/docs/`

**Files created** (5): `src/components/kibo-ui/tags/index.tsx` + shadcn `badge`, `dialog`, `popover`, `command`. Button was **skipped** (identical to previously installed).

**Deps added**: `cmdk ^1.1.1`. All transitive deps (Radix popover/dialog/slot, `@radix-ui/react-use-controllable-state`, etc.) were already present from earlier installs.

**Source edits**: none.

**Demo harness** (`src/components/demos/tags-demo.tsx`): ~55 lines — controlled multi-select over 14 tix-style tags, pill with X-remove per selected, cmdk search/list underneath.

**Demo-page edits**: `client:only="react"` + `.not-content` wrap. No custom preflight issues.

**Render status**: ✓ popover opens below trigger, cmdk search filters instantly, items toggle, X removes from trigger chips. No console errors.

**Wins**:
- **Zero skipped installs** — dialog/popover/command were new to us, landed correctly from shadcn, composed straight into Kibo's tags. No overwrites, no conflicts.
- **cmdk is well-loved** — `cmdk` is Radix's search-list primitive; it's the backbone of VS Code-style command palettes. Getting it via a tags install is a nice side effect.
- **Controlled by default** — Kibo tags is designed to be controlled from the outside (`value`, `setValue`, `open`, `onOpenChange`). Easy to wire into our own state.

**Port-effort estimate**: 2-4h React port (shadcn cmdk/popover/dialog/badge are substantial primitives). Polyglot: very hard — popover + cmdk don't have direct Svelte equivalents with the same API surface. Defer to headless strategy work (c018).

---

## Install log — Kibo code-block *(spike [4448](tickets/))*

**Command**: `npx -y shadcn@latest add https://www.kibo-ui.com/r/code-block.json --yes` from `apps/docs/`

**Files created** (3): `src/components/kibo-ui/code-block/index.tsx` + `server.tsx` + shadcn `select`. Button skipped again.

**Deps added**: `shiki ^4.0.2`, `@shikijs/transformers ^4.0.2`, `react-icons ^5.6.0` — all declared in the registry metadata.

**Source edits**: **one-line patch** — `SiCss3` → `SiCss` in index.tsx (see F13).

**Demo harness** (`src/components/demos/code-block-demo.tsx`): ~80 lines — 3 files (`install.sh`, `tags-demo.tsx`, `tokens.css`) swap via tab bar; copy button in top-right; line numbers on. Shiki themes `github-light` / `github-dark-default` (Kibo defaults). Styled active tab with our `--accent` underline.

**Demo-page edits**: `client:only="react"` + `.not-content` wrap.

**Render status**: ✓ Shiki highlights TSX/CSS/shell correctly, tab switching instant, copy button works, line numbers monospaced. No console errors after F13 patch.

**Wins**:
- **Server.tsx ships alongside** — Kibo includes a second file for async server-side highlight. Astro can use it via a server island (untested, but sitting there ready).
- **Bundle hit is the real cost** — `shiki` pulls hundreds of grammars and themes. If we port, first job is deciding which languages/themes to bundle.
- **Integrates with our existing Starlight `.expressive-code`** — nothing collides because the Kibo block is `components/kibo-ui/code-block/` and scoped to `.not-content`.

**Port-effort estimate**: 4-6h React port (Kibo's wrapper is moderate; shiki integration requires thought about bundle size). Polyglot hard because shiki client bundle is large and Svelte version would need its own integration. Worth considering: could we use Starlight's existing Expressive Code for prose and Kibo code-block for interactive demos? Sidecar, not either/or.

---

## Running automation opportunities

As friction accumulates we may want a `ui26 sanitize <path>` or equivalent that post-processes installed files:
- replace `type: "spring"` → `type: "tween"` (F5)
- swap or flag `client:load` / `client:visible` usage in Astro (F6)
- run once after each `shadcn add` until upstream drift makes it unworkable.

Out of scope for current spikes — record here as future option.
