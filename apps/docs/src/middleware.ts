import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    // Inject default data-theme="editorial-dark" on <html> for no-JS rendering
    // The ThemeProvider inline script will overwrite this immediately on JS load
    // Always overwrite Starlight's bare data-theme="dark" with our compound default
    const patched = html.replace(/<html([^>]*)>/, (_, attrs) => {
      const cleaned = attrs.replace(/\s*data-theme="[^"]*"/, "");
      return `<html${cleaned} data-theme="editorial-dark">`;
    });
    return new Response(patched, {
      status: response.status,
      headers: response.headers,
    });
  }
  return response;
});
