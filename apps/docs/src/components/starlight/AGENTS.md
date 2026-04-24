# Starlight overrides — agent notes

These files replace Starlight's built-in `ThemeProvider` and `ThemeSelect`. Registered in [`astro.config.mjs`](../../../astro.config.mjs) under `starlight.components`. User-facing docs for the theme system live at [`apps/docs/src/content/docs/reference/themes.mdx`](../../content/docs/reference/themes.mdx); token-authoring rules live at [`apps/docs/registry/AGENTS.md`](../../../registry/AGENTS.md).

## The two `THEMES` lists must agree

The allowlist of theme names is duplicated in two places:

1. [`ThemeProvider.astro`](./ThemeProvider.astro) — inline pre-paint script, used to reject unknown `localStorage` values.
2. [`theme-picker.tsx`](./theme-picker.tsx) — React component, used to render the `<select>` options and to type the `Name` union.

When you add a theme, update **both**. A theme that exists in tokens.css but not in the picker's list is invisible; one in the picker but not the pre-paint script can be stored by the user but gets rejected on reload.

## React component rules

**Don't touch `window` during render.** The picker is SSR'd by Astro. Referencing `window.Ui26Theme` in the render path (not inside `useEffect`) throws at SSR and the island silently drops — no error, no astro-island wrapper, picker just doesn't appear. All `window` access goes inside `useEffect` or event handlers. Options/labels are hardcoded module-level constants in the component file, not read off `window.Ui26Theme`.

**Render something unconditional at SSR.** Returning `null` before hydration means Astro emits no island wrapper and the component never hydrates on the client. The current picker renders the full shell (select + toggle) at SSR with default values; `useEffect` corrects state after mount.

**`client:load` is required.** The picker reads and writes state the moment it mounts, and needs the `Ui26Theme` global to be hot — defer directives (`client:idle`, `client:visible`) delay the theme from reflecting persisted state.

## Pre-paint script rules

**Inline only.** `ThemeProvider.astro`'s script must use `<script is:inline>` — it runs before any deferred JS and must not go through the bundler. Don't split it into a module.

**No external deps.** The script runs before first paint on every page. Keep it dependency-free. No imports.

**Two storage keys, not one JSON.** `ui26-theme-name` and `ui26-theme-mode` are separate keys so the pre-paint script can parse them with primitive string comparisons. Don't consolidate into JSON — the parse cost is tiny but the allowlist check is what rejects corrupt values, and that's cleaner on strings.

## Starlight contract

**We own `data-theme`.** Starlight's original toggle wrote `"light"`/`"dark"` to this attribute; our override replaces both the provider (pre-paint + API) and the select (UI), so the attribute now carries the compound key (e.g. `editorial-dark`). Don't revert to Starlight's defaults without also reverting the tokens.css structure.

**The `--sl-*` FOUC inline CSS in `astro.config.mjs`** only covers Editorial chrome vars. It's intentional — tokens.css loads milliseconds later and overrides for the active theme. Don't try to fan it out per theme; the block would be huge and would still miss.

## Lucide + React

The picker uses `lucide-react` icons, not Starlight's icon template. Don't try to reuse Starlight's `<template id="theme-icons">` approach — it was for DOM-manipulation JS, not React. If you add a new mode icon, import from `lucide-react`.
