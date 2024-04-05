/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['img.freepik.com', 'fossfolio.s3.amazonaws.com'],
    },
};

module.exports = nextConfig;
