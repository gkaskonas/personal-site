import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { graphConnect } from "@/lib/utils";

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

interface IPost {
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
      revalidate: 86400,
    },
  });
  return (
    <>
      <main className="mx-auto flex flex-col items-center justify-between space-y-5 pb-10">
        <h1 className="text-bold mt-5 place-content-center items-center justify-center text-3xl">
          Latest blogs
        </h1>
        <li className="flex max-w-6xl flex-grow flex-col space-y-5">
          {posts.map((blogposts) => {
            return (
              <Link
                href={`/blog/${blogposts.slug}`}
                key={blogposts.id}
                className="flex flex-row-reverse space-x-2"
              >
                <Card className="max-w-xl">
                  <CardHeader>
                    <CardTitle>{blogposts.title}</CardTitle>
                  </CardHeader>
                  <CardContent className=""></CardContent>
                  <CardFooter>
                    <p>{blogposts.excerpt}</p>
                  </CardFooter>
                </Card>
                <div className="relative flex h-[400px] w-[800px]">
                  <Image
                    src={blogposts.coverImage.url}
                    alt="cover image"
                    fill
                    className="aspect-square object-cover"
                  />
                </div>
              </Link>
            );
          })}
        </li>
      </main>
    </>
  );
}
