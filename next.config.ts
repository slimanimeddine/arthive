import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      new URL("http://localhost:8000/storage/**"),
      new URL("http://64.226.119.0/storage/**"),
    ],
  },
};

export default nextConfig;
