/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REMOVE_BG_API_KEY: process.env.REMOVE_BG_API_KEY || '',
  },
}

export default nextConfig
