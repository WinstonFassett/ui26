import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { UTILS_ITEM } from "../../../registry/registry.meta";

const REGISTRY_ROOT = new URL("../../../registry/", import.meta.url);

export const GET: APIRoute = async () => {
  const files = await Promise.all(
    UTILS_ITEM.files.map(async (spec) => {
      const abs = fileURLToPath(new URL(spec.path, REGISTRY_ROOT));
      const content = await readFile(abs, "utf8");
      return { path: spec.path, content, type: spec.type };
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
