/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "personalsite",
      providers: {
        aws: {
          region: "eu-west-1",
        },
      },
      removal: input?.stage === "live" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const resendApiSecret = new sst.Secret("ResendApiKey");
    const cloudfrontWebhookSecret = new sst.Secret("CloudfrontWebhookSecret");

    new sst.aws.Nextjs("MyWeb", {
      link: [resendApiSecret, cloudfrontWebhookSecret],
      environment: {
        CLOUDFRONT_DISTRIBUTION_ID: "E3JQXCBBKUYQVF",
      },
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
      warm: $app.stage === "live" ? 1 : 0,
    });
  },
});
