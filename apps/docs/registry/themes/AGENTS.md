# Themes — agent notes

Each file in this directory is a standalone theme: one `[data-theme="<name>"]` block + one `[data-theme="<name>-dark"]` block. The default theme additionally prefixes its named selector with `:root,` so documents without a `data-theme` attribute render correctly — today that's [`shad.css`](./shad.css). The index [`../all-themes.css`](../all-themes.css) `@import`s every theme file for the multi-theme switcher.

User-facing docs: [`apps/docs/src/content/docs/reference/themes.mdx`](../../src/content/docs/reference/themes.mdx). Broader registry rules: [`../AGENTS.md`](../AGENTS.md).

## Anatomy of a theme file

- Opens with `[data-theme="<name>"] {` (the default theme additionally precedes this with `:root,` on its own line).
- Defines the full token contract — don't rely on cascade from another theme's block; each theme is self-contained so any single file is copy-pasteable into a downstream project.
- Dark block is a peer, not a child: `[data-theme="<name>-dark"] {` re-declares every token that changes (and usually the whole contract, since we don't rely on light-block cascade).

## Adaptation rules for imported themes

Imported themes (everything after `shad`) come from [better-chatbot](https://github.com/cgoinglove/better-chatbot/blob/main/src/app/globals.css) or compatible shadcn-ecosystem sources. The source blocks carry only the core shadcn contract (~20 tokens) + `--chart-*` + `--sidebar-*`. When adapting:

1. **Keep source values verbatim** for the shared shadcn contract (`--background`, `--primary`, `--ring`, `--radius`, etc.).
2. **Drop `--chart-*`** — not in ui26 vocabulary.
3. **Keep `--sidebar-*`** — shadcn-standard, 8 vars, copy as-is.
4. **Fill ui26 extras**:
   - `--border-soft` — one lightness tier lighter than `--border` (light mode) or darker (dark mode).
   - `--success` / `--warn` / `--info` / `--purple` — use shad's semantic OKLCH defaults. Status colors shouldn't theme.
   - `--accent-ink` — matches `--foreground`.
   - `--accent-soft` — the accent color with an alpha channel (0.15–0.3 range).
   - `--text-mute` — tier between `--muted-foreground` and `--foreground`.
   - `--code` — slightly different from `--background` or `--card`; usually a tinted muted surface.
   - Shadow vocabulary — tint `--shadow-color` with the theme's primary hue; use the standard shadcn opacity recipe for `--shadow-xs..lg`.
   - `--font-sans` / `--font-serif` / `--font-mono` — system stack unless theme specifically wants a distinctive face.
5. **HSL is kept from source** to make diffing against upstream trivial. Mixing color spaces (OKLCH in some themes, HSL in others) is fine.

## Token contract

Every theme (light and dark) must define the full surface — see [`../../src/content/docs/reference/themes.mdx` → Token contract](../../src/content/docs/reference/themes.mdx) for the authoritative list. If a consumer component reads `var(--success)` and the active theme didn't set it, you'll get nothing.
