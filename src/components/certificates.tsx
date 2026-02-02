"use client";

import { motion } from "framer-motion";
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

const certs = [
  {
    src: solutionsArchitectPro.src,
    alt: "AWS Solutions Architect Professional",
    title: "Solutions Architect Pro",
  },
  {
    src: networkingCert.src,
    alt: "AWS Advanced Networking Specialty",
    title: "Advanced Networking",
  },
  {
    src: devopsPro.src,
    alt: "AWS DevOps Engineer Professional",
    title: "DevOps Engineer Pro",
  },
  {
    src: solutionsArchitectAssociate.src,
    alt: "AWS Solutions Architect Associate",
    title: "Solutions Architect",
  },
  {
    src: securityCert.src,
    alt: "AWS Security Specialty",
    title: "Security Specialty",
  },
  {
    src: sysOpsAdmin.src,
    alt: "AWS SysOps Administrator Associate",
    title: "SysOps Administrator",
  },
];

export default function Certificates() {
  const plugin = React.useRef(
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section id="certificates" className="py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Certifications
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
            AWS Certified Professional
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cloud architecture, security, and DevOps.
          </p>
        </div>

        {/* Certificates Carousel */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {certs.map((cert, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div
                    className="group relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 card-glow p-4">
                      <img
                        src={cert.src}
                        alt={cert.alt}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm font-medium">
                          {cert.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
}
