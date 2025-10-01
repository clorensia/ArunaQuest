/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// ========== tailwind.config.js (Tailwind CSS v4) ==========
// Note: Tailwind v4 uses CSS-first configuration
// This file is optional in v4, but kept for plugin configuration if needed
export default {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
}