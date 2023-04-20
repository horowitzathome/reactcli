/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  basePath: '/cli',
  assetPrefix: '/cli/', 
}

module.exports = nextConfig
