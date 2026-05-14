// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
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
        favicon: '/favicon.svg',
        expressiveCode: {
            // Dual themes so ExpressiveCode generates both light+dark token vars.
            // themeCssSelector maps each theme to our compound data-theme format
            // (e.g. "editorial-dark", "shad-dark") rather than Starlight's native
            // data-theme="light"/"dark", which we never set.
            themes: ['github-light', 'github-dark'],
            useDarkModeMediaQuery: false,
            themeCssSelector: (theme) =>
                theme.type === 'dark' ? '[data-theme$="dark"]' : ':root',
        },
        plugins: [
            starlightSidebarTopics(
                [
                    {
                        id: 'docs',
                        label: 'Docs',
                        link: '/getting-started/introduction',
                        items: [
                            {
                                label: 'Getting Started',
                                items: [
                                    { label: 'Introduction', slug: 'getting-started/introduction' },
                                    { label: 'Quickstart', slug: 'getting-started/quickstart' },
                                ],
                            },
                            {
                                label: 'Guides',
                                items: [
                                    { label: 'Theming', slug: 'guides/theming' },
                                    { label: 'JSON Render', slug: 'guides/json-render' },
                                ],
                            },
                            ...(import.meta.env?.DEV ? [
                                {
                                    label: 'Dev',
                                    items: [
                                        { label: 'Kitchen Sink', link: '/kitchen-sink' },
                                        { label: 'Ecosystem', link: '/ecosystem' },
                                        { label: 'Tix App', link: '/tix-app' },
                                    ],
                                },
                            ] : []),
                        ],
                    },
                    {
                        label: 'Components',
                        link: '/components/button',
                        items: [
                            {
                                label: 'Components',
                                autogenerate: { directory: 'components', exclude: ['components/dev/**'] },
                            },
                        ],
                    },
                    {
                        id: 'examples',
                        label: 'Examples',
                        link: '/examples',
                        items: [
                            { label: 'All Examples', link: '/examples' },
                        ],
                    },
                ],
                {
                    topics: {
                        examples: ['/examples', '/examples/**'],
                        docs: ['/kitchen-sink', '/ecosystem', '/tix-app', '/components/dev/**', '/guides/**', '/reference/**'],
                    },
                },
            ),
        ],
        components: {
            ThemeProvider: './src/components/starlight/ThemeProvider.astro',
            ThemeSelect: './src/components/starlight/ThemeSelect.astro',
            Header: './src/components/starlight/Header.astro',
            PageFrame: './src/components/starlight/PageFrame.astro',
        },
        head: [
            // Inline critical --sl-* vars so Starlight's chrome doesn't paint
            // cold defaults before external CSS loads. Shad light is the
            // unconditional default; any *-dark suffix switches to dark chrome.
            // Full per-theme palette loads with all-themes.css.
            { tag: 'style', content: `
                :root{
                    --sl-color-bg:#ffffff;
                    --sl-color-bg-nav:#ffffff;
                    --sl-color-bg-sidebar:#ffffff;
                    --sl-color-text:#252525;
                    --sl-color-hairline:#ebebeb;
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
            { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap' } },
        ],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/WinstonFassett/ui26' }],
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
