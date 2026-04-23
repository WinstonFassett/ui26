import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  COMPONENTS,
  FRAMEWORKS,
  filesFor,
  type Framework,
  type RegistryFile,
} from "../../../../registry/registry.meta";

const REGISTRY_ROOT = new URL("../../../../registry/", import.meta.url);

const UTILS_ALIAS: Record<Framework, string> = {
  react: "@/lib/utils",
  svelte: "$lib/utils",
  astro: "@/lib/utils",
};

function rewriteImports(content: string, fw: Framework): string {
  return content.replace(
    /from\s+(["'])\.\.\/lib\/utils\1/g,
    `from "${UTILS_ALIAS[fw]}"`,
  );
}

type EmittedFile = {
  path: string;
  content: string;
  type: string;
  target?: string;
};

function buildFile(spec: RegistryFile, content: string, fw: Framework): EmittedFile {
  if (fw === "svelte") {
    return {
      path: spec.path,
      content,
      type: "registry:file",
      target: path.basename(spec.path),
    };
  }
  return { path: spec.path, content, type: spec.type };
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [] as { params: { framework: string; component: string } }[];
  for (const fw of FRAMEWORKS) {
    for (const c of COMPONENTS) {
      paths.push({ params: { framework: fw, component: c.name } });
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ params, request }) => {
  const fw = params.framework as Framework;
  const name = params.component!;
  const meta = COMPONENTS.find((c) => c.name === name);
  if (!meta) return new Response("not found", { status: 404 });

  const origin = new URL(request.url).origin;
  const fileSpecs = filesFor(name, fw);
  const files = await Promise.all(
    fileSpecs.map(async (spec) => {
      const abs = fileURLToPath(new URL(spec.path, REGISTRY_ROOT));
      const raw = await readFile(abs, "utf8");
      return buildFile(spec, rewriteImports(raw, fw), fw);
    }),
  );

  const registryDependencies = meta.registryDependencies.map((dep) => {
    if (dep === "utils") return `${origin}/r/${fw}/utils.json`;
    if (dep === "base") return `${origin}/r/base.json`;
    return `${origin}/r/${fw}/${dep}.json`;
  });

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: meta.name,
    type: "registry:ui",
    title: meta.title,
    description: meta.description,
    dependencies: meta.dependencies,
    registryDependencies,
    files,
    meta: { framework: fw },
  };

  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
