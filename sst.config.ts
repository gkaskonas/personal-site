import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

import { SSTConfig } from "sst";
import { Config, NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "personalsite",
      region: "eu-west-1",
      profile: "personal-prod",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const RESEND_API_KEY = new Config.Secret(stack, "RESEND_API_KEY");
      const site = new NextjsSite(stack, "site", {
        bind: [RESEND_API_KEY],
        warm: app.stage === "prod" ? 1 : 0,
        timeout: "30 seconds",
        logging: "combined",
        memorySize: 1024,
        customDomain:
          app.stage === "prod"
            ? {
                domainName: "peterkaskonas.com",
                domainAlias: "www.peterkaskonas.com",
                isExternalDomain: true,
                cdk: {
                  certificate: Certificate.fromCertificateArn(
                    stack,
                    "Certificate",
                    "arn:aws:acm:us-east-1:119184259962:certificate/f0dca187-ff36-46bf-a19d-d9bbffc3d392",
                  ),
                },
              }
            : undefined,
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
