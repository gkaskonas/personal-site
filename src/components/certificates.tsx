"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import React from "react";

export default function Certificates() {
  const plugin = React.useRef(
    AutoScroll({
      delay: 500,
      loop: true,
      stopOnInteraction: false,
    }),
  );

  const certs = [
    {
      src: "/img/solutions-architect-pro.png",
      alt: "AWS Solutions Architect Professional Certificate",
    },
    {
      src: "/img/networking-cert.png",
      alt: "AWS Advanced Networking Specialty Certificate",
    },
    {
      src: "/img/devops-pro.png",
      alt: "AWS DevOps Engineer Professional Certificate",
    },
    {
      src: "/img/solutions-architect-associate.png",
      alt: "AWS Solutions Architect Associate Certificate",
    },
    {
      src: "/img/security-cert.png",
      alt: "AWS Security Specialty Certificate",
    },
    {
      src: "/img/AWS-SysOpAdmin-Associate.png",
      alt: "AWS SysOps Administrator Associate Certificate",
    },
  ];

  return (
    <section
      id="certificates"
      className="max-w-screen-xs mx-auto mt-10 flex flex-col space-y-5 lg:max-w-7xl"
    >
      <Carousel
        plugins={[plugin.current]}
        className=""
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="mx-auto -ml-1">
          {certs.map((cert, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/8 basis-1/2 md:basis-1/3"
            >
              <div className="relative p-1 sm:h-64 sm:w-64">
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="aspect-square h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
