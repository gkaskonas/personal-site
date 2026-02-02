"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#resume", label: "Resume" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header
      className={`fixed z-20 flex w-full items-center justify-between p-4 transition-all duration-300 ${isScrolled ? "bg-gray-900/80 backdrop-blur-sm" : "bg-transparent"
        }`}
    >
      <div className="flex md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <nav className="hidden md:flex md:flex-grow md:justify-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mx-2 text-2xl text-white hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center">
        <ThemeToggle />
      </div>

      {isMobileMenuOpen && (
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <div className="fixed inset-0 z-50 bg-black/80 md:hidden">
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="w-full max-w-lg">
                <div className="flex justify-end p-4">
                  <button
                    onClick={closeMobileMenu}
                    className="text-white focus:outline-none"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col items-center space-y-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-3xl font-bold text-white hover:text-primary"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </header>
  );
}
