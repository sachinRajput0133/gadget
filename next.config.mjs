/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
    
    ],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL:process.env.NEXT_PUBLIC_API_URL,
  
  },
};

export default nextConfig;
