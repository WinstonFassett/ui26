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

## Running automation opportunities

As friction accumulates we may want a `ui26 sanitize <path>` or equivalent that post-processes installed files:
- replace `type: "spring"` → `type: "tween"` (F5)
- swap or flag `client:load` / `client:visible` usage in Astro (F6)
- run once after each `shadcn add` until upstream drift makes it unworkable.

Out of scope for current spikes — record here as future option.
