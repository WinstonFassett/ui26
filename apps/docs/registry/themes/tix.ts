import type { Theme } from '../themes';

// Warm OKLCH monochrome, hue ~65. Role-based palette in the editorial vein
// (paper/ink/silt/rule) so tokens read semantically rather than as a wall of
// oklch literals. "Heavy/soft" suffixes mark ink variants that differ slightly
// in chroma from the plain-text ink.
const palette = {
  paper:      { light: 'oklch(0.985 0.003 65)', dark: 'oklch(0.17 0.006 65)' },
  ink:        { light: 'oklch(0.17 0.008 65)',  dark: 'oklch(0.97 0.004 65)' },
  surface:    { light: 'oklch(1 0 0)',           dark: 'oklch(0.2 0.006 65)' },
  inkHeavy:   { light: 'oklch(0.2 0.01 65)',     dark: 'oklch(0.97 0.004 65)' },
  inkSoft:    { light: 'oklch(0.99 0.003 65)',   dark: 'oklch(0.2 0.01 65)' },
  silt:       { light: 'oklch(0.955 0.006 65)',  dark: 'oklch(0.26 0.007 65)' },
  dune:       { light: 'oklch(0.945 0.008 65)',  dark: 'oklch(0.28 0.008 65)' },
  mute:       { light: 'oklch(0.5 0.01 65)',     dark: 'oklch(0.68 0.01 65)' },
  textMute:   { light: 'oklch(0.66 0.012 65)',   dark: 'oklch(0.45 0.01 65)' },
  rule:       { light: 'oklch(0.9 0.008 65)',    dark: 'oklch(0.3 0.008 65)' },
  field:      { light: 'oklch(0.89 0.008 65)',   dark: 'oklch(0.3 0.008 65)' },
  focusRing:  { light: 'oklch(0.45 0.015 65)',   dark: 'oklch(0.58 0.015 65)' },

  rust:       { light: 'oklch(0.55 0.16 28)',    dark: 'oklch(0.62 0.17 26)' },
  success:    { light: 'oklch(0.55 0.15 145)',   dark: 'oklch(0.78 0.12 150)' },
  warn:       { light: 'oklch(0.55 0.15 55)',    dark: 'oklch(0.78 0.12 80)' },
  info:       { light: 'oklch(0.48 0.18 255)',   dark: 'oklch(0.72 0.1 240)' },
  purple:     { light: 'oklch(0.48 0.2 290)',    dark: 'oklch(0.68 0.14 300)' },

  accentSoft: { light: 'oklch(0.95 0.04 85 / 0.35)', dark: 'oklch(0.95 0.04 85 / 0.14)' },
  codeBg:     { light: 'oklch(0.99 0.002 80)',   dark: 'oklch(0.22 0.005 65)' },
} as const;

const tix: Theme = {
  name: 'tix',
  label: 'Tix',
  description:
    'Warm OKLCH monochrome (originally "vanilla"). Toned-down sibling of editorial. Geist only. Tinted shadows, crisper borders, muted destructive.',
  palette,
  tokens: {
    'font-sans': '"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    'font-serif': 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
    'font-mono': '"Geist Mono", ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", monospace',

    background:          palette.paper,
    foreground:          palette.ink,
    card:                palette.surface,
    'card-foreground':   palette.ink,
    popover:             palette.surface,
    'popover-foreground':palette.ink,

    primary:             palette.inkHeavy,
    'primary-foreground':palette.inkSoft,
    secondary:           palette.silt,
    'secondary-foreground': palette.inkHeavy,
    muted:               palette.silt,
    'muted-foreground':  palette.mute,
    accent:              palette.dune,
    'accent-foreground': palette.inkHeavy,

    destructive:         palette.rust,
    'destructive-foreground': palette.inkSoft.light,

    border:              palette.rule,
    input:               palette.field,
    ring:                palette.focusRing,

    radius: '0.25rem',

    success: palette.success,
    warn:    palette.warn,
    info:    palette.info,
    purple:  palette.purple,

    'accent-ink':  palette.ink.light,
    'accent-soft': palette.accentSoft,

    'text-mute': palette.textMute,
    code:        palette.codeBg,

    'shadow-color': { light: '30 20 5', dark: '0 0 0' },
    'shadow-xs': { light: '0 1px 1px rgb(var(--shadow-color) / 0.04)', dark: '0 1px 2px rgb(var(--shadow-color) / 0.3)' },
    'shadow-sm': { light: '0 1px 2px rgb(var(--shadow-color) / 0.05), 0 1px 1px rgb(var(--shadow-color) / 0.03)', dark: '0 1px 2px rgb(var(--shadow-color) / 0.35), 0 1px 1px rgb(var(--shadow-color) / 0.2)' },
    'shadow-md': { light: '0 4px 10px -2px rgb(var(--shadow-color) / 0.06), 0 2px 4px rgb(var(--shadow-color) / 0.03)', dark: '0 4px 12px -2px rgb(var(--shadow-color) / 0.4), 0 2px 4px rgb(var(--shadow-color) / 0.22)' },
    'shadow-lg': { light: '0 10px 24px -6px rgb(var(--shadow-color) / 0.08), 0 4px 8px rgb(var(--shadow-color) / 0.04)', dark: '0 12px 28px -6px rgb(var(--shadow-color) / 0.45), 0 4px 8px rgb(var(--shadow-color) / 0.25)' },
    'highlight-inset': { light: 'inset 0 1px 0 rgb(255 255 255 / 0.08)', dark: 'inset 0 1px 0 rgb(255 255 255 / 0.06)' },
  },
};

export default tix;
