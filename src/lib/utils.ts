import { type ClassValue, clsx } from "clsx";
import { GraphQLClient } from "graphql-request";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const url = `${process.env.ENDPOINT}`;

export const graphConnect = new GraphQLClient(url, {
  fetch,
});
