import type { APIRoute, GetStaticPaths } from "astro";

// Inline at build time — `new URL(..., import.meta.url)` resolution breaks
// once Astro bundles modules into dist/.prerender/chunks/.
const THEME_FILES = import.meta.glob("../../../../registry/themes/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function themeName(key: string): string {
  return key.split("/").pop()!.replace(/\.css$/, "");
}

const THEMES: Record<string, string> = Object.fromEntries(
  Object.entries(THEME_FILES).map(([k, v]) => [themeName(k), v]),
);

function parseBlock(css: string, selectorPredicate: (sel: string) => boolean) {
  const re = /([^{}]+)\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    const sel = m[1].trim();
    if (!selectorPredicate(sel)) continue;
    const vars: Record<string, string> = {};
    for (const line of m[2].split(";")) {
      const v = line.match(/--([\w-]+):\s*([^;]+)/);
      if (v) vars[v[1]] = v[2].trim();
    }
    return vars;
  }
  return {};
}

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(THEMES).map((name) => ({ params: { name } }));

export const GET: APIRoute = ({ params }) => {
  const name = params.name!;
  const css = THEMES[name];
  if (!css) return new Response("not found", { status: 404 });

  const light = parseBlock(
    css,
    (sel) => sel.includes(`[data-theme="${name}"]`) && !sel.includes(`${name}-dark`),
  );
  const dark = parseBlock(css, (sel) => sel.includes(`[data-theme="${name}-dark"]`));

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${name}`,
    type: "registry:theme",
    title: `ui26 — ${name}`,
    description: `ui26 ${name} theme tokens (light + dark). Install one theme as your default.`,
    cssVars: { light, dark },
  };

  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
