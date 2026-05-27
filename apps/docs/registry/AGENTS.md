# Registry — agent notes

Authoring rules for `all-themes.css` and anything else under `apps/docs/registry/`. These are taste/adaptation rules, not user-facing documentation. User docs for the theme system live at [`apps/docs/src/content/docs/reference/themes.mdx`](../src/content/docs/reference/themes.mdx).

## Framework selection principle

**If a registry component needs DOM interaction (show/hide, focus, animation, events), reach for Svelte — not vanilla JS.** Svelte gives us transitions, reactivity, and lifecycle for free, and Astro SSR's Svelte slot content just like any other island. The Astro layer is for structure and routing, not for reimplementing what Svelte already does well.

This means: don't write a `*.astro` component with inline `<script>` blocks to manage interactive state. Write a `*.svelte` component and drop it into the Astro page as an island. The slot content — server-rendered markup, code blocks, static HTML — still comes from Astro and is SSR'd. The Svelte component wraps it and owns the interaction layer.

**The wrong instinct**: build a vanilla JS component because "it's simpler" or "no framework needed."  
**The right instinct**: Svelte for anything interactive, Astro for static structure and SSR'd content composition.

## Token-authoring rules

**Don't number tokens.** No `--panel2`, `--surface-1`, `--border-3`. Use semantic names (`--card`, `--muted`, `--border-soft`, `--text-mute`) or existing shadcn vocabulary. Map numbered design-source names (e.g. a Figma palette with `Gray/100..900`) at the call site, not at the token layer.

**Prefer OKLCH.** New palettes should use OKLCH for colors so lightness is perceptually uniform across light/dark pairs. Hex is fine for themes where exact hues matter (Editorial, Brutalist) — don't convert gratuitously.

**Dark block is minimal.** Only override tokens that actually change in dark mode. Fonts, `--radius`, and shadow vocabulary typically cascade from the light block — don't duplicate. Re-declaring identical values is noise.

**Shadows must be explicitly set to `none`, not omitted.** Themes without shadows (Editorial, Brutalist) still need `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--highlight-inset` written out as `none`. Omission lets the previous theme's shadow stack leak through — subtle bug.

**Font stacks always end in a system fallback.** If a webfont 404s, the fallback has to carry the theme. Never stop at a single named font.

## Token contract

Every `[data-theme="<name>"]` block must define the full semantic surface (see [`themes.mdx` → Token contract](../src/content/docs/reference/themes.mdx) for the authoritative list — keep that doc in sync if the contract expands). If a consumer component reads `var(--success)` and the active theme didn't set it, you'll get nothing. No fallbacks at the call site — the theme must be complete.

## When editing all-themes.css

- Group the comments already in the file (light block / dark block / theme rationale) stay as-is when you add a new theme — match the pattern.
- Don't reorder existing themes. Append new ones.
- If you change a token's semantic meaning (e.g. `--accent-soft` from "background tint" to "border tint"), update every theme's value, not just the one you're working on.

## Transitional aliases

Don't leave `[data-theme="dark"]`-style Starlight-compat aliases in all-themes.css. We own the attribute via the ThemeProvider override ([`apps/docs/src/components/starlight/ThemeProvider.astro`](../src/components/starlight/ThemeProvider.astro)) — any code writing bare `dark`/`light` is a bug to fix, not a case to paper over.

## Sibling-file naming for stateful components

Stateful components (Tabs, Dialog, Popover, Tooltip, Combobox, …) ship as **families of sibling files**, not one canonical impl. Naming follows two axes — **machine backend** and **view** — plus a third orthogonal sibling for the no-JS story.

### Machine backend axis

The state machine (or store, if the component has no transition graph). All backends export the same surface so views are swappable.

| Filename | Backend |
|---|---|
| `<name>-machine.vanilla.ts` | hand-rolled, zero dep |
| `<name>-machine.matchina.ts` | matchina-backed |
| `<name>-machine.xstate-fsm.ts` | @xstate/fsm-backed |

"Machine" is used uniformly even when the component is just a store (e.g. Tabs is `activeTab: string` with no transitions) — the name reflects the **shared contract**, not the internal complexity. The matchina sibling is the canonical shape; the vanilla one shadows it.

What every machine file exports:

- A factory `create<Name>Machine(initial?, options?)`. `initial` is positional, mirroring matchina's `createMachine(states, transitions, initial)`. Default to the "rest" state (Closed / first value).
- `SLOT_PROPS: Record<StateKey, SlotPropsMap>` — ARIA/data-attribute table indexed by state key.
- `getSlotProps(state, slot)` — convenience reader. Single source of ARIA truth for both SSR (view reads at render) and runtime (machine applies on transition).

### View axis

Framework-specific. The view is what gets imported into a page. No "vanilla view" — every view targets a framework.

| Filename | View |
|---|---|
| `<name>-machine-ui.tsx` / `.svelte` | our own view, consumes `<name>-machine.*.ts` via the shared contract. Backend is swappable. |
| `<name>-radix-ui.tsx` | thin wrapper over radix-ui. Brings its own state — backend not swappable. |
| `<name>-bits-ui.svelte` | thin wrapper over bits-ui. Same. |
| `<name>-progressive.{tsx,svelte,astro}` | works without JS. Progressive enhancement layered on if JS loads. See below. |

