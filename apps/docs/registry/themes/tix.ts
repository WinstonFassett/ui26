import type { Theme } from '../themes';

const tix: Theme = {
  name: 'tix',
  label: 'Tix',
  description:
    'Warm OKLCH monochrome (originally "vanilla"). Toned-down sibling of editorial. Geist only. Tinted shadows, crisper borders, muted destructive.',
  tokens: {
    'font-sans': '"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    'font-serif': 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
    'font-mono': '"Geist Mono", ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", monospace',

    background:          { light: 'oklch(0.985 0.003 65)', dark: 'oklch(0.17 0.006 65)' },
    foreground:          { light: 'oklch(0.17 0.008 65)',  dark: 'oklch(0.97 0.004 65)' },
    card:                { light: 'oklch(1 0 0)',          dark: 'oklch(0.2 0.006 65)' },
    'card-foreground':   { light: 'oklch(0.17 0.008 65)',  dark: 'oklch(0.97 0.004 65)' },
    popover:             { light: 'oklch(1 0 0)',          dark: 'oklch(0.2 0.006 65)' },
    'popover-foreground':{ light: 'oklch(0.17 0.008 65)',  dark: 'oklch(0.97 0.004 65)' },

    primary:             { light: 'oklch(0.2 0.01 65)',    dark: 'oklch(0.97 0.004 65)' },
    'primary-foreground':{ light: 'oklch(0.99 0.003 65)',  dark: 'oklch(0.2 0.01 65)' },
    secondary:           { light: 'oklch(0.955 0.006 65)', dark: 'oklch(0.26 0.007 65)' },
    'secondary-foreground': { light: 'oklch(0.2 0.01 65)', dark: 'oklch(0.97 0.004 65)' },
    muted:               { light: 'oklch(0.955 0.006 65)', dark: 'oklch(0.26 0.007 65)' },
    'muted-foreground':  { light: 'oklch(0.5 0.01 65)',    dark: 'oklch(0.68 0.01 65)' },
    accent:              { light: 'oklch(0.945 0.008 65)', dark: 'oklch(0.28 0.008 65)' },
    'accent-foreground': { light: 'oklch(0.2 0.01 65)',    dark: 'oklch(0.97 0.004 65)' },

    destructive:         { light: 'oklch(0.55 0.16 28)',   dark: 'oklch(0.62 0.17 26)' },
    'destructive-foreground': 'oklch(0.99 0.003 65)',

    border:              { light: 'oklch(0.9 0.008 65)',   dark: 'oklch(0.3 0.008 65)' },
    input:               { light: 'oklch(0.89 0.008 65)',  dark: 'oklch(0.3 0.008 65)' },
    ring:                { light: 'oklch(0.45 0.015 65)',  dark: 'oklch(0.58 0.015 65)' },

    radius: '0.25rem',

    success: { light: 'oklch(0.55 0.15 145)', dark: 'oklch(0.78 0.12 150)' },
    warn:    { light: 'oklch(0.55 0.15 55)',  dark: 'oklch(0.78 0.12 80)' },
    info:    { light: 'oklch(0.48 0.18 255)', dark: 'oklch(0.72 0.1 240)' },
    purple:  { light: 'oklch(0.48 0.2 290)',  dark: 'oklch(0.68 0.14 300)' },

    'accent-ink':  'oklch(0.17 0.008 65)',
    'accent-soft': { light: 'oklch(0.95 0.04 85 / 0.35)', dark: 'oklch(0.95 0.04 85 / 0.14)' },

    'text-mute': { light: 'oklch(0.66 0.012 65)', dark: 'oklch(0.45 0.01 65)' },
    code:        { light: 'oklch(0.99 0.002 80)', dark: 'oklch(0.22 0.005 65)' },

    'shadow-color': { light: '30 20 5', dark: '0 0 0' },
    'shadow-xs': { light: '0 1px 1px rgb(var(--shadow-color) / 0.04)', dark: '0 1px 2px rgb(var(--shadow-color) / 0.3)' },
    'shadow-sm': { light: '0 1px 2px rgb(var(--shadow-color) / 0.05), 0 1px 1px rgb(var(--shadow-color) / 0.03)', dark: '0 1px 2px rgb(var(--shadow-color) / 0.35), 0 1px 1px rgb(var(--shadow-color) / 0.2)' },
    'shadow-md': { light: '0 4px 10px -2px rgb(var(--shadow-color) / 0.06), 0 2px 4px rgb(var(--shadow-color) / 0.03)', dark: '0 4px 12px -2px rgb(var(--shadow-color) / 0.4), 0 2px 4px rgb(var(--shadow-color) / 0.22)' },
    'shadow-lg': { light: '0 10px 24px -6px rgb(var(--shadow-color) / 0.08), 0 4px 8px rgb(var(--shadow-color) / 0.04)', dark: '0 12px 28px -6px rgb(var(--shadow-color) / 0.45), 0 4px 8px rgb(var(--shadow-color) / 0.25)' },
    'highlight-inset': { light: 'inset 0 1px 0 rgb(255 255 255 / 0.08)', dark: 'inset 0 1px 0 rgb(255 255 255 / 0.06)' },
  },
};

export default tix;
