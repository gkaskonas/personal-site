"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarIcon, UserIcon, ClockIcon, ShareIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { TextEffect } from "@/components/ui/animate-text";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IPost {
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
  author: {
    name: string;
  };
  markdown: string;
}

export default function Blog({ post }: { post: IPost }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    const wpm = 225;
    const words = post.markdown?.trim().split(/\s+/).filter(Boolean).length ?? 0;
    setReadingTime(Math.max(1, Math.ceil(words / wpm)));
  }, [post.markdown]);

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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: () => null,
              h2: ({ children }) => (
                <h2 className="mb-3 mt-8 scroll-mt-24 text-2xl font-bold tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 mt-6 scroll-mt-24 text-xl font-semibold tracking-tight">
                  {children}
                </h3>
              ),
              a: ({ children, href }) => {
                if (!href) return <>{children}</>;
                const isExternal =
                  href.startsWith("http://") || href.startsWith("https://");

                return (
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className="font-medium underline underline-offset-4 transition-colors hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {children}
                  </Link>
                );
              },
              p: ({ children }) => (
                <p className="my-4 leading-7 text-gray-800 dark:text-gray-200">
                  {children}
                </p>
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
              li: ({ children }) => <li className="ml-4">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="my-10 border-gray-200 dark:border-gray-800" />
              ),
              code: ({ children, className }) => {
                const isBlock = Boolean(className);
                if (!isBlock) {
                  return (
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                      {children}
                    </code>
                  );
                }

                return (
                  <code className="font-mono text-sm text-gray-900 dark:text-gray-100">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-6 dark:border-gray-800 dark:bg-gray-900">
                  {children}
                </pre>
              ),
              img: ({ src, alt }) => {
                if (!src) return null;
                return (
                  <span className="my-6 block">
                    <Image
                      src={src}
                      alt={alt ?? "Image for blog post"}
                      width={1200}
                      height={630}
                      className="rounded-lg object-cover"
                    />
                  </span>
                );
              },
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto">
                  <table className="w-full border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold dark:border-gray-800 dark:bg-gray-900">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-200 px-3 py-2 dark:border-gray-800">
                  {children}
                </td>
              ),
            }}
          >
            {post.markdown}
          </ReactMarkdown>
        </motion.article>
      </motion.main>
    </motion.div>
  );
}
