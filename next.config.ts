import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    appDir  : true,
  },
  reactStrictMode: true,
};

export default nextConfig;
