/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@t3-oss/env-nextjs", "bcryptjs"],
  output: "standalone",
  headers() {
    return [
      {
        //ttf on public nextjs
        source: "/font/(.*).ttf",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, immutable",
          },
        ],
      },
      {
        //woff on public nextjs
        source: "/font/(.*).woff",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
