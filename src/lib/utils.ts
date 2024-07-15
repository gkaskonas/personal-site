// @ts-nocheck
import { type ClassValue, clsx } from "clsx";
import { GraphQLClient } from "graphql-request";
import { Resource } from "sst";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const url = Resource.HygraphEndpointSecret.value;

export const graphConnect = new GraphQLClient(url, {
  fetch,
});
