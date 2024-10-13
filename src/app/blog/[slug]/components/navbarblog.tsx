"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function NavbarBlog() {
  return (
    <header className="flex w-full items-center justify-between bg-black bg-none p-4  lg:text-lg xl:text-xl">
      <div className="w-1/6">{/* Placeholder for left side, if needed */}</div>
      <nav className="flex flex-grow justify-center space-x-2 sm:space-x-4 lg:space-x-8">
        <Link href="/" className="text-white hover:text-primary">
          Home
        </Link>
        <Link href="/blog" className="text-white hover:text-primary">
          Blog
        </Link>
      </nav>
      <div className="flex w-1/6 justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
