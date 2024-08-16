/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://your-netlify-site.netlify.app/.netlify/functions/api/:path*',
        },
      ]
    },
  }

export default nextConfig;
