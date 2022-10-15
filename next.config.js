/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "https://clique-web.vercel.app",
  },
}

module.exports = nextConfig
