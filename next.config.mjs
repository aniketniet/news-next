/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "dailypioneer.com", pathname: "/**" },
      { protocol: "https", hostname: "www.dailypioneer.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
