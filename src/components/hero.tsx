import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/img/header3.jpg"
        alt="Hero picture"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fill
      />
      <div className="z-10 flex w-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-extrabold sm:text-[70px] lg:text-[90px]">
          I am Peter Kaskonas.
        </h1>
        <p className="mt-4 sm:mt-10 sm:text-2xl">
          Devops Lead and Solutions Architect
        </p>
        <Separator className="mx-auto my-4 w-1/3 bg-slate-100/10" />
        <div className="mx-auto flex w-1/12 flex-row justify-center space-x-4 sm:space-x-0">
          <Link
            href="https://www.linkedin.com/in/giedrius-k-7a2880a5/"
            className="mx-auto flex"
          >
            <Linkedin
              size={32}
              color="#ffffff"
              strokeWidth={0}
              absoluteStrokeWidth
              fill="currentColor"
              className="flex transition-colors duration-300 ease-in-out hover:text-orange-400"
            />
          </Link>
          <Link href="https://github.com/gkaskonas" className="mx-auto flex">
            <Github
              size={36}
              color="#ffffff"
              strokeWidth={1}
              absoluteStrokeWidth
              fill="currentColor"
              className="flex transition-colors duration-300 ease-in-out hover:text-orange-400"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