**`<name>-machine-ui`** is the contract-driven view: it imports from `./<name>-machine.vanilla` by default, but consumers can swap the backend file (matchina, xstate-fsm, …) without touching the view. This is the modular path — the "view + your choice of backend" combo.

### Progressive sibling (no-JS / progressive enhancement)

Components named `<name>-progressive.*` work with JS disabled. The HTML alone is functional and accessible (modulo enhancements JS would add — roving tabindex, focus restoration, etc.). If JS loads, an optional `<name>.client.ts` upgrades the a11y story; it is strictly additive.

Common mechanisms (impl detail, not encoded in the name):
- Native HTML elements with built-in behavior: `<dialog>`, `<details>`.
- Form-state scaffolds: radio + `:has()` + CSS for tabs.
- URL state: `:target` for addressable variants.

Don't name files after the mechanism (`-native`, `-radio`, `-target`). The contract is "works without JS" — that's what the filename communicates. The mechanism is an implementation detail readers discover by opening the file.

### No generic `<name>.{tsx,svelte}` for stateful components

Stateful components never live at `<name>.{tsx,svelte}` in the registry. Every framework-specific file carries an impl qualifier (`-machine-ui`, `-radix-ui`, `-bits-ui`, `-progressive`). The generic name is forbidden — a reader should be able to tell from the filename alone which impl they're looking at, with no ambiguity.

The only file in a stateful component dir without an impl qualifier is `<name>.tv.ts` — the shared styles, consumed by every impl.

For dumb (stateless) components, `<name>.{tsx,svelte}` stays as the single canonical file — no machine, no siblings.

### Machine-file contract

Every `<name>-machine.{vanilla,matchina,xstate-fsm}.ts` file MUST export the same surface so views are swappable. The shared surface is the contract; how each backend implements it internally is hidden.

**Required exports:**

```ts
// State keys — STABLE only. No transient/in-flight keys.
export type <Name>StateKey = /* e.g. "Closed" | "Open" */;

// Events the machine accepts.
export type <Name>Event = /* e.g. "open" | "close" | "settle" | "reset" */;

// Snapshot — what subscribers see. `transitioning: boolean` rides alongside
// the key for animation gating instead of bloating state keys with Opening/Closing.
export type <Name>Snapshot = { key: <Name>StateKey; transitioning: boolean };

// Change event — carries from/to snapshots so derivers can compute direction.
export type <Name>ChangeEvent = {
  type: <Name>Event;
  from: <Name>Snapshot;
  to:   <Name>Snapshot;
};

// SLOT_PROPS — ARIA / data-attribute table indexed by state key.
export const SLOT_PROPS: Record<<Name>StateKey, Record<SlotName, AttrMap>>;

// getSlotProps — convenience reader. Single source of ARIA truth for both
// SSR (view reads at render time) and runtime (machine applies via effects).
export function getSlotProps(state: <Name>StateKey, slot: SlotName): AttrMap;

// Direction derivers — operate on (event, snapshot), not on key alone.
export function is<Verb>ing(ev: <Name>ChangeEvent | null, snap: <Name>Snapshot): boolean;

// Factory — `initial` is POSITIONAL, mirroring matchina's createMachine(states, transitions, initial).
// Default to the "rest" key. Only stable keys are valid entry points.
export function create<Name>Machine(initial?: <Name>StateKey, options?: ...): <Name>Machine;
```

**Returned machine surface:**

```ts
{
  getSnapshot(): <Name>Snapshot;
  getLastEvent(): <Name>ChangeEvent | null;   // for deriver lookback
  send(event: <Name>Event): void;
  subscribe(fn: (ev: <Name>ChangeEvent) => void): () => void;
}
```

**Why no transient keys:** `Opening` / `Closing` (and equivalents) as first-class state keys force every consumer to special-case them and exclude them from `initial`. `transitioning: boolean` + direction derivers gives the same animation hooks while keeping the state graph small, the keys orthogonal, and transitions interruptible (open during close just flips `to.key` back and leaves `transitioning` true until `settle`).

**`settle` event:** sent by the view when an entering animation has played out (`requestAnimationFrame` for opens, `animationend` for closes). Clears `transitioning`. Views with no animation can call `settle` synchronously.

**Reset:** `send("reset")` returns to the rest key with `transitioning: false`. Used by view unmount and by parents that want to forcibly close.

**Stores (no transitions):** Components like Tabs whose state is just a value, not a state graph, still ship as `<name>-machine.*.ts` for naming parallelism. Their factory exports `state` (an atom-like subscribable) plus per-value helpers (`activateTab`, `isActive`). `SLOT_PROPS` is keyed by an active/inactive boolean rather than a state key; `getSlotProps(state, slot, value)` carries the extra parameter.

### Install-time rename (CLI, future)

The shadcn install pattern is `npx ui26 add <name>` → copies files into the consumer project. We plan to support sibling selection and optional rename-on-copy:

```
npx ui26 add tabs --impl bits-ui          # copies tabs-bits-ui.svelte as tabs-bits-ui.svelte (default: preserve)
npx ui26 add tabs --impl bits-ui --as tabs # copies tabs-bits-ui.svelte as tabs.svelte (explicit opt-in)
```

Default behavior: preserve the specific filename. Consumers see exactly which impl they installed. Rename to a generic name only when explicitly requested via `--as` — and only in the consumer project, never in the registry itself.

Not yet implemented. Tracked separately.
