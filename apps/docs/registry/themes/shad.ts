import type { Theme } from '../themes';

// Zinc-neutral palette keyed by OKLCH lightness tier. Matches the shadcn
// default palette. Exposing it lets callers read "what's shad's zinc-500?"
// without parsing CSS.
const palette = {
  white:   'oklch(1 0 0)',
  black:   'oklch(0 0 0)',
  zinc50:  'oklch(0.985 0 0)',
  zinc100: 'oklch(0.97 0 0)',
  zinc200: 'oklch(0.955 0 0)',
  zinc300: 'oklch(0.922 0 0)',
  zinc500: 'oklch(0.708 0 0)',
  zinc600: 'oklch(0.556 0 0)',
  zinc700: 'oklch(0.5 0 0)',
  zinc750: 'oklch(0.269 0 0)',
  zinc800: 'oklch(0.205 0 0)',
  zinc900: 'oklch(0.145 0 0)',

  red:       { light: 'oklch(0.577 0.245 27.325)', dark: 'oklch(0.704 0.191 22.216)' },
  success:   { light: 'oklch(0.6 0.15 145)',       dark: 'oklch(0.75 0.13 150)' },
  warn:      { light: 'oklch(0.65 0.15 70)',       dark: 'oklch(0.78 0.14 80)' },
  info:      { light: 'oklch(0.55 0.17 240)',      dark: 'oklch(0.7 0.14 240)' },
  purple:    { light: 'oklch(0.55 0.2 300)',       dark: 'oklch(0.68 0.17 300)' },

  borderAlpha:     'oklch(1 0 0 / 0.1)',
  borderAlphaSoft: 'oklch(1 0 0 / 0.05)',
  inputAlpha:      'oklch(1 0 0 / 0.15)',
  accentSoft:      'oklch(0.97 0 0 / 0.6)',
  accentSoftDark:  'oklch(0.269 0 0 / 0.6)',
} as const;

const shad: Theme = {
  name: 'shad',
  label: 'Shad',
  description:
    'Shadcn-default reference. Zinc neutrals, moderate radius, system sans, subtle lift shadows. The familiar shadcn feel.',
  palette,
  tokens: {
    'font-sans': 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    'font-serif': 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
    'font-mono': 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", monospace',

    background:          { light: palette.white,   dark: palette.zinc900 },
    foreground:          { light: palette.zinc900, dark: palette.zinc50 },
    card:                { light: palette.white,   dark: palette.zinc800 },
    'card-foreground':   { light: palette.zinc900, dark: palette.zinc50 },
    popover:             { light: palette.white,   dark: palette.zinc800 },
    'popover-foreground':{ light: palette.zinc900, dark: palette.zinc50 },

    primary:             { light: palette.zinc800, dark: palette.zinc300 },
    'primary-foreground':{ light: palette.zinc50,  dark: palette.zinc800 },
    secondary:           { light: palette.zinc100, dark: palette.zinc750 },
    'secondary-foreground': { light: palette.zinc800, dark: palette.zinc50 },
    muted:               { light: palette.zinc100, dark: palette.zinc750 },
    'muted-foreground':  { light: palette.zinc600, dark: palette.zinc500 },
    accent:              { light: palette.zinc100, dark: palette.zinc750 },
    'accent-foreground': { light: palette.zinc800, dark: palette.zinc50 },

    destructive:         palette.red,
    'destructive-foreground': palette.zinc50,

    border:              { light: palette.zinc300, dark: palette.borderAlpha },
    'border-soft':       { light: palette.zinc200, dark: palette.borderAlphaSoft },
    input:               { light: palette.zinc300, dark: palette.inputAlpha },
    ring:                { light: palette.zinc500, dark: palette.zinc600 },

    radius: '0.5rem',

    success: palette.success,
    warn:    palette.warn,
    info:    palette.info,
    purple:  palette.purple,

    'accent-ink':  { light: palette.zinc800, dark: palette.zinc50 },
    'accent-soft': { light: palette.accentSoft, dark: palette.accentSoftDark },

    'text-mute': { light: 'oklch(0.7 0 0)', dark: palette.zinc700 },
    code:        { light: palette.zinc100, dark: palette.zinc800 },

    'shadow-color': '0 0 0',
    'shadow-xs': { light: '0 1px 2px 0 rgb(var(--shadow-color) / 0.05)', dark: '0 1px 2px 0 rgb(var(--shadow-color) / 0.4)' },
    'shadow-sm': { light: '0 1px 3px 0 rgb(var(--shadow-color) / 0.1), 0 1px 2px -1px rgb(var(--shadow-color) / 0.1)', dark: '0 1px 3px 0 rgb(var(--shadow-color) / 0.5), 0 1px 2px -1px rgb(var(--shadow-color) / 0.4)' },
    'shadow-md': { light: '0 4px 6px -1px rgb(var(--shadow-color) / 0.1), 0 2px 4px -2px rgb(var(--shadow-color) / 0.1)', dark: '0 4px 6px -1px rgb(var(--shadow-color) / 0.5), 0 2px 4px -2px rgb(var(--shadow-color) / 0.4)' },
    'shadow-lg': { light: '0 10px 15px -3px rgb(var(--shadow-color) / 0.1), 0 4px 6px -4px rgb(var(--shadow-color) / 0.1)', dark: '0 10px 15px -3px rgb(var(--shadow-color) / 0.55), 0 4px 6px -4px rgb(var(--shadow-color) / 0.45)' },
    'highlight-inset': { light: 'inset 0 1px 0 rgb(255 255 255 / 0.1)', dark: 'inset 0 1px 0 rgb(255 255 255 / 0.04)' },
  },
};

export default shad;
