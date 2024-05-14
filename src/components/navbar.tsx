import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute z-20 flex w-full justify-center bg-none p-4 text-white">
      <nav className="flex space-x-8">
        <Link href="/" className="hover:text-orange-400">
          Home
        </Link>
        <Link href="#about" className="hover:text-orange-400">
          About
        </Link>
        <Link href="#resume" className="hover:text-orange-400">
          Resume
        </Link>
        <Link href="#testimonials" className="hover:text-orange-400">
          Testimonials
        </Link>
        <Link href="#contact" className="hover:text-orange-400">
          Contact
        </Link>
      </nav>
    </header>
  );
}
