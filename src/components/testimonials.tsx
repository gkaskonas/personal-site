"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";

// Import optimized background image
import testimonialsBg from "@/assets/img/testimonials-bg.jpg";

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
      "We hired Pete to build our company's website from scratch, and with his vast knowledge and experience, he gave us a lot of great recommendations on how to create more leads. He is also very efficient and responsive. I can't recommend his work enough!",
  },
];

export default function Testimonials() {
  const plugin = React.useRef(
    AutoPlay({
      delay: 6000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={testimonialsBg.src}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/20 rounded-full backdrop-blur-sm">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-white lg:text-5xl">
            What People Say
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                >
                  {/* Large decorative quote mark */}
                  <span className="absolute top-4 left-6 text-6xl md:text-8xl font-serif text-primary/30 leading-none select-none">
                    "
                  </span>

                  {/* Testimonial Text */}
                  <blockquote className="relative z-10 pt-8 md:pt-12 text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed">
                    {testimonial.testimonial}
                  </blockquote>

                  {/* Author Info */}
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-white/70 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white" />
            <CarouselNext className="relative inset-auto translate-x-0 translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white" />
          </div>
        </Carousel>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/30"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
