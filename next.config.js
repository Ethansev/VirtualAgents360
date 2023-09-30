/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'tailwindui.com', 'lh3.googleusercontent.com'],
    dangerouslyAllowSVG: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
