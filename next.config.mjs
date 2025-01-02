/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rawstorm-stg.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
