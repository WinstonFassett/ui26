// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

import webDevMcp from '@winstonfassett/web-dev-mcp-astro';

// https://astro.build/config
export default defineConfig({
    integrations: [webDevMcp(), starlight({
        title: 'ui26',
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
