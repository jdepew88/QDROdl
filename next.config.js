/** @type {import('next').NextConfig} */
module.exports = {
  experimental: { serverComponentsExternalPackages: ["archiver"] },
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
    ];
  },
};
