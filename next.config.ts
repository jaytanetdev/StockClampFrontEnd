import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
    images: {
    unoptimized: true, // << สำคัญมากสำหรับ static export
  },
};

export default nextConfig;
