import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    // Tree-shake barrel files so Webpack only compiles icons/components you actually use
    optimizePackageImports: ["lucide-react", "framer-motion"],
    // Cache Server Component fetch responses across HMR refreshes
    serverComponentsHmrCache: true,
  },
};

export default nextConfig;
