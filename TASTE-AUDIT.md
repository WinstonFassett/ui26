# ui26 — Taste Audit & Spike

Date: 2026-04-22. Branch: `spike/taste-audit`.

Applied lenses (loaded from skills.sh):

1. Vercel Labs — **web-design-guidelines** (anti-slop audit)
2. Google Labs — **stitch / taste-design** (atmosphere dials, anti-slop)
3. leonxlnx — **taste-skill / design-taste-frontend** (dials, AI-tells)
4. leonxlnx — **taste-skill / redesign-existing-projects** (fix-priority checklist)
5. leonxlnx — **taste-skill / minimalist-ui** (warm monochrome, editorial, document-style)

**Source of aesthetic truth:** `tix/tix-ui/DESIGN.md` — Linear-inspired, monochrome, information-dense, tool-like. Called out as the "aesthetic voice" in `UBIQUITOUS_LANGUAGE.md`.

---

## 0. Atmosphere dials (committed)

Per `design-taste-frontend`, every design needs three committed dials. I'm picking against the loud defaults because tix is explicitly quiet.

| Dial | Skill default | ui26 choice | Why |
|---|---|---|---|
| `DESIGN_VARIANCE` | 8 (asymmetric / masonry) | **3** (predictable grids, tight symmetry) | tix is "tool-like, precise, quiet". Asymmetric bento fights the brief. |
| `MOTION_INTENSITY` | 6 (fluid CSS + transitions) | **4** (short CSS transitions + Motion for layout/stagger, MIT) | tix uses `motion` / `framer-motion` in anger: `LayoutGroup`, `AnimatePresence`, CSS-staggered row entry. Durations stay sub-200ms; "no bounces, no springs" means no overshoot physics, not no library. |
| `VISUAL_DENSITY` | 4 (daily app) | **7** (near-cockpit: `text-sm` default, tight padding) | tix: "High density, compact rows" |

Everything below is consistent with those dials.

---

## 1. Baseline findings (current `main`)

**Palette (`apps/docs/registry/tokens.css`):** stock shadcn defaults, exactly zero chroma (`oklch(x 0 0)`). Pure neutral grays. Single destructive red at `oklch(0.577 0.245 27.325)`.

**Typography:** no font stack declared. Inherits Starlight's default → **Inter** (explicitly banned by 3 of 5 skills for premium/tool contexts).

**Radii:** single `--radius: 0.625rem` with calc'd sm/md/lg/xl. Used everywhere — no variety between containers (cards) and inner elements (buttons, inputs), flagged by `redesign-existing-projects` as a "tighter inner / softer outer" miss.

**Components (from screenshots):**
- `button`: solid black primary with `active:translate-y-px` (good — tactile). `destructive` is full-saturation red, no `/20` ring softening in light mode, reads loud against the otherwise quiet palette.
- `card`: flat `shadow-sm`, same radius as buttons (no hierarchy). Docs renders cards in **3 equal columns** — explicitly the "most generic AI layout" per `redesign-existing-projects`.
- `badge`: shadcn defaults, fine.
- `input`/`textarea`: `shadow-xs` (barely visible in light, invisible on dark bg).
- `switch`: small (`h-[1.15rem]`), correct for high-density, fine.

**Docs chrome (Starlight):** active sidebar item renders a **saturated purple** — this is the "AI Purple/Blue" aesthetic flagged by **every single** skill loaded. Not ui26's tokens, but it's what a user sees when they load the docs.

**Icons:** registry itself ships none. Good (deferred to consumers).

---

## 2. AI-tells scorecard

Scored only the tells each skill makes explicit. ✓ = ui26 already passes, ✗ = fails, – = n/a.

| Tell | Skill | Score | Note |
|---|---|---|---|
| Inter font | design-taste, taste-design, minimalist | ✗ | inherited from Starlight default |
| Pure black (`#000`) background | design-taste, minimalist | ✓ | dark bg is `oklch(0.145 0 0)` — technically off-black, but chroma 0 makes it read as pure neutral |
| AI purple/blue gradient | design-taste, taste-design, redesign | ✗ | Starlight default sidebar selection |
| Oversaturated accent (>80%) | design-taste, taste-design | ✗ | destructive at chroma 0.245 is ~80%+ in light mode |
| Neon glow / outer glow | design-taste | ✓ | none present |
| 3-column equal card grid | design-taste, redesign | ✗ | docs Card page uses exactly this |
| Emoji in markup | design-taste, minimalist | ✓ | none found in registry |
| Generic `shadcn/ui` unchanged | design-taste | ✗ | tokens are verbatim shadcn defaults |
| Black shadows at low opacity (vs tinted) | redesign, minimalist | ✗ | all shadows uncoloured |
| Same radius everywhere | redesign | ✗ | single `--radius` var |
| Lucide/Feather exclusive | redesign | – | no icon lib chosen yet |
| `h-screen` (vs `min-h-[100dvh]`) | design-taste | ✓ | grep clean |
| `top/left/width/height` animation | design-taste | ✓ | grep clean |
| Generic names ("John Doe") | design-taste, minimalist | ✓ | docs copy is clean |
| AI copy clichés ("Elevate", etc.) | design-taste, minimalist | ✓ | clean |
| No `:active` feedback | redesign | ✓ | button has `active:translate-y-px` |
| No focus ring | redesign | ✓ | all interactives have `ring-[3px]` on `focus-visible` |
| Centered symmetric hero | design-taste, taste-design | – | no hero yet; `index.mdx` uses Starlight template |

