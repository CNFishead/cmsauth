import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL || 'https://api.shepherdcms.com/api/v1',
    ENV: process.env.NODE_ENV,
    ENCRYPTION_KEY: 'asdf234as2342asdf2i;lk342342;$23423',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
