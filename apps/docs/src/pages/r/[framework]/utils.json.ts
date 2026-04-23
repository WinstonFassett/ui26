import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  FRAMEWORKS,
  UTILS_ITEM,
  type Framework,
} from "../../../../registry/registry.meta";

const REGISTRY_ROOT = new URL("../../../../registry/", import.meta.url);

export const getStaticPaths: GetStaticPaths = () =>
  FRAMEWORKS.map((fw) => ({ params: { framework: fw } }));

export const GET: APIRoute = async ({ params }) => {
  const fw = params.framework as Framework;
  const files = await Promise.all(
    UTILS_ITEM.files.map(async (spec) => {
      const abs = fileURLToPath(new URL(spec.path, REGISTRY_ROOT));
      const content = await readFile(abs, "utf8");
      const base = { path: spec.path, content, type: spec.type } as {
        path: string;
        content: string;
        type: string;
        target?: string;
      };
      if (fw === "svelte") base.target = "utils.ts";
      return base;
    }),
  );

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
