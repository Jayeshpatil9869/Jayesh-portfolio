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
      const headers = new Headers(indexResponse.headers);
      headers.set("Content-Type", "text/html; charset=utf-8");
      return new Response(indexResponse.body, {
        status: 200,
        statusText: indexResponse.statusText,
        headers,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
