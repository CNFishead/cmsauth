import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL || "https://api.shepherdcms.com/api/v1",
    ENV: process.env.NODE_ENV,
    ENCRYPTION_KEY: "asdf234as2342asdf2i;lk342342;$23423",
  },
  images: {
    // wildcard all domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  assetPrefix: process.env.ENV === "production" ? "https://api.shepherdcms.org" : "",
};

export default nextConfig;
