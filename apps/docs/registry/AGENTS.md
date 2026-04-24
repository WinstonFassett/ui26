# Registry — agent notes

Authoring rules for theme files and anything else under `apps/docs/registry/`. These are taste/adaptation rules, not user-facing documentation. User docs for the theme system live at [`apps/docs/src/content/docs/reference/themes.mdx`](../src/content/docs/reference/themes.mdx).

## tokens.css is generated — don't hand-edit

[`registry/tokens.css`](./tokens.css) is emitted from [`registry/themes/*.ts`](./themes) by [`scripts/build-tokens.ts`](../scripts/build-tokens.ts). The `predev` and `prebuild` scripts re-emit it automatically; `pnpm build:tokens` does it manually. Direct edits to `tokens.css` will be clobbered on the next run.

Theme data lives in [`registry/themes/<name>.ts`](./themes) — one plain-object file per theme. The [`registry/themes.ts`](./themes.ts) barrel is the single list consumed by the emitter, the picker, the pre-paint provider, and the shadcn registry endpoint.

## Dumb-registry rule

The `registry/` tree ships dumb, copy-pasteable code. Theme files are plain data — no helpers, no registration APIs, no runtime machinery. Downstream users copy a theme file into their project, and it works in isolation. Tooling (emitter, watchers, generators) lives in [`apps/docs/scripts/`](../scripts), **not** under `registry/`.

## Token-authoring rules

**Don't number tokens.** No `--panel2`, `--surface-1`, `--border-3`. Use semantic names (`--card`, `--muted`, `--border-soft`, `--text-mute`) or existing shadcn vocabulary. Map numbered design-source names (e.g. a Figma palette with `Gray/100..900`) at the call site, not at the token layer.

**Prefer OKLCH.** New palettes should use OKLCH for colors so lightness is perceptually uniform across light/dark pairs. Hex is fine for themes where exact hues matter (Editorial, Brutalist) — don't convert gratuitously.

**Use `{ light, dark }` pairs for mode-specific values; plain strings for mode-invariant ones.** The emitter splits pairs across the light and dark CSS blocks; scalars go in the light block only and cascade. If a token's light and dark values are identical, write it as a plain string — don't write a `{ light: x, dark: x }` pair (the emitter detects the identity and de-dupes anyway, but the intent is clearer as a scalar).

**Shadows must be explicitly set to `none`, not omitted.** Themes without shadows (Editorial, Brutalist) still need `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `highlight-inset` written out as `'none'`. Omission lets the previous theme's shadow stack leak through — subtle bug.

**Optional named palette.** Themes may expose a `palette` field — a named record of mode-invariant strings or `{ light, dark }` pairs that tokens reference by identity (`primary: palette.ink`). It's exported on the Theme for introspection, and reduces duplication when several tokens share the same value. Skip it for themes with saturated/literal colors that don't name cleanly (e.g. brutalist's primaries).

**Font stacks always end in a system fallback.** If a webfont 404s, the fallback has to carry the theme. Never stop at a single named font.

## Token contract

Every theme's light block must define the full semantic surface (see [`themes.mdx` → Token contract](../src/content/docs/reference/themes.mdx) for the authoritative list — keep that doc in sync if the contract expands). If a consumer component reads `var(--success)` and the active theme didn't set it, you'll get nothing. No fallbacks at the call site — the theme must be complete.

## Barrel order matters

The first entry in [`registry/themes.ts`](./themes.ts) is the default theme:

- Its light block doubles as `:root` in the generated CSS (so elements without a `data-theme` attribute render correctly).
- [`src/pages/r/base.json.ts`](../src/pages/r/base.json.ts) serves it as the shadcn-registry `base` payload.
- [`ThemeProvider.astro`](../src/components/starlight/ThemeProvider.astro) falls back to it when `localStorage` is empty or holds an unknown value.

Reordering the barrel changes the default. Append new themes to the end unless you have a reason.

## Transitional aliases

Don't add `[data-theme="dark"]`-style Starlight-compat blocks back into `tokens.css` (or a theme file). We own the attribute via the ThemeProvider override ([`apps/docs/src/components/starlight/ThemeProvider.astro`](../src/components/starlight/ThemeProvider.astro)) — any code writing bare `dark`/`light` is a bug to fix, not a case to paper over.
