/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "personalsite",
      providers: {
        aws: {
          region: "eu-west-1",
        },
        cloudflare: true,
      },
      removal: input?.stage === "live" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const resendApiSecret = new sst.Secret("ResendApiKey");

    new sst.aws.Astro("MyWeb", {
      link: [resendApiSecret],
      domain:
        $app.stage === "live"
          ? {
            name: "peterkaskonas.com",
            redirects: ["www.peterkaskonas.com"],
            dns: sst.cloudflare.dns({
              zone: process.env.CLOUDFLARE_ZONE_ID,
            }),
          }
          : undefined,
      assets: {
        fileOptions: [
          {
            files: ["**/*.css", "**/*.js", "**/*.woff2", "**/*.woff"],
            cacheControl: "max-age=31536000,public,immutable",
          },
          {
            files: ["**/*.html"],
            cacheControl: "max-age=0,no-cache,no-store,must-revalidate",
          },
          {
            files: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.webp", "**/*.svg"],
            cacheControl: "max-age=31536000,public,immutable",
          },
        ],
      },
    });
  },
});
