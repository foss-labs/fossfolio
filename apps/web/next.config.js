/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['img.freepik.com', 'fossfolio.s3.amazonaws.com'],
    },
};

module.exports = nextConfig;
