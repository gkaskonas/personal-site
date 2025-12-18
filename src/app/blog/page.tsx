import { gql } from "graphql-request";
import React from "react";
import { graphConnect } from "@/lib/utils";
import Blogs from "./components/blogs";
import { Metadata } from "next";

const query = gql`
  query {
    posts {
      excerpt
      slug
      title
      id
      coverImage {
        url
      }
      author {
        name
      }
    }
  }
`;

export const metadata: Metadata = {
  title: "Peter Kaskonas Blog",
  description:
    "Peter Kaskonas' personal Blog. Software engineer, AWS Certified Solutions Architect Professional, and AWS Certified DevOps Engineer Professional.",
  metadataBase: new URL("https://peterkaskonas.com"),
  alternates: {
    canonical: "/blog",
  },
};

export interface IPost {
  excerpt: string;
  slug: string;
  title: string;
  id: string;
  coverImage: {
    url: string;
  };
  author: {
    name: string;
  };
}

interface IData {
  posts: IPost[];
}

export default async function Homepage() {
  const { posts }: IData = await graphConnect.request(query, {
    fetch,
    next: {
      revalidate: 3600 * 12,
    },
  });

  return (
    <div>
      <Blogs posts={posts} />
    </div>
  );
}
