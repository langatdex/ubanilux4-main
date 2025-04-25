import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'        
      },
      {
        protocol: 'https',
        hostname: 'grateful-bandicoot-31.convex.cloud'        
      },
    ],
  },

};

export default nextConfig;
