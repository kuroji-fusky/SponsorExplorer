/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lodash-es"],
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ytimg.com",
        pathname: "/**"
      }
    ]
  }
}

export default nextConfig
