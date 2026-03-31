/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REMOVE_BG_API_KEY: process.env.REMOVE_BG_API_KEY || '',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
