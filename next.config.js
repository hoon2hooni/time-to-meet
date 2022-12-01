/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: {
      autoLabel: "dev-only",
    },
  },
};

module.exports = nextConfig;
