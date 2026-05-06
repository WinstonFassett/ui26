import type { APIRoute } from "astro";

// Drop every theme file under src/styles/themes/<name>.css plus an
// all-themes.css barrel. The default theme (`shad`) ships with `:root,`
// baked into its source selector, so no rewrite needed — installing this
// item gives the consumer a `data-theme` attribute switcher with shad as
// the default.
//
// One manual step remains: the consumer must add
//   @import './styles/themes/all-themes.css';
// to their globals.css. shadcn's `css` field is selector-keyed and not a
// good fit for top-level `@import`, so we surface the instruction in the
// item description rather than try to inject it.

const THEME_FILES = import.meta.glob("../../../registry/themes/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function themeName(key: string): string {
  return key.split("/").pop()!.replace(/\.css$/, "");
}

export const GET: APIRoute = () => {
  const themes = Object.entries(THEME_FILES).map(([k, content]) => ({
    name: themeName(k),
    content,
  }));

  // Synthesize a flat all-themes.css that imports siblings (one directory).
  const allThemesContent =
    "/* ui26 themes — generated barrel. Imports every theme file in this directory. */\n" +
    themes.map((t) => `@import './${t.name}.css';`).join("\n") +
    "\n";

  const files = themes.map((t) => ({
    path: `src/styles/themes/${t.name}.css`,
    content: t.content,
    type: "registry:file" as const,
    target: `src/styles/themes/${t.name}.css`,
  }));
  files.push({
    path: "src/styles/themes/all-themes.css",
    content: allThemesContent,
    type: "registry:file" as const,
    target: "src/styles/themes/all-themes.css",
  });

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "themes",
    type: "registry:style",
    title: "ui26 themes (full switcher)",
    description:
      "All ui26 themes as a data-theme attribute switcher. Default: shad. After install, add `@import './styles/themes/all-themes.css';` to your globals.css.",
    files,
  };

  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
