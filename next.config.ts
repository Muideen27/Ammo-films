import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fpmghzuhkjobztdpqqsl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    qualities: [75, 80, 85, 90, 95, 100],
  },
};

export default nextConfig;
