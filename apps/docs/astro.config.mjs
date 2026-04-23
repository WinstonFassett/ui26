// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'ui26',
        head: [
            // Inline the critical design tokens + Starlight mapping so the browser
            // never paints Starlight's cold defaults before our external CSS loads.
            // Token values here must stay in sync with registry/tokens.css.
            // Only the vars needed to eliminate visible flash are included.
            { tag: 'style', content: `
                :root{
                    --background:oklch(0.985 0.003 65);
                    --card:oklch(1 0 0);
                    --foreground:oklch(0.17 0.008 65);
                    --border:oklch(0.9 0.008 65);
                }
                [data-theme="dark"]{
                    --background:oklch(0.17 0.006 65);
                    --card:oklch(0.2 0.006 65);
                    --foreground:oklch(0.97 0.004 65);
                    --border:oklch(0.3 0.008 65);
                }
                :root,[data-theme="light"]{
                    --sl-color-bg:var(--background);
                    --sl-color-bg-nav:var(--card);
                    --sl-color-bg-sidebar:var(--background);
                    --sl-color-text:var(--foreground);
                    --sl-color-hairline:var(--border);
                }
                [data-theme="dark"]{
                    --sl-color-bg:var(--background);
                    --sl-color-bg-nav:var(--card);
                    --sl-color-bg-sidebar:var(--background);
                    --sl-color-text:var(--foreground);
                    --sl-color-hairline:var(--border);
                }
            ` },
            { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
            { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
            { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap' } },
        ],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
        sidebar: [
            {
                label: 'Components',
                autogenerate: { directory: 'components' },
            },
            {
                label: 'Reference',
                autogenerate: { directory: 'reference' },
            },
            {
                label: 'Guides',
                items: [
                    { label: 'Example Guide', slug: 'guides/example' },
                ],
            },
        ],
        customCss: ['./src/styles/global.css'],
        }), react(), svelte()],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@registry': fileURLToPath(new URL('./registry', import.meta.url)),
            },
        },
    },
});
