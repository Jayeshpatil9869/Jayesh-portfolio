/**
 * Cloudflare Worker to serve static assets for the React SPA.
 * Unknown routes fall back to index.html. Security headers are added
 * without replacing the asset body or status.
 */

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://wrcoiavqijnltexejxob.supabase.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

function withSecurityHeaders(response, request) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Content-Security-Policy", CSP);

  const host = new URL(request.url).hostname;
  if (host === "jayeshbpatil.com" || host === "www.jayeshbpatil.com") {
    headers.set("Strict-Transport-Security", "max-age=15552000");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return withSecurityHeaders(response, request);
    }

    const indexRequest = new Request(new URL("/index.html", request.url), {
      method: request.method,
      headers: request.headers,
    });

    const indexResponse = await env.ASSETS.fetch(indexRequest);

    if (indexResponse.status !== 404) {
      const headers = new Headers(indexResponse.headers);
      headers.set("Content-Type", "text/html; charset=utf-8");
      return withSecurityHeaders(
        new Response(indexResponse.body, {
          status: 200,
          statusText: indexResponse.statusText,
          headers,
        }),
        request
      );
    }

    return withSecurityHeaders(new Response("Not Found", { status: 404 }), request);
  },
};
