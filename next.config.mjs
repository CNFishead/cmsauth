/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENV: process.env.NODE_ENV,
  },
  images: {
    // wildcard all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  assetPrefix:
    process.env.ENV === 'production' ? 'https://api.shepherdcms.org' : '',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
