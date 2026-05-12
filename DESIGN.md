# Design

## Visual Theme

Sharp, precise, editorial. Warm off-white in light mode; near-black in dark mode. One fog-blue accent. No rounded corners (2px exception for code-copy button, circles for avatars). No shadows. No gradients. Hierarchy through 1px hairline borders and background elevation tiers.

Dark mode is primary — the target user is in a terminal environment. Light mode is fully supported and equally intentional.

## Color

Strategy: **Restrained** — tinted neutrals + one accent used at under 10% surface area.

All values are source hex (from the design handoff). Convert to OKLCH when authoring new tokens.

### Light mode

| Role | Value | Use |
|------|-------|-----|
| Background | `#f6f5f1` | Page background |
| Panel | `#ffffff` | Cards, panels tier 1 |
| Panel 2 | `#faf9f6` | Raised surfaces |
| Panel 3 | `#ecebe4` | Hover state backgrounds |
| Border | `#e3e0d8` | Primary dividers |
| Border soft | `#ecebe4` | Subtle separators |
| Text | `#15130f` | Primary copy |
| Text dim | `#6a665d` | Secondary copy |
| Text mute | `#a09b91` | Placeholders, disabled |
| Accent | `#8ab4d8` | Fog blue — active states, links, focus |
| Accent soft | `rgba(138,180,216,0.2)` | Callout backgrounds, hover tints |

### Dark mode

| Role | Value | Use |
|------|-------|-----|
| Background | `#0e0e0f` | Page background |
| Panel | `#141416` | Cards, panels tier 1 |
| Panel 2 | `#1a1a1c` | Raised surfaces, hover backgrounds |
| Panel 3 | `#212124` | Deepest surfaces |
| Border | `#262628` | Primary dividers |
| Border soft | `#1e1e20` | Subtle separators |
| Text | `#ececec` | Primary copy |
| Text dim | `#8a8a90` | Secondary copy |
| Text mute | `#56565c` | Placeholders, disabled |
| Accent | `#8ab4d8` | Fog blue — same as light |
| Accent soft | `rgba(138,180,216,0.14)` | Callout backgrounds, hover tints |

### Semantic colors

| Role | Light | Dark |
|------|-------|------|
| Success | `#2f7a3a` | `#8fd1a3` |
| Warning | `#a35a00` | `#e6b86a` |
| Danger | `#b3332e` | `#e68a8a` |
| Info | `#1f5ab8` | `#8fb9d6` |
| Purple | `#6a3fb5` | `#b89dd8` |

### Alternative accent options (swap into `--color-accent`)

- Soft Gold `#e6d089` — warm, refined
- Lavender `#b89dd8` — dusty, unexpected
- Apricot `#e0a876` — warm, friendly

### Code syntax

| Token | Light | Dark |
|-------|-------|------|
| Keyword | `#6a3fb5` | `#c8a6ff` |
| Identifier | `#0a6fb3` | `#8fd1ff` |
| String | `#a35a00` | `#ffd48a` |
| Comment | `#a09b91` | `#56565c` |
| Highlight | `#fff6b3` | `#2a2a15` |

## Typography

Three families only. Never more.

- **Newsreader** — display headlines, stat numerals, wordmark. Italic for numerals. Loaded from Google Fonts (roman + italic, 400/500).
- **Geist** — all UI text, body copy, H1–H3, buttons, labels, sidebar items. 400–700.
- **Geist Mono** — code, eyebrows, breadcrumbs, badges, metadata, keyboard shortcuts, version pills. 400/500/600.

### Type scale

| Style | Family | Size | Line height | Weight | Letter spacing |
|-------|--------|------|-------------|--------|----------------|
| Display XL | Newsreader | 64px | 1.02 | 500 italic | -0.025em |
| Display LG | Newsreader | 48px | 1.02 | 500 | -0.022em |
| H1 | Geist | 28px | 1.2 | 600 | -0.015em |
| H2 | Geist | 20px | 1.25 | 600 | -0.015em |
| H3 | Geist | 15px | 1.3 | 600 | — |
| Body LG | Geist | 15px | 1.55 | 400 | — |
| Body | Geist | 13px | 1.55 | 400 | — |
| Caption | Geist | 11px | 1.4 | 400 | — |
| Eyebrow | Geist Mono | 10px | 1.4 | 500 | +0.12em |
| Code | Geist Mono | 12px | 1.6 | 400 | — |

### Casing rules

- Eyebrows / labels: ALL-CAPS mono (`DOCS / CORE / PATTERN MATCHING`)
- Headlines: Sentence case, never Title Case
- Buttons: Sentence case (`Get started`, `Save changes`)
- Badges: ALL-CAPS mono (`ACTIVE`, `P1 · HIGH`)
- Sidebar items: Sentence case

Body line length: cap at 65–75ch.

## Spacing

Core increments: `4 / 8 / 14 / 20 / 28 / 48px`

Key layout dimensions:
- Content padding: `48px 56px`
- Sidebar item padding: `3px 16px`
- Stat row gap: `48px`
- CTA button gap: `8px`
- Content width: `56rem`

## Layout

3-column docs layout:
- Sidebar: `240px`
- Main content: `1fr`
- TOC: `260px`
- Top nav: `44px` tall

No container wrapping the whole page. Sections sit in the grid.

## Components

### Borders

1px hairlines everywhere. No exceptions for decorative use.

- Active sidebar item: `2px solid accent` left + `panel2` background + weight 500
- Active tab: `1.5px solid accent` bottom
- Active TOC item: `1.5px solid accent` left, `padding-left: 8px`, `margin-left: -10px`
- Callouts: `2px solid accent` left + accent-soft background
- Toasts: `2px solid <semantic-color>` left

### Corner radii

Zero everywhere. Two hard exceptions:
- Code-copy button: `2px`
- Avatars: `50%` (circle)

### Shadows

None. Ever. Elevation through 1px borders + background tier (`panel` → `panel2` → `panel3`).

### Hover states

- Sidebar items: text-primary + `panel3` background
- Links: underline, `text-underline-offset: 3px`, `text-decoration-thickness: 1px`
- No opacity fades, no color transitions

### Iconography

No icon library. All icons are Unicode glyphs in Geist Mono:

| Glyph | Use |
|-------|-----|
| `→` | CTA arrow, forward navigation |
| `↗` | External link |
| `⎘` | Copy / clipboard |
| `✕` | Close, delete, error |
| `⌘` | Command key |
| `⌕` | Search |
| `✦` | AI / Claude indicator |
| `⤓` | Apply / download |
| `⧉` | Duplicate |
| `↵` | Enter / submit |
| `▾` | Dropdown indicator |
| `●` | Status dot (accent, active/live) |
| `✓` | Checkbox check |
| `⚠` | Warning |
| `ℹ` | Info |

No emoji anywhere.

Logo: `mdi-state-machine` SVG (24×24, `currentColor`).

## Motion

Minimal. `transition: left 0.15s` on switch thumbs only. No page transitions, no fade-ins, no bouncing, no elastic curves. If something moves, it moves because it must.

## Hero card pattern

2-column layout with 1px border, `panel2` background:
- Left pane: SVG canvas `460×200`, dotted grid (0.7r circles, 60×50px spacing), nodes as sharp 32px rectangles in accent color
- Right pane: syntax-highlighted code with line numbers
- Active elements use accent color

## Stat rows

Newsreader italic numeral (18px) + Geist Mono label (11px). Flex gap 48px.
Format: `2kb gzipped · 0 dependencies · 100% type-inferred`

## Version pills

Geist Mono 10px in `1px bordered` capsule. Format: `v2.1`. No background fill.
