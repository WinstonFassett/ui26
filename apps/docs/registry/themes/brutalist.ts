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

    background:          { light: '#ffffff', dark: '#000000' },
    foreground:          { light: '#000000', dark: '#ffffff' },
    card:                { light: '#ffffff', dark: '#000000' },
    'card-foreground':   { light: '#000000', dark: '#ffffff' },
    popover:             { light: '#ffffff', dark: '#000000' },
    'popover-foreground':{ light: '#000000', dark: '#ffffff' },

    primary:             { light: '#000000', dark: '#ffff00' },
    'primary-foreground':{ light: '#ffff00', dark: '#000000' },
    secondary:           { light: '#ffff00', dark: '#ff3b00' },
    'secondary-foreground': { light: '#000000', dark: '#ffffff' },
    muted:               { light: '#f0f0f0', dark: '#1a1a1a' },
    'muted-foreground':  { light: '#000000', dark: '#ffffff' },
    accent:              { light: '#ff3b00', dark: '#00ff00' },
    'accent-foreground': { light: '#ffffff', dark: '#000000' },

    destructive:         { light: '#ff0000', dark: '#ff0044' },
    'destructive-foreground': '#ffffff',

    border:              { light: '#000000', dark: '#ffffff' },
    'border-soft':       { light: '#000000', dark: '#ffffff' },
    input:               { light: '#000000', dark: '#ffffff' },
    ring:                { light: '#ff3b00', dark: '#00ff00' },

    radius: '0rem',

    success: { light: '#00a000', dark: '#00ff00' },
    warn:    { light: '#ff8800', dark: '#ffaa00' },
    info:    { light: '#0000ff', dark: '#00ffff' },
    purple:  { light: '#8800ff', dark: '#ff00ff' },

    'accent-ink':  { light: '#000000', dark: '#ffffff' },
    'accent-soft': { light: '#ffff00', dark: '#ff3b00' },

    'text-mute': { light: '#666666', dark: '#888888' },
    code:        { light: '#f0f0f0', dark: '#1a1a1a' },

    'shadow-color': { light: '0 0 0', dark: '255 255 255' },
    'shadow-xs': 'none',
    'shadow-sm': 'none',
    'shadow-md': '4px 4px 0 0 rgb(var(--shadow-color) / 1)',
    'shadow-lg': '6px 6px 0 0 rgb(var(--shadow-color) / 1)',
    'highlight-inset': 'none',
  },
};

export default brutalist;
