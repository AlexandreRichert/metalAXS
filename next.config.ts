import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixe la racine du projet (un autre lockfile existe plus haut dans l'arborescence)
  // pour un traçage des fichiers correct au build et au déploiement.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      // Les images servies par Sanity proviennent du CDN cdn.sanity.io.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
