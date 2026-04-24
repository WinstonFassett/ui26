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

    background: 'oklch(0.995 0.002 280)',
    foreground: 'oklch(0.18 0.015 280)',
    card: 'oklch(1 0 0)',
    'card-foreground': 'oklch(0.18 0.015 280)',
    popover: 'oklch(1 0 0)',
    'popover-foreground': 'oklch(0.18 0.015 280)',

    primary: 'oklch(0.55 0.22 285)',
    'primary-foreground': 'oklch(0.99 0.005 285)',
    secondary: 'oklch(0.96 0.005 280)',
    'secondary-foreground': 'oklch(0.25 0.015 280)',
    muted: 'oklch(0.97 0.004 280)',
    'muted-foreground': 'oklch(0.52 0.015 280)',
    accent: 'oklch(0.55 0.22 285)',
    'accent-foreground': 'oklch(0.99 0.005 285)',

    destructive: 'oklch(0.6 0.2 25)',
    'destructive-foreground': 'oklch(0.99 0 0)',

    border: 'oklch(0.93 0.006 280)',
    'border-soft': 'oklch(0.96 0.004 280)',
    input: 'oklch(0.92 0.006 280)',
    ring: 'oklch(0.55 0.22 285)',

    radius: '0.375rem',

    success: 'oklch(0.62 0.16 150)',
    warn: 'oklch(0.7 0.16 75)',
    info: 'oklch(0.6 0.18 240)',
    purple: 'oklch(0.55 0.22 285)',

    'accent-ink': 'oklch(0.99 0.005 285)',
    'accent-soft': 'oklch(0.55 0.22 285 / 0.1)',

    'text-mute': 'oklch(0.65 0.012 280)',
    code: 'oklch(0.97 0.004 280)',

    'shadow-color': '20 10 40',
    'shadow-xs': '0 1px 1px rgb(var(--shadow-color) / 0.04)',
    'shadow-sm': '0 1px 2px rgb(var(--shadow-color) / 0.05)',
    'shadow-md': '0 2px 6px -1px rgb(var(--shadow-color) / 0.06)',
    'shadow-lg': '0 8px 20px -4px rgb(var(--shadow-color) / 0.08)',
    'highlight-inset': 'none',
  },
  dark: {
    background: 'oklch(0.13 0.015 280)',
    foreground: 'oklch(0.97 0.005 280)',
    card: 'oklch(0.17 0.018 280)',
    'card-foreground': 'oklch(0.97 0.005 280)',
    popover: 'oklch(0.17 0.018 280)',
    'popover-foreground': 'oklch(0.97 0.005 280)',

    primary: 'oklch(0.68 0.2 285)',
    'primary-foreground': 'oklch(0.13 0.015 280)',
    secondary: 'oklch(0.22 0.018 280)',
    'secondary-foreground': 'oklch(0.97 0.005 280)',
    muted: 'oklch(0.2 0.018 280)',
    'muted-foreground': 'oklch(0.68 0.015 280)',
    accent: 'oklch(0.68 0.2 285)',
    'accent-foreground': 'oklch(0.13 0.015 280)',

    destructive: 'oklch(0.68 0.2 25)',
    'destructive-foreground': 'oklch(0.99 0 0)',

    border: 'oklch(0.25 0.018 280)',
    'border-soft': 'oklch(0.2 0.018 280)',
    input: 'oklch(0.27 0.018 280)',
    ring: 'oklch(0.68 0.2 285)',

    success: 'oklch(0.75 0.14 150)',
    warn: 'oklch(0.78 0.14 75)',
    info: 'oklch(0.7 0.15 240)',
    purple: 'oklch(0.7 0.2 285)',

    'accent-ink': 'oklch(0.13 0.015 280)',
    'accent-soft': 'oklch(0.68 0.2 285 / 0.18)',

    'text-mute': 'oklch(0.48 0.015 280)',
    code: 'oklch(0.18 0.018 280)',

    'shadow-color': '0 0 0',
    'shadow-xs': '0 1px 2px rgb(var(--shadow-color) / 0.3)',
    'shadow-sm': '0 1px 3px rgb(var(--shadow-color) / 0.35)',
    'shadow-md': '0 3px 8px -2px rgb(var(--shadow-color) / 0.4)',
    'shadow-lg': '0 10px 24px -6px rgb(var(--shadow-color) / 0.5)',
    'highlight-inset': 'inset 0 1px 0 rgb(255 255 255 / 0.05)',
  },
};

export default linear;
