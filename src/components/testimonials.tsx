"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
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
  ];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
        setApi={setApi}
        className="mx-auto w-full max-w-3xl items-center"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="border-none bg-inherit text-white">
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {testimonial.role}
                  </CardDescription>
                  <CardDescription className="text-slate-300">
                    {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic text-border drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-3xl">
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
      <div className="py-2 text-center text-sm text-white">
        {current} of {count}
      </div>
    </section>
  );
}
