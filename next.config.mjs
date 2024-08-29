/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["navajowhite-yak-294103.hostingersite.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
