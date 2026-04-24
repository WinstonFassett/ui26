import type { Theme } from '../themes';

// Named palette — the vocabulary this theme speaks. Each entry is either
// mode-invariant (plain string) or a { light, dark } pair. Tokens below
// reference these by identity so structural choices read semantically
// ("primary IS ink, accent IS gold") rather than as duplicated hex values.
const palette = {
  paper:   { light: '#f6f5f1', dark: '#0e0e0f' },
  ink:     { light: '#15130f', dark: '#ececec' },
  card:    { light: '#ffffff', dark: '#141416' },
  rule:    { light: '#e3e0d8', dark: '#262628' },
  ruleSoft:{ light: '#ecebe4', dark: '#1e1e20' },
  sage:    { light: '#ecebe4', dark: '#262628' }, // secondary surface
  sageDeep:{ light: '#ecebe4', dark: '#1a1a1c' }, // muted surface (diverges in dark)
  mute:    { light: '#6a665d', dark: '#8a8a90' },
  textMute:{ light: '#a09b91', dark: '#56565c' },
  rust:    { light: '#9f4a4a', dark: '#b54a4a' },
  gold:    '#e6d089',
  goldSoft:{ light: 'rgba(230, 208, 137, 0.35)', dark: 'rgba(230, 208, 137, 0.14)' },
  codeBg:  { light: '#faf9f6', dark: '#1a1a1c' },
  success: { light: '#2f7a3a', dark: '#8fd1a3' },
  warn:    { light: '#a35a00', dark: '#e6b86a' },
  info:    { light: '#1f5ab8', dark: '#8fb9d6' },
  purple:  { light: '#6a3fb5', dark: '#b89dd8' },
} as const;

const editorial: Theme = {
  name: 'editorial',
  label: 'Editorial',
  description:
    'Default. Serif display (Newsreader) + Geist, warm off-white, gold accent, no shadows (1px rules + background tiers).',
  palette,
  tokens: {
    'font-sans': '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    'font-serif': '"Newsreader", "Iowan Old Style", Georgia, serif',
    'font-mono': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

    background:          palette.paper,
    foreground:          palette.ink,
    card:                palette.card,
    'card-foreground':   palette.ink,
    popover:             palette.card,
    'popover-foreground': palette.ink,

    primary:             { light: palette.ink.light, dark: palette.gold },
    'primary-foreground': { light: palette.gold, dark: palette.ink.light },
    secondary:           palette.sage,
    'secondary-foreground': palette.ink,
    muted:               palette.sageDeep,
    'muted-foreground':  palette.mute,
    accent:              palette.gold,
    'accent-foreground': palette.ink.light,

    destructive:         palette.rust,
    'destructive-foreground': palette.paper,

    border:              palette.rule,
    'border-soft':       palette.ruleSoft,
    input:               palette.rule,
    ring:                { light: palette.ink.light, dark: palette.gold },

    radius: '0.25rem',

    success: palette.success,
    warn:    palette.warn,
    info:    palette.info,
    purple:  palette.purple,

    'accent-ink':  palette.ink.light,
    'accent-soft': palette.goldSoft,

    'text-mute': palette.textMute,
    code:        palette.codeBg,

    // Editorial carries no shadows — hierarchy is 1px rules + background tiers.
    'shadow-color':   '0 0 0',
    'shadow-xs':      'none',
    'shadow-sm':      'none',
    'shadow-md':      'none',
    'shadow-lg':      'none',
    'highlight-inset':'none',
  },
};

export default editorial;
