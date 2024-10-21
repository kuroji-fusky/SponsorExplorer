/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@googleapis/youtube"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/v/:id",
        destination: "/video/:id",
        permanent: true
      },
      {
        source: "/c/:id",
        destination: "/channel/:id",
        permanent: true
      }
    ]
  }
}

export default nextConfig
