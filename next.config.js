const headers = require('./src/utils/headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  headers,
}

module.exports = nextConfig
