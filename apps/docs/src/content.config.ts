import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { topicSchema } from 'starlight-sidebar-topics/schema';

const docsExts = 'markdown,mdown,mkdn,mkd,mdwn,md,mdx';
const docsPattern = import.meta.env?.DEV
	? [`**/[^_]*.{${docsExts}}`]
	: [`**/[^_]*.{${docsExts}}`, '!components-dev/**'];

export const collections = {
	docs: defineCollection({
		loader: glob({ base: './src/content/docs', pattern: docsPattern }),
		schema: docsSchema({ extend: topicSchema }),
	}),
};
