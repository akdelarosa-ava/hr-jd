/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        API_KEY: process.env.API_KEY,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_TENANT_ID: process.env.AUTH_TENANT_ID,
        AUTH_SECRET: process.env.AUTH_SECRET
    }
};

export default nextConfig;
