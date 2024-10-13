"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-20 flex w-full justify-center p-4 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex space-x-2 text-white sm:space-x-4 lg:space-x-8 lg:text-lg xl:text-xl">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <Link href="#about" className="hover:text-primary">
          About
        </Link>
        <Link href="#resume" className="hover:text-primary">
          Resume
        </Link>
        <Link href="#testimonials" className="hover:text-primary">
          Testimonials
        </Link>
        <Link href="#contact" className="hover:text-primary">
          Contact
        </Link>
        <Link href="/blog" className="hover:text-primary">
          Blog
        </Link>
      </nav>
    </header>
  );
}
