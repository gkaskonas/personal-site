"use client";

import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarIcon, UserIcon, ClockIcon, ShareIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { TextEffect } from "@/components/ui/animate-text";

interface IPost {
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
  author: {
    name: string;
  };
  content: {
    json: any;
  };
}

export default function Blog({ post }: { post: IPost }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    const text = document.getElementById("article-content")?.textContent;
    const wpm = 225;
    const words = text?.trim().split(/\s+/).length ?? 0;
    setReadingTime(Math.ceil(words / wpm));
  }, [post.content]);

  const sharePost = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: "Check out this blog post!",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.main
        ref={containerRef}
        className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image
            src={post.coverImage?.url}
            fill
            className="object-cover"
            alt={`Cover image for ${post.title}`}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="mb-2 flex items-center sm:mb-0">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>{post.author?.name ?? "Anonymous"}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <button
              onClick={sharePost}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="Share this post"
            >
              <ShareIcon className="mr-2 h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        <TextEffect
          as="h1"
          className="mb-8 mt-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl"
          preset="blur"
          per="word"
        >
          {post.title}
        </TextEffect>

        <motion.article
          id="article-content"
          className="prose prose-lg dark:prose-invert prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 max-w-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <RichText
            content={post.content.json}
            renderers={{
              h1: ({ children }) => (
                <h1 className="py-5 text-3xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="py-5 text-2xl font-bold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="py-5 text-xl font-semibold">{children}</h3>
              ),
              a: ({ children, href }) => (
                <Link
                  href={href!}
                  className="text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {children}
                </Link>
              ),
              ul: ({ children }) => (
                <ul className="my-4 list-inside list-disc space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 list-inside list-decimal space-y-2">
                  {children}
                </ol>
              ),
              code: ({ children }) => (
                <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800">
                  {children}
                </code>
              ),
              li: ({ children }) => <li className="ml-4">{children}</li>,
              p: ({ children }) => <p className="mb-4">{children}</p>,

              bold: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              code_block: ({ children }) => (
                <pre className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-800">
                  {children}
                </pre>
              ),
              img: ({ src, altText }) => (
                <div className="my-6">
                  <Image
                    src={src!}
                    alt={altText ?? "Image for blog post"}
                    width={800}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              ),
            }}
          />
        </motion.article>
      </motion.main>
    </motion.div>
  );
}
