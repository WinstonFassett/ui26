import type { Theme } from '../themes';

const brutalist: Theme = {
  name: 'brutalist',
  label: 'Brutalist',
  description:
    'High-contrast, hard borders, zero radius, no shadows. Mono display, saturated destructive/accent. Ugly-on-purpose.',
  tokens: {
    'font-sans': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    'font-serif': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    'font-mono': '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

    background: '#ffffff',
    foreground: '#000000',
    card: '#ffffff',
    'card-foreground': '#000000',
    popover: '#ffffff',
    'popover-foreground': '#000000',

    primary: '#000000',
    'primary-foreground': '#ffff00',
    secondary: '#ffff00',
    'secondary-foreground': '#000000',
    muted: '#f0f0f0',
    'muted-foreground': '#000000',
    accent: '#ff3b00',
    'accent-foreground': '#ffffff',

    destructive: '#ff0000',
    'destructive-foreground': '#ffffff',

    border: '#000000',
    'border-soft': '#000000',
    input: '#000000',
    ring: '#ff3b00',

    radius: '0rem',

    success: '#00a000',
    warn: '#ff8800',
    info: '#0000ff',
    purple: '#8800ff',

    'accent-ink': '#000000',
    'accent-soft': '#ffff00',

    'text-mute': '#666666',
    code: '#f0f0f0',

    'shadow-color': '0 0 0',
    'shadow-xs': 'none',
    'shadow-sm': 'none',
    'shadow-md': '4px 4px 0 0 rgb(var(--shadow-color) / 1)',
    'shadow-lg': '6px 6px 0 0 rgb(var(--shadow-color) / 1)',
    'highlight-inset': 'none',
  },
  dark: {
    background: '#000000',
    foreground: '#ffffff',
    card: '#000000',
    'card-foreground': '#ffffff',
    popover: '#000000',
    'popover-foreground': '#ffffff',

    primary: '#ffff00',
    'primary-foreground': '#000000',
    secondary: '#ff3b00',
    'secondary-foreground': '#ffffff',
    muted: '#1a1a1a',
    'muted-foreground': '#ffffff',
    accent: '#00ff00',
    'accent-foreground': '#000000',

    destructive: '#ff0044',
    'destructive-foreground': '#ffffff',

    border: '#ffffff',
    'border-soft': '#ffffff',
    input: '#ffffff',
    ring: '#00ff00',

    success: '#00ff00',
    warn: '#ffaa00',
    info: '#00ffff',
    purple: '#ff00ff',

    'accent-ink': '#ffffff',
    'accent-soft': '#ff3b00',

    'text-mute': '#888888',
    code: '#1a1a1a',

    'shadow-color': '255 255 255',
  },
};

export default brutalist;
