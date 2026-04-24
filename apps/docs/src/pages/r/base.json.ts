import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Serve the default theme's tokens. `tokens.css` is now a thin index of
// @import lines, so read the first (default) theme file directly.
const DEFAULT_THEME_CSS_URL = new URL(
  "../../../registry/themes/editorial.css",
  import.meta.url,
);

function parseTokensCss(css: string) {
  const blocks: { selector: string; vars: Record<string, string> }[] = [];
  const re = /([^{}]+)\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    const selector = m[1].trim();
    const vars: Record<string, string> = {};
    for (const line of m[2].split(";")) {
      const v = line.match(/--([\w-]+):\s*([^;]+)/);
      if (v) vars[v[1]] = v[2].trim();
    }
    blocks.push({ selector, vars });
  }
  const light = blocks.find((b) => b.selector.includes(":root"))?.vars ?? {};
  const dark =
    blocks.find(
      (b) => b.selector.includes(".dark") || b.selector.includes("data-theme"),
    )?.vars ?? {};
  return { light, dark };
}

export const GET: APIRoute = async () => {
  const css = await readFile(fileURLToPath(DEFAULT_THEME_CSS_URL), "utf8");
  const { light, dark } = parseTokensCss(css);
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "base",
    type: "registry:base",
    title: "ui26 base",
    description:
      "ui26 design tokens (light + dark oklch values). Install once per project.",
    cssVars: { light, dark },
    files: [],
  };
  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
