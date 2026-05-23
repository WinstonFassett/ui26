# Tabs — taste rules & sync constraints for AI agents

Scoped to `registry/tabs/`. For user-facing docs, see the Tabs page in `apps/docs/src/content/docs/`.

## Canonical no-JS architecture (decided 2026-05-23, tix bcbe)

Tabs.astro ships the canonical no-JS-first pattern. Do not refactor it into a different shape without re-litigating in tix.

### Markup shape

```
<ui26-tabs>                                  ← custom element host (ancestor pivot for :has)
  <input type=radio class=sr-only> (× N)     ← state, siblings of tablist + panels
  <div role=tablist>
    <label role=tab for=... > (× N)          ← visual tab, children of tablist (APG-correct)
  </div>
  <div role=tabpanel data-ui26-tab-item> (× N)
</ui26-tabs>
```

Key invariants:

- **Radios live OUTSIDE the tablist as siblings.** This is the only structure that lets `role=tab` children-of-`role=tablist` (APG requirement) coexist with CSS-only state propagation.
- **`<label role=tab>` IS the tab visually and interactively.** The radio is hidden state.
- Cross-tree `:has(> #uid-N:checked)` from `<ui26-tabs>` drives active styles + panel visibility.
- Per-instance CSS is generated at SSR-render time inside Tabs.astro — sized to the actual child count, not enumerated globally.

### Why this shape and not alternatives

Audited 2026-05-23 against DaisyUI, `<details name>`, `:target`, Pines, Skeleton, Bilal Mansuri's no-JS tabs. Every alternative drops at least one of: rich label content, full ARIA, or no-JS. Today's shape is the only one that holds all three simultaneously in 2026 browsers.

- DaisyUI radio-as-tab → drops rich content (text-only via `aria-label`).
- DaisyUI label-wraps-input → drops all ARIA roles.
- `<details name="group">` → wrong semantics (disclosure, not tabs).
- `:target` → URL pollution, history entries. (Used intentionally in HashTabs only.)
- Pines/Skeleton → require JS, weak a11y.
- Bilal's no-JS tabs → same shape as us, but enumerated per-tab CSS doesn't scale.

If you find yourself "simplifying" this back toward radio-IS-tab or label-wraps-input, stop. That regresses a constraint that has been deliberately defended.

## JS-enhancement layer (`tabs.client.ts`)

The `<ui26-tabs>` custom element upgrades the no-JS scaffold:

- Syncs `aria-selected` + roving `tabindex` on radio `change`.
- Handles Arrow / Home / End keys against `labels[i]` (radios stay hidden).
- Focuses `labels[i]` on activation.

JS enhancement is **strictly additive** — toggling JS off leaves a working, accessible (modulo static-ARIA staleness) tabset.

Known APG gaps tracked in tix c717:
- `aria-controls` missing on tabs
- `aria-labelledby`/`aria-label` missing on tablist
- Arrow keys don't wrap
- Enter doesn't activate (Space does via native label click)
- Empty tabpanels lack `tabindex=0`

These are unimplemented features, not architectural blockers.

## React + Svelte variants

`tabs-machine-ui.tsx` and `tabs-machine-ui.svelte` do NOT use the radio scaffold. They consume `tabs-machine.vanilla.ts` (the vanilla atom). They emit the same visible markup minus radios:

```
<div>                                        ← Tabs root
  <div role=tablist>
    <button role=tab>                         ← tab is a button, not a label
  </div>
  <div role=tabpanel>
</div>
```

Visual + a11y parity with the Astro variant is the contract. State of truth differs (radio :checked vs. atom).

## Astro `.state.ts` consumption

Astro Tabs.astro does **not** consume `tabs-machine.vanilla.ts` for its core state. The radio's `:checked` is the source of truth in no-JS mode. When tix lands a controlled-mode Astro variant, the state file becomes the JS-enhancement layer's source of truth, sync'd bidirectionally with `:checked` (see decision_state_layer_prop_api memory).

## What ships in the registry

Per `feedback_ui26_dumb_registry`: no runtime registries, stores, or helper machinery in `registry/tabs/`. Tooling lives in `apps/docs/src/`. The state file is a registry:lib with a factory function; that's it.

## Naming convention

`tabsTrigger` → `.tabs-trigger`. Variant value appended: `.tabs-trigger-pill`, `.tabs-trigger-underline`. This is the convention emitted by the TV-to-utilities spike (`scripts/tv-to-utilities.ts`, tix e60a) and should hold across components.

## What lives where

| File | Role |
|---|---|
| `tabs.tv.ts` | shared styling (TV def) — consumed by all framework variants |
| `tabs-machine.vanilla.ts` | shared state (vanilla atom factory) — consumed by React + Svelte (not Astro) |
| `Tabs.astro` + `TabItem.astro` | Astro no-JS-first variant, radio scaffold |
| `tabs.client.ts` | custom element upgrading the no-JS scaffold |
| `tabs.css` | Astro-specific styles complementing the generated per-instance CSS |
| `tabs-machine-ui.tsx` + `tabs-machine-ui.svelte` | React + Svelte variants, atom-driven |
| `HashTabs.astro` + `hashtabs.client.ts` + `hashtabs.css` | `:target`-based addressable variant (tix 7f3a) |
