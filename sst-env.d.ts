/* tslint:disable */
/* eslint-disable */
import "sst";
declare module "sst" {
  export interface Resource {
    MyWeb: {
      type: "sst.aws.Nextjs";
      url: string;
    };
    ResendApiKey: {
      type: "sst.sst.Secret";
      value: string;
    };
    HygraphEndpointSecret: {
      type: "sst.sst.Secret";
      value: string;
    };
  }
}
export {};
