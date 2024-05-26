/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com",'avatar.iran.liara.run'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false ,
      "aws4": false
    }
      return config;
  }
}

module.exports = nextConfig
