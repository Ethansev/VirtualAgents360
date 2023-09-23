/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'tailwindui.com'],
    dangerouslyAllowSVG: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
