"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import React from "react";

// Import optimized certificate images
import solutionsArchitectPro from "@/assets/img/solutions-architect-pro.png";
import networkingCert from "@/assets/img/networking-cert.png";
import devopsPro from "@/assets/img/devops-pro.png";
import solutionsArchitectAssociate from "@/assets/img/solutions-architect-associate.png";
import securityCert from "@/assets/img/security-cert.png";
import sysOpsAdmin from "@/assets/img/AWS-SysOpAdmin-Associate.png";

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
      src: solutionsArchitectPro.src,
      alt: "AWS Solutions Architect Professional Certificate",
    },
    {
      src: networkingCert.src,
      alt: "AWS Advanced Networking Specialty Certificate",
    },
    {
      src: devopsPro.src,
      alt: "AWS DevOps Engineer Professional Certificate",
    },
    {
      src: solutionsArchitectAssociate.src,
      alt: "AWS Solutions Architect Associate Certificate",
    },
    {
      src: securityCert.src,
      alt: "AWS Security Specialty Certificate",
    },
    {
      src: sysOpsAdmin.src,
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
