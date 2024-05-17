"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

import networkingCert from "../../public/img/networking-cert.png";
import securityCert from "../../public/img/security-cert.png";
import solutionsArchitectPro from "../../public/img/solutions-architect-pro.png";
import devopsPro from "../../public/img/devops-pro.png";
import solutionsArchitectAssociate from "../../public/img/solutions-architect-associate.png";
import systemsOps from "../../public/img/AWS-SysOpAdmin-Associate.png";
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
      src: solutionsArchitectPro,
      alt: "AWS Solutions Architect Professional Certificate",
    },
    {
      src: networkingCert,
      alt: "AWS Advanced Networking Specialty Certificate",
    },

    {
      src: devopsPro,
      alt: "AWS DevOps Engineer Professional Certificate",
    },
    {
      src: solutionsArchitectAssociate,
      alt: "AWS Solutions Architect Associate Certificate",
    },
    {
      src: securityCert,
      alt: "AWS Security Specialty Certificate",
    },
    {
      src: systemsOps,
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
        <CarouselContent className="mx-auto -ml-1 ">
          {certs.map((cert, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1/8 basis-1/2  md:basis-1/3"
            >
              <div className="relative p-1 sm:h-64 sm:w-64">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  placeholder="blur"
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
