/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@t3-oss/env-nextjs", "bcryptjs"],
  output: 'standalone',
};

module.exports = nextConfig;
