import type { APIRoute, GetStaticPaths } from "astro";
import path from "node:path";
import { FRAMEWORKS, type Framework } from "../../../../../registry/registry.meta";
import { BLOCKS } from "../../../../lib/blocks";
import { getSamples } from "../../../../samples";
import { specToCode, FRAMEWORK_EXTS } from "../../../../lib/spec-to-code";

const SAMPLE_BLOCKS = getSamples({ kind: "block" });
const SAMPLE_IDS = new Set(SAMPLE_BLOCKS.map((s) => s.id));

interface BlockEntry {
  id: string;
  title: string;
  description: string;
  componentName: string;
  spec: import("../../../../lib/spec-to-code").Spec;
  registryDependencies: string[];
}

const ALL_BLOCKS: BlockEntry[] = [
  ...SAMPLE_BLOCKS.map((s): BlockEntry => ({
    id: s.id,
    title: s.title,
    description: s.description,
    componentName: s.componentName,
    spec: s.spec,
    registryDependencies: s.registryDependencies ?? [],
  })),
  ...BLOCKS.filter((b) => !SAMPLE_IDS.has(b.id)),
];

export const getStaticPaths: GetStaticPaths = () => {
  const paths: { params: { framework: string; block: string } }[] = [];
  for (const fw of FRAMEWORKS) {
    for (const b of ALL_BLOCKS) {
      paths.push({ params: { framework: fw, block: b.id } });
    }
  }
  return paths;
};

export const GET: APIRoute = ({ params, request }) => {
  const fw = params.framework as Framework;
  const id = params.block!;
  const block = ALL_BLOCKS.find((b) => b.id === id);
  if (!block) return new Response("not found", { status: 404 });

  const ext = FRAMEWORK_EXTS[fw];
  const filename = `${block.id}.${ext}`;
  const code = specToCode(block.spec, fw, block.componentName);

  const file: {
    path: string;
    content: string;
    type: string;
    target?: string;
  } = {
    path: `blocks/${filename}`,
    content: code,
    type: "registry:block",
  };
  if (fw === "svelte") file.target = path.basename(filename);

  const origin = new URL(request.url).origin;
  const registryDependencies = block.registryDependencies.map(
    (dep) => `${origin}/r/${fw}/${dep}.json`,
  );

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: block.id,
    type: "registry:block",
    title: block.title,
    description: block.description,
    dependencies: [],
    registryDependencies,
    files: [file],
    meta: { framework: fw },
  };

  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
