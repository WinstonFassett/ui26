# Registry — agent notes

Authoring rules for `all-themes.css` and anything else under `apps/docs/registry/`. These are taste/adaptation rules, not user-facing documentation. User docs for the theme system live at [`apps/docs/src/content/docs/reference/themes.mdx`](../src/content/docs/reference/themes.mdx).

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
