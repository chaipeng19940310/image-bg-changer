/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REMOVE_BG_API_KEY: process.env.REMOVE_BG_API_KEY || '',
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
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
