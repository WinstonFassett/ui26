import type { APIRoute, GetStaticPaths } from "astro";
import {
  COMPONENTS,
  FRAMEWORKS,
  type Framework,
} from "../../../../registry/registry.meta";

export const getStaticPaths: GetStaticPaths = () =>
  FRAMEWORKS.map((fw) => ({ params: { framework: fw } }));

export const GET: APIRoute = ({ params }) => {
  const fw = params.framework as Framework;
  const items = COMPONENTS.map((c) => ({
    name: c.name,
    type: "registry:ui",
    title: c.title,
    description: c.description,
  }));

  const catalog = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: `ui26-${fw}`,
    homepage: "https://winston-ui26.netlify.app",
    items,
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
