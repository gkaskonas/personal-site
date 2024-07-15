import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.graphassets.com",
        protocol: "https",
      },
    ],
    minimumCacheTTL: 86400,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "pkpersonal",
  project: "javascript-nextjs",

  silent: !process.env.CI,
  widenClientFileUpload: true,

  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,

  disableLogger: true,
  automaticVercelMonitors: true,
});
