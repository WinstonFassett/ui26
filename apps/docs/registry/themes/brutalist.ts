import type { Theme } from '../themes';

// Saturated atoms + a mono-invert pair. The signature move is the paper/ink
// flip (white→black surfaces, black→white text) layered under saturated
// yellow/orange/green/red "shout" colors. Keep both: atoms for the shouts,
// paper/ink for the structural flip.
const palette = {
  white:     '#ffffff',
  black:     '#000000',
  yellow:    '#ffff00',
  orange:    '#ff3b00',
  red:       '#ff0000',
  crimson:   '#ff0044',
  green:     '#00ff00',
  greenDeep: '#00a000',

  paper:     { light: '#ffffff', dark: '#000000' },
  ink:       { light: '#000000', dark: '#ffffff' },

  concrete:  { light: '#f0f0f0', dark: '#1a1a1a' },
  textMute:  { light: '#666666', dark: '#888888' },

  warn:      { light: '#ff8800', dark: '#ffaa00' },
  info:      { light: '#0000ff', dark: '#00ffff' },
  purple:    { light: '#8800ff', dark: '#ff00ff' },
} as const;

const brutalist: Theme = {
  name: 'brutalist',
  label: 'Brutalist',
  description:
    'High-contrast, hard borders, zero radius, no shadows. Mono display, saturated destructive/accent. Ugly-on-purpose.',
  palette,
  tokens: {
    'font-sans': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    'font-serif': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    'font-mono': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

    background:          palette.paper,
    foreground:          palette.ink,
    card:                palette.paper,
    'card-foreground':   palette.ink,
    popover:             palette.paper,
    'popover-foreground':palette.ink,

    primary:             { light: palette.black,  dark: palette.yellow },
    'primary-foreground':{ light: palette.yellow, dark: palette.black },
    secondary:           { light: palette.yellow, dark: palette.orange },
    'secondary-foreground': palette.ink,
    muted:               palette.concrete,
    'muted-foreground':  palette.ink,
    accent:              { light: palette.orange, dark: palette.green },
    'accent-foreground': { light: palette.white,  dark: palette.black },

    destructive:         { light: palette.red,    dark: palette.crimson },
    'destructive-foreground': palette.white,

    border:              palette.ink,
    'border-soft':       palette.ink,
    input:               palette.ink,
    ring:                { light: palette.orange, dark: palette.green },

    radius: '0rem',

    success: { light: palette.greenDeep, dark: palette.green },
    warn:    palette.warn,
    info:    palette.info,
    purple:  palette.purple,

    'accent-ink':  palette.ink,
    'accent-soft': { light: palette.yellow, dark: palette.orange },

    'text-mute': palette.textMute,
    code:        palette.concrete,

    'shadow-color': { light: '0 0 0', dark: '255 255 255' },
    'shadow-xs': 'none',
    'shadow-sm': 'none',
    'shadow-md': '4px 4px 0 0 rgb(var(--shadow-color) / 1)',
    'shadow-lg': '6px 6px 0 0 rgb(var(--shadow-color) / 1)',
    'highlight-inset': 'none',
  },
};

export default brutalist;
