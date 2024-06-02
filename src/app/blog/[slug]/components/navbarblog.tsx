import Link from "next/link";

export default function NavbarBlog() {
  return (
    <header className=" flex w-full justify-center bg-black bg-none p-4 text-white lg:text-lg xl:text-xl">
      <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8">
        <Link href="/" className="hover:text-orange-400">
          Home
        </Link>
        <Link href="/blog" className="hover:text-orange-400">
          Blog
        </Link>
      </nav>
    </header>
  );
}
