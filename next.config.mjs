import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {};

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
