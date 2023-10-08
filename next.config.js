const headers = require('./src/utils/headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  headers,
  async rewrites() {
    return [
      {
        source: '/privacy',
        destination: '/html/privacy.html',
      },
    ]
  }
}

module.exports = nextConfig
