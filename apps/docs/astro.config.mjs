// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

// Always bake the canonical production URL into registry JSON's absolute deps,
// even on Netlify preview deploys — consumers install from one URL.
// Netlify sets URL to the main site URL on every deploy.
const site = process.env.SITE_URL || process.env.URL || undefined;

// https://astro.build/config
export default defineConfig({
    site,
    integrations: [starlight({
        title: 'ui26',
        components: {
            ThemeProvider: './src/components/starlight/ThemeProvider.astro',
            ThemeSelect: './src/components/starlight/ThemeSelect.astro',
        },
        head: [
            // Inline critical --sl-* vars so Starlight's chrome doesn't paint
            // cold defaults before external CSS loads. Editorial light is the
            // unconditional default; any *-dark suffix switches to dark chrome.
            // Full per-theme palette loads with tokens.css.
            { tag: 'style', content: `
                :root{
                    --sl-color-bg:#f6f5f1;
                    --sl-color-bg-nav:#f6f5f1;
                    --sl-color-bg-sidebar:#f6f5f1;
                    --sl-color-text:#15130f;
                    --sl-color-hairline:#e3e0d8;
                    --sl-color-accent:var(--accent);
                    --sl-color-text-accent:var(--accent);
                }
                [data-theme$="dark"]{
                    --sl-color-bg:#0e0e0f;
                    --sl-color-bg-nav:#0e0e0f;
                    --sl-color-bg-sidebar:#0e0e0f;
                    --sl-color-text:#ececec;
                    --sl-color-hairline:#262628;
                    --sl-color-accent:var(--accent);
                    --sl-color-text-accent:var(--accent);
                }
            ` },
            { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
            { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
            { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap' } },
        ],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
        sidebar: [
            {
                label: 'Components',
                autogenerate: { directory: 'components' },
            },
            {
                label: 'Reference',
                items: [
                    { label: 'Tokens', slug: 'reference/tokens' },
                    { label: 'Themes', slug: 'reference/themes' },
                    { label: 'Kitchen Sink', link: '/kitchen-sink' },
                ],
            },
            // {
            //     label: 'Guides',
            //     items: [
            //         { label: 'Example Guide', slug: 'guides/example' },
            //     ],
            // },
            {
                label: 'Tools',
                items: [
                    { label: 'Playroom', link: '/playroom' },
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
