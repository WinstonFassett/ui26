import type { Theme } from '../themes';

const linear: Theme = {
  name: 'linear',
  label: 'Linear',
  description:
    'Linear-inspired. Tight density, violet accent, minimal borders, crisp small radius. Inter Display as display face.',
  tokens: {
    'font-sans': '"Inter Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    'font-serif': '"Inter Display", "Inter", ui-serif, Georgia, serif',
    'font-mono': '"Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

    background:          { light: 'oklch(0.995 0.002 280)', dark: 'oklch(0.13 0.015 280)' },
    foreground:          { light: 'oklch(0.18 0.015 280)',  dark: 'oklch(0.97 0.005 280)' },
    card:                { light: 'oklch(1 0 0)',           dark: 'oklch(0.17 0.018 280)' },
    'card-foreground':   { light: 'oklch(0.18 0.015 280)',  dark: 'oklch(0.97 0.005 280)' },
    popover:             { light: 'oklch(1 0 0)',           dark: 'oklch(0.17 0.018 280)' },
    'popover-foreground':{ light: 'oklch(0.18 0.015 280)',  dark: 'oklch(0.97 0.005 280)' },

    primary:             { light: 'oklch(0.55 0.22 285)', dark: 'oklch(0.68 0.2 285)' },
    'primary-foreground':{ light: 'oklch(0.99 0.005 285)', dark: 'oklch(0.13 0.015 280)' },
    secondary:           { light: 'oklch(0.96 0.005 280)', dark: 'oklch(0.22 0.018 280)' },
    'secondary-foreground': { light: 'oklch(0.25 0.015 280)', dark: 'oklch(0.97 0.005 280)' },
    muted:               { light: 'oklch(0.97 0.004 280)', dark: 'oklch(0.2 0.018 280)' },
    'muted-foreground':  { light: 'oklch(0.52 0.015 280)', dark: 'oklch(0.68 0.015 280)' },
    accent:              { light: 'oklch(0.55 0.22 285)', dark: 'oklch(0.68 0.2 285)' },
    'accent-foreground': { light: 'oklch(0.99 0.005 285)', dark: 'oklch(0.13 0.015 280)' },

    destructive:         { light: 'oklch(0.6 0.2 25)', dark: 'oklch(0.68 0.2 25)' },
    'destructive-foreground': 'oklch(0.99 0 0)',

    border:              { light: 'oklch(0.93 0.006 280)', dark: 'oklch(0.25 0.018 280)' },
    'border-soft':       { light: 'oklch(0.96 0.004 280)', dark: 'oklch(0.2 0.018 280)' },
    input:               { light: 'oklch(0.92 0.006 280)', dark: 'oklch(0.27 0.018 280)' },
    ring:                { light: 'oklch(0.55 0.22 285)', dark: 'oklch(0.68 0.2 285)' },

    radius: '0.375rem',

    success: { light: 'oklch(0.62 0.16 150)', dark: 'oklch(0.75 0.14 150)' },
    warn:    { light: 'oklch(0.7 0.16 75)',   dark: 'oklch(0.78 0.14 75)' },
    info:    { light: 'oklch(0.6 0.18 240)',  dark: 'oklch(0.7 0.15 240)' },
    purple:  { light: 'oklch(0.55 0.22 285)', dark: 'oklch(0.7 0.2 285)' },

    'accent-ink':  { light: 'oklch(0.99 0.005 285)', dark: 'oklch(0.13 0.015 280)' },
    'accent-soft': { light: 'oklch(0.55 0.22 285 / 0.1)', dark: 'oklch(0.68 0.2 285 / 0.18)' },

    'text-mute': { light: 'oklch(0.65 0.012 280)', dark: 'oklch(0.48 0.015 280)' },
    code:        { light: 'oklch(0.97 0.004 280)', dark: 'oklch(0.18 0.018 280)' },

    'shadow-color': { light: '20 10 40', dark: '0 0 0' },
    'shadow-xs': { light: '0 1px 1px rgb(var(--shadow-color) / 0.04)', dark: '0 1px 2px rgb(var(--shadow-color) / 0.3)' },
    'shadow-sm': { light: '0 1px 2px rgb(var(--shadow-color) / 0.05)', dark: '0 1px 3px rgb(var(--shadow-color) / 0.35)' },
    'shadow-md': { light: '0 2px 6px -1px rgb(var(--shadow-color) / 0.06)', dark: '0 3px 8px -2px rgb(var(--shadow-color) / 0.4)' },
    'shadow-lg': { light: '0 8px 20px -4px rgb(var(--shadow-color) / 0.08)', dark: '0 10px 24px -6px rgb(var(--shadow-color) / 0.5)' },
    'highlight-inset': { light: 'none', dark: 'inset 0 1px 0 rgb(255 255 255 / 0.05)' },
  },
};

export default linear;
