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
                /* Editorial theme - light mode defaults */
                :root,[data-theme="light"]{
                    --sl-color-bg:#f6f5f1;
                    --sl-color-bg-nav:#f6f5f1;
                    --sl-color-bg-sidebar:#f6f5f1;
                    --sl-color-text:#15130f;
                    --sl-color-hairline:#e3e0d8;
                    --sl-color-accent:#e6d089;
                    --sl-color-text-accent:#e6d089;
                }
                /* Editorial theme - dark mode */
                [data-theme="dark"]{
                    --sl-color-bg:#0e0e0f;
                    --sl-color-bg-nav:#0e0e0f;
                    --sl-color-bg-sidebar:#0e0e0f;
                    --sl-color-text:#ececec;
                    --sl-color-hairline:#262628;
                    --sl-color-accent:#e6d089;
                    --sl-color-text-accent:#e6d089;
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
