import type { Theme } from '../themes';

// Cool-neutral + violet accent, hue ~280 for neutrals and ~285 for the
// signature violet. The "violet" entry is the identity of the theme — primary,
// accent, and ring all collapse to it. Everything else is a role-based name.
const palette = {
  paper:      { light: 'oklch(0.995 0.002 280)', dark: 'oklch(0.13 0.015 280)' },
  ink:        { light: 'oklch(0.18 0.015 280)',  dark: 'oklch(0.97 0.005 280)' },
  surface:    { light: 'oklch(1 0 0)',           dark: 'oklch(0.17 0.018 280)' },

  violet:     { light: 'oklch(0.55 0.22 285)',   dark: 'oklch(0.68 0.2 285)' },
  violetInk:  { light: 'oklch(0.99 0.005 285)',  dark: 'oklch(0.13 0.015 280)' },
  violetSoft: { light: 'oklch(0.55 0.22 285 / 0.1)', dark: 'oklch(0.68 0.2 285 / 0.18)' },

  inkHeavy:   { light: 'oklch(0.25 0.015 280)',  dark: 'oklch(0.97 0.005 280)' },
  silt:       { light: 'oklch(0.96 0.005 280)',  dark: 'oklch(0.22 0.018 280)' },
  siltMuted:  { light: 'oklch(0.97 0.004 280)',  dark: 'oklch(0.2 0.018 280)' },
  mute:       { light: 'oklch(0.52 0.015 280)',  dark: 'oklch(0.68 0.015 280)' },
  textMute:   { light: 'oklch(0.65 0.012 280)',  dark: 'oklch(0.48 0.015 280)' },
  rule:       { light: 'oklch(0.93 0.006 280)',  dark: 'oklch(0.25 0.018 280)' },
  ruleSoft:   { light: 'oklch(0.96 0.004 280)',  dark: 'oklch(0.2 0.018 280)' },
  field:      { light: 'oklch(0.92 0.006 280)',  dark: 'oklch(0.27 0.018 280)' },
  codeBg:     { light: 'oklch(0.97 0.004 280)',  dark: 'oklch(0.18 0.018 280)' },

  red:        { light: 'oklch(0.6 0.2 25)',      dark: 'oklch(0.68 0.2 25)' },
  success:    { light: 'oklch(0.62 0.16 150)',   dark: 'oklch(0.75 0.14 150)' },
  warn:       { light: 'oklch(0.7 0.16 75)',     dark: 'oklch(0.78 0.14 75)' },
  info:       { light: 'oklch(0.6 0.18 240)',    dark: 'oklch(0.7 0.15 240)' },
  purple:     { light: 'oklch(0.55 0.22 285)',   dark: 'oklch(0.7 0.2 285)' },

  white:      'oklch(0.99 0 0)',
} as const;

const linear: Theme = {
  name: 'linear',
  label: 'Linear',
  description:
    'Linear-inspired. Tight density, violet accent, minimal borders, crisp small radius. Inter Display as display face.',
  palette,
  tokens: {
    'font-sans': '"Inter Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    'font-serif': '"Inter Display", "Inter", ui-serif, Georgia, serif',
    'font-mono': '"Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

    background:          palette.paper,
    foreground:          palette.ink,
    card:                palette.surface,
    'card-foreground':   palette.ink,
    popover:             palette.surface,
    'popover-foreground':palette.ink,

    primary:             palette.violet,
    'primary-foreground':palette.violetInk,
    secondary:           palette.silt,
    'secondary-foreground': palette.inkHeavy,
    muted:               palette.siltMuted,
    'muted-foreground':  palette.mute,
    accent:              palette.violet,
    'accent-foreground': palette.violetInk,

    destructive:         palette.red,
    'destructive-foreground': palette.white,

    border:              palette.rule,
    'border-soft':       palette.ruleSoft,
    input:               palette.field,
    ring:                palette.violet,

    radius: '0.375rem',

    success: palette.success,
    warn:    palette.warn,
    info:    palette.info,
    purple:  palette.purple,

    'accent-ink':  palette.violetInk,
    'accent-soft': palette.violetSoft,

    'text-mute': palette.textMute,
    code:        palette.codeBg,

    'shadow-color': { light: '20 10 40', dark: '0 0 0' },
    'shadow-xs': { light: '0 1px 1px rgb(var(--shadow-color) / 0.04)', dark: '0 1px 2px rgb(var(--shadow-color) / 0.3)' },
    'shadow-sm': { light: '0 1px 2px rgb(var(--shadow-color) / 0.05)', dark: '0 1px 3px rgb(var(--shadow-color) / 0.35)' },
    'shadow-md': { light: '0 2px 6px -1px rgb(var(--shadow-color) / 0.06)', dark: '0 3px 8px -2px rgb(var(--shadow-color) / 0.4)' },
    'shadow-lg': { light: '0 8px 20px -4px rgb(var(--shadow-color) / 0.08)', dark: '0 10px 24px -6px rgb(var(--shadow-color) / 0.5)' },
    'highlight-inset': { light: 'none', dark: 'inset 0 1px 0 rgb(255 255 255 / 0.05)' },
  },
};

export default linear;
