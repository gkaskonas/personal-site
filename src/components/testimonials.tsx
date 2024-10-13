"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

import AutoPlay from "embla-carousel-autoplay";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mario Paphhitis",
      role: "Engineering Manager",
      company: "Ocado",
      testimonial:
        "A self-motivated, ambitious and intelligent young man. These skills allowed him to solve complex problems and engineer solutions at pace, without compromising on quality.",
    },
    {
      name: "Paul Andrews",
      role: "Senior Solutions Architect",
      company: "Amazon Web Services",
      testimonial:
        "He is a phenomenal talent and regularly produces high quality work that 2 or 3 people would struggle to reproduce.",
    },
    {
      name: "Brian Lee",
      role: "Lead Coach/Co Founder",
      company: "Lift Performance",
      testimonial:
        "We hired Pete to build our company’s website from scratch, and with his vast knowledge and experience, he gave us a lot of great recommendations on how to create more leads. He is also very efficient and responsive. I can’t recommend his work enough!",
    },
  ];

  const plugin = React.useRef(
    AutoPlay({
      delay: 7000,
      loop: true,
    }),
  );

  return (
    <section
      id="testimonials"
      className="relative mx-auto mt-10 flex w-full flex-col space-y-5"
    >
      <Image
        src="/img/testimonials-bg.jpg"
        alt="Testimonials"
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="mx-auto w-full max-w-3xl items-center"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="border-none bg-inherit text-white">
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription className="text-slate-300 ">
                    {testimonial.role}
                  </CardDescription>
                  <CardDescription className="text-slate-300 ">
                    {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic text-border text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-3xl">
                    {testimonial.testimonial}
                  </p>
                </CardContent>
                <CardFooter>
                  <p></p>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
