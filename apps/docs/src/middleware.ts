import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    // Inject default data-theme="editorial-dark" on <html> for no-JS rendering
    // The ThemeProvider inline script will overwrite this immediately on JS load
    const patched = html.replace(/<html([^>]*)>/, (_, attrs) => {
      if (attrs.includes("data-theme")) return `<html${attrs}>`;
      return `<html${attrs} data-theme="editorial-dark">`;  // matches ThemeProvider default (editorial + dark)
    });
    return new Response(patched, {
      status: response.status,
      headers: response.headers,
    });
  }
  return response;
});
