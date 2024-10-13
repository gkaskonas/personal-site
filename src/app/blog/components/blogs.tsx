"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: {
    url: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
};

export default function Blogs({ posts }: { posts: IPost[] }) {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.h1
        className="mb-12 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Latest Blogs
      </motion.h1>
      <AnimatePresence>
        <motion.ul
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((blogpost) => (
            <motion.li key={blogpost.id} variants={itemVariants} layout>
              <NextLink href={`/blog/${blogpost.slug}`} passHref legacyBehavior>
                <a className="block h-full">
                  <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden sm:h-64">
                      <Image
                        src={blogpost.coverImage.url}
                        alt={`Cover image for ${blogpost.title}`}
                        fill
                        className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                        {blogpost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="line-clamp-3 text-sm text-gray-600">
                        {blogpost.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary transition-colors duration-300 group-hover:text-orange-800">
                        Read more
                      </p>
                      <motion.div
                        className="rounded-full bg-blue-100 p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </motion.div>
                    </CardFooter>
                  </Card>
                </a>
              </NextLink>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </main>
  );
}