**Score: 8 fails / 9 passes.** The fails cluster on palette, type, and the one generic docs layout. The wrappers themselves are already doing most of the micro-interaction work right.

---

## 3. Tensions between skills (how I resolved)

These skills disagree on several axes. tix wins every tiebreak because it's the named aesthetic source.

| Axis | design-taste-frontend | minimalist-ui | tix | Resolution |
|---|---|---|---|---|
| Motion | "Perpetual micro-interactions" (pulse, typewriter, float in every card) | slow 600ms fade-in, ambient gradient | sub-200ms entrances + Motion (`LayoutGroup`, `AnimatePresence`, staggered CSS rows); no overshoot springs | **tix.** Use Motion (MIT, OSS) for layout/presence; keep durations short and easing `cubic-bezier(0.16, 1, 0.3, 1)`. |
| Headings | `text-4xl md:text-6xl tracking-tighter` | editorial serif (Lyon/Newsreader) | `text-2xl font-bold` system-sans | **tix.** System-ish sans, modest scale. |
| Radii | aggressive `rounded-[2.5rem]` on cards | `8-12px` | `--radius: 10px` base | **tix.** But *vary* it: tighter inner (6-8px) / softer outer (12-14px). |
| Background | neutral `#f9fafb` or warm bone `#F7F6F3` | warm bone `#FBFBFA` | `oklch(1 0 0)` pure | **warm off-white.** Moving `--background` to `oklch(0.995 0.002 80)`. |
| Accent | "one accent, saturation <80%" | pastel spots only | none (monochrome + semantic status colors as icons only) | **tix + pragmatism.** No global "brand" accent. But override Starlight's purple to neutral. |
| Glassmorphism / noise / grain | yes (at motion-intensity >5) | subtle yes | no | **tix.** Skip. |

---

## 4. Fix priority (executed in spike)

Using `redesign-existing-projects`'s priority ladder, applied in order:

1. **Font swap** — add Geist Sans + Geist Mono via Google Fonts, set on `<html>`. Biggest instant win. Tailwind defaults keep working via `font-sans`/`font-mono`.
2. **Palette cleanup** — warm the neutrals (chroma 0 → 0.003 at hue 80), nudge foreground off pure black, use tinted borders.
3. **Shadows** — recolor to warm-tinted (`rgb(50 30 5 / 0.04)` instead of uncoloured low-opacity black).
4. **Radii variety** — keep `--radius` at 10px but use it on containers; bump inner elements (inputs, buttons) to 8px (`--radius - 2`) and cards to 14px (`--radius + 4`) via already-present calc vars.
5. **Starlight accent override** — replace default purple with a restrained zinc-based accent so the docs shell stops shouting AI-purple.
6. **Active feedback audit** — button already has `translate-y-px`. Add same to badge default (when interactive). Leave checkbox/switch (no click-travel room).
7. **`text-wrap: balance` on headings** — tiny CSS, no risk.
8. **Docs Card demo layout** — the 3-column grid is in `components/card.mdx`. Out of scope for this pass (it's content, not tokens), but flagged.

---

## 5. Not done (out of scope / rejected)

- **No bento, no perpetual motion, no glassmorphism, no editorial serif, no kinetic typography.** These fight the tix brief.
- **No global brand accent color.** tix's model is "monochrome + semantic status icons only". Adopting a brand CTA color now would prematurely lock that in.
- **No changes to framework-specific wrappers.** All edits live in `apps/docs/registry/` (tokens + `.tv.ts` configs) and `apps/docs/src/styles/global.css` (font-face, heading utilities, Starlight overrides). Emitted registry entries are self-contained.
- **Empty / loading / error states** — these are component API concerns, not visual-token concerns. Tracked for a later wave.
- **3-column `card.mdx` demo** — content-side, separate PR.

---

## 6. What changed

See diff on `spike/taste-audit`. Summary:

- `apps/docs/registry/tokens.css` — warm neutral palette, tinted borders, tinted shadow tokens, radius-aware vars.
- `apps/docs/src/styles/global.css` — Geist Sans / Geist Mono import; `font-family` + `font-feature-settings: "ss01"` on root; `text-wrap: balance` on `h1-h4`; Starlight accent override.
- `apps/docs/registry/button/button.tv.ts` — softened destructive ring in light (`/20` wash), held active feedback.
- `apps/docs/registry/card/card.tv.ts` — radius bumped to `rounded-xl` (outer), softer tinted shadow via new token.
- `apps/docs/registry/input/input.tv.ts` — `shadow-xs` → tinted shadow; radius held.
- `apps/docs/registry/badge/badge.tv.ts` — `transition-colors` added for hover compositing.

Before/after screenshots: `.spike-screenshots/` (gitignored, referenced from audit only).

---

## 7. Resolutions & open questions

Resolved with Winston 2026-04-22:

- **Fonts: Geist + Geist Mono.** OFL-licensed (SIL Open Font License), hostable anywhere. SF Pro rejected (Apple license). ✓
- **Motion library: `motion` (framer-motion).** MIT, OSS, already the choice in tix. Reserved for `LayoutGroup`/`AnimatePresence`/staggered entrances when composite primitives land in Wave 3. Not needed for Wave-1 primitives.
- **Brand color: yes, eventually.** Not this wave. Current near-black primary is the placeholder until marketing surfaces need their own voice.

Still open:

- Should the docs site get its own aesthetic layer (denser, more editorial) separate from what the registry emits to consumers? — undecided.
