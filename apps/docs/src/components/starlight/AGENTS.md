# Starlight overrides — agent notes

These files replace Starlight's built-in `ThemeProvider` and `ThemeSelect`. Registered in [`astro.config.mjs`](../../../astro.config.mjs) under `starlight.components`. User-facing docs for the theme system live at [`apps/docs/src/content/docs/reference/themes.mdx`](../../content/docs/reference/themes.mdx); token-authoring rules live at [`apps/docs/registry/AGENTS.md`](../../../registry/AGENTS.md).

## Single source of truth: the theme barrel

The allowlist of theme names, labels, and tokens all come from [`registry/themes.ts`](../../../registry/themes.ts). Both [`ThemeProvider.astro`](./ThemeProvider.astro) (for the pre-paint allowlist) and [`theme-picker.tsx`](./theme-picker.tsx) (for the `<select>` options + labels) import from it. Don't re-declare theme lists locally — that's exactly the drift the barrel exists to prevent.

To add or rename a theme, edit the barrel. Nothing in this directory needs to change.

## React component rules

**Don't touch `window` during render.** The picker is SSR'd by Astro. Referencing `window.Ui26Theme` in the render path (not inside `useEffect`) throws at SSR and the island silently drops — no error, no astro-island wrapper, picker just doesn't appear. All `window` access goes inside `useEffect` or event handlers. Theme options come from the barrel at build time, not off `window.Ui26Theme`.

**Render something unconditional at SSR.** Returning `null` before hydration means Astro emits no island wrapper and the component never hydrates on the client. The current picker renders the full shell (select + toggle) at SSR with default values from `themes[0]`; `useEffect` corrects state after mount.

**`client:load` is required.** The picker reads and writes state the moment it mounts, and needs the `Ui26Theme` global to be hot — defer directives (`client:idle`, `client:visible`) delay the theme from reflecting persisted state.

## Pre-paint script rules

**Inline only.** `ThemeProvider.astro`'s script must use `<script is:inline>` — it runs before any deferred JS and must not go through the bundler. Don't split it into a module.

**`define:vars` for barrel injection.** The pre-paint script needs the theme allowlist at runtime but can't import modules (because of `is:inline`). Astro's `define:vars` prop serializes server-side values into the inline script's scope. That's the bridge: the `.astro` frontmatter imports the barrel and passes `themeNames` + `defaultName` via `define:vars`, and the inline body reads them as lexical variables.

**No external deps in the inline body.** The script runs before first paint on every page. Keep the inline body dependency-free — no imports, no helper calls outside the IIFE.

**Two storage keys, not one JSON.** `ui26-theme-name` and `ui26-theme-mode` are separate keys so the pre-paint script can parse them with primitive string comparisons. Don't consolidate into JSON — the parse cost is tiny but the allowlist check is what rejects corrupt values, and that's cleaner on strings.

## Starlight contract

**We own `data-theme`.** Starlight's original toggle wrote `"light"`/`"dark"` to this attribute; our override replaces both the provider (pre-paint + API) and the select (UI), so the attribute now carries the compound key (e.g. `editorial-dark`). Don't revert to Starlight's defaults without also reverting the tokens.css structure.

**The `--sl-*` FOUC inline CSS in `astro.config.mjs`** only covers Editorial chrome vars. It's intentional — tokens.css loads milliseconds later and overrides for the active theme. Don't try to fan it out per theme; the block would be huge and would still miss.

## Lucide + React

The picker uses `lucide-react` icons, not Starlight's icon template. Don't try to reuse Starlight's `<template id="theme-icons">` approach — it was for DOM-manipulation JS, not React. If you add a new mode icon, import from `lucide-react`.
