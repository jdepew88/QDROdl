/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        pathname: "/api/v1/image/**",
      },
    ],
  },
  experimental: { serverComponentsExternalPackages: ["archiver"] },
  async headers() {
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/calpers", destination: "/plan/calpers", permanent: true },
      { source: "/calstrs", destination: "/plan/calstrs", permanent: true },
      { source: "/lacera", destination: "/plan/lacera", permanent: true },
      { source: "/la457", destination: "/plan/la457", permanent: true },
      { source: "/mp", destination: "/plan/mp", permanent: true },
      {
        source: "/generic_dc",
        destination: "/plan/generic_dc",
        permanent: true,
      },
      { source: "/federal", destination: "/plan/federal", permanent: true },
      { source: "/joinders", destination: "/plan/joinders", permanent: true },
      {
        source: "/termsofservice",
        destination: "/tos",
        permanent: true,
      },
    ];
  },
};
