import type { APIRoute } from "astro";

// Serve the default theme's tokens. `tokens.css` is now a thin index of
// @import lines, so read the first (default) theme file directly. Inlined at
// build time via ?raw since `new URL(..., import.meta.url)` breaks once Astro
// bundles this module into dist/.prerender/chunks/.
import DEFAULT_THEME_CSS from "../../../registry/themes/editorial.css?raw";

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

export const GET: APIRoute = () => {
  const { light, dark } = parseTokensCss(DEFAULT_THEME_CSS);
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
