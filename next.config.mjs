/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    env: {
        NEXT_PUBLIC_DRIZZLE_DB_URL: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
    },
  };
  
  export default nextConfig;