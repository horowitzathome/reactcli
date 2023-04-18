/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  basePath: '/cli',
  assetPrefix: '/cli/', // set assetPrefix to '/root/'
}

module.exports = nextConfig
