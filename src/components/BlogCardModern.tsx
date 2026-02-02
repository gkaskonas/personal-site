"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardModernProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags?: string[];
  coverImageUrl: string;
  href: string;
  readingTime?: string;
  featured?: boolean;
}

export function BlogCardModern({
  title,
  excerpt,
  date,
  author,
  tags,
  coverImageUrl,
  href,
  readingTime = "5 min read",
  featured = false,
}: BlogCardModernProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-xl card-glow",
        "bg-white dark:bg-gray-900/80",
        "border border-gray-200 dark:border-gray-800",
        "transition-all duration-500"
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated accent line */}
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full" />

      <a href={href} className="block">
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured ? "aspect-[21/9]" : "aspect-[16/10]"
          )}
        >
          <img
            src={coverImageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Arrow icon on hover */}
          <div className="absolute top-4 right-4 rounded-full bg-white/90 dark:bg-gray-900/90 p-2 opacity-0 transform translate-x-2 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className={cn("p-6", featured && "md:p-8")}>
          {/* Meta info */}
          <div className="mb-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{formattedDate}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readingTime}
            </span>
          </div>

          {/* Title */}
          <h2
            className={cn(
              "font-bold text-gray-900 dark:text-white",
              "transition-colors duration-300 group-hover:text-primary",
              featured ? "text-2xl md:text-3xl mb-4" : "text-xl mb-3"
            )}
          >
            {title}
          </h2>

          {/* Excerpt */}
          <p
            className={cn(
              "text-gray-600 dark:text-gray-300",
              featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"
            )}
          >
            {excerpt}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, featured ? 5 : 3).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    "border border-gray-200 dark:border-gray-700",
                    "text-gray-600 dark:text-gray-400",
                    "transition-colors duration-300",
                    "group-hover:border-primary/50 group-hover:text-primary"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author - shown on featured cards */}
          {featured && (
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                By {author}
              </span>
            </div>
          )}
        </div>
      </a>
    </motion.article>
  );
}
