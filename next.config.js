/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    SESSION_KEY: process.env.SESSION_KEY,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
