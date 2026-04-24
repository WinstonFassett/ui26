import type { APIRoute } from "astro";
import { themes } from "@registry/themes";

/*
 * Serves the shadcn-registry `base` item for the default theme (the first
 * entry in the theme barrel). Reads the TS manifest directly — no CSS
 * parsing, no regex, and the light + dark pairs are always paired correctly.
 */

export const GET: APIRoute = async () => {
  const defaultTheme = themes[0];
  if (!defaultTheme) {
    return new Response(JSON.stringify({ error: "No themes registered" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "base",
    type: "registry:base",
    title: "ui26 base",
    description:
      "ui26 design tokens (light + dark) for the default theme. Install once per project.",
    cssVars: {
      light: defaultTheme.tokens,
      dark: defaultTheme.dark ?? {},
    },
    files: [],
  };
  return new Response(JSON.stringify(item, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
