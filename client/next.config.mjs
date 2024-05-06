/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['assets.example.com'],
      loader: 'default',
      path: '/_next/image',
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3001',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  

export default nextConfig;
