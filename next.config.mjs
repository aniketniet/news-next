/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["https://dailypioneer.com.comhttps://dailypioneer.comneer.com"],
  },
};

export default nextConfig;
