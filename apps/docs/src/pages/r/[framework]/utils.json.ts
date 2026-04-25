import type { APIRoute, GetStaticPaths } from "astro";
import {
  FRAMEWORKS,
  UTILS_ITEM,
  type Framework,
} from "../../../../registry/registry.meta";

// Inline at build time — path resolution via `new URL(..., import.meta.url)`
// breaks once Astro bundles these modules into dist/.prerender/chunks/.
const RAW_FILES = import.meta.glob("../../../../registry/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function loadRegistryFile(relPath: string): string {
  const suffix = `/registry/${relPath}`;
  for (const [key, content] of Object.entries(RAW_FILES)) {
    if (key.endsWith(suffix)) return content;
  }
  throw new Error(`Registry file not found: ${relPath}`);
}

export const getStaticPaths: GetStaticPaths = () =>
  FRAMEWORKS.map((fw) => ({ params: { framework: fw } }));

export const GET: APIRoute = ({ params }) => {
  const fw = params.framework as Framework;
  const files = UTILS_ITEM.files.map((spec) => {
    const content = loadRegistryFile(spec.path);
    const base = { path: spec.path, content, type: spec.type } as {
      path: string;
      content: string;
      type: string;
      target?: string;
    };
    if (fw === "svelte") base.target = "utils.ts";
    return base;
  });

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: UTILS_ITEM.name,
    type: UTILS_ITEM.type,
    title: UTILS_ITEM.title,
    description: UTILS_ITEM.description,
    dependencies: UTILS_ITEM.dependencies,
    files,
  };

  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
