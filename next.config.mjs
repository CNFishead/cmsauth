/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL,
    ENV: process.env.NODE_ENV,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
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
