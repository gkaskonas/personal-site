// @ts-nocheck
import { type ClassValue, clsx } from "clsx";
import { GraphQLClient } from "graphql-request";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const url =
  "https://eu-west-2.cdn.hygraph.com/content/clw9fryz6000001w638iybxcj/master";

export const graphConnect = new GraphQLClient(url, {
  fetch,
});
