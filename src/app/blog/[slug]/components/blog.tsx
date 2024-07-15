import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import React from "react";
import { IPost } from "../page";
import Link from "next/link";

export default function Blog({ post }: { post: IPost }) {
  return (
    <main className="mx-auto max-w-3xl py-10">
      <div className="relative mx-auto h-[400px] w-[800px] py-10">
        <Image
          src={post.coverImage?.url}
          fill
          className="rounded-lg object-cover"
          alt="cover image"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="my-6 flex items-center">
        <div>
          <span>
            {" "}
            Published <u>{new Date(post.date).toDateString()}</u> by{" "}
            {post.author?.name ?? "peter"}
          </span>
        </div>
      </div>

      <h1 className="mb-6 text-3xl font-bold">{post.title}</h1>

      <article className="mb-10 flex max-w-4xl flex-col text-justify">
        <RichText
          content={post.content.json}
          renderers={{
            h1: ({ children }) => (
              <h1 className="py-5 text-3xl font-bold">{children}</h1>
            ),
            h2: ({ children }) => (
              <h1 className="py-5 text-2xl font-bold">{children}</h1>
            ),
            a: ({ children, href }) => (
              <Link href={href!} className="text-blue-500 underline">
                {children}
              </Link>
            ),
            ul: ({ children }) => (
              <ul className="max-w-3-xl list-inside list-disc">{children}</ul>
            ),
            code: ({ children }) => (
              <code className="rounded-md bg-gray-200 p-1">{children}</code>
            ),
            li: ({ children }) => <li className="">{children}</li>,
            p: ({ children }) => <p className="mb-4">{children}</p>,
            bold: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            code_block: ({ children }) => (
              <pre className="rounded-md bg-gray-200 p-2">{children}</pre>
            ),
          }}
        />
      </article>
    </main>
  );
}
