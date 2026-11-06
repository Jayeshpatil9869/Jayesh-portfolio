/**
 * Cloudflare Worker to serve static assets for the React SPA.
 * Unknown routes fall back to index.html.
 *
 * Security and cache headers live in public/_headers so they apply to every
 * static asset (the Worker is not invoked for files that exist), including
 * the index.html fallback returned below.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Legacy path sometimes indexed by search engines — keep one canonical homepage.
    if (url.pathname === "/home" || url.pathname === "/home/") {
      url.pathname = "/";
      url.search = "";
      url.hash = "";
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const indexRequest = new Request(new URL("/index.html", request.url), {
      method: request.method,
      headers: request.headers,
    });

    const indexResponse = await env.ASSETS.fetch(indexRequest);

    if (indexResponse.status !== 404) {
      // Unknown paths still serve the SPA shell, but with a real 404 status
      // so soft-404 crawl signals are honest (hash routes never hit this).
      const headers = new Headers(indexResponse.headers);
      headers.set("Content-Type", "text/html; charset=utf-8");
      return new Response(indexResponse.body, {
        status: 404,
        statusText: "Not Found",
        headers,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
