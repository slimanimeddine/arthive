import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:8000/storage/**"),
      new URL("http://164.90.224.4/storage/**"),
    ],
  },
};

export default nextConfig;
