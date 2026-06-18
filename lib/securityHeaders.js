/**
 * Security headers for production (applied in middleware.ts).
 *
 * CSP uses 'unsafe-inline' for Next.js 14 App Router client bundles.
 * Strict nonce CSP requires nonces on every script tag; without that, React
 * never hydrates and nav dropdowns/buttons stop working.
 */

function buildContentSecurityPolicy() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.builder.io",
    "font-src 'self'",
    "connect-src 'self' https://api.stripe.com",
    "frame-src https://checkout.stripe.com https://js.stripe.com",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** Headers set on every HTML response. */
const staticSecurityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(self), usb=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
];

module.exports = {
  buildContentSecurityPolicy,
  staticSecurityHeaders,
};
