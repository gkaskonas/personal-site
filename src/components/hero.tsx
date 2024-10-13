import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { TextEffect } from "@/components/ui/animate-text";

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
        <TextEffect
          per="word"
          as="h1"
          preset="blur"
          className="text-4xl font-extrabold sm:text-[70px] lg:text-[90px]"
        >
          I am Peter Kaskonas.
        </TextEffect>
        <TextEffect
          per="word"
          as="p"
          preset="blur"
          className="mt-4 sm:mt-10 sm:text-2xl"
        >
          Devops Lead and Solutions Architect
        </TextEffect>
        <Separator className="mx-auto my-4 w-1/3 bg-slate-100/10" />
        <div className="mx-auto flex w-1/12 flex-row justify-center space-x-4 sm:space-x-6">
          <Link
            href="https://www.linkedin.com/in/giedrius-k-7a2880a5/"
            className="mx-auto flex"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn
              size={32}
              className="transition-colors duration-300 ease-in-out hover:text-primary"
            />
          </Link>
          <Link
            href="https://github.com/gkaskonas"
            className="mx-auto flex"
            aria-label="GitHub Profile"
          >
            <FaGithub
              size={32}
              className="transition-colors duration-300 ease-in-out hover:text-primary"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
