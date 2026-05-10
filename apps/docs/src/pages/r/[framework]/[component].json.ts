import type { APIRoute, GetStaticPaths } from "astro";
import path from "node:path";
import {
  COMPONENTS,
  FRAMEWORKS,
  filesFor,
  type Framework,
  type RegistryFile,
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

export const GET: APIRoute = ({ params, request }) => {
  const fw = params.framework as Framework;
  const name = params.component!;
  const meta = COMPONENTS.find((c) => c.name === name);
  if (!meta) return new Response("not found", { status: 404 });

  const origin = new URL(request.url).origin;
  const fileSpecs = filesFor(name, fw);
  const files = fileSpecs.map((spec) => {
    const raw = loadRegistryFile(spec.path);
    return buildFile(spec, rewriteImports(raw, fw), fw);
  });

  const registryDependencies = meta.registryDependencies.map((dep) => {
    if (dep === "utils") return `${origin}/r/${fw}/utils.json`;
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
